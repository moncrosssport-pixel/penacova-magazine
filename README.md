# Penacova Magazine

`magazine.penacova.co.kr` — Vogue-style editorial magazine for Penacova equestrian apparel.

- Spec: `../docs/superpowers/specs/2026-04-29-penacova-magazine-design.md`
- Phase 1 plan: `../docs/superpowers/plans/2026-04-29-penacova-magazine-phase1-foundation.md`

## Develop

```bash
pnpm install
pnpm dev          # localhost:3000
```

Studio is at `localhost:3000/studio` (added in Task 7).

## Stack

Next.js 14 · Sanity v3 · Tailwind CSS · Vitest · Vercel

## TODO before production launch

- [ ] DNS: point `magazine.penacova.co.kr` CNAME to `cname.vercel-dns.com`
- [ ] Vercel: add `magazine.penacova.co.kr` as a custom domain on the project
