import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleTeaser } from '@/components/magazine/ArticleTeaser';
import { MagazineFooter } from '@/components/magazine/MagazineFooter';
import { MagazineMasthead } from '@/components/magazine/MagazineMasthead';
import { isLocale, type Locale } from '@/lib/i18n/locales';
import {
  getArticleHref,
  getCategoryMeta,
  isArticleCategory,
  type ArticleCategory,
} from '@/lib/magazine/categories';
import {
  formatByline,
  formatDate,
  pickLocalized,
} from '@/lib/magazine/format';
import {
  koreanOriginalLabel,
  teaserLocaleFor,
  type TranslationStatusMap,
} from '@/lib/magazine/translation';
import { sanityClient, urlFor } from '@/lib/sanity/client';
import {
  articlesByCategoryParams,
  articlesByCategoryQuery,
} from '@/lib/sanity/queries';
import { createLocalizedMetadata } from '@/lib/seo/metadata';

type CategoryPageProps = {
  params: {
    locale: string;
    category: string;
  };
};

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  if (!isLocale(params.locale) || !isArticleCategory(params.category)) {
    return {};
  }

  const meta = getCategoryMeta(params.category);

  return createLocalizedMetadata({
    locale: params.locale,
    pathSegments: [params.category],
    title: meta.title,
    description: meta.dek,
    fallbackTitle: meta.label,
  });
}

type SanityImage = {
  asset?: {
    _ref?: string;
  };
};

type CategoryArticle = {
  _id: string;
  title?: Partial<Record<Locale, string>>;
  excerpt?: Partial<Record<Locale, string>>;
  slug: string;
  category: ArticleCategory;
  heroImage?: SanityImage;
  publishedAt?: string;
  moodVariant?: 'editorial' | 'feature';
  issueNumber?: number;
  translationStatus?: TranslationStatusMap;
  authors?: {
    _id: string;
    name?: Partial<Record<Locale, string>>;
    role?: string;
  }[];
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  if (!isLocale(params.locale) || !isArticleCategory(params.category)) {
    notFound();
  }

  const locale = params.locale;
  const category = params.category;
  const meta = getCategoryMeta(category);
  const articles = await sanityClient.fetch<CategoryArticle[]>(
    articlesByCategoryQuery(),
    articlesByCategoryParams(category),
    { next: { revalidate: 60 } },
  );
  const [lead, ...rest] = articles;
  const leadLocale = lead
    ? teaserLocaleFor(locale, lead.translationStatus)
    : locale;

  return (
    <main className="min-h-screen bg-paper text-ink">
      <MagazineMasthead locale={locale} pathSegments={[category]} />

      <header className="border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
          <p className="kicker">Penacova Magazine</p>
          <h1 className="mt-5 font-display text-6xl font-semibold leading-none tracking-[-0.015em] text-balance sm:text-7xl lg:text-8xl">
            {pickLocalized(meta.title, locale) || meta.label}
          </h1>
          <p className="dek mt-6 max-w-3xl">{pickLocalized(meta.dek, locale)}</p>
        </div>
      </header>

      <section className="mx-auto max-w-content px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        {lead ? (
          <ArticleTeaser
            href={getArticleHref(locale, lead.category, lead.slug)}
            kicker={articleKicker(meta.label, locale, lead.translationStatus)}
            title={pickLocalized(lead.title, leadLocale) || 'Untitled'}
            excerpt={pickLocalized(lead.excerpt, leadLocale)}
            byline={formatByline(lead.authors, leadLocale)}
            date={formatDate(lead.publishedAt, leadLocale)}
            imageUrl={getImageUrl(lead.heroImage, true)}
            priority
            lead
          />
        ) : (
          <div className="border-y border-hairline py-16 text-center lg:py-24">
            <p className="kicker">{meta.label}</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-[-0.015em] text-balance">
              {pickLocalized(meta.empty, locale)}
            </h2>
            <p className="mx-auto mt-5 max-w-xl font-serif-editorial text-lg leading-relaxed text-ink-mute">
              magazine.penacova.co.kr
            </p>
          </div>
        )}

        {rest.length ? (
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {rest.map((article, index) => {
              const articleLocale = teaserLocaleFor(locale, article.translationStatus);

              return (
                <ArticleTeaser
                  key={article._id}
                  href={getArticleHref(locale, article.category, article.slug)}
                  kicker={articleKicker(meta.label, locale, article.translationStatus)}
                  title={pickLocalized(article.title, articleLocale) || 'Untitled'}
                  excerpt={pickLocalized(article.excerpt, articleLocale)}
                  byline={formatByline(article.authors, articleLocale)}
                  date={formatDate(article.publishedAt, articleLocale)}
                  imageUrl={getImageUrl(article.heroImage, false)}
                  priority={index < 2}
                />
              );
            })}
          </div>
        ) : null}
      </section>

      <MagazineFooter />
    </main>
  );
}

function getImageUrl(image: SanityImage | undefined, lead: boolean) {
  if (!image?.asset?._ref) {
    return null;
  }

  return lead
    ? urlFor(image).width(1600).height(1000).fit('crop').url()
    : urlFor(image).width(900).height(1125).fit('crop').url();
}

function articleKicker(
  label: string,
  locale: Locale,
  statuses: TranslationStatusMap | undefined,
) {
  return teaserLocaleFor(locale, statuses) === locale
    ? label
    : `${label} / ${koreanOriginalLabel[locale]}`;
}
