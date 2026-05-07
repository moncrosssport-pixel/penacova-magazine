import type { ArticleCategory } from '@/lib/magazine/categories';

export function articleBySlugQuery(): string {
  return `
    *[
      _type == "article" &&
      slug.current == $slug &&
      category == $category &&
      defined(publishedAt) &&
      publishedAt <= now() &&
      !(_id in path("drafts.**"))
    ][0]{
      _id,
      title,
      excerpt,
      "slug": slug.current,
      category,
      heroImage,
      body,
      publishedAt,
      moodVariant,
      issueNumber,
      translationStatus,
      seo,
      cta,
      "authors": authors[]->{
        _id,
        name,
        role,
        portrait
      },
      "featuredProducts": featuredProducts[]->{
        _id,
        name,
        image,
        priceKR,
        priceJP,
        cafe24UrlKR,
        cafe24UrlJP
      },
      "relatedRiders": relatedRiders[]->{
        _id,
        name,
        romanizedName,
        slug,
        portrait,
        discipline
      }
    }
  `;
}

export function articleBySlugParams(slug: string, category: ArticleCategory) {
  return { slug, category };
}

export function articlesByCategoryQuery(): string {
  return `
    *[
      _type == "article" &&
      category == $category &&
      defined(slug.current) &&
      defined(publishedAt) &&
      publishedAt <= now() &&
      !(_id in path("drafts.**"))
    ] | order(publishedAt desc, _createdAt desc)[0...24]{
      _id,
      title,
      excerpt,
      "slug": slug.current,
      category,
      heroImage,
      publishedAt,
      moodVariant,
      issueNumber,
      translationStatus,
      "authors": authors[]->{
        _id,
        name,
        role,
        portrait
      }
    }
  `;
}

export function articlesByCategoryParams(category: ArticleCategory) {
  return { category };
}

export function sitemapArticlesQuery(): string {
  return `
    *[
      _type == "article" &&
      defined(slug.current) &&
      defined(category) &&
      defined(publishedAt) &&
      publishedAt <= now() &&
      !(_id in path("drafts.**"))
    ]{
      _id,
      "slug": slug.current,
      category,
      publishedAt,
      _updatedAt
    }
  `;
}
