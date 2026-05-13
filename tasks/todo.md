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
- [x] Add no-code editorial publishing harness.
- [x] Build collection look book pages.
- [x] Add analytics events for reading depth and outbound Cafe24 CTAs.
- [x] Add newsletter/follow embed.
- [x] Draft launch content inventory for 12 stories, 5 riders, and 50 glossary terms.
- [x] Add Launch Desk planning cards for no-code Studio launch management.
- [x] Import 50 glossary starter terms into production Sanity.
- [x] Add direct editor writing guide for self-serve article drafting.
- [x] Prepare custom domain runbook and verify current DNS state.
- [x] Add production launch readiness checker.
- [x] Re-authenticate Vercel CLI to `moncrosssport-pixels-projects`.
- [x] Add `magazine.penacova.co.kr` to the Vercel project.
- [x] Add custom domain origin to Sanity CORS.
- [x] Clarify that `magazine.penacova.co.kr` is an optional subdomain-only
      setup, not a Cafe24/root DNS migration.
- [x] Add an automated Studio publishing manifest test so article templates,
      category menus, and Launch Desk filters stay aligned.
- [x] Verify local `/studio` shell reaches the Sanity login provider screen.
- [x] Document the remaining authenticated Studio menu visual check.
- [x] Add Launch Brief -> Article source reference for launch story tracking.
- [x] Add launch story workbook for the first 12 Studio-authored articles.
- [x] Add public noindex `/[locale]/launch-workbook` editor route.
- [x] Add public noindex `/[locale]/launch-readiness` manager route.
- [x] Add HyperFrames-backed pinned fullscreen film hero to the locale homepage.
- [x] Add click-to-enter real fullscreen control for the homepage film.
- [x] Start the homepage film autoplay on page entry.
- [x] Compact the magazine masthead for the video-led homepage.
- [x] Add homepage hero video and poster assets under `public/media/`.

## Progress Estimate

- Phase 1 technical foundation: about 97% complete.
- Final public launch: about 61% complete.
- Main blockers: real hero image upload for the seed article, launch content,
  translation workflow, real newsletter provider connection, custom analytics
  provider setup, and final QA. The magazine subdomain is optional unless a
  branded-domain launch is required.

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

- [ ] Visually verify the no-code Studio publishing menu in a logged-in Sanity
      member browser session.
- [x] Add code-level guardrails for the no-code Studio publishing menu.
- [x] Seed Launch Desk planning cards into production Sanity.
- [ ] Optional: if the branded magazine URL is needed, point only the
      `magazine` subdomain to Vercel with `A magazine -> 76.76.21.21`; do not
      move root, shop, Cafe24 hosting, or nameservers.
- [ ] Write and publish 12 Korean launch stories from the content inventory.
- [ ] Create and publish 5 real rider profiles from approved names/assets.
- [ ] Complete Japanese review for glossary starter terms and mark approved terms `Ready`.
