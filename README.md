# Penacova Magazine

`magazine.penacova.co.kr` — Vogue-style editorial magazine for Penacova equestrian apparel.

- Final product form: `docs/final-magazine-form.md`
- Editorial publishing harness: `docs/editorial-publishing-harness.md`
- Editor writing guide: `docs/editor-writing-guide.md`
- Optional magazine subdomain runbook: `docs/custom-domain-runbook.md`
- Studio visual verification: `docs/studio-visual-verification.md`
- Agent handoff harness: `AGENTS.md`
- Design system: `Penacova Magazine Design System/README.md`
- Current implementation spec: `SPEC.md`
- Current task plan: `tasks/plan.md`
- Current task checklist: `tasks/todo.md`
- Seed content: `docs/seed-content.md`
- Launch content inventory: `docs/launch-content-inventory.md`

## Develop

```bash
pnpm install
pnpm dev          # localhost:3000
pnpm check:launch # production launch readiness check
```

If local Windows Node reports a Sanity certificate verification error, rerun
the launch check with `$env:NODE_OPTIONS='--use-system-ca'`.

Home is at `localhost:3000/ko`; `/` redirects there.
Category indexes are available at routes such as `localhost:3000/ko/editorial`.
Article detail pages are available at routes such as
`localhost:3000/ko/editorial/quiet-morning` after content is published.
Rider interview article pages use
`localhost:3000/ko/riders/interviews/[slug]`; rider profile pages use
`localhost:3000/ko/riders/[slug]`.
Collection look book pages are available at routes such as
`localhost:3000/ko/look/ss26` after collection content is published.
Subscribe/follow capture is available at `localhost:3000/ko/subscribe` and in
the homepage newsletter section.
Studio is at `localhost:3000/studio` (added in Task 7).
SEO utility routes are available at `localhost:3000/sitemap.xml` and
`localhost:3000/robots.txt`.
Sanity defaults are built in for the public project settings; `.env.local` can override them.
Site-level newsletter/follow settings are managed by the singleton Sanity
document `site-settings`. Launch story/rider/glossary planning cards are
managed as `launchBrief` documents in Studio's Launch Desk.

Seed the Phase 1 article and glossary after either Sanity CLI login as a
project member or a project write token:

```powershell
$env:SANITY_AUTH_TOKEN="<token>"
pnpm run seed:sanity
```

Seed the Launch Desk planning cards for the first 12 stories, 5 rider profile
slots, and glossary batch:

```powershell
$env:SANITY_AUTH_TOKEN="<token>"
pnpm run seed:launch-briefs
```

Seed the first 50 glossary terms for Studio review:

```powershell
$env:SANITY_AUTH_TOKEN="<token>"
pnpm run seed:glossary
```

Do not commit real Sanity tokens. The legacy CLI import command remains
available as `pnpm run seed:sanity:cli` when the local Sanity CLI account is a
member of project `6pelmu7l`. The matching CLI command for Launch Desk cards is
`pnpm run seed:launch-briefs:cli`; for the glossary starter set use
`pnpm run seed:glossary:cli`.

## Design system

The official visual source is `Penacova Magazine Design System/`.

- `colors_and_type.css` contains the canonical color/type tokens.
- `assets/` contains logo and favicon sources.
- `ui_kits/magazine/` contains prototype components for the magazine homepage,
  article page, footer, newsletter, and story cards.

Production code should adapt those references into Next.js/TypeScript rather
than copy prototype JSX directly.

## Stack

Next.js 14 · Sanity v3 · Tailwind CSS · Vitest · Vercel

## Project facts

- GitHub: `moncrosssport-pixel/penacova-magazine`
- Production: `https://penacova-magazine.vercel.app`
- Sanity project ID: `6pelmu7l`
- Sanity dataset: `production`
- Optional custom subdomain: `magazine.penacova.co.kr`

The correct GitHub/Vercel ownership is `moncrosssport-pixel`. Do not use an
`etehofk` Vercel scope for this project.

## TODO before production launch

- [x] Vercel: add `magazine.penacova.co.kr` as a custom domain on the project
- [ ] Optional custom subdomain: only if `magazine.penacova.co.kr` should open
      this magazine, change the `magazine` subdomain record to
      `A magazine -> 76.76.21.21`. Do not move the root domain or shop DNS.
- [x] Sanity: add `https://magazine.penacova.co.kr` as an allowed CORS origin
- [ ] Run `pnpm check:launch` and clear all blockers
