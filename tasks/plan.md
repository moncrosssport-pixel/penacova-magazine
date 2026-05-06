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
- Phase 1 seed payload and seed command are prepared.
- Category index pages are implemented at `/[locale]/[category]` for the seven
  magazine pillars.
- Article detail pages use the shared `/[locale]/[category]/[slug]` route.

Not completed:

- Applying the Studio/Content Lake seed requires Sanity CLI login.
- End-to-end article verification with a real published article.

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

Status: route implemented for all seven article categories. Missing-article
404 is expected until content is seeded in Studio.

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

Status: complete locally. Vercel verification follows after push/deploy.

## Later Phases

After Phase 1:

- Phase 2: homepage refinement, article visual rhythm, responsive polish.
- Phase 3: locale switcher and translation workflow.
- Phase 4: SEO automation, sitemap, hreflang, OG, JSON-LD, analytics.
- Phase 5: content inventory, custom domain, launch checklist.
