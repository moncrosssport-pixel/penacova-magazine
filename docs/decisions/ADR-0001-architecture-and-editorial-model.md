# ADR-0001: Architecture And Editorial Model

## Status

Accepted.

## Context

Penacova needs a magazine that builds brand value around equestrian apparel,
riders, and seasonal collections. The site should not behave like another shop
front. It should be easy for editors to publish, easy to deploy, and simple
enough for a small team to maintain.

## Decision

Use a custom Next.js 14 App Router frontend deployed on Vercel, with Sanity as
the headless CMS and GitHub as the source-control handoff surface.

Use a link-only commerce model:

- Korean CTAs link to the Korean Cafe24 shop.
- Japanese CTAs link to the Japanese Cafe24 shop.
- English CTAs link to available KR/JP options or a waitlist.

Do not add a first-party cart, checkout, member system, or Cafe24 API coupling
for Phase 1.

## Consequences

Positive:

- Editorial design remains flexible.
- The shop remains stable and untouched.
- The CMS is approachable for non-developer editors.
- Vercel + GitHub gives future agents a clean continuation path.

Tradeoffs:

- Product data is not automatically synchronized from Cafe24.
- CTA performance depends on analytics and UTM discipline.
- EN commerce remains imperfect until an English store exists.

## Guardrails

- Keep Sanity v3 / `next-sanity` v9 while using Next.js 14 and React 18.
- Keep Sanity Studio at `/studio`.
- Keep public reading routes locale-scoped under `/ko`, `/en`, and `/jp`.
- Keep commerce quiet and article-ending by default.
