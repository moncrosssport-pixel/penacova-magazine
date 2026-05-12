# Penacova Magazine Agent Harness

This repository is the source of truth for the Penacova Magazine build. It is a
Next.js + Sanity editorial magazine, not a shop frontend and not a Cafe24 skin.

## Startup Checklist

Before changing code, read these files in order:

1. `README.md`
2. `SPEC.md`
3. `docs/final-magazine-form.md`
4. `docs/editorial-publishing-harness.md`
5. `docs/editor-writing-guide.md`
6. `docs/custom-domain-runbook.md`
7. `docs/studio-visual-verification.md`
8. `docs/launch-story-workbook.md`
9. `Penacova Magazine Design System/README.md`
10. `Penacova Magazine Design System/SKILL.md`
11. `docs/agent-harness.md`
12. `tasks/plan.md`
13. `tasks/todo.md`

Then run:

```bash
git status --short --branch
pnpm test
```

For implementation work that affects runtime behavior, also run:

```bash
pnpm build
```

For launch QA work, also run:

```bash
pnpm check:launch
```

This command intentionally exits non-zero until launch blockers are cleared.
If the local Windows Node runtime reports a Sanity certificate verification
error, rerun it with `NODE_OPTIONS=--use-system-ca`.

## Current Project Facts

- GitHub repository: `moncrosssport-pixel/penacova-magazine`
- Production URL: `https://penacova-magazine.vercel.app`
- Optional custom subdomain: `magazine.penacova.co.kr`
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
- Sanity seed/import scripts may use `SANITY_AUTH_TOKEN`, `SANITY_API_TOKEN`, or
  `SANITY_WRITE_TOKEN`. Never commit a real token.
- Cafe24 integration is link-only for now. Do not add cart, checkout, or Cafe24
  API coupling unless a new spec asks for it.
- Do not move Cafe24 hosting, the root domain, shop DNS, or nameservers for the
  magazine. Only the optional `magazine` subdomain record may change if a
  branded-domain launch is explicitly required.
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
- Sanity schemas for Article, Collection, Glossary, Launch Brief, Look, Person,
  Product, and Rider, plus the Site Settings singleton
- Sanity read client and GROQ queries
- `/[locale]/[category]` category index route for the seven magazine pillars
- `/[locale]/[category]/[slug]` shared article detail route for the seven
  magazine pillars
- `/[locale]/look/[season]` collection look book route
- `/[locale]/subscribe` newsletter/follow capture route
- `/[locale]/riders/[slug]` rider profile route
- `/[locale]/riders/interviews/[slug]` rider interview article route
- Basic SEO metadata, canonical/alternate links, sitemap, robots, Open Graph,
  and article JSON-LD wiring
- Path-preserving locale switcher links in the magazine masthead
- No-code publishing harness for Sanity editors
- Typed Studio publishing manifest and tests for no-code category/template
  alignment
- Provider-neutral analytics events and no-code newsletter/follow settings
- Launch Desk planning cards for the first story, rider profile, and glossary
  publishing batch
- Launch story workbook that maps the first 12 story briefs to Studio Article
  fields, routes, assets, approvals, and writing angles
- Public editor workbook route at `/[locale]/launch-workbook`, marked noindex
- Public editor launch readiness route at `/[locale]/launch-readiness`, marked
  noindex
- 50 glossary starter terms seeded in Studio with Japanese review still needed
- Direct editor writing guide for self-serve article drafting
- Local `/studio` visual shell verification documented; authenticated Studio
  menu verification still requires a Sanity member browser session
- Custom domain runbook with current DNS state and correct Vercel scope
- Production launch readiness checker at `pnpm check:launch`

Not yet implemented:

- Launch content
- Optional custom subdomain connection

## Done Criteria

A task is done only when:

- The relevant docs or tasks are updated if the scope changed.
- `git status` is reviewed before editing and before finishing.
- `pnpm test` passes.
- `pnpm build` passes for runtime-impacting changes.
- The live or local route is checked when the task affects pages or deployment.
- Changes are committed with a clear message and pushed when the user asks for
  GitHub continuity.
