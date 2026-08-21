/* ============================================================================
   DECERA CLINICAL HUB — ENGINE (rebuilt from the ground up, Aug 19 2026)

   ONE engine renders BOTH business units. A section is defined once in
   SECTIONS and rendered for whichever BU is active — so MULTI and
   Neuroscience cannot drift apart: they are the same code fed different rows.
   ========================================================================== */
"use strict";

// Decera product references — verified from deceraclinical.com/education (verbatim block from the original tracker); shown in BOTH business units under Whitespace.
const DECERA_PRODUCT_REFS = "<div class=\"em-strip\" style=\"margin-top:12px;font-size:12px;line-height:1.7\">\n  <b style=\"font-family:'JetBrains Mono',monospace;letter-spacing:.06em;text-transform:uppercase;font-size:10.5px;color:#0f1a1a\">Decera product references \u2014 verified from deceraclinical.com/education this run</b><br>\n  <b>Formats published on the public site:</b>\n  <a href=\"https://deceraclinical.com/education\" target=\"_blank\" rel=\"noopener\">Live events / Webinars</a> \u00b7\n  <a href=\"https://deceraclinical.com/education/activities\" target=\"_blank\" rel=\"noopener\">Video \u00b7 Slideset \u00b7 Text Module \u00b7 Podcast \u00b7 PDF \u00b7 Case Challenge</a> \u00b7\n  <a href=\"https://www.deceraclinical.com/education/ClinicalThought\" target=\"_blank\" rel=\"noopener\">Clinical Thought</a> \u00b7\n  <a href=\"https://deceraclinical.com/education/conference-coverage\" target=\"_blank\" rel=\"noopener\">Conference Coverage</a> \u00b7\n  <a href=\"https://cea.neuralconsult.com/\" target=\"_blank\" rel=\"noopener\">ACTiconsult</a> \u00b7\n  <a href=\"https://deceraclinical.com/education/chat\" target=\"_blank\" rel=\"noopener\">Ask AI</a>.<br>\n  <b>Signature programs (from site):</b> APP Intensive: Cardiology \u00b7 APP Intensive: Dermatology \u00b7 APPlexus Fall 2026 \u00b7 Hot Topics in Neurology \u00b7 MEDX Primary Care \u00b7 Mood Disorders Summit \u00b7 Psychiatry Update \u00b7 Women's Health Update.<br>\n  <b>Resource Hubs:</b> Atopic Dermatitis \u00b7 Brain Health \u00b7 Mental Health in HIV \u00b7 Opioid REMS \u00b7 Quality Improvement \u00b7 Rare Blood Diseases \u00b7 Your Role in HIV \u2014 all under <a href=\"https://deceraclinical.com/education\" target=\"_blank\" rel=\"noopener\">deceraclinical.com/education</a>.<br>\n  <b>Corporate:</b> <a href=\"https://corporate.deceraclinical.com/\" target=\"_blank\" rel=\"noopener\">corporate.deceraclinical.com</a> \u00b7\n  <a href=\"https://www.prnewswire.com/news-releases/clinical-education-alliance-becomes-decera-clinical-delivering-education-insights-and-communications-302634294.html\" target=\"_blank\" rel=\"noopener\">Clinical Education Alliance \u2192 Decera Clinical Education rebrand (PRNewswire)</a>.\n  <br><i>Additional product names in cards above (Activeer, Chapter Meeting, Local Lives, Masterclass, IDST, ClinicalXchange, Satellite Symposium, Interactive Video Module) come from the internal Decera Clinical Education Ecosystem map and are not published as dedicated pages on the public site.</i>\n</div>";


/* ---------- tiny helpers ---------- */
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s==null?"":s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmtD = d => { if(!d) return "—"; const p=String(d).split("-"), M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; return p.length>=2 ? (p[2]?(+p[2])+" ":"")+M[+p[1]-1]+" "+p[0] : d; };
const daysOut = d => { const t=new Date(d); return isNaN(t) ? null : Math.round((t - new Date())/864e5); };

const supKeyLite = x => String(x||"").toLowerCase().replace(/[^a-z0-9]/g,"").slice(0,12);

/* ---------- BUSINESS-UNIT REGISTRY ---------- */
const BUS = {
  multi: {
    label: "MULTI",
    spaces: ["cardiovascular","nephrology","endocrinology","immunology","raredisease","ophthalmology"],
    sub: "Cardiovascular · Nephrology · Endocrinology · Immunology · Rare Disease · Ophthalmology. For each space: which companies to watch, what medications and stage, live clinical-trial activity, official press-release feeds, and IME grant / RFP portals."
  },
  neuro: {
    label: "Neuroscience",
    spaces: ["n_alz","n_pd","n_ms","n_epi","n_mig","n_psy","n_nmd","n_strk","n_slp","n_rare"],
    sub: "Alzheimer's · Parkinson's · Multiple Sclerosis · Epilepsy · Migraine · Psychiatry · Neuromuscular · Stroke · Sleep · Rare Neuro. For each space: which companies to watch, what medications and stage, live clinical-trial activity, official press-release feeds, and IME grant / RFP portals."
  }
};

/* Seed the 10 neuro sub-TAs into CURATED so one lookup serves both BUs. */
(function(){
  const m = {alz:"n_alz",pd:"n_pd",ms:"n_ms",epi:"n_epi",mig:"n_mig",psy:"n_psy",nmd:"n_nmd",strk:"n_strk",slp:"n_slp",rare:"n_rare"};
  Object.keys(m).forEach(k=>{
    const s = NEURO_CURATED[k]; if(!s) return;
    CURATED[m[k]] = { grants:(s.grants||[]).map(g=>({co:g.co,url:g.url,focus:g.focus,dl:"Rolling — verify on portal",rfp:g.rfp||"signal"})),
                      companies:(s.companies||[]).map(c=>({name:c.name,type:c.type||"biotech",region:c.region,drugs:c.drugs,stage:c.stage,news:c.news})),
                      signals:s.signals||"" };
  });
})();

/* ---------- NORMALIZED PER-BU DATA (D) ----------
   Every section renderer reads D[bu].<slot>. Same slots, same shapes. */
const NK = {alz:"n_alz",pd:"n_pd",ms:"n_ms",epi:"n_epi",mig:"n_mig",psy:"n_psy",nmd:"n_nmd",strk:"n_strk",slp:"n_slp",rare:"n_rare"};
const D = {
  multi: {
    rfpDated : (RFPDL||[]).map(r=>({co:r.co,title:r.title,due:r.due,note:r.note})),
    rfpNote  : RFPDL_NOTE,
    portals  : RFP_PORTALS.map(p=>({co:p.co,url:p.url,variant:p.variant,cadence:p.cadence,note:p.note})),
    confs    : CONFERENCES.map(c=>({name:c.name,date:c.start,loc:[c.city,c.country].filter(Boolean).join(", "),scope:c.note||"",url:c.url,tag:c.hashtag||c.short||""})),
    emphasis : Object.keys(EMPHASIS).map(sup=>{const e=EMPHASIS[sup];return {sup,portal:e.portal,url:e.url,
                 nowWhen:(e.cycles&&e.cycles[0])?e.cycles[0].when:"",prevWhen:(e.cycles&&e.cycles[1])?e.cycles[1].when:"",
                 now:(e.cycles&&e.cycles[0])?e.cycles[0].topics.join(" · "):"",prev:(e.cycles&&e.cycles[1])?e.cycles[1].topics.join(" · "):"",
                 gaps:(e.gaps||[])};}),
    radar    : RADAR.map(r=>({title:r.title,tag:(SPACENAME[r.space]||r.space)+" · "+(r.impact||""),body:r.summary,extra:r.clinical,src:r.url,date:r.date})),
    pdufa    : PDUFA.map(p=>({co:p.co,drug:p.asset,ind:p.indication,date:p.date,type:p.type,note:p.note})),
    signals  : SIGNALS, // keyed by space -> [[text,url?],...]
    newsupp  : NEWSUPP.map(n=>({co:n.co,asset:n.ta,timing:n.catalyst,note:(n.notes||""),url:(Array.isArray(n.portal)?n.portal[1]:n.portal)||"",contact:n.contact||"",compCME:n.compCME||[]})),
    pipeline : WATCH.map(w=>({co:w.co,asset:w.asset,timing:w.timing,note:w.trigger})),
    directory: MASTER.map(m=>({co:m.co,ta:(m.spaces||[]).map(s=>SPACENAME[s]||s).join(", "),contact:m.focus,route:m.region,rfp:m.rfp,url:m.url})),
    supstrat : Object.keys(SUPSTRAT).map(sup=>{const p=SUPSTRAT[sup];return {sup,
                 priority:(p.pipeline||p.financial||""),format:(p.eduGap||""),milestone:(p.approvals||""),
                 ask:(p.quarterly||""),links:p.links||[],quarters:p.quarters||[]};}),
    coifStatic: (typeof COIF_MULTI_HTML!=="undefined")?COIF_MULTI_HTML:"",
    coif     : [],
    whitespace: WHITESPACE.multi,
    kol      : (window.KOL_DATA||[]),
    kolArea  : k => SPACENAME[k]||k,
    cintel   : CINTEL,
    gapCorpus: null // built lazily
  },
  neuro: {
    rfpDated : NEURO_RFP.map(r=>({co:r.co,title:r.title,due:r.due,note:r.note})),
    rfpNote  : "Dated neuroscience RFP / CGA windows, soonest first — anything inside 90 days needs a concept scoped and a supporter conversation already under way. The portal directory below is where each neuroscience funder posts.",
    portals  : (()=>{const seen={};const out=[];
      Object.keys(NEURO_CURATED).forEach(k=>{(NEURO_CURATED[k].grants||[]).forEach(g=>{if(seen[supKeyLite(g.co)])return;seen[supKeyLite(g.co)]=1;out.push({co:g.co,url:g.url,variant:(g.rfp||"signal").toUpperCase(),cadence:NEURO_CURATED[k].label,note:g.focus});});});
      // The standing cross-company IME portal directory applies to every therapeutic area —
      // append any funder not already listed so Neuroscience sees the complete portal universe.
      RFP_PORTALS.forEach(p=>{if(seen[supKeyLite(p.co)])return;seen[supKeyLite(p.co)]=1;out.push({co:p.co,url:p.url,variant:p.variant,cadence:p.cadence,note:p.note});});
      return out;})(),
    confs    : NEURO_CONF.map(c=>({name:c.name,date:c.date,loc:c.loc,scope:c.scope,url:"",tag:(c.name.match(/^[A-Z]{2,10}/)||[""])[0]})),
    emphasis : NEURO_EMPHASIS.map(e=>{
      // Pair each drift-gap with the educational design that answers it — the design is the
      // supporter's curated "ask" from the neuro strategy profiles (same voice as MULTI's pairs).
      const key=Object.keys(NEURO_SUPSTRAT).find(k=>{
        const a=k.toLowerCase(), b=e.sup.toLowerCase();
        return a.includes(b.split(" ")[0])||b.includes(a.split(" ")[0])||(b==="bms"&&a.startsWith("bristol"));
      });
      const LILLY_DESIGN="A Kisunla limited-duration dosing curriculum — amyloid-PET confirmation, ARIA monitoring cadence, and explicit stop-rule criteria at 12-18 months — built for community neurology, where the when-to-stop question is currently unanswered by any independent programme.";
      const design=(key?(NEURO_SUPSTRAT[key].ask||""):(e.sup==="Lilly"?LILLY_DESIGN:""));
      return {sup:e.sup,portal:"",url:"",nowWhen:"",prevWhen:"",now:e.now,prev:e.prev,
              gaps:e.drift?[{space:"",gap:e.drift,design:design}]:[]};
    }),
    radar    : Object.keys(NEURO_CINTEL).map(k=>{const c=NEURO_CINTEL[k];return {title:(NEURO_CURATED[k]||{label:k}).label+" — competitive picture",
                 tag:"Funders: "+c.funders.split(",")[0]+"…",body:c.priorities,extra:c.gaps,src:"",date:""};}),
    pdufa    : NEURO_PDUFA.map(p=>({co:p.co,drug:p.drug,ind:p.indication,date:p.date,type:"PDUFA / catalyst",note:p.note})),
    signals  : (()=>{const o={};Object.keys(NEURO_SIGNALS).forEach(k=>o[NK[k]||k]=NEURO_SIGNALS[k]);return o;})(),
    newsupp  : NEURO_WATCH.map(w=>({co:w.co,asset:w.asset,timing:w.timing,note:w.note,url:"",contact:"",compCME:[]})),
    pipeline : NEURO_WATCH.map(w=>({co:w.co,asset:w.asset,timing:w.timing,note:w.note})),
    directory: NEURO_DIRECTORY.map(d=>({co:d.co,ta:d.ta,contact:d.contact,route:d.route,rfp:d.rfp,url:""})),
    supstrat : Object.keys(NEURO_SUPSTRAT).map(sup=>{const p=NEURO_SUPSTRAT[sup];return {sup,priority:p.priority,format:p.format,milestone:p.milestone,ask:p.ask,links:[],quarters:[]};}),
    coifStatic: "",
    coif     : NEURO_COIF,
    whitespace: WHITESPACE.neuro,
    kol      : (typeof NEURO_KOL_ADD!=="undefined")?NEURO_KOL_ADD:[],
    kolArea  : k => (NEURO_CURATED[k]||{}).label || SPACENAME[NK[k]||k] || k,
    cintel   : NEURO_CINTEL,
    gapCorpus: null
  }
};

/* ---------- STATE ---------- */
let BU = "multi", TA = "all", SUBTA = "all", SUP = [], TRIALS = {}, EXPAND = {}, TRIAL_STATUS = "loading";
try{ BU = localStorage.getItem("hub_bu")==="neuro" ? "neuro" : "multi"; }catch(e){}

const supMatch = text => !SUP.length || SUP.some(s=>{
  const t=(text||"").toLowerCase(), n=s.toLowerCase();
  return t.includes(n) || t.includes(n.split(/[ /]/)[0]);
});

/* ---------- SUPPORTER UNIVERSE (per BU, for the filter + pickers) ---------- */
function supportersFor(bu){
  const set = new Set();
  const add = n => { if(!n) return; const c=String(n).split(" /")[0].trim(); if(c.length>1 && !_NON_PHARMA.test(c)) set.add(c); };
  BUS[bu].spaces.forEach(k=>{ const c=CURATED[k]||{}; (c.grants||[]).forEach(g=>add(g.co)); (c.companies||[]).forEach(x=>add(x.name)); });
  D[bu].directory.forEach(d=>add(d.co));
  D[bu].newsupp.forEach(n=>add(n.co));
  D[bu].pipeline.forEach(p=>add(p.co));
  D[bu].supstrat.forEach(s=>add(s.sup));
  // Full universe: every pharma & biotech we know of, so no picker is ever limited
  // to the handful already in curated rows. Same list in BOTH business units.
  if(typeof ALL_PHARMA_BIOTECH!=="undefined") ALL_PHARMA_BIOTECH.forEach(add);
  return [...set].sort((a,b)=>a.localeCompare(b));
}

/* ---------- SHARED CARD RENDERERS (used identically by both BUs) ---------- */
const grantCard = g => `<div class="grant"><b>${esc(g.co)}</b> <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:800;background:#0f1a1a;color:#c6f34e;padding:2px 6px;margin-left:4px">${esc((g.rfp||"").toUpperCase())}</span>
  <div style="font-size:12px;margin:5px 0;line-height:1.5">${esc(g.focus)}</div>
  <div style="font-size:11px;color:#5b6666">${esc(g.dl||"")}</div>
  ${g.url?`<a href="${g.url}" target="_blank" rel="noopener" style="font-size:11.5px">Portal →</a>`:""}</div>`;

const companyCard = c => `<div class="grant"><div style="display:flex;justify-content:space-between;gap:8px"><b>${esc(c.name)}</b><span style="font-size:10px;color:#5b6666">${esc(c.region||"")}</span></div>
  <div style="font-size:12px;margin:5px 0;line-height:1.5">${esc(c.drugs||"")}</div>
  <div style="font-size:11.5px;color:#2f7d55">${esc(c.stage||"")}</div>
  ${c.news?`<a href="${c.news}" target="_blank" rel="noopener" style="font-size:11px">Newsroom →</a>`:""}</div>`;

const trialCard = t => `<div class="grant"><div style="display:flex;justify-content:space-between;gap:6px"><span style="font-family:'JetBrains Mono',monospace;font-size:10px;background:#eaf6ef;color:#2f7d55;padding:2px 6px;font-weight:800">${esc(t.phase)}</span><span style="font-size:10px;color:#5b6666">${esc(fmtD(t.updated))}</span></div>
  <div style="font-size:12px;font-weight:600;margin:6px 0;line-height:1.45">${esc(t.title)}</div>
  <div style="font-size:11.5px"><b>${esc(t.sponsor)}</b> · ${esc(t.cond||"")}</div>
  <div style="font-size:11px;color:#5b6666;margin-top:4px">${esc(t.status)} · ${t.enroll?esc(t.enroll)+" pts":"—"}</div>
  <a href="https://clinicaltrials.gov/study/${t.nct}" target="_blank" rel="noopener" style="font-size:11px">${esc(t.nct)} →</a></div>`;

/* ---------- supporter name matching (aliases, short forms) ---------- */
const supKey = s => String(s||"").toLowerCase().replace(/[^a-z0-9]/g,"");
function supEq(a,b){
  if(!a||!b) return false;
  const ak=supKey(a), bk=supKey(b);
  if(ak.includes(bk)||bk.includes(ak)) return true;
  if(typeof SUP_ALIASES!=="undefined") for(const v in SUP_ALIASES){ if(supKey(SUP_ALIASES[v])===bk && ak.includes(supKey(v))) return true; }
  return false;
}
function textHasSup(txt,name){
  if(!txt||!name) return false;
  const t=supKey(txt), nk=supKey(String(name).split(" /")[0]);
  if(t.includes(nk)) return true;
  if(typeof SUP_ALIASES!=="undefined") for(const v in SUP_ALIASES){ if(supKey(SUP_ALIASES[v])===nk && t.includes(supKey(v))) return true; }
  return false;
}
/* Which therapeutic areas (across BOTH business units) a supporter touches. */
function supSpaces(name){
  return Object.keys(CURATED).filter(k=>
    (CURATED[k].companies||[]).some(c=>supEq(c.name,name)) ||
    (CURATED[k].grants||[]).some(g=>supEq(g.co,name)));
}

/* ============================================================================
   SECTION REGISTRY — the single source of truth for the hub outline.
   Rendered in this exact order for BOTH business units.
   ========================================================================== */
const SECTIONS = [
  { id:"rfp", jump:"📋 Grant opportunities (RFP/CGA/CFG)", title:"📋 Grant opportunities — RFP · CGA · CFG",
    render(bu){
      const d=D[bu];
      const dated = d.rfpDated.filter(r=>supMatch(r.co+" "+r.title));
      const rows = dated.sort((a,b)=>String(a.due).localeCompare(String(b.due))).map(r=>{
        const o=daysOut(r.due);
        return `<tr><td style="font-family:'JetBrains Mono',monospace;white-space:nowrap">${esc(r.due)}</td>
          <td style="font-family:'JetBrains Mono',monospace;color:${o!=null&&o<90?'#a33':'#5b6666'}">${o!=null?o+"d":"—"}</td>
          <td><b>${esc(r.co)}</b></td><td>${esc(r.title)}</td><td style="font-size:12px">${esc(r.note||"")}</td></tr>`;}).join("");
      const portals = d.portals.filter(p=>supMatch(p.co)).map(p=>`<div class="grant"><b>${esc(p.co)}</b>
        <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:800;background:#0f1a1a;color:#c6f34e;padding:2px 6px;margin-left:4px">${esc(p.variant||"RFP")}</span>
        <div style="font-size:11.5px;color:#5b6666;margin:4px 0">${esc(p.cadence||"")}</div>
        <div style="font-size:12px;line-height:1.5">${esc(p.note||"")}</div>
        ${p.url?`<a href="${p.url}" target="_blank" rel="noopener" style="font-size:11.5px">Portal →</a>`:""}</div>`).join("");
      return `<table class="koltable" style="width:100%"><thead><tr><th>DUE</th><th>OUT</th><th>SUPPORTER</th><th>CALL</th><th>NOTE</th></tr></thead><tbody>${rows||'<tr><td colspan="5" class="empty" style="font-size:12px;padding:10px">No funder has a published, dated, in-scope deadline right now — the weekly refresh adds dated calls here the moment they post. The standing portal directory below is where they appear first.</td></tr>'}</tbody></table>`+`
        <p class="sub" style="margin:14px 0 10px;font-size:12px">${esc(d.rfpNote)}</p>
        <div class="blocklabel">Standing portal directory — where each funder posts</div>
        <div class="grantgrid">${portals||'<div class="empty">No portals match this filter.</div>'}</div>`;
    }},
  { id:"confcheck", jump:"🎯 Conference checkpoints", title:"🎯 Conference lead-time checkpoints — 9 / 6 / 3 months out",
    render(bu){
      const confs = D[bu].confs.map(c=>({...c,o:daysOut(c.date)})).filter(c=>c.o!=null&&c.o>=0);
      const bucket=(lo,hi)=>confs.filter(c=>c.o>=lo&&c.o<hi).sort((a,b)=>a.o-b.o)
        .map(c=>{
          const tag=(c.tag||c.name.split(' ')[0]).replace(/[^A-Za-z0-9]/g,'');
          const li=(lab,q)=>`<a href="https://www.linkedin.com/search/results/content/?keywords=${encodeURIComponent(q)}" target="_blank" rel="noopener" style="display:inline-block;border:1px solid #d5ddec;background:#f4f7fd;color:#3b5ea8;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;margin:3px 4px 0 0;text-decoration:none">${lab}</a>`;
          return `<div style="border:1px solid var(--line);background:#fff;padding:9px 11px;margin-top:8px">
          <b style="font-size:12.5px">${esc(c.name)}</b><div style="font-size:11px;color:#5b6666">${esc(fmtD(c.date))} · ${esc(c.loc)} · ${c.o}d out · <a href="${c.url||('https://www.google.com/search?q='+encodeURIComponent(c.name+' registration abstract deadline'))}" target="_blank" rel="noopener">congress site →</a></div>
          <div>${li('in: #'+tag,'#'+tag)}${li('in: '+tag+' Medical Affairs',tag+' "Medical Affairs"')}${li('in: '+tag+' symposium',tag+' "satellite symposium" OR "industry symposium"')}</div></div>`;}).join("")||'<div class="empty" style="margin-top:8px">Nothing in this window.</div>';
      const box=(t,s,inner)=>`<div style="border:1.5px solid #0f1a1a;background:#fbfaf4"><div style="background:#0f1a1a;color:#fff;padding:10px 14px"><b>${t}</b><div style="font-size:11px;color:#c6f34e">${s}</div></div><div style="padding:10px 14px">${inner}</div></div>`;
      return `<p class="sub" style="margin:8px 0 12px">Counted back from each congress start. Supporter approvals take <b>60–90 days</b> — the 9-month box is when a satellite proposal should already be with a supporter.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px">
        ${box("3 months out","Travel + supporter follow-up",bucket(0,120))}
        ${box("6 months out","Application timeline",bucket(120,240))}
        ${box("9 months out","Satellite proposal to supporters",bucket(240,330))}</div>`;
    }},
  { id:"congress", jump:"🗓️ Congress calendar", title:"🗓️ Congress calendar — next 12 months",
    render(bu){
      const rows = D[bu].confs.map(c=>({...c,o:daysOut(c.date)})).filter(c=>c.o!=null&&c.o>=0&&c.o<=366).sort((a,b)=>a.o-b.o)
        .map(c=>`<tr><td style="font-family:'JetBrains Mono',monospace;white-space:nowrap">${esc(c.date)}</td>
          <td style="font-family:'JetBrains Mono',monospace;color:${c.o<90?'#a33':'#5b6666'}">${c.o}d</td>
          <td><b>${esc(c.name)}</b> <a href="${c.url||('https://www.google.com/search?q='+encodeURIComponent(c.name+' registration'))}" target="_blank" rel="noopener" style="font-size:10.5px">site →</a></td>
          <td style="white-space:nowrap;font-size:11.5px;color:#5b6666">${esc(c.loc)}</td><td style="font-size:12px">${esc(c.scope).slice(0,220)}</td></tr>`).join("");
      return `<table class="koltable" style="width:100%"><thead><tr><th>DATE</th><th>OUT</th><th>CONGRESS</th><th>LOCATION</th><th>WHY IT MATTERS</th></tr></thead>
        <tbody>${rows||'<tr><td colspan="5" class="empty">No dated congresses inside 12 months.</td></tr>'}</tbody></table>`;
    }},
  { id:"lookup", jump:"🔎 Supporter lookup", bare:true, title:"",
    render(bu){
      const chips=(bu==="neuro"
        ?["Biogen","Eisai","Lilly","AbbVie","Novartis","Jazz","argenx","Sarepta"]
        :["Eli Lilly","Novartis","Johnson & Johnson","AstraZeneca","Takeda","Vertex","Apellis","argenx"])
        .map(s=>`<button class="lk-chip" data-lk="${esc(s)}" style="border:1px solid #d5ddec;background:#f4f7fd;color:#3b5ea8;font-size:12px;font-weight:600;padding:5px 13px;cursor:pointer;border-radius:16px">${esc(s)}</button>`).join(" ");
      const opts=[...new Set([...supportersFor("multi"),...supportersFor("neuro")])].sort().map(s=>`<option value="${esc(s)}">`).join("");
      return `<div class="lookup" id="s-lookup-card" style="border:1.5px solid #2f8d67;border-left:5px solid #2f8d67;border-radius:14px;background:#fff;padding:20px 24px">
        <div class="lk-head" style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px">
          <span class="lk-ico" style="font-size:22px">🔎</span>
          <div>
            <h2 style="font-size:19px;margin:0 0 4px;letter-spacing:-.2px">Supporter lookup — financial reports, grant portals &amp; competitive intelligence</h2>
            <p style="font-size:12.6px;color:#5b6666;margin:0;line-height:1.55;max-width:820px">Type any company name to get its <b>Q1–Q4 earnings reports</b>, grant portal, newsroom, pipeline, what each quarter said, and the competitor programs running in its therapeutic areas. Searches <b>both business units</b>.</p>
          </div>
        </div>
        <div class="lk-bar" style="display:flex;gap:8px">
          <input id="lkInput" list="lkList" placeholder="Start typing a supporter — e.g. ${bu==="neuro"?"Biogen, Eisai, Lilly, argenx, Jazz":"Novartis, Lilly, J&amp;J, Takeda, Vertex"}…" autocomplete="off"
            style="flex:1;padding:11px 14px;font-size:14px;border:2px solid #0f1a1a;border-radius:10px;background:#fff">
          <datalist id="lkList">${opts}</datalist>
          <button id="lkGo" style="background:#2f8d67;color:#fff;border:0;border-radius:8px;padding:10px 20px;font-size:14px;font-weight:700;cursor:pointer">Look up</button>
          <button id="lkClear" hidden style="border:1px solid #e2c9c9;background:#fdf4f4;color:#a33;border-radius:8px;padding:6px 12px;cursor:pointer">✕</button>
        </div>
        <div style="margin-top:10px;font-size:11px;color:#5b6666"><span style="font-family:'JetBrains Mono',monospace;font-weight:800;letter-spacing:.08em">TRY:</span> ${chips}</div>
        <div id="lkOut" style="margin-top:14px"></div>
      </div>`;
    },
    wire(bu){
      const inp=$("#lkInput"), out=$("#lkOut"), clr=$("#lkClear");
      const row=(k,html)=>`<div style="font-size:12.4px;line-height:1.55;padding:5px 0;border-bottom:1px dotted #e4e4de"><span style="display:inline-block;font-size:9.5px;font-weight:800;color:#fff;background:${taColor(k)};padding:2px 7px;border-radius:4px;margin-right:6px">${esc(taLabel(k))}</span>${html}</div>`;
      const secBox=(h,body)=>body?`<div style="margin-top:14px"><div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:#0f1a1a;border-bottom:2px solid #0f1a1a;padding-bottom:5px;margin-bottom:7px">${h}</div>${body}</div>`:"";
      function render(name){
        const spaces=supSpaces(name);
        const spChips=spaces.map(k=>`<span style="font-size:10px;font-weight:800;color:#fff;background:${taColor(k)};padding:3px 9px;border-radius:5px;margin-right:5px">${esc(taLabel(k))}</span>`).join("");
        const strat=[...D.multi.supstrat,...D.neuro.supstrat].find(s=>supEq(s.sup,name));
        /* 1) financial reports */
        let fin="";
        if(strat&&strat.quarters&&strat.quarters.length){
          fin=`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px">`+strat.quarters.map(([lab,st,url,when,note])=>{
            const up=st==="upcoming";
            return `<div style="border:1.5px solid ${up?"#d9c27a":"#bcd8c6"};background:${up?"#fdf9ee":"#f4faf6"};padding:10px 12px;border-radius:8px">
              <b style="font-size:12px">${esc(lab)}</b> <span style="font-size:9.5px;font-weight:800;color:${up?"#a06a12":"#2f7d55"}">${up?"UPCOMING":"REPORTED"}</span>
              <div style="font-size:11px;color:#5b6666">${esc(when||"")}</div>
              ${note?`<div style="font-size:11px;margin-top:4px;line-height:1.45">${esc(note)}</div>`:""}
              ${url?`<a href="${url}" target="_blank" rel="noopener" style="font-size:11px">${up?"Watch for it →":"Read the report →"}</a>`:""}</div>`;}).join("")+`</div>
            <div style="font-size:10.5px;color:#5b6666;margin-top:6px;font-style:italic">Earnings calls are when a supporter restates priorities — that is when education budgets get re-pointed.</div>`;
        } else {
          const news=[]; Object.keys(CURATED).forEach(k=>(CURATED[k].companies||[]).forEach(c=>{if(supEq(c.name,name)&&c.news)news.push(c.news);}));
          fin=`<div style="font-size:12px;color:#5b6666">No quarterly profile built for ${esc(name)} yet — the most active supporters have full Q1–Q4 data.${news.length?` Newsroom: <a href="${news[0]}" target="_blank" rel="noopener">${esc(news[0])}</a>`:""}</div>`;
        }
        /* 2) official links */
        const links=(strat&&strat.links||[]).map(([lab,url])=>`<a href="${url}" target="_blank" rel="noopener" style="display:inline-block;border:1.5px solid #0f1a1a;background:#fff;padding:6px 12px;margin:4px 6px 0 0;font-size:12px;text-decoration:none;color:#0f1a1a">${esc(lab)} →</a>`).join("");
        /* 3) grant portals across both BUs */
        const gr=[]; Object.keys(CURATED).forEach(k=>(CURATED[k].grants||[]).forEach(g=>{ if(supEq(g.co,name)) gr.push(row(k,`<b>${esc(g.co)}</b> — ${esc(g.focus)} <span style="font-size:9.5px;font-weight:800;background:#0f1a1a;color:#c6f34e;padding:2px 6px">${esc((g.rfp||"").toUpperCase())}</span> ${g.url?`<a href="${g.url}" target="_blank" rel="noopener">portal →</a>`:""}`)); }));
        /* 4) assets */
        const assets=[]; Object.keys(CURATED).forEach(k=>(CURATED[k].companies||[]).forEach(c=>{ if(supEq(c.name,name)) assets.push(row(k,`<b>${esc(c.drugs)}</b> — ${esc(c.stage)}${c.news?` <a href="${c.news}" target="_blank" rel="noopener">news →</a>`:""}`)); }));
        /* 5) signals mentioning them — both BUs */
        const sigs=[];
        Object.keys(SIGNALS).forEach(k=>(SIGNALS[k]||[]).forEach(s=>{const t=Array.isArray(s)?s:[s]; if(textHasSup(t[0],name)) sigs.push(row(k,`${esc(t[0])}${t[1]?` <a href="${t[1]}" target="_blank" rel="noopener">source →</a>`:""}`));}));
        Object.keys(NEURO_SIGNALS).forEach(k=>(NEURO_SIGNALS[k]||[]).forEach(s=>{const t=Array.isArray(s)?s:[s]; if(textHasSup(t[0],name)) sigs.push(row(NK[k]||k,`${esc(t[0])}${t[1]?` <a href="${t[1]}" target="_blank" rel="noopener">source →</a>`:""}`));}));
        /* 6) strategy read */
        const stratRead=strat?[
          strat.milestone?`<div style="font-size:12.4px;padding:4px 0"><b>Recent approvals / milestones:</b> ${esc(strat.milestone)}</div>`:"",
          strat.priority?`<div style="font-size:12.4px;padding:4px 0"><b>Stated priorities:</b> ${esc(strat.priority)}</div>`:"",
          strat.format?`<div style="font-size:12.4px;padding:4px 0"><b>Education / funding posture:</b> ${esc(strat.format)}</div>`:"",
          strat.ask?`<div style="font-size:12.4px;padding:4px 0;color:#3b5ea8"><b>The ask:</b> ${esc(strat.ask)}</div>`:""
        ].join(""):"";
        /* 7) competitive intelligence for their spaces — MULTI rich blocks incl. program links, NEURO blocks */
        const ciB=[];
        Object.keys(CINTEL).forEach(k=>{
          const ci=CINTEL[k]; if(!ci) return;
          if(spaces.indexOf(k)===-1 && !textHasSup([ci.funders2526,ci.priorities,ci.businessImplications].join(" "),name)) return;
          const progs=(ci.competitorFormats||[]).map(cf=>`<li style="margin:3px 0;font-size:12px"><b>${esc(cf.provider)}</b> · <span style="color:#d4760a;font-weight:600">${esc(cf.format)}</span> — ${esc(cf.program)}${cf.url?` <a href="${cf.url}" target="_blank" rel="noopener">view program →</a>`:""}</li>`).join("");
          ciB.push(`<div style="border:1px solid var(--line);background:#fbfaf4;padding:12px 14px;margin-top:10px;border-radius:8px">
            <div style="font-weight:800;font-size:12.5px;margin-bottom:6px"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${taColor(k)};margin-right:6px"></span>${esc(taLabel(k))}</div>
            <div style="font-size:12.2px;padding:3px 0"><b>Who funded education 2025–26:</b> ${esc(ci.funders2526||"—")}</div>
            <div style="font-size:12.2px;padding:3px 0"><b>Providers awarded:</b> ${esc(ci.providers||"—")}</div>
            <div style="font-size:12.2px;padding:3px 0"><b>Formats supported:</b> ${esc(ci.formats||"—")}</div>
            <div style="font-size:12.2px;padding:3px 0"><b>Unsolicited receptivity:</b> ${esc(ci.receptivity||"—")}</div>
            <div style="font-size:12.2px;padding:3px 0"><b>Competitor education gaps:</b> ${esc(ci.competitorGaps||"—")}</div>
            ${progs?`<div style="font-size:12.2px;padding:3px 0"><b>Competitor programs running now — with links:</b><ul style="margin:4px 0 0;padding-left:18px">${progs}</ul></div>`:""}</div>`);
        });
        Object.keys(NEURO_CINTEL).forEach(k=>{
          const ci=NEURO_CINTEL[k], nk=NK[k]||k;
          if(spaces.indexOf(nk)===-1 && !textHasSup([ci.funders,ci.priorities].join(" "),name)) return;
          ciB.push(`<div style="border:1px solid var(--line);background:#fbfaf4;padding:12px 14px;margin-top:10px;border-radius:8px">
            <div style="font-weight:800;font-size:12.5px;margin-bottom:6px"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${taColor(nk)};margin-right:6px"></span>${esc(taLabel(nk))}</div>
            <div style="font-size:12.2px;padding:3px 0"><b>Who funds education:</b> ${esc(ci.funders||"—")}</div>
            <div style="font-size:12.2px;padding:3px 0"><b>Providers awarded:</b> ${esc(ci.providers||"—")}</div>
            <div style="font-size:12.2px;padding:3px 0"><b>Formats supported:</b> ${esc(ci.formats||"—")}</div>
            <div style="font-size:12.2px;padding:3px 0"><b>Unsolicited receptivity:</b> ${esc(ci.receptivity||"—")}</div>
            <div style="font-size:12.2px;padding:3px 0"><b>Education gaps:</b> ${esc(ci.gaps||"—")}</div></div>`);
        });
        out.innerHTML=`<div style="border-top:2px solid #0f1a1a;padding-top:12px">
          <div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap"><h3 style="margin:0;font-size:20px">${esc(name)}</h3>${spChips}</div>
          ${secBox("📅 Financial reports — Q1 to Q4 2026",fin)}
          ${secBox("🔗 Official portals &amp; disclosures",links)}
          ${secBox("💰 Grant portals by therapeutic area",gr.join("")||`<div style="font-size:12px;color:#5b6666">No grant portal catalogued for ${esc(name)} — they may be pipeline-only, or fund through a parent company.</div>`)}
          ${secBox("🧪 Tracked assets",assets.join(""))}
          ${secBox("⚡ Recent signals mentioning them",sigs.join(""))}
          ${secBox("🎯 Strategy read",stratRead)}
          ${secBox("🔍 Competitive intelligence — with program links",ciB.join(""))}
          <div style="font-size:10.5px;color:#5b6666;margin-top:12px;font-style:italic">Grant requests go through the official portal or grants office only — never to a named Medical Affairs person. MA/MSL contacts are for scientific exchange.</div>
        </div>`;
        clr.hidden=false;
      }
      const go=()=>{
        const q=(inp.value||"").trim(); if(!q){out.innerHTML="";return;}
        const all=[...new Set([...supportersFor("multi"),...supportersFor("neuro")])];
        const hit=all.find(n=>supKey(n)===supKey(q))||all.find(n=>supKey(n).startsWith(supKey(q)))||all.find(n=>supKey(n).includes(supKey(q)))
          ||(typeof SUP_ALIASES!=="undefined"&&Object.keys(SUP_ALIASES).find(v=>supKey(v).includes(supKey(q)))?SUP_ALIASES[Object.keys(SUP_ALIASES).find(v=>supKey(v).includes(supKey(q)))]:null);
        if(hit) render(hit);
        else out.innerHTML=`<div class="empty">No supporter matches “${esc(q)}”. Try a shorter form — “Lilly”, “J&amp;J”, “AZ”, “BMS” all work — or pick from the suggestions as you type.</div>`;
      };
      $("#lkGo").addEventListener("click",go);
      inp.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();go();}});
      inp.addEventListener("change",go);
      clr.addEventListener("click",()=>{inp.value="";out.innerHTML="";clr.hidden=true;inp.focus();});
      $$(".lk-chip").forEach(b=>b.addEventListener("click",()=>{inp.value=b.dataset.lk;go();}));
    }},
  { id:"emphasis", jump:"🎯 Supporter emphasis drift", title:"🎯 Supporter emphasis & drift",
    render(bu){
      const cards = D[bu].emphasis.filter(e=>supMatch(e.sup)).map(e=>{
        // The strategic core of this section: each remaining GAP paired with the EDUCATIONAL
        // DESIGN that answers it — restored exactly as the original tracker framed it.
        const gapRows=(e.gaps||[]).map(g=>`<div style="border-left:3px solid #a06a12;background:#fdf9ee;padding:8px 11px;margin-top:7px">
          ${g.space?`<span style="font-size:9px;font-weight:800;color:#fff;background:${taColor(g.space)};padding:2px 7px;border-radius:4px">${esc(taLabel(g.space))}</span>`:""}
          <div style="font-size:12px;margin-top:4px;line-height:1.5"><b>Remaining gap:</b> ${esc(g.gap||String(g))}</div>
          ${g.design?`<div style="font-size:12px;color:#2f7d55;margin-top:4px;line-height:1.5"><b>Educational design that answers it:</b> ${esc(g.design)}</div>`:""}</div>`).join("");
        return `<div class="grant" data-sup="${esc(e.sup)}">
        <b>${esc(e.sup)}</b> <a href="${e.url||('https://www.google.com/search?q='+encodeURIComponent('"'+e.sup+'" independent medical education grants'))}" target="_blank" rel="noopener" style="font-size:11px">${esc(e.portal||"find portal")} →</a>
        ${e.prev?`<div style="font-size:11.5px;color:#5b6666;margin-top:6px"><b>Then${e.prevWhen?" ("+esc(fmtD(e.prevWhen))+")":""}:</b> ${esc(e.prev)}</div>`:""}
        ${e.now?`<div style="font-size:12px;margin-top:4px"><b>Now${e.nowWhen?" ("+esc(fmtD(e.nowWhen))+")":""}:</b> ${esc(e.now)}</div>`:""}
        ${gapRows}</div>`;}).join("");
      const total=D[bu].emphasis.length;
      const drifted=D[bu].emphasis.filter(e=>(e.gaps||[]).length).length;
      return `<p class="sub" style="margin:8px 0 12px">What supporters said they wanted last cycle vs now — dated, documented shifts only. This is where the pitch narrative changes.</p>
        <div class="note" style="margin:0 0 12px;font-family:'JetBrains Mono',monospace;font-size:12px"><b>${total}</b> supporters tracked · <b>${drifted}</b> with a recorded change in stated topics · verified <b>${typeof EMPHASIS_UPDATED!=="undefined"?esc(EMPHASIS_UPDATED):"August 19, 2026"}</b></div>
        <div class="grantgrid">${cards||'<div class="empty">No supporters match this filter.</div>'}</div>`;
    }},
  { id:"radar", jump:"📡 Therapeutic radar", title:"📡 Therapeutic area radar",
    render(bu){
      const cards=D[bu].radar.map(r=>`<div class="grant"><span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#5b6666">${esc(r.tag)}</span>
        <div style="font-weight:700;font-size:13px;margin:5px 0">${esc(r.title)}</div>
        <div style="font-size:12px;line-height:1.55">${esc(r.body||"").slice(0,420)}</div>
        ${r.extra?`<div style="font-size:11.5px;color:#2f7d55;margin-top:6px">${esc(r.extra).slice(0,260)}</div>`:""}
        <a href="${r.src||('https://news.google.com/search?q='+encodeURIComponent(r.title.split('—')[0].slice(0,60)))}" target="_blank" rel="noopener" style="font-size:11px">${r.src?"Source":"📰 Search coverage"} →</a></div>`).join("");
      return `<div class="grantgrid">${cards}</div>`;
    }},
  { id:"supstrat", jump:"🔎 Supporter strategy profiles", title:"🔎 Supporter strategy profiles — what drives their funding",
    render(bu){
      const union=[...new Set([...supportersFor("multi"),...supportersFor("neuro")])].sort();
      const bar=`<div style="display:flex;gap:8px;align-items:center;margin:8px 0 12px;flex-wrap:wrap">
        <input id="ssSearch" list="ssList" type="search" placeholder="Search ANY supporter — profile shown if built, live links either way…" style="flex:1;min-width:300px;padding:8px 12px;font-size:13px;border:1.5px solid #0f1a1a;border-radius:0;background:#fff">
        <datalist id="ssList">${union.map(x=>`<option value="${esc(x)}">`).join("")}</datalist>
        <button id="ssClear" class="gapclear">Clear</button></div><div id="ssHit"></div>`;
      const cards=D[bu].supstrat.filter(s=>supMatch(s.sup)).map(s=>{
        const q=(s.quarters||[]).map(([lab,st,url,when])=>`<span style="display:inline-block;border:1px solid var(--line);font-size:10px;padding:2px 6px;margin:2px 3px 0 0;background:${st==="upcoming"?"#fdf7e7":"#f2f7f2"}">${esc(lab)} · ${esc(when||st)}${url?` <a href="${url}" target="_blank" rel="noopener">→</a>`:""}</span>`).join("");
        return `<div class="grant" data-sup="${esc(s.sup)}"><b>${esc(s.sup)}</b>
        ${s.priority?`<div style="font-size:12px;margin-top:5px"><b>Priority:</b> ${esc(s.priority).slice(0,300)}</div>`:""}
        ${s.milestone?`<div style="font-size:12px;margin-top:4px"><b>Milestone:</b> ${esc(s.milestone).slice(0,260)}</div>`:""}
        ${s.format?`<div style="font-size:12px;margin-top:4px"><b>Education angle:</b> ${esc(s.format).slice(0,260)}</div>`:""}
        ${s.ask?`<div style="font-size:12px;color:#3b5ea8;margin-top:4px"><b>The ask:</b> ${esc(s.ask).slice(0,260)}</div>`:""}
        ${q?`<div style="margin-top:6px">${q}</div>`:""}
        ${(s.links&&s.links.length)?s.links.slice(0,3).map(([lab,url])=>`<a href="${url}" target="_blank" rel="noopener" style="font-size:11px;margin-right:8px">${esc(lab)} →</a>`).join("")
          :`<a href="https://www.google.com/search?q=${encodeURIComponent('"'+s.sup+'" investor relations quarterly results')}" target="_blank" rel="noopener" style="font-size:11px;margin-right:8px">Investor relations →</a><a href="https://news.google.com/search?q=${encodeURIComponent('"'+s.sup+'"')}" target="_blank" rel="noopener" style="font-size:11px">📰 Newsroom →</a>`}</div>`;}).join("");
      return bar+`<div id="ssGrid" class="grantgrid">${cards||'<div class="empty">No profiles match this filter.</div>'}</div>`;
    },
    wire(bu){
      const inp=$("#ssSearch"), hit=$("#ssHit"), grid=$("#ssGrid");
      if(!inp) return;
      const run=()=>{
        const q=(inp.value||"").trim().toLowerCase();
        if(!q){ hit.innerHTML=""; grid.querySelectorAll(".grant").forEach(c=>c.style.display=""); return; }
        let any=false;
        grid.querySelectorAll(".grant").forEach(c=>{const m=(c.dataset.sup||c.textContent).toLowerCase().includes(q); c.style.display=m?"":"none"; if(m)any=true;});
        if(any){ hit.innerHTML=""; return; }
        // No built profile — still answer with the supporter's live routes instead of a dead end.
        const name=inp.value.trim(); const enc=encodeURIComponent;
        hit.innerHTML=`<div class="grant" style="margin-bottom:12px"><b>${esc(name)}</b> — no strategy profile built yet. Live routes:
          <div style="margin-top:6px">
          <a href="https://www.google.com/search?q=${enc('"'+name+'" investor relations quarterly results')}" target="_blank" rel="noopener" style="display:inline-block;border:1.5px solid #0f1a1a;background:#fff;padding:6px 11px;margin:3px 6px 0 0;font-size:12px;text-decoration:none;color:#0f1a1a">Investor relations →</a>
          <a href="https://news.google.com/search?q=${enc('"'+name+'"')}" target="_blank" rel="noopener" style="display:inline-block;border:1.5px solid #0f1a1a;background:#fff;padding:6px 11px;margin:3px 6px 0 0;font-size:12px;text-decoration:none;color:#0f1a1a">📰 Newsroom →</a>
          <a href="https://www.google.com/search?q=${enc('"'+name+'" independent medical education grants')}" target="_blank" rel="noopener" style="display:inline-block;border:1.5px solid #0f1a1a;background:#fff;padding:6px 11px;margin:3px 6px 0 0;font-size:12px;text-decoration:none;color:#0f1a1a">Grants portal →</a>
          <a href="https://clinicaltrials.gov/search?term=${enc(name)}" target="_blank" rel="noopener" style="display:inline-block;border:1.5px solid #0f1a1a;background:#fff;padding:6px 11px;margin:3px 6px 0 0;font-size:12px;text-decoration:none;color:#0f1a1a">🔬 Pipeline →</a>
          </div><div style="font-size:11px;color:#5b6666;margin-top:6px">Use Supporter Lookup above for the full cross-section, or ask for a profile to be researched and added.</div></div>`;
      };
      inp.addEventListener("input",run); inp.addEventListener("change",run);
      $("#ssClear").addEventListener("click",()=>{inp.value="";run();});
    }},
  { id:"pdufa", jump:"⚖️ FDA decision calendar", title:"⚖️ FDA decision calendar — PDUFA, filings & catalysts",
    render(bu){
      const rows=D[bu].pdufa.filter(p=>supMatch(p.co)).map(p=>({...p,o:daysOut(p.date)}))
        .sort((a,b)=>String(a.date).localeCompare(String(b.date)))
        .map(p=>`<tr><td style="font-family:'JetBrains Mono',monospace;white-space:nowrap">${esc(p.date)}</td>
          <td style="font-family:'JetBrains Mono',monospace;color:${p.o!=null&&p.o>=0&&p.o<90?'#a33':'#5b6666'}">${p.o!=null?(p.o>=0?p.o+"d":"past"):"—"}</td>
          <td><b>${esc(p.co)}</b></td><td>${esc(p.drug)}</td><td>${esc(p.ind)}</td>
          <td style="font-size:11px;white-space:nowrap">${esc(p.type||"")}</td><td style="font-size:12px">${esc(p.note||"").slice(0,240)} <a href="https://www.google.com/search?q=${encodeURIComponent('"'+p.co+'" "'+String(p.drug).split(' (')[0]+'" FDA PDUFA')}" target="_blank" rel="noopener" style="font-size:10.5px">verify →</a></td></tr>`).join("");
      return `<table class="koltable" style="width:100%"><thead><tr><th>DATE</th><th>OUT</th><th>SUPPORTER</th><th>ASSET</th><th>INDICATION</th><th>TYPE</th><th>WHY IT MATTERS</th></tr></thead>
        <tbody>${rows||'<tr><td colspan="7" class="empty">No catalysts match this filter.</td></tr>'}</tbody></table>`;
    }},
  { id:"signals", jump:"⚡ This week's signals", title:"⚡ This week's signals",
    render(bu){
      const sig=D[bu].signals;
      const blocks=Object.keys(sig).filter(k=>BUS[bu].spaces.includes(k)||bu==="multi").map(k=>{
        const label=(CURATED[k]&&NEURO_CURATED[Object.keys(NK).find(x=>NK[x]===k)]?NEURO_CURATED[Object.keys(NK).find(x=>NK[x]===k)].label:null)||SPACENAME[k]||k;
        const items=(sig[k]||[]).map(s=>Array.isArray(s)?s:[s]).map(([t,u])=>`<li style="margin:5px 0;font-size:12.4px;line-height:1.55">${esc(t)}${u?` <a href="${u}" target="_blank" rel="noopener" style="font-size:10.5px">src →</a>`:""}</li>`).join("");
        return `<div class="grant"><b style="font-size:12.5px">${esc(label)}</b><ul style="margin:6px 0 0;padding-left:16px">${items}</ul></div>`;}).join("");
      return `<div class="grantgrid">${blocks}</div>`;
    }},
  { id:"newsupp", jump:"⭐ New supporters watch", title:"⭐ New Supporters watch",
    render(bu){
      const cards=D[bu].newsupp.filter(n=>supMatch(n.co)).map(n=>{
        const cme=(n.compCME||[]).map(c=>Array.isArray(c)?c:[c]).map(([lab,url])=>url?`<a href="${url}" target="_blank" rel="noopener" style="font-size:11px;display:block;margin-top:3px">▸ ${esc(lab)} →</a>`:"").join("");
        return `<div class="grant" data-sup="${esc(n.co)}"><b>${esc(n.co)}</b>
        <div style="font-size:12px;margin-top:4px">${esc(n.asset||"")}</div>
        <div style="font-size:11.5px;color:#a06a12;margin-top:4px">${esc(n.timing||"")}</div>
        <div style="font-size:12px;color:#5b6666;margin-top:4px;line-height:1.5">${esc(n.note||"").slice(0,240)}</div>
        ${n.contact?`<div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;margin-top:4px">${esc(String(n.contact))}</div>`:""}
        ${cme?`<div style="margin-top:4px"><span style="font-size:10px;font-weight:800;color:#5b6666;font-family:'JetBrains Mono',monospace">COMPETITOR CME RUNNING NOW</span>${cme}</div>`:""}
        <div style="margin-top:5px">${n.url?`<a href="${n.url}" target="_blank" rel="noopener" style="font-size:11.5px;margin-right:8px">Portal →</a>`:""}<a href="https://news.google.com/search?q=${encodeURIComponent('"'+n.co+'" (FDA OR approval OR grant OR "medical education")')}" target="_blank" rel="noopener" style="font-size:11.5px">📰 News →</a></div></div>`;}).join("");
      return `<p class="sub" style="margin:8px 0 12px">Companies whose next catalyst would stand up (or re-point) an IME budget — first-mover partners set the reference terms.</p>
        <div class="grantgrid">${cards||'<div class="empty">No matches for this filter.</div>'}</div>`;
    }},
  { id:"pipeline", jump:"🔭 Pipeline companies to watch", title:"🔭 Potential new supporters to watch — pipeline",
    render(bu){
      const cards=D[bu].pipeline.filter(p=>supMatch(p.co)).map(p=>`<div class="grant" data-sup="${esc(p.co)}"><b>${esc(p.co)}</b>
        <div style="font-size:12px;margin-top:4px">${esc(p.asset||"")}</div>
        <div style="font-size:11.5px;color:#3b5ea8;margin-top:4px">${esc(p.timing||"")}</div>
        <div style="font-size:12px;color:#5b6666;margin-top:4px;line-height:1.5">${esc(p.note||"").slice(0,240)}</div>
        <div style="margin-top:5px"><a href="https://news.google.com/search?q=${encodeURIComponent('"'+p.co+'" ('+String(p.asset||'pipeline').split('(')[0].trim()+' OR readout OR "phase 3")')}" target="_blank" rel="noopener" style="font-size:11.5px;margin-right:8px">📰 News →</a><a href="https://clinicaltrials.gov/search?term=${encodeURIComponent(p.co)}" target="_blank" rel="noopener" style="font-size:11.5px">🔬 Trials →</a></div></div>`).join("");
      const dup = bu==="neuro" ? `<p class="sub" style="margin:8px 0 12px;color:#a06a12">Neuroscience currently tracks one combined watch-list — the same companies appear under New Supporters until a separate pipeline list is curated.</p>` : "";
      return dup+`<div class="grantgrid">${cards||'<div class="empty">No matches for this filter.</div>'}</div>`;
    }},
  { id:"directory", jump:"📇 Grant / RFP directory", title:"📇 Master IME / CME grant & RFP directory",
    render(bu){
      const rows=D[bu].directory.filter(d=>supMatch(d.co)).map(d=>`<tr data-sup="${esc(d.co)}"><td><b>${esc(d.co)}</b></td>
        <td style="font-size:12px">${esc(d.ta)}</td><td style="font-size:11.5px">${esc(d.route||"")}</td>
        <td><span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:800;background:#eaf6ef;color:#2f7d55;padding:2px 6px">${esc(d.rfp||"")}</span></td>
        <td style="font-size:11.5px">${esc(String(d.contact||"")).slice(0,120)}</td>
        <td>${d.url?`<a href="${d.url}" target="_blank" rel="noopener" style="font-size:11px">Portal →</a>`:`<a href="https://www.google.com/search?q=${encodeURIComponent('"'+d.co+'" independent medical education grants')}" target="_blank" rel="noopener" style="font-size:11px">Find portal →</a>`}</td></tr>`).join("");
      return `<table class="koltable" style="width:100%"><thead><tr><th>SUPPORTER</th><th>THERAPEUTIC AREAS</th><th>ROUTE / REGION</th><th>RFP</th><th>FOCUS / CONTACT</th><th>LINK</th></tr></thead>
        <tbody>${rows||'<tr><td colspan="6" class="empty">No matches for this filter.</td></tr>'}</tbody></table>`;
    }},
  { id:"mafinder", jump:"👥 Medical Affairs Contact Finder", title:"👥 Medical Affairs Contact Finder",
    render(bu){
      // Cross-BU: the datalist carries EVERY supporter from both business units, so a search
      // works whichever tab you are on; the quick chips stay BU-flavoured for convenience.
      const union=[...new Set([...supportersFor("multi"),...supportersFor("neuro")])].sort();
      const opts=union.map(s=>`<option value="${esc(s)}">`).join("");
      const chips=supportersFor(bu).slice(0,8).map(s=>`<button class="ma-chip" data-ma="${esc(s)}" style="border:1px solid var(--line);background:#fff;font-size:11.5px;padding:4px 10px;cursor:pointer;border-radius:14px;color:#3b5ea8">${esc(s)}</button>`).join(" ");
      return `<p class="sub" style="margin:8px 0 12px">Type <b>any</b> supporter — from <b>either business unit</b> — and the finder builds the live LinkedIn people-searches and web searches that surface whoever holds the VP / Director of Medical Affairs and MSL roles <b>today</b>, scoped to the therapeutic areas that supporter actually funds, plus the published grants-office route where one is tracked.</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
          <input id="maInput" list="maList" placeholder="Start typing a supporter — e.g. ${bu==="neuro"?"Biogen, Eisai, argenx, Jazz":"Novartis, Lilly, Amgen, Vertex"}…" autocomplete="off"
            style="flex:1;min-width:300px;padding:9px 12px;font-size:13px;border:1.5px solid #0f1a1a;border-radius:0;background:#fff">
          <datalist id="maList">${opts}</datalist>
          <button id="maGo" class="gapbtn">Find contacts</button>
        </div>
        <div style="font-size:11px;color:#5b6666;margin-bottom:8px">TRY: ${chips}</div>
        <div id="maOut"></div>`;
    },
    wire(bu){
      const inp=$("#maInput"), out=$("#maOut");
      const run=()=>{
        const co=(inp.value||"").trim(); if(!co){ out.innerHTML=""; return; }
        const enc=encodeURIComponent;
        // Directory lookup across BOTH business units, whichever tab is active.
        const dirHit=[...D.multi.directory,...D.neuro.directory].find(d=>supEq(d.co,co));
        // Therapeutic areas this supporter actually funds/works in — from BOTH BUs.
        // These scope the searches so results are the right MA people, not the whole company.
        const spaces=supSpaces(co);
        const spChips=spaces.map(k=>`<span style="font-size:9.5px;font-weight:800;color:#fff;background:${taColor(k)};padding:2px 8px;border-radius:4px;margin-right:4px">${esc(taLabel(k))}</span>`).join("");
        // Search terms: TA words sharpen the LinkedIn queries (e.g. neurology vs nephrology).
        const taTerms=spaces.slice(0,3).map(k=>taLabel(k).split(" /")[0].split(" (")[0]);
        const taQ=taTerms.length?(' ("'+taTerms.join('" OR "')+'")'):"";
        const link=(lab,url)=>`<a href="${url}" target="_blank" rel="noopener" style="display:inline-block;border:1.5px solid #0f1a1a;background:#fff;padding:7px 12px;margin:4px 6px 0 0;font-size:12px;text-decoration:none;color:#0f1a1a"><b>${lab}</b> →</a>`;
        const taLinks=spaces.slice(0,4).map(k=>link("MA — "+taLabel(k).split(" /")[0]+" — LinkedIn",
          "https://www.linkedin.com/search/results/people/?keywords="+enc('"'+co+'" "Medical Affairs" "'+taLabel(k).split(" /")[0].split(" (")[0]+'"'))).join("");
        out.innerHTML=`<div class="grant"><div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap"><b style="font-size:14px">${esc(co)}</b>${spChips||'<span style="font-size:11px;color:#5b6666">no tracked therapeutic areas — generic searches below</span>'}</div>
          ${dirHit?`<div style="font-size:12px;margin-top:6px"><b>Tracked route:</b> ${esc(dirHit.route||"")} · RFP: <b>${esc(dirHit.rfp||"—")}</b>${dirHit.contact&&String(dirHit.contact).includes("@")?` · <span style="font-family:'JetBrains Mono',monospace">${esc(dirHit.contact)}</span>`:""}${dirHit.url?` · <a href="${dirHit.url}" target="_blank" rel="noopener">grants portal →</a>`:""}</div>`:`<div style="font-size:12px;color:#5b6666;margin-top:6px">Not in the tracked directory — the live searches below still work for any company.</div>`}
          <div style="margin-top:8px">
          ${link("VP Medical Affairs — LinkedIn","https://www.linkedin.com/search/results/people/?keywords="+enc('"'+co+'" "VP Medical Affairs"'+taQ))}
          ${link("Director Medical Affairs — LinkedIn","https://www.linkedin.com/search/results/people/?keywords="+enc('"'+co+'" "Director, Medical Affairs"'+taQ))}
          ${link("MSL team — LinkedIn","https://www.linkedin.com/search/results/people/?keywords="+enc('"'+co+'" "Medical Science Liaison"'+taQ))}
          ${link("Grants office — web","https://www.google.com/search?q="+enc('"'+co+'" independent medical education grants portal'))}
          ${link("Medical Affairs leadership — web","https://www.google.com/search?q="+enc('"'+co+'" "medical affairs" leadership OR "chief medical officer"'))}
          </div>
          ${taLinks?`<div style="margin-top:6px"><div style="font-size:10.5px;font-weight:800;color:#5b6666;font-family:'JetBrains Mono',monospace;letter-spacing:.06em;margin-bottom:2px">SCOPED BY THERAPEUTIC AREA</div>${taLinks}</div>`:""}
          <div style="font-size:10.5px;color:#5b6666;margin-top:8px">Compliance: grant funding requests go through the official grants portal only. MA / MSL contacts are for scientific exchange — never for requesting or approving IME funding.</div></div>`;
      };
      $("#maGo").addEventListener("click",run);
      inp.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();run();}});
      inp.addEventListener("change",run);
      $$(".ma-chip").forEach(b=>b.addEventListener("click",()=>{inp.value=b.dataset.ma;run();}));
    }},
  { id:"supintel", jump:"🎯 Supporter Intelligence", title:"🎯 Supporter Intelligence — decision-useful strategic brief",
    render(bu){
      const opts=supportersFor(bu).map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join("");
      return `<div id="supIntelBox" style="border:1.5px solid #0f1a1a;background:#fbfaf4;padding:20px 24px">
        <p style="margin:0 0 14px;font-size:13px;line-height:1.55">Generate a supporter-specific strategic brief. Pick a supporter, tag and attach internal materials — <b>Word, PDF, PowerPoint, Excel</b> are read in your browser and <b>remembered for that supporter in this business unit</b>, so the library compounds as you feed it. Tag proposals as <b>won</b> or <b>lost</b> and the brief compares them — what got funded vs what didn't, and why. Copy the prompt into Claude, paste the answer back, render.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:12px">
          <div><label style="display:block;font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">Supporter</label>
            <select id="siPick" style="width:100%;padding:8px 10px;font-size:13px;border:1.5px solid #0f1a1a;background:#fff"><option value="">— Pick a supporter —</option>${opts}</select></div>
          <div><label style="display:block;font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">Document type</label>
            <select id="siTag" style="width:100%;padding:8px 10px;font-size:13px;border:1.5px solid #0f1a1a;background:#fff">
              <option value="internal document">Internal document (general)</option>
              <option value="WON grant / funded proposal">✅ Won grant / funded proposal</option>
              <option value="LOST / declined proposal">❌ Lost / declined proposal</option>
              <option value="outcomes / RWE report">📊 Outcomes / RWE report</option>
              <option value="field team insights">🧭 Field team insights</option>
              <option value="strategy note">📝 Strategy note</option>
            </select></div>
          <div><label style="display:block;font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">Attach internal materials</label>
            <input id="siFiles" type="file" multiple accept=".docx,.pdf,.pptx,.xlsx,.txt,.md,.csv" style="width:100%;padding:8px 10px;font-size:12px;border:1.5px solid #0f1a1a;background:#fff"></div>
        </div>
        <div id="siKB" style="font-size:12px;color:#5b6666;margin-bottom:12px;font-style:italic">Pick a supporter first — everything you attach is remembered against that supporter.</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button id="siCopy" class="gapbtn">📋 Copy Brief Prompt</button>
          <button id="siClear" class="gapclear">✕ Clear form</button>
          <span id="siStatus" style="font-size:12px;color:#2f7d55;align-self:center"></span></div>
        <details style="margin-top:12px"><summary style="cursor:pointer;font-size:12px">Preview the prompt</summary><pre id="siPreview" style="white-space:pre-wrap;font-size:10.5px;max-height:260px;overflow:auto;background:#fff;border:1px solid var(--line);padding:10px"></pre></details>
        <div style="margin-top:14px"><label style="display:block;font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">Paste Claude's brief here</label>
          <textarea id="siResp" rows="5" style="width:100%;padding:10px;font-size:12.5px;border:1.5px solid #0f1a1a;background:#fff;font-family:inherit"></textarea>
          <div style="margin-top:8px"><button id="siRender" class="gapbtn">▸ Render Brief</button> <button id="siPrint" class="gapclear">🖨️ Print / Save PDF</button></div>
          <div id="siRendered" style="margin-top:12px"></div></div></div>`;
    },
    wire(){ initSupIntel(); }},
  { id:"coif", jump:"💡 Cost of Inaction · Differentiation", title:"Cost of Inaction · Differentiation",
    render(bu){
      const bar = `<div style="display:flex;gap:8px;align-items:center;margin:8px 0 14px;flex-wrap:wrap">
        <label style="font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase">Filter by supporter</label>
        <select id="coifSup" style="padding:7px 10px;font-size:12px;border:1.5px solid #0f1a1a;background:#fff;min-width:220px"><option value="">All supporters</option></select>
        <button id="coifClear" class="gapclear">Clear</button></div>`;
      if(bu==="multi"){ return `<p class="sub" style="margin:8px 0 6px">Per-supporter cards: what inaction costs, how Decera uniquely wins it, and why the timing is right from the supporter's side.</p>${bar}<div id="coifMount">${D.multi.coifStatic}</div>`; }
      const cards=D.neuro.coif.filter(c=>supMatch(c.sup)).map(c=>`<div class="coif-card" data-sup="${esc(c.sup)}">
        <div class="coif-head"><h4>${esc(c.sup)} · ${esc((NEURO_CURATED[c.area]||{label:c.area}).label)} · ${esc(c.indication)}</h4></div>
        <div class="coif-block"><div class="coif-lab">Cost of inaction</div><p class="coif-body">${esc(c.inaction)}</p></div>
        <div class="coif-block"><div class="coif-lab">Differentiation — what Decera Clinical Education could uniquely do</div><p class="coif-body">${esc(c.diff)}</p></div>
        <div class="coif-block"><div class="coif-lab">Supporter perspective — why now</div><p class="coif-body">${esc(c.perspective||"")}</p></div>
        <div class="coif-src" style="font-size:11px">Verify: <a href="https://news.google.com/search?q=${encodeURIComponent('"'+c.sup.split(' /')[0]+'" '+c.indication.split(' (')[0])}" target="_blank" rel="noopener">latest coverage →</a></div></div>`).join("");
      return `<p class="sub" style="margin:8px 0 6px">Per-supporter cards: what inaction costs, how Decera uniquely wins it, and why the timing is right from the supporter's side.</p>${bar}<div id="coifMount" class="em-grid">${cards||'<div class="empty">No cards match this filter.</div>'}</div>`;
    },
    wire(bu){
      const sel=$("#coifSup"), cards=$$("#coifMount .coif-card");
      if(sel){
        // Options come from the supporters actually named on the cards in THIS business unit.
        const names=[...new Set(cards.map(c=>{
          const h=c.querySelector("h4,.coif-head"); const t=(h?h.textContent:c.textContent).split("·")[0].trim();
          return t.length>1&&t.length<60?t:null; }).filter(Boolean))].sort();
        sel.innerHTML='<option value="">All supporters</option>'+names.map(n=>`<option value="${esc(n)}">${esc(n)}</option>`).join("");
        const apply=()=>{const v=sel.value.toLowerCase();cards.forEach(c=>{c.style.display=(!v||c.textContent.toLowerCase().includes(v))?"":"none";});};
        sel.addEventListener("change",apply);
        const clr=$("#coifClear"); if(clr) clr.addEventListener("click",()=>{sel.value="";apply();});
      }
      if(SUP.length) cards.forEach(card=>{ card.style.display = supMatch(card.textContent) ? "" : "none"; });
    }},
  { id:"whitespace", jump:"🧭 Whitespace — where Decera is not yet", title:"Whitespace — where Decera is not yet",
    render(bu){
      const rows=D[bu].whitespace.map(w=>`<div class="grant"><div style="display:flex;justify-content:space-between;gap:8px"><b style="font-size:12.5px">${esc(w.area)}</b>
        <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:800;background:#c6f34e;color:#0f1a1a;padding:2px 7px;white-space:nowrap">${esc(w.velocity||"")}</span></div>
        <div style="font-size:12px;margin-top:6px;line-height:1.55">${esc(w.why)}</div>
        <div style="font-size:11.5px;color:#3b5ea8;margin-top:5px"><b>Who funds it:</b> ${esc(w.who)}</div>
        <div style="font-size:11.5px;color:#2f7d55;margin-top:4px"><b>Decera entry play:</b> ${esc(w.entry)}</div>
        <div style="margin-top:5px"><a href="https://news.google.com/search?q=${encodeURIComponent(w.area.split('·')[0].trim()+' medical education')}" target="_blank" rel="noopener" style="font-size:11px">📰 Coverage →</a></div></div>`).join("");
      return `<p class="sub" style="margin:8px 0 12px">Areas with high science velocity where Decera has no current programme — ranked entry plays.</p><div class="grantgrid">${rows}</div>` + DECERA_PRODUCT_REFS;
    }},
  { id:"kol", jump:"👥 KOL Intelligence", title:"Faculty & KOL Intelligence",
    render(bu){
      const data=D[bu].kol;
      const withRows=[...new Set(data.map(k=>k.supporter))].sort();
      const rest=[...new Set([...supportersFor("multi"),...supportersFor("neuro")])].filter(x=>!withRows.some(w=>w.toLowerCase().includes(x.toLowerCase())||x.toLowerCase().includes(w.toLowerCase()))).sort();
      const sups=[...withRows,...rest];
      const areas=[...new Set(data.map(k=>k.area))].sort();
      return `<p class="sub" style="margin:8px 0 12px">Named faculty appear <b>only</b> when the source is a public verified disclosure — trial press release, published CME agenda, society leadership roster, or academic faculty profile. Every row carries a source link.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px">
          <select id="kolSup" style="padding:7px 10px;font-size:12px;border:1.5px solid #0f1a1a;background:#fff"><option value="">All supporters</option>${sups.map(s=>`<option>${esc(s)}</option>`).join("")}</select>
          <select id="kolArea" style="padding:7px 10px;font-size:12px;border:1.5px solid #0f1a1a;background:#fff"><option value="">All areas</option>${areas.map(a=>`<option value="${esc(a)}">${esc(D[bu].kolArea(a))}</option>`).join("")}</select>
          <button id="kolClear" class="gapclear">Clear filters</button></div>
        <table class="koltable" style="width:100%"><thead><tr><th>NAME</th><th>INSTITUTION</th><th>SPECIALTY</th><th>ROLE</th><th>SUPPORTER</th><th>AREA · INDICATION</th><th>SOURCE</th></tr></thead>
        <tbody id="kolBody"></tbody></table>`;
    },
    wire(bu){
      const body=$("#kolBody"), supSel=$("#kolSup"), areaSel=$("#kolArea");
      const paint=()=>{
        const s=supSel.value, a=areaSel.value;
        body.innerHTML=D[bu].kol
          .filter(k=>(!s||k.supporter===s)&&(!a||k.area===a)&&supMatch(k.supporter+" "+k.name))
          .map(k=>`<tr><td><b>${esc(k.name)}</b></td><td style="font-size:11.5px">${esc(k.institution)}</td><td style="font-size:11.5px">${esc(k.specialty)}</td>
            <td style="font-size:11.5px">${esc(k.role)}</td><td>${esc(k.supporter)}</td><td style="font-size:11.5px">${esc(D[bu].kolArea(k.area))} · ${esc(k.indication)}</td>
            <td style="font-size:11px"><a href="${k.srcUrl}" target="_blank" rel="noopener">${esc(k.srcTitle||"source")} →</a></td></tr>`).join("")
          ||'<tr><td colspan="7" class="empty">No publicly-disclosed KOL rows for this pick yet — rows appear only when a verified public disclosure exists.</td></tr>';
      };
      supSel.addEventListener("change",paint); areaSel.addEventListener("change",paint);
      $("#kolClear").addEventListener("click",()=>{supSel.value="";areaSel.value="";paint();});
      paint();
    }},
  { id:"gap", jump:"🧭 Gap-Finder", title:"🧭 Gap-Finder — strategic prompts",
    render(bu){
      return `<p class="sub" style="margin:8px 0 12px">Type a clinical gap, mechanism, or disease area — returns the best-matched supporters and the reason, from this business unit's intelligence.</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
          <input id="gapIn" type="search" placeholder="${bu==="neuro"?"e.g. ARIA monitoring · DEE sequencing · orexin":"e.g. IL-13 · factor XI · TL1A · ATTR · lupus"}"
            style="flex:1;min-width:280px;padding:9px 12px;font-size:13px;border:1.5px solid #0f1a1a;border-radius:0;background:#fff">
          <button id="gapGo" class="gapbtn">Find match</button></div>
        <div id="gapOut"></div>
        <h3 style="margin-top:18px;font-weight:800;font-size:16px">Gap Finder — strategic prompts</h3>
        <div class="em-strip" style="line-height:1.75">
          When you identify a gap, answer these in one line each:<br>
          • <b>Cost of inaction:</b> clinical / patient / provider / system consequence if the gap remains<br>
          • <b>Why now:</b> business or medical milestone that makes timing critical (approval, PDUFA, guideline update, congress readout)<br>
          • <b>Differentiation:</b> what Decera Clinical Education could uniquely do that Medscape / PeerView / ACHL / PRIME are not currently doing<br>
          • <b>Supporter perspective:</b> if I were this supporter, what would I care about — and why would it matter to them now?
        </div>`;
    },
    wire(bu){
      const inp=$("#gapIn"), out=$("#gapOut");
      const corpus=()=>{
        if(D[bu].gapCorpus) return D[bu].gapCorpus;
        const c=[];
        Object.keys(D[bu].cintel).forEach(k=>{const x=D[bu].cintel[k];
          c.push({area:D[bu].kolArea(k)||SPACENAME[k]||k, sup:(x.funders||x.funders2526||"").split(",")[0], why:(x.gaps||x.priorities||x.underservedDecisions||"")});});
        D[bu].whitespace.forEach(w=>c.push({area:w.area, sup:w.who, why:w.why}));
        (bu==="neuro"?D.neuro.coif:[]).forEach(x=>c.push({area:(NEURO_CURATED[x.area]||{label:x.area}).label, sup:x.sup, why:x.diff}));
        Object.keys(D[bu].signals).forEach(k=>(D[bu].signals[k]||[]).forEach(s=>{const t=Array.isArray(s)?s[0]:s;c.push({area:SPACENAME[k]||k, sup:"", why:t});}));
        D[bu].gapCorpus=c; return c;
      };
      const run=()=>{
        const q=(inp.value||"").trim().toLowerCase(); if(!q){out.innerHTML="";return;}
        const hits=corpus().filter(x=>((x.area||"")+" "+(x.sup||"")+" "+(x.why||"")).toLowerCase().includes(q)).slice(0,6);
        out.innerHTML = hits.length ? hits.map(h=>`<div class="grant" style="margin-bottom:8px"><b>${esc(h.area)}</b>${h.sup?` · best-matched supporter: <b>${esc(h.sup)}</b>`:""}<br><span style="font-size:12px;color:#5b6666">${esc(String(h.why)).slice(0,320)}</span></div>`).join("")
          : `<div class="empty">No match for "${esc(q)}" in ${BUS[bu].label}. Try a broader term.</div>`;
      };
      $("#gapGo").addEventListener("click",run);
      inp.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();run();}});
    }}
];

/* ============================================================================
   THERAPEUTIC-AREA SECTIONS (live trials + curated) — same renderer, both BUs
   ========================================================================== */
function apiURL(cond){
  const p=new URLSearchParams();
  p.set("query.cond",cond); p.set("filter.advanced",ADV);
  p.set("pageSize",String(FETCH_N)); p.set("sort","LastUpdatePostDate:desc"); p.set("fields",FIELDS);
  return "https://clinicaltrials.gov/api/v2/studies?"+p.toString();
}
function parseStudy(study){
  const p=study.protocolSection||{};
  const id=p.identificationModule||{}, st=p.statusModule||{}, sp=(p.sponsorCollaboratorsModule||{}).leadSponsor||{};
  const de=p.designModule||{}, cond=(p.conditionsModule||{}).conditions||[];
  return { nct:id.nctId, title:id.briefTitle||"Untitled study", status:st.overallStatus||"",
    phase:(de.phases||[]).join("/")||"—", sponsor:sp.name||"—",
    updated:(st.lastUpdatePostDateStruct||{}).date, enroll:(de.enrollmentInfo||{}).count,
    cond:cond.slice(0,2).join(", ") };
}
async function loadTrials(){
  TRIAL_STATUS="loading"; paintPill();
  await Promise.all(SPECIALTIES.map(async s=>{
    try{
      const r=await fetch(apiURL(s.cond),{headers:{Accept:"application/json"}});
      if(!r.ok) throw 0;
      const j=await r.json(); const rows=(j.studies||[]).map(parseStudy);
      // A 200 with an empty result set is still a broken feed from the reader's point of
      // view — the area would render "No live trials returned" with no explanation. Treat
      // it like any other failure so the saved snapshot shows and the banner explains why.
      if(!rows.length) throw 0;
      TRIALS[s.key]=rows;
    }catch(e){
      TRIALS[s.key]=(TRIALSNAP[s.key]||[]); // real saved snapshot — both BUs have one
      window._usedSnap = true;
    }
  }));
  TRIAL_STATUS="done";
  paintFeedNote(); paintPill(); renderSpaces();
}
function buTrialCount(bu){
  return BUS[bu].spaces.reduce((n,k)=>n+((TRIALS[k]||[]).length),0);
}
function paintPill(){
  const el=$("#totalCount"); if(!el) return;
  el.textContent = TRIAL_STATUS==="loading" ? "…" : String(buTrialCount(BU));
}

function taLabel(k){
  const nk=Object.keys(NK).find(x=>NK[x]===k);
  return nk ? NEURO_CURATED[nk].label : (SPACENAME[k]||k);
}
function taColor(k){ return SPACECOLOR[k]||"#0f1a1a"; }

function paintFeedNote(){
  const eb=$("#feedNote"); if(!eb) return;
  eb.innerHTML = (TRIAL_STATUS==="done" && window._usedSnap)
    ? '<div class="note" style="margin:10px 0;border-left:4px solid #a06a12"><b>Live feed unavailable</b> — ClinicalTrials.gov did not return results, so this is the saved snapshot from '+(typeof TRIALSNAP_REFRESHED!=="undefined"?TRIALSNAP_REFRESHED:TRIALSNAP_UPDATED)+'. Refresh to retry the live feed.</div>'
    : '';
}

/* Immunology sub-specialty breakout — Dermatology · Rheumatology · Gastroenterology ·
   Pulmonology · Allergy. Each sub gets its own header, lede, education gap areas with
   funders, and its companies split US / Global — restored from the original tracker. */
function renderSubGaps(subKey){
  const gaps=(typeof GAPAREAS!=="undefined"?GAPAREAS:[]).filter(g=>g.space==="immunology"&&g.sub===subKey);
  if(!gaps.length) return "";
  return `<div style="border:1px solid var(--line);background:#fbfaf4;padding:10px 14px;margin:10px 0"><b style="font-size:12px">Education gap areas &amp; who funds them:</b>${gaps.map(g=>
    `<div style="font-size:12px;padding:3px 0">▸ <b>${esc(g.area)}</b> — funder: ${esc(g.funder)}${g.contact&&g.contact!=="Portal form"?` · <span style="color:#5b6666">${esc(g.contact)}</span>`:""}</div>`).join("")}</div>`;
}
function renderImmunoSubs(cos){
  // Gastroenterology is excluded here — it has its own first-class tab in the bar.
  const subs=(typeof IMMUNO_SUBS!=="undefined"?IMMUNO_SUBS:[]).filter(sub=>sub.key!=="gastro");
  const picked=subs.some(s=>s.key===SUBTA)?SUBTA:"all";
  const shown=picked==="all"?subs:subs.filter(s=>s.key===picked);
  // Chips mirror the filter-bar picker so the section can be driven from either place.
  let html=`<div class="blocklabel" style="margin-top:20px">Immunology by sub-specialty — each laid out as its own section</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 4px">
      <button class="subchip" data-sub="all" style="padding:5px 12px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;cursor:pointer;border:1.5px solid #0f1a1a;background:${picked==="all"?"#0f1a1a":"#fff"};color:${picked==="all"?"#fff":"#0f1a1a"}">All</button>`+
    subs.map(s=>{
      const n=cos.filter(c=>c.sub&&c.sub.split(",").includes(s.key)).length;
      return `<button class="subchip" data-sub="${s.key}" style="padding:5px 12px;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;cursor:pointer;border:1.5px solid #0f1a1a;background:${picked===s.key?"#0f1a1a":"#fff"};color:${picked===s.key?"#fff":"#0f1a1a"}">${s.icon||""} ${esc(s.label)} (${n})</button>`;}).join("")+
    `</div>`;
  let rendered=0;
  shown.forEach(sub=>{
    const subCos=cos.filter(c=>c.sub&&c.sub.split(",").includes(sub.key));
    const gapsHtml=renderSubGaps(sub.key);
    if(!subCos.length&&!gapsHtml) return;
    rendered++;
    const us=subCos.filter(c=>c.region&&String(c.region).startsWith("US")), gl=subCos.filter(c=>!c.region||!String(c.region).startsWith("US"));
    html+=`<div style="border-left:4px solid var(--immuno);padding-left:14px;margin:20px 0">
      <div style="display:flex;align-items:center;gap:8px"><span style="font-size:18px">${sub.icon||"🔹"}</span>
        <h3 style="margin:0;font-size:17px">${esc(sub.label)}</h3>
        <span style="font-size:11px;color:#5b6666">${subCos.length} compan${subCos.length===1?"y":"ies"}</span></div>
      <div style="font-size:12.3px;color:#5b6666;margin:4px 0 8px;line-height:1.55">${esc(sub.lede||"")}</div>
      ${gapsHtml}
      ${us.length?`<div class="blocklabel" style="margin-top:6px;font-size:11px;color:#3b5ea8">🇺🇸 US-headquartered (${us.length})</div><div class="cogrid">${us.map(companyCard).join("")}</div>`:""}
      ${gl.length?`<div class="blocklabel" style="margin-top:6px;font-size:11px;color:#7a6b2e">🌐 Global (${gl.length})</div><div class="cogrid">${gl.map(companyCard).join("")}</div>`:""}
    </div>`;
  });
  if(!rendered) html+=`<div class="empty">Nothing tracked under this sub-specialty${SUP.length?" for "+esc(SUP.join(", ")):""} yet.</div>`;
  return html;
}

function renderSpaces(){
  const host=$("#taContent"); if(!host) return;
  const keys=BUS[BU].spaces.filter(k=>TA==="all"||k===TA);
  host.innerHTML=keys.map(k=>{
    const cur=CURATED[k]||{}, all=TRIALS[k]||[];
    const isGastro=(k==="immunology"&&BU==="multi"&&SUBTA==="gastro");
    const GI_KW=/(ulcerative colitis|crohn|inflammatory bowel|IBD|eosinophilic esophagitis|EoE|short bowel|SBS|IBS-C|IBS-D|primary biliary|PBC|primary sclerosing|MASH|MASLD|NASH|gastro|esophag|colonic|colitis|proctitis|celiac)/i;
    const GASTRO_FUNDERS=["Takeda","J&J","Johnson","Sanofi","Regeneron","Bristol Myers","BMS","Merck","AbbVie","Pfizer","Lilly"];
    let grants=(cur.grants||[]).filter(g=>supMatch(g.co));
    if(isGastro) grants=grants.filter(g=>GASTRO_FUNDERS.some(f=>g.co.toLowerCase().includes(f.toLowerCase())));
    let cos=(cur.companies||[]).filter(c=>supMatch(c.name));
    if(isGastro) cos=cos.filter(c=>(c.sub||"").split(",").includes("gastro"));
    const usCos=cos.filter(c=>c.region&&String(c.region).startsWith("US")), glCos=cos.filter(c=>!c.region||!String(c.region).startsWith("US"));
    let trials=all.filter(t=>supMatch(t.sponsor));
    if(isGastro) trials=trials.filter(t=>GI_KW.test((t.title||"")+" "+(t.cond||"")));
    const lim=EXPAND[k]?trials.length:12;
    const ci=BU==="multi"?CINTEL[k]:null;
    const badge=BU==="neuro"
      ?`<span style="font-size:10px;font-weight:700;color:#4a3a8a;background:#efeaf8;padding:2px 7px;border-radius:4px;margin-left:8px;letter-spacing:.3px">NEUROSCIENCE</span>`
      :`<span style="font-size:10px;font-weight:700;color:#2f7d55;background:#eaf6ef;padding:2px 7px;border-radius:4px;margin-left:8px;letter-spacing:.3px">NON-ONCOLOGIC</span>`;
    const displayLabel=isGastro?"Gastroenterology":taLabel(k);
    const displayColor=isGastro?(SPACECOLOR.gastroenterology||"#1f9d8f"):taColor(k);
    return `<div class="section" id="sec-${k}" style="margin-top:34px">
      <h2 class="sechead" style="border-left-color:${displayColor}">${esc(displayLabel)}${badge}<span style="font-size:12.5px;font-weight:600;color:#5b6666;margin-left:10px">${TRIAL_STATUS==="loading"?"loading trials…":trials.length+" live trials"}</span>
        <a class="slink" style="font-size:11px;margin-left:12px" target="_blank" rel="noopener" href="https://news.google.com/search?q=${encodeURIComponent(taLabel(k)+' (FDA OR approval OR "phase 3")')}&hl=en-US">📰 Press</a></h2>
      ${grants.length?`<div class="blocklabel">Grant &amp; RFP watch — where education funding is posted</div><div class="grantgrid">${grants.map(grantCard).join("")}</div>`:""}
      ${cur.signals&&!SUP.length?`<div class="note" style="margin:12px 0"><b>Signal:</b> ${esc(cur.signals)}</div>`:""}
      ${ci&&!SUP.length?`<div class="blocklabel">Competitive intelligence — funders &amp; priorities (12–18 mo)</div>
        <div class="cibox"><div class="cirow"><b>Funders 2025–26:</b> ${esc(ci.funders2526)}</div>
        <div class="cirow"><b>Topics prioritized:</b> ${esc(ci.topics)}</div>
        <div class="cirow cipriority"><b>Supporter priorities, next 12–18 months:</b> ${esc(ci.priorities)}</div></div>`:""}
      ${(k==="immunology"&&BU==="multi"&&!isGastro)?renderImmunoSubs(cos):cos.length?`<div class="blocklabel">Companies to watch — drug &amp; stage</div>
        ${usCos.length?`<div class="blocklabel" style="margin-top:8px;font-size:11px;color:#3b5ea8">🇺🇸 US-headquartered (${usCos.length})</div><div class="cogrid">${usCos.map(companyCard).join("")}</div>`:""}
        ${glCos.length?`<div class="blocklabel" style="margin-top:8px;font-size:11px;color:#7a6b2e">🌐 Global (${glCos.length})</div><div class="cogrid">${glCos.map(companyCard).join("")}</div>`:""}`:""}
      ${isGastro?renderSubGaps("gastro"):""}
      <div class="blocklabel">Newest industry Phase 2/3 trials${SUP.length?" · "+esc(SUP.join(", ")):""}</div>
      ${trials.length?`<div class="cogrid">${trials.slice(0,lim).map(trialCard).join("")}</div>
        ${trials.length>12&&!EXPAND[k]?`<button class="showmore" data-more="${k}">Show ${trials.length-12} more ↓</button>`:""}`
        :`<div class="empty">${TRIAL_STATUS==="loading"?"Loading live trials from ClinicalTrials.gov…":SUP.length?"No live trials for "+esc(SUP.join(", "))+" here.":"No live trials returned — the feed may be unreachable from this network."}</div>`}
    </div>`;}).join("");
  $$("#taContent [data-more]").forEach(b=>b.addEventListener("click",()=>{EXPAND[b.dataset.more]=true;renderSpaces();}));
  $$("#taContent .subchip").forEach(b=>b.addEventListener("click",()=>{SUBTA=b.dataset.sub;renderChrome();renderSpaces();}));
}

/* ============================================================================
   HUB CHROME — BU tabs, TA tabs, filter bar, jump nav, section stack
   ========================================================================== */
function renderChrome(){
  // BU tabs
  $$(".bu-tab").forEach(b=>{
    const on=b.dataset.bu===BU;
    b.classList.toggle("bu-active",on);
    b.style.background=on?"#c6f34e":"transparent";
    b.style.color=on?"#0f1a1a":"#fff";
  });
  $("#huBuSub").textContent=BUS[BU].sub;
  $("#spacesPill").textContent=BUS[BU].spaces.length+" spaces";
  // TA tabs
  $("#taTabs").innerHTML=`<button class="tab ${TA==="all"?"active":""}" data-k="all">All ${BUS[BU].label==="MULTI"?"":"Neuroscience"}</button>`+
    BUS[BU].spaces.map(k=>{
      let btn=`<button class="tab ${TA===k&&(k!=="immunology"||SUBTA!=="gastro")?"active":""}" data-k="${k}"><span class="dot" style="background:${taColor(k)}"></span>${esc(taLabel(k))}</button>`;
      // Gastroenterology is a first-class MULTI tab backed by the immunology space + gastro sub-filter,
      // exactly as in the original tracker.
      if(k==="immunology"&&BU==="multi") btn+=`<button class="tab ${TA==="immunology"&&SUBTA==="gastro"?"active":""}" data-k="immunology" data-sub="gastro"><span class="dot" style="background:${SPACECOLOR.gastroenterology||"#1f9d8f"}"></span>Gastroenterology</button>`;
      return btn;}).join("");
  $$("#taTabs .tab").forEach(t=>t.addEventListener("click",()=>{TA=t.dataset.k;SUBTA=t.dataset.sub||"all";renderChrome();renderSpaces();}));
  // Filter bar
  const supSel=$("#supSel");
  const list=supportersFor(BU);
  supSel.innerHTML=list.map(s=>`<option value="${esc(s)}" ${SUP.includes(s)?"selected":""}>${esc(s)}</option>`).join("");
  $("#taSel").innerHTML=`<option value="all">All therapeutic areas</option>`+BUS[BU].spaces.map(k=>{
    let o=`<option value="${k}">${esc(taLabel(k))}</option>`;
    if(k==="immunology"&&BU==="multi") o+=`<option value="immunology:gastro">Gastroenterology</option>`;
    return o;}).join("");
  $("#taSel").value=(TA==="immunology"&&SUBTA==="gastro")?"immunology:gastro":TA;
  // Sub-specialty picker — only meaningful when Immunology itself is the selected area in
  // MULTI. Gastroenterology has its own tab, so it is not offered here. Counts come from the
  // same company data the breakout renders, so an empty sub is visible before it is picked.
  const subWrap=$("#subWrap"), subSel=$("#subSel");
  const showSub = BU==="multi" && TA==="immunology" && SUBTA!=="gastro";
  subWrap.hidden = !showSub;
  subWrap.style.display = showSub ? "inline-flex" : "none";
  if(showSub){
    const cos=((CURATED.immunology||{}).companies||[]).filter(c=>supMatch(c.name));
    const subs=(typeof IMMUNO_SUBS!=="undefined"?IMMUNO_SUBS:[]).filter(s=>s.key!=="gastro");
    subSel.innerHTML=`<option value="all">All sub-specialties</option>`+subs.map(s=>{
      const n=cos.filter(c=>c.sub&&c.sub.split(",").includes(s.key)).length;
      return `<option value="${s.key}">${esc(s.label)} (${n})</option>`;}).join("");
    subSel.value=subs.some(s=>s.key===SUBTA)?SUBTA:"all";
  }
  $("#supClear").hidden = !SUP.length && TA==="all" && SUBTA==="all" && !$("#supSearch").value;
  paintPill();
}
function renderHub(){
  const host=$("#hub");
  const jump=`<nav class="toc" id="toc"><span class="toc-lab">Jump to:</span>${SECTIONS.map(s=>`<a href="#s-${s.id}">${s.jump}</a>`).join("")}</nav>`;
  host.innerHTML=jump+`<div id="feedNote"></div><div id="taContent"></div>`+SECTIONS.map(s=>
    s.bare
      ?`<div class="section" style="margin-top:36px" id="s-${s.id}"><div id="sb-${s.id}"></div></div>`
      :`<div class="section" style="margin-top:36px"><h2 class="sechead" id="s-${s.id}">${s.title}</h2><div id="sb-${s.id}"></div></div>`).join("");
  SECTIONS.forEach(s=>{ $("#sb-"+s.id).innerHTML=s.render(BU); if(s.wire) try{s.wire(BU);}catch(e){console.error("wire "+s.id,e);} });
  paintFeedNote(); renderSpaces();
}
function setBU(bu){
  BU=bu; TA="all"; SUBTA="all"; SUP=[]; $("#supSearch").value="";
  try{localStorage.setItem("hub_bu",bu);}catch(e){}
  renderChrome(); renderHub();
}
function applyFilter(){ renderChrome(); renderHub(); }

/* ============================================================================
   SUPPORTER INTELLIGENCE — persistent per-supporter knowledge base
   ========================================================================== */
function initSupIntel(){
  const pick=$("#siPick"), files=$("#siFiles"), kbEl=$("#siKB"), status=$("#siStatus"),
        preview=$("#siPreview"), resp=$("#siResp"), rendered=$("#siRendered"), tagSel=$("#siTag");
  if(!pick) return;
  const SI_BU = BU;   // this instance serves the business unit it was rendered in
  // v2 store: { multi:{Supporter:[docs]}, neuro:{Supporter:[docs]} } — libraries NEVER mix across BUs.
  const KBK="decera_supintel_kb_v2";
  const kbLoad=()=>{
    let kb; try{ kb=JSON.parse(localStorage.getItem(KBK)||"null"); }catch(e){ kb=null; }
    if(!kb){
      kb={multi:{},neuro:{}};
      // one-time migration: v1 (un-scoped) libraries land in MULTI
      try{ const v1=JSON.parse(localStorage.getItem("decera_supintel_kb_v1")||"{}");
           Object.keys(v1).forEach(k=>{ kb.multi[k]=v1[k]; }); }catch(e){}
    }
    kb.multi=kb.multi||{}; kb.neuro=kb.neuro||{};
    return kb;
  };
  const kbSave=kb=>{try{localStorage.setItem(KBK,JSON.stringify(kb));return true;}catch(e){return false;}};
  const kbFor=n=>{const kb=kbLoad();return (n&&kb[SI_BU][n])?kb[SI_BU][n]:[];};
  const kbAdd=(n,docs)=>{if(!n)return false;const kb=kbLoad();let l=kb[SI_BU][n]||[];docs.forEach(d=>{l=l.filter(x=>x.name!==d.name);l.push(d);});kb[SI_BU][n]=l;return kbSave(kb);};
  const kbDel=(n,dn)=>{const kb=kbLoad();if(!kb[SI_BU][n])return;kb[SI_BU][n]=kb[SI_BU][n].filter(x=>x.name!==dn);if(!kb[SI_BU][n].length)delete kb[SI_BU][n];kbSave(kb);};
  const MAX=60000;
  const loadScript=src=>new Promise((res,rej)=>{if(document.querySelector(`script[data-lib="${src}"]`))return res();const s=document.createElement("script");s.src=src;s.dataset.lib=src;s.onload=res;s.onerror=()=>rej(new Error("load"));document.head.appendChild(s);});
  const xmlText=x=>String(x).replace(/<\/w:p>|<\/a:p>|<\/w:tr>/g,"\n").replace(/<[^>]+>/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/[ \t]{2,}/g," ").replace(/\n{3,}/g,"\n\n").trim();
  async function readOOXML(f,ext){
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js");
    const zip=await window.JSZip.loadAsync(await f.arrayBuffer());
    const names=Object.keys(zip.files);
    const want=ext==="docx"?names.filter(n=>/^word\/(document|header\d*|footer\d*|footnotes)\.xml$/.test(n))
      :ext==="pptx"?names.filter(n=>/^ppt\/(slides\/slide\d+|notesSlides\/notesSlide\d+)\.xml$/.test(n)).sort((a,b)=>(parseInt(a.replace(/\D+/g,""))||0)-(parseInt(b.replace(/\D+/g,""))||0))
      :names.filter(n=>/^xl\/(sharedStrings\.xml|worksheets\/sheet\d+\.xml)$/.test(n));
    const out=[];
    for(const n of want){const t=xmlText(await zip.file(n).async("string"));if(t)out.push(t);if(out.join("\n").length>MAX)break;}
    return out.join("\n").slice(0,MAX);
  }
  async function readPDF(f){
    await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js");
    window.pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    const doc=await window.pdfjsLib.getDocument({data:await f.arrayBuffer()}).promise;
    const out=[];
    for(let p=1;p<=doc.numPages;p++){const tc=await(await doc.getPage(p)).getTextContent();out.push("[p"+p+"] "+tc.items.map(i=>i.str).join(" "));if(out.join("\n").length>MAX)break;}
    return out.join("\n").slice(0,MAX);
  }
  function readFile(f){
    const ext=(f.name.split(".").pop()||"").toLowerCase();
    const base={name:f.name,size:f.size,ext,added:new Date().toISOString().slice(0,10),tag:(tagSel&&tagSel.value)||"internal document"};
    if(["txt","md","csv","html","json"].includes(ext)) return new Promise(res=>{const r=new FileReader();r.onload=()=>res({...base,text:String(r.result).slice(0,MAX)});r.onerror=()=>res({...base,text:"[could not read]"});r.readAsText(f);});
    if(["docx","pptx","xlsx"].includes(ext)) return readOOXML(f,ext).then(t=>({...base,text:t||"["+ext.toUpperCase()+" had no extractable text]"})).catch(()=>({...base,text:"[could not parse "+ext.toUpperCase()+" — paste its text instead]"}));
    if(ext==="pdf") return readPDF(f).then(t=>({...base,text:t||"[PDF had no selectable text — may be a scan]"})).catch(()=>({...base,text:"[could not parse PDF — paste its text instead]"}));
    return Promise.resolve({...base,text:"[unsupported file type]"});
  }
  let live=[];
  function paintKB(){
    const n=pick.value;
    if(!n){kbEl.innerHTML="<i>Pick a supporter first — everything you attach is remembered against that supporter.</i>";return;}
    const stored=kbFor(n), all=stored.concat(live.filter(a=>!stored.some(s=>s.name===a.name)));
    if(!all.length){kbEl.innerHTML=`<i>Nothing stored for <b>${esc(n)}</b> in ${SI_BU==="neuro"?"Neuroscience":"MULTI"} yet — attach internal material and it is remembered for next time. (Libraries are kept separate per business unit.)</i>`;return;}
    const won=all.filter(d=>/WON/i.test(d.tag||"")).length, lost=all.filter(d=>/LOST/i.test(d.tag||"")).length;
    kbEl.innerHTML=`<div style="margin-bottom:6px"><b>${esc(n)} — ${SI_BU==="neuro"?"Neuroscience":"MULTI"} knowledge base — ${all.length} document${all.length===1?"":"s"}</b>${(won||lost)?` <span style="color:#2f7d55">· ${won} won</span> <span style="color:#a33">· ${lost} lost</span>`:""}</div>`+
      all.map(d=>{const ok=d.text&&d.text[0]!=="[";
        return `<div style="display:flex;align-items:center;gap:8px;padding:3px 0;border-bottom:1px dotted #ddd">
        <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:800;background:${ok?"#eaf6ef":"#fdf1f1"};color:${ok?"#2f7d55":"#a33"};padding:2px 6px">${esc((d.ext||"?").toUpperCase())}</span>
        <span style="flex:1">${esc(d.name)} <span style="font-size:9.5px;font-weight:800;color:${/WON/i.test(d.tag||"")?"#2f7d55":/LOST/i.test(d.tag||"")?"#a33":"#5b6666"};font-family:'JetBrains Mono',monospace">[${esc((d.tag||"doc").toUpperCase())}]</span></span>
        <span style="color:#5b6666;font-size:11px">${ok?(d.text.length>=1000?Math.round(d.text.length/1000)+"k chars":d.text.length+" chars"):"not readable"} · ${esc(d.added||"—")}</span>
        <button data-del="${encodeURIComponent(d.name)}" style="border:1px solid #a33;background:#fff;color:#a33;font-size:10px;padding:2px 6px;cursor:pointer">remove</button></div>`;}).join("");
    kbEl.querySelectorAll("[data-del]").forEach(b=>b.addEventListener("click",()=>{const dn=decodeURIComponent(b.dataset.del);kbDel(n,dn);live=live.filter(a=>a.name!==dn);paintKB();paintPrompt();}));
  }
  function trackerContext(name){
    const L=[];
    Object.keys(CURATED).forEach(k=>{const c=CURATED[k];
      (c.grants||[]).forEach(g=>{if(String(g.co).toLowerCase().includes(name.toLowerCase().split(" ")[0]))L.push(`- GRANT (${taLabel(k)}): ${g.focus} · posture: ${g.rfp} · ${g.url||""}`);});
      (c.companies||[]).forEach(x=>{if(String(x.name).toLowerCase().includes(name.toLowerCase().split(" ")[0]))L.push(`- PIPELINE (${taLabel(k)}): ${x.drugs} · ${x.stage}`);});});
    [...D.multi.pdufa,...D.neuro.pdufa].forEach(p=>{if(String(p.co).toLowerCase().includes(name.toLowerCase().split(" ")[0]))L.push(`- FDA CATALYST: ${p.drug} (${p.ind}) — ${p.date}. ${p.note||""}`);});
    [...D.multi.supstrat,...D.neuro.supstrat].forEach(s=>{if(s.sup.toLowerCase().includes(name.toLowerCase().split(" ")[0])){if(s.priority)L.push(`- STRATEGY: ${s.priority}`);if(s.ask)L.push(`- CURRENT ASK: ${s.ask}`);}});
    [...D.multi.kol,...D.neuro.kol].forEach(k=>{if(String(k.supporter).toLowerCase().includes(name.toLowerCase().split(" ")[0]))L.push(`- KOL: ${k.name} (${k.institution}) — ${k.role}, ${k.indication}`);});
    return L.length?L.join("\n"):"(No tracker rows found for this supporter — rely on public sources and any internal documents.)";
  }
  function buildPrompt(){
    const n=pick.value||"[SUPPORTER NAME]";
    const stored=kbFor(n), all=stored.concat(live.filter(a=>!stored.some(s=>s.name===a.name)));
    const readable=all.filter(d=>d.text&&d.text[0]!=="[");
    let docs;
    if(readable.length){
      const won=readable.filter(d=>/WON/i.test(d.tag||"")), lost=readable.filter(d=>/LOST/i.test(d.tag||""));
      docs=`\n\n---\nINTERNAL DOCUMENT LIBRARY FOR ${n.toUpperCase()} — ${SI_BU==="neuro"?"NEUROSCIENCE":"MULTI"} BUSINESS UNIT ONLY — ${readable.length} document(s) accumulated to date. This library is business-unit-scoped: do not assume anything from the other business unit. Weigh it above generic external summaries; where documents span dates, report what CHANGED between them.\n`+
        readable.map(a=>`\n### [${(a.tag||"internal document").toUpperCase()}] ${a.name} (${a.ext}, added ${a.added}, ${a.text.length} chars)\n${a.text}`).join("\n");
      if(won.length||lost.length){
        docs+=`\n\n---\nWON vs LOST COMPARISON — REQUIRED\nThe library contains ${won.length} WON/funded and ${lost.length} LOST/declined proposal document(s) for ${n}. In Section 3, explicitly compare them: what themes, formats, evidence types, budget postures or framings appear in the funded work but not the declined work (and vice versa). Name the documents. If only one side exists, say which patterns from it should be repeated or avoided, and name in Section 5 what is needed from the other side to complete the comparison.`;
      }
      const un=all.filter(d=>!(d.text&&d.text[0]!=="["));
      if(un.length) docs+=`\n\n(On file but not machine-readable, NOT reflected below: ${un.map(d=>d.name).join(", ")}.)`;
    } else {
      docs=`\n\n---\nNO INTERNAL DOCUMENTS ON FILE for ${n.toUpperCase()}. Say so plainly in Section 3 rather than inventing internal history, and put the missing internal evidence at the top of Section 5.`;
    }
    const rwe=`\n\n---\nRWE LINKAGE\n`+(readable.length
      ?`Search the library for real-world evidence signals — outcomes, completion figures, pre/post shifts, practice patterns, field insights. Where found: name the document and figure, state what it proves that a competitor cannot claim, and tie it to a Section 4 recommendation. If none exist, say so — do not manufacture RWE language.`
      :`No internal documents on file — do NOT manufacture RWE claims. Name in Section 5 the specific real-world evidence that would most change the recommendation.`);
    const guard=`\n\n---\nSPECIFICITY TEST\nDelete any bullet that would still be true with "${n}" swapped for any other pharmaceutical company. A bullet survives only if it names something particular to ${n} — a named asset, dated milestone, specific portal or posture, a figure from the library, or a named competitor programme.\n\n---\nLANGUAGE STANDARD\nWrite in strategy-ready pharma Medical Affairs language: launch windows, label expansions, PDUFA anchoring, sequencing questions, share-of-voice, ARIA/REMS-class practicalities where relevant, IME/CME grant mechanics (RFP vs unsolicited, cycle timing), field-medical insights. No consulting filler ("leverage synergies", "holistic approach"), no hedge-words stacked in place of a judgment. Every recommendation must be executable by a Medical Affairs team this quarter.`;
    return SUPPORTER_INTELLIGENCE_PROMPT.replace(/\[SUPPORTER NAME\]/g,n)
      +`\n\n---\nTRACKER CONTEXT FOR ${n.toUpperCase()}\n`+trackerContext(n)+docs+rwe+guard;
  }
  const paintPrompt=()=>{ preview.textContent=buildPrompt(); };
  files.addEventListener("change",async()=>{
    const arr=Array.from(files.files||[]); if(!arr.length){paintKB();return;}
    if(!pick.value){kbEl.innerHTML='<b style="color:#a33">Pick a supporter first</b> — documents are stored against a specific supporter.';files.value="";return;}
    kbEl.textContent="Reading "+arr.length+" file(s) — extracting text in your browser…";
    const fresh=[]; for(const f of arr) fresh.push(await readFile(f));
    live=live.concat(fresh);
    const ok=kbAdd(pick.value,fresh);
    paintKB(); if(!ok) kbEl.innerHTML+='<div style="color:#a33;margin-top:6px">Browser storage full — kept for this session only. Remove older documents to free space.</div>';
    files.value=""; paintPrompt();
  });
  pick.addEventListener("change",()=>{live=[];paintKB();paintPrompt();});
  $("#siCopy").addEventListener("click",async()=>{
    try{await navigator.clipboard.writeText(buildPrompt());status.textContent="Copied — paste into Claude.";}
    catch(e){preview.textContent=buildPrompt();status.textContent="Clipboard blocked — copy from the preview below.";}
    setTimeout(()=>status.textContent="",4000);
  });
  $("#siClear").addEventListener("click",()=>{pick.value="";files.value="";live=[];paintKB();resp.value="";rendered.innerHTML="";preview.textContent="";});
  const md=t=>esc(t).replace(/^### (.*)$/gm,"<h4>$1</h4>").replace(/^## (.*)$/gm,"<h3 style='margin:16px 0 6px'>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/^[-•] (.*)$/gm,"<li>$1</li>").replace(/(<li>.*<\/li>\n?)+/g,m=>"<ul style='margin:4px 0 10px;padding-left:18px'>"+m+"</ul>").replace(/\n{2,}/g,"<br>");
  $("#siRender").addEventListener("click",()=>{
    if(!resp.value.trim()){rendered.innerHTML='<div class="empty">Paste Claude\'s answer first.</div>';return;}
    rendered.innerHTML=`<div style="border:1.5px solid #0f1a1a;background:#fff;padding:18px 22px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#5b6666">Supporter Intelligence Brief · ${esc(pick.value||"—")} · ${new Date().toISOString().slice(0,10)}</div>
      <div style="font-size:12.8px;line-height:1.6;margin-top:8px">${md(resp.value)}</div></div>`;
  });
  $("#siPrint").addEventListener("click",()=>window.print());
  paintKB(); paintPrompt();
}

/* ---------- BOOT ---------- */
document.addEventListener("DOMContentLoaded",()=>{
  $$(".bu-tab").forEach(b=>b.addEventListener("click",()=>setBU(b.dataset.bu)));
  $("#taSel").addEventListener("change",()=>{
    const v=$("#taSel").value;
    if(v==="immunology:gastro"){TA="immunology";SUBTA="gastro";}
    else {TA=v;SUBTA="all";}
    renderChrome();renderSpaces();});
  $("#supSel").addEventListener("change",()=>{SUP=Array.from($("#supSel").selectedOptions).map(o=>o.value);applyFilter();});
  $("#supSearch").addEventListener("input",()=>{
    const q=$("#supSearch").value.trim().toLowerCase();
    Array.from($("#supSel").options).forEach(o=>{o.hidden=q&&!o.value.toLowerCase().includes(q)&&!o.selected;});
    $("#supClear").hidden = !SUP.length && TA==="all" && !q;
  });
  $("#subSel").addEventListener("change",()=>{
    SUBTA=$("#subSel").value||"all";
    renderChrome(); renderSpaces();
  });
  $("#supClear").addEventListener("click",()=>{SUP=[];TA="all";SUBTA="all";$("#supSearch").value="";applyFilter();});
  $("#weekPill").textContent="Week of "+new Date().toLocaleDateString([],{month:"short",day:"numeric"});
  renderChrome(); renderHub(); loadTrials();
});
