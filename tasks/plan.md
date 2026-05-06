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

Not completed:

- Sanity schemas.
- Sanity read client.
- GROQ queries.
- Article page rendering.
- Studio content seed.
- End-to-end article verification.

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

### Slice 3: Sanity Read Client And Queries

Add:

- `lib/sanity/client.ts`
- `lib/sanity/queries.ts`
- `lib/sanity/queries.test.ts`

Acceptance:

- Unit tests verify query construction and params.
- `pnpm test` passes.
- `pnpm build` passes.

### Slice 4: Editorial Article Route

Add:

- `app/[locale]/editorial/[slug]/page.tsx`
- Portable Text rendering.
- Sanity image URL handling.
- `notFound()` behavior for invalid locale or missing article.

Acceptance:

- A published Sanity article renders at `/ko/editorial/[slug]`.
- Missing article returns 404.
- `pnpm test` passes.
- `pnpm build` passes.

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

## Later Phases

After Phase 1:

- Phase 2: homepage, category pages, visual design, responsive polish.
- Phase 3: locale switcher and translation workflow.
- Phase 4: SEO automation, sitemap, hreflang, OG, JSON-LD, analytics.
- Phase 5: content inventory, custom domain, launch checklist.
