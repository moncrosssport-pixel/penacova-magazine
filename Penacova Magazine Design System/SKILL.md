---
name: penacova-design
description: Use this skill to generate well-branded interfaces and assets for Penacova Magazine — the Vogue-clean editorial site for Korean equestrian apparel brand Penacova. Contains essential design guidelines, colors, type, fonts, assets, and a magazine UI kit for prototyping production interfaces, marketing pages, slides, and throwaway mocks.
user-invocable: true
---

# Penacova Magazine — Design Skill

Read the `README.md` file within this skill, and explore the other available files. The README covers brand context, content fundamentals (voice, casing, punctuation, the no-emoji rule), visual foundations (color, type, layout, motion), and iconography rules.

Key files in this skill:

- `README.md` — full brand + content + visual + iconography guide
- `colors_and_type.css` — drop-in CSS variables and semantic element styles
- `assets/` — logos (mark, horizontal, white knockouts), favicon
- `preview/` — design-system reference cards (small HTML files, one concept each)
- `ui_kits/magazine/` — modular JSX components and an interactive `index.html` for the magazine site

If creating visual artifacts (slides, mocks, throwaway prototypes), copy the assets you need out of `assets/` and link `colors_and_type.css` as a stylesheet. Static HTML is fine for previews.

If working on production code (the real Next.js + Sanity codebase), copy values from `colors_and_type.css` into the Tailwind config or globals.css, and use the `ui_kits/magazine/` JSX components as visual references — not literal copies. Do not introduce emoji, do not use large red blocks, do not put drop shadows on cards, do not round image corners.

If the user invokes this skill without further guidance, ask what they want to build (homepage, article page, marketing landing, slide deck, social card), confirm locale (ko / en / jp), confirm whether they want a full clickable prototype or a single static page, and then act as an expert designer. Output HTML artifacts or production code depending on the need.

Brand color is canonical: Penacova Red `#E62021` — accent only, never a block. Paper background `#FAFAF7`, ink `#0A0A0A`. Headlines in Playfair Display (substitute for licensed editorial serif), Korean body in Noto Serif KR, UI in Pretendard.
