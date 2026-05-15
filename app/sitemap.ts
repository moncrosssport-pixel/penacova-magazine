import type { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/i18n/locales';
import {
  type ArticleCategory,
  getArticlePathSegments,
  isArticleCategory,
} from '@/lib/magazine/categories';
import { PUBLIC_MAGAZINE_CATEGORY_IDS } from '@/lib/magazine/navigation';
import { sanityClient } from '@/lib/sanity/client';
import {
  sitemapArticlesQuery,
  sitemapCollectionsQuery,
  sitemapRidersQuery,
} from '@/lib/sanity/queries';
import { absoluteUrl, localePath } from '@/lib/seo/metadata';

export const revalidate = 300;

const sitemapClient = sanityClient.withConfig({ useCdn: false });
const sitemapFetchOptions = { cache: 'no-store' } as const;

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

type SitemapCollection = {
  _id: string;
  slug: string;
  _updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes = LOCALES.flatMap((locale) => [
    createEntry(localePath(locale), now, 'daily', 0.9),
    createEntry(localePath(locale, ['subscribe']), now, 'monthly', 0.5),
    ...PUBLIC_MAGAZINE_CATEGORY_IDS.map((categoryId) =>
      createEntry(localePath(locale, [categoryId]), now, 'daily', 0.7),
    ),
  ]);

  const articles = await sitemapClient.fetch<SitemapArticle[]>(
    sitemapArticlesQuery(),
    {},
    sitemapFetchOptions,
  );
  const riders = await sitemapClient.fetch<SitemapRider[]>(
    sitemapRidersQuery(),
    {},
    sitemapFetchOptions,
  );
  const collections = await sitemapClient.fetch<SitemapCollection[]>(
    sitemapCollectionsQuery(),
    {},
    sitemapFetchOptions,
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
  const collectionRoutes = collections.flatMap((collection) =>
    LOCALES.map((locale) =>
      createEntry(
        localePath(locale, ['look', collection.slug]),
        collection._updatedAt ?? now,
        'weekly',
        0.7,
      ),
    ),
  );

  return [...staticRoutes, ...articleRoutes, ...riderRoutes, ...collectionRoutes];
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
