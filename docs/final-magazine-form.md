# Final Magazine Form

## One-Sentence Product

Penacova Magazine is a multilingual editorial magazine for equestrian apparel:
photo-led, quiet, refined, and designed to make riders and collections feel
worth remembering before it asks anyone to shop.

## Product Principles

- Editorial first, commerce second.
- Photography carries the page; UI recedes.
- Penacova Red is an accent, never a large block.
- Korean is the source language; English and Japanese expand reach.
- Cafe24 remains the checkout surface; the magazine links out with UTM tracking.
- Sanity is the editorial source of truth.

## Primary Audience

1. Korean riders and equestrian families.
2. Korean fashion/luxury readers who may not ride yet but understand style.
3. Japanese riders and brand-aware readers.
4. English readers as a brand discovery audience, with commerce routed to KR/JP
   options until an English store exists.

## Information Architecture

The public site is locale-scoped:

```text
/
/ko
/ko/editorial
/ko/editorial/[slug]
/ko/riders
/ko/riders/[slug]
/ko/look
/ko/look/[season]
/ko/heritage
/ko/heritage/[slug]
/ko/guide
/ko/guide/[slug]
/ko/news
/ko/news/[slug]
/ko/stories
/ko/stories/[slug]
/ko/about
/ko/search
/ko/subscribe
```

The same structure should exist for `/en` and `/jp` when translated content is
available.

## Content Pillars

| Pillar | Route | Purpose |
| --- | --- | --- |
| Editorial | `/[locale]/editorial` | Fashion editorials and photo essays around stables, riders, fields, and collections. |
| Rider Interview | `/[locale]/riders` | Interviews with athletes, coaches, club riders, and notable Penacova wearers. |
| Look Book | `/[locale]/look` | Seasonal collection presentation with looks and styling notes. |
| Heritage | `/[locale]/heritage` | Brand craft, material, design, embroidery, workshop, and origin stories. |
| Guide | `/[locale]/guide` | Sizing, care, riding apparel guidance, beginner explainers, and product education. |
| News | `/[locale]/news` | Competitions, events, launches, collaborations, and store updates. |
| Stories | `/[locale]/stories` | Customer riders, styling, field notes, and curated community stories. |

Do not add a broad "lifestyle" category for Phase 1. It dilutes the equestrian
and apparel focus.

## Visual Direction

The visual model is "Vogue-clean":

- Off-white paper background.
- Black ink text.
- Large editorial photography.
- Thin, precise typography.
- Generous whitespace.
- No card-heavy marketing sections.
- No large red UI blocks.
- No ecommerce grid as the primary experience.

The official implementation reference is `Penacova Magazine Design System/`.
Use its `README.md`, `colors_and_type.css`, assets, and `ui_kits/magazine/`
prototype components before inventing new visual patterns.

Suggested palette:

| Role | Color |
| --- | --- |
| Paper | `#fafaf7` |
| Ink | `#0a0a0a` |
| Muted text | `#777777` |
| Hairline | `#dedbd2` |
| Penacova Red | `#E62021` |

Typography direction:

- Masthead/headline: high-contrast serif such as Cormorant Garamond, Playfair
  Display, or a similar licensed/editorial face.
- Korean body: Noto Serif KR or Pretendard depending on the template tone.
- UI/navigation: Inter, Pretendard, or system sans.

## Homepage End State

The homepage should behave like a magazine front page, not a product landing
page.

Required sections:

1. Masthead with locale switcher.
2. Lead story with full-width or dominant photography.
3. Editor's selection: 3 to 5 latest/highlighted stories.
4. Category rails for Editorial, Riders, Look, Heritage, Guide, News, Stories.
5. Quiet newsletter or follow CTA.
6. Footer with brand links, Cafe24 shop links, and legal basics.

The first viewport must show the brand/magazine identity and at least one real
story or image. Avoid placeholder marketing copy once content exists.

## Article Page End State

Every article page should contain:

1. Category label.
2. Title.
3. Dek/excerpt.
4. Hero image with focal point.
5. Byline and publish date.
6. Portable Text body.
7. Pull quotes and images when provided by Sanity.
8. Optional rider references.
9. Optional featured products for rider/look/product-driven articles.
10. Quiet end-of-article CTA to Cafe24.
11. Related stories.
12. Locale alternates and canonical metadata.

Editorial articles may use larger typography, drop caps, and more image rhythm.
Feature articles should be more readable and structured, especially guides and
interviews.

## Commerce Behavior

Commerce must be restrained.

Allowed:

- End-of-article text CTA.
- "Featured in this story" list for rider interviews or look articles.
- Cafe24 links with UTM parameters.
- Collection-level links for look books.

Not allowed for Phase 1:

- Cart inside the magazine.
- Checkout inside the magazine.
- Product cards interrupting body paragraphs.
- Sticky buy bars.
- Large red buttons.
- Cafe24 API coupling.

Locale-specific shop behavior:

- `/ko` CTAs point to `www.penacova.co.kr`.
- `/jp` CTAs point to `penacova.jp`.
- `/en` CTAs may point to KR/JP options or a waitlist until an English store
  exists.

## Sanity Content Model

The CMS should eventually register these document types:

- `article`
- `rider`
- `product`
- `look`
- `collection`
- `glossary`
- `person`

Article fields:

```text
title              localized string
slug               slug
category           editorial | riders | look | heritage | guide | news | stories
excerpt            localized text
heroImage          image with hotspot
body               localized portable text
issueNumber        number
publishedAt        datetime
moodVariant        editorial | feature
authors            references to person
featuredProducts   references to product
relatedRiders      references to rider
translationStatus  per-locale status
seo                localized title/description/og image overrides
cta                localized CTA label + URL fields
```

Rider fields:

```text
name
romanizedName
slug
portrait
discipline
careerYears
club
titles
favoriteProducts
interviews
```

Product fields:

```text
name
slug
image
priceKR
priceJP
cafe24UrlKR
cafe24UrlJP
color
collection
```

Look fields:

```text
number
name
image
products
rider
collection
```

Collection fields:

```text
season
title
looks
products
cafe24CollectionUrlKR
cafe24CollectionUrlJP
```

Glossary fields:

```text
koTerm
enTerm
jpTerm
scope
notes
```

Person fields:

```text
name
role
portrait
bio
```

## Localization Model

Supported locales:

- `ko`: source and default.
- `en`: brand discovery.
- `jp`: Japan market extension.

Rules:

- `/` redirects to `/ko`.
- Do not show untranslated Korean body text inside `/en` or `/jp` as if it were
  translated.
- If a translation is missing, show a clear availability notice and link to the
  Korean version.
- Generate hreflang and canonical tags once SEO work begins.
- Protect glossary terms such as Penacova, rider names, product names, and core
  equestrian vocabulary.

## SEO And Analytics End State

Required:

- Article metadata per locale.
- Canonical URLs.
- `hreflang` alternates.
- Sitemap generation.
- Open Graph image support.
- Article JSON-LD.
- GA4 or equivalent analytics.
- Events for article depth, CTA click, locale switch, newsletter submit, and
  Cafe24 outbound click.

Machine-assisted translations should remain `noindex` until reviewed if search
quality becomes a concern.

## Launch Content Inventory

Minimum public launch inventory:

- 12 Korean articles.
- 5 rider profiles.
- 1 seasonal look book with roughly 12 looks.
- 2 photo-led editorials.
- 30 to 50 glossary terms.
- Functional KR/JP commerce CTAs.
- One newsletter/follow mechanism.

Suggested first month rhythm:

- Week 1: Editorial.
- Week 2: Rider interview.
- Week 3: Look book or Heritage.
- Week 4: Guide or News.
- Week 5 if present: Stories.

## Final Acceptance Criteria

The magazine is ready for public launch when:

- `magazine.penacova.co.kr` points to Vercel.
- `/ko`, `/en`, and `/jp` route correctly.
- `/studio` is usable by editors.
- At least 12 Korean launch stories are published or scheduled.
- At least one article from each core category renders correctly.
- Mobile and desktop layouts are verified.
- Article CTAs include UTM parameters.
- Sanity CORS includes production and preview origins.
- `pnpm test` and `pnpm build` pass.
- Production routes return 200/redirect as expected.
