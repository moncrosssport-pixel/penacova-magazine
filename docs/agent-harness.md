# Agent Handoff Harness

Use this file when continuing the project from GitHub with a new agent.

## Mission

Continue building Penacova Magazine toward a production-ready editorial site.
The immediate goal is to finish Phase 1: Sanity schemas, a read client, article
querying, and one rendered editorial article route.

## Required Reading Order

1. `AGENTS.md`
2. `README.md`
3. `SPEC.md`
4. `docs/final-magazine-form.md`
5. `docs/editorial-publishing-harness.md`
6. `Penacova Magazine Design System/README.md`
7. `Penacova Magazine Design System/SKILL.md`
8. `tasks/plan.md`
9. `tasks/todo.md`
10. `docs/launch-content-inventory.md` when working on launch stories, rider
    profiles, or glossary content

## Environment

```bash
pnpm install
pnpm test
pnpm build
pnpm dev
```

Seed the prepared Phase 1 content after a project owner creates a Sanity write
token:

```powershell
$env:SANITY_AUTH_TOKEN="<token>"
pnpm run seed:sanity
```

Local routes:

- `http://localhost:3000/`
- `http://localhost:3000/ko`
- `http://localhost:3000/ko/editorial`
- `http://localhost:3000/ko/editorial/quiet-morning` after content seed
- `http://localhost:3000/ko/riders/interviews/[slug]` for rider interview
  articles
- `http://localhost:3000/ko/riders/jiwon-kim` for rider profiles after content
  seed
- `http://localhost:3000/ko/look/ss26` for collection look books after content
  seed
- `http://localhost:3000/ko/subscribe`
- `http://localhost:3000/sitemap.xml`
- `http://localhost:3000/robots.txt`
- `http://localhost:3000/studio`

Production routes:

- `https://penacova-magazine.vercel.app/`
- `https://penacova-magazine.vercel.app/ko`
- `https://penacova-magazine.vercel.app/ko/editorial`
- `https://penacova-magazine.vercel.app/ko/editorial/quiet-morning` after
  content seed
- `https://penacova-magazine.vercel.app/ko/riders/interviews/[slug]` for rider
  interview articles
- `https://penacova-magazine.vercel.app/ko/riders/jiwon-kim` for rider profiles
  after content seed
- `https://penacova-magazine.vercel.app/ko/look/ss26` for collection look books
  after content seed
- `https://penacova-magazine.vercel.app/ko/subscribe`
- `https://penacova-magazine.vercel.app/studio`

## Known Good State

Current known state:

- `main` points at `moncrosssport-pixel/penacova-magazine`.
- `/` redirects to `/ko`.
- `/ko` renders the first design-system-based magazine home.
- `/studio` loads the embedded Sanity Studio shell.
- Sanity schemas are registered for Article, Collection, Glossary, Look, Person,
  Product, and Rider.
- Category indexes render at `/[locale]/[category]`.
- Shared article detail pages render at `/[locale]/[category]/[slug]` after
  content exists.
- Rider interview articles render at `/[locale]/riders/interviews/[slug]` to
  avoid colliding with rider profile slugs.
- Rider detail pages render at `/[locale]/riders/[slug]`; this static route
  takes precedence over the shared article detail route.
- Collection look book pages render at `/[locale]/look/[season]`.
- Studio uses a no-code publishing structure, category-specific article
  templates, and preview subtitles that show public URLs.
- Sanity CORS allows `http://localhost:3000` and
  `https://penacova-magazine.vercel.app` with credentials for Studio editing.
- SEO metadata, sitemap, robots, Open Graph, and article JSON-LD wiring are in
  place.
- Analytics events are provider-neutral: they queue in
  `window.penacovaAnalyticsQueue` and forward to `gtag` when GA4 is added.
  Current events cover reading depth, locale/category navigation, and outbound
  Cafe24 CTAs.
- Newsletter/follow capture is provider-neutral: Studio has a singleton
  `site-settings` document, the homepage renders its newsletter section, and
  `/[locale]/subscribe` provides a standalone capture route.
- Masthead locale links preserve the current category or article path.
- EN/JP article pages and category teasers respect `translationStatus`; they
  show Korean-original content until translations are reviewed or manual.
- The Phase 1 seed payload is applied. `quiet-morning` renders at
  `/ko/editorial/quiet-morning`, and `jiwon-kim` renders at
  `/ko/riders/jiwon-kim` after deployment.
- Launch story, rider, and glossary briefs live in
  `docs/launch-content-inventory.md`.
- `Penacova Magazine Design System/` is the official visual source.
- `pnpm test` and `pnpm build` pass.

## Known Traps

- The repo is not owned by an `etehofk` GitHub/Vercel account. Use
  `moncrosssport-pixel`.
- Do not recreate a local `.vercel` link under the wrong account.
- Avoid unpinned Sanity upgrades. Sanity 5 / `next-sanity` 12 are not safe for
  the current Next 14 + React 18 baseline.
- `/studio` must not be redirected through locale middleware.
- Public Sanity values can be defaults, but never expose write tokens.
- Public Sanity seed document IDs should not contain dots. Dot IDs are private
  to authenticated queries and do not appear through the public read API.
- Do not hand-build article detail links; use `getArticleHref()` or
  `getArticlePathSegments()` so Rider Interview articles keep the
  `/riders/interviews/[slug]` route.
- Sitemap Sanity fetches use `cache: 'no-store'` so newly seeded collections
  are not hidden by a stale local build cache.
- The old planning document outside this repo may contain optimistic checklist
  language. Treat this repo's `tasks/todo.md` as the active state.

## Work Loop

For each task:

1. Read the relevant source files.
2. Update `tasks/todo.md` if the task status changes.
3. Make the smallest useful change.
4. Run the narrowest verification.
5. Run `pnpm test`.
6. Run `pnpm build` if the change affects runtime, routing, CMS config, or
   dependencies.
7. Review `git diff`.
8. Commit with a clear message.
9. Push when the work is meant to be available to the next agent.

## Verification Matrix

| Change type | Required verification |
| --- | --- |
| i18n helper | `pnpm test` |
| Middleware/routing | `pnpm test`, `pnpm build`, local route check |
| Sanity schema | `pnpm build`, Studio sidebar check |
| Sanity query/client | Unit test plus `pnpm build` |
| Article page | `pnpm test`, `pnpm build`, local missing-article 404 or seeded article URL |
| SEO metadata | `pnpm test`, `pnpm build`, check page head, `/robots.txt`, `/sitemap.xml` |
| Analytics instrumentation | `pnpm test`, `pnpm build`, check rendered page data attributes |
| Newsletter/follow surface | `pnpm test`, `pnpm build`, check `/[locale]/subscribe` and homepage `#newsletter` |
| Visual design | Design system review, `pnpm test`, `pnpm build`, browser check |
| Vercel/deploy | Production or preview URL check |
| Docs only | Link/file review, `git diff --check` |

## Commit Style

Use conventional, focused commits:

- `docs: add agent handoff harness`
- `feat(cms): add localized field helpers`
- `feat(cms): add Article schema`
- `feat(sanity): add article query`
- `feat(frontend): render editorial article`
- `fix(routing): ...`

## Manual External Steps

Some steps require the project owner or dashboard access:

- Sanity login and CORS origin management.
- Sanity write token creation if the local CLI account is not a project member.
- Vercel account selection.
- Custom domain setup.
- DNS changes for `magazine.penacova.co.kr`.
- Entering launch content in Studio.

When blocked by dashboard access, leave the code ready, document the exact
manual action, and keep the repo buildable.
