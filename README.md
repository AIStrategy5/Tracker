# Decera Clinical Hub

Supporter-focused intelligence dashboard for independent medical education strategy.

**Live:** https://aistrategy5.github.io/Tracker/

Access password: `nine six three months out` — the 9/6/3-month conference
lead-time checkpoints the hub is built around. Case-insensitive, extra spaces
tolerated. Stored as a hash in both `index.html` and `src/shell.html`; to change
it, hash the new phrase with the gate's own function and replace `TARGET` in
both places, then rebuild.

The gate runs in the browser, so it deters casual link-sharing — it is not
access control. Anyone who opens the page source can read past it. Treat the
named Medical Affairs contacts and competitive intelligence accordingly.

- `index.html` — landing page / guided tour (the public front door)
- `tracker.html` — the dashboard: MULTI and Neuroscience business-unit tabs, one shared engine

Both files must stay in the repo root — GitHub Pages serves from `main`, and
`index.html` alone breaks every "Open the hub" link.

---

## Automatic weekly refresh

`.github/workflows/weekly-refresh.yml` runs **every Monday at 9:00 AM Central**.
It re-queries ClinicalTrials.gov for all ten neuroscience therapeutic areas,
rewrites the fallback snapshot, rebuilds `tracker.html`, and commits — GitHub Pages
republishes about a minute later. No token, no laptop, no manual upload.

Two cron entries (14:00 and 15:00 UTC) exist on purpose: GitHub cron is UTC-only,
so one covers CDT and the other CST. The first step in the job discards whichever
run is not actually 9 AM in Chicago, so the time never drifts at daylight saving.

**Run it early:** Actions → *Weekly refresh* → *Run workflow*. The optional
`include_multi` box also refreshes the six MULTI areas, which **overwrites the
curated MULTI snapshot** — leave it off unless that is what you want.

**What the refresh does and does not touch**

| Refreshed weekly | Left alone |
|---|---|
| The ten neuro trial snapshots in `src/neuro_snap.js` | Every curated constant in `src/data.js` |
| `tracker.html` (rebuilt from source) | Grants, PDUFA, congresses, KOL, COIF, signals, strategy profiles |

Curated intelligence still needs a human pass. The Monday job keeps the trial
data current; it does not re-verify grant deadlines or PDUFA dates.

**Failure behaviour.** Each area is retried three times. An area that still fails
keeps its previous trials rather than going blank. If more than a third of the
areas fail, the run aborts and writes nothing — the live site keeps working with
the snapshot it already had.

> GitHub disables scheduled workflows in a repo with no activity for 60 days and
> emails the owner. The weekly commit normally counts as activity, so this only
> bites if the job has been failing silently for two months.

---

## Source kit and build

`tracker.html` is generated. Edit the parts, not the built file:

```
src/shell.html        page skeleton, password gate, header, filter bar
src/style.css         all CSS
src/data.js           58 curated data constants (extracted verbatim)
src/conf_extra.js     neuro next-edition congresses
src/neuro_snap.js     trial snapshot — GENERATED, do not hand-edit
src/coif_multi.html   MULTI Cost-of-Inaction cards (verbatim)
src/product_refs.html Decera product references (reference copy; also inlined in app.js)
src/app.js            the engine — SECTIONS registry, renderers, filters, Supporter Intelligence
```

```bash
python3 tools/build.py              # src/ -> tracker.html
node tools/refresh-snapshot.mjs     # re-fetch trials into src/neuro_snap.js
```

`tools/build.py` refuses to write if the password gate, the `SECTIONS` registry,
the COIF block, the product references, or the neuro snapshot went missing.

The build is byte-reproducible: running it against the current `src/` reproduces
the shipped `tracker.html` exactly.

## The one architectural rule

One engine renders both business units. `SECTIONS` defines the outline once and
`renderHub(bu)` renders it for the active tab, so a change to any section appears
in both tabs and they cannot drift. Per-BU data lives in `D = {multi:{…}, neuro:{…}}`
with identical slot names.
