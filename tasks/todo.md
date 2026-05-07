# Todo

## Completed

- [x] Initialize Next.js 14 App Router project.
- [x] Configure Tailwind, TypeScript, ESLint, and pnpm scripts.
- [x] Configure Vitest and locale helper tests.
- [x] Add locale constants for `ko`, `en`, and `jp`.
- [x] Add middleware redirect from `/` to `/ko`.
- [x] Connect GitHub repository at `moncrosssport-pixel/penacova-magazine`.
- [x] Connect Vercel production deployment.
- [x] Embed Sanity Studio at `/studio`.
- [x] Add Sanity public defaults for project `6pelmu7l`.
- [x] Add minimal `/[locale]` home shell so production is not a public 404.
- [x] Add repo-local agent harness and final magazine form documentation.
- [x] Add repo-local Penacova Magazine design system as the official visual source.
- [x] Replace the temporary locale home shell with a design-system-based magazine homepage shell.
- [x] Build category index pages.
- [x] Build shared article detail pages for all magazine categories.
- [x] Add SEO metadata, sitemap, hreflang, OG images, and JSON-LD wiring.
- [x] Add path-preserving locale switcher links.
- [x] Add token-based Sanity seed harness.
- [x] Add translation status handling for article pages and teasers.
- [x] Build rider detail pages.

## Progress Estimate

- Phase 1 technical foundation: about 97% complete.
- Final public launch: about 42% complete.
- Main blockers: real hero image upload for the seed article, launch content,
  translation workflow, rider/look-specific surfaces, analytics,
  newsletter/follow capture, and custom domain setup.

## Next

- [x] Create `sanity/helpers/localizedField.ts` or equivalent helper module.
- [x] Create `sanity/schemas/glossary.ts`.
- [x] Create `sanity/schemas/person.ts`.
- [x] Create `sanity/schemas/collection.ts`.
- [x] Create `sanity/schemas/product.ts`.
- [x] Create `sanity/schemas/rider.ts`.
- [x] Create `sanity/schemas/look.ts`.
- [x] Create `sanity/schemas/article.ts`.
- [x] Register all schemas in `sanity/schema.ts`.
- [x] Verify Studio schema compiles with all document types.
- [x] Add `@sanity/client`, `@portabletext/react`, and `@sanity/image-url` when
      needed by the article route.
- [x] Create `lib/sanity/client.ts`.
- [x] Create `lib/sanity/queries.ts`.
- [x] Add query unit tests.
- [x] Create `/[locale]/editorial/[slug]` route.
- [x] Prepare Phase 1 Sanity seed payload and command.
- [x] Seed one Korean editorial article in Sanity.
- [x] Verify the seeded article locally.
- [x] Verify the seeded article on Vercel.

## Launch Backlog

- [ ] Build look book pages.
- [ ] Add analytics events for reading depth and outbound Cafe24 CTAs.
- [ ] Add newsletter/follow embed.
- [ ] Add custom domain `magazine.penacova.co.kr`.
- [ ] Prepare 12 Korean launch stories.
- [ ] Prepare 5 rider profiles.
- [ ] Prepare 30 to 50 glossary entries.
