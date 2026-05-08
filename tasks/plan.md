# Implementation Plan

## Goal

Finish the Penacova Magazine foundation so a Korean article can be created in
Sanity Studio and rendered at `/ko/editorial/[slug]` locally and on Vercel.

## Source Of Truth

- Product shape: `docs/final-magazine-form.md`
- Agent rules: `AGENTS.md`
- Current executable status: this file and `tasks/todo.md`
- Codebase: current GitHub repository

## Current Baseline

Completed:

- Next.js 14 project with Tailwind and TypeScript.
- Vitest configured.
- Locale constants and helpers.
- Middleware redirect from `/` to `/ko`.
- Minimal `/[locale]` home shell.
- Embedded Sanity Studio route at `/studio`.
- Sanity public defaults for `projectId=6pelmu7l`, `dataset=production`.
- Vercel production URL is live.
- Repo-local design system is available and documented.
- Locale home uses the first design-system-based magazine shell.
- Sanity localized field helpers are implemented.
- Sanity document schemas are registered for Article, Collection, Glossary,
  Look, Person, Product, and Rider.
- Sanity read client, article GROQ query, query tests, and the Editorial article
  route are implemented.
- Phase 1 seed payload and seed command are prepared and applied.
- Category index pages are implemented at `/[locale]/[category]` for the seven
  magazine pillars.
- Article detail pages use the shared `/[locale]/[category]/[slug]` route.
- Basic SEO metadata, canonical/alternate links, sitemap, robots, Open Graph,
  and article JSON-LD wiring are implemented.
- The masthead locale switcher preserves the current category or article path.
- Article pages and category teasers respect `translationStatus`; EN/JP routes
  show Korean original content until translations are reviewed or manual.
- Rider detail pages render at `/[locale]/riders/[slug]` with profile facts,
  linked interviews, optional favorite products, and Person JSON-LD.
- Studio has a no-code publishing structure, category-specific templates, and a
  documented editorial publishing harness for managers.
- Collection look book pages render at `/[locale]/look/[season]` with seeded
  SS26 looks and product links.
- Provider-neutral analytics events are wired for reading depth, locale/category
  navigation, and outbound Cafe24 CTA clicks.
- No-code newsletter/follow settings render the homepage newsletter section and
  `/[locale]/subscribe` route.
- Launch content inventory covers 12 first stories, 5 rider profile slots, and
  50 glossary starter terms.
- Launch Desk planning cards can track those story, rider, and glossary launch
  tasks inside Studio before final public documents are published.
- Glossary starter terms are seeded into Studio with Japanese review explicitly
  tracked before terms are marked ready.
- Editors have a direct writing guide for self-serve article drafting and
  publishing.
- Custom domain setup has a runbook with current DNS evidence and the correct
  Vercel account boundary.

## Progress Snapshot

- Phase 1 technical foundation is roughly 97% complete. The remaining Phase 1
  polish is to upload a real hero image for the seed article and visually check
  Studio editing.
- Final public launch is roughly 59% complete. The site still needs launch
  content written/published in Studio, translation workflow polish, real
  newsletter provider connection, custom analytics provider setup, custom domain
  setup, and final QA.

Not completed:

- Uploading a real hero image for the seed editorial article.
- Manual Studio editing/sidebar verification.

## Design Baseline

Use `Penacova Magazine Design System/` as the official visual source for Phase 2
and all visible page work. Production components should be written as typed
Next.js/React components, while the design system's prototype JSX remains a
reference.

## Next Work Sequence

### Slice 1: Localized CMS Helpers

Create schema helpers for localized strings, text, and portable text.

Acceptance:

- Helpers live under `sanity/helpers/`.
- They support `ko`, `en`, and `jp`.
- Korean fields are required where appropriate.
- `pnpm build` passes.

Status: complete.

### Slice 2: Core Sanity Schemas

Create and register:

- `glossary`
- `person`
- `collection`
- `product`
- `rider`
- `look`
- `article`

Acceptance:

- `sanity/schema.ts` imports and exports all document types.
- Studio sidebar shows the document types.
- `pnpm build` passes.

Status: complete by schema registration and build. Manual sidebar/content-entry
verification still requires a logged-in Studio session.

### Slice 3: Sanity Read Client And Queries

Add:

- `lib/sanity/client.ts`
- `lib/sanity/queries.ts`
- `lib/sanity/queries.test.ts`

Acceptance:

- Unit tests verify query construction and params.
- `pnpm test` passes.
- `pnpm build` passes.

Status: complete.

### Slice 4: Shared Article Route

Add:

- `app/[locale]/[category]/[slug]/page.tsx`
- Portable Text rendering.
- Sanity image URL handling.
- `notFound()` behavior for invalid locale or missing article.

Acceptance:

- A published Sanity article renders at `/ko/editorial/[slug]`.
- Missing article returns 404.
- `pnpm test` passes.
- `pnpm build` passes.

Status: route implemented for all seven article categories. The seeded
`quiet-morning` article renders locally and on production.

Seed note: `pnpm run seed:sanity` now uses `scripts/seed-sanity.mjs` and expects
`SANITY_AUTH_TOKEN`, `SANITY_API_TOKEN`, or `SANITY_WRITE_TOKEN`. The old CLI
path is preserved as `pnpm run seed:sanity:cli`.

Sanity ID note: public documents must use public-readable IDs such as
`article-quiet-morning`, not private dot IDs such as `article.quiet-morning`.

### Slice 5: End-To-End Vercel Verification

Verify:

- `/` redirects to `/ko`.
- `/ko` renders.
- `/studio` loads.
- `/ko/editorial/[slug]` renders the published article.
- Sanity CORS includes the Vercel production origin.

Acceptance:

- Latest `main` deployment works on `https://penacova-magazine.vercel.app`.
- Any required dashboard/manual steps are documented.

Status: seeded article verified locally and on production at
`/ko/editorial/quiet-morning`. A real hero image is still needed before launch.

### Slice 6: Category Index Pages

Add `/[locale]/[category]` pages backed by Sanity article lists and linked from
the masthead/home category rails.

Acceptance:

- Valid categories render a 200 page, including an editorial empty state when no
  published content exists.
- Invalid categories return 404.
- `pnpm test` passes.
- `pnpm build` passes.

Status: complete locally and verified on Vercel production.

### Slice 7: Shared Category Article Detail Pages

Move the detail article template from an editorial-only static segment to the
shared category route.

Acceptance:

- `/[locale]/[category]/[slug]` compiles for valid categories.
- Invalid categories return 404.
- Missing articles return 404.
- Non-Korean locales do not silently render Korean body copy as translated text.
- `pnpm test` passes.
- `pnpm build` passes.

Status: complete locally and pushed. Production positive-render verification
still requires a seeded Sanity article.

### Slice 8: SEO Foundation

Add metadata and crawler surfaces for the current public routes.

Acceptance:

- Home, category, and article routes generate titles and descriptions.
- Category/article routes generate canonical and hreflang alternate links.
- Article route supports Open Graph image metadata from `seo.ogImage` or
  `heroImage`.
- Article route emits JSON-LD when a document exists.
- `/robots.txt` and `/sitemap.xml` return 200.
- `pnpm test` passes.
- `pnpm build` passes.

Status: complete locally. Production verification follows after push/deploy.

### Slice 9: Path-Preserving Locale Switcher

Add reusable i18n route helpers and wire the magazine masthead locale links so
category and article routes keep their current path when switching locale.

Acceptance:

- `/en/editorial` links to `/ko/editorial`, `/en/editorial`, and `/jp/editorial`.
- Article detail pages preserve `[category]/[slug]` across supported locales.
- Logo/home navigation still points to the locale home.
- `pnpm test` passes.
- `pnpm build` passes.

Status: complete locally. Production verification follows after push/deploy.

### Slice 10: Translation Status Handling

Wire Sanity `translationStatus` into article rendering so non-Korean routes do
not silently present unreviewed translated fields as finished translations.

Acceptance:

- `reviewed` and `manual` translations can render in the requested locale.
- `not-started` and `auto-draft` EN/JP routes show Korean original content plus
  a translation notice.
- Category teasers mark Korean-original stories on EN/JP category pages.
- `pnpm test` passes.
- `pnpm build` passes.

Status: complete locally. Production verification follows after push/deploy.

### Slice 11: Rider Detail Pages

Add a static rider profile route that wins over the shared article detail route
for `/[locale]/riders/[slug]`.

Acceptance:

- A seeded rider renders at `/ko/riders/jiwon-kim`.
- EN/JP rider routes render with localized profile names where available.
- Missing rider slugs return 404.
- Linked rider interviews use article teaser cards.
- Rider routes are included in `/sitemap.xml`.
- `pnpm test` passes.
- `pnpm build` passes.

Status: complete locally. Production verification follows after push/deploy.

### Slice 12: No-Code Publishing Harness

Make the CMS publishing flow clear enough that a non-developer can publish by
choosing a Studio template and filling fields.

Acceptance:

- Studio has a publishing-oriented desk structure instead of a raw document
  type list.
- Article templates prefill category and translation defaults.
- Article and Rider schema descriptions explain the public route and required
  editorial fields.
- Rider Interview Article details avoid Rider Profile route collisions.
- `docs/editorial-publishing-harness.md` is the source of truth for manager
  publishing.
- `pnpm test` passes.
- `pnpm build` passes.

Status: complete locally. Production verification follows after push/deploy.

### Slice 13: Collection Look Book Pages

Add a no-code Collection route for seasonal look books.

Acceptance:

- Collection documents have a URL slug.
- A seeded collection renders at `/ko/look/ss26`.
- Missing collection slugs return 404.
- Linked Look, Product, and Rider references render without requiring code.
- Collection routes are included in `/sitemap.xml`.
- `pnpm test` passes.
- `pnpm build` passes.

Status: complete locally. Production verification follows after push/deploy.

### Slice 14: Analytics Event Foundation

Add a provider-neutral analytics harness so the magazine can capture editorial
behavior before GA4 or another provider is configured.

Acceptance:

- Reading depth emits stable events for article and look book surfaces.
- Locale switcher and category navigation links carry stable event metadata.
- Article CTAs, collection CTAs, and look book product links emit outbound
  Cafe24 click events.
- Events queue in `window.penacovaAnalyticsQueue` and forward to `gtag` if GA4
  is present.
- `pnpm test` passes.
- `pnpm build` passes.

Status: complete locally. Production verification follows after push/deploy.

### Slice 15: Newsletter / Follow Embed

Add a no-code newsletter and follow surface without coupling the magazine to a
specific email provider.

Acceptance:

- Studio has a singleton `Site Settings` document for newsletter copy, provider
  form action, email field name, provider label, and follow links.
- The homepage newsletter section renders from the settings with safe fallbacks.
- `/[locale]/subscribe` renders the same capture surface.
- The footer Subscribe link points to the locale subscribe route.
- Follow links emit `follow_link_click`; newsletter forms emit
  `newsletter_submit` when a provider action is configured.
- Seed content includes the `site-settings` document.
- `pnpm test` passes.
- `pnpm build` passes.

Status: complete locally and seeded in Sanity. Production verification follows
after push/deploy.

### Slice 16: Launch Content Inventory

Create the editorial inventory that tells Studio managers and future agents
what to publish first.

Acceptance:

- `docs/launch-content-inventory.md` lists 12 story briefs with category, slug,
  working title, required assets, and CTA intent.
- The same document lists 5 rider profile slots without inventing unapproved
  real rider identities.
- The same document lists 50 glossary starter terms and review notes.
- `tasks/todo.md` distinguishes inventory drafting from actual Studio
  publishing.

Status: complete locally. Actual article/rider/glossary publishing remains a
launch-content task.

### Slice 17: Launch Desk Planning Cards

Add a no-code Studio planning layer so the launch inventory can be tracked
without publishing placeholder articles or inventing unapproved rider identities.

Acceptance:

- `launchBrief` is registered as a Sanity document type.
- Studio structure exposes a `Launch Desk` with all briefs, story briefs, rider
  profile briefs, glossary batch, asset/approval blockers, and ready-to-publish
  filters.
- `sanity/seed/launch-briefs.json` contains 18 planning documents: 12 stories,
  5 rider profile slots, and 1 glossary batch.
- `pnpm run seed:launch-briefs` can import those cards when a Sanity write token
  is available.
- Tests verify the seed payload shape and that placeholder rider slots do not
  invent real identities.

Status: complete and seeded in production Sanity. CLI verification returned 18
`launchBrief` documents.

### Slice 18: Glossary Starter Import

Move the 50 glossary terms from the launch inventory into Studio while keeping
Japanese review explicit.

Acceptance:

- `glossary` documents include `reviewStatus` so editors can distinguish
  internal Korean/English guidance from fully approved multilingual terms.
- Studio exposes glossary review filters for terms needing Japanese review and
  ready terms.
- `sanity/seed/glossary-starter.json` contains 50 terms from the launch content
  inventory and links them to the glossary Launch Brief.
- `pnpm run seed:glossary` and `pnpm run seed:glossary:cli` are available.
- Tests verify the seed payload count, required Korean/English terms, blank
  Japanese terms, and supported scopes.

Status: complete and seeded in production Sanity. CLI verification returned 50
`glossary` documents with `reviewStatus=jp-review-needed`.

### Slice 19: Editor Writing Guide

Give the non-developer editor a direct article writing guide that complements
the Studio publishing harness.

Acceptance:

- `docs/editor-writing-guide.md` explains the one-page writing workflow from
  Launch Desk to public URL verification.
- The guide includes article skeleton, field-by-field instructions, category
  tone, title patterns, body copy rules, image rules, CTA rules, and publish
  checklist.
- The guide explicitly keeps Korean as the source language and avoids
  unapproved rider identities.
- README, AGENTS, and handoff docs link to the guide.

Status: complete locally.

### Slice 20: Custom Domain Runbook

Prepare the custom domain task so the correct account owner can complete it
without guessing.

Acceptance:

- Current DNS for `magazine.penacova.co.kr` is verified.
- `docs/custom-domain-runbook.md` documents the correct Vercel project, current
  DNS state, desired CNAME, dashboard steps, Sanity CORS follow-up, and
  verification commands.
- The runbook warns not to use the current local Vercel CLI account because it
  lists only the wrong `etehofk1-ops-projects` scope.
- The actual custom domain backlog remains open until Vercel and DNS are changed
  in the correct account.

Status: complete locally. Actual Vercel/DNS changes still require the
`moncrosssport-pixels-projects` account and DNS provider access.

## Later Phases

After Phase 1:

- Phase 2: homepage refinement, article visual rhythm, responsive polish.
- Phase 3: locale switcher and translation workflow.
- Phase 4: SEO polish, launch indexing policy, analytics provider setup.
- Phase 5: content inventory, custom domain, launch checklist.
