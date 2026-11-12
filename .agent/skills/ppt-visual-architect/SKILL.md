---
name: "ppt-visual-architect"
description: >
  Standardized presentation architecture and visual delegation protocol for local
  DeepSeek Flash and Antigravity CLI agents. Use whenever generating slide decks,
  Marv/Slidev/PptxGenJS presentations, or executive technical briefings.
---

# PPT Visual Architect Superpower

When asked to create a presentation or slide deck locally, follow this two-stage architecture:
1. **Structure & Copy Locally**: Break the presentation into 6–10 high-impact slides with strict typographic density caps (maximum 35 words per slide, 1 core thesis per slide).
2. **Delegate Visual Assets to Cloud Bridge**: Never use broken placeholder URLs or low-resolution stock icons. Send batch visual generation requests to the Antigravity Cloud Bridge (`POST /api/bridge/tasks` with `type: "ppt_asset"`).

## Slide Layout Archetypes

### 1. Title & Thesis Slide (16:9 Split or Full-Bleed Scrim)
- **Headline**: 6–10 words stating the core engineering or business outcome.
- **Visual Asset**: Request a `16:9` architectural or isometric hero illustration from Cloud Bridge.
- **Scrim Rule**: If overlaying white typography on the image, apply a dark gradient scrim (`linear-gradient(90deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.4) 100%)`).

### 2. System Architecture & Mechanism Slide (2-Column 40/60 Split)
- **Left Column (40%)**: 3 numbered mechanism steps (`01. Ingestion`, `02. Cloud Synthesis`, `03. Local Execution`).
- **Right Column (60%)**: High-resolution `16:9` or `4:3` technical isometric diagram fetched from `.cloud-bridge/assets/`.

### 3. Quantitative Proof Slide (3-Column Metric Grid)
- Present at most 3 key metrics in `JetBrains Mono` (`tabular-nums`) with explicit units and baseline comparisons.

## Prompt Formula for Cloud Bridge Image Requests
When submitting a `ppt_asset` task to the Cloud Bridge, construct the `prompt` field using this structure:
`[Subject & Technical Context] + [Materiality & Surface Palette: e.g. brushed anodized aluminum, matte obsidian, optical glass] + [Camera & Lighting: e.g. isometric 30-degree orthographic or studio macro, soft diffused rim lighting] + [8k keynote presentation visual, no embedded text clutter]`
