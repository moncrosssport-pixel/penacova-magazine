# Penacova Magazine Design System

`magazine.penacova.co.kr` — A Vogue-clean editorial magazine for **Penacova**, a Korean equestrian apparel brand.

This design system is the visual + content rule book for designing pages, slides, and prototypes that feel _on-brand_ for Penacova Magazine. The site is intentionally not a shop: commerce is quiet and links out to Cafe24 stores. The magazine itself is photo-led, refined, and reads more like a luxury editorial than a marketing site.

> **Brand color (canonical):** Penacova Red — Process `C11 M95 Y92` · RGB `R230 G32 B33` · Hex `#E62021`. Used as an _accent only_ — never as a large block.

---

## Index

| File | Purpose |
| --- | --- |
| `README.md` | This file. Brand context + content + visual fundamentals + iconography. |
| `colors_and_type.css` | All color, typography, spacing, motion CSS variables + semantic element styles. Drop-in. |
| `assets/` | Logos (mark, horizontal, white variants), favicon, brand graphics. |
| `preview/` | HTML cards rendered in the project's Design System tab. |
| `ui_kits/magazine/` | The magazine website UI kit — modular JSX components + interactive `index.html`. |
| `SKILL.md` | Agent skill manifest — works in this product and in Claude Code. |

## Sources

- **Codebase (read-only mount):** `penacova_magazine/penacova-magazine/` — Next.js 14 + Sanity v3 + Tailwind. The truth lives in:
  - `README.md`, `SPEC.md`, `AGENTS.md`
  - `docs/final-magazine-form.md` — full editorial brief
  - `docs/decisions/ADR-0001-architecture-and-editorial-model.md`
- **GitHub:** `moncrosssport-pixel/penacova-magazine`
- **Production:** `https://penacova-magazine.vercel.app`
- **Intended domain:** `magazine.penacova.co.kr`
- **Sanity:** project `6pelmu7l` · dataset `production` · studio at `/studio`
- **Brand assets uploaded:** logo mark + horizontal lockup, both color and white knockouts (in `assets/`).

---

## Product context

| Surface | Status | Notes |
| --- | --- | --- |
| **Magazine website** (this DS focuses here) | Phase 1 | Editorial site at `magazine.penacova.co.kr`. Multilingual: `ko` (source), `en`, `jp`. |
| Cafe24 shops (KR / JP) | Existing, not in scope | Magazine links out with UTM params — no cart, checkout, or product cards inside the magazine. |

### Information architecture (locale-scoped)

```
/[locale]/                     → magazine homepage
/[locale]/editorial            → fashion editorials, photo essays
/[locale]/riders               → rider interviews
/[locale]/look                 → seasonal look books
/[locale]/heritage             → craft, material, workshop, origin
/[locale]/guide                → sizing, care, beginner explainers
/[locale]/news                 → competitions, launches, store updates
/[locale]/stories              → customer + community stories
/[locale]/about
/[locale]/search
/[locale]/subscribe
/studio                        → Sanity Studio (editor)
```

### Audience

1. Korean riders & equestrian families
2. Korean fashion / luxury readers — may not ride yet but understand style
3. Japanese riders & brand-aware readers
4. English readers as a brand-discovery audience

---

## CONTENT FUNDAMENTALS

The magazine reads like a curated print magazine — confident, quiet, restrained. Copy never barks at the reader; it sets a scene.

### Voice & tone

- **Editorial-first, commerce-quiet.** Lead with the rider, the field, the stitching — not the SKU. Even commerce CTAs are written as text links, not buttons.
- **Confident understatement.** Single-sentence deks. Specific nouns. No hype words ("amazing", "incredible", "unleash"). The brand assumes its reader has taste.
- **Korean is source of truth.** All English/Japanese is downstream. Translations protect a fixed glossary (Penacova, rider names, product names, equestrian vocabulary).
- **Third-person, observational.** The magazine narrates; it rarely says "you" and never says "we" in marketing copy. Use "you" only inside Guide articles where instruction is the point.
- **No exclamation marks** in body copy. Periods only.

### Casing

- Section labels & kickers: **UPPERCASE** with wide tracking (`0.18em–0.28em`). e.g. `EDITORIAL`, `RIDER INTERVIEW`, `ISSUE 03`.
- Article titles: **Sentence case** in serif (not Title Case, not ALL CAPS).
- Bylines: `BY {NAME}` in uppercase small caps.
- Dates: long-form western (`MAY 6, 2026`) for `/en`; `2026.05.06` numeric for `/ko` and `/jp`.

### Punctuation & marks

- Em dash with hairspaces — like this — never double hyphens.
- Curly quotes always: `“ ” ‘ ’`.
- Issue numbers in mono small caps when standalone: `ISSUE №03`.
- Section dividers in body copy: a single centered `※` glyph, never `* * *`.

### Vibe & examples

| Surface | Example copy |
| --- | --- |
| Kicker | `RIDER INTERVIEW` · `LOOK BOOK SS26` · `HERITAGE` |
| Headline | `승마의 장면을 기록하는 매거진` (KO) · `An editorial home for equestrian stories` (EN) |
| Dek | `라이더, 마방, 제품, 헤리티지를 하나의 에디토리얼 흐름으로 엮습니다.` |
| Byline | `BY 김지원 — 사진 박세진` |
| End-of-article CTA | `Shop the SS26 collection at penacova.co.kr →` (single text line, no button) |
| Newsletter ask | `Receive the next issue. One email per month.` |

### Emoji policy

**No emoji.** Anywhere. Not in copy, not in UI, not in social. The brand does not use emoji. Use proper typographic characters instead: `→`, `—`, `№`, `※`, `•`, curly quotes.

---

## VISUAL FOUNDATIONS

The visual model the brief calls "Vogue-clean": warm off-white paper, black ink, large editorial photography, thin precise typography, generous whitespace. **Penacova Red is an accent, never a block.**

### Color

| Role | Token | Hex | Usage |
| --- | --- | --- | --- |
| Penacova Red | `--penacova-red` | `#E62021` | Logo, kickers, ribbon bug, single-line accents. **Never** as a large fill. |
| Red deep | `--penacova-red-deep` | `#B81519` | Hover/pressed accent |
| Red soft | `--penacova-red-soft` | `#FBE6E6` | Tinted background ONLY for tiny ribbon labels — avoid otherwise |
| Paper | `--paper` | `#FAFAF7` | Page background, warm off-white |
| Pure white | `--paper-pure` | `#FFFFFF` | Image cards, image bleed only |
| Ink | `--ink` | `#0A0A0A` | Headlines, body |
| Ink mute | `--ink-mute` | `#4A4A4A` | Dek, captions |
| Gray 500 | `--gray-500` | `#777777` | Metadata, utility |
| Hairline | `--gray-200` | `#DEDBD2` | 1px rules between sections |

**No dark mode.** The brand brief explicitly excludes it. Black-background hero panels are an editorial layout choice, not a theme.

### Typography

- **Display / headline:** `Playfair Display` (high-contrast serif). Substituted for the brand spec's `Cormorant Garamond / Playfair Display / similar editorial face`.
- **Korean body:** `Noto Serif KR` for editorial body; `Pretendard` for UI.
- **UI / navigation:** `Pretendard` (Inter fallback).
- **Mono:** `JetBrains Mono` for issue numbers and stat figures, used sparingly.
- **Drop caps** appear only on `editorial` and `heritage` articles — not `guide`, `riders`, or `news`.
- **Italics** are used sparingly for deks and pull quotes; never inside body paragraphs except for titles of works.

> **FLAG to brand:** No proprietary font files were provided. We substituted Google Fonts. If Penacova licenses a display serif (Domaine, GT Super, Didot…), please share the font files so we can swap.

### Spacing & layout

- 8pt base scale with 4/12 micro-steps for editorial rhythm.
- Outer container: **1280px** max width.
- Article reading column: **680px** — narrow, like print.
- Generous gutters: `24px` mobile, `48px` desktop.
- Whitespace is content. Sections breathe with `--space-9` (96px) or `--space-10` (128px) between blocks.

### Backgrounds

- **No gradients.** No bluish-purple gradients, no linear backgrounds. Backgrounds are solid: paper, ink, or one neutral tonal block (`--gray-100`).
- **No repeating patterns or textures.**
- **Full-bleed photography** is the dominant decorative surface. Editorial articles often open with a single image filling the entire viewport, headline overlaid in white.
- **Image treatment:** photographs are warm-natural, color (not B&W by default). Stable interiors, riding fields, leather, embroidery details, riders. No grain filter.

### Borders, rules, shadows

- **1px hairlines** (`--gray-200`) between sections and between feed items. That's the entire border vocabulary. No 2px borders.
- **Strong rule** (`--ink`, 1px) above masthead and below footer only.
- **No drop shadows** on cards. None. Cards exist by being on-paper next to other paper — separation comes from rules and whitespace.
- The only shadow that exists: `--shadow-sticky`, a 1px below-line on a sticky nav once scrolled.

### Corner radii

- **`--radius-0` / 0px** for nearly everything. Images, buttons, inputs, cards.
- **`--radius-1` / 2px** allowed only on small UI controls (form inputs).
- **`--radius-pill`** allowed only on category chips inside Stories filters — used sparingly.

### Cards

- A "card" in this system is just a stack: image (no radius) + caption block (no border, no shadow), separated by `--space-3`. No outer container, no fill.
- Hover state: image opacity dips to `0.92`, headline gets underline. Nothing else moves.

### Animation & motion

- **No bounces. No springs.** Easing is `cubic-bezier(0.2, 0, 0, 1)` — standard editorial decel.
- Durations: `120ms` for micro-feedback, `200ms` for hover transitions, `400ms` for menu reveals, `700ms` for image fade-ins on scroll.
- Page transitions: cross-fade only, no slide.
- **Hover** on text links: opacity drop to `0.6`. No color change.
- **Hover** on image cards: image opacity `0.92` + slight `translateY(-2px)` over 200ms.
- **Press / active** state: opacity `0.5`, no scale change. Buttons do not shrink.
- Headlines never animate in (no fly-in, no typewriter). Images fade up `12px` translateY, opacity `0→1` over 700ms, once on entry.

### Transparency, blur, gradients

- **No backdrop blur** anywhere. Sticky nav uses an opaque `--paper` background with a hairline rule.
- **No transparency** on cards or panels.
- The single permitted gradient is a **black→transparent overlay** on full-bleed hero images — and only on the bottom 35% of the image, so headlines stay legible. Never elsewhere.

### Layout rules (fixed elements)

- Top: masthead (logo center or left-aligned with locale switcher right). Fixed/sticky after `64px` of scroll.
- Bottom: footer with brand links, Cafe24 CTAs, legal. Always full-width, always on `--paper`.
- Sidebars: avoid. The article reading experience is single-column.

### Imagery vibe

- Warm-natural color, slightly cool shadows. Reminiscent of Mariano Vivanco / Jamie Hawkesworth editorials.
- Never tinted, never duotoned, never B&W as default. B&W permitted as an art choice for one editorial in a season.
- People in motion (mid-stride, mid-jump) preferred over static portraits for editorial leads.
- Crops favor uncluttered negative space — the brand likes air around subjects.

---

## ICONOGRAPHY

The magazine has almost no iconography. Icons are not part of the editorial language.

### Approach

- **Logos:** the Penacova mark (a stylized "A" formed by a horse silhouette with a flowing ribbon/mane) and the horizontal `△ PENACOVA` lockup. Both have white-knockout variants for dark imagery. See `assets/`.
- **No icon font.** No FontAwesome, no Material Icons in the codebase.
- **No SVG icon set.** The Next.js codebase ships zero icons.
- **Typographic glyphs do the icon work:** `→` (more / next), `←` (back), `×` (close), `№` (issue), `※` (section break), `•` (separator), `✕` (form clear).
- **Locale switcher** uses text, not flags: `KO · EN · JP`.
- **Search** uses the word "Search" — no magnifying glass icon.
- **Newsletter** uses the word "Subscribe" — no envelope icon.

### When you absolutely need an icon

If a UI surface genuinely needs an icon (rare — e.g. a future search input or a play button on a video), use **Lucide** at `stroke-width: 1.25`, color `--ink`, never filled. We treat it as a temporary substitute until the brand commissions custom marks.

> **FLAG:** Lucide is a substitution. The brand has not specified an icon set. Confirm before shipping anything that uses one.

### Emoji & unicode

- **Emoji: no.** Documented above in Content Fundamentals — repeated here because it's also an iconography rule.
- **Unicode glyphs: yes**, but only the ones above (`→ ← × № ※ • ✕`).

### Logo lockups in `assets/`

| File | Use |
| --- | --- |
| `logo-mark.png` | Square mark, red on transparent. Default. |
| `logo-mark-white.png` | Square mark, white on transparent. Use over imagery. |
| `logo-horizontal.png` | Mark + `PENACOVA` wordmark, red. Mastheads, footers. |
| `logo-horizontal-white.png` | Mark + wordmark, white. Mastheads over imagery. |
| `logo-square.png` | Mark + wordmark stacked, social-square format. |
| `logo-favicon.png` | 120×120 favicon source. |
| `asset-1.png` | Tiny mark — favicon scale. |
| `asset-2.png` | Mark + horizontal lockup, red. Compact uses. |
| `asset-3.png` | Mark + lockup with "IT'S GORGEOUS" tagline, on light card. Marketing collateral only. |
