# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static HTML/CSS/JS personal portfolio site (Ramin Partovi, product designer). No build step, no package manager, no framework — plain files served as-is.

## Running locally

Serve the project root over HTTP so relative asset paths resolve (opening `index.html` directly via `file://` will not load fonts/CSS correctly in all cases):

```bash
python3 .nocache_server.py
```

This starts a `http.server` on port 8791 with caching disabled (`Cache-Control: no-store`), which matters because browsers aggressively cache local static assets during iterative design work. A `.claude/launch.json` config named `portfolio` points at this same script/port for the preview tooling.

There is no lint, test, or build command — verify changes by loading the page in a browser.

## Structure

- `index.html` — the single-page site: hero, `#work` (case study grid), `#resume`, `#contact`. Sections are anchor-linked from the nav (`.nav-links`, `.mobile-nav`) and highlighted via scroll-spy in `js/main.js`.
- `case-studies/*.html` — one standalone HTML page per case study (`vantage-workflow.html`, `pulse.html`, `itracefresh.html`). Each duplicates the same `<header>`/`<footer>` markup as `index.html` and links back with `../index.html#section`. There is no templating — shared markup is copy-pasted across pages, so structural nav/footer changes must be applied to every HTML file by hand.
- `css/styles.css` — global styles for the home page (design tokens in `:root`, hero, work grid, resume, contact, footer) plus the three decorative per-card SVG/CSS animations (`.workflow-diagram`, `.plant-diagram`, `.pulse-bars`).
- `css/case-study.css` — styles specific to the `case-studies/*.html` template (`.cs-*` classes: hero, metrics grid, image captions, footer nav).
- `js/main.js` — all site behavior in one file: mobile nav toggle, scroll-spy for nav highlighting, `IntersectionObserver`-driven "build" animations for the three work-card diagrams (each plays once on scroll into view, replays on card hover), and copy-to-clipboard for the contact email.
- `assets/` — icons (SVG), images, and the downloadable `Resume.pdf`.
- `case-studies/assets/<project>/` — images used by that specific case study page.
- `itracefresh case study/` — legacy source PNGs (old slide-deck-style case study), not referenced by any current HTML/CSS/JS. Not part of the live site.

## Key coupling to know about

Each work-card on `index.html` (`.case-study` inside `.work-grid`) is a hand-written summary — title, accent color, stat callout, decorative diagram — of the corresponding `case-studies/*.html` page. They are **not** generated from the case study content and do not stay in sync automatically; the color used for a case study's label (e.g. `.case-label` inline `style="color:..."` on the home card vs. `.cs-label` in the case study page) and any stats/badges are duplicated by hand in both places.

Per project instruction: only change what is explicitly requested — do not proactively "fix" perceived mismatches between a case-study page and its homepage summary card, or vice versa.
