# Penacova Magazine

`magazine.penacova.co.kr` — Vogue-style editorial magazine for Penacova equestrian apparel.

- Final product form: `docs/final-magazine-form.md`
- Agent handoff harness: `AGENTS.md`
- Design system: `Penacova Magazine Design System/README.md`
- Current implementation spec: `SPEC.md`
- Current task plan: `tasks/plan.md`
- Current task checklist: `tasks/todo.md`
- Seed content: `docs/seed-content.md`

## Develop

```bash
pnpm install
pnpm dev          # localhost:3000
```

Home is at `localhost:3000/ko`; `/` redirects there.
Category indexes are available at routes such as `localhost:3000/ko/editorial`.
Studio is at `localhost:3000/studio` (added in Task 7).
Sanity defaults are built in for the public project settings; `.env.local` can override them.

Seed the Phase 1 article and glossary after Sanity CLI login:

```bash
pnpm run seed:sanity
```

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
- Intended custom domain: `magazine.penacova.co.kr`

The correct GitHub/Vercel ownership is `moncrosssport-pixel`. Do not use an
`etehofk` Vercel scope for this project.

## TODO before production launch

- [ ] DNS: point `magazine.penacova.co.kr` CNAME to `cname.vercel-dns.com`
- [ ] Vercel: add `magazine.penacova.co.kr` as a custom domain on the project
