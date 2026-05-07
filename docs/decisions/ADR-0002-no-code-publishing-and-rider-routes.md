# ADR-0002: No-Code Publishing And Rider Routes

## Status

Accepted

## Context

Penacova Magazine must be manageable by non-developers through Sanity Studio.
Editors should publish by choosing a document type or category, not by knowing
Next.js route precedence.

The `riders` section has two different content shapes:

- rider interview articles
- rider profile documents

If both use `/[locale]/riders/[slug]`, a manager can publish a valid Article
that collides with the Rider profile route.

## Decision

Use separate detail routes:

```text
Rider interview Article -> /[locale]/riders/interviews/[slug]
Rider profile Rider     -> /[locale]/riders/[slug]
```

All ordinary Article categories keep the standard route:

```text
/[locale]/[category]/[slug]
```

Article links must be generated through `getArticleHref()` or
`getArticlePathSegments()` instead of hand-built template strings.

## Consequences

- A manager can publish a Rider Interview Article without creating a Rider
  document.
- A manager can publish a Rider Profile without blocking a Rider Interview
  slug.
- Sitemap, metadata, category teasers, and rider profile interview links all
  use the same route helper.
- Future agents must not change `riders` article detail links back to
  `/[locale]/riders/[slug]` unless the information architecture is redesigned.
