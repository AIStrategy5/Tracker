// ===== DECERA CLINICAL HUB — DATA (extracted verbatim from the original tracker) =====
const FETCH_N = 80, SHOW_TRIALS = 15, SHOW_COMPANIES = 10;

const NEURO_CURATED = {
  alz: { label:"Alzheimer's / Dementia", color:"#8a5cc4",
    grants:[
      {co:"Biogen", url:"https://www.biogen.com/en_us/independent-medical-education.html", focus:"Alzheimer's disease (Leqembi shared-decision, ARIA monitoring); rare neurological disease.", rfp:"open"},
      {co:"Eisai", url:"https://www.eisai.com/company/business/medical/grants.html", focus:"Alzheimer's diagnosis, early detection, and treatment (Leqembi launch education).", rfp:"open"},
      {co:"Lilly", url:"https://grantoffice.lilly.com/areas-of-focus", focus:"Neurology — Alzheimer's disease (Kisunla / donanemab launch, amyloid PET, ARIA management).", rfp:"open"},
      {co:"Roche / Genentech", url:"https://www.gene.com/good/grants/independent-medical-education", focus:"Neuroscience — Alzheimer's biomarker/diagnostic pathways; gantenerumab wind-down means shift to diagnostics.", rfp:"limited"}
    ],
    companies:[
      {name:"Eisai / Biogen", type:"big", region:"Global (JP/US)", drugs:"lecanemab (Leqembi)", stage:"Marketed — subcutaneous formulation FDA approved Aug 2025; growing peak.", news:"https://www.eisai.com/news/index.html"},
      {name:"Lilly", type:"big", region:"US", drugs:"donanemab (Kisunla)", stage:"Marketed — first limited-duration anti-amyloid antibody; label expansion pending.", news:"https://investor.lilly.com/news-releases"},
      {name:"Prothena / BMS", type:"biotech", region:"US", drugs:"PRX012 (subQ anti-Aβ)", stage:"Ph1/2 — next-gen convenience play; potential 2027-28 filing.", news:"https://ir.prothena.com/press-releases"},
      {name:"Denali", type:"biotech", region:"US", drugs:"BIIB122 (LRRK2, with Biogen)", stage:"Ph3 LUMA in Parkinson's; LRRK2 also has Alzheimer's optionality.", news:"https://investors.denalitherapeutics.com/news-releases"}
    ],
    signals:"Anti-amyloid class is now three approved antibodies with divergent dosing paradigms (fixed-duration vs continuous) and unresolved ARIA-monitoring standards — the sequencing and stop-rule question is the highest-density unmet education need in dementia right now."
  },
  pd: { label:"Parkinson's / Movement Disorders", color:"#d84a3f",
    grants:[
      {co:"AbbVie", url:"https://www.abbvie.com/our-company/partnerships/independent-medical-education.html", focus:"Parkinson's disease — advanced PD, device-assisted therapies (Duopa/Vyalev subQ foslevodopa).", rfp:"limited"},
      {co:"Denali / Biogen", url:"https://www.biogen.com/en_us/independent-medical-education.html", focus:"LRRK2-associated Parkinson's; genetic testing and early-onset PD.", rfp:"signal"},
      {co:"Neurocrine", url:"https://www.neurocrine.com/responsibility/grants/", focus:"Tardive dyskinesia (Ingrezza); chorea in Huntington's disease.", rfp:"open"}
    ],
    companies:[
      {name:"AbbVie", type:"big", region:"US", drugs:"foslevodopa/foscarbidopa (Vyalev)", stage:"Marketed — first 24-hour subQ levodopa infusion for advanced PD.", news:"https://news.abbvie.com/"},
      {name:"Denali", type:"biotech", region:"US", drugs:"BIIB122 (LRRK2)", stage:"Ph3 LUMA — first genetically-targeted PD disease-modifying therapy candidate.", news:"https://investors.denalitherapeutics.com/news-releases"},
      {name:"Prothena", type:"biotech", region:"US", drugs:"prasinezumab (with Roche)", stage:"Ph2b PADOVA readout expected 2027 — anti-α-synuclein for early PD.", news:"https://ir.prothena.com/press-releases"},
      {name:"Cerevel / AbbVie", type:"big", region:"US", drugs:"tavapadon (D1/D5 partial agonist)", stage:"Ph3 TEMPO — non-dopaminergic PD approach with lower dyskinesia risk.", news:"https://news.abbvie.com/"}
    ],
    signals:"Vyalev launch shifted advanced-PD conversation from oral optimization to device-assisted infusion selection. LRRK2 and GBA genetic testing rates are <10% in community neurology — recognition and referral education is the structural gap."
  },
  ms: { label:"Multiple Sclerosis", color:"#2f8d67",
    grants:[
      {co:"Roche / Genentech", url:"https://www.gene.com/good/grants/independent-medical-education", focus:"Multiple sclerosis (Ocrevus / Ocrevus Zunovo subQ); progressive MS.", rfp:"open"},
      {co:"Novartis", url:"https://www.novartis.com/us-en/healthcare-professionals/external-funding/educational-grants/professional-medical-education-grants", focus:"MS — Kesimpta subQ; remyelination pipeline.", rfp:"open"},
      {co:"TG Therapeutics", url:"https://www.tgtherapeutics.com/", focus:"Multiple sclerosis (Briumvi — CD20 short-infusion).", rfp:"signal"},
      {co:"Sanofi", url:"https://www.sanofi.com/en/our-responsibility/grants", focus:"MS — tolebrutinib (BTK) filed; Aubagio genericized.", rfp:"open"}
    ],
    companies:[
      {name:"Roche", type:"big", region:"Global (CH)", drugs:"ocrelizumab (Ocrevus / Zunovo subQ)", stage:"Marketed — subQ formulation FDA approved 2024; RMS/PPMS anchor.", news:"https://www.roche.com/media/releases"},
      {name:"Sanofi", type:"big", region:"Global (FR)", drugs:"tolebrutinib (BTK)", stage:"Ph3 GEMINI/HERCULES — first BTK filing in nrSPMS expected 2026.", news:"https://www.sanofi.com/en/media-room"},
      {name:"Novartis", type:"big", region:"Global (CH)", drugs:"remibrutinib (BTK)", stage:"Ph3 REMODEL — BTK competitor to Sanofi.", news:"https://www.novartis.com/news"},
      {name:"TG Therapeutics", type:"biotech", region:"US", drugs:"ublituximab (Briumvi)", stage:"Marketed — 1-hour infusion positioning vs Ocrevus.", news:"https://ir.tgtherapeutics.com/"}
    ],
    signals:"BTK inhibitor class is about to become the third mechanism in MS after B-cell depletion and S1P. Sequencing after high-efficacy anti-CD20 is the live 2026-27 education question. PIRA (progression independent of relapse activity) is reshaping treatment goals."
  },
  epi: { label:"Epilepsy", color:"#d97706",
    grants:[
      {co:"UCB", url:"https://www.ucb-usa.com/stories-media/UCB-U-S-News/detail/company/independent-medical-education", focus:"Epilepsy (Vimpat, Briviact, Xcopri partnerships); Dravet syndrome.", rfp:"open"},
      {co:"Jazz Pharmaceuticals", url:"https://www.jazzpharma.com/humanistic/independent-medical-education/", focus:"Epilepsy (Epidiolex — Dravet, LGS, TSC).", rfp:"open"},
      {co:"SK Life Science", url:"https://www.sklifescienceinc.com/", focus:"Focal epilepsy (Xcopri / cenobamate).", rfp:"signal"},
      {co:"Longboard / Lundbeck", url:"https://us.lundbeck.com/", focus:"Developmental & epileptic encephalopathies (bexicaserin).", rfp:"signal"}
    ],
    companies:[
      {name:"SK Life Science", type:"biotech", region:"US", drugs:"cenobamate (Xcopri)", stage:"Marketed — highest seizure-freedom rates in focal epilepsy; global rollout.", news:"https://www.sklifescienceinc.com/newsroom/"},
      {name:"Longboard / Lundbeck", type:"biotech", region:"US", drugs:"bexicaserin (5-HT2C)", stage:"Ph3 DEEp OCEAN — DEEs including Dravet & LGS; acquired by Lundbeck 2024.", news:"https://ir.longboardpharma.com/press-releases"},
      {name:"Praxis Precision", type:"biotech", region:"US", drugs:"relutrigine (Na channel)", stage:"Ph2 EMBOLD — SCN2A/8A DEEs, orphan neurology.", news:"https://ir.praxismedicines.com/press-releases"}
    ],
    signals:"Developmental & epileptic encephalopathies (Dravet, LGS, CDKL5, SCN2A) are the fastest-growing rare-neuro segment, with three trial-stage assets converging on 2026-27. Adult refractory focal epilepsy remains an underserved space despite cenobamate's clinical outperformance."
  },
  mig: { label:"Migraine / Headache", color:"#2f7fb0",
    grants:[
      {co:"AbbVie / Allergan", url:"https://www.abbvie.com/our-company/partnerships/independent-medical-education.html", focus:"Migraine (Ubrelvy, Qulipta, Botox for chronic migraine).", rfp:"limited"},
      {co:"Pfizer / Biohaven", url:"https://www.pfizer.com/purpose/independent-grants-for-learning-change", focus:"Migraine (Nurtec ODT — Biohaven acquired by Pfizer).", rfp:"open"},
      {co:"Lundbeck", url:"https://us.lundbeck.com/", focus:"Migraine (Vyepti — IV eptinezumab).", rfp:"open"},
      {co:"Amgen / Novartis", url:"https://www.amgen.com/science/independent-medical-education", focus:"Migraine (Aimovig — anti-CGRP).", rfp:"limited"}
    ],
    companies:[
      {name:"AbbVie", type:"big", region:"US", drugs:"atogepant (Qulipta) + ubrogepant (Ubrelvy)", stage:"Marketed — the oral CGRP franchise; expanding into pediatric.", news:"https://news.abbvie.com/"},
      {name:"Pfizer", type:"big", region:"US", drugs:"rimegepant (Nurtec)", stage:"Marketed — acute + preventive oral CGRP.", news:"https://www.pfizer.com/newsroom"},
      {name:"Lundbeck", type:"biotech", region:"Global (DK)", drugs:"eptinezumab (Vyepti)", stage:"Marketed — IV CGRP mAb; long-interval convenience play.", news:"https://us.lundbeck.com/"}
    ],
    signals:"Oral CGRP is now the dominant preventive class; the sequencing question is CGRP vs older orals in primary care. Pediatric migraine and menstrually-related migraine remain under-served."
  },
  psy: { label:"Psychiatry (MDD · Schizophrenia · Bipolar)", color:"#5656d4",
    grants:[
      {co:"Sage / Biogen", url:"https://www.biogen.com/en_us/independent-medical-education.html", focus:"Postpartum depression (Zurzuvae — zuranolone).", rfp:"open"},
      {co:"Bristol Myers Squibb", url:"https://www.bms.com/about-us/responsibility/independent-grants.html", focus:"Schizophrenia (Cobenfy — xanomeline-trospium, first M1/M4 agonist).", rfp:"open"},
      {co:"Otsuka / Lundbeck", url:"https://www.otsuka-us.com/independent-medical-education", focus:"MDD (Rexulti), schizophrenia (Abilify), Alzheimer's agitation.", rfp:"open"},
      {co:"Alkermes", url:"https://www.alkermes.com/responsibility/independent-medical-education", focus:"Schizophrenia (Lybalvi), bipolar disorder.", rfp:"signal"},
      {co:"Neurocrine", url:"https://www.neurocrine.com/responsibility/grants/", focus:"Schizophrenia (NBI-1117568 muscarinic Ph3), congenital adrenal hyperplasia.", rfp:"open"}
    ],
    companies:[
      {name:"Bristol Myers Squibb", type:"big", region:"US", drugs:"xanomeline-trospium (Cobenfy)", stage:"Marketed — first non-D2 antipsychotic in decades; muscarinic mechanism.", news:"https://www.bms.com/media"},
      {name:"Sage / Biogen", type:"biotech", region:"US", drugs:"zuranolone (Zurzuvae)", stage:"Marketed for PPD; MDD program terminated 2023.", news:"https://investor.sagerx.com/"},
      {name:"Neurocrine", type:"biotech", region:"US", drugs:"NBI-1117568 (M4 muscarinic)", stage:"Ph3 schizophrenia — competitor to Cobenfy without trospium.", news:"https://neurocrine.gcs-web.com/"},
      {name:"AbbVie / Cerevel", type:"big", region:"US", drugs:"emraclidine (M4)", stage:"Ph3 schizophrenia — third muscarinic mechanism in class.", news:"https://news.abbvie.com/"}
    ],
    signals:"Muscarinic antipsychotics are the biggest schizophrenia shift in 30 years — Cobenfy launch education is happening in real time, with two more mechanisms (Neurocrine, AbbVie/Cerevel) in Ph3. Alzheimer's agitation (Rexulti approved 2023) is a growing overlap indication."
  },
  nmd: { label:"Neuromuscular (ALS · SMA · DMD)", color:"#1f9d8f",
    grants:[
      {co:"argenx", url:"https://www.argenx.com/", focus:"gMG, CIDP, MMN — Vyvgart / Vyvgart Hytrulo (SC) launched.", rfp:"open"},
      {co:"Alnylam", url:"https://www.alnylam.com/patients/patient-and-family-programs/grants", focus:"hATTR polyneuropathy (Onpattro, Amvuttra) — moving into cardiomyopathy.", rfp:"open"},
      {co:"Sarepta", url:"https://www.sarepta.com/patients-caregivers/patient-programs", focus:"Duchenne muscular dystrophy (Elevidys gene therapy + PMOs).", rfp:"open"},
      {co:"Ionis", url:"https://www.ionis.com/patients/grants/", focus:"SMA (Spinraza), SOD1-ALS (tofersen / Qalsody), FCS.", rfp:"open"},
      {co:"Biogen", url:"https://www.biogen.com/en_us/independent-medical-education.html", focus:"SMA (Spinraza), Friedreich's ataxia (Skyclarys via Reata acquisition), ALS (Qalsody with Ionis).", rfp:"open"},
      {co:"UCB", url:"https://www.ucb-usa.com/", focus:"gMG (Zilbrysq — zilucoplan; Rystiggo — rozanolixizumab).", rfp:"open"}
    ],
    companies:[
      {name:"argenx", type:"biotech", region:"Global (BE)", drugs:"efgartigimod (Vyvgart / Hytrulo)", stage:"Marketed — gMG global, CIDP US approved; MMN and other indications advancing.", news:"https://www.argenx.com/newsroom"},
      {name:"Sarepta", type:"big", region:"US", drugs:"delandistrogene (Elevidys)", stage:"Marketed — DMD gene therapy; ambulatory + non-ambulatory expansion 2024.", news:"https://investorrelations.sarepta.com/press-releases"},
      {name:"Ionis / Biogen", type:"big", region:"US", drugs:"tofersen (Qalsody)", stage:"Marketed — first SOD1-ALS therapy; genetic testing now standard-of-care trigger.", news:"https://ir.ionis.com/press-releases"},
      {name:"Denali / Sanofi", type:"biotech", region:"US", drugs:"SAR443820 (RIPK1 inhibitor)", stage:"Ph2 ALS — CNS-penetrant RIPK1 for ALS/MS.", news:"https://investors.denalitherapeutics.com/news-releases"}
    ],
    signals:"gMG went from one to five approved mechanisms in three years — sequencing after complement failure vs FcRn is the live education question. DMD gene therapy expansion (Elevidys age broadening) reshapes referral pathway. SOD1-ALS genetic testing is under-utilized — recognition is the education gap."
  },
  strk: { label:"Stroke", color:"#bd7a2e",
    grants:[
      {co:"Bayer", url:"https://www.grants-contributions.bayer.com/", focus:"Secondary stroke prevention (asundexian Factor XI).", rfp:"open"},
      {co:"BMS / Pfizer", url:"https://www.bms.com/about-us/responsibility/independent-grants.html", focus:"Stroke prevention in AF (apixaban/Eliquis).", rfp:"limited"},
      {co:"AstraZeneca / Alexion", url:"https://www.astrazeneca-us.com/", focus:"Andexxa reversal for anticoagulant-associated intracerebral haemorrhage.", rfp:"signal"}
    ],
    companies:[
      {name:"Bayer", type:"big", region:"Global (DE)", drugs:"asundexian (oral Factor XIa)", stage:"Ph3 — OCEANIC-STROKE positive Nov 2025 for secondary stroke prevention; filing.", news:"https://www.bayer.com/en/us/newsroom"},
      {name:"NoNO Inc.", type:"biotech", region:"US", drugs:"nerinetide (Tat-NR2B9c)", stage:"Ph3 ESCAPE-NEXT — neuroprotection for acute ischemic stroke (thrombectomy adjunct).", news:"https://nono.com/news/"}
    ],
    signals:"Factor XI class is the biggest stroke-prevention shift since DOACs — hemostasis-sparing anticoagulation reshapes bleeding-risk conversations, particularly in the elderly/frail population where DOACs currently underperform."
  },
  slp: { label:"Sleep / Narcolepsy", color:"#a06a12",
    grants:[
      {co:"Jazz Pharmaceuticals", url:"https://www.jazzpharma.com/humanistic/independent-medical-education/", focus:"Narcolepsy (Xywav, Xyrem, solriamfetol/Sunosi divested); idiopathic hypersomnia.", rfp:"open"},
      {co:"Takeda", url:"https://www.takeda.com/who-we-are/company-information/independent-medical-education/", focus:"Narcolepsy — orexin agonists (TAK-861 Ph3).", rfp:"open"},
      {co:"Alkermes", url:"https://www.alkermes.com/responsibility/independent-medical-education", focus:"Narcolepsy — orexin 2 receptor agonist (ALKS-2680).", rfp:"signal"}
    ],
    companies:[
      {name:"Takeda", type:"big", region:"Global (JP)", drugs:"TAK-861 (orexin 2 agonist)", stage:"Ph3 — first-in-class orexin agonism for narcolepsy type 1; potential 2027 approval.", news:"https://www.takeda.com/newsroom"},
      {name:"Alkermes", type:"biotech", region:"US", drugs:"ALKS-2680 (orexin 2 agonist)", stage:"Ph2 — competing orexin mechanism; narcolepsy + IH.", news:"https://www.alkermes.com/media/news-releases"},
      {name:"Centessa", type:"biotech", region:"US", drugs:"ORX750 (orexin 2 agonist)", stage:"Ph2 — third orexin entrant.", news:"https://ir.centessa.com/press-releases"}
    ],
    signals:"Orexin agonism will transform narcolepsy type 1 care in 2026-27 — three sponsors converging on the same mechanism creates immediate comparative-effectiveness education demand."
  },
  rare: { label:"Rare Neuro (Rett · Dravet · Angelman)", color:"#4a4ac0",
    grants:[
      {co:"Acadia Pharmaceuticals", url:"https://www.acadia-pharm.com/", focus:"Rett syndrome (Daybue — trofinetide).", rfp:"open"},
      {co:"PTC Therapeutics", url:"https://www.ptcbio.com/", focus:"AADC deficiency (Upstaza), Duchenne (Emflaza), other rare CNS.", rfp:"open"},
      {co:"Ultragenyx", url:"https://www.ultragenyx.com/", focus:"Rare metabolic and CNS — GSD, Sanfilippo, Angelman gene therapy pipeline.", rfp:"open"},
      {co:"Ionis", url:"https://www.ionis.com/patients/grants/", focus:"Angelman syndrome (ION582), Huntington's disease (tominersen).", rfp:"open"},
      {co:"Passage Bio", url:"https://www.passagebio.com/", focus:"GM1 gangliosidosis, FTD-GRN gene therapy.", rfp:"signal"}
    ],
    companies:[
      {name:"Ionis / Biogen", type:"big", region:"US", drugs:"ION582 (UBE3A ASO)", stage:"Ph1/2 HALOS — Angelman syndrome; potential first disease-modifying therapy.", news:"https://ir.ionis.com/press-releases"},
      {name:"Acadia", type:"biotech", region:"US", drugs:"trofinetide (Daybue)", stage:"Marketed — first Rett syndrome therapy; peak sales trajectory unclear.", news:"https://ir.acadia-pharm.com/news-releases"},
      {name:"Neurogene", type:"biotech", region:"US", drugs:"NGN-401 (MECP2 gene therapy)", stage:"Ph1/2 Rett — competing with Taysha's TSHA-102.", news:"https://ir.neurogene.com/news"},
      {name:"Taysha Gene Therapies", type:"biotech", region:"US", drugs:"TSHA-102 (MECP2)", stage:"Ph1/2 REVEAL — Rett gene therapy; interim data expected 2026.", news:"https://ir.tayshagtx.com/news-releases"}
    ],
    signals:"Rett syndrome gene therapy field is emerging (Neurogene + Taysha) alongside marketed Daybue — creates the first sequencing conversation in a disease that had no therapies until 2023. Angelman ASO race between Ionis, Ultragenyx and Roche is the next inflection."
  }
};

const NEURO_COIF = [
  {sup:"Eisai / Biogen", area:"alz", indication:"Alzheimer's disease (lecanemab / Leqembi subQ)",
   inaction:"Community neurologists default to whichever anti-amyloid rep detailed first, producing inconsistent ARIA monitoring and inappropriate stops. Timing: Leqembi subQ launched Aug 2025 — the class-comparison narrative is being set right now.",
   diff:"Competitors (Medscape, PeerView) run mechanism primers on lecanemab and donanemab separately. Decera unique play: an ARIA Monitoring & Stop-Rule Decision Clinic across all three anti-amyloid antibodies with radiologist + neurologist joint faculty. Sequencing/timing + faculty-mix lens.",
   perspective:"Eisai/Biogen need community-neurology confidence in ARIA workflow to unlock the subQ launch's reach beyond academic centres."},
  {sup:"Bristol Myers Squibb", area:"psy", indication:"Schizophrenia (Cobenfy / xanomeline-trospium)",
   inaction:"First non-D2 antipsychotic in 30 years — no prescriber has comparator experience. Community psychiatry defaults to atypicals; adherence and titration errors risk defining the class narrative early.",
   diff:"Competitors (PRIME, ACHL) run generic 'new antipsychotics' updates. Decera unique play: an M1/M4 Muscarinic Class Literacy curriculum with community + academic dual audience, focused on titration and GI-tolerability. Novel-format + unmet subpopulation lens (community psychiatrists).",
   perspective:"BMS needs to protect Cobenfy's first-mover position against Neurocrine and AbbVie/Cerevel muscarinic Ph3 readouts due 2026-27."},
  {sup:"argenx", area:"nmd", indication:"Generalized myasthenia gravis / CIDP (Vyvgart Hytrulo)",
   inaction:"gMG went from one to five approved mechanisms in three years. Payer coverage now drives sequencing, not clinical logic — sequencing error at first switch is common.",
   diff:"Competitors (Medscape, ACHL) run FcRn primer activities. Decera unique play: an FcRn-vs-Complement Sequencing Curriculum with neurology + rheumatology + pharmacy faculty around switch-after-first-failure decisions. Faculty-mix + sequencing lens.",
   perspective:"argenx needs to defend Vyvgart share as UCB Rystiggo/Zilbrysq and Alexion Ultomiris compete for the same switch patients."},
  {sup:"Sarepta Therapeutics", area:"nmd", indication:"Duchenne muscular dystrophy (Elevidys gene therapy)",
   inaction:"Elevidys ambulatory + non-ambulatory expansion 2024 broadened the eligible population overnight; referral pathways from neurology to gene-therapy centres are inconsistent, delaying treatment.",
   diff:"Competitors (PRIME, PeerView) run mechanism-of-action updates. Decera unique play: a DMD Referral & Gene-Therapy Readiness pathway curriculum with community neurology + gene-therapy centre + PT/OT joint faculty. Implementation + faculty-mix lens.",
   perspective:"Sarepta needs to widen the ambulatory-adolescent referral funnel to hit Elevidys peak sales."},
  {sup:"Ionis / Biogen", area:"nmd", indication:"SOD1-ALS (tofersen / Qalsody)",
   inaction:"Genetic testing for SOD1 in ALS is still <30% at community centres. Missed genotyping = missed disease-modifying therapy = worse outcomes.",
   diff:"Competitors run tofersen mechanism updates. Decera unique play: an ALS Genetic Testing & Reflex-Workflow curriculum for community neurology, embedding SOD1 genotyping into standard-of-care order sets. Implementation lens (workflow, not therapeutics).",
   perspective:"Ionis/Biogen need broader genetic testing to grow the addressable Qalsody population."},
  {sup:"Vera Therapeutics / Denali", area:"pd", indication:"LRRK2-associated Parkinson's (BIIB122)",
   inaction:"LRRK2 and GBA testing rates <10% in community neurology. First genetically-targeted disease-modifying PD therapy is heading to filing with no prescriber base ready to identify eligible patients.",
   diff:"Competitors mostly ignore genetic PD. Decera unique play: a Genetic Parkinson's Recognition curriculum aimed at community neurology + primary care — red-flag phenotype and testing pathways. Unmet subpopulation + implementation lens.",
   perspective:"Denali/Biogen need community readiness to identify the ~5-15% of PD patients who would be BIIB122 candidates at launch."}
];

const NEURO_KOL_ADD = [
  {name:"Reisa Sperling, MD", institution:"Brigham & Women's Hospital / Harvard Medical School", specialty:"Neurology (Alzheimer's)", role:"Trial investigator", supporter:"Eisai / Biogen", area:"alz", indication:"Alzheimer's disease", srcUrl:"https://www.brighamandwomens.org/research/departments/neurology", srcTitle:"BWH Neurology — Sperling profile (Clarity AD PI)"},
  {name:"Christopher van Dyck, MD", institution:"Yale School of Medicine (Alzheimer's Disease Research Unit)", specialty:"Neurology (Alzheimer's)", role:"Trial investigator", supporter:"Eisai / Biogen", area:"alz", indication:"Alzheimer's disease", srcUrl:"https://medicine.yale.edu/adru/", srcTitle:"Yale ADRU — van Dyck (Clarity AD lead author)"},
  {name:"Jeffrey Cummings, MD, ScD", institution:"UNLV Chambers-Grundy Center", specialty:"Neurology (Alzheimer's)", role:"Advisory board (disclosed)", supporter:"Lilly", area:"alz", indication:"Alzheimer's disease", srcUrl:"https://www.unlv.edu/research/cgcnt", srcTitle:"UNLV — Cummings profile (Kisunla advisor)"},
  {name:"Michael Okun, MD", institution:"University of Florida (Fixel Institute)", specialty:"Neurology (Movement Disorders)", role:"Society leadership", supporter:"Michael J. Fox Foundation", area:"pd", indication:"Parkinson's disease", srcUrl:"https://fixel.ufhealth.org/", srcTitle:"UF Fixel — Okun Medical Director"},
  {name:"Fred Lublin, MD", institution:"Icahn School of Medicine at Mount Sinai", specialty:"Neurology (Multiple Sclerosis)", role:"Trial investigator", supporter:"Roche", area:"ms", indication:"Multiple sclerosis", srcUrl:"https://icahn.mssm.edu/profiles/fred-d-lublin", srcTitle:"Icahn Mount Sinai — Lublin faculty profile"},
  {name:"Stephen Krieger, MD", institution:"Icahn School of Medicine at Mount Sinai (Corinne Goldsmith Dickinson Center for MS)", specialty:"Neurology (MS)", role:"CME faculty", supporter:"National MS Society", area:"ms", indication:"Multiple sclerosis", srcUrl:"https://www.mountsinai.org/profiles/stephen-c-krieger", srcTitle:"Mount Sinai — Krieger faculty profile"},
  {name:"Christoph Correll, MD", institution:"Zucker Hillside Hospital / Northwell Health", specialty:"Psychiatry (Schizophrenia)", role:"Trial investigator", supporter:"Bristol Myers Squibb", area:"psy", indication:"Schizophrenia", srcUrl:"https://www.northwell.edu/find-care/find-a-doctor/psychiatry/dr-christoph-u-correll", srcTitle:"Northwell — Correll faculty profile (KarXT trials)"},
  {name:"Stephen Marder, MD", institution:"UCLA Semel Institute", specialty:"Psychiatry (Schizophrenia)", role:"Advisory board (disclosed)", supporter:"Bristol Myers Squibb", area:"psy", indication:"Schizophrenia", srcUrl:"https://www.semel.ucla.edu/profile/stephen-marder-md", srcTitle:"UCLA Semel — Marder profile"},
  {name:"Merit Cudkowicz, MD", institution:"Massachusetts General Hospital (Healey Center for ALS)", specialty:"Neurology (ALS)", role:"Trial investigator", supporter:"Ionis / Biogen", area:"nmd", indication:"SOD1-ALS", srcUrl:"https://www.massgeneral.org/neurology/als", srcTitle:"MGH Healey ALS — Cudkowicz Director (VALOR PI)"},
  {name:"Nicholas Johnson, MD", institution:"VCU School of Medicine (Neuromuscular)", specialty:"Neurology (DMD / Neuromuscular)", role:"Trial investigator", supporter:"Sarepta", area:"nmd", indication:"Duchenne muscular dystrophy", srcUrl:"https://neurology.vcu.edu/", srcTitle:"VCU Neurology — Johnson faculty profile"},
  {name:"Orla Hardiman, MD", institution:"Trinity College Dublin", specialty:"Neurology (ALS)", role:"Society leadership", supporter:"Motor Neurone Disease Association", area:"nmd", indication:"ALS", srcUrl:"https://www.tcd.ie/medicine/neurology/", srcTitle:"Trinity Neurology — Hardiman Chair"}
];
// Merge neuro KOLs into the main KOL_DATA so the KOL Intelligence table can filter to neuroscience.
if(typeof window.KOL_DATA !== "undefined"){ window.KOL_DATA = window.KOL_DATA.concat(NEURO_KOL_ADD); }

const NEURO_PDUFA = [
  {co:"Sanofi", drug:"tolebrutinib", indication:"nrSPMS (BTK)", date:"2026-11-15", note:"First BTK filing in progressive MS; sequencing question against anti-CD20 is live."},
  {co:"Takeda", drug:"TAK-861 (oveporexton)", indication:"Narcolepsy type 1", date:"2027-Q1", note:"First-in-class orexin 2 receptor agonist; three sponsors converging on the mechanism."},
  {co:"Pharvaris", drug:"deucrictibant", indication:"Hereditary angioedema on-demand", date:"2027-04-23", note:"Second oral on-demand HAE; competitive 2027 education window."},
  {co:"Sarepta", drug:"SRP-9003", indication:"Limb-girdle muscular dystrophy 2E/R4", date:"2026-12-15", note:"LGMD gene therapy; expands Elevidys-adjacent referral pathway."},
  {co:"Neurocrine", drug:"NBI-1117568", indication:"Schizophrenia (M4 muscarinic)", date:"2027-H2", note:"Second muscarinic entrant after Cobenfy; without trospium."},
  {co:"Ionis / Biogen", drug:"ION582 (ULM-0507)", indication:"Angelman syndrome (UBE3A ASO)", date:"2027-H2", note:"First disease-modifying therapy for Angelman."},
  {co:"Denali / Biogen", drug:"BIIB122 (LRRK2 inhibitor)", indication:"LRRK2-associated Parkinson's", date:"2027-H2", note:"First genetically-targeted disease-modifying PD therapy."},
  {co:"AbbVie / Cerevel", drug:"emraclidine", indication:"Schizophrenia (M4 muscarinic)", date:"2027-H2", note:"Third muscarinic mechanism in class."}
];

const NEURO_CONF = [
  {name:"AAN Annual Meeting 2026", date:"2026-04-04", loc:"San Diego, CA", scope:"General neurology; MS, headache, ALS all featured. Grant portals often reopen 30-60 days post-AAN."},
  {name:"AAIC 2026 (Alzheimer's Association International Conference)", date:"2026-07-26", loc:"Toronto, Canada", scope:"Alzheimer's diagnostic biomarkers, anti-amyloid updates, blood-based testing. Peak Alzheimer's education planning window."},
  {name:"MDS International Congress 2026", date:"2026-10-04", loc:"Vienna, Austria", scope:"Movement disorders — Parkinson's, ET, HD, dystonia. LRRK2 and prasinezumab updates expected."},
  {name:"ECTRIMS 2026", date:"2026-09-09", loc:"Barcelona, Spain", scope:"Multiple sclerosis — BTK inhibitor class data (Sanofi, Novartis), long-term Ocrevus, PIRA framing."},
  {name:"APA Annual Meeting 2026", date:"2026-05-16", loc:"Los Angeles, CA", scope:"Psychiatry — muscarinic antipsychotic real-world data (Cobenfy), new depression mechanisms."},
  {name:"MDA Clinical & Scientific Conference 2026", date:"2026-03-15", loc:"Dallas, TX", scope:"Neuromuscular — DMD gene therapy, gMG sequencing, ALS genetic testing."},
  {name:"ANA Annual Meeting 2026", date:"2026-09-13", loc:"Baltimore, MD", scope:"Academic neurology; strong ALS/gMG/neuromuscular cohort."},
  {name:"ISC 2027 (International Stroke Conference)", date:"2027-02-03", loc:"Los Angeles, CA", scope:"Factor XI anticoagulation, thrombectomy adjuncts. Bayer asundexian launch education window."},
  {name:"SLEEP 2026", date:"2026-06-06", loc:"Seattle, WA", scope:"Sleep medicine — orexin agonist Ph3 updates (Takeda, Alkermes, Centessa)."},
  {name:"EAN Congress 2026", date:"2026-06-20", loc:"Berlin, Germany", scope:"European neurology umbrella — ideal ex-US audience for global-format concepts."}
];

const NEURO_SIGNALS = {
  alz:[
    ["Leqembi subQ launched Aug 2025 — convenience play reshapes eligibility conversations for community neurology.","https://www.eisai.com/news/index.html"],
    ["Kisunla (donanemab) first anti-amyloid with limited-duration dosing paradigm — stop-rule education is unresolved.","https://investor.lilly.com/news-releases"],
    ["Blood-based biomarker (pTau-217) FDA-cleared 2024 — diagnostic pathway shift under way, education gap widening."]
  ],
  pd:[
    ["Vyalev (foslevodopa/foscarbidopa subQ) launched 2024 — first 24-hour subQ levodopa infusion reshapes advanced-PD referral pathway.","https://news.abbvie.com/"],
    ["Denali BIIB122 (LRRK2) LUMA Ph3 ongoing — first genetically-targeted disease-modifying PD therapy candidate.","https://investors.denalitherapeutics.com/news-releases"],
    ["Prothena prasinezumab PADOVA readout guided 2027 — first anti-α-synuclein pivotal in early PD."]
  ],
  ms:[
    ["Sanofi tolebrutinib GEMINI/HERCULES Ph3 positive — BTK class arriving in nrSPMS 2026-27.","https://www.sanofi.com/en/media-room"],
    ["Ocrevus Zunovo subQ approved 2024 — dosing convenience shifts community neurology adoption."],
    ["TG Therapeutics Briumvi 1-hour infusion positioning vs Ocrevus increasingly cited in RWE.","https://ir.tgtherapeutics.com/"]
  ],
  epi:[
    ["Longboard bexicaserin DEEp OCEAN Ph3 in DEEs — acquired by Lundbeck 2024; Dravet/LGS launch education window opens 2026-27.","https://us.lundbeck.com/"],
    ["SK Xcopri (cenobamate) achieving highest seizure-freedom rates in focal epilepsy; global rollout continues.","https://www.sklifescienceinc.com/newsroom/"],
    ["Praxis relutrigine EMBOLD Ph2 in SCN2A/SCN8A DEEs — rare epilepsy race intensifying."]
  ],
  mig:[
    ["Ubrelvy/Qulipta franchise expanding into pediatric migraine — new prescriber audience.","https://news.abbvie.com/"],
    ["Nurtec ODT dual-labeled acute+preventive — sequencing conversation with older orals is live."],
    ["Lundbeck Vyepti long-interval IV positioning increasingly used as biologic-refractory bridge."]
  ],
  psy:[
    ["BMS Cobenfy (xanomeline-trospium) launch reshaping schizophrenia care — first non-D2 antipsychotic in 30 years.","https://www.bms.com/media"],
    ["Neurocrine NBI-1117568 M4 muscarinic Ph3 — competitor to Cobenfy without trospium.","https://neurocrine.gcs-web.com/"],
    ["AbbVie/Cerevel emraclidine M4 Ph3 — third muscarinic mechanism converging 2027.","https://news.abbvie.com/"]
  ],
  nmd:[
    ["argenx Vyvgart Hytrulo SC + CIDP US label — gMG sequencing question is live across 5 mechanisms.","https://www.argenx.com/newsroom"],
    ["Sarepta Elevidys ambulatory + non-ambulatory expansion 2024 — DMD referral pathway broadening.","https://investorrelations.sarepta.com/press-releases"],
    ["Ionis/Biogen Qalsody (tofersen) — SOD1-ALS genetic testing underutilized; standard-of-care trigger."]
  ],
  strk:[
    ["Bayer asundexian OCEANIC-STROKE positive Nov 2025; NDA under Priority Review; FDA action ~Q4 2026.","https://www.bayer.com/en/us/newsroom"],
    ["Novartis abelacimab LILAC-TIMI 76 interim analysis expected before year-end 2026 — FXI class read continues."],
    ["ESCAPE-NEXT nerinetide (neuroprotection for thrombectomy adjunct) — Ph3 ongoing."]
  ],
  slp:[
    ["Takeda TAK-861 (oveporexton) Ph3 — first-in-class orexin agonism for narcolepsy type 1; potential 2027 approval.","https://www.takeda.com/newsroom"],
    ["Alkermes ALKS-2680 Ph2 — competing orexin 2 mechanism; narcolepsy + IH."],
    ["Centessa ORX750 Ph2 — third orexin entrant."]
  ],
  rare:[
    ["Ionis/Biogen ION582 (UBE3A ASO) HALOS Ph1/2 — potential first disease-modifying therapy for Angelman.","https://ir.ionis.com/press-releases"],
    ["Neurogene NGN-401 (MECP2 gene therapy) Ph1/2 in Rett — competing with Taysha TSHA-102 REVEAL."],
    ["Acadia Daybue (trofinetide) real-world tolerability data continuing to reshape Rett prescribing."]
  ]
};

const NEURO_RFP = [
  {co:"Eisai", title:"Alzheimer's Diagnosis & Care Pathway Education", due:"2026-10-15", note:"Post-AAIC RFP window; Leqembi subQ launch alignment."},
  {co:"Lilly", title:"Alzheimer's Disease — Amyloid Imaging & ARIA Management", due:"2026-11-01", note:"Kisunla launch education."},
  {co:"Roche / Genentech", title:"MS — Progressive Disease & PIRA Framework", due:"2026-09-30", note:"Ocrevus Zunovo launch + PIRA reframing."},
  {co:"Sanofi", title:"MS — BTK Class Literacy (pre-launch tolebrutinib)", due:"2026-12-15", note:"BTK mechanism education; PDUFA-anchored."},
  {co:"BMS", title:"Schizophrenia — Muscarinic Antipsychotic Care Pathway", due:"2026-10-30", note:"Cobenfy real-world uptake + titration."},
  {co:"argenx", title:"gMG Competence Gap Program (2026)", due:"2026-11-30", note:"Vyvgart Hytrulo positioning + CIDP expansion."},
  {co:"Ionis", title:"SOD1-ALS Genetic Testing & Standard-of-Care Workflow", due:"2026-12-01", note:"Tofersen reflex-testing embedding."},
  {co:"Jazz", title:"Narcolepsy & Idiopathic Hypersomnia Education", due:"2027-01-15", note:"Pre-orexin-agonist competitive landscape prep."},
  {co:"Sarepta", title:"DMD Gene Therapy Referral Pathway", due:"2026-11-15", note:"Elevidys ambulatory expansion education."}
];

const WHITESPACE = {
  multi: [
    {area:"Ophthalmology · Retinal gene therapy (RPE65, ABCA4, XLRP)", velocity:"Very high", why:"Beacon (kh631), 4D Molecular (4D-150), Nanoscope (MCO-010) — three Ph3 RGT programs closing on filing. No comparative sequencing education exists.", who:"Beacon, 4D Molecular, Nanoscope, Editas, ProQR", entry:"Foundational retinal gene-therapy literacy + genotype-first prescribing curriculum. Decera has no retinal-gene-therapy footprint yet — first-mover position wide open."},
    {area:"Aesthetic / Medical Dermatology (nonprescription-adjacent)", velocity:"High", why:"Skinvive HA injectable (AbbVie/Allergan), Daxxify masseter/glabellar, Nectin-4 topicals — the aesthetic/therapeutic dermatology boundary is dissolving.", who:"AbbVie/Allergan, Galderma, Revance, Merz, L'Oréal Skinbetter", entry:"Aesthetic-adjacent therapeutic dermatology (post-procedure care, injectable safety, skin cancer detection at cosmetic visits) — MedEd is thin because most is company-sponsored non-CME."},
    {area:"Women's Health · Menopause / GSM / VMS", velocity:"Very high", why:"Astellas Veozah (fezolinetant) launched, Bayer elinzanetant Ph3 positive — non-hormonal VMS class emerging. Menopause literacy in primary care is <20%.", who:"Astellas, Bayer, Bonafide, Pfizer, TherapeuticsMD", entry:"Primary-care menopause competency curriculum + NK3 class literacy. Decera not currently in women's-health CME."},
    {area:"Musculoskeletal / Osteoarthritis · Sensory-nerve therapies", velocity:"Medium-High", why:"Pfizer/Eli Lilly tanezumab post-hold restart, Eupraxia EP-104IAR Ph2, Coya cell therapies — KOA disease modification finally moving.", who:"Pfizer, Lilly, Regeneron, Eupraxia, Coya", entry:"KOA disease-modification framework for rheumatology + primary care + orthopedics. Under-supported despite huge disease burden."},
    {area:"Infectious Disease · HIV Long-Acting + Prevention", velocity:"High", why:"Gilead lenacapavir 6-month PrEP approved 2024, ViiV cabotegravir + rilpivirine long-acting expanding — care model shifting from daily oral to injection.", who:"Gilead, ViiV/GSK, Merck", entry:"Long-acting HIV care-model transition (workflow, adherence, injection-site management). Currently non-oncologic ID is out of scope but adjacent."},
    {area:"Endocrinology · Adrenal insufficiency + rare endocrine (CAH, GH)", velocity:"Medium-High", why:"Neurocrine Crenessity (crinecerfont) approved 2024 for CAH — first mechanism-targeted CAH therapy. Rare-endocrine PDUFA cluster in 2026-27.", who:"Neurocrine, Ascendis (TransCon), Corcept (Korlym), Diurnal", entry:"Rare-endocrine transition-of-care (peds → adult) curriculum. Complements existing endocrinology footprint."}
  ],
  neuro: [
    {area:"Psychiatry · Autism spectrum · irritability & core symptoms", velocity:"High", why:"Otsuka centanafadine, Roche balovaptan (halted but pipeline shifting), Yamo YAM-101 (bumetanide reformulation) — first non-antipsychotic mechanisms for ASD irritability entering registration.", who:"Otsuka, Yamo, Autifony, PsychoGenics, Roche pipeline", entry:"Core-symptom vs irritability distinction curriculum for developmental pediatrics + child psychiatry. Autism care is a MedEd desert."},
    {area:"Psychiatry · ADHD · non-stimulant + long-acting", velocity:"Medium-High", why:"Supernus SPN-812 (Qelbree) growing, Axsome AXS-05 crossing indications, Neurocrine valbenazine ADHD-adjacent — non-stimulant ADHD landscape expanding beyond atomoxetine.", who:"Supernus, Neurocrine, Axsome, Ironshore, Cingulate", entry:"Adult ADHD diagnosis + non-stimulant selection framework — a huge unmet primary-care education gap."},
    {area:"Neurology · Post-Acute Sequelae of COVID (Long COVID) neuro-cognitive", velocity:"Medium-High (federally funded)", why:"RECOVER trials funded through 2027, Sanofi partnerships, Yale POTS clinic protocols — post-viral neurocognitive care is now a defined subspecialty.", who:"NIH-RECOVER, Sanofi, PolyBio Foundation", entry:"Post-viral neurology recognition + rehabilitation curriculum for primary care + neurology + PM&R. Public-health funding available."},
    {area:"Neuro-oncology adjacent · Neurofibromatosis + tumor-related epilepsy", velocity:"Medium", why:"AstraZeneca/MSD Koselugo (selumetinib) label expansion, SpringWorks mirdametinib approved 2025 in NF1-PN — MEK inhibitor class established, sequencing question opens.", who:"AstraZeneca, SpringWorks, Alexion", entry:"NF care pathway (peds → adult transition, MEK sequencing, surveillance) — care fragmented across neurology, oncology, and genetics."},
    {area:"Sleep · Circadian + shift-work + narcolepsy-adjacent hypersomnias", velocity:"High", why:"Beyond narcolepsy T1 orexin race, hypersomnia (Xywav in IH), circadian disorders (Vanda tasimelteon adjacencies), shift-work disorder are all pipeline-active.", who:"Jazz, Vanda, Takeda, Alkermes, Centessa, Harmony", entry:"Broader sleep-wake disorders curriculum (IH, N2, circadian, shift-work) — currently only narcolepsy T1 gets funded activity."},
    {area:"Rare Neuro · Prader-Willi & Angelman adult transition", velocity:"Medium-High", why:"Soleno diazoxide choline (DCCR) approved 2025 in PWS hyperphagia; Ionis ION582 in Angelman — adult care for pediatric-onset rare neuro is unaddressed.", who:"Soleno, Ionis/Biogen, Ultragenyx, Passage Bio", entry:"Adult-transition curriculum for pediatric-onset rare neuro — the referral pathway from pediatric specialist to adult neurology is broken in every rare-neuro indication."}
  ]
};

const NEURO_CINTEL = {
  alz:{
    funders:"Eisai (Leqembi launch + subQ), Biogen (co-marketing + Alzheimer's Association), Lilly (Kisunla launch), Roche/Genentech (biomarker/diagnostic — gantenerumab wound down).",
    formats:"Anti-amyloid mechanism primers, ARIA case-based simulations, amyloid PET/CSF/blood-biomarker workflows, radiologist × neurologist joint activities.",
    topics:"ARIA monitoring, patient selection (APOE4), stop rules, subQ workflow, blood-based diagnosis.",
    providers:"Med-IQ (Eisai-adjacent), Medscape, PeerView, PRIME, Vindico Med-Ed.",
    receptivity:"OPEN — Eisai/Lilly grants offices actively awarding.",
    priorities:"12-18 mo: expand blood-biomarker testing in primary care; standardize ARIA monitoring; support subQ shift; anti-amyloid class-comparison education (stop rules, sequencing).",
    gaps:"Almost no independent education on stop rules or when-to-continue anti-amyloid past 18 months. Community neurology confidence in ARIA is under-supported. Blood-biomarker interpretation for primary care is nascent."
  },
  psy:{
    funders:"BMS (Cobenfy launch — first non-D2 in 30 years), Neurocrine (NBI-1117568 pre-launch), AbbVie/Cerevel (emraclidine pre-launch), Otsuka/Lundbeck (Rexulti, Abilify Asimtufii), Alkermes (Lybalvi), Sage/Biogen (Zurzuvae in PPD).",
    formats:"Muscarinic class primers, side-effect anticipation (GI tolerability), long-acting injectable comparators, dose-titration protocols.",
    topics:"Muscarinic mechanism, titration, cholinergic side-effects, prior-D2 switch strategies, real-world outcomes.",
    providers:"Medscape Psychiatry, PsychU (Otsuka), PeerView, ACHL, Rockpointe.",
    receptivity:"OPEN — BMS actively awarding; Neurocrine and AbbVie/Cerevel warming up pre-launch pipeline.",
    priorities:"12-18 mo: normalize muscarinic mechanism across all three sponsors' sales strategies; comparative-effectiveness education for the switch-after-atypical patient.",
    gaps:"No independent M1/M4 class-literacy activity yet. Community psychiatry adoption education is thin. Cardiometabolic side-effect trade-offs vs atypicals are under-taught."
  },
  ms:{
    funders:"Roche (Ocrevus/Zunovo), Novartis (Kesimpta, remibrutinib), Sanofi (tolebrutinib pre-launch), TG Therapeutics (Briumvi), Biogen (Tecfidera generics — declining spend).",
    formats:"BTK class primers, PIRA framing, subQ formulation transition, anti-CD20 sequencing.",
    topics:"BTK mechanism, PIRA (progression independent of relapse activity), high-efficacy first-line, treat-to-target.",
    providers:"Medscape MS, National MS Society Educational Programs, ACHL, Consortium of MS Centers.",
    receptivity:"OPEN — Roche, Novartis, Sanofi all actively funding.",
    priorities:"12-18 mo: educate on BTK class ahead of tolebrutinib launch; PIRA framework normalization; subQ delivery adoption in community neurology.",
    gaps:"BTK class literacy is nascent. PIRA vs relapse-driven disability is under-taught outside academic centres. Long-term anti-CD20 monitoring evidence is thin."
  },
  nmd:{
    funders:"argenx (Vyvgart/Hytrulo gMG + CIDP), UCB (Zilbrysq, Rystiggo gMG), Alexion (Ultomiris gMG), Sarepta (Elevidys DMD), Ionis/Biogen (Qalsody SOD1-ALS, Spinraza SMA), Roche (Evrysdi SMA).",
    formats:"gMG mechanism comparators, DMD gene-therapy referral pathways, SMA long-term care, ALS genetic testing workflows.",
    topics:"FcRn vs complement sequencing, subQ conversion in gMG, DMD gene-therapy eligibility & ambulatory expansion, SOD1 genetic testing.",
    providers:"Medscape Neurology, MDA, ACHL, PeerView, Neuromuscular Disease Foundation.",
    receptivity:"OPEN — argenx, UCB, Sarepta, Ionis all actively awarding.",
    priorities:"12-18 mo: gMG sequencing education across FcRn + complement + costimulator; DMD gene-therapy referral for community neurology; SOD1 genetic testing in ALS diagnostics.",
    gaps:"No independent gMG sequencing curriculum despite 5 approved mechanisms. DMD gene-therapy community-neurology readiness is thin. SOD1 genetic testing rates <30% at community centres."
  }
};

const NEURO_SUPSTRAT = {
  "Novartis":{
    priority:"Multiple sclerosis (Kesimpta subQ), remibrutinib BTK Ph3, migraine (Aimovig with Amgen).",
    format:"Broad grant portal; strong on symposia, longitudinal series, community-neurology outreach.",
    milestone:"Remibrutinib REMODEL Ph3 in MS — filing target 2027; competes head-to-head with Sanofi tolebrutinib.",
    ask:"A BTK Class Literacy programme with joint neurology + rheumatology faculty positioned to update as each BTK reads out. Sequencing-lens differentiation."
  },
  "Roche / Genentech":{
    priority:"Ocrevus / Ocrevus Zunovo subQ (MS), PMN (obinutuzumab), Alzheimer diagnostic pipeline.",
    format:"Prefers biomarker-driven education and implementation science; strong iMED support for community neurology.",
    milestone:"Ocrevus Zunovo subQ approved 2024; PMN priority review Nov 2026; gantenerumab wound down.",
    ask:"A PIRA (progression-independent-relapse-activity) framework curriculum for community neurology — reframes MS from relapse to disability-accumulation prevention."
  },
  "Sanofi":{
    priority:"MS BTK (tolebrutinib) Ph3, rare neuro (Genzyme franchise), MASH-adjacent metabolic.",
    format:"Portal-driven grants; historically strong on rare-disease diagnostic-odyssey education.",
    milestone:"Tolebrutinib GEMINI/HERCULES positive; nrSPMS filing Nov 2026 — first-in-class BTK in progressive MS.",
    ask:"A Diagnostic-Odyssey Neurology Curriculum for community primary care (Fabry-CIDP-hATTR recognition) — pattern recognition for rare neuro."
  },
  "AbbVie":{
    priority:"Advanced Parkinson's (Vyalev subQ foslevodopa), Migraine (Ubrelvy, Qulipta), acquired Cerevel psychiatry (emraclidine).",
    format:"IME Provider Network — invited only; extremely narrow route.",
    milestone:"Vyalev launched 2024; emraclidine Ph3 in schizophrenia adds a muscarinic anchor competing with Cobenfy.",
    ask:"Provider Network membership must be verified first; if in, an Advanced-PD Referral Pathway curriculum (community neuro → device-therapy centre) fills their ambulatory-referral gap."
  },
  "UCB":{
    priority:"Epilepsy (Vimpat, Briviact partnerships), gMG (Zilbrysq zilucoplan, Rystiggo rozanolixizumab), bimekizumab immunology.",
    format:"Active grant portal + direct email route; broad neuroscience footprint.",
    milestone:"Zilbrysq + Rystiggo both launched in gMG 2024 — three UCB mechanisms compete with argenx Vyvgart.",
    ask:"A gMG Complement-vs-FcRn Sequencing Curriculum, mechanism-first not brand-first — UCB benefits from any comparative-effectiveness activity."
  },
  "Jazz Pharmaceuticals":{
    priority:"Epilepsy (Epidiolex — Dravet, LGS, TSC), narcolepsy (Xywav, Xyrem), idiopathic hypersomnia.",
    format:"Portal + email; strong sleep-medicine education.",
    milestone:"Xywav growth in IH continues; potential competitive pressure from Takeda TAK-861 orexin in narcolepsy.",
    ask:"A Sleep-Wake Beyond Narcolepsy T1 curriculum (N2, IH, circadian) — protects Xywav's IH franchise ahead of orexin agonist competition."
  },
  "Neurocrine":{
    priority:"Tardive dyskinesia (Ingrezza), HD chorea, schizophrenia muscarinic Ph3 (NBI-1117568), CAH.",
    format:"Active portal; direct medical affairs email.",
    milestone:"NBI-1117568 M4 muscarinic Ph3 — potential 2027 approval as second muscarinic after BMS Cobenfy.",
    ask:"A Movement-Disorder Community-Neurology Recognition curriculum (TD + HD chorea + cervical dystonia) — expands Ingrezza addressable population and pre-positions for muscarinic launch."
  },
  "Alkermes":{
    priority:"Schizophrenia (Lybalvi olanzapine-samidorphan), bipolar, narcolepsy (ALKS-2680 orexin 2).",
    format:"Portal only, narrower funding envelope than big pharma.",
    milestone:"ALKS-2680 Ph2 — competing orexin mechanism to Takeda TAK-861.",
    ask:"A Metabolic-Sparing Antipsychotic Selection curriculum leveraging Lybalvi's weight-neutral positioning — sits alongside Cobenfy launch education."
  },
  "Sage / Biogen":{
    priority:"Postpartum depression (Zurzuvae zuranolone); MDD terminated 2023.",
    format:"Portal only; PPD launch education is priority.",
    milestone:"Zurzuvae PPD launched Aug 2023; ob/gyn-psychiatry co-management pathway is the growth constraint.",
    ask:"An OB/Gyn-Psychiatry Co-Management PPD curriculum with primary care + OB + psychiatry joint faculty — solves Sage's referral bottleneck."
  },
  "Alnylam":{
    priority:"hATTR polyneuropathy (Onpattro, Amvuttra), moving into cardiomyopathy (HELIOS-B).",
    format:"Active portal + email; strong on RNAi/mechanism education.",
    milestone:"Amvuttra ATTR-CM label expansion 2025; competing with Pfizer tafamidis + Ionis eplontersen.",
    ask:"A Genetic Testing in ATTR curriculum — TTR variant recognition across cardiology + neurology + hematology, aligned to standard-of-care screening."
  },
  "Sarepta Therapeutics":{
    priority:"Elevidys (delandistrogene) DMD gene therapy — expanded to ambulatory + non-ambulatory 2024; PMOs (Exondys, Vyondys, Amondys) maintenance defense.",
    format:"Supports referral-pathway education, community-neurology awareness activities, gene-therapy centre readiness training.",
    milestone:"Elevidys ambulatory expansion 2024 dramatically widened eligible population; referral bottleneck from community neurology to gene-therapy centres now the growth constraint.",
    ask:"A DMD Referral & Gene-Therapy Readiness Pathway curriculum with community neurology + gene-therapy centre + PT/OT joint faculty."
  },
  "Ionis":{
    priority:"Qalsody (tofersen) SOD1-ALS expansion, Spinraza SMA defense, Wainua (eplontersen) hATTR, Angelman ASO (ION582), Huntington's (tominersen restart).",
    format:"Strong on genetic-testing-workflow education, orphan-neurology awareness, ASO mechanism primers.",
    milestone:"Qalsody accelerated approval 2023 — SOD1 genetic testing rates still <30% at community centres; ION582 HALOS Ph1/2 for Angelman ongoing.",
    ask:"A Neuromuscular & Neurological Genetic-Testing Workflow curriculum — SOD1 in ALS, SMA screening, hATTR panels."
  },
  "Alexion / AstraZeneca":{
    priority:"gMG (Ultomiris ravulizumab), NMOSD (Soliris), aHUS, PNH.",
    format:"Portal-driven; strong complement-pathway educational infrastructure.",
    milestone:"Ultomiris gMG Q4-weekly convenience vs argenx Vyvgart Hytrulo subQ shifts the switch conversation.",
    ask:"A Complement Pathway Foundation curriculum for community neurology — sits under gMG, NMOSD, aHUS as a shared literacy layer."
  },
  "Takeda":{
    priority:"Narcolepsy (TAK-861 oveporexton Ph3), CIDP (Hyqvia IVIg), rare-metabolic neuro.",
    format:"Structured currently-accepting-topics list, updated periodically.",
    milestone:"TAK-861 Ph3 — first-in-class orexin agonism for narcolepsy type 1; potential 2027 approval.",
    ask:"An Orexin Class Pre-Launch curriculum — mechanism-first, sponsor-neutral. Prepares prescribers for the shift from wake-promoting symptom control to orexin-receptor agonism that Takeda leads."
  },
  "Bayer":{
    priority:"Secondary stroke prevention (asundexian Factor XI), general CV franchise.",
    format:"Active grants portal + rolling scientific-exchange route.",
    milestone:"Asundexian OCEANIC-STROKE positive Nov 2025; FDA action ~Q4 2026 → stroke-prevention launch education window.",
    ask:"A Factor XI Class Readiness curriculum for cardiology + neurology (stroke specialists) — reframes anticoagulation from DOAC to hemostasis-sparing paradigm."
  },
  "Acadia Pharmaceuticals":{
    priority:"Rett syndrome (Daybue trofinetide), Parkinson's psychosis (Nuplazid pimavanserin).",
    format:"Portal + email; supports rare-neuro caregiver + community-provider education.",
    milestone:"Daybue peak-sales trajectory softer than expected; Neurogene + Taysha Rett gene therapies approaching pivotal readouts.",
    ask:"A Rett Multidisciplinary Care Pathway curriculum — neurology + genetics + PT/OT/speech joint faculty. Positions Daybue amid gene-therapy anticipation."
  },
  "PTC Therapeutics":{
    priority:"AADC deficiency (Upstaza), Duchenne (Emflaza), rare CNS metabolic.",
    format:"Portal + email; strong rare-disease educational partnerships.",
    milestone:"Upstaza launched EU; US filing 2025-26; DMD franchise pressured by Elevidys.",
    ask:"An AADC Deficiency Recognition curriculum — neurodevelopmental delay red flags for pediatric neurology + genetics."
  },
  "Ultragenyx":{
    priority:"Rare metabolic (Mepsevii, Crysvita, DTX401), Angelman gene therapy pipeline.",
    format:"Active open-unsolicited grant route across MPS VII, LC-FAOD, GSD1a, XLH/TIO — confirmed 2025-26.",
    milestone:"Multiple pipeline reads across rare metabolic + neuro-metabolic 2026-27.",
    ask:"A Rare Metabolic Recognition Curriculum for primary care + community pediatrics — recognition-and-referral, not therapeutics."
  },
  "Eisai":{
    priority:"Alzheimer's disease — Leqembi (lecanemab) launch defense + subQ workflow adoption + blood-biomarker diagnostic pipeline.",
    format:"Prefers CME-accredited activities with rigorous outcomes measurement; strong bias toward radiologist-inclusive faculty for ARIA education.",
    milestone:"Subcutaneous Leqembi launched Aug 2025 — the first anti-amyloid convenience play. Q3 2026 reports show community-neurology adoption still lagging academic.",
    ask:"An ARIA Monitoring & Community-Neurology Confidence curriculum with joint radiologist + neurologist faculty."
  },
  "Biogen":{
    priority:"Alzheimer's (Leqembi co-marketing), SMA (Spinraza defense against Evrysdi), SOD1-ALS (Qalsody with Ionis), Angelman ASO (ION582 pipeline).",
    format:"Broad — supports symposia, longitudinal series, decision-support tools; strong on rare-disease educational infrastructure.",
    milestone:"Skyclarys (Friedreich's ataxia) via Reata acquisition adds a rare-neuro anchor; Angelman ASO Ph1/2 HALOS ongoing.",
    ask:"A rare-neuro care-transition curriculum (peds → adult) that maps to Skyclarys + Spinraza + Angelman."
  },
  "Bristol Myers Squibb":{
    priority:"Cobenfy (xanomeline-trospium) launch in schizophrenia — first non-D2 antipsychotic in 30 years; expanding into Alzheimer's agitation.",
    format:"Prefers implementation-science studies + longitudinal case series; interested in community-psychiatry adoption pathways.",
    milestone:"Cobenfy Ph3 launched; competitors (Neurocrine, AbbVie/Cerevel) 12-18 months behind in M1/M4 muscarinic Ph3.",
    ask:"A Muscarinic Antipsychotic Community-Psychiatry Titration Toolkit — real-world dosing, GI tolerability, when-to-switch."
  },
  "argenx":{
    priority:"Vyvgart franchise expansion — gMG global, CIDP US, MMN + other autoimmune indications in Ph3.",
    format:"Strong CME funder; posted two RFPs in July 2026 (CIDP + MMN competence gaps); rolling Neuromuscular Fellowship program.",
    milestone:"Vyvgart Hytrulo subQ approved; CIDP US launch active; competitive pressure from UCB (Zilbrysq/Rystiggo) and Alexion (Ultomiris) in gMG sequencing.",
    ask:"A FcRn-vs-Complement Sequencing Curriculum with neurology + rheumatology + pharmacy joint faculty."
  },
  "Eisai_LEGACY":{
    priority:"NOT USED — original Eisai kept above for stability.", format:"", milestone:"", ask:""
  }
};
delete NEURO_SUPSTRAT["Eisai_LEGACY"];

const NEURO_EMPHASIS = [
  {sup:"Eisai", prev:"Amyloid PET workflow + patient selection (2024)", now:"ARIA monitoring + subQ workflow + blood-biomarker diagnostic pathway (2025-26)", drift:"Convenience + community adoption is the new priority — not initial patient selection."},
  {sup:"Lilly", prev:"Anti-amyloid mechanism of action (donanemab pre-launch)", now:"Limited-duration dosing paradigm + stop rules + blood biomarker follow-up (2026)", drift:"Kisunla's 12-18-month treatment concept has moved teaching from 'start' to 'when to stop.'"},
  {sup:"BMS", prev:"Deucravacitinib TYK2 in derm/rheum (2024)", now:"Cobenfy muscarinic launch in schizophrenia + Alzheimer's agitation expansion (2025-26)", drift:"Neuroscience priorities have surged — TYK2 immunology continues but Cobenfy leads investment."},
  {sup:"argenx", prev:"FcRn mechanism primer + gMG (2024)", now:"CIDP launch + MMN Ph3 + subQ Hytrulo conversion (2025-26)", drift:"Priority shifted from mechanism education to indication-expansion education across neuromuscular."},
  {sup:"Sarepta", prev:"PMO exon-skipping mechanism (2023)", now:"Elevidys gene-therapy referral pathway + ambulatory expansion + LGMD gene therapy (2025-26)", drift:"Whole portfolio moved from oligonucleotide mechanism to gene-therapy referral infrastructure."},
  {sup:"Roche / Genentech", prev:"Ocrevus initiation + patient selection (2024)", now:"Ocrevus Zunovo subQ conversion + PIRA framework + primary membranous nephropathy launch (2025-26)", drift:"MS priority shifted to subQ delivery + PIRA reframing; new priority around obinutuzumab in PMN opens nephrology adjacency."}
];

const NEURO_WATCH = [
  {co:"Denali Therapeutics", asset:"BIIB122 (LRRK2 inhibitor, with Biogen)", timing:"2027 filing target", note:"First genetically-targeted disease-modifying PD therapy — grants office would stand up around approval."},
  {co:"Neurogene", asset:"NGN-401 (MECP2 gene therapy for Rett)", timing:"2027 pivotal readout", note:"First-ever Rett gene therapy candidate; would open neurogenetics IME budget."},
  {co:"Taysha Gene Therapies", asset:"TSHA-102 (MECP2 gene therapy for Rett)", timing:"2026 interim; 2027 pivotal", note:"Second Rett gene therapy — sequencing conversation opens the moment second sponsor lands."},
  {co:"Praxis Precision Medicines", asset:"relutrigine (Na channel) in SCN2A/SCN8A DEEs", timing:"Ph2 EMBOLD ongoing", note:"Orphan neuro launch runway — first commercial product would trigger IME budget."},
  {co:"Longboard / Lundbeck", asset:"bexicaserin (5-HT2C)", timing:"2027 filing (DEEs)", note:"Acquired by Lundbeck 2024; Dravet/LGS launch education window opens 2026-27."},
  {co:"Passage Bio", asset:"GM1 gangliosidosis + FTD-GRN gene therapies", timing:"Ph1/2 ongoing", note:"Ultra-rare CNS gene therapy — first commercial approval would stand up their IME programme."},
  {co:"Immunovant", asset:"batoclimab (FcRn — gMG, MG-Adult, thyroid eye disease)", timing:"Ph3 readouts 2026", note:"Third FcRn to argenx/UCB competition in gMG; TED overlap adds ophthalmology dimension."},
  {co:"Cabaletta Bio", asset:"resecabtagene (CD19 CAR-T in gMG, myositis, lupus)", timing:"Ph1/2 registrational", note:"Autoimmune CAR-T in neuromuscular — completely new mechanism paradigm."}
];

const NEURO_DIRECTORY = [
  {co:"Eisai", ta:"Alzheimer's", contact:"medicalgrants@eisai.com", route:"Portal", rfp:"Open"},
  {co:"Biogen", ta:"Alzheimer's · SMA · SOD1-ALS · Rare neuro", contact:"Portal only", route:"Portal", rfp:"Open"},
  {co:"Lilly", ta:"Alzheimer's · Migraine · Obesity-adjacent", contact:"grantoffice@lilly.com", route:"Portal + registry", rfp:"Open"},
  {co:"Roche / Genentech", ta:"MS · Alzheimer's-diagnostic", contact:"Portal only", route:"Portal", rfp:"Open"},
  {co:"AbbVie", ta:"Parkinson's (Vyalev) · Migraine (Qulipta/Ubrelvy)", contact:"IME Provider Network invite only", route:"Network-only", rfp:"Limited"},
  {co:"Novartis", ta:"MS (Kesimpta, remibrutinib)", contact:"Portal only", route:"Portal", rfp:"Open"},
  {co:"Sanofi", ta:"MS (tolebrutinib)", contact:"Portal only", route:"Portal", rfp:"Open"},
  {co:"TG Therapeutics", ta:"MS (Briumvi)", contact:"medical.grants@tgtxinc.com", route:"Direct email", rfp:"Signal"},
  {co:"UCB", ta:"Epilepsy · gMG", contact:"IME.Support@ucb.com", route:"Portal + email", rfp:"Open"},
  {co:"Jazz Pharmaceuticals", ta:"Epilepsy · Narcolepsy · IH", contact:"medicaleducation@jazzpharma.com", route:"Portal", rfp:"Open"},
  {co:"SK Life Science", ta:"Focal epilepsy (Xcopri)", contact:"Portal only", route:"Portal", rfp:"Signal"},
  {co:"Bristol Myers Squibb", ta:"Schizophrenia (Cobenfy) · Alzheimer's agitation", contact:"IndependentGrants@bms.com", route:"Portal + email", rfp:"Open"},
  {co:"Otsuka / Lundbeck", ta:"MDD (Rexulti) · Schizophrenia · Alzheimer's agitation", contact:"Portal only", route:"Portal", rfp:"Open"},
  {co:"Neurocrine", ta:"Tardive dyskinesia · HD chorea · Schizophrenia (Ph3)", contact:"medicalaffairs@neurocrine.com", route:"Portal", rfp:"Open"},
  {co:"Alkermes", ta:"Schizophrenia (Lybalvi) · Narcolepsy (ALKS-2680)", contact:"Portal only", route:"Portal", rfp:"Signal"},
  {co:"Sage / Biogen", ta:"PPD (Zurzuvae)", contact:"Portal only", route:"Portal", rfp:"Signal"},
  {co:"argenx", ta:"gMG · CIDP · MMN", contact:"grants@argenx.com", route:"Portal + email", rfp:"Open"},
  {co:"Alnylam", ta:"hATTR polyneuropathy", contact:"medicaleducation@alnylam.com", route:"Portal + email", rfp:"Open"},
  {co:"Sarepta", ta:"DMD (Elevidys + PMOs) · LGMD", contact:"medicaleducation@sarepta.com", route:"Portal + email", rfp:"Open"},
  {co:"Ionis", ta:"SOD1-ALS · SMA · Angelman · Huntington's · hATTR", contact:"Portal only", route:"Portal", rfp:"Open"},
  {co:"Takeda", ta:"Narcolepsy (TAK-861)", contact:"IndependentMedicalEducation.TakedaSupport@takeda.com", route:"Portal + email", rfp:"Open"},
  {co:"Bayer", ta:"Stroke prevention (asundexian)", contact:"Portal only", route:"Portal", rfp:"Open"},
  {co:"Acadia", ta:"Rett (Daybue)", contact:"medicalaffairs@acadia-pharm.com", route:"Portal + email", rfp:"Open"},
  {co:"PTC Therapeutics", ta:"AADC · DMD · Rare CNS", contact:"medicalaffairs@ptcbio.com", route:"Portal + email", rfp:"Open"},
  {co:"Ultragenyx", ta:"Rare metabolic + Angelman gene therapy", contact:"medicalaffairs@ultragenyx.com", route:"Portal + email", rfp:"Open"}
];

var SUPPORTER_INTELLIGENCE_PROMPT = "You are generating a supporter-specific strategic intelligence brief for a Medical Affairs / educational strategy leader in pharma. This is not a generic summary. This is not a broad landscape overview. This is not a list of everything available.\n\nYour job is to produce sharp, decision-useful output that would be credible to a Medical Affairs Director who is asking: What actually matters here? What changed? Why should I care now? Where can we move the needle? What is differentiated and actionable?\n\nPRIMARY STANDARD: The output must feel strategic, pharma-ready, and capable of moving the needle. It must show clear thinking, practical relevance, and business/medical significance. Do not produce generic consulting language, empty summaries, or padded observations.\n\nAUDIENCE: Write for a Medical Affairs Director / senior strategist. They care about scientific and educational relevance, supporter priorities, competitive differentiation, timing and readiness, strategic opportunity, executional usefulness, and where the team can act with credibility.\n\nTASK: Create a supporter-specific brief for [SUPPORTER NAME] using the available information (prior proposals, awarded/declined grants, outcomes reports, supporter website/stated priorities, investor/financial reports, pipeline/clinical trial activity, FDA catalysts, conference activity, educational grants/portals, competitor activity, KOL/faculty/stakeholder information, internal strategy notes, field/insight team intelligence).\n\nINTERNAL DOCUMENTS: Treat attached internal materials (Word, PDF, PowerPoint, Excel, strategy documents, outcomes reports, proposal history, insight team summaries, field intelligence, RWE data) as high-value evidence. When available: prioritize them over generic external summaries, extract only information that materially changes strategic interpretation, identify patterns not just isolated facts, use them to sharpen supporter-specific relevance, and use them to strengthen RWE-informed recommendations where appropriate. Synthesize across documents. Surface only points that materially affect strategy. If internal documents contradict external signals, flag the tension clearly. If internal documents provide stronger evidence than external sources, anchor the recommendation in the internal evidence. If attachments are thin, outdated, or incomplete, say that directly.\n\nRWE EXPECTATION: If the attached internal data contains outcomes, field insights, performance trends, evidence-generation themes, educational impact, or real-world practice patterns, use it to identify where RWE can strengthen the strategic story, where RWE can differentiate the recommendation, and where internal evidence suggests credibility, traction, or unmet need. Do not force RWE into the output if the attachments do not support it.\n\nCORE QUESTIONS: (1) What is happening that actually matters? (2) Why does it matter now? (3) Where is there a real opportunity, vulnerability, gap, or opening? (4) What should we do next that could realistically move the needle?\n\nOUTPUT RULES: Use exactly 3 bullet points per section unless the template says otherwise. Each bullet must cover a distinct point with no overlap. Each bullet must earn its place. Lead with the highest-value insight first. Show the needle moved: move from broad context to specific strategic meaning. Avoid speculation. Avoid redundancy, repetition, fluff, jargon, overstatement, and vague phrasing. Avoid generic phrases like \"important opportunity\", \"valuable insight\", \"key stakeholder engagement\", \"dynamic landscape\", \"innovative approach\" unless you make them concrete. Do not restate the same idea across multiple bullets. Do not list information without interpreting why it matters. Do not make recommendations disconnected from the evidence. Be concise, specific, and enhancement-focused. If two points are similar, combine or choose the stronger one. If a bullet could apply to any pharma company, it is too generic and must be rewritten.\n\nTHINKING STANDARD: For every bullet, ask: Is this specific to the supporter? Would a Medical Affairs Director find this worth reading? Does this clarify a decision, risk, timing issue, or strategic opening? Does this say something distinct from the bullet before it? Does this help move from information to action?\n\nREQUIRED OUTPUT FORMAT:\n\n## 1. What Actually Matters Now\nExactly 3 bullets. Each must identify one high-value signal, explain why it matters now, and connect it to medical/scientific/educational strategy relevance.\n\n## 2. Where the Needle Can Move\nExactly 3 bullets. Each must identify one concrete area where there is a strategic gap, competitive opening, under-addressed need, timing advantage, or clearer way to differentiate. Actionable strategic openings, not general observations.\n\n## 3. What We Know From Our History\nExactly 3 bullets. Use available internal history to identify what has resonated, what has not worked, what patterns matter, what this suggests about future positioning. If internal history is limited, say so directly and use only supported observations.\n\n## 4. What a Medical Affairs Director Should Do Next\nExactly 3 bullets. Each must start with a strong action verb, recommend a specific next move, explain why that move is justified now, and tie directly to the signals and gaps above. Actions must be realistic, credible, and strategically meaningful.\n\n## 5. Missing Information That Matters\nExactly 3 bullets. Only include missing information that would materially improve strategy quality or decision-making.\n\n## Executive Takeaway\nExactly 3 bullets. The 3 most important, non-overlapping strategic takeaways from the full brief.\n\nFINAL QUALITY CHECK: Do not finalize the answer unless each section has exactly 3 bullets, no two bullets overlap, every bullet is supporter-specific, every bullet has strategic meaning, the language sounds credible to a Medical Affairs Director, the output is clear/concise/not generic, and internal attachments (if provided) are visibly reflected in the reasoning.";
const SPECIALTIES = [
  {key:"cardiovascular", label:"Cardiovascular", color:"var(--cardio)",
   cond:'("atrial fibrillation" OR "cardiovascular stroke" OR "ischemic stroke" OR anticoagulation OR "venous thromboembolism" OR "pulmonary embolism" OR "deep vein thrombosis" OR "factor XI") NOT (retinal OR macular OR "vein occlusion" OR uveitis OR ophthalmic)',
   news:'"atrial fibrillation" OR "stroke prevention" OR anticoagulant OR "factor XI"'},
  {key:"nephrology", label:"Nephrology", color:"var(--nephro)",
   cond:'"IgA nephropathy" OR "lupus nephritis" OR "C3 glomerulopathy" OR "membranous nephropathy" OR "focal segmental glomerulosclerosis" OR "chronic kidney disease" OR "diabetic kidney disease" OR "glomerulonephritis" OR "nephrotic syndrome" OR "Alport syndrome" OR "polycystic kidney"',
   news:'"IgA nephropathy" OR "lupus nephritis" OR nephrology OR "chronic kidney disease" OR glomerular'},
  {key:"endocrinology", label:"Endocrinology", color:"var(--endo)",
   cond:'diabetes OR obesity OR "weight management" OR thyroid OR endocrine OR osteoporosis OR MASH',
   news:'obesity OR diabetes OR GLP-1 OR endocrinology'},
  {key:"immunology", label:"Immunology", color:"var(--immuno)",
   cond:'lupus OR "rheumatoid arthritis" OR "inflammatory bowel disease" OR "ulcerative colitis" OR "Crohn" OR "Sjogren" OR "myasthenia gravis" OR immunology',
   news:'lupus OR rheumatology OR "inflammatory bowel disease" OR autoimmune'},
  {key:"raredisease", label:"Rare Disease", color:"var(--rare)",
   cond:'"amyloidosis" OR "hereditary angioedema" OR "paroxysmal nocturnal hemoglobinuria" OR "Duchenne" OR "spinal muscular atrophy" OR "sickle cell" OR "Gaucher" OR "Fabry" OR "Pompe disease" OR "myasthenia gravis" OR "CIDP" OR "IgA nephropathy" OR "C3 glomerulopathy" OR "atypical hemolytic uremic" OR "alpha-1 antitrypsin" OR "Wilson disease" OR "lysosomal"',
   news:'"rare disease" OR amyloidosis OR "hereditary angioedema" OR PNH OR Duchenne OR "gene therapy"'},
  {key:"ophthalmology", label:"Ophthalmology", color:"var(--oph)",
   cond:'"macular degeneration" OR "diabetic retinopathy" OR "diabetic macular edema" OR "geographic atrophy" OR "retinal vein occlusion" OR glaucoma OR "dry eye" OR uveitis OR "thyroid eye disease" OR "inherited retinal" OR keratitis OR myopia OR ophthalmology',
   news:'"macular degeneration" OR "geographic atrophy" OR "thyroid eye disease" OR "dry eye" OR retina OR ophthalmology'},
  // ==== Neuroscience sub-TAs — same shape as MULTI so the render pipeline treats them identically. ====
  {key:"n_alz", label:"Alzheimer's / Dementia", color:"#8a5cc4", bu:"neuro",
   cond:'"Alzheimer" OR "amyloid" OR "lecanemab" OR "donanemab" OR "aducanumab" OR "dementia" OR "cognitive impairment"',
   news:'Alzheimer OR Leqembi OR Kisunla OR dementia OR "anti-amyloid"'},
  {key:"n_pd", label:"Parkinson's / Movement", color:"#d84a3f", bu:"neuro",
   cond:'"Parkinson" OR "LRRK2" OR "alpha-synuclein" OR "GBA" OR "movement disorder" OR "levodopa" OR "dystonia" OR "essential tremor"',
   news:'Parkinson OR "movement disorder" OR LRRK2 OR Vyalev'},
  {key:"n_ms", label:"Multiple Sclerosis", color:"#2f8d67", bu:"neuro",
   cond:'"multiple sclerosis" OR "MS" OR "ocrelizumab" OR "tolebrutinib" OR "remibrutinib" OR "PIRA" OR "ublituximab"',
   news:'"multiple sclerosis" OR MS OR Ocrevus OR BTK OR Kesimpta'},
  {key:"n_epi", label:"Epilepsy", color:"#d97706", bu:"neuro",
   cond:'"epilepsy" OR "seizure" OR "Dravet" OR "Lennox-Gastaut" OR "focal seizures" OR "cenobamate" OR "cannabidiol"',
   news:'epilepsy OR Dravet OR "focal seizures" OR Xcopri OR Epidiolex'},
  {key:"n_mig", label:"Migraine / Headache", color:"#2f7fb0", bu:"neuro",
   cond:'"migraine" OR "headache" OR "CGRP" OR "atogepant" OR "ubrogepant" OR "rimegepant" OR "eptinezumab"',
   news:'migraine OR headache OR CGRP OR Qulipta OR Nurtec'},
  {key:"n_psy", label:"Psychiatry (MDD · Schizo · Bipolar)", color:"#5656d4", bu:"neuro",
   cond:'"schizophrenia" OR "major depressive disorder" OR "bipolar" OR "xanomeline" OR "muscarinic" OR "antipsychotic" OR "postpartum depression"',
   news:'schizophrenia OR Cobenfy OR muscarinic OR MDD OR antipsychotic'},
  {key:"n_nmd", label:"Neuromuscular (ALS · SMA · DMD · gMG)", color:"#1f9d8f", bu:"neuro",
   cond:'"myasthenia gravis" OR "amyotrophic lateral sclerosis" OR "ALS" OR "SOD1" OR "spinal muscular atrophy" OR "Duchenne muscular dystrophy" OR "CIDP" OR "efgartigimod"',
   news:'"myasthenia gravis" OR ALS OR SMA OR Duchenne OR CIDP OR Vyvgart OR Elevidys'},
  {key:"n_strk", label:"Stroke", color:"#bd7a2e", bu:"neuro",
   cond:'"stroke" OR "asundexian" OR "factor XI" OR "thrombectomy" OR "cerebral infarction"',
   news:'stroke OR "factor XI" OR asundexian OR thrombectomy'},
  {key:"n_slp", label:"Sleep / Narcolepsy", color:"#a06a12", bu:"neuro",
   cond:'"narcolepsy" OR "idiopathic hypersomnia" OR "orexin" OR "TAK-861" OR "sodium oxybate"',
   news:'narcolepsy OR orexin OR Xywav OR "sleep disorder"'},
  {key:"n_rare", label:"Rare Neuro (Rett · Dravet · Angelman)", color:"#4a4ac0", bu:"neuro",
   cond:'"Rett syndrome" OR "Angelman syndrome" OR "trofinetide" OR "MECP2" OR "AADC deficiency" OR "GM1 gangliosidosis"',
   news:'Rett OR Angelman OR Daybue OR "rare neuro"'}
];

const TRIALSNAP = {
 "cardiovascular": [
  {
   "nct": "NCT05714085",
   "title": "Efficacy, Safety, and Pharmacokinetics of Vericiguat in Pediatric Participants With Heart Failure Due to Left Ventricular Systolic Dysfunction (MK-1242-036)",
   "status": "RECRUITING",
   "phase": "PHASE2, PHASE3",
   "sponsor": "Merck Sharp & Dohme LLC",
   "drugs": [
    "Vericiguat tablet",
    "Vericiguat suspension"
   ],
   "start": "2023-05-31",
   "pcd": "2032-04-15",
   "updated": "2026-08-10",
   "enroll": 342,
   "summary": "This study aims to compare the efficacy of vericiguat versus placebo on change in n-terminal pro-brain natriuretic peptide (NTproBNP) from baseline to Week 16 of the Base Period. The primary hypothesis is that vericiguat is superior to placebo in reducing NT-proBNP at Week 16 of the Base Period.",
   "cond": "Heart Failure, Left Ventricular Systolic Dysfunction"
  },
  {
   "nct": "NCT06935370",
   "title": "A Study to Test Whether Vicadrostat (BI 690517) in Combination With Empagliflozin Helps People With Heart Failure and a Weak Pumping Function of the Left Side o…",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Boehringer Ingelheim",
   "drugs": [
    "vicadrostat",
    "empagliflozin"
   ],
   "start": "2025-05-20",
   "pcd": "2029-02-04",
   "updated": "2026-08-06",
   "enroll": 4200,
   "summary": "This study is open to adults with chronic heart failure (HF) who have a reduced left ventricular ejection fraction (LVEF) of less than 40%. People can join the study if they have been diagnosed with chronic HF at least 3 months before they start on the study. The purpose of this study is to find out whether a medicine called vicadrostat, in combination with another medicine called empagliflozin, h…",
   "cond": "Heart Failure"
  },
  {
   "nct": "NCT07750873",
   "title": "A Trial of CRD-4730 in HFrEF",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Cardurion Pharmaceuticals, Inc.",
   "drugs": [
    "CRD-4730"
   ],
   "start": "2026-07-15",
   "pcd": "2028-09",
   "updated": "2026-08-06",
   "enroll": 525,
   "summary": "CRD-4730 is a calcium/calmodulin-dependent protein kinase II (CaMKII) inhibitor. The CALIBRATE-HF trial is a Phase 2, global, multi-center, randomized, double-blind, parallel-group, placebo-controlled trial. The trial will evaluate the efficacy, safety, and tolerability of CRD-4730 in addition to guideline directed medical therapy in participants with heart failure with reduced ejection fraction (…",
   "cond": "Heart Failure With Reduced Ejection Fraction (HFrEF)"
  },
  {
   "nct": "NCT06949020",
   "title": "A Dose-finding Study of JMKX003142 in Treatment of Cardiac Edema",
   "status": "COMPLETED",
   "phase": "PHASE2",
   "sponsor": "Jemincare",
   "drugs": [
    "JMKX003142 Injection",
    "JMKX003142 Injection",
    "JMKX003142 Injection"
   ],
   "start": "2025-07-09",
   "pcd": "2026-03-14",
   "updated": "2026-08-06",
   "enroll": 160,
   "summary": "To Evaluate the Safety, Efficacy, and Pharmacokinetic/Pharmacodynamics Characteristics of JMKX003142 injection Administered Randomly,Double-blind, Placebo-controlled Study in Chinese Cardiacl Edema Patients.",
   "cond": "Cardiac Edema"
  },
  {
   "nct": "NCT06056297",
   "title": "A Study of Mavorixafor in Participants With Congenital and Acquired Primary Autoimmune and Idiopathic Chronic Neutropenic Disorders Who Are Experiencing Recurre…",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "X4 Pharmaceuticals",
   "drugs": [
    "Mavorixafor"
   ],
   "start": "2024-06-06",
   "pcd": "2027-09",
   "updated": "2026-08-06",
   "enroll": 176,
   "summary": "The purpose of this study is to demonstrate the efficacy and evaluate the safety and tolerability of mavorixafor in participants with congenital or acquired primary autoimmune and idiopathic chronic neutropenic disorders who are experiencing recurrent and/or serious infections as assessed by demonstrating its clinical benefit and increasing levels of circulating neutrophils.",
   "cond": "Neutropenia"
  },
  {
   "nct": "NCT06424288",
   "title": "A Study to Test Whether Vicadrostat in Combination With Empagliflozin Helps People With Heart Failure",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Boehringer Ingelheim",
   "drugs": [
    "vicadrostat",
    "empagliflozin"
   ],
   "start": "2024-06-17",
   "pcd": "2028-05-22",
   "updated": "2026-08-06",
   "enroll": 6000,
   "summary": "This study is open to adults aged 18 or above legal age with heart failure. People can join the study if they have heart failure symptoms and a left ventricular ejection fraction (LVEF) of 40% or more. The purpose of this study is to find out whether vicadrostat (BI 690517) in combination with empagliflozin helps people with heart failure. Participants are put into 2 groups by chance. Every partic…",
   "cond": "Heart Failure"
  },
  {
   "nct": "NCT07175428",
   "title": "Safety in Adult Participants With Atrial Fibrillation Who Are Treated With Anticoagulation",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Regeneron Pharmaceuticals",
   "drugs": [
    "REGN7508",
    "REGN9933",
    "Apixaban"
   ],
   "start": "2025-10-20",
   "pcd": "2027-02-09",
   "updated": "2026-08-05",
   "enroll": 1200,
   "summary": "This study is researching experimental drugs called REGN7508 and REGN9933. The study is focused on participants who have atrial fibrillation, which means that the heart beats too fast and unevenly. REGN7508 and REGN9933 are designed to help stop blood clots forming in patients with atrial fibrillation. The aim of the study is to see how well REGN7508 and REGN9933 work in patients that get medicine…",
   "cond": "Atrial Fibrillation (AF)"
  },
  {
   "nct": "NCT06979362",
   "title": "A Research Study Comparing Different Doses of CDR132L With Placebo on the Structure and Function of the Heart in People With Heart Failure With Preserved Ejecti…",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Novo Nordisk A/S",
   "drugs": [
    "CDR132L"
   ],
   "start": "2025-06-27",
   "pcd": "2027-11-16",
   "updated": "2026-08-05",
   "enroll": 200,
   "summary": "This study will look into how CDR132L (a potential new medicine) works on the structure and function of the heart in people living with heart failure. Participants will either get CDR132L or placebo (a medicine which has no effect on the body), which treatment the participants get is decided by chance. The study will last for about 60 weeks.",
   "cond": "Heart Failure"
  },
  {
   "nct": "NCT05702034",
   "title": "A Study of Milvexian in Participants After an Acute Ischemic Stroke or High-Risk Transient Ischemic Attack- LIBREXIA-STROKE",
   "status": "ACTIVE_NOT_RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Janssen Research & Development, LLC",
   "drugs": [
    "Milvexian"
   ],
   "start": "2023-02-15",
   "pcd": "2026-11-11",
   "updated": "2026-07-31",
   "enroll": 12532,
   "summary": "The purpose of this study is to evaluate whether milvexian compared to placebo reduce the risk of recurrent ischemic stroke.",
   "cond": "Ischemic Stroke; Ischemic Attack, Transient"
  },
  {
   "nct": "NCT06200207",
   "title": "A Research Study Looking Into How Ziltivekimab Works Compared to Placebo in Participants With Heart Failure and Inflammation",
   "status": "ACTIVE_NOT_RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Novo Nordisk A/S",
   "drugs": [
    "Ziltivekimab"
   ],
   "start": "2024-04-01",
   "pcd": "2026-10-01",
   "updated": "2026-07-31",
   "enroll": 680,
   "summary": "The study is being done to see if ziltivekimab can be used to treat participants living with heart failure and inflammation. Participants will either get ziltivekimab (active medicine) or placebo (inactive substance that looks like the study medicine but does not contain any medicine). The treatment participants get is decided by chance. Participant's chance of getting ziltivekimab or placebo is t…",
   "cond": "Heart Failure, Systemic Inflammation"
  },
  {
   "nct": "NCT07739888",
   "title": "Study to Evaluate the effIcacy and Safety of Abelacimab in High-risk Patients With Atrial Fibrillation Who Have Been Deemed Unsuitable for Oral Anticoagulation",
   "status": "NOT_YET_RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Novartis Pharmaceuticals",
   "drugs": [
    "Abelacimab"
   ],
   "start": "2027-12-30",
   "pcd": "2030-12-30",
   "updated": "2026-07-31",
   "enroll": 2500,
   "summary": "This OLE part is an optional, single arm, multicenter, open-label extension (OLE) added to the core part to assess the long-term safety, tolerability, the incidence of ischemic stroke or SE and bleeding events of abelacimab in eligible patients who completed the double-blinded core part of CMAA868A2302 (ANT-010/NCT05712200)",
   "cond": "Atrial Fibrillation (AF)"
  },
  {
   "nct": "NCT07217067",
   "title": "A Study to Investigate the Efficacy, Safety, Tolerability and Pharmacokinetics of PKN605 in Participants With Atrial Fibrillation",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Novartis Pharmaceuticals",
   "drugs": [
    "PKN605"
   ],
   "start": "2025-10-28",
   "pcd": "2027-09-09",
   "updated": "2026-07-31",
   "enroll": 165,
   "summary": "A randomized, placebo-controlled, participant-and investigator-blinded study to evaluate the efficacy in reducing atrial fibrillation burden as well as the safety, tolerability and pharmacokinetics of PKN605 in participants with atrial fibrillation",
   "cond": "Atrial Fibrillation"
  },
  {
   "nct": "NCT03394365",
   "title": "A Phase 3 Study of Tabelecleucel for Participants With Epstein-Barr Virus-Associated Post-Transplant Lymphoproliferative Disease After Failure With Rituximab or…",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Pierre Fabre Medicament",
   "drugs": [
    "tabelecleucel"
   ],
   "start": "2017-12-29",
   "pcd": "2030-05-31",
   "updated": "2026-07-31",
   "enroll": 115,
   "summary": "The purpose of this study is to determine the clinical benefit and characterize the safety profile of tabelecleucel for the treatment of Epstein-Barr virus-associated post-transplant lymphoproliferative disease (EBV+ PTLD) in the setting of (1) solid organ transplant (SOT) after failure of rituximab (SOT-R) and rituximab plus chemotherapy (SOT-R+C) or (2) allogeneic hematopoietic cell transplant (…",
   "cond": "Epstein-Barr Virus+ Associated Post-transplant Lymphoproliferative Disease (EBV+ PTLD), Solid Organ Transplant Complicat…"
  },
  {
   "nct": "NCT06677060",
   "title": "Phase III Study Investigating Heart Failure and Cardiovascular Death With Baxdrostat in Combination With Dapagliflozin",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "AstraZeneca",
   "drugs": [
    "Baxdrostat and dapagliflozin"
   ],
   "start": "2025-03-14",
   "pcd": "2029-12-17",
   "updated": "2026-07-31",
   "enroll": 11300,
   "summary": "Participants include men and women ≥ 40 years of age with T2DM, established CV disease, a history of HTN with an SBP of at least 130 mmHg at screening, who meet the predefined serum potassium level, and with at least one additional risk factor for HF. The study will include an optional pre-screening period to facilitate sites' identification of potentially eligible participants to enter the full s…",
   "cond": "Heart Failure"
  },
  {
   "nct": "NCT06122779",
   "title": "Study to Evaluate Safety, Tolerability and Drug Levels of BMS-986435/MYK-224 in Participants With Heart Failure With Preserved Ejection Fraction (HFpEF)",
   "status": "ACTIVE_NOT_RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Bristol-Myers Squibb",
   "drugs": [
    "BMS-986435"
   ],
   "start": "2023-11-07",
   "pcd": "2026-12-14",
   "updated": "2026-07-30",
   "enroll": 227,
   "summary": "The purpose of this study is to evaluate the safety, tolerability, and exposure-response (E-R) of BMS-986435/MYK-224 in participants with symptomatic Heart Failure with Preserved Ejection Fraction (HFpEF).",
   "cond": "Heart Failure"
  }
 ],
 "nephrology": [
  {
   "nct": "NCT07753993",
   "title": "A Study to Investigate Outcomes With Elecoglipron Compared With Placebo in Adult Participants With Chronic Kidney Disease.",
   "status": "NOT_YET_RECRUITING",
   "phase": "PHASE3",
   "sponsor": "AstraZeneca",
   "drugs": [
    "Elecoglipron"
   ],
   "start": "2026-08-28",
   "pcd": "2030-10-04",
   "updated": "2026-08-10",
   "enroll": 7000,
   "summary": "This is a Phase III, randomized, double-blind, parallel-group, placebo-controlled multicenter study to investigate outcomes with elecoglipron compared with placebo in participants with CKD with and without T2DM who are on background SGLT2i (dapagliflozin) as GDMT and other SoC treatments for CKD.",
   "cond": "Chronic Kidney Disease"
  },
  {
   "nct": "NCT07146906",
   "title": "A Study to Assess the Effects of Zigakibart on IgA Nephropathy.",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Novartis Pharmaceuticals",
   "drugs": [
    "zigakibart"
   ],
   "start": "2026-03-26",
   "pcd": "2030-07-12",
   "updated": "2026-08-10",
   "enroll": 32,
   "summary": "The purpose of the study is to assess the effect of zigakibart on IgA nephropathy (IgAN) disease progression.",
   "cond": "Immunoglobulin A Nephropathy (IgAN)"
  },
  {
   "nct": "NCT07271186",
   "title": "Study to Assess the Effects of Angiopoietin-like Protein 3 (ANGPTL3) Inhibition in Adult Participants With Diabetic Kidney Disease",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Regeneron Pharmaceuticals",
   "drugs": [
    "ALN-ANG3",
    "Evinacumab"
   ],
   "start": "2026-01-09",
   "pcd": "2027-09-24",
   "updated": "2026-08-10",
   "enroll": 270,
   "summary": "This study is researching experimental drugs called ALN-ANG3 and evinacumab (called \\\"study drugs\\\"). The study is focused on participants who have diabetic kidney disease. The aim of the study is to see how safe and effective the study drugs are. The study is looking at several other research questions, including: * What side effects may happen from taking the study drug * How much study drug is …",
   "cond": "Diabetic Kidney Disease (DKD)"
  },
  {
   "nct": "NCT06531824",
   "title": "EASi-KIDNEY™ (The Studies of Heart & Kidney Protection With BI 690517 in Combination With Empagliflozin)",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Boehringer Ingelheim",
   "drugs": [
    "BI 690517",
    "Empagliflozin"
   ],
   "start": "2024-08-30",
   "pcd": "2028-08-30",
   "updated": "2026-08-10",
   "enroll": 11000,
   "summary": "This study is open to adults with chronic kidney disease at risk of progression. People with and without type 2 diabetes can take part in this study. The study is open to people who take other medicines called angiotensin converting enzyme inhibitors (ACEi) or angiotensin receptor blockers (ARB). People who already take empagliflozin or any other sodium-glucose cotransporter-2 inhibitor (SGLT2i) c…",
   "cond": "Kidney Disease, Chronic"
  },
  {
   "nct": "NCT07107945",
   "title": "A Study to Find Out How EMPAgliflozin is Tolerated and if it Helps Children and Adolescents With Chronic KIDNEY Disease (EMPA-KIDNEY® Kids)",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Boehringer Ingelheim",
   "drugs": [
    "Empagliflozin"
   ],
   "start": "2025-12-09",
   "pcd": "2027-04-16",
   "updated": "2026-08-07",
   "enroll": 120,
   "summary": "This study is open to children aged 2 to 17 with chronic kidney disease (CKD). The purpose of this study is to find out if a medicine called empagliflozin helps children and adolescents with CKD. Other goals of the study are to find out how empagliflozin is tolerated and handled by the body in children and adolescents with CKD. Participants are put into 2 groups randomly, which means by chance. On…",
   "cond": "Chronic Kidney Disease"
  },
  {
   "nct": "NCT07606352",
   "title": "Safety and Efficacy of STL303 In Patients With Primary Immunoglobulin A (IgA) Nephropathy",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Sitala Bio LTD",
   "drugs": [
    "STL303",
    "STL303"
   ],
   "start": "2026-08-04",
   "pcd": "2027-07",
   "updated": "2026-08-07",
   "enroll": 15,
   "summary": "This is a multicenter, randomized, double-blind, placebo controlled Phase IIb study to explore the efficacy and safety of STL303 capsules in IgAN patients. About 15 patients dignosed with primary IgAN will be enrolled and randomized to three cohorts and take different dosage of STL303 or placebo capsules orally according to protocol.",
   "cond": "IgAN"
  },
  {
   "nct": "NCT06926660",
   "title": "A Study to Test Whether Vicadrostat in Combination With Empagliflozin Helps People With Chronic Kidney Disease",
   "status": "ACTIVE_NOT_RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Boehringer Ingelheim",
   "drugs": [
    "Vicadrostat",
    "Empagliflozin"
   ],
   "start": "2025-07-18",
   "pcd": "2026-08-20",
   "updated": "2026-08-07",
   "enroll": 492,
   "summary": "This study is open to adults with chronic kidney disease (CKD) that is at risk of getting worse. People who have taken a specific type of medication for kidney disease called SGLT2 inhibitor within 1 month before the study or have certain health conditions cannot take part in this study. The purpose of this study is to find out whether a medicine called vicadrostat, used in combination with anothe…",
   "cond": "Chronic Kidney Disease"
  },
  {
   "nct": "NCT07498335",
   "title": "Study to Assess the Efficacy, Pharmacokinetics, Safety and Tolerability of Atrasentan in Pediatric Patients With Primary IgAN",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Novartis Pharmaceuticals",
   "drugs": [
    "Drug: Atrasentan"
   ],
   "start": "2026-08-26",
   "pcd": "2031-09-15",
   "updated": "2026-08-07",
   "enroll": 28,
   "summary": "A Phase III, single-arm, multicenter pediatric clinical study evaluating atrasentan in children and adolescents aged 2 to \\\\<18 years with primary immunoglobulin A nephropathy (IgAN).",
   "cond": "Berger Disease, Bergers Disease, IgA Nephropathy, Immunoglobulin A Nephropathy"
  },
  {
   "nct": "NCT07241390",
   "title": "A Study of Orforglipron (LY3502970) on Cardiovascular Outcomes in Adults With Atherosclerotic Cardiovascular Disease and/or Chronic Kidney Disease (ATTAIN-Outco…",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Eli Lilly and Company",
   "drugs": [
    "Orforglipron"
   ],
   "start": "2025-12-01",
   "pcd": "2031-08",
   "updated": "2026-08-06",
   "enroll": 7140,
   "summary": "The purpose of this study is to measure cardiovascular outcomes with orforglipron compared with placebo in participants with atherosclerotic cardiovascular disease (ASCVD) and/or chronic kidney disease (CKD). Participation in the study will last about 5 years.",
   "cond": "Atherosclerosis Cardiovascular Disease, Chronic Kidney Disease"
  },
  {
   "nct": "NCT05039619",
   "title": "A Study to Evaluate the Efficacy, Safety, and Pharmacokinetics of Obinutuzumab in Adolescents With Active Class III or IV Lupus Nephritis and the Safety and PK …",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Hoffmann-La Roche",
   "drugs": [
    "Obinutuzumab",
    "Mycophenolate Mofetil",
    "Acetaminophen/paracetamol",
    "Diphenhydramine hydrochloride (HCl)"
   ],
   "start": "2022-05-12",
   "pcd": "2028-06-15",
   "updated": "2026-08-05",
   "enroll": 40,
   "summary": "This phase II, randomized, double-blind, placebo-controlled study is designed to evaluate the safety, efficacy and pharmacokinetics (PK) of obinutuzumab in adolescent participants (AP) aged 12 to less than 18 with biopsy-confirmed proliferative lupus nephritis (LN). It will also evaluate open label safety and PK of obinutuzumab in pediatric participants (PP), aged 5 to \\\\<12 with LN.",
   "cond": "Lupus Nephritis"
  },
  {
   "nct": "NCT06935357",
   "title": "A Study to Learn About the Effects of Felzartamab Infusions on Adults With Immunoglobulin A Nephropathy (IgAN)",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Biogen",
   "drugs": [
    "Felzartamab"
   ],
   "start": "2025-05-08",
   "pcd": "2027-05-31",
   "updated": "2026-08-05",
   "enroll": 454,
   "summary": "In this study, researchers will learn more about the use of felzartamab in participants with immunoglobulin A nephropathy (IgAN). IgAN is a kidney disease caused by the buildup of an antibody called IgA in the kidneys over time. In people with IgAN, abnormal IgA and other antibodies form clusters that build up in the small filters of the kidneys, which leads to inflammation and damage. Felzartamab…",
   "cond": "Immunoglobulin A Nephropathy (IgAN)"
  },
  {
   "nct": "NCT07614477",
   "title": "Evaluate the Efficacy, Safety, Pharmacokinetics, and Pharmacodynamics of EVER001 in Participants With Selected Proteinuric Glomerular Diseases",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Everest Medicines (China) Co.,Ltd.",
   "drugs": [
    "EVER001"
   ],
   "start": "2026-05-20",
   "pcd": "2028-12-31",
   "updated": "2026-08-05",
   "enroll": 45,
   "summary": "This is a Phase 1b/2, open-label, multi-center study evaluating the therapeutic potential and safety of the investigational drug EVER001 in adults with FSGS, MCD, or IgAN. EVER001 acts on multiple immune pathways without directly affecting T cells or depleting B cells (both are lymphocytes). The study will be conducted at \\\\~30 centers in China, enrolling 45 participants aged 18-75 years (15 per i…",
   "cond": "Minimal Change Disease (MCD), IgA Nephropathy (IgAN), Focal Segmental Glomerulosclerosis (FSGS)"
  },
  {
   "nct": "NCT07662135",
   "title": "A Phase III Study to Investigate the Efficacy and Safety of Elecoglipron Compared With Placebo in Adults With Type 2 Diabetes Mellitus and Impaired Renal Functi…",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "AstraZeneca",
   "drugs": [
    "Elecoglipron"
   ],
   "start": "2026-07-06",
   "pcd": "2028-07-13",
   "updated": "2026-08-04",
   "enroll": 900,
   "summary": "The purpose of this study is to evaluate the efficacy, safety, and tolerability of elecoglipron, compared with placebo in adults with type 2 diabetes mellitus (T2DM) and impaired renal function, who are or will be on a background of sodium-glucose cotransporter 2 inhibitor (SGLT2i) dapagliflozin 10 mg as per guideline directed medical therapy (GDMT) for chronic kidney disease (CKD). Additionally, …",
   "cond": "Type 2 Diabetes Mellitus, Type 2 Diabetes With Chronic Kidney Disease"
  },
  {
   "nct": "NCT02075463",
   "title": "Study to Evaluate the Safety and Efficacy of GSK1278863 in Recombinant Human Erythropoietin (rhEPO) Hyporesponsive Hemodialysis-dependent Chronic Kidney Disease…",
   "status": "TERMINATED",
   "phase": "PHASE2",
   "sponsor": "GlaxoSmithKline",
   "drugs": [
    "GSK1278863"
   ],
   "start": "2014-06-11",
   "pcd": "2016-03-16",
   "updated": "2026-08-04",
   "enroll": 15,
   "summary": "The study will evaluate the ability of GSK1278863 to increase the hemoglobin (Hgb) concentration, or maintain it within the target range, and the safety and efficacy of GSK1278863 over 16 weeks of treatment, in hemodialysis-dependent subjects with anemia associated with chronic kidney disease who are chronically hyporesponsive to rhEPO. The data generated will inform dose requirements for any chro…",
   "cond": "Anemia, Anaemia"
  },
  {
   "nct": "NCT06419205",
   "title": "A Phase 2 Study to Evaluate the Safety, PD, PK, and Clinical Activity of ADX-097 in Participants With IgAN, LN or C3G",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Akebia Therapeutics",
   "drugs": [
    "ADX-097"
   ],
   "start": "2026-07-30",
   "pcd": "2028-02",
   "updated": "2026-08-04",
   "enroll": 30,
   "summary": "A Phase 2 Study to Evaluate the Safety, Pharmacodynamics, Pharmacokinetics, and Clinical Activity of ADX-097 Administered Subcutaneously in Male and Female Participants Aged 16 Years or Older with Immunoglobulin A Nephropathy (IgAN), Lupus Nephritis (LN), or Complement Component 3 Glomerulopathy (C3G)",
   "cond": "IgA Nephropathy, Lupus Nephritis (LN), C3 (Complement Component 3) Glomerulopathy"
  }
 ],
 "endocrinology": [
  {
   "nct": "NCT07754045",
   "title": "Evaluating the Efficacy and Safety of LUM-201 Plus Semaglutide Versus Semaglutide Plus Placebo in Older Obese Adults",
   "status": "NOT_YET_RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Lumos Pharma",
   "drugs": [
    "LUM-201",
    "Semagludtide"
   ],
   "start": "2027-02-15",
   "pcd": "2028-02-15",
   "updated": "2026-08-10",
   "enroll": 202,
   "summary": "This is a phase 2 randomized, double-blind, placebo-controlled, multi-center study evaluating the efficacy and safety of LUM-201 plus Semaglutide versus Semaglutide plus placebo in obese adults with body mass index between 30 and 45 kg/m\\\\^2, between the ages of 60 and 85 years that have mild functional impairment.",
   "cond": "Obesity & Overweight"
  },
  {
   "nct": "NCT06693843",
   "title": "A Phase 2b, Dose-range Finding Study of the Efficacy and Safety of Multiple Doses of Aleniglipron (GSBR-1290) in Participants Living With Obesity or Overweight …",
   "status": "COMPLETED",
   "phase": "PHASE2",
   "sponsor": "Gasherbrum Bio, Inc., a wholly owned subsidiary of Structure Therapeutics",
   "drugs": [
    "Aleniglipron",
    "Aleniglipron",
    "Aleniglipron",
    "Aleniglipron"
   ],
   "start": "2024-10-28",
   "pcd": "2025-10-24",
   "updated": "2026-08-10",
   "enroll": 230,
   "summary": "This study is a randomized, double-blind, placebo-controlled, dose-range finding study of the efficacy, safety, tolerability, PK, and PD of multiple doses of aleniglipron in participants living with overweight or obesity with at least one weight-related comorbidity. Participants will be randomized to aleniglipron or placebo in a ratio of 3:1 within each Cohort receiving multiple-ascending, QD dose…",
   "cond": "Obesity, Overweight, or Chronic Weight Management"
  },
  {
   "nct": "NCT05774756",
   "title": "A Trial of Setmelanotide in Acquired Hypothalamic Obesity",
   "status": "ACTIVE_NOT_RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Rhythm Pharmaceuticals, Inc.",
   "drugs": [
    "Setmelanotide"
   ],
   "start": "2023-04-26",
   "pcd": "2025-03-18",
   "updated": "2026-08-10",
   "enroll": 143,
   "summary": "The goal of this trial is to learn how well Setmelanotide works to improve weight reduction, hunger, and quality of life in patients 4 years of age and older with acquired Hypothalamic Obesity (HO). To determine how well setmelanotide works and how safe it is, patients with HO will take a daily injection of either setmelanotide or placebo and complete trial assessments for 52 weeks on a therapeuti…",
   "cond": "Hypothalamic Obesity"
  },
  {
   "nct": "NCT06854952",
   "title": "A Clinical Study to Evaluate the Efficacy, Safety, and Tolerability of TERN-601 in Adults With Overweight or Obesity",
   "status": "COMPLETED",
   "phase": "PHASE2",
   "sponsor": "Terns, Inc., a subsidiary of Merck & Co., Inc. (Rahway, New Jersey USA)",
   "drugs": [
    "TERN-601"
   ],
   "start": "2025-03-07",
   "pcd": "2025-08-19",
   "updated": "2026-08-10",
   "enroll": 167,
   "summary": "This is a Phase 2a multicenter, randomized, double-blind, placebo-controlled clinical trial studying the efficacy, safety, and tolerability of orally administered TERN-601 in adults with overweight or obesity.",
   "cond": "Overweight or Obesity"
  },
  {
   "nct": "NCT07271186",
   "title": "Study to Assess the Effects of Angiopoietin-like Protein 3 (ANGPTL3) Inhibition in Adult Participants With Diabetic Kidney Disease",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Regeneron Pharmaceuticals",
   "drugs": [
    "ALN-ANG3",
    "Evinacumab"
   ],
   "start": "2026-01-09",
   "pcd": "2027-09-24",
   "updated": "2026-08-10",
   "enroll": 270,
   "summary": "This study is researching experimental drugs called ALN-ANG3 and evinacumab (called \\\"study drugs\\\"). The study is focused on participants who have diabetic kidney disease. The aim of the study is to see how safe and effective the study drugs are. The study is looking at several other research questions, including: * What side effects may happen from taking the study drug * How much study drug is …",
   "cond": "Diabetic Kidney Disease (DKD)"
  },
  {
   "nct": "NCT07654361",
   "title": "Efficacy and Safety of Aleniglipron in Participants With Obesity or Overweight With a Weight-Related Comorbidity (ACCOMPLISH-1)",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Gasherbrum Bio, Inc., a wholly owned subsidiary of Structure Therapeutics",
   "drugs": [
    "Aleniglipron"
   ],
   "start": "2026-07-13",
   "pcd": "2028-09",
   "updated": "2026-08-10",
   "enroll": 3600,
   "summary": "Study GSBR-1290-12 is a Phase 3 pivotal, multicenter, global, randomized, placebo-controlled, double-blind study to investigate the long-term efficacy, safety, and tolerability of 3 maintenance doses of aleniglipron once daily (QD) compared with placebo, when used in combination with a reduced-calorie diet and increased physical activity. All participants will be randomized to at least 76 weeks of…",
   "cond": "Obesity, Overweight, Chronic Weight Management"
  },
  {
   "nct": "NCT07754461",
   "title": "A Study to Test Whether Survodutide Helps People With Type 2 Diabetes Control Their Blood Sugar",
   "status": "NOT_YET_RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Boehringer Ingelheim",
   "drugs": [
    "Survodutide"
   ],
   "start": "2026-08-24",
   "pcd": "2028-01-17",
   "updated": "2026-08-10",
   "enroll": 600,
   "summary": "This study aims to find out whether a study medicine called survodutide helps people control their blood sugar. Adults who live with type 2 diabetes and with a body mass index (BMI) of 23 kg/m2 or higher can join. The study has 3 parts. In each part the study compares survodutide with placebo. Survodutide is being developed to treat several health problems including type 2 diabetes. Placebo looks …",
   "cond": "Type 2 Diabetes"
  },
  {
   "nct": "NCT07668388",
   "title": "A Research Study Comparing How Well Different Doses of the Medicine UBT251 Lower Blood Sugar in People With Type 2 Diabetes",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Novo Nordisk A/S",
   "drugs": [
    "UBT251",
    "Semaglutide"
   ],
   "start": "2026-06-22",
   "pcd": "2027-10-04",
   "updated": "2026-08-10",
   "enroll": 300,
   "summary": "The study is testing UBT251 in participants with type 2 diabetes. The purpose of this clinical study is to find out if UBT251 is effective and safe for treating participants with type 2 diabetes. Participants will either get UBT251, UBT251 placebo, semaglutide, or semaglutide placebo. Which treatment participants get is decided by chance. UBT251 is the treatment being tested and is not yet availab…",
   "cond": "Diabetes Mellitus, Type 2"
  },
  {
   "nct": "NCT07415954",
   "title": "A Research Study Comparing How Well Different Doses of the Medicine NNC0662-0419 Lower Blood Sugar in People With Type 2 Diabetes",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Novo Nordisk A/S",
   "drugs": [
    "NNC0662-0419",
    "Semaglutide"
   ],
   "start": "2026-04-17",
   "pcd": "2027-09-03",
   "updated": "2026-08-10",
   "enroll": 270,
   "summary": "This study is being done to look at the effect and safety of different doses of NNC0662-0419 in people living with type 2 diabetes when compared to placebo or semaglutide. The purpose of this clinical study is to find out if NNC0662-0419 is effective and safe for treating people living with type 2 diabetes. Participants will get either NNC0662-0419, semaglutide or placebo. Which treatment particip…",
   "cond": "Diabetes Mellitus, Type 2"
  },
  {
   "nct": "NCT07654374",
   "title": "A Study of Aleniglipron in Adults With Obesity or Overweight and Type 2 Diabetes Mellitus (ACCOMPLISH-2)",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Gasherbrum Bio, Inc., a wholly owned subsidiary of Structure Therapeutics",
   "drugs": [
    "aleniglipron",
    "aleniglipron",
    "aleniglipron"
   ],
   "start": "2026-07-17",
   "pcd": "2028-09",
   "updated": "2026-08-10",
   "enroll": 1100,
   "summary": "This is randomized, double-blind, placebo-controlled study of the long-term efficacy, safety, and tolerability of multiple doses of aleniglipron in participants living with overweight or obesity and T2DM. Participants will be randomized to aleniglipron or placebo for a total of 76 weeks of treatment.",
   "cond": "Obesity, Overweight, Chronic Weight Management, Type2 Diabetes Mellitus"
  },
  {
   "nct": "NCT06632444",
   "title": "LIVERAGE™: A Study to Test Whether Survodutide Helps People With a Liver Disease Called NASH/MASH Who Have Moderate or Advanced Liver Fibrosis",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Boehringer Ingelheim",
   "drugs": [
    "Survodutide"
   ],
   "start": "2024-09-17",
   "pcd": "2031-12-27",
   "updated": "2026-08-10",
   "enroll": 1800,
   "summary": "This study is open to adults who are at least 18 years old living with obesity and have: * a confirmed liver disease called non-alcoholic steatohepatitis (NASH)/metabolic associated steatohepatitis (MASH) and * moderate or advanced liver fibrosis People with a history of acute or chronic liver diseases other than MASH or chronic alcohol intake cannot take part in this study. The purpose of this st…",
   "cond": "Metabolic Dysfunction Associated Steatohepatitis (MASH), Liver Fibrosis"
  },
  {
   "nct": "NCT06632457",
   "title": "LIVERAGE™ - Cirrhosis: A Study to Test Whether Survodutide Helps People With a Liver Disease Called NASH/MASH Who Have Cirrhosis",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Boehringer Ingelheim",
   "drugs": [
    "Survodutide"
   ],
   "start": "2024-11-07",
   "pcd": "2029-06-05",
   "updated": "2026-08-10",
   "enroll": 1590,
   "summary": "This study is open to adults who are at least 18 years old and have: * A confirmed liver disease called non-alcoholic steatohepatitis (NASH) or * A confirmed liver disease called metabolic-associated steatohepatitis (MASH) * BMI of 27 kg/m2 or more or * 25 kg/m2 or more if the participant is Asian. People with a history of other chronic liver diseases or high alcohol intake cannot take part in thi…",
   "cond": "Metabolic Dysfunction Associated Steatohepatitis"
  },
  {
   "nct": "NCT07755150",
   "title": "A Study to Evaluate the Efficacy and Safety of DA-302168S Tablets in Subjects With Type 2 Diabetes",
   "status": "NOT_YET_RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Chendu DIAO Pharmaceutical Group CO., LTD.",
   "drugs": [
    "DA-302168S"
   ],
   "start": "2026-08-30",
   "pcd": "2027-10-20",
   "updated": "2026-08-10",
   "enroll": 272,
   "summary": "This Phase II, multicenter, randomized, double-blind, placebo-controlled, parallel-group study aims to assess the efficacy, safety, and PK characteristics of DA-302168S tablets in Chinese T2DM participants, and to provide dose-selection evidence for the Phase III confirmatory trial.",
   "cond": "Type 2 Diabetes Mellitus"
  },
  {
   "nct": "NCT07527910",
   "title": "A Phase 2a Study of ALN-PNP With and Without a GLP1R Agonist in Adult Patients With Homozygous PNPLA3-Related MASLD",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Regeneron Pharmaceuticals",
   "drugs": [
    "ALN-PNP",
    "Tirzepatide"
   ],
   "start": "2026-05-22",
   "pcd": "2030-03-15",
   "updated": "2026-08-10",
   "enroll": 204,
   "summary": "This study will test a study drug called ALN-PNP with and without another drug that is used for controlling blood sugar, appetite, and weight (for example, tirzepatide), to see if it can help treat MASLD, also known as fatty liver disease. ALN-PNP reduces the amount of Patatin-like phospholipase domain-containing protein 3 (PNPLA3), a protein that liver cells make, which may help decrease liver fa…",
   "cond": "Metabolic Dysfunction-Associated Steatotic Liver Disease (MASLD)"
  },
  {
   "nct": "NCT07589686",
   "title": "A Dose-Finding Study of Petrelintide With Enicepatide (RO7795068) in Adults With Obesity or Overweight",
   "status": "NOT_YET_RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Hoffmann-La Roche",
   "drugs": [
    "Petrelintide",
    "Enicepatide"
   ],
   "start": "2026-09-30",
   "pcd": "2027-11-12",
   "updated": "2026-08-07",
   "enroll": 486,
   "summary": "The main purpose of this study is to evaluate the safety and efficacy of the co-administration of petrelintide and enicepatide compared with placebo, petrelintide monotherapy, and enicepatide monotherapy in participants with obesity or overweight with at least one weight-related comorbidity.",
   "cond": "Obesity or Overweight"
  }
 ],
 "immunology": [
  {
   "nct": "NCT06586112",
   "title": "A Study to Evaluate the Efficacy and Safety of ESK-001 in Patients With Moderate to Severe Plaque Psoriasis",
   "status": "COMPLETED",
   "phase": "PHASE3",
   "sponsor": "Alumis Inc",
   "drugs": [
    "Envudeucitinib",
    "Apremilast"
   ],
   "start": "2024-07-25",
   "pcd": "2025-09-19",
   "updated": "2026-08-10",
   "enroll": 912,
   "summary": "The goal of this clinical trial is to learn if ESK-001 works to treat moderate to severe plaque psoriasis. The main questions it aims to answer are: * Does ESK-001 reduce the severity of people's psoriasis? * How safe is ESK-001 in people with moderate to severe plaque psoriasis? The study includes 2 comparators: a placebo control (a 'dummy' tablet that does not contain the medicine ESK-001 but lo…",
   "cond": "Plaque Psoriasis"
  },
  {
   "nct": "NCT06920771",
   "title": "A Randomized, Double-Blind, Placebo-Controlled, Multi-Centre Study to Assess the Efficacy of PURETHAL Mites Mixture 50,000 AUeq/mL Subcutaneous Immunotherapy in…",
   "status": "COMPLETED",
   "phase": "PHASE3",
   "sponsor": "HAL Allergy",
   "drugs": [
    "PURETHAL Mites 50,000 AUeq/ml"
   ],
   "start": "2024-09-09",
   "pcd": "2026-03-30",
   "updated": "2026-08-10",
   "enroll": 691,
   "summary": "Rationale: Allergic rhinitis/rhinoconjunctivitis (ARC) is a global health problem, affecting 10-25% of the population. Allergen-specific immunotherapy is the only disease-modifying therapeutic option for subjects with house dust mites (HDM)-induced allergic rhinitis/rhinoconjunctivitis. This Phase 3 clinical study aims to demonstrate the effecacy of PURETHAL Mites (PM) Mixture subcutaneous immunot…",
   "cond": "House Dust Mite Allergy, House Dust Mite Rhinitis"
  },
  {
   "nct": "NCT06588738",
   "title": "A Study in Patients With Moderate to Severe Plaque Psoriasis to Evaluate the Efficacy and Safety of ESK-001",
   "status": "COMPLETED",
   "phase": "PHASE3",
   "sponsor": "Alumis Inc",
   "drugs": [
    "Envudeucitinib",
    "Apremilast"
   ],
   "start": "2024-08-20",
   "pcd": "2025-09-23",
   "updated": "2026-08-10",
   "enroll": 862,
   "summary": "The goal of this clinical trial is to learn if ESK-001 works to treat moderate to severe plaque psoriasis. The main questions it aims to answer are: * Does ESK-001 reduce the severity of people's psoriasis? * How safe is ESK-001 in people with moderate to severe plaque psoriasis? The study includes 2 comparators: a placebo control (a 'dummy' tablet that does not contain the medicine ESK-001 but lo…",
   "cond": "Plaque Psoriasis"
  },
  {
   "nct": "NCT06380907",
   "title": "A Phase 2 Study of ZL-1102 in Patients With Chronic Plaque Psoriasis",
   "status": "TERMINATED",
   "phase": "PHASE2",
   "sponsor": "Zai Lab (Hong Kong), Ltd.",
   "drugs": [
    "ZL-1102 1% w/w gel BID for 16 weeks",
    "ZL-1102 3% w/w gel BID for 16 weeks",
    "ZL-1102 3% w/w gel QD for 16 weeks"
   ],
   "start": "2024-05-22",
   "pcd": "2025-12-16",
   "updated": "2026-08-10",
   "enroll": 65,
   "summary": "A Randomized, Double-Blind, Vehicle-Controlled, Multicenter, Dose-Ranging, Phase 2 Study to Evaluate the Efficacy and Safety of Different Doses of ZL-1102 Topical gel (A Human VH IL-17A Antibody Fragment) in the Treatment of Chronic Plaque Psoriasis",
   "cond": "Plaque Psoriasis"
  },
  {
   "nct": "NCT07755241",
   "title": "A Study of AC-101 Tablets in Patients With Ulcerative Colitis",
   "status": "NOT_YET_RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Accro Bioscience (Suzhou) Limited",
   "drugs": [
    "AC-101",
    "AC-101"
   ],
   "start": "2026-08-28",
   "pcd": "2027-11-30",
   "updated": "2026-08-10",
   "enroll": 153,
   "summary": "This is a Phase Ⅱb, multicenter, randomized, parallel-group, double-blind, placebo-controlled, dose-finding study of AC-101 tablets in patients with moderately to severely active ulcerative colitis (UC). The study will evaluate the efficacy, safety, and pharmacokinetics of AC-101 compared with placebo in patients who have had an inadequate response, loss of response, or intolerance to prior advanc…",
   "cond": "Ulcerative Colitis (UC)"
  },
  {
   "nct": "NCT03453112",
   "title": "Foster 100/6 mg NEXThaler Versus Foster 100/6mg Pressurized Metered-dose Inhaler (pMDI) in Patients With Controlled Asthma.",
   "status": "COMPLETED",
   "phase": "PHASE3",
   "sponsor": "Chiesi Farmaceutici S.p.A.",
   "drugs": [
    "Foster 100/6µg NEXThaler",
    "Foster 100/6µg pMDI"
   ],
   "start": "2017-10-09",
   "pcd": "2021-12-28",
   "updated": "2026-08-10",
   "enroll": 494,
   "summary": "Primary Objective To demonstrate the non-inferiority of Foster® NEXThaler® 100/6 µg versus (vs.) Foster® pressurised metered dose inhaler (pMDI) 100/6 µg in terms of pulmonary function (change from baseline to the entire treatment period in average pre-dose morning peak expiratory flow \\\\[PEF\\\\]) in asthmatic patients. Secondary Objectives To evaluate the effect of the test treatments in terms of …",
   "cond": "Asthma"
  },
  {
   "nct": "NCT07474792",
   "title": "Dose Ranging Study of ORKA-002 in Patients With Moderate-to-Severe Plaque Psoriasis",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Oruka Therapeutics, Inc.",
   "drugs": [
    "ORKA-002"
   ],
   "start": "2026-03-19",
   "pcd": "2027-10",
   "updated": "2026-08-10",
   "enroll": 160,
   "summary": "This is a multicenter, randomized, double-blinded, placebo-controlled, dose-range finding study to evaluate the efficacy and safety of ORKA-002 in adult participants with moderate-to-severe plaque psoriasis.",
   "cond": "Plaque Psoriasis"
  },
  {
   "nct": "NCT06653322",
   "title": "A Multi-centered，Randomized，Double-blind，Placebo-controlled Study to Evaluate the Efficacy and Safety of SHR-1703 in Eosinophilic Asthma",
   "status": "ACTIVE_NOT_RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Guangdong Hengrui Pharmaceutical Co., Ltd",
   "drugs": [
    "HR-1703"
   ],
   "start": "2024-11-21",
   "pcd": "2027-09",
   "updated": "2026-08-10",
   "enroll": 401,
   "summary": "The purpose of this study is to evaluate the Pharmacodynamic, Efficacy and Safety of SHR-1703 in Asthma Patients with Eosinophil Phenotype",
   "cond": "Asthma With Eosinophilic Phenotype"
  },
  {
   "nct": "NCT07404865",
   "title": "Phase 3 Study of Telitacicept in Active Primary Sjögren's Disease",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Vor Biopharma",
   "drugs": [
    "Telitacicept"
   ],
   "start": "2026-02-26",
   "pcd": "2028-12",
   "updated": "2026-08-10",
   "enroll": 250,
   "summary": "Phase 3 Study of Telitacicept in Active Primary Sjögren's Disease (UPSTREAM SjD)",
   "cond": "Primary Sjogren's Disease"
  },
  {
   "nct": "NCT07486960",
   "title": "Study to Evaluate Tulisokibart in Adults With Psoriatic Arthritis (MK-7240-015)",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Merck Sharp & Dohme LLC",
   "drugs": [
    "Tulisokibart"
   ],
   "start": "2026-04-20",
   "pcd": "2027-08-13",
   "updated": "2026-08-10",
   "enroll": 140,
   "summary": "Researchers are looking for new ways to treat Psoriatic Arthritis (PsA). This study will help find out if a study medicine called tulisokibart (MK-7240) can treat symptoms of active PsA. This study assesses the efficacy, safety, and tolerability of tulisokibart in adult participants with active PsA. In this study, researchers will look at different doses of tulisokibart. Researchers want to learn …",
   "cond": "Psoriatic Arthritis"
  },
  {
   "nct": "NCT04844606",
   "title": "A Master Protocol (AMAZ): A Study of Mirikizumab (LY3074828) in Pediatric Participants With Ulcerative Colitis or Crohn's Disease (SHINE-ON)",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Eli Lilly and Company",
   "drugs": [
    "Mirikizumab",
    "Mirikizumab"
   ],
   "start": "2021-05-26",
   "pcd": "2030-12",
   "updated": "2026-08-07",
   "enroll": 150,
   "summary": "The main purpose of this study is to evaluate the long-term efficacy of mirikizumab in pediatric participants with ulcerative colitis (UC) or Crohn's disease (CD). The study will last about 172 weeks and may include up to 44 visits. Additional treatment may be available to participants via a Continued Access Period.",
   "cond": "Ulcerative Colitis, Ulcerative Colitis Chronic, Inflammatory Bowel Diseases, Crohn's Disease"
  },
  {
   "nct": "NCT04746911",
   "title": "Maximal Usage Pharmacokinetics and Safety of ARQ-151 in Children With Plaque Psoriasis (ARQ-151-216)",
   "status": "COMPLETED",
   "phase": "PHASE2",
   "sponsor": "Arcutis Biotherapeutics, Inc.",
   "drugs": [
    "ARQ-151 cream 0.3%"
   ],
   "start": "2021-03-01",
   "pcd": "2022-05-11",
   "updated": "2026-08-07",
   "enroll": 10,
   "summary": "This is a Phase 2, open label, maximal usage PK and safety study of ARQ-151 cream 0.3% in pediatric subjects (ages 2 to 5 years old) with plaque psoriasis:",
   "cond": "Psoriasis, Plaque Psoriasis"
  },
  {
   "nct": "NCT06425549",
   "title": "A Study to Evaluate the Efficacy and Safety of Bimekizumab Compared to Ustekinumab in Children and Adolescents From 6 Years to Less Than 18 Years of Age With Mo…",
   "status": "ACTIVE_NOT_RECRUITING",
   "phase": "PHASE3",
   "sponsor": "UCB Biopharma SRL",
   "drugs": [
    "bimekizumab",
    "ustekinumab"
   ],
   "start": "2024-06-25",
   "pcd": "2028-08-21",
   "updated": "2026-08-07",
   "enroll": 175,
   "summary": "The primary purpose of this study is to evaluate the efficacy of bimekizumab administered subcutaneously (sc) compared to active control (ustekinumab) in children and adolescents aged 6 to \\\\<18 years of age with moderate to severe plaque psoriasis (PSO).",
   "cond": "Moderate to Severe Plaque Psoriasis"
  },
  {
   "nct": "NCT05668013",
   "title": "A Study to Evaluate the Long-Term Effect of TEV-48574 in Moderate to Severe Ulcerative Colitis or Crohn's Disease",
   "status": "ACTIVE_NOT_RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Teva Branded Pharmaceutical Products R&D LLC",
   "drugs": [
    "TEV-48574 Dose Regimen A",
    "TEV-48574 Dose Regiment B"
   ],
   "start": "2023-01-11",
   "pcd": "2026-01-05",
   "updated": "2026-08-07",
   "enroll": 247,
   "summary": "The primary objective of the study is to evaluate the efficacy of 2 different maintenance dose regimens of TEV-48574 subcutaneous (sc) administered every 4 weeks (Q4W) in adult participants with inflammatory bowel disease (IBD). Secondary objectives of the study are to: * evaluate the efficacy of 2 different maintenance dose regimens of TEV-48574 sc administered Q4W in adult participants with IBD …",
   "cond": "Crohn Disease, Colitis, Ulcerative"
  },
  {
   "nct": "NCT06733935",
   "title": "A Phase 1/2 Study of NKX019 in Subjects With Immune-Mediated Diseases (Ntrust-2)",
   "status": "RECRUITING",
   "phase": "PHASE1, PHASE2",
   "sponsor": "Nkarta, Inc.",
   "drugs": [
    "NKX019",
    "Fludarabine",
    "Cyclophosphamide"
   ],
   "start": "2024-11-04",
   "pcd": "2028-10",
   "updated": "2026-08-07",
   "enroll": 240,
   "summary": "This is a Phase 1/2, open-label, multi-center, multi-cohort, non-randomized dose escalation and dose expansion basket study to determine the safety and tolerability of NKX019 (allogeneic CAR NK cells targeting CD19) in participants with autoimmune diseases.",
   "cond": "Systemic Sclerosis, Idiopathic Inflammatory Myopathies, Antineutrophil Cytoplasmic Antibody-Associated Vasculitis, Rheum…"
  }
 ],
 "raredisease": [
  {
   "nct": "NCT06128564",
   "title": "A Gene Delivery Study to Evaluate the Safety and Expression of Delandistrogene Moxeparvovec in Participants Under the Age of Four With Duchenne Muscular Dystrop…",
   "status": "ACTIVE_NOT_RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Hoffmann-La Roche",
   "drugs": [
    "delandistrogene moxeparvovec"
   ],
   "start": "2023-11-29",
   "pcd": "2026-03-04",
   "updated": "2026-08-10",
   "enroll": 13,
   "summary": "This open-label, single-arm study will evaluate the safety and expression of delandistrogene moxeparvovec in participants with DMD. Participants will be in the study for approximately 264 weeks.",
   "cond": "Duchenne Muscular Dystrophy"
  },
  {
   "nct": "NCT07704099",
   "title": "Safety and Efficacy of KER-065 in Participants With Duchenne Muscular Dystrophy",
   "status": "NOT_YET_RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Keros Therapeutics, Inc.",
   "drugs": [
    "KER-065"
   ],
   "start": "2026-09-14",
   "pcd": "2029-07-17",
   "updated": "2026-08-10",
   "enroll": 36,
   "summary": "The purpose of this study is to evaluate the safety, tolerability, pharmacokinetics (PK), pharmacodynamics (PD), and efficacy of KER-065 administered to adult and pediatric ambulatory and nonambulatory male participants with Duchenne Muscular Dystrophy (DMD) on stable background therapy.",
   "cond": "Duchenne Muscular Dystrophy"
  },
  {
   "nct": "NCT03368742",
   "title": "Microdystrophin Gene Transfer Study in Adolescents and Children With DMD",
   "status": "ACTIVE_NOT_RECRUITING",
   "phase": "PHASE1, PHASE2",
   "sponsor": "Solid Biosciences Inc.",
   "drugs": [
    "SGT-001"
   ],
   "start": "2017-12-06",
   "pcd": "2026-10-15",
   "updated": "2026-08-10",
   "enroll": 12,
   "summary": "This is a controlled, open-label, single-ascending dose study to evaluate the safety and tolerability of SGT-001 in adolescents and children with Duchenne muscular dystrophy (DMD). Participants will receive a single intravenous (IV) infusion of SGT-001 and will be followed for approximately 5 years. The protocol was amended to drop the control arm after 4 participants were dosed.",
   "cond": "Duchenne Muscular Dystrophy"
  },
  {
   "nct": "NCT06183931",
   "title": "Study of ALXN2220 Versus Placebo in Adults With ATTR-CM",
   "status": "ACTIVE_NOT_RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Alexion Pharmaceuticals, Inc.",
   "drugs": [
    "ALXN2220"
   ],
   "start": "2024-01-11",
   "pcd": "2027-12-06",
   "updated": "2026-08-10",
   "enroll": 1181,
   "summary": "The primary objective of this study is to access the efficacy of ALXN2220 in the treatment of adult participants with ATTR-CM by evaluating the difference between the ALXN2220 and placebo groups as assessed by the total occurrences of all-cause mortality (ACM) and cardiovascular (CV) clinical events.",
   "cond": "Transthyretin Amyloid Cardiomyopathy"
  },
  {
   "nct": "NCT06659549",
   "title": "A Phase 2 Efficacy and Safety Study of GAL-101, 2% Ophthalmic Solution in Non-foveal Geographic Atrophy Secondary to Non-neovascular AMD",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Galimedix Therapeutics Inc",
   "drugs": [
    "GAL-101"
   ],
   "start": "2025-01-10",
   "pcd": "2027-03-30",
   "updated": "2026-08-06",
   "enroll": 110,
   "summary": "Age-related macular degeneration (AMD) affects millions of elderly patients. When advanced, there is Geographic Atrophy (GA) in the retina. This means that there is an area with a loss of light-sensitive cells, called photoreceptors. That part of the retina can no longer see. Atrophy begins as a small spot in the retina distant from the fovea which is the part of the retina responsible for sharp c…",
   "cond": "Geographic Atrophy of the Macula"
  },
  {
   "nct": "NCT07589595",
   "title": "A Study of Donanemab (LY3002813) in Participants With Early Cognitive Decline (TRAILBLAZER-ALZ 7)",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Eli Lilly and Company",
   "drugs": [
    "Donanemab"
   ],
   "start": "2026-05-20",
   "pcd": "2028-08",
   "updated": "2026-08-06",
   "enroll": 350,
   "summary": "The main purpose of this study is to evaluate whether treatment with donanemab slows the progression of cognitive (how we think, learn, remember, pay attention, and make decisions) and functional (how we are able to perform daily activities) decline. For each participant, the study will last one and a half years.",
   "cond": "Cognitive Dysfunction, Lewy Body Disease, Synucleinopathies, Amyloid"
  },
  {
   "nct": "NCT07750678",
   "title": "Safety and Efficacy Study of GEB-101 Injection in Subjects With TGFBI-related Corneal Dystrophy",
   "status": "NOT_YET_RECRUITING",
   "phase": "PHASE1, PHASE2",
   "sponsor": "GenEditBio Limited",
   "drugs": [
    "GEB-101 Injection"
   ],
   "start": "2026-08",
   "pcd": "2027-08",
   "updated": "2026-08-06",
   "enroll": 30,
   "summary": "The goal of this clinical trial is to evaluate the safety and efficacy of GEB-101 injection in subjects with TGFBI-related Corneal Dystrophy",
   "cond": "Hereditary Corneal Dystrophy, Corneal Abnormality, Corneal Dystrophies, Corneal Dystrophies, Hereditary"
  },
  {
   "nct": "NCT06361537",
   "title": "Study of IV Human Plasma-derived C1 Esterase Inhibitor Concentrate in Patients With Congenital C1-INH Deficiency for Treatment and Pre-procedure Preventing of A…",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Octapharma",
   "drugs": [
    "OCTA-C1-INH"
   ],
   "start": "2024-04-30",
   "pcd": "2026-12",
   "updated": "2026-08-06",
   "enroll": 124,
   "summary": "Prospective, multicenter, randomized, double-blind, parallel group, placebo- controlled, efficacy and safety phase 3 study of an intravenous human plasma- derived C1 esterase inhibitor (C1-INH) concentrate in participants with congenital C1-INH deficiency for the treatment and pre-procedure prevention of acute hereditary angioedema attacks",
   "cond": "Acute Hereditary Angio Edema"
  },
  {
   "nct": "NCT06467084",
   "title": "Open-Label Safety, PK, and Efficacy Trial of Sebetralstat (KVD900) in Pediatric Patients (Ages 2-11) With HAE Type I or II",
   "status": "COMPLETED",
   "phase": "PHASE3",
   "sponsor": "KalVista Pharmaceuticals, Ltd.",
   "drugs": [
    "KVD900 150 mg",
    "KVD900 300 mg",
    "KVD900 600 mg"
   ],
   "start": "2024-08-01",
   "pcd": "2026-01-15",
   "updated": "2026-08-05",
   "enroll": 36,
   "summary": "KVD900-303 is an open-label, multicenter clinical trial in patients aged 2 to 11 years old with HAE Type I or II.",
   "cond": "Hereditary Angioedema"
  },
  {
   "nct": "NCT07298447",
   "title": "Donidalorsen Treatment in Children With Hereditary Angioedema",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Ionis Pharmaceuticals, Inc.",
   "drugs": [
    "Donidalorsen"
   ],
   "start": "2026-04-21",
   "pcd": "2029-06",
   "updated": "2026-08-05",
   "enroll": 20,
   "summary": "The purpose of this study is to evaluate the safety, tolerability and pharmacokinetics of donidalorsen in pediatric participants with hereditary angioedema (HAE) Type I (HAE-1) or Type II (HAE-2).",
   "cond": "Hereditary Angioedema (HAE)"
  },
  {
   "nct": "NCT06563895",
   "title": "Acoramidis Transthyretin Amyloidosis Prevention Trial in the Young (ACT-EARLY) Study in Asymptomatic Carriers of a Pathogenic TTR Variant",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Eidos Therapeutics, a BridgeBio company",
   "drugs": [
    "Acoramidis"
   ],
   "start": "2025-05-12",
   "pcd": "2031-10",
   "updated": "2026-08-04",
   "enroll": 587,
   "summary": "Transthyretin amyloidosis (ATTR) is a disease where the normally occurring transthyretin (TTR) protein falls apart and forms amyloid, a sticky plaque-like substance that accumulates in different organs in the body and can cause damage to the organ. There are two ways that the TTR protein can fall apart. One way occurs as a person ages, where the normal TTR protein can fall apart and form amyloid t…",
   "cond": "Amyloidosis, Amyloid Cardiomyopathy, Transthyretin Amyloidosis, Cardiomyopathies"
  },
  {
   "nct": "NCT07587242",
   "title": "A Phase 3 Study to Evaluate the Safety and Efficacy of AOC 1044 (Also Referred to as Delpacibart Zotadirsen) in Participants With DMD With Gene Mutations Amenab…",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Avidity Biosciences, Inc.",
   "drugs": [
    "AOC 1044"
   ],
   "start": "2026-08",
   "pcd": "2029-05",
   "updated": "2026-08-04",
   "enroll": 70,
   "summary": "A Randomized, Double-blind, Placebo-controlled, Phase 3 Study to Evaluate the Efficacy and Safety of Intravenous AOC 1044 for the treatment of Duchenne Muscular Dystrophy (DMD) with Gene Mutations Amenable to Exon 44 Skipping",
   "cond": "Muscular Dystrophies, Muscular Dystrophies (Duchenne, Becker, Myotonic Dystrophy), Muscular Disorders, Atrophic, Muscula…"
  },
  {
   "nct": "NCT05184088",
   "title": "Efficacy of [18F]Florbetaben PET for Diagnosis of Cardiac AL Amyloidosis",
   "status": "COMPLETED",
   "phase": "PHASE3",
   "sponsor": "Lantheus Germany GmbH",
   "drugs": [
    "[18F]florbetaben"
   ],
   "start": "2023-01-13",
   "pcd": "2026-04-21",
   "updated": "2026-08-03",
   "enroll": 244,
   "summary": "This is an open-label, multi-center pivotal Phase 3 study to visually and quantitatively assess PET images obtained after single application of 300 MBq \\\\[18F\\\\]florbetaben and PET scanning of patients with suspected cardiac amyloidosis.",
   "cond": "Cardiac Amyloidosis, AL Amyloidosis, ATTR Amyloidosis"
  },
  {
   "nct": "NCT02008357",
   "title": "Clinical Trial of Solanezumab for Older Individuals Who May be at Risk for Memory Loss",
   "status": "COMPLETED",
   "phase": "PHASE3",
   "sponsor": "Eli Lilly and Company",
   "drugs": [
    "Solanezumab"
   ],
   "start": "2014-02-28",
   "pcd": "2022-12-27",
   "updated": "2026-08-03",
   "enroll": 1169,
   "summary": "The purpose of this study is to test whether an investigational drug called solanezumab can slow the progression of memory problems associated with brain amyloid (protein that forms plaques in the brains of people with Alzheimer Disease \\\\[AD\\\\]).",
   "cond": "Cognition Disorders"
  },
  {
   "nct": "NCT07224828",
   "title": "The Efficacy of a Battery Toothbrush in the Reduction of Established Plaque and Gingivitis",
   "status": "COMPLETED",
   "phase": "PHASE3",
   "sponsor": "Colgate Palmolive",
   "drugs": [
    "Total Active Prevention Fresh Toothpaste + Colgate Total Act…",
    "Colgate Great Regular + Total Active Prevention Battery Toot…",
    "Colgate Great Regular + standard reference flat trim toothpa…"
   ],
   "start": "2025-10-14",
   "pcd": "2026-01-28",
   "updated": "2026-07-31",
   "enroll": 130,
   "summary": "A clinical research study design to compare the effectiveness of a battery toothbrush and dentifrice in reducing gingivitis and dental plaque in adults.",
   "cond": "Plaque, Gingivitis"
  }
 ],
 "ophthalmology": [
  {
   "nct": "NCT06401044",
   "title": "A Study of AMG 732 in Healthy Participants and Participants With Thyroid Eye Disease",
   "status": "ACTIVE_NOT_RECRUITING",
   "phase": "PHASE1, PHASE2",
   "sponsor": "Amgen",
   "drugs": [
    "AMG 732"
   ],
   "start": "2024-05-30",
   "pcd": "2027-01-06",
   "updated": "2026-08-10",
   "enroll": 94,
   "summary": "The primary objective of Part A of this study is to investigate the safety and tolerability of AMG 732 after single subcutaneous (SC) doses. The primary objective of Part B of this study is to investigate the efficacy of AMG 732 in participants with Thyroid Eye Disease (TED) after multiple SC doses.",
   "cond": "Thyroid Eye Disease"
  },
  {
   "nct": "NCT06765980",
   "title": "A Study to Evaluate KRIYA-825 (VV-14295) in Adults With Geographic Atrophy Secondary to Age-related Macular Degeneration",
   "status": "RECRUITING",
   "phase": "PHASE1, PHASE2",
   "sponsor": "Kriya Therapeutics, Inc.",
   "drugs": [
    "VV-14295"
   ],
   "start": "2025-05-28",
   "pcd": "2027-12-15",
   "updated": "2026-08-10",
   "enroll": 62,
   "summary": "The goal of this study is to evaluate how safe and tolerable KRIYA-825 (VV-14295) is and to determine how effective it is in reducing the growth of geographic atrophy (GA) lesions in the treated eye in patients with GA secondary to age-related macular degeneration (AMD).",
   "cond": "Geographic Atrophy Secondary to Age-related Macular Degeneration"
  },
  {
   "nct": "NCT07661056",
   "title": "Study to Determine if BHV-1300 is Effective and Safe in Adults With Graves' Disease",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Biohaven Therapeutics Ltd.",
   "drugs": [
    "BHV-1300"
   ],
   "start": "2026-06-26",
   "pcd": "2028-01",
   "updated": "2026-08-07",
   "enroll": 300,
   "summary": "The purpose of this study is to evaluate the efficacy and safety of BHV-1300 in adult participants with Graves' disease who are actively hyperthyroid",
   "cond": "Graves Disease"
  },
  {
   "nct": "NCT07753603",
   "title": "Study to Assess Linsitinib in Participants With Moderate to Severe Active Thyroid Eye Disease (TED)",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Sling Therapeutics, Inc.",
   "drugs": [
    "linsitinib"
   ],
   "start": "2026-08-04",
   "pcd": "2028-06-30",
   "updated": "2026-08-07",
   "enroll": 130,
   "summary": "The goal of this clinical trial is to evaluate the efficacy, safety, and tolerability of linsitinib in participants with moderate to severe Thyroid Eye Disease (TED).",
   "cond": "Thyroid Eye Disease, TED, Graves Orbitopathy"
  },
  {
   "nct": "NCT07317934",
   "title": "Efficacy and Safety of LX102 Gene Therapy in Patients With Neovascular Age-related Macular Degeneration (nAMD) (STELLAR)",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Innostellar Biotherapeutics Co.,Ltd",
   "drugs": [
    "LX102",
    "Aflibercept"
   ],
   "start": "2026-01-14",
   "pcd": "2028-03",
   "updated": "2026-08-06",
   "enroll": 388,
   "summary": "This is a Phase III, randomized, open-label, active-controlled study to evaluate the efficacy and safety of subretinal injection of LX102 in participants with neovascular age-related macular degeneration. The study will evaluate a single subretinal injection of LX102 compared to an active comparator. The primary endpoint of this study is the mean change from D0 in BCVA based on an average at weeks…",
   "cond": "Neovascular Age-Related Macular Degeneration (nAMD), Wet AMD"
  },
  {
   "nct": "NCT06659549",
   "title": "A Phase 2 Efficacy and Safety Study of GAL-101, 2% Ophthalmic Solution in Non-foveal Geographic Atrophy Secondary to Non-neovascular AMD",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Galimedix Therapeutics Inc",
   "drugs": [
    "GAL-101"
   ],
   "start": "2025-01-10",
   "pcd": "2027-03-30",
   "updated": "2026-08-06",
   "enroll": 110,
   "summary": "Age-related macular degeneration (AMD) affects millions of elderly patients. When advanced, there is Geographic Atrophy (GA) in the retina. This means that there is an area with a loss of light-sensitive cells, called photoreceptors. That part of the retina can no longer see. Atrophy begins as a small spot in the retina distant from the fovea which is the part of the retina responsible for sharp c…",
   "cond": "Geographic Atrophy of the Macula"
  },
  {
   "nct": "NCT07496567",
   "title": "A Clinical Trial of EYE201/MK-8748 in People With Macular Degeneration (MK-8748-003)",
   "status": "RECRUITING",
   "phase": "PHASE2, PHASE3",
   "sponsor": "EyeBiotech Ltd.",
   "drugs": [
    "Tiespectus",
    "Aflibercept"
   ],
   "start": "2026-04-15",
   "pcd": "2028-07-31",
   "updated": "2026-08-06",
   "enroll": 960,
   "summary": "Researchers are looking for new ways to treat neovascular age-related macular degeneration (NVAMD). Available standard (usual) treatments for NVAMD, such as aflibercept, may not work for every person. Researchers want to learn if a trial medicine called tiespectus (also called MK-8748 or EYE201) can treat NVAMD. The goal of this trial is to learn if tiespectus works as well as aflibercept to treat…",
   "cond": "Macular Degeneration, Age-Related Macular Degeneration, Choroidal Neovascularization, Wet Macular Degeneration"
  },
  {
   "nct": "NCT06962839",
   "title": "A Study to Test Whether BI 1815368 Helps People With an Eye Condition Called Diabetic Macular Edema",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Boehringer Ingelheim",
   "drugs": [
    "BI 1815368"
   ],
   "start": "2025-06-05",
   "pcd": "2027-09-01",
   "updated": "2026-08-06",
   "enroll": 300,
   "summary": "This study is open to adults 18 and older with an eye condition called diabetic macular edema. People are required to have a specific type of diabetic macular edema called centre-involved diabetic macular edema (CI-DME) to take part. The purpose of this study is to find out whether a medicine called BI 1815368 improves sight in people with CI-DME and to find the most suitable dose. This study has …",
   "cond": "Macular Edema"
  },
  {
   "nct": "NCT07440225",
   "title": "A Clinical Trial of EYE201/MK-8748 in People With Macular Degeneration (MK-8748-002)",
   "status": "RECRUITING",
   "phase": "PHASE2, PHASE3",
   "sponsor": "EyeBiotech Ltd.",
   "drugs": [
    "Tiespectus",
    "Aflibercept"
   ],
   "start": "2026-03-27",
   "pcd": "2028-06-30",
   "updated": "2026-08-06",
   "enroll": 960,
   "summary": "Researchers are looking for new ways to treat neovascular age-related macular degeneration (NVAMD). Available standard (usual) treatments for NVAMD, such as aflibercept, may not work for every person. Researchers want to learn if a trial medicine called tiespectus (also called MK-8748 or EYE201) can treat NVAMD. The goal of this trial is to learn if tiespectus works as well as aflibercept to treat…",
   "cond": "Macular Degeneration, Age-Related Macular Degeneration, Choroidal Neovascularization, Wet Macular Degeneration"
  },
  {
   "nct": "NCT07592273",
   "title": "Surabgene Lomparvovec Administered in the Suprachoroidal Space in Adult Participants With Diabetic Retinopathy Without Center-Involved Diabetic Macular Edema",
   "status": "RECRUITING",
   "phase": "PHASE2, PHASE3",
   "sponsor": "AbbVie",
   "drugs": [
    "Surabgene Lomparvovec",
    "Topical Steroid",
    "Artificial Tears"
   ],
   "start": "2026-06-01",
   "pcd": "2028-06",
   "updated": "2026-08-05",
   "enroll": 576,
   "summary": "Diabetic Retinopathy (DR) is a common eye condition caused by diabetes, where high blood sugar levels damage the blood vessels in the back part of the eye (called the retina). Over time, this damage can lead to vision problems and even blindness if not treated. This study will assess surabgene lomparvovec (sura-vec) as a potential one-time gene therapy administered in the suprachoroidal space (SCS…",
   "cond": "Diabetic Retinopathy"
  },
  {
   "nct": "NCT07630649",
   "title": "Ixoberogene Soroparvovec (Ixo-vec) Contralateral Dosing Study in Participants With Neovascular Age-related Macular Degeneration",
   "status": "RECRUITING",
   "phase": "PHASE2",
   "sponsor": "Adverum Biotechnologies, Inc.",
   "drugs": [
    "Ixo-vec"
   ],
   "start": "2026-06-02",
   "pcd": "2031-06",
   "updated": "2026-08-05",
   "enroll": 15,
   "summary": "The purpose of this study is to evaluate safety, effectiveness and durability of a gene therapy called Ixo-vec (Ixoberogene soroparvovec) when administered to the contralateral (second) eye of adult participants (≥ 50 years of age) who have been diagnosed with bilateral neovascular (wet) age related macular degeneration (nAMD). The study will enroll adults with nAMD in both eyes, including partici…",
   "cond": "Neovascular Age-Related Macular Degeneration (nAMD) Wet AMD"
  },
  {
   "nct": "NCT05210803",
   "title": "Long-Term Follow-Up Study of RGX-314 Administered in the Suprachoroidal Space for Participants With nAMD",
   "status": "ENROLLING_BY_INVITATION",
   "phase": "PHASE2",
   "sponsor": "AbbVie",
   "drugs": [
    "Standard of Care",
    "Ranibizumab"
   ],
   "start": "2021-12-20",
   "pcd": "2031-07",
   "updated": "2026-08-05",
   "enroll": 116,
   "summary": "This is a prospective study designed to evaluate the long-term safety and efficacy of ABBV-RGX-314. Eligible participants are those who were previously enrolled in a clinical study of nAMD in which they received suprachoroidal space (SCS) administration of ABBV-RGX-314. Enrollment of each participant in the current study should occur after the participant has completed either the end of study or e…",
   "cond": "Neovascular Age-Related Macular Degeneration (nAMD)"
  },
  {
   "nct": "NCT05296447",
   "title": "Long-Term Follow-Up Study of RGX-314 Administered in the Suprachoroidal Space for Participants With and Without Diabetic Retinopathy",
   "status": "ENROLLING_BY_INVITATION",
   "phase": "PHASE2",
   "sponsor": "AbbVie",
   "drugs": [
    "Standard of Care",
    "Aflibercept"
   ],
   "start": "2022-04-04",
   "pcd": "2031-06",
   "updated": "2026-08-05",
   "enroll": 100,
   "summary": "This is a prospective study designed to evaluate the long-term safety and efficacy of ABBV-RGX-314. Eligible participants are those who were previously enrolled in a clinical study of DR with and without center involved-diabetic macular edema (CI-DME) in which they received suprachoroidal space (SCS) administration of ABBV-RGX-314. Enrollment of each participant in the current study should occur a…",
   "cond": "Diabetic Retinopathy, DR"
  },
  {
   "nct": "NCT07449936",
   "title": "COMO: A Phase 3 Randomized, Double-Masked Study Comparing the Efficacy of EYP-1901 Against Aflibercept in DME",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "EyePoint Pharmaceuticals, Inc.",
   "drugs": [
    "EYP-1901",
    "Aflibercept (2.0 mg)"
   ],
   "start": "2026-02-16",
   "pcd": "2027-10",
   "updated": "2026-08-04",
   "enroll": 240,
   "summary": "This is a phase 3 randomized, double -masked study comparing the efficacy of EYP-1901 against Aflibercept.",
   "cond": "Diabetic Macular Edema, DME, Diabetic Macular Edema (DME)"
  },
  {
   "nct": "NCT05562947",
   "title": "A Study of the Efficacy, Safety, and Pharmacokinetics (PK) of the Port Delivery System With Ranibizumab (PDS) in Chinese Participants With Neovascular Age-relat…",
   "status": "RECRUITING",
   "phase": "PHASE3",
   "sponsor": "Hoffmann-La Roche",
   "drugs": [
    "PDS With Ranibizumab (100 mg/mL)",
    "Ranibizumab (10 mg/mL)"
   ],
   "start": "2024-06-17",
   "pcd": "2027-07-27",
   "updated": "2026-08-04",
   "enroll": 68,
   "summary": "This study will evaluate the efficacy, safety, and PK of ranibizumab 100 milligrams per milliliter (mg/mL) delivered every 24 weeks (Q24W) via the PDS implant compared with ranibizumab 0.5 milligrams (mg) delivered every 4 weeks (Q4W) as intravitreal (IVT) injection in Chinese participants with nAMD.",
   "cond": "Neovascular Age-related Macular Degeneration, nAMD"
  }
 ]
};

const TRIALSNAP_UPDATED = "August 19, 2026";
/* WEEKLY-TRIALSNAP-END */

const FIELDS = "NCTId,BriefTitle,OverallStatus,Phase,LeadSponsorName,LeadSponsorClass,Condition,LastUpdatePostDate,StartDate,PrimaryCompletionDate,EnrollmentCount,BriefSummary,InterventionName";

const ADV = 'AREA[LeadSponsorClass]INDUSTRY AND AREA[Phase](PHASE2 OR PHASE3)';

/* Master IME/CME grant directory — every company, region, spaces funded (verified 2026-07-10) */

const MASTER = [
 {co:"Pfizer",region:"Global",spaces:["immunology"],focus:"Independent Grants for Learning & Change — Inflammation & Immunology; e.g. Alopecia Areata RFP",rfp:"open",url:"https://www.pfizer.com/about/programs-policies/grants/independent-medical-education"},
 {co:"Eli Lilly",region:"US",spaces:["endocrinology","immunology"],focus:"Lilly Grant Office — Immunology & Endocrine Areas of Focus",rfp:"open",url:"https://grantoffice.lilly.com/areas-of-focus"},
 {co:"AbbVie",region:"US/Global",spaces:["immunology","ophthalmology"],focus:"Immunology, rheumatology, dermatology, IBD; eye care (DME, glaucoma; ABBV-RGX-314). IME Provider Network gating",rfp:"open",url:"https://www.abbvie.com/science/independent-educational-grants.html"},
 {co:"Bristol Myers Squibb",region:"US",spaces:["immunology"],focus:"Immunology incl. lupus; RFE/RFP posts intermittently",rfp:"signal",url:"https://www.bms.com/our-impact/corporate-giving/funding-opportunities/request-for-proposals-education.html"},
 {co:"Johnson & Johnson",region:"US",spaces:["immunology"],focus:"IBD, dermatology (IL-23), rheumatology, gMG; Implementation Science RFP",rfp:"open",url:"https://www.jnj.com/innovativemedicine/us/grants-and-giving/educational"},
 {co:"Novartis",region:"US",spaces:["cardiovascular","nephrology","immunology"],focus:"Atrial Fibrillation (limited); CSU & HS; Sjögren's; ASCVD/Lp(a)",rfp:"open",url:"https://www.novartis.com/us-en/healthcare-professionals/external-funding/educational-grants/professional-medical-education-grants"},
 {co:"AstraZeneca",region:"US (+ex-US)",spaces:["immunology","cardiovascular"],focus:"SLE open (limited); ex-US lupus/myositis/scleroderma; CV=ATTR-CM/HTN",rfp:"open",url:"https://www.astrazeneca-us.com/sustainability/Request-Support/medical-education-office.html"},
 {co:"Sanofi",region:"US",spaces:["immunology"],focus:"Immunology via Sanofi-Regeneron Alliance (type-2 inflammation/AD)",rfp:"limited",url:"https://www.sanofi.us/en/our-company/social-impact/corporate-social-responsibility/contributions-and-giving"},
 {co:"Regeneron",region:"US",spaces:["immunology","cardiovascular","ophthalmology"],focus:"Immuno-derm (Alliance); Factor XI thrombosis; retina (Eylea/Eylea HD). Topics portal-gated",rfp:"limited",url:"https://educationalfunding.regeneron.com"},
 {co:"GSK",region:"Global",spaces:["immunology"],focus:"Immunology/respiratory strengths; per-RFP topics",rfp:"limited",url:"https://www.gskimefunding.com/ime/index.html"},
 {co:"Amgen",region:"US/Global",spaces:["endocrinology","immunology","ophthalmology"],focus:"Obesity & dyslipidemia; psoriasis/AD; RA/PsA/vasculitis/lupus/IBD; Thyroid Eye Disease (Tepezza) with named topics",rfp:"open",url:"https://www.amgen.com/responsibility/healthy-society/community-investment/independent-medical-education-funding"},
 {co:"Boehringer Ingelheim",region:"US",spaces:["endocrinology","immunology"],focus:"ILD/SARD-ILD RFP; diabetes/obesity plausible",rfp:"limited",url:"https://pro.boehringer-ingelheim.com/funding/"},
 {co:"UCB",region:"US/Global",spaces:["immunology"],focus:"Immuno-derm (bimekizumab); rheumatology/lupus/MG. No public topic list",rfp:"limited",url:"https://www.ucb.com/innovation/funding"},
 {co:"Novo Nordisk",region:"Global",spaces:["endocrinology","cardiovascular"],focus:"Diabetes, obesity, MASH, cardiovascular",rfp:"open",url:"https://www.novonordisk.com/contact-us/external-support.html"},
 {co:"Bayer",region:"US",spaces:["cardiovascular","endocrinology"],focus:"Stroke Prevention; CKD in T2D; Heart Failure; Cardio-Kidney-Metabolic",rfp:"open",url:"https://www.grants-contributions.bayer.com/home/medical-educational-grants"},
 {co:"Merck (MSD)",region:"US",spaces:["endocrinology","immunology"],focus:"Cardiometabolic (T2D) + immunology (live list unverified — JS app)",rfp:"signal",url:"https://www.msdimegrants.com/"},
 {co:"Incyte",region:"US",spaces:["immunology"],focus:"Immuno-dermatology (AD, vitiligo, HS) + autoimmunity",rfp:"limited",url:"https://www.incytegrantsandgiving.com/"},
 {co:"Takeda",region:"US",spaces:["immunology"],focus:"Plaque Psoriasis (TYK2) open; IBD, EoE, CIDP, HAE, PID open",rfp:"open",url:"https://www.takeda.com/en-us/science/independent-medical-education-grants/"},
 {co:"Gilead",region:"US/Global",spaces:["immunology"],focus:"Inflammation TA; unsolicited, must align to TAs",rfp:"limited",url:"https://www.gilead.com/responsibility/medical-education"},
 {co:"Galderma",region:"US",spaces:["immunology"],focus:"Dermatology — monetary grants RFP-gated only (since Nov 2024)",rfp:"limited",url:"https://galderma-portal.idea-point.com/Request-for-Proposals.aspx?groupid=GRANT"},
 {co:"LEO Pharma",region:"US",spaces:["immunology"],focus:"Pure-play dermatology CE/HCP education (confirm live status)",rfp:"signal",url:"https://leo-portal.idea-point.com/"},
 {co:"Organon",region:"US",spaces:["immunology"],focus:"Dermatology & biosimilars (touches rheum/immunology)",rfp:"limited",url:"https://www.organongrants.com/"},
 {co:"Roche / Genentech",region:"Global",spaces:["endocrinology","immunology","ophthalmology"],focus:"Obesity+MASH; lupus nephritis (Gazyva); TL1A IBD; wet AMD durability (Vabysmo). Posts named RFPs",rfp:"limited",url:"https://www.gene.com/good/giving/corporate-giving/imed"},
 {co:"Daiichi Sankyo",region:"US (+ex-US)",spaces:["cardiovascular"],focus:"Anticoagulation (edoxaban); US portal currently oncology-weighted",rfp:"signal",url:"https://grantsandgivingportal.dsi.steeprockinc.com/"},
 {co:"Ionis",region:"US",spaces:["cardiovascular"],focus:"Factor XI antisense (fesomersen); thrombosis",rfp:"limited",url:"https://ionis-grants.steeprockinc.com/"},
 {co:"Madrigal",region:"US",spaces:["endocrinology"],focus:"MASH (resmetirom) — defines the treatment paradigm",rfp:"open",url:"https://madrigalcorporategiving.com/medical-educational-grants"},
 {co:"Corcept",region:"US",spaces:["endocrinology"],focus:"Hypercortisolism / Cushing's (relacorilant)",rfp:"limited",url:"https://www.corcept.com/resources/grants/"},
 {co:"argenx",region:"Global",spaces:["immunology"],focus:"FcRn (efgartigimod) — MG, CIDP, autoimmune",rfp:"open",url:"https://www.argenx.com/grants"},
 {co:"Vertex (Alpine)",region:"US",spaces:["immunology"],focus:"BAFF/APRIL (povetacicept) — IgAN, autoimmune nephrology",rfp:"limited",url:"https://www.vrtx.com/responsibility/grants-and-giving"},
 {co:"Aurinia",region:"US",spaces:["immunology"],focus:"Lupus nephritis (voclosporin) — CME grants via CME@auriniapharma.com",rfp:"limited",url:"https://www.auriniapharma.com/company/responsibility"},
 {co:"Otsuka",region:"US",spaces:["immunology"],focus:"IgA nephropathy (anti-APRIL); nephrology/immunology",rfp:"limited",url:"https://www.otsukagrants.com/"},
 {co:"Biogen",region:"US",spaces:["immunology"],focus:"SLE / cutaneous lupus (litifilimab, dapirolizumab)",rfp:"limited",url:"https://grantsandgiving.biogen.com/"},
 {co:"Sun Pharma",region:"US",spaces:["immunology"],focus:"Alopecia (deuruxolitinib); psoriasis (tildrakizumab)",rfp:"limited",url:"https://sunpharmamedical.com/grant-and-iit-submissions"},
 {co:"Alexion (AstraZeneca Rare)",region:"US/Global",spaces:["raredisease","immunology"],focus:"Complement, rare hematology & rare renal (PNH, aHUS, C3G, gMG)",rfp:"open",url:"https://alexion.com/grants"},
 {co:"Alnylam",region:"US/Global",spaces:["raredisease"],focus:"RNAi — ATTR amyloidosis, rare metabolic/hepatic",rfp:"open",url:"https://www.alnylam.com/about-alnylam/grants-and-giving"},
 {co:"BioMarin",region:"US/Global",spaces:["raredisease"],focus:"Rare growth/metabolic & enzyme therapies (Voxzogo)",rfp:"open",url:"https://www.biomarin.com/science/external-scientific-support/"},
 {co:"Sarepta",region:"US",spaces:["raredisease"],focus:"Duchenne / neuromuscular gene therapy",rfp:"open",url:"https://www.sarepta.com/about-us/grants-giving"},
 {co:"Ultragenyx",region:"US",spaces:["raredisease"],focus:"Ultra-rare metabolic & gene therapy",rfp:"open",url:"https://www.ultragenyx.com/ultra-committed/grants-and-charitable-contributions/"},
 {co:"PTC Therapeutics",region:"US",spaces:["raredisease"],focus:"Rare neuromuscular & metabolic (DMD, AADC)",rfp:"limited",url:"https://www.ptcbio.com/grants-and-donations/"},
 {co:"Sobi",region:"US/Global",spaces:["raredisease"],focus:"Rare hematology, HAE, rare immunology",rfp:"open",url:"https://grants.sobi.com/"},
 {co:"Chiesi Global Rare Diseases",region:"US",spaces:["raredisease"],focus:"Rare metabolic/lysosomal (US IME via CyberGrants from Mar 2026)",rfp:"limited",url:"https://www.cybergrants.com/chiesi/landingpage"},
 {co:"Recordati Rare Diseases",region:"US",spaces:["raredisease"],focus:"Rare endocrine, metabolic & urea-cycle disorders",rfp:"limited",url:"https://medical.recordatirarediseases.com/educational-grants/"},
 {co:"Apellis",region:"US",spaces:["raredisease","immunology","ophthalmology"],focus:"Complement (C3) — PNH, C3G/IC-MPGN; geographic atrophy (Syfovre)",rfp:"open",url:"https://apellis.envisionpharma.com"},
 {co:"Mirum",region:"US",spaces:["raredisease"],focus:"Rare cholestatic liver disease",rfp:"limited",url:"https://mirumpharma.com/medical-affairs/grants-sponsorships/"},
 {co:"Harmony Biosciences",region:"US",spaces:["raredisease"],focus:"Rare neurology (narcolepsy, rare CNS)",rfp:"limited",url:"https://www.harmonybiosciences.com/philanthropy/community-grants/"},
 {co:"Denali Therapeutics",region:"US",spaces:["raredisease"],focus:"Rare lysosomal / neuro (Hunter/MPS II) — new funder at launch",rfp:"open",url:"https://www.denalitherapeutics.com/grants-sponsorships"},
 {co:"Astellas (Iveric Bio)",region:"US",spaces:["ophthalmology","immunology"],focus:"Retina / geographic atrophy (Izervay) + DME; posts named CGAs (ASRS-referenced) + general",rfp:"open",url:"https://www.astellasgrants.com/IndependentMedicalEducation.html"},
 {co:"Bausch + Lomb",region:"US",spaces:["ophthalmology"],focus:"Retina, dry eye (Miebo), glaucoma — unsolicited via caring@bausch.com",rfp:"open",url:"https://www.bausch.com/product-innovation/independent-research-cme-grants/"},
 {co:"Alcon",region:"US",spaces:["ophthalmology"],focus:"Cataract/IOL, vitreoretinal, glaucoma, dry eye — portal reopens Fall 2026 for 2027",rfp:"limited",url:"https://www.alconscience.com/medical-education/independent/"},
 {co:"Tarsus",region:"US",spaces:["ophthalmology"],focus:"Demodex blepharitis / ocular surface (Xdemvy) — unsolicited, 45–60 days",rfp:"open",url:"https://www.tarsus-science.com"}
];

const SPACECOLOR = {cardiovascular:"var(--cardio)",nephrology:"var(--nephro)",endocrinology:"var(--endo)",immunology:"var(--immuno)",gastroenterology:"var(--gastro)",raredisease:"var(--rare)",ophthalmology:"var(--oph)",
  n_alz:"#8a5cc4", n_pd:"#d84a3f", n_ms:"#2f8d67", n_epi:"#d97706", n_mig:"#2f7fb0", n_psy:"#5656d4", n_nmd:"#1f9d8f", n_strk:"#bd7a2e", n_slp:"#a06a12", n_rare:"#4a4ac0"};

const SPACENAME = {cardiovascular:"Cardiovascular",nephrology:"Nephrology",endocrinology:"Endocrinology",immunology:"Immunology",gastroenterology:"Gastroenterology",raredisease:"Rare Disease",ophthalmology:"Ophthalmology",
  n_alz:"Alzheimer's / Dementia", n_pd:"Parkinson's / Movement", n_ms:"Multiple Sclerosis", n_epi:"Epilepsy", n_mig:"Migraine / Headache", n_psy:"Psychiatry", n_nmd:"Neuromuscular", n_strk:"Stroke", n_slp:"Sleep / Narcolepsy", n_rare:"Rare Neuro"};
/* Verified IME/CME grant-program contact mailboxes (official pages, 2026). null = portal form only. */

const CONTACTS = {
 "Pfizer":null,"Eli Lilly":null,"AbbVie":"abbviegrants@abbvie.com","Bristol Myers Squibb":null,
 "Johnson & Johnson":null,"Novartis":"grants.office@novartis.com","AstraZeneca":"grants@astrazeneca.com",
 "Sanofi":null,"Regeneron":"MedEdGrants@regeneron.com","GSK":"CenterforMedicalEducation@gsk.com",
 "Amgen":"HCCIME@amgen.com","Boehringer Ingelheim":null,"UCB":"externalfunding@ucb.com",
 "Novo Nordisk":null,"Bayer":null,"Merck (MSD)":null,"Incyte":null,
 "Takeda":"IndependentMedicalEducation.TakedaSupport@takeda.com","Gilead":"imed@gilead.com",
 "Galderma":null,"LEO Pharma":"usgrants@leo-pharma.com","Organon":null,"Roche / Genentech":null,
 "Daiichi Sankyo":"giving_us@daiichisankyo.com","Ionis":"MAGrants@ionis.com",
 "Madrigal":"Contributions@madrigalpharma.com","Corcept":null,"argenx":"grants@argenx.com",
 "Vertex (Alpine)":"vertex_grants@vrtx.com","Aurinia":"CME@auriniapharma.com",
 "Otsuka":"grants@otsuka-us.com","Biogen":"grantsandgiving@biogen.com","Sun Pharma":"grants@sunpharma.com",
 "Alexion (AstraZeneca Rare)":null,"Alnylam":"grants@alnylam.com","BioMarin":null,"Sarepta":"grantsandsponsorships@sarepta.com",
 "Ultragenyx":"grants@ultragenyx.com","PTC Therapeutics":"ptcgrants@ptcbio.com","Sobi":"grants.us@sobi.com",
 "Chiesi Global Rare Diseases":"us.grants@chiesi.com","Recordati Rare Diseases":null,"Apellis":null,
 "Mirum":"grants@mirumpharma.com","Harmony Biosciences":"grants@harmonybiosciences.com","Denali Therapeutics":null,
 "Astellas (Iveric Bio)":null,"Bausch + Lomb":"caring@bausch.com","Alcon":null,"Tarsus":null
};
/* WEEKLY-SUPPORTERS-START — the Monday task re-verifies and rewrites WATCH + NEWSUPP + SUPPORTERS_VERIFIED in place */

const SUPPORTERS_VERIFIED = "August 19, 2026";
/* Potential NEW supporters — pipeline-only companies likely to fund IME/CME as they near launch */

const WATCH = [
 {co:"Idorsia",space:"cardiovascular",asset:"selatogrel (self-injected P2Y12)",trigger:"Ph3 SOS-AMI readout → first cardio launch would justify education funding",timing:"Watch 2026–27"},
 {co:"Vertex",space:"nephrology",asset:"povetacicept (BAFF/APRIL dual inhibitor)",trigger:"BLA accepted with Priority Review; FDA action date 30 Nov 2026 in IgAN → first-ever renal launch. No nephrology grant program yet; warm up now, submit-ready 2027.",timing:"Watch 2027",hot:true},
 {co:"Vera Therapeutics",space:"nephrology",asset:"atacicept (Trutakna, BAFF/APRIL)",trigger:"APPROVED 7 Jul 2026 — first-ever commercial product. Grant program expected to stand up now; approach immediately",timing:"Now",hot:true},
 {co:"Roche / Genentech",space:"nephrology",asset:"obinutuzumab (Gazyva) in primary membranous nephropathy",trigger:"Priority review, Nov 2026 FDA action date → defined pre-launch window in an indication with almost no existing CME",timing:"Watch 2027"},
 {co:"Otsuka",space:"nephrology",asset:"sibeprenlimab (anti-APRIL)",trigger:"Ph3/filed in IgAN → adds a fifth mechanism; established renal funder already, so this is submit-ready rather than warm-up",timing:"Watch 2026–27"},
 {co:"Apellis",space:"nephrology",asset:"pegcetacoplan (Empaveli) in C3G / IC-MPGN",trigger:"First-ever therapies approved Jul 2025 → prescriber familiarity near zero, structural education demand",timing:"Now"},
 {co:"Viking Therapeutics",space:"endocrinology",asset:"VK2735 (GLP-1/GIP, SC + oral)",trigger:"Ph3 VANQUISH data / first obesity approval → likeliest near-term new obesity supporter",timing:"Watch 2026–27",hot:true},
 {co:"Akero",space:"endocrinology",asset:"efruxifermin (FGF21)",trigger:"Ph3 SYNCHRONY in MASH → approval would drive first fibrosis education",timing:"Watch 2026–27"},
 {co:"Zealand Pharma",space:"endocrinology",asset:"petrelintide (amylin); survodutide (lic. BI)",trigger:"Petrelintide Ph3 + survodutide filing → likely to establish a grant program",timing:"Watch 2027"},
 {co:"Structure Therapeutics",space:"endocrinology",asset:"aleniglipron (oral GLP-1)",trigger:"Advance to Ph3 / partnering → oral GLP-1 launch education need",timing:"Watch 2027+"},
 {co:"Inventiva",space:"endocrinology",asset:"lanifibranor (pan-PPAR)",trigger:"Ph3 NATiV3 MASH readout → potential MASH supporter",timing:"Watch 2026–27"},
 {co:"Abivax",space:"immunology",asset:"obefazimod (oral, UC)",trigger:"Positive Ph3 ABTECT; NDA planned late 2026 → strong near-term IBD supporter candidate",timing:"Watch 2026–27",hot:true},
 {co:"Immunovant",space:"immunology",asset:"IMVT-1402 (next-gen anti-FcRn)",trigger:"Ph3 across autoimmune → FcRn launch would need broad education",timing:"Watch 2027"},
 {co:"Vera Therapeutics",space:"immunology",asset:"atacicept (BAFF/APRIL)",trigger:"Ph3 ORIGIN in IgA nephropathy → nephrology-immunology education at launch",timing:"Watch 2026–27"},
 {co:"Travere",space:"immunology",asset:"sparsentan (Filspari)",trigger:"Already marketed in IgAN/FSGS — likely to formalize an IME program soon",timing:"Watch now",hot:true},
 {co:"Cabaletta / Kyverna",space:"immunology",asset:"CD19 CAR-T (autoimmune)",trigger:"Pivotal autoimmune CAR-T trials → paradigm-shift education need if approved",timing:"Watch 2027+"},
 {co:"Alumis",space:"immunology",sub:"derm",asset:"ESK-001 (oral TYK2)",trigger:"Ph3 ONWARD → oral TYK2 psoriasis launch education",timing:"Watch 2027"},
 {co:"Celldex",space:"immunology",sub:"derm",asset:"barzolvolimab (anti-KIT)",trigger:"Ph3 in CSU → novel mechanism, high education need at launch",timing:"Watch 2026–27",hot:true},
 {co:"Arcutis",space:"immunology",sub:"derm",asset:"roflumilast (Zoryve, topical PDE4)",trigger:"Already marketed & expanding label — likely to formalize grant funding",timing:"Watch now"},
 {co:"Apogee",space:"immunology",sub:"derm",asset:"APG777 (anti-IL-13)",trigger:"Ph2/3 in AD → dosing-differentiated biologic launch",timing:"Watch 2027+"},
 {co:"Intellia",space:"raredisease",asset:"lonvo-z (in vivo CRISPR, hereditary angioedema)",trigger:"Ph3 HAELO positive, rolling BLA → potential 2027 launch; first in-vivo CRISPR for HAE = major education need",timing:"Watch 2027",hot:true},
 {co:"Zevra",space:"raredisease",asset:"arimoclomol (Miplyffa, Niemann-Pick type C)",trigger:"First NPC therapy already marketed — may formalize a CME/grants program",timing:"Watch now"},
 {co:"Ocular Therapeutix",space:"ophthalmology",asset:"Axpaxli (OTX-TKI, wet AMD)",trigger:"Ph3 SOL-1 positive; NDA pending; SOL-R Q1 2027 → highest-probability new wet-AMD durability launch; build Medical Affairs relationship now",timing:"Watch 2026–27",hot:true},
 {co:"Viridian",space:"ophthalmology",asset:"veligrotug (VRDN-001, IGF-1R, TED)",trigger:"BLA under Priority Review → potential approval as first Tepezza competitor; SC VRDN-003 topline H1 2026",timing:"Watch 2026",hot:true},
 {co:"EyePoint",space:"ophthalmology",asset:"Duravyu (vorolanib TKI, wet AMD/DME)",trigger:"Ph3 wet-AMD topline mid-2026; DME Ph3 starting → sustained-TKI depot across two indications",timing:"Watch 2026",hot:true},
 {co:"4D Molecular",space:"ophthalmology",asset:"4D-150 (intravitreal AAV gene therapy)",trigger:"Ph3 topline H1–H2 2027 → non-surgical wet-AMD gene therapy",timing:"Watch 2027"},
 {co:"Sling Therapeutics",space:"ophthalmology",asset:"linsitinib (oral IGF-1R, TED)",trigger:"Confirmatory Ph3 → first oral TED agent; private/pre-IPO, watch for partnering",timing:"Watch 2027+"}
,
 {co:"Pharvaris",space:"raredisease",asset:"deucrictibant IR (oral B2 antagonist, HAE on-demand)",trigger:"FDA accepted NDA Jul 2026 with PDUFA 23 Apr 2027 → second oral on-demand HAE agent; competitive launch education",timing:"Watch 2027",hot:true},
 {co:"Kyverna",space:"immunology",asset:"miv-cel / KYV-101 (CD19 CAR-T, stiff person syndrome)",trigger:"Rolling BLA completing Q4 2026 under RMAT → potential first-ever autoimmune CAR-T approval and 2027 launch",timing:"Watch 2027",hot:true},
 {co:"Incyte",space:"immunology",sub:"derm",asset:"povorcitinib (oral JAK1, hidradenitis suppurativa)",trigger:"NDA accepted Q1 2026 → US approval/launch anticipated Q1 2027; grants portal already open",timing:"Watch 2027",hot:true},
 {co:"Alumis",space:"immunology",sub:"derm",asset:"envudeucitinib / ESK-001 (oral TYK2)",trigger:"NDA submission on track Q4 2026 → 2027 FDA action; no grants portal found, build Medical Affairs relationship now",timing:"Watch 2027"},
 {co:"Inventiva",space:"endocrinology",asset:"lanifibranor (pan-PPAR, MASH)",trigger:"NATiV3 topline Q4 2026 → NDA submission guided H1 2027; first-time MASH funder candidate",timing:"Watch 2027"},
 {co:"Outlook Therapeutics",space:"ophthalmology",asset:"Lytenava (bevacizumab-vikg, wet AMD)",trigger:"FDA approved Jul 2026 — first on-label ophthalmic bevacizumab; payer/formulary education need now",timing:"Watch now",hot:true},
 {co:"Kodiak Sciences",space:"ophthalmology",asset:"KSI-101 (macular edema secondary to inflammation)",trigger:"PINNACLE Ph3 topline Q2 2027; Zenkuda BLA late 2026 → new disease category with high unmet education need",timing:"Watch 2027"}
];
/* Detailed New-Supporter watch (verified 2026-07-18). funding: "Y" | "N" | "Emerging". */

const NEWSUPP = [
 {co:"Travere",space:"nephrology",ta:"IgAN / FSGS (sparsentan, FILSPARI)",catalyst:"Marketed; FSGS full approval Apr 2026",funding:"Y",
  compCME:[["NKF IgAN Clinical Education Series","https://www.kidney.org/professionals/clinician-tools-resources/igan-clinical-education-series"]],
  contact:"Med-Ed grants via CyberGrants portal · Medical Info portal <a href='https://medicalaffairs.travere.com/medical-information/' target='_blank' rel='noopener'>medicalaffairs.travere.com</a> · AE line 1-877-659-5518 · MSL locator on site",
  portal:["Medical Education Grants","https://travere.com/our-company/grants/medical-education-grants/"],
  notes:"The benchmark — formal grants office + med-affairs org already in place (really an active funder, not just emerging)."},
 {co:"Arcutis",space:"immunology",sub:"derm",ta:"Dermatology (roflumilast, ZORYVE)",catalyst:"Marketed & expanding label (psoriasis, AD, seb derm)",funding:"Y",
  compCME:[["NPF Continuing Education","https://www.psoriasis.org/continuing-education/"]],
  contact:"Med-Ed (CME) grant portal (below) · Medical Info <a href='https://mi-ssp.scimaxmi.com/Arcutis-MI' target='_blank' rel='noopener'>mi-ssp.scimaxmi.com</a>, 1-844-692-6729 · <a href='mailto:information@arcutis.com'>information@arcutis.com</a>",
  portal:["Medical Education Grant portal","https://arcutis.envisionpharma.com/ienv_arcutis/visiontracker/portal/login.xhtml?pgm=CME"],
  notes:"Most mature IME/CME + med-info infrastructure of the emerging set."},
 {co:"Idorsia",space:"cardiovascular",ta:"Cardiovascular (selatogrel, acute-MI antiplatelet)",catalyst:"Ph3 SOS-AMI readout",funding:"Y",
  compCME:[["StatPearls — Antiplatelet Medications CME","https://www.statpearls.com/physician/cme/activity/86794"]],
  contact:"IME portal (below) · Medical Information web form + US (833) 400-9611 · corporate +41 58 844 00 00 · no grants mailbox / CMO named",
  portal:["Educational Grants (Powered by Science)","https://poweredbyscience.idorsia.com/us/s/requests/educational-grants/"],
  notes:"Only established IME program in the set, but grant scope currently Insomnia — watch for extension to cardio at launch."},
 {co:"Vera Therapeutics",space:"immunology",ta:"IgA nephropathy (atacicept, TRUTAKNA)",catalyst:"TRUTAKNA FDA accelerated approval Jul 7 2026",funding:"Emerging",
  compCME:[["NKF IgAN Clinical Education Series","https://www.kidney.org/professionals/clinician-tools-resources/igan-clinical-education-series"]],
  contact:"Medical Info <a href='mailto:medinfo@veratx.com'>medinfo@veratx.com</a>, 1-833-633-8372 · <a href='mailto:info@veratx.com'>info@veratx.com</a> · CEO Marshall Fordyce, MD (no CMO named yet)",
  portal:["Med Affairs (HCP) — no grants portal yet","https://medical.veratx.com/"],
  notes:"Just went commercial; med-affairs org launching — prime near-term new supporter to watch."},
 {co:"Abivax",space:"immunology",ta:"Ulcerative colitis / IBD (obefazimod)",catalyst:"Ph3 ABTECT positive; NDA planned late 2026",funding:"Emerging",
  compCME:[["Crohn's & Colitis Foundation — Online Education","https://www.crohnscolitisfoundation.org/science-and-professionals/education-resources/online-education-modules"]],
  contact:"<a href='mailto:info@abivax.com'>info@abivax.com</a> · CMO Fabio Cataldi, MD · VP Global Head of Medical Affairs Chris Rabbat, PhD · CCO Michael Nesrallah",
  portal:["None found",""],
  notes:"Nearest to launch; named VP Global Head of Med Affairs = strongest emerging signal. (STAT noted safety questions Jun 2026.)"},
 {co:"Viking Therapeutics",space:"endocrinology",ta:"Obesity / metabolic (VK2735)",catalyst:"Ph3 VANQUISH data / first obesity approval",funding:"Emerging",
  compCME:[["NEJM/MMS — Advancements in Obesity Management","https://ce.massmed.nejm.org/obesity-cme-ce/content/demand-recent-advancements-management-obesity-focus-pharmacotherapies"]],
  contact:"<a href='mailto:info@vikingtherapeutics.com'>info@vikingtherapeutics.com</a>, 858-704-4660 · CMO Hubert C. Chen, MD · VP Medical Affairs Karen C. Chung, PharmD",
  portal:["None found",""],
  notes:"Med-affairs build-out (CMO + VP MA added) is the key signal; likeliest near-term obesity supporter."},
 {co:"Zealand Pharma",space:"endocrinology",ta:"Obesity (petrelintide)",catalyst:"Petrelintide Ph3 + Roche partnership",funding:"Emerging",
  compCME:[["NEJM/MMS — Advancements in Obesity Management","https://ce.massmed.nejm.org/obesity-cme-ce/content/demand-recent-advancements-management-obesity-focus-pharmacotherapies"]],
  contact:"Web form + compliance hotline · DK +45 88 77 36 00 · US office Boston · EVP/CMO David Kendall · CCO Eric Cox",
  portal:["None found",""],
  notes:"Building commercial org; grants program likely near-term."},
 {co:"Celldex",space:"immunology",sub:"derm",ta:"Chronic spontaneous urticaria (barzolvolimab)",catalyst:"Global Ph3 in CSU",funding:"Emerging",
  compCME:[["Healio/Vindico — CSU Situation Room","https://www.healio.com/cme/allergy-asthma/20250319/chronic-spontaneous-urticaria-situation-room/overview"]],
  contact:"<a href='mailto:info@celldex.com'>info@celldex.com</a>, (908) 454-7120 · CMO Diane C. Young, MD, SVP · CCO Teri Lawver",
  portal:["None found",""],
  notes:"CCO hire (Nov 2025) signals commercial/med-affairs build-out."},
 {co:"Akero",space:"endocrinology",ta:"MASH (efruxifermin)",catalyst:"Ph3 SYNCHRONY readout",funding:"N",
  compCME:[["Decera/CCO — MASLD & MASH Therapeutics","https://deceraclinical.com/education/activities/gastroenterology/masld-and-mash-therapeutics/27460"]],
  contact:"Web form · (650) 487-6488 · VP Clinical Research & Med Affairs Reshma Shringarpure, PhD",
  portal:["None found",""],
  notes:"Now a Novo Nordisk company — future med-ed funding likely routes via Novo channels."},
 {co:"Inventiva",space:"endocrinology",ta:"MASH (lanifibranor)",catalyst:"Ph3 NATiV3 topline",funding:"N",
  compCME:[["AASLD LiverLearning — Unmasking MASH & MASLD","https://liverlearning.aasld.org/Listing/Unmasking-MASH-and-MASLD-17444"]],
  contact:"<a href='mailto:info@inventivapharma.com'>info@inventivapharma.com</a> · CMO Jason Campagna, MD, PhD · CEO Andrew Obenshain",
  portal:["None found",""],
  notes:"No med-affairs/grants function published yet; leadership page stale."},
 {co:"Structure Therapeutics",space:"endocrinology",ta:"Obesity — oral GLP-1 (aleniglipron)",catalyst:"Advance to Ph3 / partnering",funding:"N",
  compCME:[["ExchangeCME — Managing Obesity in Adolescents","https://www.exchangecme.com/ObesityTop10"]],
  contact:"IR <a href='mailto:ir@structuretx.com'>ir@structuretx.com</a> · CMO Blai Coll, MD, PhD (no med-info mailbox)",
  portal:["None found",""],
  notes:"Clinical-development only; no med-ed signal yet."},
 {co:"Immunovant",space:"immunology",ta:"Autoimmune / FcRn (IMVT-1402)",catalyst:"Multiple Ph3 programs",funding:"N",
  compCME:[["AcademicCME — FcRn Blockers in MG (argenx-funded)","https://academiccme.com/front-matter/updates-on-fcrn-blockers-for-patients-with-myasthenia-gravis-personalized-treatment-strategies-and-shared-decision-making/"]],
  contact:"Web form (medical-information routing) · Durham NC + Basel · CMO role vacant; R&D under CEO Eric Venker, MD, PharmD",
  portal:["None found",""],
  notes:"Well-capitalized (Roivant); no grants program and no current medical leader."},
 {co:"Cabaletta",space:"immunology",ta:"Autoimmune CAR-T (rese-cel — lupus/myositis)",catalyst:"Ph1/2 RESET pivotal trials",funding:"N",
  compCME:[["Cleveland Clinic — Cell Therapy in Autoimmune Disease","https://www.clevelandclinicmeded.com/online/clinical25/article2/default.asp"]],
  contact:"<a href='mailto:contactus@cabalettabio.com'>contactus@cabalettabio.com</a>, +1 267 759 3100 · CMO David J. Chang, MD, MPH",
  portal:["None found",""],
  notes:"Pre-commercial; no med-ed grants yet."},
 {co:"Alumis",space:"immunology",sub:"derm",ta:"Psoriasis — oral TYK2 (ESK-001)",catalyst:"Ph3 ONWARD topline",funding:"N",
  compCME:[["ODAC — JAK/TYK2 Inhibition in Psoriasis","https://orlandoderm.org/jak-tyk2-inhibition-new-frontiers-in-the-treatment-of-psoriasis-virtual-cme-event/"]],
  contact:"<a href='mailto:info@alumis.com'>info@alumis.com</a>, (650) 231-6625 · CMO Jörn Drappa, MD, PhD",
  portal:["None found",""],
  notes:"Pre-commercial; catalyst = ONWARD topline."},
 {co:"Apogee",space:"immunology",sub:"derm",ta:"Atopic dermatitis (APG777)",catalyst:"Ph2 APEX positive → Ph3",funding:"N",
  compCME:[["Clinical Care Options — IL-13 Inhibition in AD","https://clinicaloptions.com/program/dermatology/il-13-inhibition-in-moderate-to-severe-atopic-dermatitis/33851"]],
  contact:"<a href='mailto:info@apogeetherapeutics.com'>info@apogeetherapeutics.com</a> · CMO Carl Dambkowski, MD (HCP routing via form)",
  portal:["None found",""],
  notes:"Pre-commercial; no med-affairs web presence yet."},
 {co:"Denali Therapeutics",space:"raredisease",ta:"Hunter syndrome / MPS II (tividenofusp)",catalyst:"Accelerated approval Mar 2026; US launch underway",funding:"Y",
  compCME:[["NORD — Rare Disease Clinician Resources","https://rarediseases.org/for-clinicians-and-researchers/"]],
  contact:"Grants &amp; Sponsorships / IME portal (below) · med info via corporate site",
  portal:["Grants &amp; Sponsorships portal","https://www.denalitherapeutics.com/grants-sponsorships"],
  notes:"Stood up an IME grant portal at launch — a fresh, engageable rare-disease CME funder now."},
 {co:"Mighty (Stealth BioTherapeutics)",space:"raredisease",ta:"Barth syndrome (elamipretide, Forzinity)",catalyst:"First Barth syndrome approval Sep 2025; rebranded 2026",funding:"Y",
  compCME:[["NORD — Rare Disease Clinician Resources","https://rarediseases.org/for-clinicians-and-researchers/"]],
  contact:"Grants &amp; Sponsorships / IME portal (below)",
  portal:["Grants &amp; Sponsorships portal","https://www.stealthbt.com/grants-sponsorships/"],
  notes:"New commercial rare-disease company with an IME portal — engageable ultra-rare funder."},
 {co:"Zevra",space:"raredisease",ta:"Niemann-Pick type C (arimoclomol, Miplyffa)",catalyst:"First NPC therapy approved 2024; UCD (Olpruva)",funding:"N",
  compCME:[["NORD — Rare Disease Clinician Resources","https://rarediseases.org/for-clinicians-and-researchers/"]],
  contact:"Medical Information via <a href='https://zevra.com/medical-information/' target='_blank' rel='noopener'>zevra.com</a> · no public CME/grants portal found (IIS research only)",
  portal:["None found — IIS only",""],
  notes:"Marketed in ultra-rare NPC; no CME portal yet — watch for one to appear."},
 {co:"Intellia",space:"raredisease",ta:"Hereditary angioedema (in vivo CRISPR, lonvo-z)",catalyst:"Ph3 HAELO positive; rolling BLA; potential launch H1 2027",funding:"N",
  compCME:[["US HAEA / NORD rare-disease education","https://rarediseases.org/for-clinicians-and-researchers/"]],
  contact:"IR <a href='https://ir.intelliatx.com/' target='_blank' rel='noopener'>ir.intelliatx.com</a> · pre-commercial, no grants program",
  portal:["None found",""],
  notes:"First in-vivo CRISPR for HAE; pre-approval — high future education need if launched."},
 {co:"Ocular Therapeutix",space:"ophthalmology",ta:"Wet AMD durability (Axpaxli / OTX-TKI)",catalyst:"Ph3 SOL-1 positive Feb 2026; NDA pending; SOL-R Q1 2027",funding:"N",
  compCME:[["Healio Ophthalmology — Retina education","https://www.healio.com/ophthalmology"]],
  contact:"Medical Affairs via <a href='https://investors.ocutx.com/' target='_blank' rel='noopener'>ocutx.com</a> · no public grants portal yet",
  portal:["None found",""],
  notes:"Highest-probability new retinal launch — build the Medical Affairs relationship ahead of the SOL-R/NDA catalyst."},
 {co:"Viridian",space:"ophthalmology",ta:"Thyroid eye disease (veligrotug, VRDN-001)",catalyst:"BLA accepted, Priority Review (Dec 2025); SC VRDN-003 topline H1 2026",funding:"N",
  compCME:[["MedEdicus — TED education (TEDucation)","https://www.mededicus.com"]],
  contact:"Medical Affairs via <a href='https://ir.viridiantherapeutics.com/' target='_blank' rel='noopener'>viridiantherapeutics.com</a> · no grants portal yet",
  portal:["None found",""],
  notes:"First real Tepezza competitor — TED differentiation education need at launch."},
 {co:"EyePoint",space:"ophthalmology",ta:"Wet AMD / DME (Duravyu, vorolanib TKI)",catalyst:"Ph3 wet-AMD topline mid-2026; DME Ph3 starting",funding:"N",
  compCME:[["Healio Ophthalmology — Retina education","https://www.healio.com/ophthalmology"]],
  contact:"Medical Affairs via <a href='https://investors.eyepointpharma.com/' target='_blank' rel='noopener'>eyepointpharma.com</a> · no grants portal yet",
  portal:["None found",""],
  notes:"Sustained-TKI depot; differentiate vs Axpaxli — relationship play into 2026 readouts."},
 {co:"Sling Therapeutics",space:"ophthalmology",ta:"Thyroid eye disease (oral linsitinib)",catalyst:"Ph2b/3 positive; confirmatory Ph3",funding:"N",
  compCME:[["MedEdicus — TED education (TEDucation)","https://www.mededicus.com"]],
  contact:"Private/pre-IPO — Medical Affairs via <a href='https://slingtherapeutics.com/' target='_blank' rel='noopener'>slingtherapeutics.com</a>",
  portal:["None found",""],
  notes:"First oral TED agent; early — relationship-building, watch for a partner/IPO."},
 {co:"4D Molecular",space:"ophthalmology",ta:"Wet AMD gene therapy (4D-150)",catalyst:"Ph3 topline H1–H2 2027",funding:"N",
  compCME:[["Healio Ophthalmology — Retina education","https://www.healio.com/ophthalmology"]],
  contact:"Medical Affairs via <a href='https://ir.4dmoleculartherapeutics.com/' target='_blank' rel='noopener'>4dmoleculartherapeutics.com</a>",
  portal:["None found",""],
  notes:"Intravitreal (non-surgical) gene therapy; 2027 readout — seed enduring gene-therapy education now."}
];
/* WEEKLY-SUPPORTERS-END */
/* WEEKLY-INTEL-START — the Monday task rewrites ONLY this block in place.
   Competitive intelligence per space: who funded 2025-26 CME, formats/topics, providers
   awarded, unsolicited receptivity, and 12-18mo supporter priorities. Items marked
   (unverified) come from disclosure-line inference, not an award registry. */

const CINTEL_UPDATED = "August 19, 2026";

const CINTEL = {
 cardiovascular:{
   funders2526:"BMS is the most identifiable active CME funder in 2024-2026, appearing via a BMS/Pfizer Alliance (AAFP 'Atrial Fibrillation for Family Physicians,' PeerView 'Making the Connection: Stroke Prevention in AF' curriculum) and a BMS/J&J Alliance (AcademicCME's 2026 Factor XI/HRS podcast series covering LIBREXIA-AF, LILAC-TIMI 76, OCEANIC-AF). J&J/Janssen's own 2021 grants-transparency filing shows historically large VTE/anticoagulation spend (Medscape 'Virtual Antithrombotic Preceptorship' $2.14M; ACC Foundation VTE program $297K; ACCP training $390K) though a current-year filing wasn't locatable to confirm 2025-26 levels. Of the 8 majors checked (Bayer, BMS, Pfizer, J&J, Boehringer Ingelheim, Daiichi Sankyo, Novartis, AstraZeneca), only J&J/Janssen publishes an itemized awarded-grants registry comparable to Lilly's; the rest do not.",
   formats:"Confirmed formats: live/on-demand webcast curricula (PeerView), podcast series tied to major congresses (AcademicCME/HRS), on-demand practice guides and decision-aids (AAFP). No confirmed large-scale live symposia series specific to AF/Factor XI found this pass.",
   topics:"Factor XI/XIa inhibition as the emerging drug class (asundexian, milvexian, abelacimab) alongside DOAC-era guideline updates and stroke-prevention/AF detection gaps; VTE treatment optimization historically funded by J&J.",
   providers:"PeerView Institute, AcademicCME, AAFP (jointly provided), and historically Medscape/WebMD, ACC Foundation, ACCP, Academy for Continued Healthcare Learning (via J&J).",
   receptivity:"Novartis and AstraZeneca both publish standing unsolicited-application portals (Novartis via NGCS, ≥60-day lead time; AZ's MEGO requires ≥60 days pre-program). Bayer accepts unsolicited via its CGA process (≥90 days) and separate sponsorships (≥60 days) but has no AF-specific area of interest currently listed. No company currently has a live, dated, budgeted RFP specifically targeting Factor XI/AF/VTE (the one precedent, a 2023 BMS/Pfizer Alliance AF/VTE RFP, is closed and was ex-US only) — this is a notable white-space signal: funding is flowing through alliance-branded IME grants rather than published RFPs right now.",
   priorities:"Factor XI class readouts are the dominant near-term catalyst: asundexian (Bayer, OCEANIC-STROKE positive Nov 2025), milvexian (BMS/J&J, LIBREXIA-AF & STROKE), and abelacimab (Novartis, via its 2025 Anthos Therapeutics acquisition, LILAC-TIMI 76) are all advancing toward potential approvals in the 2026-2027 window, which typically precedes a wave of guideline-update and MOA-education grant activity — Novartis's Anthos deal in particular signals a new cardiometabolic education entrant to watch.",
   competitorGaps:"Competitors (Medscape, PeerView, AcademicCME, HMP Global) rely on passive formats — expert articles, podcast recaps, webcasts. Medscape offers scripted branching 'Patient Simulations' but nothing AI-driven. No competitor offers AI-powered patient simulations for complex anticoagulation decisions (AF + CKD + bleeding history + frailty). No community-level practice data integration exists. Factor XI inhibitor education is nearly nonexistent (only AcademicCME has a dedicated program). All education is pull-based with no personalized delivery.",
   deceraEdge:"ACTiconsult wins on complex-patient anticoagulation simulation (no competitor). ClinicalThought delivers personalized content (all others use generic newsletters). Conference Coverage enables rapid AI synthesis of OCEANIC-AF/LILAC/LIBREXIA trial data vs. weeks-long competitor lag. Activeer fills the zero-competition gap in cardiovascular peer exchange. Quality Improvement links CME to workflow analysis — entirely unoccupied niche.",
   underservedDecisions:"Factor XI inhibitor positioning (abelacimab vs. milvexian vs. DOACs); device-detected AF duration thresholds for anticoagulation; post-ablation anticoagulation continuation (OCEAN trial); LAA closure vs. medical therapy patient selection (CLOSURE-AF); anticoagulation in complex comorbidities (CKD, active cancer, high bleed risk).",
   competitorFormats:[
    {provider:"Medscape",program:"FXI/XIa Inhibition for Stroke Prevention",format:"On-demand CME",url:"https://www.medscape.org/viewarticle/998576"},
    {provider:"PeerView",program:"Making the Connection: AF 7-Episode MasterClass",format:"Video series CME",url:"https://www.peerview.com/AFcurriculum"},
    {provider:"HMP Global",program:"Western AF Symposium 2026",format:"Live conference",url:"https://www.hmpgloballearningnetwork.com/site/eplab/event/western-atrial-fibrillation-symposium-2026"},
    {provider:"AcademicCME",program:"Beyond Factor Xa: FXI/XIa at HRS 2026",format:"Live satellite",url:"https://academiccme.com/hrs26pre/"},
    {provider:"Pri-Med",program:"FXI Inhibitors CardiologyNOW",format:"Virtual CME",url:"https://www.pri-med.com/online-cme-ce/virtual-cme-program/cardiologynow-july-8-cme-4-cardiology"},
    {provider:"ReachMD",program:"Driving Progress: FXI in ACS & Beyond",format:"On-demand CME",url:"https://reachmd.com/programs/cme/driving-progress-in-cardiology-exploring-the-role-of-fxi-in-acute-coronary-syndromes-beyond/32980/"},
    {provider:"Rockpointe",program:"AF Screening CME Workshop",format:"Live workshop",url:"https://www.rockpointe.com/rockpointe-study-quantifies-impact-of-cme-on-afib-treatment-prompts-new-workshop/"}
   ],
   businessImplications:"Factor XI class approvals (2026-27) trigger $2-5B addressable market across Bayer, BMS/J&J, Novartis — each needs launch education. DOAC patent cliffs (apixaban 2026 EU) force Pfizer/BMS into differentiation vs generics. LAA closure device expansion (Watchman FLX Pro) creates procedural education demand. AF detection wearables (Apple Watch, AliveCor) drive primary-care referral education needs. Each major approval = 12-18 month education funding window."
 },
 nephrology:{
   funders2526:"CONFIRMED this cycle: Genentech/Roche's iMED page explicitly lists IgA Nephropathy among its independent-medical-education focus areas — the first hard confirmation of a named nephrology area of interest at a major funder. Novartis remains the most identifiable active funder following back-to-back IgAN approvals (Fabhalta full approval Jul 2026, Vanrafia/atrasentan accelerated approval Apr 2025) — its NGCS portal lists renal among funded areas and its two-asset IgAN position creates sustained launch-education need. Travere confirmed active via a standing unsolicited IME route tied to Filspari. Otsuka is a long-established renal education funder (ADPKD/tolvaptan history) now adding sibeprenlimab. Apellis funds through Envision (shared portal with its ophthalmology GA programs). AstraZeneca funds CKD/cardio-renal education through its MEGO office, and Bayer names Cardio-Kidney-Metabolic as a standing area of interest. (unverified) No nephrology-specific itemized award registry was locatable for any of these — unlike Lilly in endocrine — so 2025-26 amounts are inferred from acknowledgment lines rather than confirmed filings.",
   formats:"Confirmed formats skew to on-demand webcast curricula and case-based modules (NKF and ASN-adjacent providers), congress-tied satellite symposia at ASN Kidney Week and NKF Spring Clinical Meetings, and society-delivered guideline-implementation programs (KDIGO). Podcast and QI-initiative formats are notably thin in nephrology compared with cardiology and endocrine — a genuine format white space.",
   topics:"IgA nephropathy sequencing and combination strategy is the dominant funded topic; eGFR-slope as a surrogate endpoint and what accelerated-to-full-approval conversions mean for practice; lupus nephritis combination therapy (voclosporin, obinutuzumab, belimumab); complement-mediated glomerular disease (C3G, IC-MPGN); CKD in T2D and the cardio-kidney-metabolic framing. NOT well funded and clearly underserved: transplant nephrology, dialysis-population decision-making, and pediatric glomerular disease.",
   providers:"CONFIRMED active in IgAN education right now: American Kidney Fund (free accredited course 'A New Paradigm in IgAN Management — Advancing Clinical Practice in the Era of Therapeutic Expansion'), Columbia University Irving Medical Center (half-day IgAN course, plus an IgA Nephropathy 2027 precision-medicine course already scheduled), FreeCME (KDIGO guideline + newly approved therapies), myCME (two IgAN activities), and ASN's CME opportunities portal. National Kidney Foundation, Medscape Nephrology, PeerView, Clinical Care Options (Decera) and RMEI also appear as hosts (unverified for 2025-26 award amounts). Note Columbia has ALREADY booked a 2027 IgAN course — the sequencing topic is being claimed now, so move quickly.",
   receptivity:"Novartis (NGCS, ≥60 days), Otsuka (≥60 days), Travere (≥60 days) and AstraZeneca (MEGO, ≥60 days) all publish standing unsolicited routes. Apellis accepts unsolicited via Envision at ≥60 days. Vertex has no nephrology grant program yet — povetacicept would be its first renal launch, so this is a relationship-building rather than submit-ready target, and the same applies to Vera Therapeutics. No live dated nephrology RFP with a disclosed budget was found this pass.",
   priorities:"UPDATED 11 Aug 2026 — the IgAN field has now largely LANDED rather than being pending. The National Kidney Foundation's own count is SIX approved agents, and Fabhalta (iptacopan) converted to TRADITIONAL approval on 17 Jul 2026 as the first and only complement inhibitor shown to significantly slow kidney function decline — the class's first hard eGFR outcome, which moves the teaching point from 'proteinuria is a surrogate' to 'one agent has function data and the others do not'. Approved: Tarpeyo, Filspari, Vanrafia, Fabhalta (traditional approval on eGFR slope), Otsuka Voyxact/sibeprenlimab (Nov 2025), and Vera Trutakna/atacicept (accelerated, 7 Jul 2026). Still pending: Vertex povetacicept with an FDA action date of 30 Nov 2026, and Novartis zigakibart in Ph3 BEYOND. That means FIVE approved mechanisms with no head-to-head data — sequencing education demand is immediate, not forward-looking. Vera now has its first-ever commercial product and should be courted now rather than warmed up. Vertex is the remaining pre-launch window. Roche's primary membranous nephropathy decision (Nov 2026) opens a second, near-empty education field.",
   competitorGaps:"Nephrology education is thinner and more society-dominated than any other space in this hub — NKF and ASN carry most of it, with commercial providers holding a much smaller share than in cardiology or immunology. Almost all of it is passive: guideline summaries, congress recaps, expert commentary. No competitor offers decision-support education for the IgAN sequencing problem, which is the single most confusing clinical decision in the space right now. Transplant and dialysis-population education is close to absent commercially. No AI-driven or simulation-based nephrology education was found.",
   deceraEdge:"ACTiconsult maps directly onto IgAN sequencing — a genuinely unsolved multi-variable decision (proteinuria level, eGFR slope, prior therapy, immunosuppression tolerance) with no competitor tool. ClinicalThought can deliver personalised updates through a field where readouts are landing every few months. Conference Coverage has an unusually clean opening at ASN Kidney Week and NKF SCM, where synthesis currently lags weeks. The thin provider field means share is available at lower competitive cost than in crowded spaces.",
   underservedDecisions:"IgAN agent sequencing and combination (four-plus mechanisms, no head-to-head data); when eGFR slope justifies switching therapy; lupus nephritis triple-therapy strategy after two 2025 approvals; recognising and treating C3G/IC-MPGN where most nephrologists have never prescribed a complement inhibitor; SGLT2 plus nsMRA plus GLP-1 layering in diabetic kidney disease; transplant immunosuppression minimisation; anticoagulation in advanced CKD (overlaps the cardiovascular space).",
   competitorFormats:[
    {provider:"National Kidney Foundation",program:"NKF Spring Clinical Meetings — IgAN & glomerular disease track",format:"Live conference + on-demand",url:"https://www.kidney.org/spring-clinical"},
    {provider:"American Society of Nephrology",program:"Kidney Week satellite symposia & Board Review",format:"Live symposia",url:"https://www.asn-online.org/education/kidneyweek/"},
    {provider:"Medscape",program:"IgA Nephropathy: Evolving Treatment Landscape",format:"On-demand CME",url:"https://www.medscape.org/sites/advances/iga-nephropathy"},
    {provider:"PeerView",program:"Targeting the Pathogenesis of IgA Nephropathy",format:"Video series CME",url:"https://www.peerview.com/nephrology"},
    {provider:"KDIGO",program:"Glomerular Diseases Guideline Implementation",format:"Guideline + live workshops",url:"https://kdigo.org/guidelines/gd/"},
    {provider:"RMEI Medical Education",program:"Complement-Mediated Kidney Disease",format:"On-demand CME",url:"https://www.rmei.com/"}
   ],
   businessImplications:"IgA nephropathy went from one approved therapy in 2021 to eight-plus approved or filed assets by 2027 across Novartis (two), Travere, Calliditas, Otsuka, Vertex and Vera — every one of them needs sequencing education because there are no head-to-head trials. Vertex and Vera are approaching first-ever renal commercial products, which is historically the moment a company stands up an IME budget — earliest and highest-value relationship window in this hub. Roche's primary membranous nephropathy priority review (Nov 2026 action date) opens a second launch window in an indication with almost no existing education. C3G and IC-MPGN received first-ever therapies in 2025, meaning prescriber familiarity is near zero and education demand is structural rather than promotional. The provider field in nephrology is thinner than cardiology or immunology, so competitive cost of entry is lower. Cardio-kidney-metabolic framing (Bayer, AstraZeneca, Boehringer) lets a single concept draw funding from cardiovascular, endocrine and nephrology budgets simultaneously."
 },
 endocrinology:{
   funders2526:"Lilly is confirmed (via direct fetch of its own transparency registry) as the most active, most transparent funder: its Q1 2026 filing alone lists 18 Endocrine-category awards (obesity, T2D, once-weekly insulin, OSA) to recipients including PeerView, ACHL, Pri-Med Institute, AACE/Endocrine Society, and the ADA; its full-year 2025 filing adds ~40 more, with Clinical Care Options (Decera) receiving 4 separate obesity/T2D grants. Novo Nordisk confirmed active via two closed-but-informative 2025 obesity RFPs (CGA-APR25-ObEarly/ObHighlights, ex-US/UK) and a confirmed ACP 'Obesity Management: Pharmacotherapy' grant (credit through April 2027). Amgen's standing Areas of Interest explicitly name obesity/GIP-GLP-1 biology as active, though no dated RFP was found.",
   formats:"Lilly funds mainly accredited educational programs and healthcare-improvement/QI initiatives (e.g., Kaiser CGM population-health projects), plus fellowships (Endocrine Society Obesity Fellows Program, Univ. of Puerto Rico endocrinology fellowship). Novo Nordisk's confirmed RFPs were structured as ex-US regional CME programs; its ACP grant funded an online learning-center course.",
   topics:"Once-weekly basal insulin transition education, obesity pharmacotherapy and destigmatization, incretin/amylin combination therapy (Lilly RFP language explicitly references 'emerging biologics, e.g. amylin'), pediatric obesity, and cardiometabolic risk in T2D.",
   providers:"PeerView/PVI, Clinical Care Options (Decera), ACHL, AKH Inc., Medical Learning Institute, Med Learning Group, Pri-Med Institute, The France Foundation, and professional societies (AACE, Endocrine Society, ADA, ACP) all confirmed as recent Lilly or Novo recipients.",
   receptivity:"Lilly (lillygrantoffice@lilly.com) and Amgen (hccime@amgen.com, ≥60-day lead time) both run standing rolling/unsolicited programs. Madrigal's portal is confirmed open and rolling for MASH education specifically. Novo Nordisk's obesity RFPs are periodic and closed as of this pass; no live 2026 Novo obesity/diabetes/MASH RFP was located despite its clear funding appetite — worth monitoring for a reissue.",
   priorities:"The oral-GLP-1 race (Lilly's orforglipron approaching filing; Novo's CagriSema) and next-generation combination mechanisms (retatrutide targeted for 2027 filing per Lilly; Amgen's MariTide; Boehringer/Zealand's survodutide) will likely drive a new wave of MOA and patient-selection education as each nears launch. MASH (resmetirom/Madrigal, semaglutide's MASH indication) remains an explicit Novo and Madrigal funding priority. Roche/Genentech's petrelintide (amylin analog) is advancing through Phase 3 but shows no discoverable IME/CME grant footprint yet — a white-space/pre-launch signal rather than current opportunity.",
   competitorGaps:"Competitors rely on on-demand webinars and video lectures (Medscape, PeerView podcast, Pri-Med, AACE). PlatformQ uses game-based puzzles; Rockpointe tried Alexa voice-based CME. France Foundation's CaseCoach is the sole AI-powered CME tool found — focused narrowly on communication skills, not clinical decision-making. No community-level practice data benchmarking exists. No AI-matched personalized education delivery. Conference coverage is universally delayed and static.",
   deceraEdge:"ACTiconsult addresses demand CaseCoach proves but only partially fills — GLP-1 dose titration, MASH fibrosis staging, treatment sequencing simulations. ClinicalThought is the only AI-matched email education in the space (all competitors use generic blasts). Conference Coverage enables rapid AI synthesis of AACE/ObesityWeek/EASL data vs. weeks-long lag. Activeer provides peer HCP discussion forums tied to accredited education (no competitor). Quality Improvement is entirely unoccupied.",
   underservedDecisions:"GLP-1 RA sequencing/switching (tirzepatide vs. semaglutide vs. survodutide) after inadequate response; MASH fibrosis risk stratification in primary care (FIB-4 use, hepatology referral, resmetirom initiation); managing GLP-1 discontinuation and weight regain; obesity-MASH-T2D intersection (which condition first, cross-specialty coordination).",
   competitorFormats:[
    {provider:"Medscape",program:"Obesity & Weight Management CME Hub",format:"On-demand hub",url:"https://www.medscape.org/resource/obesity/cme"},
    {provider:"PeerView",program:"Endocrinology & Diabetes CME Podcast",format:"Audio/video podcast",url:"https://podcasts.apple.com/us/podcast/peerview-endocrinology-diabetes-cme-cne-cpe-audio-podcast/id156791119"},
    {provider:"HMP/Vindico",program:"Obesity Forum + Amylin Arcade",format:"Live event + gamified",url:"https://vindicocme.com/obesityforum/"},
    {provider:"ReachMD",program:"Obesity CME Hub",format:"On-demand portal",url:"https://reachmd.com/cme/obesity/"},
    {provider:"Pri-Med",program:"The Weight of Diabetes: Synergistic Approach",format:"Interactive module",url:"https://www.pri-med.com/online-cme-ce/interactive-learning/weight-of-diabetes"},
    {provider:"Decera/CCO",program:"Building a Comprehensive Obesity Care Clinic",format:"On-demand CME",url:"https://deceraclinical.com/education/activities/internal-medicine/obesity-clinic/17384-25053/info"}
   ],
   businessImplications:"GLP-1 market exceeds $50B+ globally by 2026 — Novo Nordisk, Lilly, Amgen all fund launch education. Oral GLP-1 race (orforglipron, oral semaglutide) creates differentiation-education demand. MASH is a new $10B+ market (resmetirom first-in-class 2024) with Madrigal + Novo Nordisk actively funding. Insurance/access barriers for GLP-1s drive managed-care education needs. Each new indication (HFpEF, CKD, OSA, MASH) expands the addressable HCP audience beyond endocrinology."
 },
 immunology:{
   funders2526:"Verified via Lilly's own published grant registry (rare, most companies don't disclose one): 61 immunology grants in FY2025 to Medscape/WebMD, Med Learning Group (highest volume, 7 grants), Health Sciences Educational Institute, Clinical Care Options, FRED Education Group/CMEsquared, HMP Education, PeerView, AGA Institute, Crohn's & Colitis Foundation, National Psoriasis Foundation and multiple academic centers. Confirmed live 2026 RFPs: Novartis ($225K autoimmune CAR-T, closed 7/31/26), argenx (CIDP + MMN RFPs), Genentech ($200K MOGAD, closed 7/24/26), J&J (CAR-T implementation science, extended to 8/7/26).",
   formats:"Educational Program grants dominate, but a distinct 'Healthcare Improvement/QI' grant type is now common (Lilly funded 4+ QI-specific programs); enduring modules ≥12 months are explicitly requested in argenx's RFPs; fellowship-support grants also appear (Cleveland Clinic APP IBD Fellowship).",
   topics:"IBD treat-to-target & advanced-therapy inertia; a striking 10+ Lilly grants pair obesity/GLP-1 with IMID care (psoriasis, PsA, IBD) — a genuine white-space angle. Elsewhere: cell therapy in autoimmune disease (the single hottest funded topic — simultaneous Novartis + J&J CAR-T RFPs), lupus (Biogen's CLE/SLE AOI is the most detailed in the industry), FcRn in gMG/CIDP, complement/IgAN (six-plus agents in 24 months with no sequencing guidance yet).",
   providers:"Medscape/WebMD (highest-volume Lilly grantee), Med Learning Group, Health Sciences Educational Institute, Clinical Care Options (now rebranded Decera Clinical Education), FRED Education Group/CMEsquared, HMP Education, PeerView, AGA Institute, American College of Gastroenterology, Crohn's & Colitis Foundation, National Psoriasis Foundation, plus academic centers (Cleveland Clinic, Rush, Harvard, Tufts).",
   receptivity:"LIVE DATED RFP CONFIRMED 5 Aug 2026 — Novartis Office of Grants & Education has an open Professional Medical Education RFP in Immune Thrombocytopenic Purpura (ITP), up to $400,000 total support for 2026. One of very few immunology calls with a disclosed budget — check it before it closes. Most receptive: argenx (explicitly reviews unsolicited proposals alongside RFPs), Amgen (unsolicited-only, rolling, any start date), Genentech/Roche (broadest on-target disease list), Novartis, Biogen (detailed published lupus AOI). Timing-blocked right now: Merck/MSD (portal closed to new IME through July 2026), GSK (zero immunology areas open), BMS/Takeda (RFE/CGA tables currently empty), Pfizer (no active I&I RFPs). Effectively closed: AbbVie (IME Provider Network only).",
   priorities:"UPDATED 11 Aug 2026 — two new competitive fronts opened this month. FIRST, hidradenitis suppurativa has gone from an orphan interest to a four-sponsor market inside eighteen months: Incyte has positive Ph3 data for oral povorcitinib and guides ruxolitinib cream topline to Q4 2026, UCB has paediatric bimekizumab data in H2 2027, and Avalo starts a registrational Ph3 in H1 2027. Almost no CME exists at the mild end where most patients sit. SECOND, psoriasis has moved paediatric and first-line simultaneously — Arcutis expanded Zoryve (roflumilast) 0.3% cream down to AGE 2 including intertriginous disease, and J&J's icotrokinra was approved as a first-line oral peptide for ages 12+. Both create a primary-care and paediatric audience that current psoriasis education, written for dermatologists managing adult biologic candidates, does not address. (3) Cell therapy in autoimmune disease — Kyverna's rolling BLA for stiff-person syndrome would likely be the first FDA-approved autoimmune CAR-T; Cabaletta's myositis BLA planned 2027. This is the widest competency gap in the field. (2) Lupus wave — Genentech's obinutuzumab approved in lupus nephritis (Oct 2025) with an SLE decision due Dec 2026; AstraZeneca's anifrolumab now subcutaneous/self-administered. (3) FcRn expansion — argenx's efgartigimod label now covers all adult gMG patients; myositis topline due Q3 2026. (4) Complement/IgAN — six-plus agents approved across three mechanisms in 24 months (Novartis iptacopan, Otsuka sibeprenlimab, Vera atacicept) with sequencing strategy still unaddressed. (5) TYK2/oral small molecules — BMS's deucravacitinib now in PsA without the JAK boxed warning; hold the line that no regulatory softening of the JAK class warning has occurred despite some academic commentary suggesting it. (6) Biosimilars — FDA's Oct 2025 draft guidance may remove switching-study requirements; Amgen and Organon both list this as an open funding area.",
   competitorGaps:"RMEI has strong RA coverage via proprietary formats (Clinical Convergence, Clinical Consults). HMP Global runs an Autoimmune Learning Network. PeerView and RMEI dominate audio/video. No competitor offers AI-driven patient simulations for autoimmune diseases. No structured lupus flare-triage protocols integrating SLEDAI scoring with treatment selection. No patient-specific JAK inhibitor risk/benefit frameworks (post-ORAL Surveillance). No practical biosimilar switching guidance despite ustekinumab off-patent with multiple biosimilars launching. No subtype-guided SLE treatment selection tools.",
   deceraEdge:"ACTiconsult is uniquely positioned for lupus flare management simulation and JAK inhibitor risk stratification — no competitor offers this. Activeer addresses diagnostic delay in Sjogren's (4-7 yr avg) and MG by enabling community HCP discussions for rare disease pattern recognition. Conference Coverage captures TYK2 inhibitor class emergence (zasocitinib entering Phase 3) before competitors build structured CME. Quality Improvement addresses multidisciplinary co-management workflows for lupus (rheum + nephrology + derm).",
   underservedDecisions:"Lupus flare management algorithms; JAK inhibitor candidacy risk stratification; biosimilar switching protocols; rare disease diagnostic pathways (Sjogren's, MG, IgG4-RD); TYK2 inhibitor positioning vs. existing biologics; SLE patient stratification/subtyping; complement/IgAN treatment sequencing (6+ agents, 3 mechanisms, no guidance).",
   competitorFormats:[
    {provider:"Medscape",program:"IBD Patient Simulation Challenge",format:"Patient simulation",url:"https://www.medscape.org/viewarticle/test-your-skills-managing-ibd-practice-patient-simulation-2025a10010cn"},
    {provider:"ReachMD",program:"Myasthenia Matters: gMG Learning Center",format:"12-month journey",url:"https://reachmd.com/cme/gMGmatters/"},
    {provider:"HMP Global",program:"Advances in IBD 2026 (25th Anniv)",format:"Live conference",url:"https://www.hmpglobalevents.com/aibd"},
    {provider:"AcademicCME",program:"B-Cell Depleting Therapies in Sjogren's",format:"On-demand CME",url:"https://academiccme.com/front-matter/novel-b-cell-depleting-targeted-therapies-to-improve-outcomes-in-patients-with-sjogrens-disease/"},
    {provider:"CheckRare",program:"MG & FcRn Education Hub (6+ modules)",format:"On-demand modules",url:"https://checkrare.com/learning/p-myasthenia-gravis-clinical-research-highlights/"},
    {provider:"PeerView",program:"TL1A Targeting in IBD",format:"On-demand CME",url:"https://ww2.peerview.com/specialty/gastroenterology"}
   ],
   businessImplications:"Autoimmune CAR-T is the single highest-growth education opportunity — Kyverna BLA 2026, Cabaletta 2027, no structured CME exists. FcRn class expansion (argenx Vyvgart $5.6B run-rate) drives CIDP/Sjogren's/myositis education. IgAN has 6+ new agents across 3 mechanisms in 24 months with zero sequencing guidance. IBD TL1A class (Merck tulisokibart lead) creates new MOA education cycle. Lupus wave (Genentech obinutuzumab + AZ anifrolumab SC) = $3B+ addressable market needing HCP education."
 },
 raredisease:{
   funders2526:"Alnylam is confirmed as a currently rigorous grant-RFP funder: its ALNY-RFP-TTR-13 ('Advancing Clinical Decision-Making in ATTR-CM,' up to $250K/proposal, closed May 2026) demonstrates real recent budget commitment even though now expired. Pfizer ran a comparable ATTR-CM shared-decision-making RFP (up to $250K, closed June 2026); its currently open competitive-grants RFPs sit OUTSIDE this hub's scope (haemophilia and vaccines), so Pfizer has no dated in-scope rare-disease call right now. argenx is the most currently active neuromuscular funder with two RFPs freshly posted in July 2026 (CIDP and MMN competence-gap programs, superseding a March 2025 CIDP RFP) plus a rolling 2026 Neuromuscular Fellowship. Ultragenyx confirmed as genuinely 'open unsolicited' year-round across MPS VII, MPS IIIA, LC-FAOD, GSD1a, HoFH, and XLH/TIO.",
   formats:"RFP-driven single-project grants with milestone-based payouts (Pfizer, Alnylam) are the dominant format for ATTR-CM; argenx funds competence-gap educational programs plus a dedicated neuromuscular fellowship; Ultragenyx and Sarepta run rolling/cyclical medical-education and fellowship windows (Sarepta's 2027 cycle: Medical Education June 15-Nov 15, 2026; Fellowship July 13-Nov 13, 2026).",
   topics:"ATTR-CM diagnosis/decision-support tools and shared decision-making are the most-funded topic (Alnylam, Pfizer both ran near-identical $250K RFPs on this theme independently); CIDP and MMN competence gaps (argenx); ultra-rare metabolic disease education (Ultragenyx's named conditions); HAE attack management education (confirmed funded by Intellia, Pharming, and Pharvaris jointly on an RMEI/HAEA-affiliated module — notably not by any of the three 2025-approved HAE drugs, garadacimab/CSL, sebetralstat/KalVista, or donidalorsen/Ionis, a correction worth flagging).",
   providers:"RMEI Medical Education (HAE, jointly with US HAEA), plus RFP-responding providers not separately named in the sourced RFPs; Sarepta and Ultragenyx route through CyberGrants-hosted portals rather than naming providers directly.",
   receptivity:"LIVE DATED RFPs CONFIRMED 5 Aug 2026 — Ipsen has an open RFP in RARE LIVER disease (early recognition, screening and diagnosis), deadline 12 Aug 2026, which is tight; Paratek has a submission deadline of 27 Aug 2026. Ultragenyx and argenx are both confirmed as accepting unsolicited applications alongside RFPs. Important correction: Ionis's own grants page states ATTR-CM/ATTR-PN IME requests are now routed to and reviewed by AstraZeneca, its commercialization partner for eplontersen (Wainua) — Ionis is not the right direct target for ATTR-CM educational-grant outreach going forward. Recordati's disclosed areas of interest (endocrinology, metabolic, oncology) do not include ATTR/HAE/complement/neuromuscular, making it likely irrelevant to this space despite being a rare-disease-branded company.",
   priorities:"ATTR-CM remains the most fought-over rare-cardiac education topic, with both Alnylam and Pfizer independently funding near-identical $250K shared-decision-making RFPs within months of each other — signaling the category is crowding as more agents compete post-launch. The 2025 HAE approval wave (garadacimab, sebetralstat, donidalorsen) has not yet translated into confirmed CME funding from those specific companies, a possible near-term white-space opportunity. argenx's back-to-back CIDP and MMN RFPs (both posted July 2026) mark it as the most currently active neuromuscular educational funder to approach now.",
   competitorGaps:"Competitors use slide-based online courses (Medscape), phased live+online modules (RMEI/HAEA for HAE), short-form 15-30 min videos (CheckRare, ReachMD). Complement-mediated diseases have almost no dedicated CME despite multiple new approvals (iptacopan, pegcetacoplan, danicopan). IgA nephropathy CME lags the rapidly evolving treatment landscape. No cross-condition integration connecting complement biology across HAE, IgAN, C3G, and PNH. Primary care gap — diagnostic delay remains 7-10 years; CME skews toward specialists, leaving referring physicians underserved. No interactive patient simulations or community-level practice data.",
   deceraEdge:"ACTiconsult enables AI patient simulations for rare disease diagnostic odyssey scenarios (e.g., 'patient presents with recurrent swelling — is it HAE or allergic angioedema?'). ClinicalThought targets nephrologists on IgAN sequencing and cardiologists on ATTR-CM where education is fragmented. Activeer bridges specialists and PCPs on rare disease recognition via community discussions. Conference Coverage delivers rapid synthesis of complement biology data across ASH, ACR, ASN meetings.",
   underservedDecisions:"When to suspect rare disease in primary care; ATTR-CM vs. HFpEF differential diagnosis; IgAN treatment sequencing post-sparsentan; complement inhibitor selection across indications; HAE attack management with new oral agents.",
   competitorFormats:[
    {provider:"CheckRare",program:"ATTR Amyloidosis Resource Hub",format:"Multi-format hub",url:"https://checkrare.com/attr-amyloidosis/"},
    {provider:"CheckRare",program:"HAE: Current & Future Treatment Options",format:"On-demand education",url:"https://checkrare.com/learning/p-hereditary-angioedema-current-and-future-treatment-options/"},
    {provider:"ReachMD",program:"ATTR-CM Learning Center",format:"On-demand portal",url:"https://reachmd.com/cme/attr-learning-center/"},
    {provider:"ReachMD",program:"Spotlight on Duchenne Muscular Dystrophy",format:"Podcast/video series",url:"https://reachmd.com/programs/spotlight-duchenne-muscular-dystrophy/"},
    {provider:"RMEI",program:"HAE: Innovative Therapeutic Strategies",format:"Case-based CME",url:"https://www.rmei.com/ce_activity/case-challenges-in-hereditary-angioedema-innovative-therapeutic-strategies-for-a-normal-life-a-care-team-forum/"},
    {provider:"PlatformQ/NORD",program:"109+ Rare Disease CME Sessions",format:"Webinars",url:"https://www.platformqhealth.com"}
   ],
   businessImplications:"ATTR-CM is the most fought-over rare-disease education topic — Alnylam + Pfizer both ran $250K+ identical RFPs. 2025 HAE approval wave (3 new drugs) hasn't yet translated to CME funding → white-space window. argenx's $5.6B Vyvgart run-rate makes it the largest neuromuscular funder. Gene therapy launches (Sarepta Elevidys, Vertex exagamglogene) create procedural/patient-selection education needs. Complement biology connects PNH/C3G/IgAN/aHUS — a single-mechanism teaching arc across 4 diseases with $10B+ combined market."
 },
 ophthalmology:{
   funders2526:"Apellis (Syfovre/GA) and Astellas/Iveric (Izervay/GA) — the two head-to-head GA funders, via Evolve, Retina Today, Medscape, Vindico; Regeneron (Eylea/Eylea HD web series + live symposia via Vindico's Retina Master Class, 11 activities/4,000+ providers, and Healio Rapid Reviews in Retina); Genentech (Vabysmo/Susvimo live symposia via Vindico at Retina World Congress/OSN NY); Amgen (Tepezza/TED — confirmed unrestricted grant to MedEdicus's TEDucation podcast/campaign); AbbVie/Allergan (DME, glaucoma via Healio, AVTT); Bausch+Lomb & Alcon (dry eye/glaucoma via Vindico, Healio).",
   formats:"Live/satellite symposia (Vindico at Retina World Congress, OSN NY, Women in Ophthalmology; ASRS satellites), enduring/on-demand (Evolve, Medscape, PeerView), webinar series (Vindico Retina Master Class), podcasts (MedEdicus TED, Healio Retina Radar), journal-based supplements (Medscape, Retina Today), case-based (Healio Ace the Case, Medscape GA cases).",
   topics:"Geographic atrophy is the most-funded topic (Apellis vs Astellas battleground); wet-AMD/nAMD durability; DME/diabetic retinopathy (broad multi-supporter); retinal gene therapy; TED (essentially Amgen single-supporter); dry eye/Demodex; glaucoma. Uveitis/myopia see negligible funding.",
   providers:"Vindico Medical Education/Healio (richest confirmed disclosures), Evolve Medical Education (Apellis GA), Medscape, MedEdicus (TED), Retina Today. ASRS, AAG, RMEI and PeerView are active but specific supporters not surfaced. No 2025-26 ophthalmology activity confirmed for PRIME, i3 Health, Med Learning Group, Rockpointe, PIM.",
   receptivity:"Best-documented open doors: Amgen (TED, explicit named topics, unsolicited), Alcon (published annual Educational Goals — but portal is currently CLOSED, reopening Fall 2026 for 2027), Tarsus (Demodex, unsolicited, 45-60 day lead), Bausch+Lomb (unsolicited via caring@bausch.com), Apellis & Astellas (both accept unsolicited GA proposals). Regeneron and Genentech run portals but post named RFPs with no confirmed open ophthalmology call — monitor rather than assume open.",
   priorities:"(1) Wet-AMD durability & sustained delivery — Ocular Therapeutix's Axpaxli (Ph3 SOL-1 positive) and EyePoint's Duravyu are the two highest-probability near-launch competitors to Eylea HD/Vabysmo. (2) TED turning competitive — Viridian's veligrotug under Priority Review and Sling's oral linsitinib both challenge Amgen's Tepezza monopoly. (3) Intravitreal gene therapy — 4D Molecular and Adverum (being acquired by Lilly) readouts cluster Q1 2027, a genuinely new non-surgical delivery education need. (4) GA safety narrative — Syfovre's vasculitis-monitoring story continues to mature alongside Izervay's cleaner profile.",
   competitorGaps:"Vindico/Healio is dominant retina-specific player (Retina Master Class, Retina360). Evolve strong in GA (Apellis). Everything is passive lecture or slide deck — interactive/simulation-based formats are essentially absent. Geographic atrophy education is a major gap: high real-world treatment attrition, confusion around patient selection for Syfovre vs. Izervay, and same-day co-administration logistics poorly addressed. RVO receives significantly less CME attention than wet AMD or DME. Few programs bridge retina specialists with referring providers (PCPs, endocrinologists for DME).",
   deceraEdge:"ACTiconsult enables AI patient simulations for GA treatment initiation decisions ('which GA patients benefit most from complement inhibition?') and anti-VEGF switching/extending scenarios. Quality Improvement provides workflow analysis for injection clinics managing Eylea HD vs. Vabysmo dosing intervals and GA co-administration scheduling. Activeer enables community discussions among retina specialists on real-world GA persistence challenges. Conference Coverage delivers rapid synthesis from AAO, ARVO, Retina Society.",
   underservedDecisions:"GA patient selection and persistence optimization; anti-VEGF biosimilar switching protocols; Eylea HD vs. Vabysmo treatment selection; RVO acute management pathways; DME co-management with endocrinology.",
   competitorFormats:[
    {provider:"Vindico/HMP",program:"Retina Master Class (14-part CME)",format:"Multi-format program",url:"https://vindicocme.com/vindico-medical-education-in-collaboration-with-healio-cme-launches-retina-master-class/"},
    {provider:"HMP/Ophthalmology 360",program:"GA Diagnosis & Management CME",format:"On-demand CME",url:"https://ophthalmology360.com/cmece/"},
    {provider:"PeerView",program:"Seeing Their Future (DR/DME series)",format:"Self-study CME",url:"https://peerview.com/SeeingTheirFuture"},
    {provider:"Medscape",program:"AMD & Retinal Disease CME Hub",format:"On-demand hub",url:"https://www.medscape.org/resource/amd/cme"},
    {provider:"RMEI",program:"Strategies to Alleviate DME/nAMD Treatment Burden",format:"On-demand CE",url:"https://www.rmei.com/ce_activity/looking-to-the-horizon-strategies-to-alleviate-the-burden-of-dme-and-namd-treatment/"},
    {provider:"ReachMD",program:"Eye on Ocular Health Podcast",format:"Podcast series",url:"https://reachmd.com/programs/eye-on-ocular-health/"}
   ],
   businessImplications:"Anti-VEGF market exceeds $15B globally — Regeneron (Eylea franchise), Roche (Vabysmo), AbbVie (Duravyu) all need differentiation education. GA complement inhibitors (Apellis Syfovre, Astellas Izervay) are year-2 launches needing real-world outcome education. Lytenava (ophthalmic bevacizumab) approval disrupts payer/formulary education landscape. Gene therapy (Ixo-vec/Lilly) targets retina specialists with procedural education needs. Biosimilar anti-VEGF wave (aflibercept, ranibizumab) forces switching education. CCO/Decera has zero ophthalmology presence — greenfield opportunity."
 }
};
/* WEEKLY-INTEL-END */
/* WEEKLY-SUPSTRAT-START — the Monday/Thursday task rewrites ONLY this block in place.
   Per-supporter strategy profile. Keys must match the canonical names produced by
   supCanon(). Shape:
   {approvals, financial, pipeline, conferences, keywords:[], quarterly, eduGap}
   Anything not confirmed from a primary source must be marked (unverified). */

const SUPSTRAT_UPDATED = "August 19, 2026";

const SUPSTRAT = {
 "Novartis":{
   quarters:[["Q1 2026","reported","https://www.novartis.com/investors/financial-data/quarterly-results","late Apr 2026","Renal and immunology named as growth pillars; Fabhalta IgAN conversion flagged."],["Q2 2026","reported","https://www.novartis.com/investors/financial-data/quarterly-results","mid Jul 2026","Full-year guidance reaffirmed; abelacimab LILAC-TIMI 76 interim guided before year-end 2026."],["Q3 2026","upcoming","https://www.novartis.com/investors/financial-data/quarterly-results","~late Oct 2026",""],["Q4 / FY 2026","upcoming","https://www.novartis.com/investors/financial-data/quarterly-results","~early Feb 2027",""]],
   links:[["📊 Quarterly results","https://www.novartis.com/investors/financial-data/quarterly-results"],["💰 Grants portal","https://www.novartis.com/us-en/healthcare-professionals/external-funding/educational-grants/professional-medical-education-grants"],["📰 Newsroom","https://www.novartis.com/news"],["🧪 Pipeline","https://www.novartis.com/research-development/novartis-pipeline"]],
   approvals:"Fabhalta (iptacopan) traditional approval in primary IgAN on eGFR slope, Jul 2026 — converted from accelerated. Vanrafia (atrasentan) accelerated approval IgAN Apr 2025. Rhapsido (remibrutinib) approved CSU 2025. Fabhalta previously first-ever C3G approval Mar 2025.",
   financial:"Q2 2026 reaffirmed full-year guidance and flagged abelacimab LILAC-TIMI 76 interim as a before-year-end event. Renal and immunology named as growth pillars; the Anthos and Chinook acquisitions were both bought explicitly to build those franchises.",
   pipeline:"abelacimab (FXI/XIa, Ph3 LILAC); zigakibart (anti-APRIL, Ph3 BEYOND in IgAN); ianalumab (BAFF-R, Ph3 positive Sjögren's, ongoing SLE); PKN605 (Ph2 AF).",
   conferences:"ASN Kidney Week, ERA, ESC Congress, EADV, ACR Convergence. Kidney Week is the single highest-value Novartis-adjacent nephrology venue given two IgAN assets.",
   keywords:["eGFR slope","complement","IgA nephropathy","oral complement inhibitor","proteinuria reduction","Factor XI","hemostasis-sparing","chronic spontaneous urticaria"],
   quarterly:"Publishes quarterly results with pipeline milestone tables, but does NOT publish an itemised educational-grant registry. (unverified) Award amounts can only be inferred from acknowledgment lines.",
   eduGap:"Two IgAN mechanisms in one portfolio and no head-to-head data — sequencing education is the obvious concept and nobody is delivering it well."
 },
 "Eli Lilly":{
   quarters:[["Q1 2026","reported","https://investor.lilly.com/quarterly-results","late Apr 2026","Obesity/cardiometabolic dominate; 18 Endocrine education awards posted in the Q1 grant registry."],["Q2 2026","reported","https://investor.lilly.com/quarterly-results","early Aug 2026","Retatrutide BLA guided Q1 2027 — the 2027 launch-education runway is now explicit."],["Q3 2026","upcoming","https://investor.lilly.com/quarterly-results","~early Nov 2026",""],["Q4 / FY 2026","upcoming","https://investor.lilly.com/quarterly-results","~early Feb 2027",""]],
   links:[["📊 Quarterly results","https://investor.lilly.com/quarterly-results"],["💰 AWARDED-GRANTS REGISTRY","https://grantoffice.lilly.com/transparency"],["🎯 Areas of focus","https://grantoffice.lilly.com/areas-of-focus"],["📰 Newsroom","https://investor.lilly.com/news-releases"],["🧪 Pipeline","https://www.lilly.com/discovery/clinical-development-pipeline"]],
   approvals:"Ebglyss (lebrikizumab) in atopic dermatitis with EMA pediatric filing accepted; Omvoh (mirikizumab) approved UC and Crohn's; Zepbound/Mounjaro label expansions continuing.",
   financial:"Obesity and cardiometabolic dominate the earnings narrative; retatrutide BLA guided to Q1 2027, which sets a defined 2027 launch-education runway. Immunology is positioned as the second growth engine.",
   pipeline:"retatrutide (triple agonist, Ph3 TRIUMPH-2/-3 positive, up to 22.6% weight loss); orforglipron (oral GLP-1); Ixo-vec via the Adverum acquisition (intravitreal gene therapy, Ph3 ARTEMIS topline Q1 2027).",
   conferences:"ADA Scientific Sessions, EASD, ObesityWeek, AAD, DDW, ECCO. ADA and ObesityWeek are where Lilly's obesity education concentrates.",
   keywords:["incretin","triple agonist","amylin","weight regain","obesity as chronic disease","once-weekly insulin","oral GLP-1","tirzepatide"],
   quarterly:"THE exception — Lilly publishes an actual itemised awarded-grants registry at grantoffice.lilly.com/transparency, refreshed quarterly. NEW for 2026: the Lilly Foundation ran an open pre-application round this year — that round has CLOSED, and Lilly has said it will run one annual open call beginning in 2027, so diarise it. Note also that Lilly IME grantees must submit monthly participation data and quarterly satisfaction/knowledge/competence/performance data — budget for that reporting burden when costing a concept. Q1 2026 alone lists 18 Endocrine-category awards. This is the single best primary source in the entire hub; check it every cycle.",
   eduGap:"Lilly funds heavily in obesity but the awarded programs skew to pharmacotherapy selection. Weight-regain, discontinuation and maintenance education is comparatively thin."
 },
 "Vertex":{
   quarters:[["Q1 2026","reported","https://investors.vrtx.com/financial-information/quarterly-results","early May 2026","Diversification beyond CF; nephrology and pain named as expansion areas."],["Q2 2026","reported","https://investors.vrtx.com/financial-information/quarterly-results","early Aug 2026","Povetacicept Ph3 RAINER positive — first renal launch positioned as a strategic milestone."],["Q3 2026","upcoming","https://investors.vrtx.com/financial-information/quarterly-results","~early Nov 2026",""],["Q4 / FY 2026","upcoming","https://investors.vrtx.com/financial-information/quarterly-results","~mid Feb 2027",""]],
   links:[["📊 Quarterly results","https://investors.vrtx.com/financial-information/quarterly-results"],["💰 Grants & giving","https://www.vrtx.com/our-company/grants-giving/"],["📰 Newsroom","https://news.vrtx.com/"],["🧪 Pipeline","https://www.vrtx.com/our-science/pipeline/"]],
   approvals:"No renal approval yet — povetacicept would be the first. Casgevy (exa-cel) approved in sickle cell and TDT via the CRISPR Therapeutics partnership.",
   financial:"Guiding to diversification beyond cystic fibrosis; nephrology and pain are the two named expansion areas. A first renal launch is a strategic milestone, not an incremental one.",
   pipeline:"povetacicept (BAFF/APRIL dual inhibitor) — Ph3 RAINER positive in IgAN, filing pending.",
   conferences:"ASN Kidney Week, NKF Spring Clinical Meetings, ERA. Expect Vertex presence to ramp sharply at Kidney Week ahead of launch.",
   keywords:["dual BAFF/APRIL inhibition","Gd-IgA1","proteinuria","first-in-class","immune complex"],
   quarterly:"No nephrology grant program exists yet and no itemised registry is published. (unverified) Watch for a renal area-of-interest appearing on the Vertex grants page — that is the signal the budget has been stood up.",
   eduGap:"Highest-value relationship-building target in the hub. Companies typically stand up an IME budget at first approval in a new therapeutic area, so the window to be already-known is now, not 2027."
 },
 "AstraZeneca":{
   quarters:[["Q1 2026","reported","https://www.astrazeneca.com/investor-relations/results-and-presentations.html","late Apr 2026","Cardio-renal-metabolic reaffirmed as a strategic pillar."],["Q2 2026","reported","https://www.astrazeneca.com/investor-relations/results-and-presentations.html","late Jul 2026","Respiratory biologics and CKD franchise growth; Alexion rare unit reported separately."],["Q3 2026","upcoming","https://www.astrazeneca.com/investor-relations/results-and-presentations.html","~mid Nov 2026",""],["Q4 / FY 2026","upcoming","https://www.astrazeneca.com/investor-relations/results-and-presentations.html","~mid Feb 2027",""]],
   links:[["📊 Results & presentations","https://www.astrazeneca.com/investor-relations/results-and-presentations.html"],["💰 Medical education office","https://www.astrazeneca-us.com/sustainability/Request-Support/medical-education-office.html"],["📰 Newsroom","https://www.astrazeneca-us.com/media/press-releases.html"],["🧪 Pipeline","https://www.astrazeneca.com/our-science/pipeline.html"]],
   approvals:"Saphnelo (anifrolumab) marketed in SLE; Uplizna/Ultomiris across NMOSD and gMG; Farxiga established in CKD; Tezspire (tezepelumab) added CRSwNP.",
   financial:"Cardio-renal-metabolic is a named strategic pillar alongside respiratory and immunology. The Alexion rare-disease unit runs its own grants office, so two routes exist into the same parent.",
   pipeline:"zibotentan/dapagliflozin combination (Ph3 ZENITH-CKD); anifrolumab lifecycle expansion; eplontersen in ATTR-PN only after the CARDIO-TTRansform failure.",
   conferences:"ASN Kidney Week, ERA, ATS, ERS, EULAR, ACR Convergence, ESC.",
   keywords:["cardio-renal-metabolic","type I interferon","alarmin","TSLP","eGFR decline","phenotype-independent"],
   quarterly:"MEGO office publishes areas of interest and a ≥60-day lead-time requirement but no itemised award registry. (unverified)",
   eduGap:"Tezspire is the only severe-asthma biologic without a phenotype restriction, and epithelial-cytokine biology is genuinely unfamiliar to most prescribers — clean education opening."
 },
 "Johnson & Johnson":{
   quarters:[["Q1 2026","reported","https://www.investor.jnj.com/financials/quarterly-results/default.aspx","mid Apr 2026","Innovative Medicine immunology franchise the largest contributor."],["Q2 2026","reported","https://www.investor.jnj.com/financials/quarterly-results/default.aspx","mid Jul 2026","Oral IL-23 (icotrokinra) and FcRn expansion highlighted; Implementation Science RFP signalled."],["Q3 2026","upcoming","https://www.investor.jnj.com/financials/quarterly-results/default.aspx","~mid Oct 2026",""],["Q4 / FY 2026","upcoming","https://www.investor.jnj.com/financials/quarterly-results/default.aspx","~late Jan 2027",""]],
   links:[["📊 Quarterly results","https://www.investor.jnj.com/financials/quarterly-results/default.aspx"],["💰 Educational grants","https://www.jnj.com/innovativemedicine/us/grants-and-giving/educational"],["📰 Newsroom","https://www.jnj.com/innovativemedicine/newsroom"],["🧪 Pipeline","https://www.jnj.com/innovative-medicine/pipeline"]],
   approvals:"Imaavy (nipocalimab) approved gMG 2025; Tremfya expanded across IBD with SC induction; icotrokinra (oral IL-23 peptide) advancing in PsA and psoriasis.",
   financial:"Innovative Medicine immunology franchise is the largest single contributor; the Implementation Science RFP signals appetite for practice-change rather than awareness education.",
   pipeline:"milvexian (oral FXIa, Ph3 LIBREXIA in stroke and AF — ACS arm discontinued Nov 2025); icotrokinra Ph3; nipocalimab expanding into Sjögren's.",
   conferences:"DDW, ECCO, ACR Convergence, EULAR, AAD, AAN, ISTH, ESC.",
   keywords:["implementation science","oral IL-23","FcRn","treat-to-target","subcutaneous induction","practice change"],
   quarterly:"J&J/Janssen has historically published an itemised educational-grant report — the 2021 filing showed large VTE/anticoagulation spend (Medscape $2.14M, ACC Foundation $297K). A current-year filing was not locatable this pass. (unverified for 2025-26.)",
   eduGap:"The Implementation Science RFP is explicitly asking for measurable practice change, which most competitors do not design for. Concepts built around Moore's Level 4-5 outcomes are aligned to what they are actually buying."
 },
 "Bristol Myers Squibb":{
   quarters:[["Q1 2026","reported","https://www.bms.com/investors/financial-reporting-and-sec-filings.html","late Apr 2026","Eliquis EU patent pressure flagged as a 2026 headwind."],["Q2 2026","reported","https://www.bms.com/investors/financial-reporting-and-sec-filings.html","late Jul 2026","Growth portfolio (Sotyktu, Camzyos, Zeposia) positioned against the LOE cliff."],["Q3 2026","upcoming","https://www.bms.com/investors/financial-reporting-and-sec-filings.html","~late Oct 2026",""],["Q4 / FY 2026","upcoming","https://www.bms.com/investors/financial-reporting-and-sec-filings.html","~early Feb 2027",""]],
   links:[["📊 Financial reporting","https://www.bms.com/investors/financial-reporting-and-sec-filings.html"],["💰 Education RFPs","https://www.bms.com/our-impact/corporate-giving/funding-opportunities/request-for-proposals-education.html"],["📰 Newsroom","https://www.bms.com/news-and-media/press-releases.html"],["🧪 Pipeline","https://www.bms.com/researchers-and-partners/in-the-pipeline.html"]],
   approvals:"Sotyktu (deucravacitinib) marketed in psoriasis with Ph3 in SLE; Zeposia (ozanimod) marketed UC; Camzyos in obstructive HCM.",
   financial:"Facing DOAC patent pressure on Eliquis (EU 2026), which historically pushes spend toward differentiation and disease-state education rather than brand-adjacent work.",
   pipeline:"milvexian with J&J (Ph3 LIBREXIA); deucravacitinib in SLE; cendakimab in EoE.",
   conferences:"ESC, AHA, ACC, AAD, ACR Convergence, DDW.",
   keywords:["allosteric TYK2","oral small molecule","Factor XI","bleeding risk","S1P modulation"],
   quarterly:"Posts an RFE/RFP table intermittently rather than continuously; the table was empty at last fetch. No itemised award registry. (unverified)",
   eduGap:"Oral TYK2 versus JAK safety differentiation post-ORAL Surveillance is a real and repeatedly-requested clinician question that almost nothing addresses cleanly."
 },
 "Amgen":{
   quarters:[["Q1 2026","reported","https://investors.amgen.com/financials/quarterly-results","early May 2026","Obesity (MariTide) and inflammation framed as the growth narrative."],["Q2 2026","reported","https://investors.amgen.com/financials/quarterly-results","early Aug 2026","Horizon rare/TED portfolio integration; Tepezza SC on-body injector Ph3 positive."],["Q3 2026","upcoming","https://investors.amgen.com/financials/quarterly-results","~early Nov 2026",""],["Q4 / FY 2026","upcoming","https://investors.amgen.com/financials/quarterly-results","~early Feb 2027",""]],
   links:[["📊 Quarterly results","https://investors.amgen.com/financials/quarterly-results"],["💰 IME funding","https://www.amgen.com/responsibility/healthy-society/community-investment/independent-medical-education-funding"],["📰 Newsroom","https://www.amgen.com/newsroom/press-releases"],["🧪 Pipeline","https://www.amgenpipeline.com/"]],
   approvals:"Uplizna (inebilizumab) approved IgG4-related disease Apr 2025 — first-ever in that indication; Tepezza (teprotumumab) SC on-body injector Ph3 positive Apr 2026.",
   financial:"Obesity (MariTide) and inflammation are the growth narrative; the Horizon acquisition brought an ultra-rare and TED portfolio with its own established education footprint.",
   pipeline:"MariTide (maridebart cafraglutide, monthly obesity); Tepezza SC delivery; rocatinlimab DISCONTINUED Mar 2026 — remove from any AD concept.",
   conferences:"ObesityWeek, ADA, ACR Convergence, EULAR, AAO, ATA, ENDO.",
   keywords:["first-in-indication","IgG4-related disease","monthly dosing","thyroid eye disease","GIP antagonism"],
   quarterly:"Publishes standing Areas of Interest with named topics (TED is explicitly listed) and a ≥60-day rolling lead time, but no itemised award registry. Accredited activities only, no fellowships. (unverified)",
   eduGap:"Tepezza moving from infusion to home administration is a genuine workflow-change education need that nobody has built for yet."
 },
 "Sanofi":{
   quarters:[["Q1 2026","reported","https://www.sanofi.com/en/investors/financial-results-and-events","late Apr 2026","Dupixent the largest revenue driver; immunology declared the strategic centre."],["Q2 2026","reported","https://www.sanofi.com/en/investors/financial-results-and-events","late Jul 2026","Amlitelimab discontinued in AD — OX40/OX40L route in atopic dermatitis effectively closed."],["Q3 2026","upcoming","https://www.sanofi.com/en/investors/financial-results-and-events","~late Oct 2026",""],["Q4 / FY 2026","upcoming","https://www.sanofi.com/en/investors/financial-results-and-events","~late Jan 2027",""]],
   links:[["📊 Financial results","https://www.sanofi.com/en/investors/financial-results-and-events"],["💰 Contributions & giving","https://www.sanofi.us/en/our-company/social-impact/corporate-social-responsibility/contributions-and-giving"],["📰 Newsroom","https://www.news.sanofi.us/"],["🧪 Pipeline","https://www.sanofi.com/en/our-science/our-pipeline"]],
   approvals:"Dupixent continues label expansion — bullous pemphigoid and COPD added; rilzabrutinib approved in ITP.",
   financial:"Dupixent is the single largest revenue driver and its education footprint spans four of the seven spaces in this hub. Immunology is the declared strategic centre.",
   pipeline:"frexalimab (anti-CD40L, Ph3 lupus); amlitelimab DISCONTINUED in atopic dermatitis Jul 2026 — the OX40/OX40L route in AD is now effectively closed, remove from concepts.",
   conferences:"AAAAI, ACAAI, ATS, ERS, AAD, EADV, DDW, ACR Convergence.",
   keywords:["type 2 inflammation","IL-4Rα","alarmin","atopic march","comorbidity burden"],
   quarterly:"No itemised registry located. Rare-disease and Genzyme units route separately from the main grants office, with a 12-16 week lead time. (unverified)",
   eduGap:"Dupixent now spans respiratory, derm, GI and allergy — cross-specialty type-2 inflammation education that follows the patient rather than the organ is under-built."
 },
 "Takeda":{
   quarters:[["Q1 2026","reported","https://www.takeda.com/investors/financial-results/","early May 2026","GI and rare disease core; growth-and-launch products carrying the portfolio."],["Q2 2026","reported","https://www.takeda.com/investors/financial-results/","late Jul 2026","Oral TYK2 (zasocitinib) Ph3 progress in PsA and psoriasis."],["Q3 2026","upcoming","https://www.takeda.com/investors/financial-results/","~late Oct 2026",""],["Q4 / FY 2026","upcoming","https://www.takeda.com/investors/financial-results/","~early Feb 2027",""]],
   links:[["📊 Financial results","https://www.takeda.com/investors/financial-results/"],["💰 IME grants","https://www.takeda.com/en-us/science/independent-medical-education-grants/"],["📰 Newsroom","https://www.takeda.com/en-us/newsroom/news-releases/"],["🧪 Pipeline","https://www.takeda.com/what-we-do/research-and-development/our-pipeline/"]],
   approvals:"Entyvio SC formulation established; Eohilia in EoE; HAE and PID portfolio marketed.",
   financial:"GI and rare disease are the core; the CGA page frequently shows no open calls, so timing matters more than for most funders.",
   pipeline:"zasocitinib (TAK-279, oral TYK2) Ph3 in PsA and psoriasis; mezagitamab in ITP and IgAN.",
   conferences:"DDW, ECCO, UEG Week, AAAAI, ACR Convergence.",
   keywords:["gut-selective","oral TYK2","eosinophilic esophagitis","short bowel syndrome","hereditary angioedema"],
   quarterly:"IME grants page lists open areas (IBD, EoE, SBS-IF, CIDP, HAE, PID currently OPEN; SLE and PsA explicitly NOT accepting). Check every cycle — the open/closed list rotates more than most. No itemised registry. (unverified)",
   eduGap:"EoE is growing fast in diagnosed prevalence with very little practical dysphagia-management education for general gastroenterology."
 },
 "Roche / Genentech":{
   quarters:[["Q1 2026","reported","https://www.roche.com/investors/results","mid Apr 2026","Pharma division growth led by Vabysmo and Phesgo."],["Q2 2026","reported","https://www.roche.com/investors/results","late Jul 2026","Obesity consolidated behind enicepatide (CT-388); acmopatide dropped. Gazyva LN/PMN progress."],["Q3 2026","upcoming","https://www.roche.com/investors/results","~mid Oct 2026",""],["Q4 / FY 2026","upcoming","https://www.roche.com/investors/results","~late Jan 2027",""]],
   links:[["📊 Results","https://www.roche.com/investors/results"],["💰 iMED grants","https://www.gene.com/good/giving/corporate-giving/imed"],["📰 Newsroom","https://www.gene.com/media/press-releases"],["🧪 Pipeline","https://www.roche.com/solutions/pipeline"]],
   approvals:"Gazyva (obinutuzumab) approved lupus nephritis Oct 2025 (REGENCY); priority review in primary membranous nephropathy after beating tacrolimus, Nov 2026 action date. Vabysmo established in wet AMD and DME.",
   financial:"Dropped acmopatide and consolidated obesity behind enicepatide (CT-388), so near-term Roche obesity funding stays disease-state rather than launch-shaped. Renal is an emerging area.",
   pipeline:"obinutuzumab in PMN (priority review); enicepatide (CT-388) obesity; Susvimo refill-exchange expansion.",
   conferences:"ASN Kidney Week, ERA, ACR Convergence, AAO, ASRS, Angiogenesis.",
   keywords:["anti-CD20","B-cell depletion","complete renal response","durability","treat-and-extend"],
   quarterly:"Posts named RFPs on the iMED page rather than accepting broadly — monitoring the RFP page is the actionable behaviour. No itemised registry. (unverified)",
   eduGap:"Primary membranous nephropathy has almost no existing CME and a defined Nov 2026 action date — one of the cleanest pre-launch windows currently visible."
 },
 "Bayer":{
   quarters:[["Q1 2026","reported","https://www.bayer.com/en/investors/quarterly-publications","mid May 2026","Cardio-Kidney-Metabolic reaffirmed as a standing area of interest."],["Q2 2026","reported","https://www.bayer.com/en/investors/quarterly-publications","early Aug 2026","Asundexian under Priority Review; Kerendia CKD growth."],["Q3 2026","upcoming","https://www.bayer.com/en/investors/quarterly-publications","~mid Nov 2026",""],["Q4 / FY 2026","upcoming","https://www.bayer.com/en/investors/quarterly-publications","~early Mar 2027",""]],
   links:[["📊 Quarterly publications","https://www.bayer.com/en/investors/quarterly-publications"],["💰 Medical education grants","https://www.grants-contributions.bayer.com/home/medical-educational-grants"],["📰 Newsroom","https://www.bayer.com/en/us/newsroom"],["🧪 Pipeline","https://www.bayer.com/en/pharma/development-pipeline"]],
   approvals:"Kerendia (finerenone) marketed in CKD with T2D; asundexian NDA under Priority Review for secondary stroke prevention with FDA action ~Q4 2026.",
   financial:"Cardio-Kidney-Metabolic is a named standing area of interest, which lets one concept legitimately draw from cardiovascular, nephrology and endocrine framing.",
   pipeline:"asundexian (oral FXIa) — OCEANIC-STROKE positive Nov 2025, OCEANIC-AF stopped early; elinzanetant in menopause.",
   conferences:"ESC, AHA, ACC, ASN Kidney Week, ERA, ADA.",
   keywords:["cardio-kidney-metabolic","non-steroidal MRA","Factor XIa","secondary stroke prevention","residual risk"],
   quarterly:"Accepts unsolicited via the CGA process (≥90 days) plus separate sponsorships (≥60 days). No itemised award registry. (unverified)",
   eduGap:"The CKM framing is stated by Bayer but very little education actually delivers it as one integrated concept rather than three separate talks."
 },
 "argenx":{
   quarters:[["Q1 2026","reported","https://www.argenx.com/investors/financial-information","late Apr 2026","Vyvgart CIDP launch tracking ahead of plan."],["Q2 2026","reported","https://www.argenx.com/investors/financial-information","23 Jul 2026","Q2 2026: Vyvgart sales +60% YoY (~$1.5B quarter); seronegative gMG expansion; CIDP global; 2027 autoinjector launch ahead."],["Q3 2026","upcoming","https://www.argenx.com/investors/financial-information","~late Oct 2026",""],["Q4 / FY 2026","upcoming","https://www.argenx.com/investors/financial-information","~late Feb 2027",""]],
   links:[["📊 Financial information","https://www.argenx.com/investors/financial-information"],["📰 Newsroom","https://www.argenx.com/news"],["🧪 Pipeline","https://www.argenx.com/pipeline"]],
   approvals:"Vyvgart approved gMG and CIDP; CIDP now global. Prefilled-syringe and autoinjector formats expanding.",
   financial:"H1 2026 reported $2.8B first-half Vyvgart sales — this is now the largest neuromuscular education funder available to court, with a 2027 autoinjector launch ahead.",
   pipeline:"efgartigimod expanding into Sjögren's, myositis and ocular MG; empasiprubart in MMN.",
   conferences:"AAN, MDA Clinical & Scientific Conference, PNS, ACR Convergence.",
   keywords:["FcRn blockade","IgG reduction","cycle-based dosing","myasthenia gravis","seronegative"],
   quarterly:"No itemised registry located. Grants route through a standing portal. (unverified)",
   eduGap:"Four FcRn and complement mechanisms now compete in gMG with no sequencing guidance — the same structural problem as IgAN, and equally unaddressed."
 },
 "Apellis":{
   quarters:[["Q1 2026","reported","https://investors.apellis.com/financial-information/quarterly-results","early May 2026","Empaveli C3G/IC-MPGN launch is the growth story; Syfovre GA share under pressure."],["Q2 2026","reported","https://investors.apellis.com/financial-information/quarterly-results","early Aug 2026","Biogen acquisition process — verify whether the Envision grants portal stays independent."],["Q3 2026","upcoming","https://investors.apellis.com/financial-information/quarterly-results","~early Nov 2026",""],["Q4 / FY 2026","upcoming","https://investors.apellis.com/financial-information/quarterly-results","~late Feb 2027",""]],
   links:[["📊 Quarterly results","https://investors.apellis.com/financial-information/quarterly-results"],["💰 Grants (Envision)","https://apellis.envisionpharma.com"],["📰 Newsroom","https://investors.apellis.com/news-releases"],["🧪 Science & pipeline","https://apellis.com/our-science/"]],
   approvals:"Empaveli approved C3G and IC-MPGN Jul 2025 — first-ever therapy for IC-MPGN. Syfovre marketed in geographic atrophy.",
   financial:"Being acquired by Biogen, which may consolidate the grants route — verify the portal is still independent before planning a cycle around it.",
   pipeline:"pegcetacoplan lifecycle across renal and retinal complement indications.",
   conferences:"ASN Kidney Week, NKF SCM, AAO, ASRS, Angiogenesis.",
   keywords:["C3 inhibition","complement-mediated","first-ever therapy","proteinuria","first-injection monitoring"],
   quarterly:"Accepts unsolicited via Envision at ≥60 days; the same portal covers both the renal and ophthalmology programs. No itemised registry. (unverified)",
   eduGap:"Most nephrologists have never prescribed a complement inhibitor. C3G/IC-MPGN education demand is structural rather than promotional — the cleanest genuine unmet need in this hub."
 },
 "GSK":{
   quarters:[["Q1 2026","reported","https://www.gsk.com/en-gb/investors/corporate-reporting/results-reporting/","late Apr 2026","Respiratory and immunology twin pillars; ultra-long-acting dosing the differentiation strategy."],["Q2 2026","reported","https://www.gsk.com/en-gb/investors/corporate-reporting/results-reporting/","late Jul 2026","Nucala COPD and depemokimab uptake; specialty medicines growth."],["Q3 2026","upcoming","https://www.gsk.com/en-gb/investors/corporate-reporting/results-reporting/","~late Oct 2026",""],["Q4 / FY 2026","upcoming","https://www.gsk.com/en-gb/investors/corporate-reporting/results-reporting/","~early Feb 2027",""]],
   links:[["📊 Results reporting","https://www.gsk.com/en-gb/investors/corporate-reporting/results-reporting/"],["📰 Newsroom","https://www.gsk.com/en-gb/media/press-releases/"],["🧪 Pipeline","https://www.gsk.com/en-gb/innovation/pipeline/"]],
   approvals:"Nucala added COPD 2025; depemokimab approved with twice-yearly dosing; Benlysta added a pediatric autoinjector.",
   financial:"Respiratory and immunology are the twin pillars; ultra-long-acting dosing is the stated differentiation strategy.",
   pipeline:"depemokimab expansion; belimumab lifecycle; Blenrep re-entry.",
   conferences:"ATS, ERS, AAAAI, ACAAI, ACR Convergence, EULAR.",
   keywords:["ultra-long-acting","twice-yearly dosing","eosinophil-driven","adherence","type 2 COPD"],
   quarterly:"No itemised registry located. (unverified)",
   eduGap:"Twice-yearly biologic dosing changes the adherence and monitoring conversation fundamentally, and no education has been built around what that means for practice workflow."
 },
 "Otsuka":{
   quarters:[["Q1 2026","reported","https://www.otsuka.co.jp/en/ir/","early Aug 2026","Japan fiscal year — Q1 lands Aug. Renal franchise (Jynarque) plus sibeprenlimab filing."],["Q2 2026","reported","https://www.otsuka.co.jp/en/ir/","early Nov 2026","Not yet reported."],["Q3 2026","upcoming","https://www.otsuka.co.jp/en/ir/","~early Feb 2027",""],["Q4 / FY 2026","upcoming","https://www.otsuka.co.jp/en/ir/","~mid May 2027",""]],
   links:[["📊 Investor relations","https://www.otsuka.co.jp/en/ir/"],["💰 IME grants","https://www.otsuka-us.com/independent-medical-education"],["📰 Newsroom","https://www.otsuka-us.com/news"],["🧪 Pipeline","https://www.otsuka.co.jp/en/rd/pipeline/"]],
   approvals:"Jynarque (tolvaptan) established in ADPKD; sibeprenlimab Ph3/filed in IgAN.",
   financial:"Renal is a long-standing Otsuka franchise rather than a new entry, so the grants infrastructure already exists — this is a submit-ready funder, not a warm-up.",
   pipeline:"sibeprenlimab (anti-APRIL) in IgAN.",
   conferences:"ASN Kidney Week, NKF SCM, ERA.",
   keywords:["APRIL","Gd-IgA1","autosomal dominant polycystic kidney disease","proteinuria reduction"],
   quarterly:"≥60-day lead time via a standing IME portal. No itemised registry. (unverified)",
   eduGap:"ADPKD education is thin outside specialist centres despite an approved therapy for years."
 },
 "Travere":{
   quarters:[["Q1 2026","reported","https://ir.travere.com/financial-information/quarterly-results","early May 2026","Filspari IgAN growth; FSGS full approval Apr 2026 expands the label."],["Q2 2026","reported","https://ir.travere.com/financial-information/quarterly-results","early Aug 2026","Single-franchise nephrology company — Filspari is effectively the whole P&L."],["Q3 2026","upcoming","https://ir.travere.com/financial-information/quarterly-results","~early Nov 2026",""],["Q4 / FY 2026","upcoming","https://ir.travere.com/financial-information/quarterly-results","~late Feb 2027",""]],
   links:[["📊 Quarterly results","https://ir.travere.com/financial-information/quarterly-results"],["💰 IME","https://travere.com/independent-medical-education/"],["📰 Newsroom","https://ir.travere.com/news-releases"],["🧪 Pipeline","https://travere.com/pipeline/"]],
   approvals:"Filspari (sparsentan) approved IgAN and FSGS — FSGS full approval Apr 2026.",
   financial:"Single-franchise nephrology company; Filspari is effectively the whole business, so education investment is concentrated rather than diluted.",
   pipeline:"sparsentan lifecycle; pegtibatinase in homocystinuria.",
   conferences:"ASN Kidney Week, NKF SCM, ERA, IPNA.",
   keywords:["non-immunosuppressive","dual endothelin angiotensin","proteinuria","FSGS","REMS"],
   quarterly:"Med-ed grants via CyberGrants portal, ≥60 days. No itemised registry. (unverified)",
   eduGap:"Filspari is the comparator every new IgAN agent is positioned against, so sequencing education inherently involves them — a natural co-funding angle."
 },
 "Novo Nordisk":{
   quarters:[["Q1 2026","reported","https://www.novonordisk.com/investors/financial-results.html","early May 2026","Competitive pressure from Lilly in obesity acknowledged; guidance revised."],["Q2 2026","reported","https://www.novonordisk.com/investors/financial-results.html","early Aug 2026","CagriSema filing progress; securities litigation over tolerability claims survived dismissal."],["Q3 2026","upcoming","https://www.novonordisk.com/investors/financial-results.html","~early Nov 2026",""],["Q4 / FY 2026","upcoming","https://www.novonordisk.com/investors/financial-results.html","~early Feb 2027",""]],
   links:[["📊 Financial results","https://www.novonordisk.com/investors/financial-results.html"],["💰 External support","https://www.novonordisk.com/contact-us/external-support.html"],["📰 News & IR materials","https://www.novonordisk.com/news-and-media/news-and-ir-materials.html"],["🧪 R&D pipeline","https://www.novonordisk.com/science-and-technology/rd-pipeline.html"]],
   approvals:"Wegovy and Ozempic label expansions continuing; CagriSema filed.",
   financial:"Facing competitive pressure from Lilly in obesity; the CagriSema securities litigation survived dismissal, which raises the bar for balanced tolerability and dosing education specifically.",
   pipeline:"CagriSema (semaglutide + cagrilintide); oral semaglutide 25mg; survodutide licensed to Boehringer.",
   conferences:"ADA, EASD, ObesityWeek, ECO, AASLD.",
   keywords:["amylin","dual agonism","tolerability","dose escalation","obesity care model","MASH"],
   quarterly:"Two 2025 obesity RFPs (CGA-APR25-ObEarly/ObHighlights) are now closed and were ex-US/UK only, but they are informative about structure. A confirmed ACP grant funded an online learning-centre course with credit through April 2027. No itemised registry. (unverified)",
   eduGap:"Given the litigation exposure, rigorously balanced tolerability and dose-escalation education is both a genuine clinical need and unusually well-aligned with what they need to fund."
 },
 "AbbVie":{
   quarters:[["Q1 2026","reported","https://investors.abbvie.com/quarterly-results","late Apr 2026","Rinvoq and Skyrizi carrying post-Humira growth."],["Q2 2026","reported","https://investors.abbvie.com/quarterly-results","late Jul 2026","Immunology guidance raised; eye-care via legacy Allergan unit."],["Q3 2026","upcoming","https://investors.abbvie.com/quarterly-results","~late Oct 2026",""],["Q4 / FY 2026","upcoming","https://investors.abbvie.com/quarterly-results","~late Jan 2027",""]],
   links:[["📊 Quarterly results","https://investors.abbvie.com/quarterly-results"],["💰 Independent educational grants","https://www.abbvie.com/science/independent-educational-grants.html"],["📰 Newsroom","https://news.abbvie.com/"],["🧪 Pipeline","https://www.abbvie.com/science/pipeline.html"]],
   approvals:"Rinvoq ninth indication = giant cell arteritis (2025); Skyrizi added UC.",
   financial:"Rinvoq and Skyrizi are the post-Humira growth engine across immunology; eye care runs through the legacy Allergan unit.",
   pipeline:"ABBV-RGX-314 (AAV8 anti-VEGF gene therapy) Ph3 with filing guided H1 2026; lutikizumab in HS.",
   conferences:"ACR Convergence, EULAR, DDW, ECCO, AAD, EADV, AAO.",
   keywords:["selective JAK1","IL-23","clinical remission","endoscopic improvement","gene therapy"],
   quarterly:"Since 2024 funds ONLY the invited IME Provider Network — verify membership before investing any concept time. This is the single most important gating check in the directory. (verified from the AbbVie grants page.)",
   eduGap:"Gated access means less competition among those inside the network, but no route at all for those outside it."
 },
 "Regeneron":{
   quarters:[["Q1 2026","reported","https://investor.regeneron.com/financial-information/quarterly-results","early May 2026","Eylea HD defending share against Vabysmo and incoming biosimilars."],["Q2 2026","reported","https://investor.regeneron.com/financial-information/quarterly-results","early Aug 2026","Factor XI antibody program advancing across VTE, AF, CAT and PAD."],["Q3 2026","upcoming","https://investor.regeneron.com/financial-information/quarterly-results","~early Nov 2026",""],["Q4 / FY 2026","upcoming","https://investor.regeneron.com/financial-information/quarterly-results","~early Feb 2027",""]],
   links:[["📊 Quarterly results","https://investor.regeneron.com/financial-information/quarterly-results"],["💰 Educational funding","https://educationalfunding.regeneron.com"],["📰 Newsroom","https://investor.regeneron.com/news/press-releases"],["🧪 Pipeline","https://www.regeneron.com/science/pipeline"]],
   approvals:"Eylea HD expanded label Nov 2025 (+RVO, monthly option); Dupixent co-development with Sanofi.",
   financial:"Defending the Eylea franchise against Vabysmo and incoming biosimilars is the central commercial problem, which typically drives durability and switching education.",
   pipeline:"Factor XI-directed antibody program active across VTE, AF, cancer-associated thrombosis and PAD — one of the most active thrombosis sponsors in the live trial feed; REGN1908-1909 in cat allergy.",
   conferences:"AAO, ASRS, Angiogenesis, ISTH, AAAAI, ACAAI.",
   keywords:["extended dosing","treatment burden","injection interval","allergen-specific","Factor XI"],
   quarterly:"Unsolicited/rolling via educationalfunding.regeneron.com; no public ophthalmology RFP confirmed. No itemised registry. (unverified)",
   eduGap:"Allergen-specific antibody therapy is a genuinely new modality in allergy with no prescriber frame of reference at all."
 },
 "Pfizer":{
   quarters:[["Q1 2026","reported","https://investors.pfizer.com/financials/quarterly-results/default.aspx","late Apr 2026","Eliquis EU patent pressure; inflammation & immunology positioned for growth."],["Q2 2026","reported","https://investors.pfizer.com/financials/quarterly-results/default.aspx","early Aug 2026","Oral small-molecule immunology expansion (Velsipity, Litfulo)."],["Q3 2026","upcoming","https://investors.pfizer.com/financials/quarterly-results/default.aspx","~late Oct 2026",""],["Q4 / FY 2026","upcoming","https://investors.pfizer.com/financials/quarterly-results/default.aspx","~early Feb 2027",""]],
   links:[["📊 Quarterly results","https://investors.pfizer.com/financials/quarterly-results/default.aspx"],["💰 IGLC grants","https://www.pfizer.com/about/programs-policies/grants/independent-medical-education"],["📰 Newsroom","https://www.pfizer.com/newsroom/press-releases"],["🧪 Pipeline","https://www.pfizer.com/science/drug-product-pipeline"]],
   approvals:"Velsipity (etrasimod) approved UC; Litfulo (ritlecitinib) in alopecia areata.",
   financial:"Eliquis EU patent pressure in 2026 forces differentiation-versus-generic education; inflammation and immunology positioned for growth.",
   pipeline:"Oral small-molecule immunology expansion; obesity assets in earlier development.",
   conferences:"DDW, ECCO, AAD, ACR Convergence, ESC.",
   keywords:["oral S1P","selective JAK3/TEC","alopecia areata","advanced therapy-naive"],
   quarterly:"Independent Grants for Learning & Change publishes dated, budgeted RFPs — one of the better-structured funders to track. Alopecia Areata RFP is a recent example. Check the IGLC page every cycle.",
   eduGap:"Alopecia areata psychosocial-impact and treatment-expectation education lags the pharmacology considerably."
 }
};
/* WEEKLY-SUPSTRAT-END */
/* WEEKLY-EMPHASIS-START — the Monday/Thursday task maintains this block.
   What each supporter SAYS it wants, tracked release over release, so drift is
   visible: what is new this cycle, what quietly disappeared, what has persisted.
   Shape:
   "Canonical Co":{ spaces:[keys], portal, url,
     cycles:[ {when:"YYYY-MM-DD", label, topics:[...], src?} , ...],   // OLDEST FIRST
     changed?:[ {when:"YYYY-MM", what} ],                              // dated, documented shifts only
     gaps:[ {space, gap, design} ] }

   HOW TO MAINTAIN THIS — read carefully, it is easy to corrupt:
   * Each run, compare the funder's CURRENT published areas of interest against
     `cycles[cycles.length-1]`. If the wording is materially the same, do NOT append
     a cycle — appending identical cycles destroys the signal. Only append when the
     topic list actually changes, and date the new cycle the day you saw the change.
   * Keep at most 4 cycles per supporter; drop the oldest beyond that.
   * `changed` is for shifts you can date and evidence (a portal closing, a topic
     being withdrawn, a mechanism moving to invite-only). Never infer one.
   * `gaps` is the payoff: what the funder is NOT saying, and the educational design
     that would answer it. One or two per supporter, specific enough to brief.
   The UI diffs the last two cycles automatically. A supporter with one cycle renders
   as "baseline" — honest, because we have no prior observation, not a claim of stability. */

const EMPHASIS_UPDATED = "August 19, 2026";

const EMPHASIS_BASELINE = "August 12, 2026";

const EMPHASIS = {
 "Bayer":{spaces:["cardiovascular","nephrology","endocrinology"], portal:"Bayer Grants & Donations", url:"https://www.grants.bayer.com/",
  cycles:[{when:"2026-08-10", label:"Published areas of interest", topics:["Stroke prevention","Cardio-Kidney-Metabolic syndrome","Heart failure","CKD in type 2 diabetes","Finerenone / Kerendia"]}],
  gaps:[{space:"cardiovascular", gap:"Bayer names stroke prevention but existing anticoagulation CME (Medscape, PeerView, ACHL) is uniformly DOAC-vs-DOAC. Nothing prepares clinicians for the Factor XI positioning question that lands the day asundexian is approved — bleeding-risk stratification, patient selection vs apixaban, and the frailty-population case where DOACs currently underperform.", design:"Decera Clinical Education proposes a Factor XI Readiness Clinic — case-based decision-support, bleeding-risk stratified, structured to auto-refresh at PDUFA. Sequencing/timing lens: pre-launch scientific-exchange framing now, converts to full patient-selection activity at approval. Faculty mix cardiology + hematology + geriatrics — a combination the DOAC-era activities have not assembled."},
        {space:"nephrology", gap:"Every major funder now names Cardio-Kidney-Metabolic (CKM) syndrome, but funded activities remain siloed — cardiology CME talks about SGLT2s, nephrology CME talks about finerenone, endocrinology CME talks about GLP-1s, and no single activity walks the same patient through all three lenses. Medscape and PRIME each run parallel single-specialty tracks.", design:"Decera Clinical Education proposes a CKM Shared-Patient Curriculum — one longitudinal case followed across three specialist perspectives with the referral hand-offs made visible. Novel-format + implementation lens. Directly maps to Bayer's finerenone commercial priority without being product-branded."}]},
 "Novartis":{spaces:["cardiovascular","nephrology","immunology"], portal:"Novartis Independent Medical Education", url:"https://www.novartis.com/about/our-support-healthcare-community/independent-medical-education",
  cycles:[{when:"2026-08-10", label:"Published areas of interest", topics:["Atrial fibrillation / thromboembolism","ASCVD and Lp(a)","IgA nephropathy","C3 glomerulopathy","Sjögren's disease"]}],
  changed:[{when:"2026-07", what:"Fabhalta (iptacopan) converted to full IgAN approval, opening a live launch-education window; Vanrafia (atrasentan) sits alongside it."}],
  gaps:[{space:"nephrology", gap:"IgAN now has four approved mechanisms (Filspari, Fabhalta, Vanrafia, Voyxact) with zero head-to-head data and no independent sequencing education. Novartis holds three of the four assets — the sequencing question is precisely what the sponsor cannot credibly answer about itself. Current CME (PeerView, ACHL) treats each mechanism as a standalone launch module.", design:"Decera Clinical Education proposes an Independent IgAN Sequencing Curriculum — proteinuria-triggered decision points across all four mechanisms, not one company's portfolio. Faculty mix drawn from all four trial PIs (not Novartis PIs alone) is the credibility signal no sponsor-adjacent activity can produce. Sequencing lens."},
        {space:"cardiovascular", gap:"Lp(a) is on Novartis's stated interest list, but the pelacarsen (Horizon) outcomes readout has slipped past its guided 2025 window — building therapeutic-decision CME now would sit on a hypothesis. Yet Lp(a) testing rates remain <15% in high-risk secondary-prevention patients, and no funded activity is closing the testing gap.", design:"Decera Clinical Education proposes a two-stage Lp(a) programme: Stage 1 (now) — risk identification, when-to-test, EHR-embedded reflex-testing workflow for cardiology and primary care; Stage 2 (post-readout) — therapeutic decision-making, released within 60 days of trial results. Implementation lens for Stage 1, sequencing lens for Stage 2. Solves Novartis's exposure to a slipping timeline."}]},
 "Novo Nordisk":{spaces:["cardiovascular","endocrinology"], portal:"Novo Nordisk Independent Medical Education", url:"https://www.novonordisk-us.com/sustainable-business/patients/independent-medical-education.html",
  cycles:[{when:"2026-08-10", label:"Stated therapeutic areas", topics:["Diabetes","Obesity","MASH","Cardiovascular outcomes in cardiometabolic disease"]}],
  gaps:[{space:"endocrinology", gap:"Semaglutide + cagrilintide (CagriSema) tolerability is the live clinical question, and Novo Nordisk faces active securities litigation over tolerability disclosures — which makes company-sourced tolerability content unusable exactly where it is most needed. Existing GLP-1 CME (Medscape, PeerView) is initiation-and-benefit framed; nothing addresses de-escalation, discontinuation, or the ~30% early-discontinuer subpopulation.", design:"Decera Clinical Education proposes a GLP-1/Amylin Tolerability & Titration Toolkit — protocolised dose escalation, side-effect anticipation scripts, and stop/switch/reduce decision trees. Unmet subpopulation lens (the early-discontinuer). Independent framing is the specific asset Novo cannot buy elsewhere while litigation is live."}]},
 "Eli Lilly":{spaces:["endocrinology","immunology"], portal:"Lilly Grant Office", url:"https://grantoffice.lilly.com/areas-of-focus",
  cycles:[{when:"2026-08-10", label:"Published Areas of Focus", topics:["Endocrine — diabetes","Endocrine — obesity","Immunology"], src:"Topic detail sits behind portal login; the public awarded-grants registry is the better read on what actually gets funded."}],
  gaps:[{space:"endocrinology", gap:"With orforglipron (oral) now approved alongside injectable tirzepatide, the decision has shifted from access to selection — but no funded activity walks a clinician through the actual choice for a specific patient (pill-burden-averse vs injection-averse, GI-tolerance history, adherence risk). Medscape and PRIME both have oral-GLP-1 activities in queue but framed as mechanism overviews, not selection tools.", design:"Decera Clinical Education proposes an Oral-vs-Injectable GLP-1 Selection Clinic — patient-vignette-driven, with an embedded shared-decision aid the clinician can use in-visit. Unmet subpopulation lens (patients who have failed or discontinued injectables). Implementation lens (in-visit workflow tool, not lecture)."}]},
 "Amgen":{spaces:["endocrinology","immunology"], portal:"Amgen Independent Medical Education", url:"https://www.amgen.com/science/independent-medical-education",
  cycles:[{when:"2026-08-10", label:"Published IME topics", topics:["Obesity","Dyslipidemia in diabetes","Rheumatoid arthritis","Psoriatic arthritis","Ankylosing spondylitis","ANCA vasculitis","Lupus","IBD","Asthma / COPD"]}],
  gaps:[{space:"immunology", gap:"Amgen's IME topic list is the widest in the hub (9 areas across rheum, GI, respiratory), which makes it the easiest funder to match on topic — and the most crowded competitive field. Every major provider (Medscape, PeerView, ACHL, PRIME) has active RA/PsA/AS symposia. Topic-based differentiation is functionally impossible here.", design:"Decera Clinical Education proposes format-based differentiation: an IBD Steroid-Sparing Longitudinal Case Series (6 patient journeys across 12 months, following biologic switches and pregnancy planning) — a format Amgen's current portfolio does not include. Novel-format lens. Also positions Decera as the funder's implementation-science partner across the topic list, not another symposium bidder."}]},
 "AstraZeneca":{spaces:["nephrology","immunology"], portal:"AstraZeneca Medical Education Grants", url:"https://www.astrazeneca.com/our-company/independent-medical-education.html",
  cycles:[{when:"2026-08-10", label:"Published areas", topics:["CKD / cardio-renal-metabolic","IgA nephropathy","Lupus nephritis (ex-US)","SLE (limited budget)","Myositis","Scleroderma"]}],
  gaps:[{space:"nephrology", gap:"AstraZeneca's Saphnelo lupus nephritis funding is explicitly scoped ex-US, yet the US nephrology audience faces the same anifrolumab-vs-belimumab-vs-voclosporin sequencing question. Every US-based LN activity (PeerView, ACHL) uses US case law and access framing that AZ's ex-US budget cannot fund — a structural mismatch, not a topic gap.", design:"Decera Clinical Education proposes a Global Lupus Nephritis Sequencing Programme — international faculty, ex-US case law and access framing, but designed so US clinicians can extract the mechanism-selection logic. Fundable from AZ's ex-US budget line by construction. Regional-vs-national lens (inverted — global-first design that serves US learners as secondary audience)."}]},
 "Otsuka":{spaces:["nephrology"], portal:"Otsuka Independent Medical Education", url:"https://www.otsuka-us.com/independent-medical-education",
  cycles:[{when:"2026-08-10", label:"Published areas", topics:["IgA nephropathy (sibeprenlimab / anti-APRIL)","ADPKD (tolvaptan)"]}],
  changed:[{when:"2025-11", what:"Sibeprenlimab (Voyxact) approved, moving Otsuka from pre-launch to launch-stage education need in IgAN."}],
  gaps:[{space:"nephrology", gap:"Otsuka held the IgAN education field alone during the tolvaptan-and-nothing-else era; Voyxact (sibeprenlimab) approval Nov 2025 dropped them into a four-drug launch war where every competitor (Novartis x3, Travere) is running mechanism-specific launch CME. Otsuka's differentiation risk: getting outspent on product-anchored activities.", design:"Decera Clinical Education proposes a Complement, BAFF/APRIL & Endothelin Class-Literacy Curriculum — mechanism-first, pitched as prescriber education rather than product positioning, but structured so anti-APRIL (Otsuka's asset) is the biology story the learner remembers. Faculty mix pathophysiologists + trial PIs from all four assets — legitimises the class framing. Novel-format lens (mechanism-first, not indication-first)."}]},
 "Travere":{spaces:["nephrology"], portal:"Travere Medical Education Grants", url:"https://travere.com/grants-and-giving/",
  cycles:[{when:"2026-08-10", label:"Published areas", topics:["IgA nephropathy (Filspari / sparsentan)","FSGS","Non-immunosuppressive management"]}],
  gaps:[{space:"nephrology", gap:"FSGS has essentially zero dedicated CME across Medscape, PeerView, ACHL and PRIME — and no competing funder is chasing it (Travere is alone in the space until an FSGS-labelled agent lands). The most concrete white space in the entire nephrology view, and the diagnostic question (genetic APOL1 vs primary vs secondary) is completely absent from funded education.", design:"Decera Clinical Education proposes a First-in-Class FSGS Curriculum — three modules: (1) diagnostic workup and APOL1 genetic testing, (2) genetic-vs-primary treatment expectation-setting, (3) proteinuria-triggered escalation. Unmet subpopulation lens (APOL1-positive patients specifically). Decera would own the reference activity in a field where no reference activity exists — a defensible position for 24+ months."}]},
 "Vertex":{spaces:["nephrology"], portal:"No nephrology grants route published yet", url:"https://www.vrtx.com/",
  cycles:[{when:"2026-08-10", label:"No published renal areas of interest", topics:["(none published — povetacicept PDUFA 30 Nov 2026 would be Vertex's first renal product)"]}],
  gaps:[{space:"nephrology", gap:"Vertex has PDUFA 30 Nov 2026 for povetacicept (IgAN) — their first-ever renal approval — with no published renal areas of interest, no renal grants portal, and no established provider relationships. Every competing provider (Medscape, PeerView, ACHL, PRIME) will be pitching the same day the portal opens. First-mover advantage window: weeks, not months.", design:"Decera Clinical Education proposes: (1) scientific-exchange engagement NOW around IgAN unmet need — no ask, positioning-only; (2) fully-costed IgAN Launch Readiness Activity on the shelf, indication-agnostic wrapper so it can convert to any labelled population within 5 business days of approval; (3) offer to co-design the areas-of-interest document itself. Sequencing/timing lens is the entire play. This is the single highest-leverage opportunity in the hub."}]},
 "Roche / Genentech":{spaces:["nephrology","ophthalmology"], portal:"Genentech Independent Medical Education (iMED)", url:"https://www.gene.com/good/grants/independent-medical-education",
  cycles:[{when:"2026-08-10", label:"Named RFP areas", topics:["Lupus nephritis","Primary membranous nephropathy","IgA nephropathy","Wet AMD durability (Vabysmo / Susvimo)"]}],
  changed:[{when:"2026-06", what:"The dated implementation-science RFP closed 30 June 2026; no replacement dated call has appeared."},{when:"2025-10", what:"Gazyva approved in lupus nephritis, shifting that topic from pipeline to launch."}],
  gaps:[{space:"nephrology", gap:"Primary membranous nephropathy (PMN) has essentially zero dedicated CME across all major providers — Medscape and PeerView have general glomerular disease activities, none PMN-specific. Genentech's obinutuzumab priority-review decision creates a launch window with no reference curriculum for the field to point to. Rituximab-vs-tacrolimus is entrenched habit; new options need active reframing.", design:"Decera Clinical Education proposes a Primary Membranous Nephropathy Curriculum (the first) — three modules: anti-PLA2R serology-driven diagnosis, treat-vs-observe decision at 6-month proteinuria checkpoint, and the anti-CD20 vs calcineurin-inhibitor choice reframed by obinutuzumab data. Unmet subpopulation lens (PMN specifically). Decera owns the reference position in a category with no incumbent."}]},
 "Apellis":{spaces:["nephrology","ophthalmology"], portal:"Apellis Independent Medical Education", url:"https://apellis.com/grants-and-giving/",
  cycles:[{when:"2026-08-10", label:"Published areas", topics:["C3 glomerulopathy","IC-MPGN","Geographic atrophy / AMD (Syfovre)","Retina Fellow Research Grant"]}],
  changed:[{when:"2025-07", what:"First-ever therapy approved in IC-MPGN, creating a field with no prescriber frame of reference at all."}],
  gaps:[{space:"nephrology", gap:"C3G and IC-MPGN prescribers have no comparator experience — before 2025, there was no approved therapy at all. Standard therapeutics-first CME format (which Medscape and PRIME default to) misses the actual gap: biopsy interpretation, complement pathway literacy, and recognising the disease in the first place. Apellis funds product-adjacent activity that assumes literacy the audience does not have.", design:"Decera Clinical Education proposes a Complement-Mediated Glomerular Disease Foundation Curriculum — sequenced from pathology upward: (1) biopsy interpretation with pathologist faculty, (2) complement pathway literacy for the clinician, (3) therapeutic decision-making. Novel-format lens (pathology-anchored, not therapeutics-anchored). Unmet-subpopulation lens (the majority of prescribers, who lack complement fluency)."}]},
 "Aurinia":{spaces:["nephrology"], portal:"Aurinia Medical Education Grants", url:"https://www.auriniapharma.com/independent-medical-education",
  cycles:[{when:"2026-08-10", label:"Published area", topics:["Lupus nephritis (Lupkynis)"]}],
  gaps:[{space:"nephrology", gap:"Aurinia funds only Lupkynis-relevant LN education, and every existing LN CME (PeerView, ACHL) is single-specialty — rheumatology talks to rheumatologists, nephrology to nephrologists. But the actual care failure happens at the referral hand-off: rheumatology-diagnosed SLE patients arrive at nephrology with proteinuria already established, months later than they should.", design:"Decera Clinical Education proposes a Dual-Audience Lupus Nephritis Care Pathway — designed for joint rheum/neph learning, built around three referral hand-off vignettes (early proteinuria, treatment escalation, remission monitoring). Faculty mix intentionally rheumatology + nephrology at every module. Implementation lens (the referral pathway is the intervention). Voclosporin naturally sits within the escalation module without product framing."}]},
 "J&J":{spaces:["immunology"], portal:"Johnson & Johnson Independent Medical Education", url:"https://www.jnj.com/partners/independent-medical-education",
  cycles:[{when:"2026-08-10", label:"Published areas", topics:["Crohn's disease","Ulcerative colitis","Psoriatic arthritis","Ankylosing spondylitis","Rheumatoid arthritis","Generalized myasthenia gravis","Implementation science"]}],
  changed:[{when:"2026-07", what:"Icotrokinra approved in plaque psoriasis with first-line systemic positioning, adding an oral-versus-injectable question the published topic list does not yet name."}],
  gaps:[{space:"immunology", sub:"derm", gap:"J&J's icotrokinra (IL-23R oral) was approved July 2026 in plaque psoriasis with first-line systemic positioning and adolescent labelling — but psoriasis is conspicuously absent from J&J's published IME topic list. That absence is likely a document-lag, not intent; the funder pathway is functionally open with no queue and no competing pitches. Medscape and PeerView have not scoped adolescent-specific psoriasis activity.", design:"Decera Clinical Education proposes an Adolescent & Young Adult Psoriasis First-Line Systemic Curriculum — step-therapy decision-making with oral IL-23R specifically framed for the adolescent transition-of-care window (13-21). Unmet subpopulation lens (adolescents), novel-format lens (transition-of-care longitudinal design). Pitch during the pre-publication window while the topic list still says nothing about psoriasis."}]},
 "Takeda":{spaces:["immunology","raredisease"], portal:"Takeda Independent Medical Education", url:"https://www.takeda.com/who-we-are/company-information/independent-medical-education/",
  cycles:[{when:"2026-08-10", label:"Currently accepting", topics:["IBD","Eosinophilic esophagitis","Short bowel syndrome / SBS-IF","CIDP","Hereditary angioedema","Primary immunodeficiency","Rare metabolic / lysosomal"]}],
  changed:[{when:"2026-08", what:"SLE and psoriatic arthritis are no longer accepting submissions — a withdrawal, not an omission. The accepted list rotates, so re-check before writing to it."}],
  gaps:[{space:"immunology", sub:"gastro", gap:"Takeda names EoE and SBS-IF alongside IBD in a single 'gastroenterology' bucket, and most competing providers (Medscape, PRIME) fold EoE education under IBD umbrellas. But EoE prescribers are allergists as much as gastroenterologists, and SBS-IF is a nutrition-support specialty audience — neither of them attends IBD-framed CME.", design:"Decera Clinical Education proposes separated tracks: (1) EoE Multi-Specialty Curriculum with allergy + GI + pathology faculty around the dupilumab-vs-budesonide-oral-suspension decision; (2) SBS-IF Nutrition-Support Curriculum with intestinal-failure faculty around teduglutide selection and weaning parenteral nutrition. Faculty mix + unmet subpopulation lens (audience segmentation the umbrella framing has been suppressing)."}]},
 "Incyte":{spaces:["immunology"], portal:"Incyte Grants & Giving", url:"https://www.incyte.com/who-we-are/grants-and-giving",
  cycles:[{when:"2026-08-10", label:"Stated interest (no public topic list)", topics:["Atopic dermatitis","Vitiligo","Hidradenitis suppurativa"]}],
  changed:[{when:"2026-08", what:"Positive Phase 3 for oral povorcitinib in HS and a topical HS readout guided to Q4 2026 — HS moves from niche to launch-stage."}],
  gaps:[{space:"immunology", sub:"derm", gap:"Every existing HS activity (Medscape, PeerView, ACHL) is anchored on adalimumab/secukinumab biologic decision-making — Hurley Stage III patients. But the ~70% of HS patients sitting at Hurley Stage I-II are managed (badly) in primary care and dermatology with no funded education. Povorcitinib and topical HS approvals in Q4 2026 land into a mild-to-moderate literacy vacuum.", design:"Decera Clinical Education proposes a Mild-to-Moderate HS Recognition & Management Curriculum — Hurley staging refresh, topical clindamycin/resorcinol positioning, oral JAK sequencing, when-to-escalate criteria. Unmet subpopulation lens (Stage I-II). Novel-format lens (dermatology + primary care dual audience). Sequencing lens (built to refresh at each Q4 2026 approval)."}]},
 "Galderma":{spaces:["immunology"], portal:"Galderma Grants (RFP-gated)", url:"https://www.galderma.com/grants",
  cycles:[{when:"2026-08-10", label:"RFP-only", topics:["Dermatology (topics defined per RFP)"]}],
  changed:[{when:"2024-11", what:"Monetary grants moved to RFP-gated only — unsolicited requests are no longer a route. Watch the RFP page rather than the general portal."}],
  gaps:[{space:"immunology", sub:"derm", gap:"Galderma's RFP-gated model means the topic is defined per-window with 4-6 week response times — every competing provider (Medscape, PeerView) is caught flat-footed at each drop. Structural gap: not what to teach, but the ability to respond fast enough to submit anything credible.", design:"Decera Clinical Education proposes a shelf-ready modular dermatology framework — three pre-built activity skeletons (acne, rosacea, atopic dermatitis) with faculty and outcomes plans pre-scoped, so any Galderma RFP can be re-costed and re-scoped inside 5 business days. Implementation lens (submission-velocity is the differentiator, not the content). Format Medscape and PeerView cannot match without shifting to templated pre-work."}]},
 "LEO Pharma":{spaces:["immunology"], portal:"LEO Pharma medical education", url:"https://www.leo-pharma.com/",
  cycles:[{when:"2026-08-10", label:"Stated focus", topics:["Dermatology continuing education"]}],
  gaps:[{space:"immunology", sub:"derm", gap:"LEO is one of the few pure-play dermatology funders (delgocitinib, tralokinumab commercial priorities), but the medical education portal showed a stale banner at last check — no dated RFP, no updated topic list, no submission confirmation. Pipeline signal (chronic hand eczema data) says the funding is coming; portal signal says the route is broken.", design:"Decera Clinical Education proposes: (1) direct outreach to LEO US Medical Affairs to confirm the route is live before any concept investment; (2) if confirmed, a Chronic Hand Eczema Recognition curriculum — the diagnostic gap between irritant/allergic/atopic that primary care and dermatology consistently miss. Implementation lens (route-confirmation first, content second — protects the concept from wasted development)."}]},
 "Bristol Myers Squibb":{spaces:["immunology"], portal:"BMS Independent Medical Education", url:"https://www.bms.com/about-us/responsibility/independent-grants.html",
  cycles:[{when:"2026-08-10", label:"Stated areas", topics:["Immunology","Lupus"]}],
  gaps:[{space:"immunology", sub:"rheum", gap:"BMS's RFP table posts intermittently (sometimes months of silence) and stated areas are wide (immunology, lupus) — impossible to time proactively. Deucravacitinib in PsA/SLE is the pipeline signal but no dated funding follows. Every provider (Medscape, PeerView, PRIME) chases the same broad topic areas without differentiation.", design:"Decera Clinical Education proposes: (1) automated RFP-watch as a service tier — Decera pings BMS Medical Affairs monthly, positioning as low-friction partner; (2) a warm TYK2-Class Literacy curriculum on standby (mechanism-first, not deucravacitinib-branded) — sequencing lens, deploys within days of any dated RFP. Faculty mix rheumatology + dermatology (SLE + PsA + psoriasis triangulation)."}]},
 "AbbVie":{spaces:["immunology","ophthalmology"], portal:"AbbVie IME Provider Network (invited only)", url:"https://www.abbvie.com/our-company/partnerships/independent-medical-education.html",
  cycles:[{when:"2026-08-10", label:"Invited network only", topics:["DME","Glaucoma","Immunology (via network members)"]}],
  changed:[{when:"2024-01", what:"Funding restricted to an invited IME Provider Network — verify membership before investing any concept development time."}],
  gaps:[{space:"ophthalmology", gap:"AbbVie restricted IME funding to an invited Provider Network in Jan 2024 — every non-member provider is functionally locked out regardless of topic quality. Medscape and PeerView are in; smaller providers, unknown. Access, not concept, is the entire binding constraint. Investing concept-development time before verifying network status is wasted work.", design:"Decera Clinical Education proposes a pre-work: (1) formal network-membership verification via AbbVie US Medical Affairs, in writing; (2) if member — DME step-therapy and glaucoma SLT-first curricula ready to deploy; (3) if not — pursue Provider Network application before any concept development. Implementation lens (route confirmation is the differentiation opportunity). Concept work at the wrong step wastes the entire budget."}]},
 "Alexion / AstraZeneca (Rare)":{spaces:["raredisease"], portal:"Alexion rare-disease grants office", url:"https://alexion.com/our-responsibility/grants-and-giving",
  cycles:[{when:"2026-08-10", label:"Published areas", topics:["Complement-mediated disease","PNH","aHUS","C3 glomerulopathy","Rare hematology","Rare renal"]}],
  gaps:[{space:"raredisease", gap:"Alexion's portfolio spans PNH, aHUS, gMG, NMOSD, C3G — each new indication expands the prescriber base into physicians (community heme, community neuro, community nephro) who have no complement pathway training. Every existing CME (PeerView, ACHL) assumes complement literacy the audience does not have, then teaches the therapeutic. Structural mismatch, not a topic gap.", design:"Decera Clinical Education proposes a Complement Pathway Foundation Curriculum for the Non-Specialist — a single 30-minute foundational module designed to sit UNDER any indication-specific activity (PNH, aHUS, gMG, C3G, NMOSD). Reusable asset that increases the ROI of every downstream Alexion-funded activity, including competitor providers'. Novel-format lens (modular foundational layer). Positions Decera as infrastructure, not competitor."}]},
 "Sanofi (Genzyme / Rare)":{spaces:["raredisease"], portal:"Sanofi grants", url:"https://www.sanofi.com/en/our-responsibility/grants",
  cycles:[{when:"2026-08-10", label:"Published areas", topics:["Lysosomal storage disorders","Rare blood disorders","Rare neurology"]}],
  gaps:[{space:"raredisease", gap:"For every Sanofi lysosomal disease (Pompe, Fabry, Gaucher, MPS), the mean diagnostic odyssey is 5-7 years — patients cycle through 4-8 specialists before diagnosis. Every existing rare-disease CME (Medscape, PeerView) targets the treating specialist, not the generalist who could shorten that odyssey. Funded education is aimed at the wrong audience for the actual clinical problem.", design:"Decera Clinical Education proposes a Rare Disease Recognition-and-Referral Curriculum for the Generalist — primary care, ER, and community internal medicine as the audience; red-flag pattern recognition (cardiac + renal + neurological co-occurrence) not therapeutic detail. Unmet subpopulation lens (the audience). Implementation lens (referral pathway). Independent framing is essential — a Sanofi-branded 'refer to us' activity fails at accreditation."}]},
 "Amgen (Ultra-Rare / Horizon)":{spaces:["raredisease","ophthalmology"], portal:"Amgen ultra-rare grants", url:"https://www.amgen.com/science/independent-medical-education",
  cycles:[{when:"2026-08-10", label:"Published areas", topics:["Thyroid eye disease","Gout / CPP disease","Rare autoimmune"]}],
  changed:[{when:"2026-07", what:"A second anti-IGF-1R agent was approved in TED, turning a single-option field into a comparative one."}],
  gaps:[{space:"ophthalmology", gap:"Second anti-IGF-1R agent (Horizon's veligrotug approval July 2026) turned TED from a single-option field (teprotumumab) into a comparative one — but hearing toxicity is a class effect that neither sponsor can credibly educate on. Every existing TED CME (PeerView, PRIME) is teprotumumab-monotherapy framed. Selection, monitoring audiogram cadence, and stopping rules are all under-served.", design:"Decera Clinical Education proposes a Comparative TED Selection & Monitoring Programme — three-audience faculty (oculoplastics, endocrinology, ENT/audiology for hearing monitoring), independent framing that both Amgen and Horizon can co-fund because neither can deliver it alone. Novel-format lens (three-specialty joint activity). Sequencing lens (selection + monitoring + stop-rule as a decision arc)."}]},
 "Sobi":{spaces:["raredisease"], portal:"Sobi grants", url:"https://www.sobi.com/en/independent-medical-education",
  cycles:[{when:"2026-08-10", label:"Published areas", topics:["Rare hematology","Hereditary angioedema","Rare immunology"]}],
  gaps:[{space:"raredisease", gap:"HAE therapeutics enter genuine competition in 2026-27 as sebetralstat (Sobi/KalVista) and deucrictibant (Pharvaris) both target oral on-demand — a route change from injectable/IV. Every existing HAE CME (Medscape, PeerView) is prophylaxis-vs-on-demand framed for the injectable era; nothing addresses the oral on-demand behavioural change (carry-with-you dosing decisions, when to still self-administer icatibant).", design:"Decera Clinical Education proposes an Oral On-Demand HAE Decision Curriculum — attack-severity classification, oral-vs-injectable branching, prophylaxis-de-escalation criteria once oral rescue is reliable. Sequencing lens (refreshes at each oral approval). Novel-format lens (patient-carried decision aid, not clinician-only). Unmet subpopulation lens (patients on injectable prophylaxis who may de-escalate)."}]},
 "Chiesi Global Rare Diseases":{spaces:["raredisease"], portal:"Chiesi Global Rare Diseases (CyberGrants)", url:"https://www.chiesirarediseases.com/",
  cycles:[{when:"2026-08-10", label:"Published areas", topics:["Rare metabolic","Lysosomal disorders"]}],
  changed:[{when:"2026-03", what:"US IME submissions moved to CyberGrants — a new route, so historical contacts and processes no longer apply."}],
  gaps:[{space:"raredisease", gap:"Chiesi's US IME migration to CyberGrants (March 2026) reset every incumbent provider relationship — Medscape, PeerView, ACHL all had historical Chiesi ties that no longer apply. Sparse published topic detail means whoever submits first defines the reference activity for cystinosis (Procysbi) and lysosomal disorder education.", design:"Decera Clinical Education proposes: (1) immediate CyberGrants registration and submission of a Cystinosis Adherence & Transition-of-Care activity — the pediatric-to-adult handoff where treatment adherence collapses; (2) leverage the empty-queue window before incumbents recover their relationships. Sequencing/timing lens (first-mover in a reset field). Unmet subpopulation lens (adolescent-to-adult cystinosis transition, which no funded activity addresses)."}]},
 "Amgen (Thyroid Eye Disease)":{spaces:["ophthalmology"], portal:"Amgen IME — TED", url:"https://www.amgen.com/science/independent-medical-education",
  cycles:[{when:"2026-08-10", label:"Named topics published", topics:["Thyroid eye disease","Accredited education only","No fellowships"]}],
  gaps:[{space:"ophthalmology", gap:"Amgen's TED-specific funding page is the most explicitly documented ophthalmology target in the hub — named topic (TED), accredited-only constraint, no-fellowships rule, unsolicited route open. Yet most providers (Medscape, PeerView) submit generic ophthalmology activities that miss the accredited-only requirement or ignore the fellowship exclusion — mechanical disqualification, not concept failure.", design:"Decera Clinical Education proposes a specification-matched Accredited Multi-Specialty TED Activity — built to Amgen's published constraints exactly (accredited by ACCME/ACPE, ophthalmology + endocrinology + audiology faculty, no fellowship component). Implementation lens (the constraint document is the design brief). This is the hub's highest-probability short-cycle win — the constraints are published, so building to them is a mechanical execution problem, not a concept problem."}]},
 "Astellas (Iveric Bio)":{spaces:["ophthalmology"], portal:"Astellas medical education grants", url:"https://www.astellas.com/us/independent-medical-education",
  cycles:[{when:"2026-08-10", label:"Named CGAs plus general submissions", topics:["Retina / geographic atrophy (Izervay)","Diabetic macular edema"]}],
  gaps:[{space:"ophthalmology", gap:"Existing GA education from Medscape, PeerView and PRIME is initiation-focused (patient selection, injection technique, complement pathway). Almost nothing addresses stopping rules, expectation-setting around ~20% slowing of lesion growth, or the shared-decision conversation with a legally-blind-trending patient — the questions retina specialists actually ask 12 months into therapy.", design:"Decera Clinical Education proposes a longitudinal GA Care Continuum activity — a 3-part series with paired patient/clinician video vignettes at month-3, month-12 and month-24 decision points, built around published trial extension data on Izervay and Syfovre. Sequencing lens (stop/switch/continue), not another initiation module. Format competitors have not built."}]},
 "Bausch + Lomb":{spaces:["ophthalmology"], portal:"Bausch + Lomb (caring@bausch.com)", url:"https://www.bausch.com/",
  cycles:[{when:"2026-08-10", label:"Core eye care", topics:["Retina","Dry eye (Miebo)","Glaucoma"]}],
  gaps:[{space:"ophthalmology", gap:"Optometrists prescribe or recommend the majority of first-line dry-eye therapy (including Miebo), yet every existing dry-eye CME (Medscape, PeerView, ACHL) is MD-audience framed with continuing-ed credits ophthalmologists want and optometrists cannot use. The largest addressable audience is functionally locked out of the reference activities.", design:"Decera Clinical Education proposes an Optometry-Inclusive Ocular Surface Programme — dual-accredited (COPE + AMA PRA) so both OD and MD earn credit, structured around three co-management vignettes (dry eye escalation, MGD, referral for surgical dry eye). Faculty mix intentionally OD + MD at every module. Novel-format + unmet subpopulation lens (the OD audience). Decera's dual-accreditation infrastructure is the specific asset — MD-only providers cannot replicate it quickly."}]},
 "Tarsus":{spaces:["ophthalmology"], portal:"Tarsus grants", url:"https://www.tarsusrx.com/",
  cycles:[{when:"2026-08-10", label:"Published area", topics:["Demodex blepharitis / ocular surface (Xdemvy)"]}],
  gaps:[{space:"ophthalmology", gap:"Xdemvy uptake is capped by a single upstream step: lash-margin exam with the patient looking down is not routinely taught in optometry or general ophthalmology CE. Existing Tarsus-adjacent education (PRIME, ACHL) treats Demodex as a therapeutics topic, not a diagnostic-skill topic — so the education never touches the actual constraint.", design:"Decera Clinical Education proposes a 15-minute procedural micro-learning: slit-lamp video, side-by-side normal vs collarette lash margin, embedded in a broader ocular-surface differential (dry eye vs MGD vs Demodex). Novel-format lens (procedural micro-learning, not lecture) paired with optometry-inclusive audience — the two things no funded activity is doing here."}]},
 "Alcon":{spaces:["ophthalmology"], portal:"Alcon Grants & Giving (closed)", url:"https://www.alcon.com/grants-and-giving",
  cycles:[{when:"2026-08-10", label:"Published annual goals (portal closed)", topics:["Cataract / IOL","Vitreoretinal","Glaucoma","Dry eye / ocular surface"]}],
  changed:[{when:"2026-08", what:"Portal remains CLOSED; reopening expected Fall 2026 for 2027 activities, with no date published. Topics are aligned to published annual goals, so the goals document is the thing to watch."}],
  gaps:[{space:"ophthalmology", gap:"Alcon's four published goal areas (Cataract/IOL, Vitreoretinal, Glaucoma, Dry Eye) all fund device- and procedure-anchored education, and the vast majority of existing CME on their goal list — Medscape, PeerView, ACHL — is didactic lecture. What no competitor is producing: video-based surgical technique curricula for the ASC-based cataract surgeon on premium IOL patient selection and toric alignment, and no one is building optometry–ophthalmology co-management education for dry eye and glaucoma where the actual clinical hand-off breaks down.", design:"Decera Clinical Education proposes a two-track programme keyed to the reopening: (1) a Premium IOL Decision Clinic — case-based video simulation with intra-op decision points, targeting the ~40% of US cataract surgeons who do <10 premium IOLs/month (unmet subpopulation lens); (2) an Optometry-Inclusive Ocular Surface & Glaucoma Co-Management pathway, mirroring the Bausch + Lomb dry-eye gap and closing the referral loop that Alcon's goal document names but no funded activity delivers (novel-format + implementation lens). Decera has the accredited OD/MD dual-audience infrastructure — Medscape and PeerView do not."}]},
 "Regeneron":{spaces:["ophthalmology"], portal:"Regeneron grants (rolling)", url:"https://www.regeneron.com/responsibility/independent-medical-education",
  cycles:[{when:"2026-08-10", label:"Rolling, no public RFP", topics:["Retina (Eylea / Eylea HD)"]}],
  gaps:[{space:"ophthalmology", gap:"Anti-VEGF durability is the live question, but funded education (Medscape, PeerView) still frames it as an Eylea-HD-vs-Vabysmo comparison. The real 2026–27 disruption is intravitreal TKI sustained-release (axitinib implant, EYP-1901) — no independent CME is preparing retina specialists for how monitoring, retreatment triggers, and patient counselling change when the delivery paradigm shifts from injection cadence to implant lifespan.", design:"Decera Clinical Education proposes a Sustained-Release Readiness curriculum — pre-launch education framed around monitoring protocol design and patient-selection heuristics, sequencing lens. Refreshed at each TKI readout so it becomes the reference activity when the first approval lands. Faculty mix retina + pharmacy + trial PI — a combination the anti-VEGF-vendor-adjacent providers have not assembled."}]}
};
/* WEEKLY-EMPHASIS-END */

/* WEEKLY-RFPDL-START — the Monday/Thursday task maintains this block.
   Dated grant/RFP deadlines. This drives the banner at the very top of the page,
   which shows anything falling inside the next 90 days.
   Shape:
   {co, title, space:[keys] | "all", due:"YYYY-MM-DD", confirmed:true|false,
    budget?, portal, url, note}
   `confirmed:true` means the funder has PUBLISHED that date on its own portal or
   in a dated RFP document, and you have seen it this run. `confirmed:false` is a
   company-signalled expectation with no published date — it renders separately and
   is never counted as a deadline. NEVER upgrade an entry to confirmed:true without
   seeing the date on the funder's own page. An invented deadline makes Leen miss a
   real one. If nothing is confirmed, leave the array empty — an empty banner that
   says so is correct and useful; a padded one is not. */

const RFPDL_UPDATED = "August 19, 2026";

const RFPDL_NOTE = "This is the grant-opportunity calendar. It shows dated RFP / CGA / CFG calls (any naming variant) in the six non-oncologic areas, newest deadline first, each linked to its posting — a direct PDF link where the funder posts one. Right now no funder has a published, dated, in-scope deadline (Pfizer's open dated calls are all haemophilia, vaccines or oncology — out of scope), so the section below is the standing public-portal directory: where each company posts, and how often. The weekly task pulls fresh dated postings from these portals and the Alliance (ACEHP) hub as they appear. Note: the Alliance is a useful cross-company hub, but NOT every company posts there — so the individual company portals below stay primary.";

/* Naming-variant recognition. Funders call the same thing many names — RFP,
   CGA (Competitive Grant Announcement / Application), CFG (Call for Grants),
   RFA, CFP, LOI, "areas of interest". Normalise so the section catches them all. */

const RFP_VARIANTS = {
  "rfp":"RFP", "request for proposal":"RFP", "request for proposals":"RFP",
  "cga":"CGA", "competitive grant announcement":"CGA", "competitive grant application":"CGA", "competitive grant":"CGA",
  "cfg":"CFG", "call for grant":"CFG", "call for grants":"CFG",
  "rfa":"RFA", "request for application":"RFA", "request for applications":"RFA",
  "cfp":"CFP", "call for proposal":"CFP", "call for proposals":"CFP",
  "cgn":"CGN", "continuous grant":"CGN", "continuous grant notification":"CGN", "continuous grant submission":"CGN",
  "loi":"LOI", "letter of intent":"LOI",
  "aoi":"AOI", "area of interest":"AOI", "areas of interest":"AOI"
};

const RFPDL = [];

/* Standing public grant portals — the directory. Where each company posts IME/CME
   grant calls, and the cadence, so the calendar is useful even between dated calls.
   The weekly task adds a dated RFPDL entry above the moment one of these posts. */

const RFP_PORTALS = [
 {co:"Alliance / ACEHP (all companies)", space:"all", variant:"RFP·CGA·CGN", cadence:"Central cross-company hub", portal:"ACEHP: RFP, CGN & CGA Opportunities", url:"https://www.acehp.org/Resources/RFP-CGN-and-CGA-Opportunities", note:"The best cross-company list of open calls, each a downloadable PDF. Not every company posts here — check company portals too — but start here."},
 {co:"Pfizer", space:["cardiovascular","nephrology","endocrinology","immunology","raredisease","ophthalmology"], variant:"RFP", cadence:"Dated RFP table, year-round", portal:"Pfizer Competitive Grants", url:"https://www.pfizer.com/about/programs-policies/grants/competitive-grants", note:"Live table of dated calls with PDF links + closed archive. Filter to Internal Medicine / I&I / Rare Disease."},
 {co:"GSK", space:["immunology","raredisease"], variant:"CGA", cadence:"Call for Grant Applications", portal:"GSK US IME", url:"https://www.gskimefunding.com/ime/index.html", pdf:"https://www.gskimefunding.com/assets/ime/cga.pdf", note:"CGA PDF lists every open area, eligibility and dates."},
 {co:"AstraZeneca", space:["cardiovascular","nephrology","immunology","raredisease"], variant:"CGA", cadence:"Educational Areas / CGA", portal:"AZ Medical Education Grants Office", url:"https://www.astrazeneca.com/content/az-us/sustainability/Request-Support/medical-education-office/educational-areas-call-for-grants.html", note:"CGAs by educational area — CVRM, Respiratory & Immunology, Rare Disease."},
 {co:"Bristol Myers Squibb", space:["immunology"], variant:"RFP", cadence:"RFPs, updated year-round", portal:"BMS Request for Proposals (Education)", url:"https://www.bms.com/our-impact/corporate-giving/funding-opportunities/request-for-proposals-education.html", note:"Direct RFP-for-education listing; immunology and lupus."},
 {co:"AbbVie", space:["immunology","ophthalmology"], variant:"CFG", cadence:"Call for Grants (IME Provider Network)", portal:"AbbVie Independent Educational Grants", url:"https://www.abbvie.com/science/independent-educational-grants.html", note:"Uses 'Call for Grants' (CFG); most funding gated to the IME Provider Network, CFGs open to all."},
 {co:"Novartis", space:["cardiovascular","nephrology","immunology"], variant:"RFP", cadence:"Named RFPs + rolling", portal:"Novartis Professional Medical Education Grants", url:"https://www.novartis.com/us-en/healthcare-professionals/external-funding/educational-grants/professional-medical-education-grants", note:"Named RFPs by topic — IgAN, C3G, AF/ASCVD, Sjögren's."},
 {co:"Genentech / Roche", space:["nephrology","ophthalmology"], variant:"RFP", cadence:"Named RFPs via iMED", portal:"Genentech Requests for Proposals", url:"https://www.gene.com/good/giving/corporate-giving/requests-for-proposals", note:"Each RFP is a PDF; names specific diseases incl. IgAN."},
 {co:"Eli Lilly", space:["endocrinology","immunology"], variant:"CFG", cadence:"Call for Grants + rolling", portal:"Lilly Grant Office — Call for Grants", url:"https://grantoffice.lilly.com/callforgrants", note:"Direct Call-for-Grants page; awarded-grants registry shows what actually funds."},
 {co:"Merck (MSD)", space:["cardiovascular","immunology"], variant:"RFP", cadence:"IME grant portal", portal:"MSD IME Grants", url:"https://www.msdimegrants.com/", note:"Merck's independent medical education grant portal; cardiometabolic and immunology among areas."},
 {co:"Gilead", space:["immunology","raredisease"], variant:"RFP", cadence:"IMED grants", portal:"Gilead Medical Education", url:"https://www.gilead.com/responsibility/medical-education", note:"Independent Medical Education (IMED) pathway; inflammation among areas."},
 {co:"Sanofi", space:["immunology","raredisease"], variant:"RFP", cadence:"US educational grants portal", portal:"Sanofi US Educational Grants", url:"https://www.sanofi.us/en/our-company/social-impact/corporate-social-responsibility/contributions-and-giving", note:"Immunology (atopic derm, asthma) and rare disease; portal at grants.sanofi.us."},
 {co:"Boehringer Ingelheim", space:["cardiovascular","endocrinology","immunology"], variant:"RFP", cadence:"IME grants", portal:"BI Medical Education Grants", url:"https://pro.boehringer-ingelheim.com/funding/medical-education-grants/", note:"Cardiometabolic (obesity/survodutide), MASH, immunology/ILD."},
 {co:"Amgen", space:["endocrinology","immunology","raredisease","ophthalmology"], variant:"RFP", cadence:"IME funding, year-round", portal:"Amgen Independent Medical Education", url:"https://www.amgen.com/responsibility/healthy-society/community-investment/independent-medical-education-funding", note:"Broadest published list — obesity, RA/PsA/AS, ANCA vasculitis, lupus, IBD, asthma; TED via ex-Horizon."},
 {co:"UCB", space:["immunology"], variant:"RFP", cadence:"Educational grants", portal:"UCB Grants", url:"https://www.ucb.com/innovation/funding/grants", note:"Immunology/dermatology and rheumatology (bimekizumab franchise)."},
 {co:"Johnson & Johnson", space:["immunology"], variant:"RFP", cadence:"Educational grants + Impl. Science RFPs", portal:"J&J Innovative Medicine Grants", url:"https://www.jnj.com/innovativemedicine/us/grants-and-giving/educational", note:"IBD, PsA, AS, RA, gMG, SLE; posts implementation-science RFPs."},
 {co:"Takeda", space:["immunology","raredisease"], variant:"RFP", cadence:"Rolling + rotating RFPs", portal:"Takeda IME Grants", url:"https://www.takeda.com/en-us/science/independent-medical-education-grants/", note:"IBD, EoE, SBS-IF, HAE, CIDP, rare metabolic."},
 {co:"Bayer", space:["cardiovascular","nephrology"], variant:"RFP", cadence:"Medical educational grants", portal:"Bayer Grants & Contributions", url:"https://www.grants-contributions.bayer.com/home/medical-educational-grants", note:"Stroke prevention, Cardio-Kidney-Metabolic, HF, CKD in T2D, lupus nephritis."},
 {co:"Novo Nordisk", space:["cardiovascular","endocrinology"], variant:"RFP", cadence:"External support", portal:"Novo Nordisk External Support", url:"https://www.novonordisk.com/contact-us/external-support.html", note:"Diabetes, obesity, MASH, CV outcomes in cardiometabolic."},
 {co:"Alnylam", space:["raredisease","nephrology"], variant:"RFP", cadence:"Dated RFPs (often via ACEHP)", portal:"Alnylam Grants & Giving", url:"https://www.alnylam.com/about-alnylam/grants-and-giving", note:"ATTR-CM and rare renal; dated RFPs with real budgets, mirrored on ACEHP as PDFs."},
 {co:"Vertex", space:["nephrology","raredisease"], variant:"RFP", cadence:"Grants & giving", portal:"Vertex Grants & Giving", url:"https://www.vrtx.com/our-company/grants-giving/", note:"No renal areas published yet — povetacicept PDUFA 30 Nov 2026 would be its first renal product. Watch this portal."},
 {co:"Otsuka", space:["nephrology"], variant:"RFP", cadence:"IME", portal:"Otsuka Independent Medical Education", url:"https://www.otsuka-us.com/independent-medical-education", note:"IgAN (sibeprenlimab) and ADPKD."},
 {co:"Travere", space:["nephrology"], variant:"RFP", cadence:"IME", portal:"Travere Independent Medical Education", url:"https://travere.com/independent-medical-education/", note:"IgAN (sparsentan), FSGS, non-immunosuppressive management."},
 {co:"Apellis", space:["nephrology","ophthalmology"], variant:"RFP", cadence:"IME portal", portal:"Apellis Medical Education", url:"https://apellis.envisionpharma.com", note:"C3G/IC-MPGN and geographic atrophy (Syfovre)."},
 {co:"Aurinia", space:["nephrology"], variant:"RFP", cadence:"IME", portal:"Aurinia Independent Medical Education", url:"https://www.auriniapharma.com/independent-medical-education", note:"Lupus nephritis (Lupkynis) — single-indication funder."},
 {co:"Alexion / AstraZeneca (Rare)", space:["raredisease"], variant:"RFP", cadence:"Grants portal", portal:"Alexion Grants", url:"https://alexion.com/grants", note:"Complement (PNH, aHUS, C3G), rare hematology and renal."},
 {co:"Sobi", space:["raredisease"], variant:"RFP", cadence:"US IME (CyberGrants)", portal:"Sobi Grants", url:"https://grants.sobi.com/", note:"Rare hematology, HAE, rare metabolic/lysosomal."},
 {co:"Chiesi Global Rare Diseases", space:["raredisease"], variant:"CGA", cadence:"CyberGrants portal", portal:"Chiesi Global Rare Diseases Grants", url:"https://www.cybergrants.com/chiesi/landingpage", note:"Rare metabolic and lysosomal; newly restructured US route."},
 {co:"CSL", space:["raredisease","immunology"], variant:"RFP", cadence:"IME grants", portal:"CSL Independent Medical Education", url:"https://www.csl.com/research-and-development/awards-grants-and-initiatives/independent-medical-education-grants", note:"HAE, immunology/immunodeficiency, rare hematology."},
 {co:"Incyte", space:["immunology"], variant:"RFP", cadence:"RFP-gated (since Nov 2024)", portal:"Incyte Grants & Giving", url:"https://www.incytegrantsandgiving.com/", note:"Dermatology — atopic derm, vitiligo, HS; monetary grants by RFP."},
 {co:"Galderma", space:["immunology"], variant:"RFP", cadence:"RFP-only", portal:"Galderma Request for Proposals", url:"https://galderma-portal.idea-point.com/Request-for-Proposals.aspx?groupid=GRANT", note:"Dermatology; topics defined per RFP, no standing list."},
 {co:"LEO Pharma", space:["immunology"], variant:"RFP", cadence:"Dermatology CE", portal:"LEO Pharma Grants", url:"https://leo-portal.idea-point.com/", note:"Pure-play dermatology funder."},
 {co:"Astellas", space:["ophthalmology"], variant:"RFP", cadence:"IME", portal:"Astellas Grants — IME", url:"https://www.astellasgrants.com/IndependentMedicalEducation.html", note:"Retina / geographic atrophy (Izervay), diabetic macular edema."},
 {co:"Bausch + Lomb", space:["ophthalmology"], variant:"RFP", cadence:"IRC / CME grants", portal:"Bausch + Lomb Independent Research & CME", url:"https://www.bausch.com/product-innovation/independent-research-cme-grants/", note:"Retina, dry eye (Miebo), glaucoma; optometry audience often under-included."},
 {co:"Tarsus", space:["ophthalmology"], variant:"RFP", cadence:"Medical education", portal:"Tarsus Medical Education", url:"https://www.tarsus-science.com", note:"Demodex blepharitis / ocular surface (Xdemvy)."},
 {co:"Alcon", space:["ophthalmology"], variant:"CFG", cadence:"Annual cycle — reopens Fall 2026", portal:"Alcon Independent Medical Education", url:"https://www.alconscience.com/medical-education/independent/", note:"Fixed annual cycle; 2027 areas publish before the portal opens."},
 {co:"Regeneron", space:["ophthalmology","immunology"], variant:"RFP", cadence:"Named RFPs", portal:"Regeneron Educational Funding", url:"https://educationalfunding.regeneron.com", note:"Wet AMD durability (Eylea/Eylea HD); also immunology (Dupixent)."}
];

/* Congress lead-time checkpoints. Supporter approvals run 60–90 days, and satellite
   symposia must be pitched far earlier, so the hub works three checkpoints back
   from each congress start date instead of one 60-day cut-off. */

const CONF_CHECKPOINTS = [
 {months:3, label:"Travel + supporter follow-up", note:"Book travel and confirm with supporters about attendance; remember supporter approvals take 60–90 days."},
 {months:6, label:"Application timeline", note:"Stay ahead of the congress's own application and abstract deadlines."},
 {months:9, label:"Satellite proposal to supporters", note:"Get satellite-symposium proposals in front of supporters now — this is the window to secure a slot."}
];

const LEAD_DAYS_DEFAULT = 60;
/* WEEKLY-RFPDL-END */

/* WEEKLY-RADAR-START — the Monday/Thursday task maintains this block.
   Therapeutic Area Radar: date-stamped developments read through three lenses
   (clinical / commercial-access / regulatory), grouped by space.
   Shape:
   {space, sub?, title, impact:"high"|"medium"|"low", scope:"US"|"US+EU"|"Global",
    date:"YYYY-MM-DD", dateNote?:"…", cat:"short category tag",
    summary, clinical, commercial, regulatory, src:"source label", url}
   RULES: every entry needs a real date and a working source URL. If the exact
   day cannot be confirmed, use the first of the month and say so in `dateNote`
   — never present an approximated date as exact. */

const RADAR_UPDATED = "August 19, 2026";

const RADAR_LEDE = {
 cardiovascular:"A quiet stretch for new approvals — the story is in what has NOT been announced. The Lp(a) outcomes readout has slipped past its guided window, and the Factor XI class is waiting on a single decision.",
 nephrology:"The busiest space in the hub. Two IgA nephropathy approvals have landed inside nine months and two more decisions are due by December — the field goes from no options to four in barely a year.",
 endocrinology:"Obesity has moved from efficacy to differentiation: an oral small molecule is approved, an amylin combination is under review, and a triple agonist is filing. The education question is no longer whether these work but how to choose between them.",
 immunology:"Oral and first-line positioning is the live theme across dermatology and rheumatology. Hidradenitis suppurativa in particular is turning from an orphan interest into a competitive market.",
 raredisease:"The regulatory environment itself is the biggest development — FDA has formalised a lower evidentiary bar for ultra-rare individualised therapies, which changes what a grant-funded curriculum needs to cover.",
 ophthalmology:"Thyroid eye disease now has a second approved biologic, and two sustained-release TKIs are converging on wet AMD. Both create genuine sequencing and procedural education needs."
};

const RADAR = [
 /* ---------------- CARDIOVASCULAR ---------------- */
 {space:"cardiovascular", title:"Lp(a)HORIZON outcomes readout slips past its guided mid-2026 window with no disclosure",
  impact:"medium", scope:"Global", date:"2026-07-01", dateNote:"month-level; the absence of an announcement is the signal, so there is no single dated event",
  cat:"Lipids · Lp(a)",
  summary:"Novartis guided Phase 3 pelacarsen data for the first half of 2026 with regulatory submissions in the second half. The 8,323-patient Lp(a)HORIZON cardiovascular outcomes trial completed enrolment in 2023, but the mid-2026 readout window closed on 30 June without results being disclosed. Ionis, which licensed the asset to Novartis, has issued a statement on the revised timing.",
  clinical:"Lp(a) is the largest untreated residual-risk target in lipidology. Until this reads out, there is no outcomes evidence for any Lp(a)-lowering agent, and the whole class stays hypothesis-level.",
  commercial:"A delay pushes the first Lp(a) launch, and with it the first Lp(a) education budget, further right. Olpasiran's outcomes trial does not complete until 2027–2028.",
  regulatory:"Submissions were guided for H2 2026 and now look unlikely on that timeline. No FDA action date exists for any Lp(a) agent.",
  src:"Ionis Pharmaceuticals — statement on updated pelacarsen timing", url:"https://ir.ionis.com/static-files/66c5e90a-3651-480d-a596-1cf0d1a52991"},
 {space:"cardiovascular", title:"Asundexian is the Factor XI class's single live regulatory decision after two Phase 3 failures",
  impact:"high", scope:"US+EU", date:"2025-11-01", dateNote:"OCEANIC-STROKE topline announced November 2025; FDA decision guided Q4 2026",
  cat:"Anticoagulation · Stroke",
  summary:"The Factor XIa class has had a hard run — milvexian missed in acute coronary syndrome and asundexian missed in atrial fibrillation. OCEANIC-STROKE, in secondary prevention after non-cardioembolic ischaemic stroke, met both its efficacy and safety endpoints, and asundexian is now under FDA priority review with a decision guided for Q4 2026.",
  clinical:"A first Factor XI approval would open the class-positioning question that has no answer yet: where does an agent that decouples thrombosis from bleeding sit against DOACs, and in which patients.",
  commercial:"Bayer would hold the only approved asset in a class two large competitors have stumbled in. That is an unusually clean education runway.",
  regulatory:"Priority review; decision guided Q4 2026. Milvexian's LIBREXIA STROKE and LIBREXIA ACS both estimate completion in 2026, so a second readout could follow quickly.",
  src:"Bayer — asundexian in patients after non-cardioembolic ischaemic stroke", url:"https://www.bayer.com/en/us/news-stories/asundexian-in-patients-after-a-non-cardiovascular-ischemic-stroke"},

 /* ---------------- NEPHROLOGY ---------------- */
 {space:"nephrology", title:"FDA approves atacicept (Trutakna) — first dual BAFF/APRIL inhibitor in IgA nephropathy",
  impact:"high", scope:"US", date:"2026-07-07",
  cat:"IgAN · B-cell",
  summary:"Accelerated approval on the strength of ORIGIN 3, in which atacicept produced a 46% reduction in proteinuria from baseline and a 42% reduction versus placebo at week 36. It is the first dual BAFF/APRIL inhibitor cleared in IgAN, and the first commercial product Vera Therapeutics has ever launched.",
  clinical:"Adds a distinct upstream mechanism to a field that until recently had none. Approval is on proteinuria; it has not been established that atacicept slows long-term kidney function decline.",
  commercial:"A first-ever commercial launch means the grant programme and med-ed infrastructure are being stood up right now — the highest-leverage moment to be in the conversation.",
  regulatory:"Accelerated approval. Full approval depends on the two-year eGFR analysis, with a supplemental BLA targeted for Q4 2026.",
  src:"HCPLive — FDA Approves Atacicept (Trutakna) for IgA Nephropathy", url:"https://www.hcplive.com/view/fda-approves-atacicept-trutakna-for-iga-nephropathy"},
 {space:"nephrology", title:"Vera pulls the ORIGIN 3 eGFR analysis forward to Q3 2026 with FDA agreement",
  impact:"high", scope:"US", date:"2026-07-01", dateNote:"month-level; company announcement of the revised analysis plan",
  cat:"IgAN · Confirmatory",
  summary:"Vera aligned with FDA on an earlier eGFR analysis than the originally planned 2027 completion. Results are now expected in Q3 2026, with a supplemental BLA to support full approval targeted for Q4 2026.",
  clinical:"eGFR is the endpoint that actually matters to nephrologists. This is the readout that tells the field whether proteinuria reduction in IgAN translates into preserved kidney function.",
  commercial:"Compresses the launch timeline sharply. Enduring content commissioned now would land alongside the confirmatory data rather than a year behind it.",
  regulatory:"Converts accelerated approval to full. sBLA targeted Q4 2026.",
  src:"Vera Therapeutics — alignment with FDA on earlier ORIGIN analysis", url:"https://ir.veratx.com/news-releases/news-release-details/vera-therapeutics-announces-alignment-us-fda-earlier-origin"},
 {space:"nephrology", title:"IgA nephropathy goes from no targeted options to four inside roughly a year",
  impact:"high", scope:"US", date:"2026-08-01", dateNote:"synthesis of dated events, not a single announcement",
  cat:"IgAN · Class dynamics",
  summary:"Sibeprenlimab (Voyxact) was approved in November 2025 and atacicept (Trutakna) in July 2026. Two further decisions are pending: povetacicept with an FDA target date of 30 November 2026, and ravulizumab anticipated in Q4 2026. Fabhalta already holds accelerated approval.",
  clinical:"Sequencing and combination are now the unanswered clinical questions — which mechanism first, in whom, and what happens when proteinuria response and eGFR preservation diverge.",
  commercial:"Four or five sponsors will be competing for the same nephrologist audience within twelve months. Comparative and sequencing education is the gap none of them can fill alone, which is exactly what independent IME is for.",
  regulatory:"Two accelerated approvals already carry confirmatory obligations, so the evidence base will keep moving after launch.",
  src:"Medical Daily — second B-cell drug approved in July, two more decisions due by December", url:"https://www.medicaldaily.com/iga-nephropathy-atacicept-approval-fda-decisions-2026-476696"},

 /* ---------------- ENDOCRINOLOGY ---------------- */
 {space:"endocrinology", title:"Orforglipron (Foundayo) approved — first small-molecule oral GLP-1 for weight management",
  impact:"high", scope:"US", date:"2026-04-01",
  cat:"Obesity · Oral GLP-1",
  summary:"Approved 1 April 2026 for chronic weight management. Unlike oral semaglutide it is a small molecule, taken once daily with no fixed timing and no fasting window around the dose.",
  clinical:"Removes the administration burden that drives a large share of GLP-1 discontinuation. Shifts the conversation from access to adherence and to who is best served by an oral versus an injectable.",
  commercial:"Manufacturing a small molecule at scale is a different economic proposition from peptides — this is the asset most likely to widen the treated population rather than redistribute it.",
  regulatory:"Approved. Watch for cardiovascular and diabetes label expansions following.",
  src:"Patient Care Online — FDA approves orforglipron, first oral GLP-1 with no food or water restrictions", url:"https://www.patientcareonline.com/view/fda-approves-orforglipron-first-oral-glp-1-receptor-agonist-for-weight-loss-with-no-food-or-water-restrictions"},
 {space:"endocrinology", title:"CagriSema REDEFINE data presented at ADA 2026 while the NDA sits under FDA review",
  impact:"high", scope:"US", date:"2026-07-01", dateNote:"ADA 2026 presentation, June–July 2026",
  cat:"Obesity · Amylin combination",
  summary:"Novo Nordisk submitted the CagriSema NDA on 18 December 2025 and review runs through 2026. In pivotal REDEFINE 1, the cagrilintide/semaglutide combination produced roughly 22.7% mean weight loss at 68 weeks, with 91.9% of participants losing at least 5% of body weight versus 31.5% on placebo.",
  clinical:"Amylin plus incretin is a genuinely different pharmacology from GLP-1 alone. Tolerability and dose escalation are where the clinical questions sit, not efficacy.",
  commercial:"Novo needs a differentiated second act against Lilly. Securities litigation over tolerability claims survived dismissal, which raises the bar for balanced dosing and tolerability education specifically.",
  regulatory:"Under FDA review; decision expected around the end of 2026.",
  src:"DocWire — ADA 2026 obesity drug updates: retatrutide, CagriSema and oral GLP-1s", url:"https://www.docwirenews.com/post/ada-2026-obesity-drug-updates-retatrutide-cagrisema-and-oral-glp-1s"},

 /* ---------------- IMMUNOLOGY ---------------- */
 {space:"immunology", sub:"derm", title:"Icotrokinra (ICOTYDE) approved — targeted oral peptide IL-23 receptor antagonist in plaque psoriasis",
  impact:"high", scope:"US", date:"2026-07-01", dateNote:"month-level; exact approval day not confirmed in the sources reviewed",
  cat:"Psoriasis · Oral peptide",
  summary:"Johnson & Johnson announced FDA approval of icotrokinra for moderate-to-severe plaque psoriasis in adults and paediatric patients 12 years and older weighing at least 40 kg who are candidates for systemic therapy or phototherapy. It is positioned for first-line systemic use.",
  clinical:"An oral with biologic-class mechanism changes the step-therapy conversation. First-line systemic positioning in a field where biologics have been reserved for later lines is the substantive clinical shift.",
  commercial:"J&J is defending a psoriasis franchise against IL-17 and IL-23 injectables. Oral-versus-injectable sequencing is the education question, and it is one no single sponsor can credibly answer about its own product.",
  regulatory:"Approved, including adolescents 12+ — paediatric labelling is unusual this early and creates a distinct education audience.",
  src:"Johnson & Johnson — FDA approval of ICOTYDE (icotrokinra)", url:"https://www.jnj.com/media-center/press-releases/fda-approval-of-icotyde-icotrokinra-ushers-in-new-era-for-first-line-systemic-treatment-of-plaque-psoriasis-with-a-targeted-oral-peptide"},
 {space:"immunology", sub:"rheum", title:"Bimekizumab (Bimzelx) gains three new rheumatic indications",
  impact:"medium", scope:"US", date:"2026-07-01", dateNote:"month-level; reported by The Rheumatologist",
  cat:"Rheumatology · IL-17A/F",
  summary:"FDA approved bimekizumab-bkzx for three additional rheumatic indications, extending a dual IL-17A/IL-17F inhibitor well beyond its original dermatology footprint.",
  clinical:"Dual IL-17A/F inhibition versus IL-17A alone is an unsettled comparative question in rheumatology, and label expansion forces it into practice before the comparative evidence is mature.",
  commercial:"UCB is building a cross-specialty franchise. Education that spans dermatology and rheumatology audiences fits their commercial shape, and UCB has an active grants route.",
  regulatory:"Approved. Paediatric hidradenitis suppurativa topline is separately guided for H2 2027.",
  src:"The Rheumatologist — FDA approves bimekizumab-bkzx for 3 new rheumatic indications", url:"https://www.the-rheumatologist.org/article/fda-approves-bimekizumab-bkzx-bimzelx-for-3-new-rheumatic-indications/"},
 {space:"immunology", sub:"derm", title:"Hidradenitis suppurativa turns competitive — oral JAK positive, topical readout due Q4 2026",
  impact:"medium", scope:"US", date:"2026-08-05", dateNote:"Incyte Q2 2026 results, 5 August 2026",
  cat:"HS · Orals and topicals",
  summary:"Incyte reported positive Phase 3 results for oral povorcitinib in HS, and guided topline for ruxolitinib cream in mild-to-moderate HS to Q4 2026. UCB has paediatric bimekizumab data guided for H2 2027 and Avalo plans to start a registrational Phase 3 of abdakibart in H1 2027.",
  clinical:"HS has been managed almost entirely with a single biologic class. An oral and a topical would extend treatment to the mild end of the spectrum, where most patients sit and where almost no education exists.",
  commercial:"Four sponsors converging on one under-served indication inside eighteen months. Incyte and UCB have grant routes; Avalo has none, which makes it a genuine first-mover opportunity.",
  regulatory:"Povorcitinib filing is the next step. Ruxolitinib cream topline Q4 2026.",
  src:"Incyte — Q2 2026 results and business update", url:"https://investor.incyte.com/news-releases/news-release-details/incyte-reports-second-quarter-2026-financial-results-and"},

 /* ---------------- RARE DISEASE ---------------- */
 {space:"raredisease", title:"FDA formalises a plausible-mechanism standard for ultra-rare individualised therapies",
  impact:"high", scope:"US", date:"2026-02-23",
  cat:"Policy · Individualised therapy",
  summary:"HHS and FDA launched a framework to accelerate development of individualised therapies for ultra-rare disease, under which a plausible mechanism can be sufficient for approval where a conventional controlled trial is not feasible.",
  clinical:"Clinicians will be asked to use products approved on mechanism rather than outcome data. Interpreting that evidence — and communicating its limits to families — becomes a core competency rather than a niche one.",
  commercial:"Lowers the barrier for very small sponsors with no commercial infrastructure and no grant office. Expect more first-time funders, and expect them to need help understanding what independent education is.",
  regulatory:"A structural change to the evidentiary standard, not a single product event. It affects every n-of-1 and ultra-rare programme behind it.",
  src:"HHS — FDA launches framework for accelerating individualised therapies for ultra-rare diseases", url:"https://www.hhs.gov/press-room/wtas-fda-launches-framework-accelerating-therapies-ultra-rare-diseases.html"},
 {space:"raredisease", title:"Casgevy supplemental approval extends gene editing down to age two",
  impact:"medium", scope:"US", date:"2026-07-01",
  cat:"Gene editing · SCD / TDT",
  summary:"On 1 July 2026 FDA issued a supplemental approval for exagamglogene autotemcel in patients aged two and older with sickle cell disease and recurrent vaso-occlusive crises, or transfusion-dependent beta thalassaemia.",
  clinical:"Moves a curative-intent therapy into early childhood, where the conditioning regimen, fertility counselling and long-term follow-up conversations are materially different from those in adults.",
  commercial:"Paediatric expansion widens the treatment centre network well beyond the original specialist sites, and those centres need onboarding education.",
  regulatory:"Supplemental approval expanding the age range of an existing indication.",
  src:"FDA — first gene therapy for young children with sickle cell disease", url:"https://www.fda.gov/news-events/press-announcements/fda-approves-first-gene-therapy-young-children-sickle-cell-disease"},

 /* ---------------- OPHTHALMOLOGY ---------------- */
 {space:"ophthalmology", title:"Veligrotug (Lumvoa) approved in thyroid eye disease — second anti-IGF-1R option",
  impact:"high", scope:"US", date:"2026-07-02", dateNote:"specialist reaction coverage dated 2 July 2026",
  cat:"TED · Anti-IGF-1R",
  summary:"Viridian's veligrotug-vvze, an intravenous fully human anti-IGF-1R monoclonal antibody, was approved for thyroid eye disease. It targets the orbital inflammation and tissue expansion that define the condition.",
  clinical:"TED had a single approved biologic and a well-known hearing-toxicity concern. A second option makes selection, monitoring and counselling a real clinical decision rather than a default.",
  commercial:"Viridian's first commercial product. No established grant programme, and the audience spans oculoplastics, endocrinology and general ophthalmology — a natural multi-specialty curriculum.",
  regulatory:"Approved. A subcutaneous formulation is in development behind it.",
  src:"Ophthalmology Times — specialists react to the approval of veligrotug-vvze", url:"https://www.ophthalmologytimes.com/view/thyroid-eye-disease-specialists-react-to-the-approval-of-veligrotug-vvze"},
 {space:"ophthalmology", title:"Two sustained-release TKI depots converge on wet AMD",
  impact:"medium", scope:"US", date:"2026-08-01", dateNote:"synthesis of company-guided timing, not a single announcement",
  cat:"Wet AMD · Sustained release",
  summary:"Ocular Therapeutix reported SOL-1 positive and guides SOL-R topline to Q1 2027 for Axpaxli. EyePoint guides Phase 3 topline for Duravyu in 2026 and is starting a diabetic macular oedema Phase 3.",
  clinical:"A sustained-release tyrosine kinase inhibitor is a different dosing paradigm from anti-VEGF injections. Treatment intervals, retreatment criteria and the insert procedure itself all need teaching.",
  commercial:"If both read out positive, retina specialists face a new class with two entrants and no sequencing guidance. Neither company has an established IME programme.",
  regulatory:"Neither has filed. SOL-R is the readout that determines whether the Axpaxli BLA proceeds.",
  src:"Ocular Therapeutix — investor news releases", url:"https://investors.ocutx.com/news-releases"}
];
/* WEEKLY-RADAR-END */

/* WEEKLY-PDUFA-START — the Monday/Thursday task maintains this block.
   Upcoming FDA action / PDUFA dates across all six spaces. Shape:
   {co, asset, indication, space, sub?, date:"YYYY-MM-DD", precision:"exact"|"quarter"|"expected",
    type:"PDUFA"|"BLA/NDA filed"|"Priority Review"|"AdComm", status, note, url}
   `date` must be ISO. Use precision to be honest: "exact" only when the company
   published a specific action date; "quarter" or "expected" otherwise.
   EVERY entry needs a working source URL. Never invent a date — omit instead. */

const PDUFA_UPDATED = "August 19, 2026";

const PDUFA = [
 {co:"Vertex", asset:"povetacicept (BAFF/APRIL)", indication:"IgA nephropathy", space:"nephrology",
  date:"2026-11-30", precision:"exact", type:"PDUFA", status:"Under review",
  note:"Vertex's FIRST-EVER renal product. No nephrology grant programme exists yet — the highest-value pre-launch relationship in the hub. Enduring content for launch should already be in motion.",
  url:"https://news.vrtx.com/"},
 {co:"Roche / Genentech", asset:"obinutuzumab (Gazyva, anti-CD20)", indication:"Primary membranous nephropathy", space:"nephrology",
  date:"2026-11-30", precision:"quarter", type:"Priority Review", status:"Under review",
  note:"Beat tacrolimus in the pivotal trial. PMN has almost no existing CME — one of the emptiest education fields with a near-term launch.",
  url:"https://www.roche.com/media/releases/med-cor-2026-07-15"},
 {co:"Bayer", asset:"asundexian (oral Factor XIa)", indication:"Secondary stroke prevention", space:"cardiovascular",
  date:"2026-12-31", precision:"quarter", type:"PDUFA", status:"Priority Review",
  note:"OCEANIC-STROKE positive Nov 2025. First Factor XI approval would open the whole class-positioning education question versus DOACs.",
  url:"https://www.bayer.com/en/us/news-stories/asundexian-in-patients-after-a-non-cardiovascular-ischemic-stroke"},
 {co:"Nippon Shinyaku / NS Pharma", asset:"zeleciment rostudirsen", indication:"Duchenne muscular dystrophy", space:"raredisease",
  date:"2027-01-21", precision:"exact", type:"PDUFA", status:"Priority Review",
  note:"DMD exon-skipping. Lands amid heightened DMD safety scrutiny after the Elevidys boxed warning — safety-context education is the live need.",
  url:"https://www.neurologylive.com/view/fda-accepts-bla-z-rostudirsen-dmd-sets-january-pdufa-date"},
 {co:"Sarepta", asset:"casimersen (Amondys 45) & golodirsen (Vyondys 53)", indication:"Duchenne muscular dystrophy", space:"raredisease",
  date:"2027-02-28", precision:"exact", type:"PDUFA", status:"Under review",
  note:"Confirmatory filings. Sarepta's DMD franchise is under safety pressure following the Elevidys boxed warning (Nov 2025).",
  url:"https://www.neurologylive.com/view/fda-action-update-june-2026-acceptances-clearances-alignments"},
 {co:"Pharvaris", asset:"deucrictibant (oral bradykinin B2 antagonist)", indication:"Hereditary angioedema, on-demand", space:"raredisease",
  date:"2027-04-23", precision:"exact", type:"PDUFA", status:"Under review",
  note:"Second oral on-demand HAE agent after sebetralstat. Sets up a genuinely competitive 2027 HAE education market.",
  url:"https://www.globenewswire.com/news-release/2026/07/06/3322293/0/en/pharvaris-announces-fda-acceptance-of-new-drug-application-for-deucrictibant-ir-for-on-demand-treatment-of-hereditary-angioedema-attacks.html"},
 {co:"Eli Lilly", asset:"retatrutide (GIP/GLP-1/glucagon triple agonist)", indication:"Obesity", space:"endocrinology",
  date:"2027-03-31", precision:"quarter", type:"BLA/NDA filed", status:"BLA guided Q1 2027",
  note:"Up to 28% weight reduction at 80 weeks across five positive Ph3 trials. Filing guided Q1 2027, so an action date lands late 2027/2028 — the education runway starts NOW.",
  url:"https://investor.lilly.com/news-releases/news-release-details/lillys-triple-agonist-retatrutide-successful-two-additional"},
 {co:"Inventiva", asset:"lanifibranor (pan-PPAR)", indication:"MASH", space:"endocrinology",
  date:"2027-06-30", precision:"quarter", type:"BLA/NDA filed", status:"NDA guided H1 2027",
  note:"First-time MASH funder — no established grant programme. Worth warming up well ahead of filing.",
  url:"https://inventivapharma.com/pipeline/clinical-trials/"},
 {co:"Ocular Therapeutix", asset:"Axpaxli (OTX-TKI, axitinib intravitreal hydrogel)", indication:"Wet AMD", space:"ophthalmology",
  date:"2027-03-31", precision:"expected", type:"BLA/NDA filed", status:"SOL-1 positive; SOL-R topline Q1 2027",
  note:"Highest-probability new wet-AMD launch. Sustained-release TKI is a different dosing paradigm from anti-VEGF — real procedural and interval education need.",
  url:"https://investors.ocutx.com/news-releases"},
 {co:"EyePoint", asset:"Duravyu (vorolanib TKI insert)", indication:"Wet AMD", space:"ophthalmology",
  date:"2027-06-30", precision:"expected", type:"BLA/NDA filed", status:"Ph3 topline mid-2026; DME Ph3 starting",
  note:"Second sustained-TKI depot. If both Axpaxli and Duravyu land, retina specialists face a genuinely new class to sequence.",
  url:"https://investors.eyepointpharma.com/news-releases"},
 {co:"Novo Nordisk", asset:"CagriSema (semaglutide + cagrilintide)", indication:"Obesity", space:"endocrinology",
  date:"2026-12-31", precision:"quarter", type:"PDUFA", status:"Under review",
  note:"Amylin combination. Securities litigation over tolerability claims survived dismissal, which raises the bar for balanced dosing and tolerability education specifically.",
  url:"https://www.novonordisk.com/news-and-media/news-and-ir-materials.html"},
 {co:"Boehringer Ingelheim", asset:"survodutide (GLP-1/glucagon)", indication:"Obesity", space:"endocrinology",
  date:"2026-12-31", precision:"quarter", type:"PDUFA", status:"Under review",
  note:"Ph3 SYNCHRONIZE programme. A third late-stage incretin entrant broadens comparative-education need beyond Lilly and Novo.",
  url:"https://www.boehringer-ingelheim.com/us/human-health/metabolic-diseases/results-phase-iii-synchronize-1-obesity-trial"},
 {co:"Capricor", asset:"deramiocel (CAP-1002)", indication:"Duchenne cardiomyopathy", space:"raredisease",
  date:"2026-09-30", precision:"quarter", type:"PDUFA", status:"Priority Review",
  note:"Cell therapy for DMD cardiomyopathy — a distinct indication from the exon-skippers and a separate education need.",
  url:"https://www.neurologylive.com/view/fda-action-update-june-2026-acceptances-clearances-alignments"},
 {co:"Novartis", asset:"zigakibart (anti-APRIL)", indication:"IgA nephropathy", space:"nephrology",
  date:"2027-12-31", precision:"expected", type:"BLA/NDA filed", status:"Ph3 BEYOND ongoing",
  note:"Would give Novartis a THIRD IgAN asset alongside Fabhalta and Vanrafia. Sequencing education becomes unavoidable.",
  url:"https://www.novartis.com/research-development/novartis-pipeline"},
 {co:"Savara", asset:"molgramostim (MOLBREEVI, inhaled GM-CSF)", indication:"Autoimmune pulmonary alveolar proteinosis", space:"immunology", sub:"pulm",
  date:"2026-11-22", precision:"exact", type:"PDUFA", status:"Priority Review — 3-month extension",
  note:"FDA extended the PDUFA by three months after Savara's responses to information requests were deemed a major amendment; the Agency flagged no safety, efficacy or manufacturing concerns. Would be the first approved therapy for autoimmune PAP — a first-time launch with no established grant infrastructure.",
  url:"https://www.drugs.com/nda/molbreevi_260415.html"},
 {co:"Advicenne", asset:"Sibnayal (potassium citrate/potassium bicarbonate ER)", indication:"Distal renal tubular acidosis", space:"nephrology",
  date:"2026-09-03", precision:"exact", type:"PDUFA", status:"Under review",
  note:"First-in-class ER alkalinising salt for dRTA — an ultra-rare nephrology indication with essentially no accredited CME footprint. Advicenne has no US grants programme; a launch would require de novo education infrastructure.",
  url:"https://www.assyro.com/tools/pdufa-calendar/2026"},
 {co:"Ultragenyx", asset:"UX111 (AAV9 gene therapy)", indication:"Sanfilippo syndrome type A (MPS IIIA)", space:"raredisease",
  date:"2026-09-19", precision:"exact", type:"PDUFA", status:"Under review",
  note:"AAV9 CNS-directed gene therapy for MPS IIIA — pediatric neurodegenerative LSD with no approved disease-modifying options. Ultragenyx is a mature rare-disease funder; approval would open a new LSD launch-education cycle immediately ahead of WORLDSymposium 2027.",
  url:"https://www.assyro.com/tools/pdufa-calendar/2026"},

 /* --- CATALYSTS AHEAD (kind:"cat") -------------------------------------
    Not regulatory decisions — the events that CREATE the next wave of them:
    pivotal topline readouts, filing submissions, programme starts. These are
    where a grant conversation should begin, because by the time a PDUFA date
    exists the education budget is usually already committed.
    Same honesty rules: company-guided timing only, every entry sourced. */
 {co:"Vera Therapeutics", asset:"atacicept (Trutakna)", indication:"IgA nephropathy — ORIGIN 3 two-year eGFR", space:"nephrology",
  date:"2026-09-30", precision:"quarter", type:"Ph3 readout", kind:"cat", status:"eGFR analysis pulled forward to Q3 2026",
  note:"Converts accelerated approval to full. Vera aligned with FDA on an EARLIER eGFR analysis, so this lands in weeks, not 2027. Their first commercial product — the grant programme is being built right now.",
  url:"https://ir.veratx.com/news-releases/news-release-details/vera-therapeutics-announces-alignment-us-fda-earlier-origin"},
 {co:"Incyte", asset:"ruxolitinib cream (Opzelura)", indication:"Mild-to-moderate hidradenitis suppurativa", space:"immunology", sub:"derm",
  date:"2026-12-31", precision:"quarter", type:"Ph3 readout", kind:"cat", status:"TRuE-HS1 / TRuE-HS2 topline guided Q4 2026",
  note:"A topical option in HS would change the treatment algorithm at the mild end, where most patients sit and almost no CME exists. Incyte confirmed Q4 2026 timing on its Q2 call.",
  url:"https://investor.incyte.com/news-releases/news-release-details/incyte-reports-second-quarter-2026-financial-results-and"},
 {co:"Incyte", asset:"povorcitinib (oral JAK1)", indication:"Hidradenitis suppurativa", space:"immunology", sub:"derm",
  date:"2026-12-31", precision:"expected", type:"Filing expected", kind:"cat", status:"Both Ph3 trials positive",
  note:"First oral small molecule in HS. Positive Ph3 already reported, so a submission is the next step — oral-versus-biologic positioning is an open education question with no incumbent programme.",
  url:"https://investor.incyte.com/news-releases/news-release-details/incyte-announces-positive-topline-results-two-phase-3-clinical"},
 {co:"UCB", asset:"bimekizumab (Bimzelx)", indication:"Paediatric hidradenitis suppurativa", space:"immunology", sub:"derm",
  date:"2027-12-31", precision:"expected", type:"Ph3 readout", kind:"cat", status:"First topline guided H2 2027",
  note:"Paediatric HS has essentially zero dedicated education. UCB reiterated H2 2027 in its 2026 half-year results — long runway, so relationship-building now is cheap.",
  url:"https://www.ucb.com/newsroom/press-releases/article/ucb-delivers-strong-results-raises-2026-guidance-and-positions-for-next-growth-phase"},
 {co:"Avalo Therapeutics", asset:"abdakibart (anti-IL-1β/IL-1α)", indication:"Hidradenitis suppurativa", space:"immunology", sub:"derm",
  date:"2027-06-30", precision:"expected", type:"Ph3 start", kind:"cat", status:"Registrational Ph3 to begin H1 2027",
  note:"Small company with no grant programme at all. A Ph3 start is the earliest credible moment to open a scientific-exchange conversation.",
  url:"https://www.sec.gov/Archives/edgar/data/0001534120/000153412026000048/ex-9912q2026earningsrelease.htm"},
 {co:"Ocular Therapeutix", asset:"Axpaxli (OTX-TKI)", indication:"Wet AMD — SOL-R", space:"ophthalmology",
  date:"2027-03-31", precision:"quarter", type:"Ph3 readout", kind:"cat", status:"SOL-1 positive; SOL-R topline guided Q1 2027",
  note:"The second pivotal. SOL-R is the readout that decides whether the BLA happens — the point at which retina education planning becomes real rather than speculative.",
  url:"https://investors.ocutx.com/news-releases"},
 {co:"EyePoint", asset:"Duravyu (vorolanib insert)", indication:"Wet AMD — LUGANO / LUCIA", space:"ophthalmology",
  date:"2026-12-31", precision:"expected", type:"Ph3 readout", kind:"cat", status:"Ph3 topline guided 2026; DME Ph3 starting",
  note:"If this reads out alongside Axpaxli, retina specialists get two sustained-release TKIs at once and sequencing education becomes urgent for both sponsors.",
  url:"https://investors.eyepointpharma.com/news-releases"},
 {co:"Inventiva", asset:"lanifibranor (pan-PPAR)", indication:"MASH — NATiV3 submission", space:"endocrinology",
  date:"2027-06-30", precision:"expected", type:"Filing expected", kind:"cat", status:"NDA guided H1 2027",
  note:"First-time filer with no established grant office. The filing is the trigger to have a funded concept already drafted.",
  url:"https://inventivapharma.com/pipeline/clinical-trials/"}
];
/* WEEKLY-PDUFA-END */
/* WEEKLY-CONFERENCES-START — the Monday/Thursday task maintains this block.
   Rolling 12-month congress calendar. The UI filters to today..+12 months
   automatically, so keep roughly 18 months of entries here and drop ones that
   have passed. Shape:
   {name, short, org, city, country, start:"YYYY-MM-DD", end:"YYYY-MM-DD",
    spaces:[spaceKeys], sub:[immunology sub keys, optional], url, industryUrl, note}
   `start`/`end` must be ISO dates. Mark unconfirmed dates with tbc:true. */

const CONFERENCES_UPDATED = "August 19, 2026";

const CONFERENCES = [
 {name:"ESC Congress 2026", hashtag:"ESC2026", short:"ESC", org:"European Society of Cardiology",
  presence:[
    ["Tenax Therapeutics","Phase 3 LEVEL trial (levosimendan in PH-HFpEF) in Late-Breaking Clinical Science — Sat 29 Aug, 11:15–11:30 CEST, presented by Prof Sanjiv Shah, Northwestern","https://www.globenewswire.com/news-release/2026/07/02/3321224/12401/en/tenax-therapeutics-announces-late-breaking-presentation-of-level-clinical-trial-data-at-esc-congress-2026.html"],
    ["Novo Nordisk","Publishes a dedicated ESC 2026 congress hub listing its symposium presentations, including GLP-1RA and cardiovascular care sessions","https://sciencehub.novonordisk.com/congresses/esc2026.html"]
  ],
  city:"Munich", country:"Germany", start:"2026-08-28", end:"2026-08-31",
  spaces:["cardiovascular"], url:"https://www.escardio.org/events/congresses/esc-congress/",
  industryUrl:"https://escpartnerportal.escardio.org/s/congresses-events/esc-congress-2026",
  note:"~30,000 attendees. 2026 theme is AI in cardiology. Full LIBREXIA-ACS results present here — the Factor XI reappraisal moment. Satellite symposia are the industry-facing sessions."},
 {name:"ERS Congress 2026", hashtag:"ERS2026", short:"ERS", org:"European Respiratory Society",
  city:"Barcelona", country:"Spain", start:"2026-09-05", end:"2026-09-09",
  spaces:["immunology"], sub:["pulm"], url:"https://www.ersnet.org/events/ers-congress-2026/",
  note:"Severe asthma and COPD biologics. AstraZeneca (Tezspire), GSK (depemokimab), Sanofi (Dupixent) and Verona/Merck all have a stake here."},
 {name:"EASD Annual Meeting 2026", hashtag:"EASD2026", short:"EASD", org:"European Association for the Study of Diabetes",
  city:"Milan", country:"Italy", start:"2026-09-14", end:"2026-09-18", tbc:true,
  spaces:["endocrinology"], url:"https://www.easd.org/annual-meeting/easd-2026/",
  note:"Location confirmed as Milan; exact dates unconfirmed at last check — verify on the EASD site before planning."},
 {name:"EADV Congress 2026", hashtag:"EADV2026", short:"EADV", org:"European Academy of Dermatology and Venereology",
  city:"Vienna", country:"Austria", start:"2026-09-30", end:"2026-10-03",
  spaces:["immunology"], sub:["derm"], url:"https://eadv.org/congress/",
  note:"35th annual congress. The main European derm venue — psoriasis, AD, HS, urticaria."},
 {name:"AAO 2026", hashtag:"AAO2026", short:"AAO", org:"American Academy of Ophthalmology",
  city:"New Orleans, LA", country:"USA", start:"2026-10-09", end:"2026-10-12",
  spaces:["ophthalmology"], url:"https://www.aao.org/annual-meeting",
  note:"Largest ophthalmology meeting. GA, wet AMD durability and TED all feature."},
 {name:"UEG Week 2026", hashtag:"UEGWeek2026", short:"UEG", org:"United European Gastroenterology",
  city:"Barcelona", country:"Spain", start:"2026-10-17", end:"2026-10-20",
  spaces:["immunology"], sub:["gastro"], url:"https://ueg.eu/week",
  note:"European IBD and EoE venue. Takeda, J&J, AbbVie, Lilly, Merck (TL1A) all active."},
 {name:"ASN Kidney Week 2026", hashtag:"KidneyWk26", short:"Kidney Week", org:"American Society of Nephrology",
  city:"Denver, CO", country:"USA", start:"2026-10-21", end:"2026-10-25",
  spaces:["nephrology"], url:"https://www.asn-online.org/education/kidneyweek/",
  industryUrl:"https://www.asn-online.org/education/kidneyweek/ancillary/",
  note:"THE nephrology meeting and the single highest-value venue in this hub right now — five approved IgAN mechanisms with no head-to-head data. ASN publishes ancillary-event guidelines, which is how industry satellite sessions get listed."},
 {name:"AASLD The Liver Meeting 2026", hashtag:"TLM26", short:"AASLD", org:"American Association for the Study of Liver Diseases",
  city:"Denver, CO", country:"USA", start:"2026-11-05", end:"2026-11-09",
  spaces:["endocrinology"], url:"https://www.aasld.org/tlm-26/home",
  note:"MASH venue — Madrigal, Novo, Inventiva, Boehringer."},
 {name:"AHA Scientific Sessions 2026", hashtag:"AHA26", short:"AHA", org:"American Heart Association",
  city:"Chicago, IL", country:"USA", start:"2026-11-06", end:"2026-11-09",
  spaces:["cardiovascular"], url:"https://professional.heart.org/en/meetings/scientific-sessions",
  industryUrl:"https://exhibitatsessions.org/scientific-sessions/",
  note:"US counterpart to ESC. Late-breaking anticoagulation and CKM data."},
 {name:"ACR Convergence 2026", hashtag:"ACR26", short:"ACR", org:"American College of Rheumatology",
  city:"Orlando, FL", country:"USA", start:"2026-11-06", end:"2026-11-11",
  spaces:["immunology"], sub:["rheum"], url:"https://rheumatology.org/meetings/acr-convergence",
  industryUrl:"https://rheumatology.org/annual-meeting-industry-engagement",
  note:"Largest rheumatology meeting. SLE, RA, PsA, Sjögren's, myositis, autoimmune CAR-T. ACR runs a formal industry-engagement programme."},
 {name:"ACAAI Annual Scientific Meeting 2026", hashtag:"ACAAI26", short:"ACAAI", org:"American College of Allergy, Asthma & Immunology",
  city:"Phoenix, AZ", country:"USA", start:"2026-11-12", end:"2026-11-16",
  spaces:["immunology"], sub:["allergy"], url:"https://annualmeeting.acaai.org/",
  note:"Food allergy, anaphylaxis, needle-free epinephrine, OIT. ARS Pharma, ALK, Aimmune territory."},
 {name:"ObesityWeek 2026", hashtag:"OW2026", short:"ObesityWeek", org:"The Obesity Society",
  city:"Washington, DC", country:"USA", start:"2026-11-14", end:"2026-11-17",
  spaces:["endocrinology"], url:"https://obesityweek.org/",
  note:"Lilly, Novo, Amgen, Boehringer, Viking, Zealand. The obesity-education centre of gravity."},
 {name:"ASH Annual Meeting 2026", hashtag:"ASH26", short:"ASH", org:"American Society of Hematology",
  city:"New Orleans, LA", country:"USA", start:"2026-12-12", end:"2026-12-15",
  spaces:["raredisease"], url:"https://www.hematology.org/meetings/annual-meeting",
  note:"68th annual. PNH, complement, sickle cell, gene therapy, ITP."},
 {name:"WORLDSymposium 2027", hashtag:"WORLDSymposium", short:"WORLDSymposium", org:"WORLDSymposium",
  city:"San Diego, CA", country:"USA", start:"2027-01-31", end:"2027-02-04",
  spaces:["raredisease"], url:"https://worldsymposia.org/",
  note:"23rd annual research meeting. Lysosomal and rare metabolic disease — Takeda, Sanofi, BioMarin, Ultragenyx, Chiesi."},
 {name:"AAAAI Annual Meeting 2027", hashtag:"AAAAI27", short:"AAAAI", org:"American Academy of Allergy, Asthma & Immunology",
  city:"New Orleans, LA", country:"USA", start:"2027-02-19", end:"2027-02-22",
  spaces:["immunology"], sub:["allergy","pulm"], url:"https://annualmeeting.aaaai.org/",
  note:"Type-2 inflammation across allergy and asthma. Sanofi/Regeneron, AstraZeneca, GSK, Roche (Xolair food allergy)."},
 {name:"ECCO Congress 2027", hashtag:"ECCO27", short:"ECCO", org:"European Crohn's and Colitis Organisation",
  city:"Copenhagen", country:"Denmark", start:"2027-03-03", end:"2027-03-06",
  spaces:["immunology"], sub:["gastro"], url:"https://ecco-ibd.eu/ecco27/our-congress/overview",
  note:"22nd congress, Bella Center. The dedicated European IBD meeting."},
 {name:"AAD Annual Meeting 2027", hashtag:"AAD2027", short:"AAD", org:"American Academy of Dermatology",
  city:"San Francisco, CA", country:"USA", start:"2027-03-19", end:"2027-03-23",
  spaces:["immunology"], sub:["derm"], url:"https://www.aad.org/member/meetings-education/am27",
  note:"85th annual, Moscone Center. The largest US derm meeting."},
 {name:"NKF Spring Clinical Meetings 2027", hashtag:"NKFClinicals", short:"NKF SCM", org:"National Kidney Foundation",
  city:"Orlando, FL", country:"USA", start:"2027-05-12", end:"2027-05-15",
  spaces:["nephrology"], url:"https://www.kidney.org/spring-clinical",
  note:"Walt Disney World Swan & Dolphin; pre-conference courses 11 May. More practice-facing than Kidney Week — strong fit for implementation-style education."},
 {name:"ATS International Conference 2027", hashtag:"ATS2027", short:"ATS", org:"American Thoracic Society",
  city:"New Orleans, LA", country:"USA", start:"2027-05-14", end:"2027-05-19",
  spaces:["immunology"], sub:["pulm"], url:"https://site.thoracic.org/conference",
  note:"Severe asthma, COPD, bronchiectasis, ILD."},
 {name:"Digestive Disease Week 2027", hashtag:"DDW27", short:"DDW", org:"DDW",
  city:"Washington, DC", country:"USA", start:"2027-05-15", end:"2027-05-18",
  spaces:["immunology"], sub:["gastro"], url:"https://ddw.org/attendee-planning/ddw-2027/",
  note:"The largest GI meeting. IBD, EoE, oral small molecules, anti-TL1A."},
 {name:"EULAR Congress 2027", hashtag:"EULAR2027", short:"EULAR", org:"European Alliance of Associations for Rheumatology",
  city:"Location TBC", country:"Europe", start:"2027-06-09", end:"2027-06-12", tbc:true,
  spaces:["immunology"], sub:["rheum"], url:"https://www.eular.org/",
  note:"June 2027; city and exact dates not yet announced — verify before planning."},
 {name:"ADA Scientific Sessions 2027", hashtag:"ADA2027", short:"ADA", org:"American Diabetes Association",
  city:"Washington, DC", country:"USA", start:"2027-06-18", end:"2027-06-21",
  spaces:["endocrinology"], url:"https://professional.diabetes.org/scientific-sessions",
  note:"Walter E. Washington Convention Center. The diabetes and obesity anchor meeting."},
 {name:"ASRS Annual Meeting 2027", hashtag:"ASRS2027", short:"ASRS", org:"American Society of Retina Specialists",
  city:"San Francisco, CA", country:"USA", start:"2027-07-28", end:"2027-07-31",
  spaces:["ophthalmology"], url:"https://www.asrs.org/annual-meeting",
  note:"45th annual. Retina-specialist audience — GA, wet AMD durability, gene therapy, the ASRS PAT survey."}
];
/* WEEKLY-CONFERENCES-END */
/* WEEKLY-SIGNALS-START — the Monday task rewrites this block in place */

const SIGNALS_UPDATED = "August 19, 2026";

const SIGNALS = {
 cardiovascular:[
   ["ESC Congress 2026 opens in 9 days (Munich, 28-31 Aug); LIBREXIA-ACS and pelacarsen readouts land inside the same 72 hours — the largest single-week trigger for Factor XI and Lp(a) education planning in 2026. Have concept skeletons on the shelf now.","https://www.escardio.org/Congresses-Events/ESC-Congress"],
   ["ESC Congress 2026 (Munich, 28-31 Aug) will present full LIBREXIA-ACS results — expect a wave of Factor XI reappraisal education.","https://www.escardio.org/news/press/press-releases/hot-lines-revealed--the-trials-that-will-make-the-headlines-at-esc-congress-2026/"],
   ["Novartis Q2: abelacimab LILAC-TIMI 76 interim analysis now expected before year-end 2026 — a positive stop opens a large 2027 education market.","https://www.novartis.com/news/media-releases/novartis-delivered-sales-growth-q2-and-further-advanced-pipeline-full-year-guidance-reaffirmed"],
   ["Bayer asundexian NDA under Priority Review for secondary stroke prevention; FDA action ~Q4 2026 puts launch education squarely in 2027.","https://www.bayer.com/en/us/news-stories/asundexian-in-patients-after-a-non-cardiovascular-ischemic-stroke"],
   ["Ribo reports positive Ph2a for vortosiran, the first siRNA against Factor XI — adds a third modality to the class-comparison education need.","https://www.prnewswire.com/apac/news-releases/ribo-discloses-positive-data-from-vortosiran-phase-2a-trial---worlds-first-clinical-data-on-sirna-mediated-fxi-inhibition-following-multiple-dosing-in-patients-with-coronary-artery-disease-302832124.html"]
 ],
 nephrology:[
   ["Countdown to Vertex povetacicept PDUFA is 103 days (30 Nov 2026). Vertex has still not published a renal areas-of-interest document — the single highest-leverage relationship window in the hub. Move to scientific-exchange this week, not next month.","https://www.medicaldaily.com/iga-nephropathy-atacicept-approval-fda-decisions-2026-476696"],
   ["FDA grants Vera Therapeutics accelerated approval for TRUTAKNA (atacicept) in primary IgAN, 7 Jul 2026 — 46% proteinuria reduction in ORIGIN 3. Vera now has its FIRST commercial product, so a grant program should follow; move from relationship-building to active courtship.","https://ir.veratx.com/news-releases/news-release-details/vera-therapeutics-receives-fda-accelerated-approval-trutaknatm"],
   ["Vertex povetacicept has an FDA target action date of 30 Nov 2026 in IgAN — a defined pre-launch window for Vertex's first-ever renal product.","https://www.medicaldaily.com/iga-nephropathy-atacicept-approval-fda-decisions-2026-476696"],
   ["Otsuka sibeprenlimab (VOYXACT) approved Nov 2025 in primary IgAN — the IgAN field now has FIVE approved mechanisms and zero head-to-head data. Sequencing is the single largest unmet education need in nephrology.","https://www.hcplive.com/view/fda-approves-atacicept-trutakna-for-iga-nephropathy"],
   ["Novartis Fabhalta (iptacopan) received FDA TRADITIONAL approval on 17 Jul 2026 — first and only complement inhibitor shown to significantly slow kidney function decline in primary IgAN, converting from the Aug 2024 accelerated approval. This is the class's first hard eGFR outcome, so 'proteinuria surrogate vs kidney function' is now a live teaching point rather than a caveat.","https://www.novartis.com/news/media-releases/novartis-fabhalta-iptacopan-receives-fda-traditional-approval-first-and-only-complement-inhibitor-significantly-slow-kidney-function-decline-primary-igan"],
   ["Six agents are now FDA-approved in IgA nephropathy, per the National Kidney Foundation's own count — the field went from nothing to six inside about two years, and no head-to-head data exists.","https://www.kidney.org/news-stories/new-era-iga-nephropathy-six-new-treatments-bring-new-hope"]
 ],
 endocrinology:[
   ["Lilly retatrutide: TRIUMPH-2 and TRIUMPH-3 positive, up to 28% body-weight reduction at 80 weeks — five successful Ph3 trials; submission guided to early 2027, a defined launch-education runway.","https://www.biopharmadive.com/news/lillys-retatrutide-tripleG-phase3-obesity-data/820851/"],
   ["Boehringer reports Ph3 SYNCHRONIZE-1 survodutide results in obesity — a third late-stage incretin entrant broadens the comparative-education need beyond Lilly and Novo.","https://www.boehringer-ingelheim.com/us/human-health/metabolic-diseases/results-phase-iii-synchronize-1-obesity-trial"],
   ["Roche drops acmopatide and consolidates behind enicepatide (CT-388) — near-term Roche obesity funding stays disease-state, not launch.","https://www.biospace.com/business/roche-cans-one-carmot-obesity-asset-as-another-shows-best-in-class-potential"],
   ["Inventiva guides lanifibranor NDA submission to H1 2027 after NATiV3 topline — a first-time MASH funder worth warming up now.","https://inventivapharma.com/pipeline/clinical-trials/"]
 ],
 immunology:[
   ["EADV 2026 (Paris, 17-20 Sep) is 29 days out — icotrokinra safety updates and povorcitinib HS data both expected. Sponsors typically open pre-launch education RFPs within 30 days of EADV; watch J&J and Incyte portals daily starting week of 22 Sep.","https://eadvcongress2026.org/"],
   ["Arcutis wins an sNDA expanding Zoryve (roflumilast) cream 0.3% in plaque psoriasis DOWN TO AGE 2, including intertriginous areas — paediatric and flexural psoriasis are two of the least-taught corners of derm, and a topical label that young creates a genuine primary-care education audience.","https://www.dermatologytimes.com/view/dermatology-times-monthly-fda-pipeline-review-july-2026"],
   ["Incyte confirms Q4 2026 topline for ruxolitinib cream in mild-to-moderate hidradenitis suppurativa, alongside positive Ph3 results for oral povorcitinib — HS is turning from an orphan interest into a four-sponsor competitive market.","https://investor.incyte.com/news-releases/news-release-details/incyte-reports-second-quarter-2026-financial-results-and"],
   ["Affibody izokibep shows durable responses in hidradenitis suppurativa — HS remains one of the least-served derm education areas relative to disease burden.","https://pharmaphorum.com/rd/clinical-trials-round-march-and-april-2026"],
   ["Almirall reports up to four years of sustained lebrikizumab efficacy in atopic dermatitis — long-term durability data shifts AD education toward maintenance and persistence.","https://pharmaphorum.com/rd/clinical-trials-round-march-and-april-2026"],
   ["Sanofi discontinues amlitelimab in atopic dermatitis — the OX40/OX40L route in AD is now effectively closed; remove it from concepts.","https://www.sanofi.com/en/media-room"],
   ["argenx to acquire Forte Biosciences (~$2.2B) for anti-CD122 FB102 in vitiligo and alopecia — a new, well-funded immuno-derm education buyer.","https://www.argenx.com/news"],
   ["FDA approves Lumvoa (veligrotug) for thyroid eye disease regardless of duration or activity, Jul 2026 — Viridian's first commercial product and the first real Tepezza competitor.","https://www.ophthalmologyadvisor.com/features/fda-alerts-ophthalmology-drug-and-device-approvals/"],
   ["AbelZeta cleared for a registrational Ph2 of CD20/BCMA CAR-T in refractory lupus nephritis — autoimmune CAR-T broadening past Cabaletta and Kyverna.","https://www.prnewswire.com/news-releases/abelzeta-receives-fda-clearance-of-registrational-phase-ii-trial-for-c-car168-in-refractory-lupus-nephritis-302835248.html"],
   ["Kyverna completing a rolling BLA for miv-cel in stiff person syndrome — potential first-ever autoimmune CAR-T approval and a 2027 launch.","https://www.globenewswire.com/news-release/2026/05/12/3293353/0/en/kyverna-therapeutics-announces-initiation-of-rolling-sps-bla-submission-and-reports-first-quarter-2026-financial-results.html"],
   ["Roche Gazyva wins priority review in primary membranous nephropathy after beating tacrolimus; Nov 2026 action date defines a pre-launch window.","https://www.roche.com/media/releases/med-cor-2026-07-15"]
 ],
 raredisease:[
   ["Eplontersen FAILED Ph3 CARDIO-TTRansform in ATTR-CM — a major expected ATTR education budget collapses; full data at ESC in August.","https://ir.ionis.com/news-releases/news-release-details/update-cardio-ttransform-phase-3-trial-eplontersen-adults"],
   ["FDA accepts Pharvaris deucrictibant NDA for on-demand HAE with PDUFA 23 Apr 2027 — a second oral on-demand agent sets up competitive 2027 education.","https://www.globenewswire.com/news-release/2026/07/06/3322293/0/en/pharvaris-announces-fda-acceptance-of-new-drug-application-for-deucrictibant-ir-for-on-demand-treatment-of-hereditary-angioedema-attacks.html"],
   ["argenx H1: Vyvgart at $2.8B first-half sales with CIDP now global — the largest neuromuscular education funder to court, plus a 2027 autoinjector launch.","https://www.globenewswire.com/news-release/2026/07/23/3331862/0/en/argenx-Reports-Half-Year-2026-Financial-Results-and-Provides-Second-Quarter-Business-Update.html"],
   ["The 2025 HAE approval wave (garadacimab Jun, sebetralstat Jul, donidalorsen Aug) is now in year-two launch — real-world sequencing education is the current gap.","https://www.hcplive.com/view/rare-disease-rapid-progress-fda-hae-approvals-in-2025-signal-changing-course"]
 ],
 ophthalmology:[
   ["Alcon Grants portal remains CLOSED as of 19 Aug 2026, reopening guided to Fall 2026 for 2027 activities. Every day the portal stays closed is a day competing providers cannot prepare concepts either — the window belongs to whoever has the annual-goals-aligned concept fully costed at reopening.","https://www.alcon.com/grants-and-giving"],
   ["FDA approves Lumvoa (veligrotug) for thyroid eye disease Jul 2026, regardless of duration or activity — ends Amgen's TED monopoly and opens a competitive-positioning education need.","https://www.ophthalmologyadvisor.com/features/fda-alerts-ophthalmology-drug-and-device-approvals/"],
   ["Izervay (avacincaptad pegol) label expanded — the 12-month dosing limit is removed, changing long-term GA management teaching.","https://www.ophthalmologyadvisor.com/features/fda-alerts-ophthalmology-drug-and-device-approvals/"],
   ["FDA approves Lytenava (bevacizumab-vikg), the first ophthalmic bevacizumab for wet AMD — forces new payer, formulary and injection-choice education.","https://www.globenewswire.com/news-release/2026/07/24/3333067/0/en/Outlook-Therapeutics-Announces-LYTENAVA-FDA-Approval-as-the-First-and-Only-FDA-Approved-Ophthalmic-Bevacizumab-for-the-Treatment-of-Wet-AMD.html"],
   ["ASRS 2026: bevacizumab overtakes Eylea as the most-used intravitreal injection; Syfovre GA share falls to 57.4% as anti-complement volume rises 40%.","https://www.managedhealthcareexecutive.com/view/bevacizumab-surpasses-eylea-as-the-most-common-retinal-disease-injection-asrs-2026"]
 ]
};
/* WEEKLY-SIGNALS-END */
/* Offline gap-finder: therapeutic areas → keywords → best funder + verified contact */

const GAPAREAS = [
 {area:"Factor XI anticoagulation / AF stroke prevention",kw:["factor xi","anticoag","stroke prevention","atrial fib","afib","doac"],space:"cardiovascular",funder:"Bayer / Novartis",contact:"grants.office@novartis.com"},
 {area:"Obesity / GLP-1 & incretins",kw:["obesity","glp","weight","semaglutide","tirzepatide","incretin"],space:"endocrinology",funder:"Novo Nordisk / Lilly / Amgen",contact:"HCCIME@amgen.com"},
 {area:"MASH / metabolic liver disease",kw:["mash","nash","fibrosis","liver","resmetirom"],space:"endocrinology",funder:"Madrigal / Novo Nordisk",contact:"Contributions@madrigalpharma.com"},
 {area:"Psoriasis (oral IL-23 / TYK2)",kw:["psoriasis","il-23","il23","tyk2","sotyktu","deucravacitinib"],space:"immunology",sub:"derm",funder:"Takeda / Amgen",contact:"IndependentMedicalEducation.TakedaSupport@takeda.com"},
 {area:"Atopic dermatitis",kw:["atopic","dermatitis","eczema","dupixent","il-13","il13"],space:"immunology",sub:"derm",funder:"Amgen / Incyte",contact:"HCCIME@amgen.com"},
 {area:"Hidradenitis suppurativa / chronic urticaria",kw:["hidradenitis","suppurativa","urticaria","csu"],space:"immunology",sub:"derm",funder:"Novartis",contact:"grants.office@novartis.com"},
 {area:"SLE (systemic lupus)",kw:["lupus","sle"],space:"immunology",sub:"rheum",funder:"AstraZeneca / GSK / Amgen",contact:"grants@astrazeneca.com"},
 {area:"IBD (UC / Crohn's, TL1A)",kw:["ibd","ulcerative","crohn","colitis","tl1a"],space:"immunology",sub:"gastro",funder:"J&J / Takeda",contact:"IndependentMedicalEducation.TakedaSupport@takeda.com"},
 {area:"Chronic spontaneous urticaria (oral BTK)",kw:["urticaria","csu","remibrutinib","chronic spontaneous"],space:"immunology",sub:"derm",funder:"Novartis / Sanofi",contact:"grants.office@novartis.com"},
 {area:"Hidradenitis suppurativa",kw:["hidradenitis","suppurativa","hs"],space:"immunology",sub:"derm",funder:"Novartis / UCB / AbbVie",contact:"grants.office@novartis.com"},
 {area:"Bullous pemphigoid & immunobullous disease",kw:["bullous","pemphigoid","pemphigus","immunobullous"],space:"immunology",sub:"derm",funder:"Sanofi / argenx",contact:"Portal form"},
 {area:"Severe asthma / type-2 biologics",kw:["asthma","severe asthma","tezepelumab","tslp","il-5","eosinophil"],space:"immunology",sub:"pulm",funder:"AstraZeneca / GSK / Sanofi",contact:"grants@astrazeneca.com"},
 {area:"COPD — biologics & new mechanisms",kw:["copd","emphysema","ensifentrine","chronic obstructive"],space:"immunology",sub:"pulm",funder:"GSK / Sanofi / Verona-Merck",contact:"Portal form"},
 {area:"Food allergy / anaphylaxis — needle-free rescue",kw:["food allergy","anaphylaxis","peanut","epinephrine","neffy","oit","immunotherapy"],space:"immunology",sub:"allergy",funder:"ARS Pharma / ALK / Aimmune",contact:"Portal form"},
 {area:"CRSwNP & allergic rhinitis",kw:["crswnp","nasal polyps","rhinitis","sinusitis"],space:"immunology",sub:"allergy",funder:"Sanofi / AstraZeneca",contact:"grants@astrazeneca.com"},
 {area:"Eosinophilic esophagitis (EoE)",kw:["eoe","eosinophilic esophagitis","dysphagia"],space:"immunology",sub:"gastro",funder:"Takeda / Sanofi",contact:"IndependentMedicalEducation.TakedaSupport@takeda.com"},
 {area:"Myasthenia gravis / FcRn",kw:["myasthenia","fcrn","gmg","efgartigimod"],space:"immunology",sub:"rheum",funder:"argenx / UCB / J&J",contact:"grants@argenx.com"},
 {area:"Sjögren's disease",kw:["sjogren","sjögren"],space:"immunology",sub:"rheum",funder:"Novartis / Amgen",contact:"grants.office@novartis.com"},
 {area:"IgA nephropathy — sequencing across 5 mechanisms",kw:["iga","nephropathy","igan","sequencing"],space:"nephrology",funder:"Novartis / Vertex / Otsuka / Travere",contact:"grants.office@novartis.com"},
 {area:"Lupus nephritis — combination strategy",kw:["lupus nephritis","voclosporin","obinutuzumab","gazyva","lupkynis"],space:"nephrology",funder:"Aurinia / Roche / GSK",contact:"grants@astrazeneca.com"},
 {area:"C3G / IC-MPGN — first-ever therapies",kw:["c3g","c3 glomerulopathy","ic-mpgn","mpgn","complement kidney"],space:"nephrology",funder:"Apellis / Novartis",contact:"grants.office@novartis.com"},
 {area:"CKD in T2D — cardio-kidney-metabolic",kw:["ckd","chronic kidney","diabetic kidney","finerenone","sglt2","cardio-kidney"],space:"nephrology",funder:"Bayer / AstraZeneca / Boehringer",contact:"grants@astrazeneca.com"},
 {area:"Primary membranous nephropathy",kw:["membranous","pmn","pla2r"],space:"nephrology",funder:"Roche / Genentech",contact:"Portal form"},
 {area:"ATTR amyloidosis",kw:["attr","amyloid","transthyretin","tafamidis","vutrisiran","acoramidis"],space:"raredisease",funder:"Alnylam / AstraZeneca",contact:"grants@alnylam.com"},
 {area:"Hereditary angioedema (HAE)",kw:["angioedema","hae","kallikrein","bradykinin"],space:"raredisease",funder:"Takeda / Ionis / Sobi",contact:"IndependentMedicalEducation.TakedaSupport@takeda.com"},
 {area:"Complement — PNH / C3G / aHUS",kw:["pnh","paroxysmal","complement","c3 glomerulopathy","c3g","ahus","hemolytic uremic"],space:"raredisease",funder:"Novartis / Apellis / Alexion",contact:"grants.office@novartis.com"},
 {area:"Duchenne / neuromuscular gene therapy",kw:["duchenne","dmd","spinal muscular","sma","gene therapy"],space:"raredisease",funder:"Sarepta / PTC / Ultragenyx",contact:"grantsandsponsorships@sarepta.com"},
 {area:"Lysosomal storage disorders",kw:["gaucher","fabry","pompe","lysosomal","mps","mucopolysaccharid","niemann"],space:"raredisease",funder:"Sanofi / Takeda / BioMarin",contact:"IndependentMedicalEducation.TakedaSupport@takeda.com"},
 {area:"Geographic atrophy / dry AMD",kw:["geographic atrophy","dry amd","syfovre","izervay","pegcetacoplan","avacincaptad"],space:"ophthalmology",funder:"Apellis / Astellas (Iveric)",contact:"Apellis & Astellas grant portals"},
 {area:"Wet AMD durability & retinal gene therapy",kw:["wet amd","neovascular","macular degeneration","vabysmo","eylea","aflibercept","faricimab","gene therapy retina","axpaxli","duravyu"],space:"ophthalmology",funder:"Regeneron / Roche-Genentech / AbbVie",contact:"Regeneron & Genentech (gene.com) portals"},
 {area:"Thyroid eye disease (TED)",kw:["thyroid eye","ted","teprotumumab","tepezza","igf-1r","graves"],space:"ophthalmology",funder:"Amgen",contact:"hccime@amgen.com"},
 {area:"Dry eye & Demodex / ocular surface",kw:["dry eye","demodex","blepharitis","meibomian","miebo","xdemvy","ocular surface"],space:"ophthalmology",funder:"Bausch + Lomb / Tarsus",contact:"caring@bausch.com"},
 {area:"Glaucoma / surgical & procedural",kw:["glaucoma","idose","durysta","iop","intraocular pressure","cataract"],space:"ophthalmology",funder:"Alcon / AbbVie (Allergan)",contact:"Alcon portal (reopens Fall 2026)"}
];

const BIGPHARMA = ["pfizer","eli lilly","lilly","abbvie","bristol myers","bristol-myers","johnson & johnson","janssen","novartis","astrazeneca","sanofi","regeneron","glaxosmithkline","gsk","amgen","boehringer","ucb","novo nordisk","bayer","merck","msd","takeda","gilead","roche","genentech","organon","daiichi","novo"];

/* ---------- CURATED STRATEGY DATA (verified 2026-07-10) ---------- */

const CURATED = {
 cardiovascular: {
   grants:[
     {co:"Bayer", url:"https://www.grants-contributions.bayer.com/home/medical-educational-grants", focus:"Stroke Prevention area of interest; also Cardio-Kidney-Metabolic & Heart Failure.", dl:"Submit ≥45 days before event (rolling)", rfp:"open"},
     {co:"Novartis", url:"https://www.novartis.com/us-en/healthcare-professionals/external-funding/educational-grants/professional-medical-education-grants", focus:"Atrial Fibrillation (thromboembolism/stroke, anticoagulants); ASCVD / Lp(a).", dl:"≥60 days before event (rolling)", rfp:"limited"},
     {co:"Novo Nordisk", url:"https://www.novonordisk.com/contact-us/external-support.html", focus:"Cardiovascular among stated TAs (CV outcomes in cardiometabolic).", dl:"Allow ≥45 days for review", rfp:"signal"}
   ],
   companies:[
     {name:"Bayer", type:"big", region:"Global (DE)", drugs:"asundexian (oral Factor XIa)", stage:"Ph3 — OCEANIC-STROKE positive Nov 2025 (secondary stroke prevention); heading to filing. OCEANIC-AF stopped early.", news:"https://www.bayer.com/en/us/newsroom"},
     {name:"BMS + J&J", type:"big", region:"US", drugs:"milvexian (oral Factor XIa)", stage:"Ph3 LIBREXIA — stroke & AF ongoing (topline ~2026–27); ACS arm discontinued Nov 2025.", news:"https://www.bms.com/news-and-media/press-releases.html"},
     {name:"Novartis (Anthos)", type:"big", region:"Global (CH)", drugs:"abelacimab (SC monthly FXI/FXIa mAb)", stage:"Ph3 LILAC (AF), ASTER/MAGNOLIA (cancer-assoc. thrombosis). Anthos acquired by Novartis.", news:"https://www.novartis.com/us-en/news"},
     {name:"Regeneron", type:"big", region:"US", drugs:"Factor XI-directed antibody program", stage:"Active Ph2/3 across VTE, atrial fibrillation, cancer-associated thrombosis & PAD (one of the most active thrombosis sponsors in the live feed).", news:"https://investor.regeneron.com/news/press-releases"},
     {name:"Pfizer", type:"big", region:"US", drugs:"apixaban (Eliquis, DOAC)", stage:"Marketed incumbent; EU patent pressure 2026.", news:"https://www.pfizer.com/newsroom/press-releases"},
     {name:"Boehringer Ingelheim", type:"big", region:"Global (DE)", drugs:"dabigatran (Pradaxa) + idarucizumab (Praxbind reversal)", stage:"Marketed — anchors reversal / bleeding-management education.", news:"https://www.boehringer-ingelheim.com/us/news-center"},
     {name:"Daiichi Sankyo", type:"big", region:"Global (JP)", drugs:"edoxaban (Lixiana/Savaysa, FXa)", stage:"Marketed; large ex-US AF/VTE footprint (US grant portal oncology-weighted).", news:"https://www.daiichisankyo.com/media/press_release/"},
     {name:"AstraZeneca / Alexion", type:"big", region:"Global (UK)", drugs:"andexanet alfa (Andexxa reversal)", stage:"Marketed reversal agent for apixaban/rivaroxaban.", news:"https://www.astrazeneca-us.com/media/press-releases.html"},
     {name:"Ionis", type:"big", region:"US", drugs:"fesomersen / FXI-LRx (FXI antisense)", stage:"Ph2 — ASO route to FXI knockdown.", news:"https://ir.ionis.com/press-releases"},
     {name:"Merck", type:"big", region:"US", drugs:"MK-2060 (anti-FXI mAb)", stage:"Ph2 — antibody FXI program (dialysis population).", news:"https://www.merck.com/media/news/"},
     {name:"Idorsia", type:"biotech", funder:false, region:"Global (CH)", drugs:"selatogrel (self-injected P2Y12)", stage:"Ph3 SOS-AMI — self-administered antiplatelet.", news:"https://www.idorsia.com/media/news-details"},
     {name:"CSL Behring", type:"biotech", funder:false, region:"Global (AU)", drugs:"4F-PCC (Kcentra)", stage:"Marketed — warfarin/urgent reversal.", news:"https://www.csl.com/news"}
   ],
   signals:"Educational hook: the Factor XI(a) 'hemostasis-sparing anticoagulation' class split verdict — first positive Phase 3 (OCEANIC-STROKE) alongside failed/paused arms. High unmet education need on patient selection vs DOACs."
 },
 nephrology: {
   grants:[
     {co:"Novartis", url:"https://www.novartis.com/us-en/healthcare-professionals/external-funding/educational-grants/professional-medical-education-grants", focus:"IgA nephropathy & C3 glomerulopathy — Fabhalta (iptacopan) full IgAN approval Jul 2026 creates a live launch-education window. Also Vanrafia (atrasentan).", dl:"≥60 days before event", rfp:"open"},
     {co:"Vertex", url:"https://www.vrtx.com/our-company/grants-giving/", focus:"IgA nephropathy — povetacicept (BAFF/APRIL) Ph3 RAINER positive; first-ever nephrology launch for Vertex, expect a new grant program to stand up.", dl:"Per program (new area)", rfp:"signal"},
     {co:"Otsuka", url:"https://www.otsuka-us.com/independent-medical-education", focus:"IgA nephropathy (sibeprenlimab / anti-APRIL) and ADPKD (tolvaptan) — established renal education funder.", dl:"≥60 days before start", rfp:"open"},
     {co:"Travere", url:"https://travere.com/independent-medical-education/", focus:"IgA nephropathy & FSGS (Filspari/sparsentan) — non-immunosuppressive route; accepts unsolicited IME.", dl:"≥60 days", rfp:"open"},
     {co:"AstraZeneca", url:"https://www.astrazeneca-us.com/sustainability/Request-Support/medical-education-office.html", focus:"CKD / cardio-renal-metabolic (Farxiga), IgAN, lupus nephritis (ex-US).", dl:"≥60 days before start", rfp:"open"},
     {co:"Apellis", url:"https://apellis.envisionpharma.com", focus:"C3 glomerulopathy & IC-MPGN (Empaveli) — first-ever therapy for IC-MPGN Jul 2025; high education need, no prescriber frame of reference.", dl:"≥60 days", rfp:"open"},
     {co:"Bayer", url:"https://www.grants-contributions.bayer.com/home/medical-educational-grants", focus:"Cardio-Kidney-Metabolic syndrome and CKD in T2D (finerenone/Kerendia) — named area of interest.", dl:"≥45 days before event", rfp:"open"},
     {co:"Aurinia", url:"https://www.auriniapharma.com/independent-medical-education", focus:"Lupus nephritis (Lupkynis) — narrow but dedicated single-indication funder.", dl:"Per program", rfp:"limited"},
     {co:"Roche / Genentech", url:"https://www.gene.com/good/giving/corporate-giving/imed", focus:"Lupus nephritis (Gazyva approved Oct 2025) and primary membranous nephropathy (priority review, Nov 2026 action date). Posts named RFPs — monitor.", dl:"≥60 days", rfp:"signal"}
   ],
   companies:[
     {name:"Novartis", type:"big", region:"Global (CH)", drugs:"iptacopan (Fabhalta, oral factor B); atrasentan (Vanrafia)", stage:"Fabhalta traditional approval in primary IgAN on eGFR slope Jul 2026 — resets IgAN sequencing. Two assets in one indication.", news:"https://www.novartis.com/us-en/news"},
     {name:"Vertex (Alpine)", type:"big", region:"US", drugs:"povetacicept (BAFF/APRIL dual inhibitor)", stage:"FDA target action date 30 Nov 2026 in IgAN — Vertex's first-ever renal product. Defined pre-launch window; warm up now.", news:"https://news.vrtx.com/"},
     {name:"Otsuka", type:"big", region:"Global (JP)", drugs:"sibeprenlimab (Voyxact, anti-APRIL); tolvaptan (Jynarque)", stage:"Voyxact APPROVED Nov 2025 in primary IgAN; established ADPKD franchise. Submit-ready funder.", news:"https://www.otsuka-us.com/news"},
     {name:"Vera Therapeutics", type:"biotech", region:"US", drugs:"atacicept (Trutakna, BAFF/APRIL)", stage:"APPROVED 7 Jul 2026 (accelerated) in primary IgAN — 46% proteinuria reduction in ORIGIN 3. First-ever commercial product, so a grant program should stand up shortly.", news:"https://ir.veratx.com/news-releases"},
     {name:"Travere", type:"biotech", region:"US", drugs:"sparsentan (Filspari, dual ETA/ARB)", stage:"Approved IgAN + FSGS — the non-immunosuppressive comparator every IgAN program is positioned against.", news:"https://ir.travere.com/news-releases"},
     {name:"Aurinia", type:"biotech", region:"US", drugs:"voclosporin (Lupkynis, calcineurin inhibitor)", stage:"First oral approved for lupus nephritis — anchors LN combination-therapy education.", news:"https://www.auriniapharma.com/news"},
     {name:"Roche / Genentech", type:"big", region:"Global (CH)", drugs:"obinutuzumab (Gazyva, anti-CD20)", stage:"Approved lupus nephritis Oct 2025 (REGENCY); priority review in primary membranous nephropathy after beating tacrolimus — Nov 2026 action date.", news:"https://www.gene.com/media/press-releases"},
     {name:"Apellis", type:"biotech", region:"US", drugs:"pegcetacoplan (Empaveli, C3 inhibitor)", stage:"Approved C3G & IC-MPGN Jul 2025 — first-ever therapy for IC-MPGN. Rare glomerular disease education is near-zero today.", news:"https://investors.apellis.com/news-releases"},
     {name:"AstraZeneca", type:"big", region:"Global (UK)", drugs:"dapagliflozin (Farxiga); zibotentan/dapagliflozin combo", stage:"SGLT2 is CKD standard of care; ZENITH-CKD combo in Ph3 — cardio-renal-metabolic framing.", news:"https://www.astrazeneca-us.com/media/press-releases.html"},
     {name:"Bayer", type:"big", region:"Global (DE)", drugs:"finerenone (Kerendia, nsMRA)", stage:"Marketed CKD in T2D; the Cardio-Kidney-Metabolic education anchor.", news:"https://www.bayer.com/en/us/newsroom"},
     {name:"Boehringer Ingelheim", type:"big", region:"Global (DE)", drugs:"empagliflozin (Jardiance)", stage:"Marketed CKD indication — SGLT2 co-anchor with AstraZeneca.", news:"https://www.boehringer-ingelheim.com/us/news-center"},
     {name:"Alexion / AstraZeneca", type:"big", region:"Global (UK)", drugs:"ravulizumab (Ultomiris, C5)", stage:"aHUS approved; complement-mediated kidney disease franchise.", news:"https://www.astrazeneca-us.com/media/press-releases.html"},
     {name:"Calliditas / Viatris", type:"biotech", region:"Global (SE)", drugs:"budesonide delayed-release (Tarpeyo/Kinpeygo)", stage:"First approved IgAN therapy — gut-directed mechanism, now being displaced in sequencing debates.", news:"https://www.calliditas.com/en/media/press-releases/"},
     {name:"Chinook / Novartis", type:"biotech", region:"US", drugs:"atrasentan; zigakibart (anti-APRIL)", stage:"Zigakibart Ph3 BEYOND in IgAN — acquired into Novartis, doubling their IgAN presence.", news:"https://www.novartis.com/us-en/news"},
     {name:"Alnylam", type:"biotech", region:"US", drugs:"nucresiran / RNAi renal programs", stage:"Early renal expansion off the ATTR platform — relationship-building stage.", news:"https://investors.alnylam.com/press-releases"}
   ],
   signals:"Educational hooks: IgA nephropathy has gone from one approved drug to a crowded five-mechanism field in under three years (gut-directed budesonide, dual ETA/ARB, oral factor B, and two BAFF/APRIL agents) — sequencing and eGFR-slope surrogate endpoints are the single biggest unmet education need in nephrology. Lupus nephritis added two approvals (voclosporin, obinutuzumab) with no consensus on combination strategy. C3G/IC-MPGN got first-ever therapies in 2025 with essentially no prescriber frame of reference. Vertex and Vera are both approaching first-ever renal launches — highest-value early grant relationships."
 },
 endocrinology: {
   grants:[
     {co:"Novo Nordisk", url:"https://www.novonordisk.com/contact-us/external-support.html", focus:"Diabetes, obesity, MASH, cardiovascular — core stated areas.", dl:"Allow ≥45 days for review", rfp:"open"},
     {co:"Eli Lilly", url:"https://grantoffice.lilly.com/areas-of-focus", focus:"Endocrine (diabetes/obesity) is a listed Area of Focus; topic detail behind portal login.", dl:"Submit ≥60 days before start (rolling)", rfp:"open"},
     {co:"Amgen", url:"https://www.amgen.com/responsibility/healthy-society/community-investment/independent-medical-education-funding", focus:"Obesity and dyslipidemia in diabetes among IME topics.", dl:"≥60 days before start (rolling)", rfp:"open"},
     {co:"Bayer", url:"https://www.grants-contributions.bayer.com/home/medical-educational-grants", focus:"CKD in T2D & Cardio-Kidney-Metabolic areas of interest.", dl:"≥45 days before event", rfp:"limited"}
   ],
   companies:[
     {name:"Eli Lilly", type:"big", region:"US", drugs:"tirzepatide (Zepbound); orforglipron (Foundayo); retatrutide", stage:"Tirzepatide approved; orforglipron — first oral small-molecule GLP-1, obesity approval Apr 2026; retatrutide Ph3 (triple agonist).", news:"https://www.lilly.com/news/press-releases"},
     {name:"Novo Nordisk", type:"big", region:"Global (DK)", drugs:"semaglutide (Wegovy/Ozempic); CagriSema; amycretin", stage:"Semaglutide approved; CagriSema NDA filed Dec 2025; amycretin Ph3 (GLP-1+amylin).", news:"https://www.novonordisk.com/news-and-media/latest-news.html"},
     {name:"Amgen", type:"big", region:"US", drugs:"MariTide (maridebart cafraglutide)", stage:"Ph3 — once-monthly GIPR antagonist / GLP-1 agonist.", news:"https://www.amgen.com/newsroom/press-releases"},
     {name:"Boehringer / Zealand", type:"big", region:"Global (DE)", drugs:"survodutide (glucagon/GLP-1)", stage:"Ph3 obesity + MASH (Breakthrough Therapy).", news:"https://www.boehringer-ingelheim.com/us/news-center"},
     {name:"Roche", type:"big", region:"Global (CH)", drugs:"CT-388 (GLP-1/GIP); petrelintide (amylin); pegozafermin (FGF21)", stage:"Ph2/Ph3 — bought into obesity+MASH (89bio, 2025).", news:"https://www.gene.com/media/press-releases"},
     {name:"Pfizer (Metsera)", type:"big", region:"US", drugs:"MET-097i (monthly GLP-1); amylin analog", stage:"Ph2/3 — re-entered obesity via ~$10B Metsera buy; oral danuglipron discontinued.", news:"https://www.pfizer.com/newsroom/press-releases"},
     {name:"AstraZeneca", type:"big", region:"Global (UK)", drugs:"AZD5004 (oral GLP-1)", stage:"Ph2 — fast-follower obesity portfolio.", news:"https://www.astrazeneca-us.com/media/press-releases.html"},
     {name:"Merck", type:"big", region:"US", drugs:"efinopegdutide (GLP-1/glucagon, MASH); sitagliptin", stage:"Ph2 MASH; legacy DPP-4 anchor.", news:"https://www.merck.com/media/news/"},
     {name:"Madrigal", type:"biotech", region:"US", drugs:"resmetirom (Rezdiffra, THR-β)", stage:"Approved — first & only FDA-approved MASH therapy.", news:"https://ir.madrigalpharma.com/news-releases"},
     {name:"Corcept", type:"biotech", region:"US", drugs:"relacorilant (cortisol modulator)", stage:"NDA — Cushing's/hypercortisolism leader.", news:"https://ir.corcept.com/news-releases"},
     {name:"Regeneron", type:"big", region:"US", drugs:"trevogrumab (anti-myostatin) + sema", stage:"Ph2 — muscle-preservation-with-weight-loss thesis.", news:"https://investor.regeneron.com/news/press-releases"},
     {name:"Viking Therapeutics", type:"biotech", funder:false, region:"US", drugs:"VK2735 (GLP-1/GIP, SC + oral)", stage:"SC Ph3 VANQUISH; oral heading to Ph3.", news:"https://ir.vikingtherapeutics.com/"},
     {name:"Structure Therapeutics", type:"biotech", funder:false, region:"US", drugs:"aleniglipron (oral GLP-1)", stage:"Ph2 — leading oral GLP-1 challenger.", news:"https://ir.structuretx.com/"},
     {name:"Zealand Pharma", type:"biotech", funder:false, region:"Global (DK)", drugs:"petrelintide (amylin); survodutide (lic. BI)", stage:"Ph3-bound amylin monotherapy.", news:"https://www.zealandpharma.com/news"},
     {name:"Akero", type:"biotech", funder:false, region:"US", drugs:"efruxifermin (FGF21)", stage:"Ph3 SYNCHRONY — fibrosis-reversal MASH data.", news:"https://ir.akerotx.com/news-releases"},
     {name:"Terns", type:"biotech", funder:false, region:"US", drugs:"TERN-601 (oral GLP-1); TERN-501 (THR-β)", stage:"Ph1/2 — emerging oral incretin + MASH.", news:"https://ir.ternspharma.com/news-releases"},
     {name:"Inventiva", type:"biotech", funder:false, region:"Global (FR)", drugs:"lanifibranor (pan-PPAR)", stage:"Ph3 NATiV3 — only late-stage pan-PPAR in MASH.", news:"https://inventivapharma.com/press-releases/"},
     {name:"Scholar Rock", type:"biotech", funder:false, region:"US", drugs:"apitegromab (anti-myostatin)", stage:"Ph2 EMBRAZE — muscle-sparing adjunct to GLP-1s.", news:"https://investors.scholarrock.com/news-releases"}
   ],
   signals:"Educational hooks: oral GLP-1 pills entering market (orforglipron), multi-receptor & amylin combos, and MASH (resmetirom/Rezdiffra approved). Fast-moving obesity/metabolic education demand."
 },
 immunology: {
   grants:[
     {co:"Incyte", url:"https://www.incytegrantsandgiving.com/", focus:"Immuno-dermatology (AD, vitiligo, HS) — single application gateway, no public topic list.", dl:"Submit ≥60 days before decision", rfp:"limited"},
     {co:"Galderma", url:"https://galderma-portal.idea-point.com/Request-for-Proposals.aspx?groupid=GRANT", focus:"Dermatology — monetary grants now RFP-gated only (since Nov 2024).", dl:"RFP-driven; ~12 wks ahead", rfp:"limited"},
     {co:"LEO Pharma", url:"https://leo-portal.idea-point.com/", focus:"Pure-play dermatology CE/HCP education. (Confirm live status — portal showed a stale banner.)", dl:"No fixed cycle", rfp:"signal"},
     {co:"Amgen", url:"https://www.amgen.com/responsibility/healthy-society/community-investment/independent-medical-education-funding", focus:"RA, PsA, AS, ANCA vasculitis, lupus, IBD, asthma/COPD — broadest published match.", dl:"≥60 days before start", rfp:"open"},
     {co:"J&J", url:"https://www.jnj.com/innovativemedicine/us/grants-and-giving/educational", focus:"IBD (Crohn's, UC), rheumatology (PsA, AS, RA), generalized MG; Implementation Science RFP.", dl:"Impl. Science RFP ~Jun 30 2026; ~90-day decision", rfp:"open"},
     {co:"AstraZeneca", url:"https://www.astrazeneca-us.com/sustainability/Request-Support/medical-education-office.html", focus:"SLE — OPEN (limited budget); ex-US cutaneous/nephritis lupus, myositis, scleroderma.", dl:"≥60 days before start", rfp:"open"},
     {co:"Takeda", url:"https://www.takeda.com/en-us/science/independent-medical-education-grants/", focus:"IBD, EoE, SBS-IF, CIDP, HAE, PID — OPEN. (SLE & PsA not accepting.)", dl:"≥60 days before start", rfp:"open"},
     {co:"Novartis", url:"https://www.novartis.com/us-en/healthcare-professionals/external-funding/educational-grants/professional-medical-education-grants", focus:"Sjögren's — funding available.", dl:"≥60 days before event", rfp:"limited"},
     {co:"Bristol Myers Squibb", url:"https://www.bms.com/our-impact/corporate-giving/funding-opportunities/request-for-proposals-education.html", focus:"Immunology incl. lupus; RFE/RFP table posts intermittently.", dl:"Check portal (was empty at fetch)", rfp:"signal"}
   ],
   companies:[
     {name:"J&J", type:"big", sub:"derm", region:"US", drugs:"icotrokinra (Icotyde, oral IL-23R); guselkumab (Tremfya)", stage:"Icotrokinra approved Mar 2026 — first oral IL-23 peptide (psoriasis); Tremfya expanded.", news:"https://www.jnj.com/innovativemedicine/newsroom"},
     {name:"AbbVie", type:"big", sub:"derm", region:"US", drugs:"Skyrizi (IL-23); Rinvoq (JAK1); lutikizumab", stage:"Skyrizi/Rinvoq marketed; lutikizumab Ph3 in hidradenitis suppurativa.", news:"https://news.abbvie.com/"},
     {name:"Sanofi / Regeneron", type:"big", sub:"derm", region:"Global (FR)/US", drugs:"Dupixent (dupilumab, IL-4Rα); amlitelimab (OX40L)", stage:"Dupixent added CSU & bullous pemphigoid; amlitelimab Ph3 AD, filing H2 2026.", news:"https://www.news.sanofi.us/"},
     {name:"UCB", type:"big", sub:"derm", region:"Global (BE)", drugs:"bimekizumab (Bimzelx, IL-17A/F)", stage:"Marketed incl. hidradenitis suppurativa.", news:"https://www.ucb.com/newsroom/press-releases"},
     {name:"BMS", type:"big", sub:"derm", region:"US", drugs:"deucravacitinib (Sotyktu, oral TYK2)", stage:"Approved psoriasis; now PsA (Mar 2026) — first TYK2 in PsA.", news:"https://www.bms.com/news-and-media/press-releases.html"},
     {name:"Galderma", type:"big", sub:"derm", region:"Global (CH)", drugs:"nemolizumab (Nemluvio, IL-31Rα)", stage:"Approved prurigo nodularis + atopic dermatitis.", news:"https://www.galderma.com/newsroom"},
     {name:"Incyte", type:"biotech", sub:"derm", region:"US", drugs:"ruxolitinib cream (Opzelura); povorcitinib (oral JAK1)", stage:"Opzelura marketed; povorcitinib under review in HS, Ph3 positive vitiligo.", news:"https://investor.incyte.com/press-releases"},
     {name:"LEO Pharma", type:"big", sub:"derm", region:"Global (DK)", drugs:"tralokinumab (Adbry, IL-13); delgocitinib (Anzupgo)", stage:"Anzupgo first approved topical for chronic hand eczema.", news:"https://www.leo-pharma.us/media-center"},
     {name:"Eli Lilly", type:"big", sub:"derm", region:"US", drugs:"lebrikizumab (Ebglyss, IL-13); ixekizumab (Taltz)", stage:"Ebglyss key new AD biologic; Taltz IL-17 psoriasis.", news:"https://www.lilly.com/news/press-releases"},
     {name:"Novartis", type:"big", sub:"derm", region:"Global (CH)", drugs:"secukinumab (Cosentyx, IL-17); remibrutinib (oral BTK)", stage:"Remibrutinib Ph3 leads oral BTK in CSU.", news:"https://www.novartis.com/us-en/news"},
     {name:"Takeda", type:"big", sub:"derm", region:"Global (JP)", drugs:"zasocitinib / TAK-279 (oral TYK2)", stage:"Ph3 — potential best-in-class oral TYK2.", news:"https://www.takeda.com/en-us/newsroom/news-releases/"},
     {name:"Pfizer", type:"big", sub:"derm", region:"US", drugs:"ritlecitinib (Litfulo); abrocitinib (Cibinqo)", stage:"Litfulo lead alopecia oral; Cibinqo in AD.", news:"https://www.pfizer.com/newsroom/press-releases"},
     {name:"Amgen", type:"big", sub:"derm", region:"US", drugs:"apremilast (Otezla, PDE4)", stage:"Otezla marketed; anti-OX40 rocatinlimab discontinued Mar 2026.", news:"https://www.amgen.com/newsroom/press-releases"},
     {name:"Sun Pharma", type:"big", sub:"derm", region:"Global (IN)", drugs:"deuruxolitinib (Leqselvi); tildrakizumab (Ilumya)", stage:"Leqselvi new oral alopecia entrant; Ilumya psoriasis.", news:"https://sunpharma.com/newsroom/"},
     {name:"Organon (Dermavant)", type:"big", sub:"derm", region:"US", drugs:"tapinarof (Vtama, AhR agonist)", stage:"First topical AhR agonist — psoriasis + AD.", news:"https://www.organon.com/news/"},
     {name:"Arcutis", type:"biotech", sub:"derm", funder:false, region:"US", drugs:"roflumilast (Zoryve, topical PDE4)", stage:"Marketed — non-steroidal topical (psoriasis/seb derm/AD).", news:"https://investors.arcutis.com/news-releases"},
     {name:"Celldex", type:"biotech", sub:"derm", funder:false, region:"US", drugs:"barzolvolimab (anti-KIT mAb)", stage:"Ph3 — anti-KIT mechanism in CSU.", news:"https://ir.celldex.com/news-releases"},
     {name:"Alumis", type:"biotech", sub:"derm", funder:false, region:"US", drugs:"ESK-001 (oral allosteric TYK2)", stage:"Ph3 ONWARD in psoriasis.", news:"https://ir.alumis.com/news-releases"},
     {name:"Apogee", type:"biotech", sub:"derm", funder:false, region:"US", drugs:"APG777 (extended half-life anti-IL-13)", stage:"Ph2 — less-frequent dosing vs dupilumab in AD.", news:"https://ir.apogeetherapeutics.com/news-releases"},
     {name:"Oruka", type:"biotech", sub:"derm", funder:false, region:"US", drugs:"ORKA-001 (anti-IL-23); ORKA-002 (IL-17A/F)", stage:"Ph1 — infrequent-dosing psoriasis biologics.", news:"https://ir.orukatx.com/news-releases"},
     {name:"AbbVie", type:"big", region:"US", sub:"rheum,gastro,derm", drugs:"Rinvoq (JAK1); Skyrizi (IL-23)", stage:"Rinvoq 9th indication = giant cell arteritis (2025); Skyrizi added UC.", news:"https://news.abbvie.com/"},
     {name:"J&J", type:"big", region:"US", sub:"gastro,rheum,derm", drugs:"Tremfya (IL-23); nipocalimab (Imaavy, FcRn)", stage:"Tremfya across IBD (SC induction); nipocalimab approved gMG (2025), Sjögren's ongoing.", news:"https://www.jnj.com/innovativemedicine/newsroom"},
     {name:"Roche / Genentech", type:"big", region:"Global (CH)", sub:"rheum", drugs:"obinutuzumab (Gazyva, anti-CD20)", stage:"Approved lupus nephritis Oct 2025 (REGENCY); SLE filing (ALLEGORY).", news:"https://www.gene.com/media/press-releases"},
     {name:"Novartis", type:"big", region:"Global (CH)", sub:"rheum,derm,allergy", drugs:"remibrutinib (Rhapsido, oral BTK); ianalumab (BAFF-R)", stage:"Remibrutinib approved CSU (2025); ianalumab Ph3 positive Sjögren's, ongoing SLE.", news:"https://www.novartis.com/us-en/news"},
     {name:"GSK", type:"big", region:"Global (UK)", sub:"rheum,pulm,allergy", drugs:"belimumab (Benlysta, BLyS)", stage:"Marketed SLE + lupus nephritis; added pediatric autoinjector 2025.", news:"https://www.gsk.com/en-gb/media/press-releases/"},
     {name:"argenx", type:"biotech", region:"Global (NL)", sub:"rheum", drugs:"efgartigimod (Vyvgart, FcRn)", stage:"Approved gMG + CIDP; expanding Sjögren's/myositis.", news:"https://www.argenx.com/news"},
     {name:"Amgen", type:"big", region:"US", sub:"rheum,pulm,allergy", drugs:"inebilizumab (Uplizna, anti-CD19)", stage:"Approved IgG4-related disease Apr 2025 (first-ever) + NMOSD.", news:"https://www.amgen.com/newsroom/press-releases"},
     {name:"AstraZeneca / Alexion", type:"big", region:"Global (UK)", sub:"rheum,pulm,allergy", drugs:"anifrolumab (Saphnelo, IFNAR); ravulizumab (Ultomiris)", stage:"Saphnelo defines type-I-IFN blockade in SLE; C5 in MG/NMOSD.", news:"https://www.astrazeneca-us.com/media/press-releases.html"},
     {name:"BMS", type:"big", region:"US", sub:"rheum,derm", drugs:"deucravacitinib (Sotyktu, TYK2); abatacept (Orencia)", stage:"Oral TYK2 Ph3 in SLE.", news:"https://www.bms.com/news-and-media/press-releases.html"},
     {name:"UCB", type:"big", region:"Global (BE)", sub:"rheum", drugs:"rozanolixizumab (Rystiggo, FcRn); zilucoplan (Zilbrysq)", stage:"Two approved gMG mechanisms.", news:"https://www.ucb.com/newsroom/press-releases"},
     {name:"Takeda", type:"big", region:"Global (JP)", sub:"gastro,allergy", drugs:"vedolizumab (Entyvio, α4β7)", stage:"Gut-selective IBD anchor.", news:"https://www.takeda.com/en-us/newsroom/news-releases/"},
     {name:"Sanofi", type:"big", region:"Global (FR)", sub:"rheum", drugs:"rilzabrutinib (BTK); frexalimab (anti-CD40L)", stage:"Rilzabrutinib approved ITP; frexalimab Ph3 lupus.", news:"https://www.news.sanofi.us/"},
     {name:"Biogen", type:"big", region:"US", sub:"rheum,derm", drugs:"litifilimab (BDCA2); dapirolizumab (CD40L)", stage:"Ph3 — novel SLE/CLE mechanisms.", news:"https://investors.biogen.com/news-releases"},
     {name:"Merck", type:"big", region:"US", sub:"gastro", drugs:"tulisokibart (anti-TL1A)", stage:"Ph3 — front-runner anti-TL1A in UC/Crohn's.", news:"https://www.merck.com/media/news/"},
     {name:"Abivax", type:"biotech", funder:false, region:"Global (FR)", sub:"gastro", drugs:"obefazimod (oral miR-124 enhancer)", stage:"Ph3 ABTECT positive in UC; NDA late 2026.", news:"https://www.abivax.com/en/press-releases/"},
     {name:"Immunovant", type:"biotech", funder:false, region:"US", sub:"rheum", drugs:"IMVT-1402 (next-gen anti-FcRn)", stage:"Ph3 — albumin-sparing FcRn, broad program.", news:"https://www.immunovant.com/news"},
     {name:"Cabaletta / Kyverna", type:"biotech", funder:false, region:"US", sub:"rheum", drugs:"CD19 CAR-T (CABA-201; KYV-101)", stage:"Autoimmune CAR-T 'immune reset' in SLE, myositis, MG — emerging frontier.", news:"https://ir.cabalettabio.com/"},
     {name:"Sanofi / Regeneron", type:"big", region:"Global (FR)", sub:"allergy,pulm,derm,gastro", drugs:"dupilumab (Dupixent, IL-4Rα)", stage:"The type-2 inflammation anchor across asthma, CRSwNP, EoE, COPD, atopic dermatitis and bullous pemphigoid — broadest single-asset education footprint in immunology.", news:"https://www.news.sanofi.us/"},
     {name:"AstraZeneca", type:"big", region:"Global (UK)", sub:"pulm,allergy", drugs:"tezepelumab (Tezspire, anti-TSLP); benralizumab (Fasenra)", stage:"Tezspire is the only biologic without a phenotype restriction in severe asthma; CRSwNP added. Epithelial-cytokine (alarmin) education is new territory.", news:"https://www.astrazeneca-us.com/media/press-releases.html"},
     {name:"GSK", type:"big", region:"Global (UK)", sub:"pulm,allergy", drugs:"mepolizumab (Nucala, IL-5); depemokimab (ultra-long-acting IL-5)", stage:"Nucala added COPD 2025; depemokimab approved — twice-yearly dosing changes the adherence conversation entirely.", news:"https://www.gsk.com/en-gb/media/press-releases/"},
     {name:"Regeneron", type:"big", region:"US", sub:"allergy", drugs:"linvoseltamab; REGN1908-1909 (cat allergy)", stage:"Allergen-specific antibody approach — a genuinely new modality in allergy with no prescriber frame of reference.", news:"https://investor.regeneron.com/news/press-releases"},
     {name:"Aimmune / Nestlé", type:"biotech", funder:false, region:"US", sub:"allergy", drugs:"Palforzia (peanut oral immunotherapy)", stage:"Marketed OIT — food-allergy protocol education remains thin outside specialist centres.", news:"https://www.aimmune.com/newsroom"},
     {name:"ALK-Abelló", type:"biotech", region:"Global (DK)", sub:"allergy", drugs:"sublingual immunotherapy tablets; adrenaline nasal spray (neffy partner)", stage:"Needle-free epinephrine and SLIT expansion — anaphylaxis-management education is actively changing.", news:"https://www.alk.net/news"},
     {name:"ARS Pharmaceuticals", type:"biotech", funder:false, region:"US", sub:"allergy", drugs:"neffy (epinephrine nasal spray)", stage:"Approved 2024 adults + 2025 pediatric — first needle-free anaphylaxis rescue; first-ever commercial product, high-value early relationship.", news:"https://ir.ars-pharma.com/news-releases"},
     {name:"Verona Pharma / Merck", type:"biotech", region:"Global (UK)", sub:"pulm", drugs:"ensifentrine (Ohtuvayre, dual PDE3/4)", stage:"Approved COPD 2024 — first new inhaled COPD mechanism in decades; acquired by Merck 2025.", news:"https://www.veronapharma.com/media/press-releases"},
     {name:"Roche / Genentech", type:"big", region:"Global (CH)", sub:"pulm,allergy", drugs:"omalizumab (Xolair, anti-IgE)", stage:"Food-allergy indication added Feb 2024 — expands allergy education well beyond asthma/CSU.", news:"https://www.gene.com/media/press-releases"},
     {name:"Lilly", type:"big", region:"US", sub:"gastro,derm", drugs:"mirikizumab (Omvoh, IL-23); lebrikizumab (Ebglyss)", stage:"Omvoh approved UC + Crohn's; Ebglyss in AD with EMA pediatric filing accepted.", news:"https://investor.lilly.com/news-releases"},
     {name:"Bristol Myers Squibb", type:"big", region:"US", sub:"gastro", drugs:"ozanimod (Zeposia, S1P)", stage:"Marketed UC — oral S1P positioning versus advanced biologics.", news:"https://www.bms.com/news-and-media/press-releases.html"},
     {name:"Pfizer", type:"big", region:"US", sub:"gastro,rheum", drugs:"etrasimod (Velsipity, S1P); ritlecitinib (Litfulo)", stage:"Velsipity approved UC; expanding oral small-molecule footprint.", news:"https://www.pfizer.com/newsroom/press-releases"}
   ],
   signals:"Educational hooks: oral 'biologic-equivalents' (BTK, TYK2, JAK), a lupus / lupus-nephritis breakout year, FcRn expansion, and the autoimmune CAR-T frontier — all high-need education topics."
 },
 raredisease: {
   grants:[
     {co:"Alexion / AstraZeneca (Rare)", url:"https://alexion.com/grants", focus:"Complement, rare hematology & rare renal (PNH, aHUS, C3G) — dedicated rare-disease grants office.", dl:"≥60 days before start", rfp:"open"},
     {co:"Takeda", url:"https://www.takeda.com/en-us/science/independent-medical-education-grants/", focus:"Rare metabolic (lysosomal), hereditary angioedema, rare GI/immunology.", dl:"≥60 days before start", rfp:"open"},
     {co:"Sanofi (Genzyme / Rare)", url:"https://www.sanofi.us/en/our-company/social-impact/corporate-social-responsibility/contributions-and-giving", focus:"Lysosomal storage disorders, rare blood disorders, rare neurology.", dl:"12–16 weeks ahead", rfp:"limited"},
     {co:"Amgen (Ultra-Rare / Horizon)", url:"https://www.amgen.com/responsibility/healthy-society/community-investment/independent-medical-education-funding", focus:"Ultra-rare (formerly Horizon) — TED, gout/CPP, rare autoimmune.", dl:"≥60 days before start", rfp:"open"},
     {co:"Sobi", url:"https://grants.sobi.com/", focus:"Rare hematology, HAE, rare immunology.", dl:"Per program", rfp:"open"},
     {co:"Chiesi Global Rare Diseases", url:"https://www.cybergrants.com/chiesi/landingpage", focus:"Rare metabolic/lysosomal (US IME via CyberGrants from Mar 2026).", dl:"Per program", rfp:"limited"}
   ],
   companies:[
     {name:"Alnylam", type:"biotech", region:"US", drugs:"vutrisiran (Amvuttra, RNAi TTR silencer)", stage:"Approved ATTR-PN; ATTR-CM added Mar 2025 (HELIOS-B) — first RNAi silencer in ATTR-CM.", news:"https://investors.alnylam.com/press-releases"},
     {name:"BridgeBio", type:"biotech", funder:false, region:"US", drugs:"acoramidis (Attruby, oral TTR stabilizer)", stage:"Approved ATTR-CM Nov 2024 — positioning vs tafamidis & silencers.", news:"https://investor.bridgebio.com/news"},
     {name:"Ionis / AstraZeneca", type:"big", region:"US/Global (UK)", drugs:"eplontersen (Wainua, antisense TTR)", stage:"Approved ATTR-PN; ATTR-CM Ph3 CARDIO-TTRansform FAILED Jul 2026 — teach as PN only.", news:"https://ir.ionis.com/press-releases"},
     {name:"Novartis", type:"big", region:"Global (CH)", drugs:"iptacopan (Fabhalta, oral factor B)", stage:"Approved PNH; C3G Mar 2025 (first-ever); IgAN full approval Jul 2026 — oral complement across 3 rare indications.", news:"https://www.novartis.com/us-en/news"},
     {name:"Apellis", type:"biotech", region:"US", drugs:"pegcetacoplan (Empaveli, C3 inhibitor)", stage:"Approved PNH; C3G & IC-MPGN Jul 2025 — first therapy for IC-MPGN.", news:"https://investors.apellis.com/news-releases"},
     {name:"Alexion / AstraZeneca", type:"big", region:"Global (UK)", drugs:"danicopan (Voydeya, oral factor D)", stage:"Approved 2024 as add-on for extravascular hemolysis on C5 inhibitors.", news:"https://www.astrazeneca-us.com/media/press-releases.html"},
     {name:"CSL Behring", type:"big", funder:false, region:"Global (AU)", drugs:"garadacimab (Andembry, anti-FXIIa)", stage:"Approved Jun 2025 — first FXIIa-targeted once-monthly HAE prophylaxis.", news:"https://www.csl.com/news"},
     {name:"KalVista", type:"biotech", funder:false, region:"Global (UK)", drugs:"sebetralstat (Ekterly, oral kallikrein)", stage:"Approved Jul 2025 — first oral on-demand HAE therapy.", news:"https://ir.kalvista.com/news-releases"},
     {name:"Ionis", type:"big", region:"US", drugs:"donidalorsen (Dawnzera, antisense PKK)", stage:"Approved Aug 2025 — first RNA-targeted HAE prophylaxis.", news:"https://ir.ionis.com/press-releases"},
     {name:"Sarepta", type:"biotech", region:"US", drugs:"delandistrogene moxeparvovec (Elevidys, gene therapy)", stage:"DMD — BOXED WARNING Nov 2025 (fatal liver failure), use restricted — major safety-education need.", news:"https://investorrelations.sarepta.com/news-releases"},
     {name:"Vertex / CRISPR Tx", type:"big", region:"US/Global (CH)", drugs:"exa-cel (Casgevy, CRISPR)", stage:"Approved sickle cell / TDT — first CRISPR medicine; complex delivery model.", news:"https://news.vrtx.com/"},
     {name:"argenx", type:"biotech", region:"Global (NL)", drugs:"efgartigimod (Vyvgart, FcRn)", stage:"Approved gMG + CIDP (2024) — first FcRn blocker in CIDP.", news:"https://www.argenx.com/news"},
     {name:"BioMarin", type:"biotech", region:"US", drugs:"vosoritide (Voxzogo); enzyme therapies", stage:"Rare growth/metabolic portfolio — established rare-disease educator.", news:"https://www.biomarin.com/news/"},
     {name:"Ultragenyx", type:"biotech", region:"US", drugs:"multiple rare metabolic/gene therapies", stage:"Broad ultra-rare pipeline; active grants program.", news:"https://ir.ultragenyx.com/press-releases"}
   ],
   signals:"Educational hooks: ATTR-CM crowding (acoramidis, vutrisiran) with eplontersen's ATTR-CM failure (Jul 2026); a 2025 HAE wave (oral sebetralstat, FXIIa garadacimab, antisense donidalorsen); oral complement (iptacopan) spanning PNH/C3G/IgAN; and the Elevidys DMD boxed warning driving urgent gene-therapy safety education."
 },
 ophthalmology: {
   grants:[
     {co:"Amgen (Thyroid Eye Disease)", url:"https://www.amgen.com/responsibility/healthy-society/community-investment/independent-medical-education-funding", focus:"TED explicitly listed with named topics (Tepezza). Unsolicited + published areas of interest; accredited only, no fellowships. Strongest documented ophtho target.", dl:"≥60 days (rolling)", rfp:"open"},
     {co:"Apellis", url:"https://apellis.envisionpharma.com", focus:"Geographic atrophy / AMD (Syfovre). Accepts unsolicited; also a separate Retina Fellow Research Grant.", dl:"≥60 days", rfp:"open"},
     {co:"Astellas (Iveric Bio)", url:"https://www.astellasgrants.com/IndependentMedicalEducation.html", focus:"Retina / GA (Izervay) + DME. Posts named CGAs (a 2026 CGA referenced ASRS) plus general submissions.", dl:"≥60 days", rfp:"open"},
     {co:"Bausch + Lomb", url:"https://www.bausch.com/product-innovation/independent-research-cme-grants/", focus:"Core eye care — retina, dry eye (Miebo), glaucoma. Unsolicited via caring@bausch.com.", dl:"Per program", rfp:"open"},
     {co:"Tarsus", url:"https://www.tarsus-science.com", focus:"Demodex blepharitis / ocular surface (Xdemvy). Unsolicited; 45–60 days. Not accepting IITs.", dl:"45–60 days", rfp:"open"},
     {co:"Alcon", url:"https://www.alconscience.com/medical-education/independent/", focus:"Cataract/IOL, vitreoretinal, glaucoma, dry eye/ocular surface — aligned to published annual goals. PORTAL CLOSED; expected to reopen Fall 2026 for 2027 activities.", dl:"≥8 weeks (when open)", rfp:"limited"},
     {co:"Regeneron", url:"https://educationalfunding.regeneron.com", focus:"Retina (Eylea / Eylea HD). Unsolicited/rolling; no public ophtho RFP confirmed — monitor.", dl:"Rolling", rfp:"limited"},
     {co:"Roche / Genentech", url:"https://www.gene.com/good/giving/corporate-giving/imed", focus:"Wet AMD durability (Vabysmo/Susvimo). Posts named RFPs — monitor the RFP page; no open ophtho RFP confirmed.", dl:"≥60 days", rfp:"signal"},
     {co:"AbbVie (Allergan Eye Care)", url:"https://www.abbvie.com/science/independent-educational-grants.html", focus:"DME, glaucoma. Since 2024 funds only the invited IME Provider Network — verify membership first.", dl:"≥60 days", rfp:"limited"}
   ],
   companies:[
     {name:"Regeneron / Bayer", type:"big", region:"US/Global (DE)", drugs:"aflibercept 8mg (Eylea HD, VEGF trap)", stage:"Approved; expanded label Nov 2025 (+RVO, monthly option) — extended-dosing education.", news:"https://investor.regeneron.com/news/press-releases"},
     {name:"Roche / Genentech", type:"big", region:"Global (CH)", drugs:"faricimab (Vabysmo, VEGF-A/Ang-2 bispecific)", stage:"Approved; durability vs Eylea HD + Ang-2 messaging.", news:"https://www.gene.com/media/press-releases"},
     {name:"Apellis", type:"biotech", region:"US", drugs:"pegcetacoplan (Syfovre, C3)", stage:"Approved GA; vasculitis warning (Dec 2024), 0 severe cases 2025 — first-injection monitoring education. (Apellis being acquired by Biogen.)", news:"https://investors.apellis.com/news-releases"},
     {name:"Astellas / Iveric", type:"big", region:"Global (JP)", drugs:"avacincaptad pegol (Izervay, C5)", stage:"Approved GA; expanded label Feb 2025 (duration cap removed) — C5 vs C3, EOM dosing.", news:"https://newsroom.astellas.us/"},
     {name:"Amgen (Horizon)", type:"big", region:"US", drugs:"teprotumumab (Tepezza, IGF-1R)", stage:"Approved TED; SC on-body injector Ph3 positive Apr 2026 — infusion → home-administration shift.", news:"https://www.amgen.com/newsroom/press-releases"},
     {name:"AbbVie / REGENXBIO", type:"big", region:"US", drugs:"ABBV-RGX-314 (AAV8 anti-VEGF gene therapy)", stage:"Ph3; filing guided H1 2026 — one-time therapy counseling, subretinal delivery.", news:"https://news.abbvie.com/"},
     {name:"Bausch + Lomb", type:"big", region:"US/Global (CA)", drugs:"Miebo (perfluorohexyloctane)", stage:"Approved — first anti-evaporative dry-eye Rx, MGD targeting.", news:"https://www.bausch.com/our-company/recent-news/"},
     {name:"Tarsus", type:"biotech", region:"US", drugs:"Xdemvy (lotilaner)", stage:"Approved Demodex blepharitis; MGD Ph2a positive — ocular-surface expansion.", news:"https://ir.tarsusrx.com/news-releases"},
     {name:"Ocular Therapeutix", type:"biotech", funder:false, region:"US", drugs:"Axpaxli (OTX-TKI, axitinib hydrogel)", stage:"Ph3 SOL-1 positive Feb 2026; NDA pending, SOL-R Q1 2027 — highest-probability new wet-AMD launch.", news:"https://investors.ocutx.com/news-releases"},
     {name:"EyePoint", type:"biotech", funder:false, region:"US", drugs:"Duravyu (vorolanib, TKI insert)", stage:"Ph3 wet-AMD topline mid-2026; DME Ph3 starting — sustained-TKI depot.", news:"https://investors.eyepointpharma.com/news-releases"},
     {name:"Viridian", type:"biotech", region:"US", drugs:"veligrotug (Lumvoa, IGF-1R); VRDN-003 SC", stage:"Lumvoa APPROVED Jul 2026 for TED regardless of duration or activity — first real Tepezza competitor and Viridian's first commercial product.", news:"https://ir.viridiantherapeutics.com/news-releases"},
     {name:"4D Molecular", type:"biotech", funder:false, region:"US", drugs:"4D-150 (intravitreal AAV dual VEGF-A/C)", stage:"Ph3 enrolled; topline H1–H2 2027 — non-surgical gene therapy.", news:"https://ir.4dmoleculartherapeutics.com/news-releases"},
     {name:"Adverum (→ Lilly)", type:"biotech", funder:false, region:"US", drugs:"Ixo-vec / ADVM-022 (intravitreal AAV)", stage:"Ph3 ARTEMIS topline Q1 2027; Lilly acquiring (up to $1.5B) — big-pharma validation.", news:"https://investors.adverum.com/news-releases"},
     {name:"Sling Therapeutics", type:"biotech", funder:false, region:"US", drugs:"linsitinib (oral IGF-1R)", stage:"Ph2b/3 positive; confirmatory Ph3 — first oral TED agent.", news:"https://slingtherapeutics.com/news/"},
     {name:"Kodiak", type:"biotech", funder:false, region:"US", drugs:"tarcocimab (antibody biopolymer conjugate)", stage:"DR Ph3 positive Mar 2026; DAYBREAK topline Q3 2026 — checkered program to interpret.", news:"https://ir.kodiak.com/news-releases"}
   ],
   signals:"GA is the crowded battleground (Apellis Syfovre vs Astellas Izervay); wet-AMD durability (Eylea HD, Vabysmo, sustained-TKI Axpaxli & Duravyu) and DME are broad multi-supporter fields; TED is essentially Amgen-owned but about to turn competitive (Viridian, oral linsitinib); intravitreal gene therapy readouts cluster in Q1 2027. Live portals with stated ophtho interest: Amgen (TED), Apellis & Astellas (GA), Bausch+Lomb (dry eye/glaucoma), Tarsus (Demodex); Alcon reopens Fall 2026 for 2027. 2025–26 ophthalmology CME concentrated with Vindico/Healio, Evolve, Medscape, MedEdicus (TED) and Retina Today."
 }
};

const IMMUNO_SUBS=[
 {key:"derm",  icon:"🩹", label:"Dermatology (immuno-derm)", lede:"Immune-mediated skin disease: chronic spontaneous urticaria, hidradenitis suppurativa, bullous pemphigoid, cutaneous lupus, plus psoriasis, atopic dermatitis and vitiligo. All dermatology now lives here — there is no separate dermatology space."},
 {key:"rheum", icon:"🦴", label:"Rheumatology", lede:"SLE, rheumatoid and psoriatic arthritis, Sjögren's, myositis, vasculitis, IgG4-related disease, myasthenia gravis. The largest immunology sub-field and the one with the most crowded mechanism landscape — FcRn, BTK, TYK2, type-I interferon and autoimmune CAR-T all compete here."},
 {key:"gastro",icon:"◆", label:"Gastroenterology", lede:"IBD (ulcerative colitis, Crohn's) and eosinophilic esophagitis. Oral small molecules (S1P, TYK2) and anti-TL1A are reshaping sequencing after biologics."},
 {key:"pulm",  icon:"🫁", label:"Pulmonology", lede:"Severe asthma, COPD and bronchiectasis. Type-2 biologics plus the newer alarmin/TSLP and ultra-long-acting IL-5 mechanisms — dosing-interval and phenotype education are the live needs."},
 {key:"allergy",icon:"🌾",label:"Allergy", lede:"Food allergy and anaphylaxis, allergic rhinitis, CRSwNP, oral and sublingual immunotherapy. Needle-free epinephrine and allergen-specific antibodies are genuinely new modalities with no prescriber frame of reference."}
];

const IMMUNO_SUB_LABEL={derm:"Dermatology (immuno-derm)",rheum:"Rheumatology",gastro:"Gastroenterology",pulm:"Pulmonology",allergy:"Allergy"};

/* ---------- SUPPORTER FILTER ---------- */

const SUP_ALIASES={
  "j and j":"Johnson & Johnson","jnj":"Johnson & Johnson","johnson and johnson":"Johnson & Johnson","janssen":"Johnson & Johnson",
  "bms":"Bristol Myers Squibb","bristol myers squibb":"Bristol Myers Squibb","bristol myers":"Bristol Myers Squibb",
  "astrazeneca":"AstraZeneca","astrazeneca alexion":"AstraZeneca","alexion astrazeneca":"AstraZeneca","alexion":"AstraZeneca","astrazeneca rare":"AstraZeneca",
  "roche genentech":"Roche / Genentech","roche":"Roche / Genentech","genentech":"Roche / Genentech",
  "eli lilly":"Eli Lilly","lilly":"Eli Lilly",
  "novartis anthos":"Novartis","anthos":"Novartis","novartis":"Novartis","chinook novartis":"Novartis",
  "vertex alpine":"Vertex","vertex":"Vertex","vertex crispr tx":"Vertex",
  "amgen horizon":"Amgen","amgen":"Amgen","amgen ultra rare horizon":"Amgen",
  "sanofi regeneron":"Sanofi","sanofi":"Sanofi","sanofi genzyme rare":"Sanofi",
  "regeneron bayer":"Regeneron","regeneron":"Regeneron",
  "bms j and j":"Bristol Myers Squibb",
  "astellas iveric":"Astellas","astellas":"Astellas","astellas iveric bio":"Astellas",
  "ionis astrazeneca":"Ionis","ionis":"Ionis",
  "abbvie regenxbio":"AbbVie","abbvie":"AbbVie","abbvie allergan eye care":"AbbVie",
  "boehringer ingelheim":"Boehringer Ingelheim",
  "novo nordisk":"Novo Nordisk","takeda":"Takeda","pfizer":"Pfizer","merck":"Merck","bayer":"Bayer","gsk":"GSK","ucb":"UCB",
  "otsuka":"Otsuka","argenx":"argenx","travere":"Travere","aurinia":"Aurinia","apellis":"Apellis","biogen":"Biogen",
  "alnylam":"Alnylam","bridgebio":"BridgeBio","sarepta":"Sarepta","biomarin":"BioMarin","ultragenyx":"Ultragenyx",
  "vera therapeutics":"Vera Therapeutics","immunovant":"Immunovant","abivax":"Abivax","incyte":"Incyte",
  "daiichi sankyo":"Daiichi Sankyo","csl behring":"CSL Behring","idorsia":"Idorsia","sobi":"Sobi","kalvista":"KalVista",
  "tarsus":"Tarsus","bausch lomb":"Bausch + Lomb","alcon":"Alcon","viridian":"Viridian","eyepoint":"EyePoint",
  "ocular therapeutix":"Ocular Therapeutix","kodiak":"Kodiak","sun pharma":"Sun Pharma","galderma":"Galderma",
  "inventiva":"Inventiva","madrigal":"Madrigal","akero":"Akero","viking therapeutics":"Viking Therapeutics",
  "zealand pharma":"Zealand Pharma","cabaletta kyverna":"Cabaletta / Kyverna","calliditas viatris":"Calliditas",
  "verona pharma merck":"Verona Pharma","ars pharmaceuticals":"ARS Pharmaceuticals","alk abello":"ALK-Abelló",
  "aimmune nestle":"Aimmune","chiesi global rare diseases":"Chiesi","chiesi":"Chiesi"
};

const ALL_PHARMA_BIOTECH = [
  "4D Molecular","AB Science","AbbVie","Abeona","Absci","Acadia","Acceleron","Achaogen","Achilles","Aclaris","Acorda","Adagene","Adaptimmune","Adcentrx","Adicet","Adverum","Aerpio","Agenus","Agilent","Agile","Agios","Aimmune","Akebia","Akero","Akeso","Akros","Alcon","Aldeyra","Alentis","Alexion","Alkermes","Allakos","Allergan","Alligator","Allogene","Allos","Almirall","Alnylam","Alpine Immune","Altimmune","AltruBio","Alvotech","Alynylam","Amag","Amarin","Amgen","Amphista","Amryt","Amylyx","Anaptysbio","Anavex","Anteris","Aptinyx","Aquestive","Arca","Arcellx","Arcturus","Arcus","Arcutis","Arena","argenx","Ariceum","Arrowhead","Artelo","Arvinas","Ascendis","Ascentage","Ascentis","Aslan","Assembly","Astellas","AstraZeneca","Atara","Aterian","Athenex","Atossa","Aurinia","Autolus","Avadel","Avalo","Aveo","Avidity","Avrobio","Axsome","Ayala","Azafaros","BMS (Bristol Myers Squibb)","Bausch + Lomb","Bausch Health","Bayer","BeiGene","BellRing","Bellus","Berkeley Lights","BeyondSpring","Bicycle","Bioatla","Biocryst","Biodesix","Biogen","BioMarin","Biomea","BioNTech","BioXcel","Biohaven","Bioxcel","Bluebird","Bluejay","Blueprint Medicines","Boehringer Ingelheim","Bolt","Boston Scientific","Braeburn","Bridge Medicines","Bristol Myers Squibb","C4 Therapeutics","CDR-Life","CGON Therapeutics","CG Oncology","CSL Behring","CSL Vifor","Cabaletta","Caladrius","Calico","Calliditas","Cara","Cardio Diagnostics","Cargo Therapeutics","Cassava","Castle","Catalyst","Celgene","Celldex","Celltrion","Cellectis","Century","Cerecor","Cerevel","Chiesi","Chinook","Chugai","Cidara","Cizzle","ClearPoint","Clovis","Codexis","Cogent","Coherus","Compugen","Compass","Concert","Coronado","Corcept","Cormedix","Cortexyme","Corvus","Coya","Cristal","Crinetics","Cullinan","CureVac","Cyclerion","Cyclica","CytoDyn","Cytokinetics","DaVita","Daiichi Sankyo","Deciphera","Denali","Design","Dianthus","Diffusion","Disc Medicine","Dizal","Doma","Draper","Duke Street","DYNE","Dynavax","Editas","Ekso","Elanco","Elevation","Eli Lilly","Elicio","Ellipses","EMD Serono","Endo","Enliven","Ensysce","Enterome","Entera","Epigen","Epizyme","Erasca","Esperion","Estée","Evgen","Evotec","Exelixis","Exscientia","Fabric Genomics","Fate","Fennec","Ferring","Fibrogen","First Wave","Flagship","Foghorn","Forma","Fortress","Forty Seven","Foundation Medicine","Freenome","Freeline","G1 Therapeutics","GRAIL","Galapagos","Galderma","GC Biopharma","Gene Therapy Ophthalmics","Genentech","Genmab","Genocea","Geron","Gilead","GlaxoSmithKline","Global Blood","Grifols","GT Biopharma","H. Lundbeck","Halozyme","Harpoon","HCW Biologics","HemoShear","Heron","HilleVax","Homology","Horizon","Humacyte","Huya","IMV","IO Biotech","IN8bio","Iaso","Idorsia","IGM","Ikena","Immix","Immatics","Immunic","Immunocore","ImmunoGen","Immunome","Immunovant","Impel","Imunon","Incyte","Inovio","Insmed","Intellia","Intercept","Ionis","Iovance","Ipsen","Iterion","Ironwood","J&J (Janssen)","Janssen","Janux","Jazz","Jounce","Jubilant","Junshi","Kadmon","Kala","KalVista","Karuna","Kartos","Karyopharm","Kaneka","Kazia","Kelun","Keros","Kezar","Kiadis","Kiromic","Kite","Klarity","Kodiak","Kronos","Krystal","Kymera","Kyowa Kirin","Kyverna","LEO Pharma","Landos","Larimar","LaVant","Legend Biotech","Leo Pharma","Lexeo","Lexicon","Lilly (Eli Lilly)","Lipocine","Longeveron","Loxo","Ludwig","Lupin","Lyell","Lyra","MEI Pharma","MacroGenics","Madrigal","MannKind","Mallinckrodt","Marker","Marinus","Matinas","MediWound","MEIRxRs","Menarini","Merck","Merck KGaA","Merida","Merus","MetaCrine","Milestone","MiMedia","MiMedx","MimGene","Mineralys","Minerva","Mirati","Mirum","Moderna","Molecular Templates","Momenta","Monopar","Monte Rosa","MorphoSys","Morphic","Myovant","Mylan","N-Power","NGM Bio","Nanox","Nascent","Natera","NeoGenomics","NeoImmune","Nektar","Neogene","Neos","NervGen","NEUROlmmune","Neurocrine","Neuropace","Neurosense","Neurotech","NewLink","NextGen","Nextcure","Nkarta","Novartis","Novavax","Novo Nordisk","Nurix","Nuvation","Nuvectis","Nuvation Bio","OSE Immuno","Ocular Therapeutix","Ocugen","Olema","OliX","Olpasiran","Omeros","Ondine","Onconova","Oncorus","Oncternal","Opthea","Oragenics","Oric","OrganDx","Organon","Ori Biotech","Orion","Ortho","Otonomy","Otsuka","Ovid","Outlook Therapeutics","PBI Gordon","PMV Pharma","POINT","PTC","Palatin","Paratek","Passage Bio","Perceptive","Perella Weinberg","Personalis","Pharmacosmos","Pharvaris","Pfizer","Phathom","Phio","Pieris","Pierre Fabre","Pliant","Plus Therapeutics","Polarean","Polymedix","Poseida","Praxis","Precigen","Precision Bio","Prevail","Primo","Prometheus","Protagonist","Protalix","Prothena","Provention","Pulmatrix","Puma","Purple","Purple Innovation","Pyxis","Quest","Q32","RA Capital","REGENXBIO","Rain","Rakuten Medical","Rapt","Rayaldee","Reata","Recursion","Regen","Regeneron","Regulus","Relay","Relmada","Rexahn","Repare","Replimune","Recludix","Repligen","Repare Therapeutics","Reneo","Revance","Revolution Medicines","Rhythm","Rigel","Riparian","Rocket","Roche","Roivant","Rovio","Rubius","Ryvu","SAB Biotherapeutics","SIGA","SK Bioscience","Sabre","Sana","Sagimet","Sail","Sanaria","Sandoz","Sanofi","Sarepta","Savara","Scholar Rock","Sensei","Sensyne","Seres","Servier","ShouTi","SIGA","Silverback","Sio Gene","Sirnaomics","Sitryx","Skyhawk","Skyward","Sobi","Soligenix","Sonesta","Sonnet","SOPHiA","Sotera","SpringWorks","Spruce","Standard","Stealth","Stemline","Stoke","Structure","Suna","Sundry","Sun Pharma","Sunesis","Sunlight","Sutro","Syndax","Syndeka","Synlogic","Sysmex","T2 Biosystems","T-Rx","Takeda","Tarsus","Taro","Teligent","Telix","Tempest","Tempus","Tempur","Tenax","Terran","Teva","Theravance","Third Harmonic","Thoughtworks","Timberline","Tosoh","Tourmaline","TransCode","Travere","Traws","TScan","Turning Point","Tyra","UCB","Ultragenyx","Umoja","Unicycive","United Therapeutics","Upstart","Vaccibody","Vanda","Vantage","Vaxart","Veeva","Vera Therapeutics","Verastem","Veradermics","Vericel","Verona","Vertex","Vicore","Viking","Viridian","VirnetX","Vividion","Voyager","Vyera","Watson","Wave Life Sciences","Werewolf","Wyeth","Xeris","Xencor","Xenetic","Xenon","Xilio","Y-mAbs","Ypsomed","Zai Lab","Zealand","Zetagen","ZimVie","Ziopharm","Zoetis","Zogenix","Zumbro","Zymeworks","argenx","atai","bluebird bio","cKine","enGene","invivyd","iTeos","kaléo","reMYND","uniQure"
];

const _NON_PHARMA = /^(AASLD|American |ASN|ASCO|ASH|ASRS|AAO|AAD|ACR|ACC|AHA|ADA|ATS|Society of|Harvard|Stanford|Cleveland Clinic|Mayo|Johns Hopkins|Duke|UCSF|UCLA|Yale|Northwestern|Vanderbilt|Emory|University |Icahn|Mount Sinai|Beth Israel|Massachusetts General|Brigham|Weill Cornell|Wills Eye|Trinity|Charité|Hannover|Karolinska|Medscape|PeerView|ACHL|PRIME|MedEdicus|Vindico|Rockpointe|CME |i3 Health|Med Learning)/i;

window.KOL_DATA = [
  {name:"Richard Lafayette, MD, FACP", institution:"Stanford University Medical Center", specialty:"Nephrology (Glomerular Disease Center)", role:"Trial investigator", supporter:"Vera Therapeutics", area:"nephrology", indication:"IgA nephropathy", srcUrl:"https://ir.veratx.com/news-releases/news-release-details/vera-therapeutics-announces-positive-origin-phase-3-data/", srcTitle:"Vera IR — ORIGIN Ph3 (Lafayette named PI)"},
  {name:"Dana Rizk, MD", institution:"University of Alabama at Birmingham", specialty:"Nephrology", role:"Trial investigator", supporter:"Otsuka", area:"nephrology", indication:"IgA nephropathy", srcUrl:"https://www.appliedclinicaltrialsonline.com/view/otsuka-sibeprenlimab-demonstrates-meaningful-outcomes-study-immunoglobulin-nephropathy", srcTitle:"Applied Clinical Trials — VISIONARY sibeprenlimab (Rizk quoted)"},
  {name:"Brad Rovin, MD", institution:"Ohio State University", specialty:"Nephrology", role:"Trial investigator", supporter:"Travere", area:"nephrology", indication:"IgA nephropathy", srcUrl:"https://www.hcplive.com/view/protect-sparsentan-outperforms-irbesartan-in-iga-nephropathy", srcTitle:"HCPLive — PROTECT sparsentan (Rovin steering committee)"},
  {name:"Carla Nester, MD", institution:"University of Iowa (Jean E. Robillard Chair in Pediatric Nephrology)", specialty:"Nephrology (glomerular disease)", role:"Trial investigator", supporter:"Apellis", area:"nephrology", indication:"C3G / primary IC-MPGN", srcUrl:"https://www.hcplive.com/view/valiant-pegcetacoplan-offers-benefit-for-upcr-egfr-c3-staining-in-c3g-ic-mpgn", srcTitle:"HCPLive — VALIANT pegcetacoplan (Nester corresponding author)"},
  {name:"Deepak L. Bhatt, MD", institution:"Brigham and Women's Hospital / Harvard Medical School", specialty:"Interventional Cardiology", role:"Trial investigator", supporter:"Idorsia", area:"cardiovascular", indication:"Acute myocardial infarction", srcUrl:"https://www.biospace.com/idorsia-initiates-the-phase-3-registration-study-with-selatogrel-for-the-treatment-of-acute-myocardial-infarction", srcTitle:"BioSpace — SOS-AMI Ph3 (Bhatt Steering Committee Chair)"},
  {name:"Mary Mooney", institution:"Trinity College Dublin, School of Nursing and Midwifery", specialty:"Cardiovascular Nursing", role:"Trial investigator", supporter:"Idorsia", area:"cardiovascular", indication:"Acute myocardial infarction", srcUrl:"https://www.biospace.com/idorsia-initiates-the-phase-3-registration-study-with-selatogrel-for-the-treatment-of-acute-myocardial-infarction", srcTitle:"BioSpace — SOS-AMI Ph3 (Mooney Steering Committee)"},
  {name:"Stephen Harrison, MD", institution:"Pinnacle Clinical Research (San Antonio)", specialty:"Hepatology", role:"Trial investigator", supporter:"Akero Therapeutics", area:"endocrinology", indication:"MASH / MASH cirrhosis", srcUrl:"https://www.pharmacytimes.com/view/efruxifermin-demonstrates-potential-in-treating-patients-with-mash-related-scarring-or-cirrhosis", srcTitle:"Pharmacy Times — HARMONY EFX Ph2b (Harrison lead investigator)"},
  {name:"David Rubin, MD", institution:"University of Chicago Medicine (IBD Center)", specialty:"Gastroenterology (IBD)", role:"Trial investigator", supporter:"Abivax", area:"gastroenterology", indication:"Ulcerative colitis", srcUrl:"https://ir.abivax.com/news-releases/news-release-details/abivax-announces-positive-phase-3-results-both-abtect-8-week/", srcTitle:"Abivax IR — Positive Ph3 ABTECT (Rubin quoted)"},
  {name:"Silvio Danese, MD", institution:"San Raffaele / Vita-Salute San Raffaele University, Milan", specialty:"Gastroenterology / Endoscopy", role:"Trial investigator", supporter:"Abivax", area:"gastroenterology", indication:"Ulcerative colitis", srcUrl:"https://academic.oup.com/ecco-jcc/article/20/Supplement_1/jjaf231.893/8433392", srcTitle:"J Crohn's Colitis — ABTECT Ph3 safety pooled (Danese co-author)"},
  {name:"Laurent Peyrin-Biroulet, MD", institution:"INFINY Institute — INSERM NGERE, Vandoeuvre-lès-Nancy", specialty:"Gastroenterology (IBD)", role:"Trial investigator", supporter:"Abivax", area:"gastroenterology", indication:"Ulcerative colitis", srcUrl:"https://academic.oup.com/ecco-jcc/article/20/Supplement_1/jjaf231.893/8433392", srcTitle:"J Crohn's Colitis — ABTECT Ph3 safety pooled (Peyrin-Biroulet co-author)"},
  {name:"Ursula Seidler, MD", institution:"Hannover Medical School — Dept of Gastroenterology, Hepatology, Endocrinology", specialty:"Gastroenterology", role:"Trial investigator", supporter:"Abivax", area:"gastroenterology", indication:"Ulcerative colitis", srcUrl:"https://academic.oup.com/ecco-jcc/article/20/Supplement_1/jjaf231.893/8433392", srcTitle:"J Crohn's Colitis — ABTECT Ph3 safety pooled (Seidler first author)"},
  {name:"Marcus Maurer, MD", institution:"Charité — Universitätsmedizin Berlin (Dermatology & Allergy)", specialty:"Dermatology / Allergy", role:"Trial investigator", supporter:"Celldex Therapeutics", area:"immunology", indication:"Chronic spontaneous urticaria", srcUrl:"https://www.medthority.com/news/2024/7/initiation-of-phase-iii-program-for-barzolvolimab-in-patients-with-chronic-spontaneous-urticaria.--celldex-therapeutics", srcTitle:"Medthority — Barzolvolimab Ph3 (Maurer PI, Charité)"},
  {name:"Michael T. Yen, MD", institution:"Baylor College of Medicine (Oculoplastic Surgery & Ophthalmology)", specialty:"Ophthalmology / Oculoplastic", role:"Trial investigator", supporter:"Viridian Therapeutics", area:"ophthalmology", indication:"Thyroid eye disease", srcUrl:"https://www.ophthalmologytimes.com/view/viridian-announces-positive-topline-data-from-phase-3-thrive-trial-evaluating-veligrotug-in-patients-with-active-ted", srcTitle:"Ophthalmology Times — THRIVE veligrotug (Yen investigator)"},
  {name:"Arshad M. Khanani, MD, MA, FASRS", institution:"Sierra Eye Associates; University of Nevada, Reno School of Medicine", specialty:"Vitreoretinal", role:"Trial investigator", supporter:"Ocular Therapeutix", area:"ophthalmology", indication:"Wet age-related macular degeneration", srcUrl:"https://retinalphysician.com/issues/2026/january/axpaxli-superior-to-aflibercept-in-wet-amd-trial/", srcTitle:"Retinal Physician — SOL-1 axpaxli (Khanani Steering Committee Chair)"},
  {name:"Darius M. Moshfeghi, MD", institution:"Stanford University Byers Eye Institute (Retina Division)", specialty:"Vitreoretinal", role:"Trial investigator", supporter:"Ocular Therapeutix", area:"ophthalmology", indication:"Wet age-related macular degeneration", srcUrl:"https://retinalphysician.com/issues/2026/january/axpaxli-superior-to-aflibercept-in-wet-amd-trial/", srcTitle:"Retinal Physician — SOL-1 axpaxli (Moshfeghi investigator)"},

  /* --- Advisory board (disclosed) --- */
  {name:"Bruce E. Sands, MD", institution:"Icahn School of Medicine at Mount Sinai (Dr. Burrill B. Crohn Professor of Medicine)", specialty:"Gastroenterology (IBD)", role:"Advisory board (disclosed)", supporter:"AltruBio", area:"gastroenterology", indication:"Ulcerative colitis / IBD", srcUrl:"https://www.biospace.com/press-releases/altrubio-announces-formation-of-inflammatory-bowel-disease-clinical-advisory-board", srcTitle:"BioSpace — AltruBio IBD Clinical Advisory Board (Sands named member)"},
  {name:"Walter Reinisch, MD, PhD", institution:"Medical University of Vienna (IBD Study Group)", specialty:"Gastroenterology (IBD)", role:"Advisory board (disclosed)", supporter:"AltruBio", area:"gastroenterology", indication:"Ulcerative colitis / IBD", srcUrl:"https://www.biospace.com/press-releases/altrubio-announces-formation-of-inflammatory-bowel-disease-clinical-advisory-board", srcTitle:"BioSpace — AltruBio IBD Clinical Advisory Board (Reinisch named member)"},
  {name:"Britta Siegmund, MD, PhD", institution:"Charité — Universitätsmedizin Berlin (Gastroenterology, Infectious Disease & Rheumatology)", specialty:"Gastroenterology (IBD)", role:"Advisory board (disclosed)", supporter:"AltruBio", area:"gastroenterology", indication:"Ulcerative colitis / IBD", srcUrl:"https://www.biospace.com/press-releases/altrubio-announces-formation-of-inflammatory-bowel-disease-clinical-advisory-board", srcTitle:"BioSpace — AltruBio IBD Clinical Advisory Board (Siegmund named member)"},
  {name:"Glenn M. Chertow, MD, MPH", institution:"Stanford University School of Medicine", specialty:"Nephrology", role:"Advisory board (disclosed)", supporter:"R1 Therapeutics", area:"nephrology", indication:"Chronic kidney disease", srcUrl:"https://www.globenewswire.com/news-release/2026/06/30/3319525/0/en/r1-therapeutics-establishes-world-class-scientific-advisory-board-to-support-advancement-of-ap306-in-chronic-kidney-disease.html", srcTitle:"R1 Therapeutics IR — SAB formation (Chertow Chair)"},
  {name:"Sharon M. Moe, MD", institution:"Indiana University School of Medicine", specialty:"Nephrology", role:"Advisory board (disclosed)", supporter:"R1 Therapeutics", area:"nephrology", indication:"Chronic kidney disease", srcUrl:"https://www.globenewswire.com/news-release/2026/06/30/3319525/0/en/r1-therapeutics-establishes-world-class-scientific-advisory-board-to-support-advancement-of-ap306-in-chronic-kidney-disease.html", srcTitle:"R1 Therapeutics IR — SAB formation (Moe member)"},
  {name:"Markus Ketteler, MD, FERA", institution:"Robert-Bosch-Hospital, Stuttgart", specialty:"Nephrology", role:"Advisory board (disclosed)", supporter:"R1 Therapeutics", area:"nephrology", indication:"Chronic kidney disease", srcUrl:"https://www.globenewswire.com/news-release/2026/06/30/3319525/0/en/r1-therapeutics-establishes-world-class-scientific-advisory-board-to-support-advancement-of-ap306-in-chronic-kidney-disease.html", srcTitle:"R1 Therapeutics IR — SAB formation (Ketteler member)"},
  {name:"Geoffrey A. Block, MD, FASN", institution:"U.S. Renal Care", specialty:"Nephrology", role:"Advisory board (disclosed)", supporter:"R1 Therapeutics", area:"nephrology", indication:"Chronic kidney disease", srcUrl:"https://www.globenewswire.com/news-release/2026/06/30/3319525/0/en/r1-therapeutics-establishes-world-class-scientific-advisory-board-to-support-advancement-of-ap306-in-chronic-kidney-disease.html", srcTitle:"R1 Therapeutics IR — SAB formation (Block member)"},

  /* --- CME faculty --- */
  {name:"Marwa Sabe, MD, MPH, FACC", institution:"Beth Israel Deaconess Medical Center (Advanced Heart Failure)", specialty:"Advanced Heart Failure / Transplant", role:"CME faculty", supporter:"Harvard Medical School CME", area:"cardiovascular", indication:"Heart failure", srcUrl:"https://learn.hms.harvard.edu/programs/heart-failure-summit", srcTitle:"Harvard HMS — Heart Failure Summit (Sabe Course Director)"},
  {name:"David Venesy, MD", institution:"Lahey Hospital & Medical Center (Advanced Heart Failure)", specialty:"Advanced Heart Failure / Cardiomyopathy", role:"CME faculty", supporter:"Harvard Medical School CME", area:"cardiovascular", indication:"Heart failure", srcUrl:"https://learn.hms.harvard.edu/programs/heart-failure-summit", srcTitle:"Harvard HMS — Heart Failure Summit (Venesy Course Director)"},
  {name:"Lisa Fleming, MD, MPH", institution:"Atrius Health", specialty:"Advanced Heart Failure / Transplant", role:"CME faculty", supporter:"Harvard Medical School CME", area:"cardiovascular", indication:"Heart failure", srcUrl:"https://learn.hms.harvard.edu/programs/heart-failure-summit", srcTitle:"Harvard HMS — Heart Failure Summit (Fleming Course Director)"},
  {name:"James C. Fang, MD", institution:"University of Utah School of Medicine", specialty:"Advanced Heart Failure", role:"CME faculty", supporter:"Harvard Medical School CME", area:"cardiovascular", indication:"Heart failure", srcUrl:"https://learn.hms.harvard.edu/programs/heart-failure-summit", srcTitle:"Harvard HMS — Heart Failure Summit (Fang faculty)"},
  {name:"A. Reshad Garan, MD, MS, FACC", institution:"Beth Israel Deaconess Medical Center", specialty:"Advanced Heart Failure / MCS", role:"CME faculty", supporter:"Harvard Medical School CME", area:"cardiovascular", indication:"Heart failure", srcUrl:"https://learn.hms.harvard.edu/programs/heart-failure-summit", srcTitle:"Harvard HMS — Heart Failure Summit (Garan faculty)"},
  {name:"Amandeep Singh, MD, PhD", institution:"Massachusetts General Hospital (Bariatric Endoscopy)", specialty:"Gastroenterology / Obesity Medicine", role:"CME faculty", supporter:"Harvard Medical School CME", area:"endocrinology", indication:"Obesity", srcUrl:"https://learn.hms.harvard.edu/obesity", srcTitle:"Harvard HMS — Treating Obesity 2026 (Singh Course Director)"},
  {name:"Angela Fitch, MD, FACP, FOMA, DABOM", institution:"knownwell (Chief Medical Officer); Past President, Obesity Medicine Association", specialty:"Obesity Medicine", role:"CME faculty", supporter:"Harvard Medical School CME", area:"endocrinology", indication:"Obesity", srcUrl:"https://learn.hms.harvard.edu/obesity", srcTitle:"Harvard HMS — Treating Obesity 2026 (Fitch Course Director)"},
  {name:"Wesley Dutton, MD, DABOM", institution:"Massachusetts General Hospital (Pediatric Weight Center); Harvard Medical School", specialty:"Pediatric Obesity Medicine", role:"CME faculty", supporter:"Harvard Medical School CME", area:"endocrinology", indication:"Obesity", srcUrl:"https://learn.hms.harvard.edu/obesity", srcTitle:"Harvard HMS — Treating Obesity 2026 (Dutton Course Director)"},
  {name:"Paul Copeland, MD, MPhil", institution:"Massachusetts General Hospital Weight Center; Harvard Medical School", specialty:"Obesity Medicine", role:"CME faculty", supporter:"Harvard Medical School CME", area:"endocrinology", indication:"Obesity", srcUrl:"https://learn.hms.harvard.edu/obesity", srcTitle:"Harvard HMS — Treating Obesity 2026 (Copeland Course Director)"},

  /* --- Society leadership --- */
  {name:"Saul J. Karpen, MD, PhD, FAASLD", institution:"Virginia Commonwealth University", specialty:"Hepatology", role:"Society leadership", supporter:"AASLD", area:"endocrinology", indication:"MASH / liver disease", srcUrl:"https://www.aasld.org/aasld-announces-2026-governing-board-leadership", srcTitle:"AASLD — 2026 Governing Board (Karpen President)"},
  {name:"Michael R. Lucey, MD, FAASLD", institution:"University of Wisconsin School of Medicine and Public Health", specialty:"Hepatology", role:"Society leadership", supporter:"AASLD", area:"endocrinology", indication:"MASH / liver disease", srcUrl:"https://www.aasld.org/aasld-announces-2026-governing-board-leadership", srcTitle:"AASLD — 2026 Governing Board (Lucey President-Elect)"},
  {name:"Nancy Reau, MD", institution:"Rush University Medical Center", specialty:"Hepatology", role:"Society leadership", supporter:"AASLD", area:"endocrinology", indication:"MASH / liver disease", srcUrl:"https://www.aasld.org/aasld-announces-2026-governing-board-leadership", srcTitle:"AASLD — 2026 Governing Board (Reau Councilor)"},
  {name:"Andrew J. Muir, MD, FAASLD", institution:"Duke University School of Medicine", specialty:"Hepatology", role:"Society leadership", supporter:"AASLD", area:"endocrinology", indication:"MASH / liver disease", srcUrl:"https://www.aasld.org/aasld-announces-2026-governing-board-leadership", srcTitle:"AASLD — 2026 Governing Board (Muir Councilor)"},
  {name:"Elizabeth C. Verna, MD, MSc, FAASLD", institution:"Columbia University", specialty:"Hepatology / Transplant", role:"Society leadership", supporter:"AASLD", area:"endocrinology", indication:"MASH / liver disease", srcUrl:"https://www.aasld.org/aasld-announces-2026-governing-board-leadership", srcTitle:"AASLD — 2026 Governing Board (Verna Councilor-at-Large)"},
  {name:"Roxana Mehran, MD, FACC", institution:"Icahn School of Medicine at Mount Sinai", specialty:"Interventional Cardiology", role:"Society leadership", supporter:"American College of Cardiology", area:"cardiovascular", indication:"Interventional cardiology", srcUrl:"https://www.acc.org/about-acc/leadership/officers-and-trustees", srcTitle:"ACC — 2026 Officers & Trustees (Mehran President)"},
  {name:"Hani K. Najm, MD, FACC", institution:"Cleveland Clinic (Chair, Pediatric & Adult Congenital Heart Surgery)", specialty:"Congenital Heart Surgery", role:"Society leadership", supporter:"American College of Cardiology", area:"cardiovascular", indication:"Congenital heart disease", srcUrl:"https://www.acc.org/about-acc/leadership/officers-and-trustees", srcTitle:"ACC — 2026 Officers & Trustees (Najm Vice President)"},
  {name:"Christopher M. Kramer, MD, MACC", institution:"University of Virginia School of Medicine", specialty:"Cardiovascular Imaging", role:"Society leadership", supporter:"American College of Cardiology", area:"cardiovascular", indication:"Cardiovascular imaging", srcUrl:"https://www.acc.org/about-acc/leadership/officers-and-trustees", srcTitle:"ACC — 2026 Officers & Trustees (Kramer Immediate Past President)"},
  {name:"Bonnie Ky, MD, MSCE, FACC", institution:"University of Pennsylvania", specialty:"Cardio-Oncology", role:"Society leadership", supporter:"American College of Cardiology", area:"cardiovascular", indication:"Cardio-oncology", srcUrl:"https://www.acc.org/about-acc/leadership/officers-and-trustees", srcTitle:"ACC — 2026 Officers & Trustees (Ky Trustee)"},
  {name:"Manesh R. Patel, MD, FAHA", institution:"Duke Health (Chief of Cardiology; Duke Clinical Research Institute)", specialty:"Interventional Cardiology", role:"Society leadership", supporter:"American Heart Association", area:"cardiovascular", indication:"Cardiovascular disease", srcUrl:"https://newsroom.heart.org/news/american-heart-association-announces-volunteer-leaders-for-2026-27", srcTitle:"AHA Newsroom — 2026-27 Volunteer Leaders (Patel President)"},
  {name:"Svati H. Shah, MD, MHS, FAHA", institution:"Duke University School of Medicine (Duke Center for Precision Health)", specialty:"Cardiovascular Genetics / Precision Health", role:"Society leadership", supporter:"American Heart Association", area:"cardiovascular", indication:"Cardiovascular disease", srcUrl:"https://newsroom.heart.org/news/american-heart-association-announces-volunteer-leaders-for-2026-27", srcTitle:"AHA Newsroom — 2026-27 Volunteer Leaders (Shah President-Elect)"},
  {name:"William Harvey, MD, MSc", institution:"Tufts Medicine, Boston", specialty:"Rheumatology", role:"Society leadership", supporter:"American College of Rheumatology", area:"immunology", indication:"Rheumatologic disease", srcUrl:"https://rheumatology.org/acr-board-of-directors", srcTitle:"ACR — 2026 Board of Directors (Harvey President)"},
  {name:"Anne R. Bass, MD", institution:"Hospital for Special Surgery, New York", specialty:"Rheumatology", role:"Society leadership", supporter:"American College of Rheumatology", area:"immunology", indication:"Rheumatologic disease", srcUrl:"https://rheumatology.org/acr-board-of-directors", srcTitle:"ACR — 2026 Board of Directors (Bass President-Elect)"},
  {name:"Eric M. Ruderman, MD", institution:"Northwestern University", specialty:"Rheumatology", role:"Society leadership", supporter:"American College of Rheumatology", area:"immunology", indication:"Rheumatologic disease", srcUrl:"https://rheumatology.org/acr-board-of-directors", srcTitle:"ACR — 2026 Board of Directors (Ruderman Treasurer)"},
  {name:"Daniel H. Solomon, MD, MPH", institution:"Brigham and Women's Hospital", specialty:"Rheumatology / Pharmacoepidemiology", role:"Society leadership", supporter:"American College of Rheumatology", area:"immunology", indication:"Rheumatologic disease", srcUrl:"https://rheumatology.org/acr-board-of-directors", srcTitle:"ACR — 2026 Board of Directors (Solomon Member-at-Large)"},
  {name:"Murad Alam, MD, MSCI, MBA, FAAD", institution:"Northwestern University Feinberg School of Medicine (Dermatology)", specialty:"Dermatology / Dermatologic Surgery", role:"Society leadership", supporter:"American Academy of Dermatology", area:"immunology", indication:"Dermatologic disease", srcUrl:"https://www.aad.org/news/murad-alam-assumes-presidency-aad", srcTitle:"AAD — Alam assumes 2026 Presidency"},
  {name:"Christopher J. Rapuano, MD", institution:"Wills Eye Hospital (Chief, Cornea Service); Thomas Jefferson University", specialty:"Cornea / External Disease", role:"Society leadership", supporter:"American Academy of Ophthalmology", area:"ophthalmology", indication:"Cornea / general ophthalmology", srcUrl:"https://www.willseye.org/doctor/christopher-j-rapuano-md/", srcTitle:"Wills Eye — Rapuano Chief of Cornea (AAO 2026 President)"},
  {name:"Enrique Caballero, MD", institution:"Harvard Medical School / Brigham and Women's Hospital", specialty:"Endocrinology / Diabetes", role:"Society leadership", supporter:"American Diabetes Association", area:"endocrinology", indication:"Diabetes", srcUrl:"https://www.prnewswire.com/news-releases/the-american-diabetes-association-welcomes-2026-principal-officers-and-members-to-the-national-board-of-directors-302654281.html", srcTitle:"ADA — 2026 Principal Officers (Caballero President, Medicine & Science)"},
  {name:"Amy Hess-Fischl, MS, RDN, LDN, BC-ADM, CDCES", institution:"University of Chicago", specialty:"Diabetes Care & Education", role:"Society leadership", supporter:"American Diabetes Association", area:"endocrinology", indication:"Diabetes", srcUrl:"https://www.prnewswire.com/news-releases/the-american-diabetes-association-welcomes-2026-principal-officers-and-members-to-the-national-board-of-directors-302654281.html", srcTitle:"ADA — 2026 Principal Officers (Hess-Fischl President, Health Care & Education)"},
  {name:"Samir M. Parikh, MD, FASN", institution:"UT Southwestern Medical Center (Chair, Internal Medicine)", specialty:"Nephrology / Acute Kidney Injury", role:"Society leadership", supporter:"American Society of Nephrology", area:"nephrology", indication:"Kidney disease", srcUrl:"https://profiles.utsouthwestern.edu/profile/202716/samir-m-parikh.html", srcTitle:"UT Southwestern — Samir Parikh faculty profile (ASN 2026 President)"},

  /* --- Rare disease --- */
  {name:"John Vest, MD", institution:"Chief Medical Officer, argenx", specialty:"Neuromuscular / Rare Autoimmune", role:"Trial investigator", supporter:"argenx", area:"raredisease", indication:"Generalized myasthenia gravis / CIDP", srcUrl:"https://www.argenx.com/our-science/leadership", srcTitle:"argenx — leadership page (Vest CMO)"},
  {name:"James F. Howard, Jr., MD", institution:"University of North Carolina at Chapel Hill", specialty:"Neuromuscular Medicine", role:"Trial investigator", supporter:"argenx", area:"raredisease", indication:"Generalized myasthenia gravis", srcUrl:"https://www.uspharmacist.com/article/fda-approves-first-neonatal-fc-receptor-blocker-vyvgart-for-generalized-myasthenia-gravis", srcTitle:"US Pharmacist — Vyvgart approval (Howard PI, ADAPT)"},
  {name:"Marc Turini, MD", institution:"Pharvaris (Chief Medical Officer)", specialty:"Rare autoimmune / HAE", role:"Advisory board (disclosed)", supporter:"Pharvaris", area:"raredisease", indication:"Hereditary angioedema", srcUrl:"https://www.pharvaris.com/leadership/", srcTitle:"Pharvaris — leadership page (Turini CMO)"},
  {name:"Marc Riedl, MD, MS", institution:"UC San Diego (US HAEA Angioedema Center)", specialty:"Allergy / Immunology (HAE)", role:"Trial investigator", supporter:"KalVista", area:"raredisease", indication:"Hereditary angioedema", srcUrl:"https://www.kalvista.com/our-science/publications", srcTitle:"KalVista — sebetralstat publications (Riedl author)"}
];