# Repository Guidelines

## Project Structure & Module Organization

This repository is a static product-design portfolio with no framework or build step.

- `index.html` contains the home page and work, resume, and contact sections.
- `case-studies/*.html` contains standalone project pages. Shared header and footer markup is duplicated, so update each affected page explicitly.
- `css/styles.css` defines global tokens and home-page styles; `css/case-study.css` contains the shared case-study system.
- `js/main.js` owns navigation, scroll behavior, galleries, lightboxes, and page animations.
- `assets/` stores global icons, images, and the resume. Project-specific media belongs in `case-studies/assets/<project>/`.
- `Vantage Case Study/` and `itracefresh case study/` contain source research and legacy assets; do not treat them as live site code.

## Build, Test, and Development Commands

Run the site from the repository root:

```bash
python3 .nocache_server.py
```

Open `http://localhost:8791`. The server disables caching so visual changes appear immediately. There is no install, build, lint, or automated test command. Do not open pages with `file://`, because asset and font behavior can differ.

## Coding Style & Naming Conventions

Use semantic HTML, two-space indentation, and accessible labels and alt text. Keep CSS organized by component, reuse variables from `:root`, and follow the existing BEM-like classes (`.cs-hero`, `.cs-meta-item--accent`). Write plain JavaScript with `const`/`let`, early guards, and descriptive camelCase names. Use lowercase kebab-case for new files, such as `workflow-template-preview.jpg`. Avoid inline styles unless the existing component uses them for project-specific accents.

## Testing Guidelines

Verify every change manually in a browser. Check the home page and each edited case study at desktop and mobile widths. Test navigation, keyboard focus, accordions, carousels, lightboxes, links, and image loading; also confirm the console has no errors. For visual changes, compare nearby sections for spacing and typography consistency.

## Commit & Pull Request Guidelines

Recent commits use short, imperative summaries such as `Refine Vantage case study presentation`. Keep each commit focused and avoid mixing content, styling, and unrelated asset cleanup. Pull requests should explain the user-visible change, list affected pages, include before/after screenshots for visual work, and summarize manual browser checks. Link an issue when one exists.

## Agent-Specific Instructions

Read `CLAUDE.md` before editing. Preserve unrelated working-tree changes. Homepage cards and case-study content do not synchronize automatically; update both only when the task explicitly requires it. Never invent research findings, metrics, dates, implementation status, or business outcomes.
