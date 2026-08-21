#!/usr/bin/env python3
"""
Decera Clinical Hub — build tracker.html from the source kit in src/.

This is the exact assembly documented in the original SOURCE KIT README:
  shell.html placeholders are replaced with the source parts, in order.

Usage:  python3 tools/build.py
Writes: tracker.html (repo root)
"""
import json
import pathlib
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"


def read(name):
    p = SRC / name
    if not p.exists():
        sys.exit(f"BUILD FAILED: missing source part src/{name}")
    return p.read_text(encoding="utf-8")


def main():
    # Language gate first — a build that would publish speculation or puffery
    # should not produce a file at all.
    lint = ROOT / "tools" / "lint_language.py"
    if lint.exists():
        result = subprocess.run([sys.executable, str(lint)])
        if result.returncode != 0:
            sys.exit("BUILD FAILED: language lint did not pass (see findings above)")

    shell = read("shell.html")

    css = read("style.css")
    data = "\n\n".join([read("data.js"), read("conf_extra.js"), read("neuro_snap.js")])
    coif = "var COIF_MULTI_HTML = " + json.dumps(read("coif_multi.html")) + ";"
    app = read("app.js")

    for placeholder in ("/*__CSS__*/", "/*__DATA__*/", "/*__COIF_MULTI__*/", "/*__APP__*/"):
        if placeholder not in shell:
            sys.exit(f"BUILD FAILED: placeholder {placeholder} not found in src/shell.html")

    out = shell
    out = out.replace("/*__CSS__*/", css)
    out = out.replace("/*__DATA__*/", data)
    out = out.replace("/*__COIF_MULTI__*/", coif)
    out = out.replace("/*__APP__*/", app)

    # Sanity checks — cheap guards against shipping a broken dashboard.
    checks = [
        ("password gate", 'TARGET="axlqyp-x31avj"'),
        ("section registry", "const SECTIONS = ["),
        ("MULTI COIF cards", "COIF_MULTI_HTML"),
        ("product references", "Decera product references"),
        ("neuro snapshot", "TRIALSNAP_NEURO"),
        ("grant section renamed", "Grant opportunities"),
    ]
    for label, needle in checks:
        if needle not in out:
            sys.exit(f"BUILD FAILED: sanity check '{label}' missing from output")
    if "calendar — RFP" in out:
        sys.exit("BUILD FAILED: old 'calendar' grant heading is back in the output")

    dest = ROOT / "tracker.html"
    dest.write_text(out, encoding="utf-8")
    print(f"built {dest}  ({len(out):,} chars, {len(out)/1024:.0f} KB)")


if __name__ == "__main__":
    main()
