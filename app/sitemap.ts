import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n/locales';
import {
  MAGAZINE_CATEGORIES,
  type ArticleCategory,
  getArticlePathSegments,
  isArticleCategory,
} from '@/lib/magazine/categories';
import { sanityClient } from '@/lib/sanity/client';
import { sitemapArticlesQuery, sitemapRidersQuery } from '@/lib/sanity/queries';
import { absoluteUrl, localePath } from '@/lib/seo/metadata';

export const revalidate = 300;

const sitemapClient = sanityClient.withConfig({ useCdn: false });

type SitemapArticle = {
  _id: string;
  slug: string;
  category: string;
  publishedAt?: string;
  _updatedAt?: string;
};

type SitemapRider = {
  _id: string;
  slug: string;
  _updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = LOCALES.flatMap((locale) => [
    createEntry(localePath(locale), now, 'daily', 0.9),
    ...MAGAZINE_CATEGORIES.map((category) =>
      createEntry(localePath(locale, [category.id]), now, 'daily', 0.7),
    ),
  ]);

  const articles = await sitemapClient.fetch<SitemapArticle[]>(
    sitemapArticlesQuery(),
    {},
    { next: { revalidate } },
  );
  const riders = await sitemapClient.fetch<SitemapRider[]>(
    sitemapRidersQuery(),
    {},
    { next: { revalidate } },
  );
  const articleRoutes = articles
    .filter(
      (article): article is SitemapArticle & { category: ArticleCategory } =>
        isArticleCategory(article.category),
    )
    .flatMap((article) =>
      LOCALES.map((locale) =>
        createEntry(
          localePath(locale, getArticlePathSegments(article.category, article.slug)),
          article._updatedAt ?? article.publishedAt ?? now,
          'weekly',
          0.8,
        ),
      ),
    );
  const riderRoutes = riders.flatMap((rider) =>
    LOCALES.map((locale) =>
      createEntry(
        localePath(locale, ['riders', rider.slug]),
        rider._updatedAt ?? now,
        'weekly',
        0.7,
      ),
    ),
  );

  return [...staticRoutes, ...articleRoutes, ...riderRoutes];
}

function createEntry(
  path: string,
  lastModified: string | Date,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number,
) {
  return {
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  };
}
