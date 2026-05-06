export type ArticleCategory =
  | 'editorial'
  | 'riders'
  | 'look'
  | 'heritage'
  | 'guide'
  | 'news'
  | 'stories';

export function articleBySlugQuery(): string {
  return `
    *[_type == "article" && slug.current == $slug && category == $category][0]{
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
