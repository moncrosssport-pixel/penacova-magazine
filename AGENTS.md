# Penacova Magazine Agent Harness

This repository is the source of truth for the Penacova Magazine build. It is a
Next.js + Sanity editorial magazine, not a shop frontend and not a Cafe24 skin.

## Startup Checklist

Before changing code, read these files in order:

1. `README.md`
2. `SPEC.md`
3. `docs/final-magazine-form.md`
4. `Penacova Magazine Design System/README.md`
5. `Penacova Magazine Design System/SKILL.md`
6. `docs/agent-harness.md`
7. `tasks/plan.md`
8. `tasks/todo.md`

Then run:

```bash
git status --short --branch
pnpm test
```

For implementation work that affects runtime behavior, also run:

```bash
pnpm build
```

## Current Project Facts

- GitHub repository: `moncrosssport-pixel/penacova-magazine`
- Production URL: `https://penacova-magazine.vercel.app`
- Intended custom domain: `magazine.penacova.co.kr`
- Sanity Project ID: `6pelmu7l`
- Sanity dataset: `production`
- Sanity Studio route: `/studio`
- Locale routes: `/ko`, `/en`, `/jp`
- Default locale: `ko`
- Design system: `Penacova Magazine Design System/`

The correct GitHub/Vercel ownership is `moncrosssport-pixel`. Do not assume any
`etehofk` Vercel scope for deployment.

## Technical Guardrails

- Keep this stack unless a decision document explicitly changes it:
  - Next.js `14.2.x`
  - React `18.x`
  - Sanity `3.99.x`
  - `next-sanity` `9.12.x`
  - Tailwind CSS `3.x`
  - Vitest
- Do not upgrade to Sanity 5 or `next-sanity` 12 while the app remains on
  Next.js 14 and React 18. That combination has already broken builds.
- Keep `/studio` out of locale middleware redirects.
- Keep at least a minimal `/[locale]/page.tsx` whenever `/` redirects to `/ko`.
- Public Sanity settings may have safe defaults in code. Do not put write tokens
  or private credentials in client-side `NEXT_PUBLIC_*` variables.
- Cafe24 integration is link-only for now. Do not add cart, checkout, or Cafe24
  API coupling unless a new spec asks for it.
- For visual work, use `Penacova Magazine Design System/` as the official
  source. Copy design values into production code; do not ship the prototype
  JSX files directly.

## Current Implementation State

Implemented:

- Next.js 14 App Router project
- Locale helpers and middleware
- `/` redirects to `/ko`
- Minimal `/[locale]` home shell
- Embedded Sanity Studio at `/studio`
- Sanity public defaults in `sanity/env.ts`
- Sanity schemas for Article, Collection, Glossary, Look, Person, Product, and
  Rider
- Sanity read client and GROQ queries
- `/[locale]/editorial/[slug]` article route
- `/[locale]/[category]` category index route for the seven magazine pillars

Not yet implemented:

- Applying the prepared Sanity seed requires a logged-in Sanity CLI session
- End-to-end verification with a real published article
- Locale switcher UI
- SEO automation
- Launch content
- Custom domain

## Done Criteria

A task is done only when:

- The relevant docs or tasks are updated if the scope changed.
- `git status` is reviewed before editing and before finishing.
- `pnpm test` passes.
- `pnpm build` passes for runtime-impacting changes.
- The live or local route is checked when the task affects pages or deployment.
- Changes are committed with a clear message and pushed when the user asks for
  GitHub continuity.
