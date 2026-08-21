#!/usr/bin/env python3
"""
Decera Clinical Hub — language lint.

Fails the build when speculation, overstatement, consulting filler or vague
placeholder language appears in curated data or UI copy. Run automatically by
tools/build.py, so the Monday refresh cannot publish it either.

WHAT THIS DOES NOT DO — deliberately. It does not flag substantive absolute
claims ("the only severe-asthma biologic without a phenotype restriction",
"every existing HS activity is anchored on adalimumab"). Those are the
differentiation arguments the dashboard exists to make. The honest remedy for
them is a source link, not a softer adjective. Stripping them would remove the
content a Medical Affairs Director actually reads.

Usage:  python3 tools/lint_language.py [--report]
        --report  list findings without failing
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
TARGETS = ["src/data.js", "src/app.js", "src/shell.html", "src/coif_multi.html"]

BANNED = {
    "speculation": r"\b(could potentially|may possibly|might eventually|is likely to become|"
                   r"expected to transform|poised to|set to revolutioni[sz]e|we believe|"
                   r"it is anticipated|presumably|potential paradigm)\b",
    "overstatement": r"\b(revolutionar\w*|game[- ]chang\w*|paradigm shift|unprecedented|"
                     r"transformative|cutting[- ]edge|world[- ]class|massive|"
                     r"explosive growth)\b",
    "consulting filler": r"\b(leverage synerg\w*|holistic approach|value[- ]add|deep dive|"
                         r"low[- ]hanging fruit|circle back|best practices|robust framework)\b",
    "vague / generic": r"\b(important opportunity|valuable insight|dynamic landscape|"
                       r"innovative approach|significant potential|various stakeholders|"
                       r"numerous opportunities|evolving landscape|rapidly changing)\b",
}

# Third-party URLs and article slugs are quoted material, not our prose.
URL = re.compile(r"https?://\S+")

# The prompts themselves name the phrases they forbid ("Avoid generic phrases like
# 'important opportunity'"). Naming a banned phrase in order to ban it is not using
# it, so a match preceded by a prohibition cue is skipped.
PROHIBITION = re.compile(
    r"(avoid|do not|don't|never|no |not |delete|banned|forbid|filler|"
    r"phrases like|rather than|instead of)[^.]{0,160}$", re.I
)


def scan():
    findings = []
    for rel in TARGETS:
        path = ROOT / rel
        if not path.exists():
            continue
        for lineno, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            clean = URL.sub("", line)
            for label, pattern in BANNED.items():
                for m in re.finditer(pattern, clean, re.I):
                    if PROHIBITION.search(clean[:m.start()]):
                        continue
                    findings.append((rel, lineno, label, m.group(0), clean.strip()[:110]))
    return findings


def main():
    report_only = "--report" in sys.argv
    findings = scan()
    if not findings:
        print(f"language lint: clean across {len(TARGETS)} source files")
        return 0
    print(f"language lint: {len(findings)} finding(s)\n")
    for rel, lineno, label, hit, context in findings:
        print(f"  {rel}:{lineno}  [{label}]  \"{hit}\"")
        print(f"    {context}")
    if report_only:
        return 0
    print("\nBUILD FAILED: rewrite the phrases above, or run with --report to list only.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
