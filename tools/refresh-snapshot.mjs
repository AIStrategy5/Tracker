/**
 * Decera Clinical Hub — weekly trial-snapshot refresh.
 *
 * Re-runs every therapeutic area's ClinicalTrials.gov v2 query and rewrites
 * src/neuro_snap.js (the fallback shown when a browser cannot reach the live API).
 *
 * Safety rules — a bad network day must never degrade the shipped fallback:
 *   1. Each area is fetched with retries.
 *   2. If an area fails or comes back empty, the PREVIOUS snapshot for that area
 *      is carried forward unchanged. Areas are never blanked.
 *   3. If more than a third of the areas fail, the run aborts with a non-zero
 *      exit code and writes nothing.
 *   4. Curated MULTI trials are left alone unless INCLUDE_MULTI=true.
 *
 * Usage:  node tools/refresh-snapshot.mjs
 * Env:    INCLUDE_MULTI=true   also refresh the six MULTI areas (off by default)
 */

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src");
const OUT = path.join(SRC, "neuro_snap.js");

const PER_AREA = 40;          // matches the snapshot that shipped Aug 19 2026
const RETRIES = 3;
const INCLUDE_MULTI = String(process.env.INCLUDE_MULTI || "").toLowerCase() === "true";

// ---------------------------------------------------------------- load config
// data.js and neuro_snap.js are plain scripts of top-level consts. Run them in a
// sandbox to read SPECIALTIES / ADV / FIELDS and the previous TRIALSNAP.
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(SRC, "data.js"), "utf8"), sandbox);
try {
  vm.runInContext(fs.readFileSync(OUT, "utf8"), sandbox);
} catch {
  console.warn("note: no readable previous neuro snapshot — starting fresh");
}
// `const` declarations are lexical, so they are not properties of the sandbox
// object — read them back by evaluating an expression in the same context.
const { SPECIALTIES, ADV, FIELDS, PREV } = vm.runInContext(
  `({ SPECIALTIES, ADV, FIELDS, PREV: (typeof TRIALSNAP !== "undefined" ? TRIALSNAP : {}) })`,
  sandbox
);

const areas = SPECIALTIES.filter((s) => (INCLUDE_MULTI ? true : s.bu === "neuro"));
if (!areas.length) {
  console.error("REFRESH FAILED: no therapeutic areas matched");
  process.exit(1);
}

// ---------------------------------------------------------------- fetch layer
function apiURL(cond) {
  const p = new URLSearchParams();
  p.set("query.cond", cond);
  p.set("filter.advanced", ADV);
  p.set("pageSize", String(PER_AREA));
  p.set("sort", "LastUpdatePostDate:desc");
  p.set("fields", FIELDS);
  return "https://clinicaltrials.gov/api/v2/studies?" + p.toString();
}

function parseStudy(study) {
  const p = study.protocolSection || {};
  const id = p.identificationModule || {};
  const st = p.statusModule || {};
  const sp = (p.sponsorCollaboratorsModule || {}).leadSponsor || {};
  const de = p.designModule || {};
  const cond = (p.conditionsModule || {}).conditions || [];
  return {
    nct: id.nctId,
    title: id.briefTitle || "Untitled study",
    status: st.overallStatus || "",
    phase: (de.phases || []).join("/") || "—",
    sponsor: sp.name || "—",
    updated: (st.lastUpdatePostDateStruct || {}).date,
    enroll: (de.enrollmentInfo || {}).count,
    cond: cond.slice(0, 2).join(", "),
  };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchArea(area) {
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const res = await fetch(apiURL(area.cond), {
        headers: { accept: "application/json" },
        signal: AbortSignal.timeout(45000),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const json = await res.json();
      const rows = (json.studies || []).map(parseStudy).filter((t) => t.nct);
      if (!rows.length) throw new Error("empty result set");
      return rows;
    } catch (err) {
      console.warn(`  ${area.key} attempt ${attempt}/${RETRIES} failed: ${err.message}`);
      if (attempt < RETRIES) await sleep(2000 * attempt);
    }
  }
  return null;
}

// ---------------------------------------------------------------------- run
const snap = {};
const failed = [];
let fetched = 0;

for (const area of areas) {
  const rows = await fetchArea(area);
  if (rows) {
    snap[area.key] = rows;
    fetched += rows.length;
    console.log(`  ${area.key.padEnd(14)} ${rows.length} trials`);
  } else if (PREV[area.key]?.length) {
    snap[area.key] = PREV[area.key];
    failed.push(area.key);
    console.log(`  ${area.key.padEnd(14)} FAILED — kept previous ${PREV[area.key].length} trials`);
  } else {
    failed.push(area.key);
    console.log(`  ${area.key.padEnd(14)} FAILED — no previous data to keep`);
  }
}

if (failed.length > areas.length / 3) {
  console.error(
    `REFRESH ABORTED: ${failed.length}/${areas.length} areas failed (${failed.join(", ")}). ` +
      "Nothing written — the existing snapshot stays in place."
  );
  process.exit(1);
}

// The overlay stays scoped to the areas this run targeted. Areas outside that set
// (the curated MULTI trials in src/data.js, when INCLUDE_MULTI is off) are left
// where they are rather than being copied into a generated file.

const stamp = new Date().toLocaleDateString("en-US", {
  timeZone: "America/Chicago",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const total = Object.values(snap).reduce((n, rows) => n + rows.length, 0);
const header =
  `// Real snapshot of trials, captured ${stamp} from ClinicalTrials.gov v2 —\n` +
  `// fallback shown whenever the live feed cannot be reached.\n` +
  `// Refreshed automatically by .github/workflows/weekly-refresh.yml (Mondays, 9:00 AM Central).\n` +
  `// ${Object.keys(snap).length} therapeutic areas · ${total} trials` +
  (failed.length ? ` · carried forward (fetch failed): ${failed.join(", ")}` : "") +
  `\n`;

fs.writeFileSync(
  OUT,
  header +
    "const TRIALSNAP_NEURO = " + JSON.stringify(snap) + ";\n" +
    "Object.assign(TRIALSNAP, TRIALSNAP_NEURO);\n",
  "utf8"
);

console.log(
  `wrote ${path.relative(ROOT, OUT)} — ${total} trials across ${Object.keys(snap).length} areas ` +
    `(${Math.round(fs.statSync(OUT).size / 1024)} KB)` +
    (INCLUDE_MULTI ? " [MULTI included]" : " [neuro only]")
);
