# Penacova Magazine — Website UI Kit

A pixel-leaning recreation of the Penacova Magazine front-end. The codebase under `penacova_magazine/penacova-magazine/` is in early Phase 1 (only a holding-page locale shell exists), so this kit is built straight from the editorial brief in `docs/final-magazine-form.md` plus the brand assets and design tokens.

## What's here

| File | Purpose |
| --- | --- |
| `index.html` | Click-through prototype. Front page → article → look book → studio modal. |
| `Masthead.jsx` | Top masthead + category nav + locale switcher. |
| `LeadStory.jsx` | Full-width hero story with overlay treatment. |
| `EditorRail.jsx` | "Editor's Selection" 3-up grid. |
| `CategoryRail.jsx` | Horizontal-scrolling rail per category. |
| `ArticleCard.jsx` | Image · kicker · title · byline (the atomic unit). |
| `ArticlePage.jsx` | Article detail view with kicker, drop-cap body, pull quote, end CTA. |
| `LookGrid.jsx` | Look-book seasonal grid. |
| `Newsletter.jsx` | Quiet subscribe block. |
| `Footer.jsx` | Ink-background footer. |

## Design rules respected

- Paper background `#FAFAF7`, ink `#0A0A0A`, red `#E62021` only as accent
- All images zero-radius, no shadows, no gradients except hero overlay
- Hairline (1px gray-200) between sections
- No emoji, no icon font — typographic glyphs only
- Article reading column 680px max
- Korean is source; copy is mostly Korean with some English

## What's faked

Story content, photography (replaced with photographic-feeling colored panels and `<image-slot>` drops), rider names. Real launch needs Sanity content + commissioned photography.
