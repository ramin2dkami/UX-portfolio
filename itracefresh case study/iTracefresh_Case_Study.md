# iTracefresh — Redesigning Label Creation for Farm-to-Fork Traceability

**A fragmented, dated labeling experience was costing growers time and giving the business no real edge over cheaper, less capable competitors. Here's how a full UX overhaul turned it into a reason to stay.**

`[HERO PLACEHOLDER: Full-width screenshot of the redesigned "Create PTI Label" step flow — ideally an annotated before/after showing the old wizard next to the new one]`

---

## Project Overview

**Context:** iTracefresh (by iTradeNetwork) helps growers and packers print PTI-compliant labels and trace produce from field to retail shelf. Labeling is the feature users touch every single day — and it was the one most responsible for churn.

**My Role:** Lead Designer, owning the redesign end-to-end — research, IA, wireframes, usability testing, and final UI/design system — working alongside a PM, engineering, and an in-house subject-matter expert (SME).

**Timeline:** A multi-sprint redesign cycle, from discovery through validated final designs.

**TL;DR:** Growers were leaving iTracefresh for cheaper, worse competitors — not because of price, but because the product felt like a patchwork of disconnected tools instead of one platform. I led a redesign that unified the fragmented traceability experience under a single, simplified label-creation flow, rebuilding the information architecture and design system underneath it. The goal wasn't just a facelift — it was giving the business a defensible reason to charge more.

`[PLACEHOLDER: Small persona callout image — Jimmy Sanchez, Production Operations Manager — to ground the "who" behind the redesign]`

---

## The Challenge & Goals

### The Problem

iTracefresh was losing deals for reasons that had nothing to do with what the product could actually do:

- **No single home for traceability.** There was no all-in-one solution — the apps growers needed were disjointed and disconnected from each other, forcing users to jump between separate tools just to manage one workflow.
- **Losing customers on cost alone.** Buyers were comparing iTracefresh to cheaper alternatives and finding no reason to pay more.
- **Poor UI/UX for new users.** The labeling flow wasn't intuitive, which slowed onboarding and created friction from day one.
- **An outdated interface undercut the pricing story.** It's hard to justify a premium price when the product looks and feels behind the market — and feels like a patchwork instead of a platform.

### Constraints

- **Limited access to domain experts.** SME time was scarce, so research had to be efficient and every session had to count.
- **Zero tolerance for workflow disruption.** Growers and packing crews already had muscle memory for the existing flow — any redesign had to *improve* the process without forcing them to relearn it.
- **Regulatory non-negotiables.** Every change still had to satisfy PTI (Produce Traceability Initiative) requirements set by government agencies and buyers, as well as the FDA's incoming FSMA 204 traceability recordkeeping requirements — compliance wasn't optional, no matter how much friction it added.

### Goals (Business + UX KPIs)

The mandate: **improved UX/UI = a justified higher price tag.** Concretely, that meant:

- Improve the **success rate** for completing labeling tasks
- Reduce the **number of errors** during label creation
- Decrease the **time it takes to print a label**
- Increase **user satisfaction** ratings
- Decrease **customer support tickets** tied to labeling

`[PLACEHOLDER: Side-by-side "before" screenshot of the old, fragmented app experience vs. a teaser of the new unified flow]`

---

## Discovery & Research

Research followed a simple four-step approach: **Research → Design → Usability Testing → Measure Results.**

`[PLACEHOLDER: Design Approach graphic — the 4-stage arc diagram]`

### Who I talked to

With SME time limited, research focused on two personas representing opposite ends of the workflow:

- **Jimmy Sanchez, Production Operations Manager.** Responsible for ensuring harvested product gets picked, packed, and shipped on schedule while meeting food-safety and traceability requirements. His biggest frustrations: no systems in place to meet harvest commitments, and zero visibility into where crews and product were once work left his hands.
- **John, Harvest Crew Member.** Works the field directly — harvesting, trimming, packaging, and labeling product before it reaches the cooler. Piece-rate pay means every minute of friction costs him money.

`[PLACEHOLDER: Personas slide — Jimmy Sanchez persona card]`

### What the journey mapping revealed

Mapping John's day step-by-step showed exactly where the workflow bled time and trust:

- **Packing and prepping product** consumed roughly **5 hours** of a shift — the largest time sink, where added friction cost the most.
- **Adding product to pallets and applying labels** took another **1.5 hours** — a task that should have been fast and mechanical, but wasn't.
- Recurring "thinking" moments — *"do I have everything I need today?"*, *"will I meet my quota?"* — pointed to a deeper issue: crews had no reliable way to confirm they had what they needed, and no digital record of what they'd already done.

That gap matched what Jimmy's persona wanted from the other side: **real-time visibility into production teams and quality issues**, not after the fact.

`[PLACEHOLDER: Customer Journey Map slide — full journey with Action/Thinking/Feeling/Opportunities rows]`

### What the competitive landscape confirmed

To pressure-test the research, I mapped iTracefresh against nine direct competitors — HarvestMark/iFoodDS, Famous ERP, FoodLogiQ, Procurant, and others — across every major feature category.

`[PLACEHOLDER: Table/chart built from the competitor feature comparison — iTracefresh column vs. the field]`

The finding cut against the "just fix the price" narrative: **iTracefresh wasn't behind on capability.** It held features most competitors didn't — item-level trace, offline mobile printing, digital field load tracking, blockchain API integration, cut-to-cool time measurement. But those strengths were scattered across separate, disconnected modules, while competitors like Procurant and Famous ERP won on being one unified system. iTracefresh had more to offer — it just didn't *feel* like one product. That reframed the mandate: this wasn't a feature-parity problem, it was an **information architecture problem.**

---

## Process & Iteration

### Unifying the IA first

Before touching any individual screen, I restructured the navigation itself. Every previously separate iTracefresh module — TraceNow, Alerts & Look Up, Item, Label, Load, Reports, Data Management — now lives under one collapsible section in the side nav, alongside OMS and Freight.

- **Rationale:** this directly answered the research finding — users weren't struggling with any single tool, they were struggling to find which of several disconnected tools they needed.
- **Bonus effect:** merging iTracefresh into the broader OMS platform simplified workflows specifically for smaller operations, where the same user often bounced between both systems anyway.

`[PLACEHOLDER: Improved IA slide — annotated side nav showing the unified module structure]`

### Rebuilding the label creation flow as a guided wizard

The old label creation process was rebuilt as a **5-step wizard** — Pack Date → Product Info → Tracking Info → Printing Options → Finalize Print — with a persistent progress bar.

- **Auto-progression:** the user advances automatically once required fields are complete, instead of a manual "next" click at every stage.
- **Reversible navigation:** users can scroll up or click any step in the progress bar to revisit and edit earlier work — important when a mis-entered lot number has compliance consequences.
- **Rationale:** new users needed a visible sense of where they were and how much was left — the old flow gave no such signal, feeding directly into the "will I finish in time" anxiety surfaced in the journey map.

`[PLACEHOLDER: Auto Progression Behavior slide — annotated wizard showing progress bar and scroll/auto-advance behavior]`

### What usability testing told us

Comparative usability tests ran in UserZoom, pitting the **legacy application** against the **new prototype**, unmoderated, 40 participants invited to each study.

`[PLACEHOLDER: Usability Testing slide — UserZoom study cards and study builder screenshot]`

Direct observation and think-aloud feedback pointed to three fixes rolled into the next iteration:

- **Reduced cognitive load** by regrouping scattered fields into clearly labeled, scannable sections instead of one long uniform list.
- **Removed unconventional interactions** — modals and steps that added clicks without adding clarity — that testers consistently hesitated on.
- **Improved findability** for the label creation entry point, so users stopped hunting for where to start.

`[PLACEHOLDER: Updated Layout slide — before/after of the field grouping and modal cleanup]`

---

## Final Design & Impact

### The solution

The final product replaced a fragmented set of tools with one platform: a unified side navigation housing every traceability module, a **5-step guided wizard** for label creation, and a shared design system applied consistently across every screen — including modules well beyond labeling, like Recall Management and Brand Management.

`[PLACEHOLDER: "Our Solution" collage — the layered wizard screens]`

`[PLACEHOLDER: Recall Management dashboard screenshot — proof this was a platform fix, not a one-screen patch]`

### Design system 2.0

Rather than restyle the label flow in isolation, I built a reusable component library — buttons, inputs with validation states, alert banners, tabs, badges, and a defined color system — so every application built on iTracefresh inherits the same look, feel, and interaction patterns automatically.

- **Consistency across applications** — a fix made once now propagates everywhere.
- **Improved scalability and usability** — new features build faster on top of existing components, and users get a predictable experience across modules.

`[PLACEHOLDER: New Design System 2.0 slide — component library grid]`

### Measurable results

Comparative usability testing validated the redesign against the KPIs set at the start:

- **+14% increase in task success rate** for printing labels (78% → 92%)
- **-58% decrease in clicks** required to print a label
- **+8% increase in user satisfaction**

One honest tradeoff worth naming: breaking a dense, single-page form into a guided multi-step wizard meant a **52% increase in page views** and an **11% increase in raw time-to-print**. More screens, technically more time — but far fewer errors, far fewer clicks, and a much higher completion rate. For a compliance-critical task like PTI labeling, that's the right trade: a slightly longer, guided path beats a fast path that's easy to get wrong.

`[PLACEHOLDER: Benchmarked Results slide — the 5 stat tiles + UserZoom effectiveness charts]`

### Reflections

- **Don't rely on a single SME for domain knowledge** — it created a bottleneck; spreading that understanding across the team would have sped up decisions.
- **Get on-site earlier.** Time in the field with harvest crews would have surfaced workflow context faster than remote interviews alone.
- **Show work to customers sooner.** Sharing ideated solutions earlier, not just at final validation, would have caught misalignments before they were expensive to fix.
- **This project became a case for usability testing itself** — it helped establish the practice more broadly within the org, not just for this product.

`[PLACEHOLDER: Lessons Learned slide]`
