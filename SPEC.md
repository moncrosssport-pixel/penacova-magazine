# Penacova Magazine Specification

## Product Intent

Penacova Magazine is a separate editorial site for Penacova equestrian apparel.
Its job is to build brand desire through polished rider stories, fashion
editorials, look books, craft pieces, guides, news, and customer stories.

The magazine should feel closer to a luxury editorial publication than a store.
Commerce is deliberately quiet: articles may end with tasteful text CTAs that
link to existing Cafe24 shops, but the magazine itself does not contain cart or
checkout flows.

## Canonical Product Shape

The detailed final product brief lives in:

- `docs/final-magazine-form.md`
- `Penacova Magazine Design System/README.md`

Agent operating instructions live in:

- `docs/agent-harness.md`
- `tasks/plan.md`
- `tasks/todo.md`

## Current Status

The repository currently contains the foundation:

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Vitest
- Locale routing helpers for `ko`, `en`, `jp`
- Middleware redirect from `/` to `/ko`
- Minimal locale home shell
- Sanity Studio embedded at `/studio`
- Sanity public defaults for project `6pelmu7l`
- Repo-local Penacova Magazine design system
- Design-system-based locale homepage shell
- Sanity schemas for the Phase 1 content model, including Launch Brief planning
  cards
- Sanity read client and article queries
- Category index route at `/[locale]/[category]`
- Shared article detail route at `/[locale]/[category]/[slug]`
- Rider detail route at `/[locale]/riders/[slug]`
- Rider interview article route at `/[locale]/riders/interviews/[slug]`
- Collection look book route at `/[locale]/look/[season]`
- Basic SEO metadata, hreflang alternates, sitemap, robots, Open Graph, and
  article JSON-LD wiring
- Path-preserving locale switcher links in the masthead
- Translation status handling for EN/JP article pages and category teasers
- Seeded Phase 1 editorial article, one rider profile, one collection look
  book, and glossary content in Sanity
- No-code editorial publishing harness for Studio managers and future agents
- Typed Studio publishing manifest and tests that keep no-code article
  templates, category menus, Launch Desk filters, and glossary review views
  aligned with the public magazine structure
- Browser-verified local Studio shell reachability, with authenticated menu
  verification documented as a Sanity member session task
- Provider-neutral analytics event foundation for reading depth, locale/category
  navigation, and outbound Cafe24 CTA clicks
- No-code newsletter/follow settings and `/[locale]/subscribe` capture surface
- Launch content inventory for first stories, rider profiles, and glossary terms
- Launch story workbook for the first 12 stories, including exact source brief,
  route, asset, approval, and Studio field guidance
- Public noindex editor workbook route at `/[locale]/launch-workbook`
- Public noindex launch readiness route at `/[locale]/launch-readiness`
- HyperFrames-backed pinned fullscreen homepage film hero using
  `public/media/penacova_home_pinned_scroll.mp4`
- Launch Desk seed payload for 12 story briefs, 5 rider profile briefs, and one
  glossary batch brief
- 50 glossary starter terms seeded in Studio with Japanese review still needed
- Direct editor writing guide for self-serve article drafting and publishing
- Optional magazine subdomain runbook with current DNS state and correct Vercel
  scope
- Production launch readiness checker for content, optional magazine subdomain,
  newsletter/follow, and public route checks
- Vercel CLI re-authenticated to `moncrosssport-pixels-projects`; optional
  `magazine.penacova.co.kr` subdomain added to the project. Root, shop, Cafe24
  hosting, and nameservers must not move for this magazine task.
- Vercel production deployment at `https://penacova-magazine.vercel.app`

The magazine is not content-complete yet. The seeded editorial article renders
locally and on Vercel, but it still needs a real hero image before launch.
Later category-specific detail templates still need launch content.

Approximate current progress:

- Phase 1 technical foundation: 97% complete.
- Final public launch: 61% complete.

## Phase 1 Target

Phase 1 is complete when an editor can:

1. Open `/studio`.
2. Create and publish a Korean Article document.
3. Visit `/ko/editorial/[slug]`.
4. See the article title, hero image, metadata, body, and quiet end-of-article
   CTA rendered on both localhost and Vercel.

Minimum technical verification:

```bash
pnpm test
pnpm build
```

Minimum route verification:

- `/` redirects to `/ko`
- `/ko` returns a page
- `/studio` loads Sanity Studio
- `/ko/editorial/[slug]` renders a published article after schemas and queries
  exist

## Non-Goals

Do not implement these unless a later spec explicitly changes the scope:

- In-magazine cart or checkout
- Cafe24 API integration
- Member accounts
- Comments or likes
- Custom backend database
- Dark mode
- Video-first content
- Mobile app
