import type { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MagazineFooter } from '@/components/magazine/MagazineFooter';
import { MagazineMasthead } from '@/components/magazine/MagazineMasthead';
import { isLocale, type Locale } from '@/lib/i18n/locales';
import {
  getCategoryMeta,
  isArticleCategory,
  type ArticleCategory,
} from '@/lib/magazine/categories';
import {
  formatByline,
  formatDate,
  pickLocalized,
  type LocalizedBlocks,
} from '@/lib/magazine/format';
import { sanityClient, urlFor } from '@/lib/sanity/client';
import { articleBySlugParams, articleBySlugQuery } from '@/lib/sanity/queries';
import { absoluteUrl, createLocalizedMetadata } from '@/lib/seo/metadata';
import { SITE_NAME } from '@/lib/site';

type ArticlePageProps = {
  params: {
    locale: string;
    category: string;
    slug: string;
  };
};

type SanityImage = {
  asset?: {
    _ref?: string;
  };
};

type ArticleDoc = {
  _id: string;
  title?: Partial<Record<Locale, string>>;
  excerpt?: Partial<Record<Locale, string>>;
  slug: string;
  category: ArticleCategory;
  heroImage?: SanityImage;
  body?: LocalizedBlocks;
  publishedAt?: string;
  moodVariant?: 'editorial' | 'feature';
  issueNumber?: number;
  seo?: {
    title?: Partial<Record<Locale, string>>;
    description?: Partial<Record<Locale, string>>;
    ogImage?: SanityImage;
  };
  cta?: {
    label?: Partial<Record<Locale, string>>;
    urlKR?: string;
    urlJP?: string;
    urlEN?: string;
  };
  authors?: {
    _id: string;
    name?: Partial<Record<Locale, string>>;
    role?: string;
  }[];
};

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  if (!isLocale(params.locale) || !isArticleCategory(params.category)) {
    return {};
  }

  const article = await sanityClient.fetch<ArticleDoc | null>(
    articleBySlugQuery(),
    articleBySlugParams(params.slug, params.category),
    { next: { revalidate: 60 } },
  );

  if (!article) {
    return {};
  }

  const imageSource = article.seo?.ogImage?.asset?._ref
    ? article.seo.ogImage
    : article.heroImage;
  const image = imageSource?.asset?._ref
    ? urlFor(imageSource).width(1200).height(630).fit('crop').url()
    : null;

  return createLocalizedMetadata({
    locale: params.locale,
    pathSegments: [params.category, article.slug],
    title: article.seo?.title ?? article.title,
    description: article.seo?.description ?? article.excerpt,
    fallbackTitle: SITE_NAME,
    type: 'article',
    image,
  });
}

const unavailableCopy: Record<Locale, string> = {
  ko: '아직 기사 본문이 준비되지 않았습니다.',
  en: 'The English version is not available yet.',
  jp: '日本語版はまだ公開されていません。',
};

const koreanLinkCopy: Record<Locale, string> = {
  ko: '한국어로 읽기',
  en: 'Read the Korean original',
  jp: '韓国語の原文を読む',
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  if (!isLocale(params.locale) || !isArticleCategory(params.category)) {
    notFound();
  }

  const locale = params.locale;
  const category = params.category;
  const meta = getCategoryMeta(category);
  const article = await sanityClient.fetch<ArticleDoc | null>(
    articleBySlugQuery(),
    articleBySlugParams(params.slug, category),
    { next: { revalidate: 60 } },
  );

  if (!article) {
    notFound();
  }

  const title = pickLocalized(article.title, locale);
  const excerpt = pickLocalized(article.excerpt, locale);
  const localizedBody = article.body?.[locale];
  const body = localizedBody ?? (locale === 'ko' ? article.body?.ko : undefined);
  const showTranslationNotice = locale !== 'ko' && !localizedBody && Boolean(article.body?.ko);
  const byline = formatByline(article.authors, locale);
  const date = formatDate(article.publishedAt, locale);
  const ctaLabel = pickLocalized(article.cta?.label, locale);
  const ctaHref = getCtaHref(article.cta, locale);
  const heroImageUrl = article.heroImage?.asset?._ref
    ? urlFor(article.heroImage).width(1800).height(860).fit('crop').url()
    : null;

  return (
    <main className="min-h-screen bg-paper text-ink">
      <MagazineMasthead locale={locale} pathSegments={[category, article.slug]} />

      <article>
        {heroImageUrl ? (
          <div className="relative aspect-[21/10] w-full">
            <Image
              src={heroImageUrl}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        ) : (
          <div className="aspect-[21/10] w-full bg-tonal" />
        )}

        <header className="mx-auto max-w-[760px] px-6 py-14 sm:px-10 lg:py-16">
          <p className="kicker">{meta.label}</p>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-none tracking-[-0.015em] text-balance sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {excerpt ? <p className="dek mt-6">{excerpt}</p> : null}
          <div className="mt-8 flex flex-wrap gap-3 border-t border-hairline pt-4 font-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            {byline ? <span>{byline}</span> : null}
            {byline && date ? <span className="text-stone-300">/</span> : null}
            {date ? <span>{date}</span> : null}
          </div>
        </header>

        <div className="mx-auto max-w-reading px-6 pb-16 sm:px-10">
          {showTranslationNotice ? (
            <div className="mb-10 border-y border-hairline py-6">
              <p className="font-serif-editorial text-lg leading-relaxed text-ink-mute">
                {unavailableCopy[locale]}
              </p>
              <Link
                href={`/ko/${category}/${article.slug}`}
                className="mt-4 inline-block font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-penacova no-underline"
              >
                {koreanLinkCopy[locale]} -&gt;
              </Link>
            </div>
          ) : null}

          {body ? (
            <div className="article-prose">
              <PortableText value={body as never} />
            </div>
          ) : showTranslationNotice ? null : (
            <p className="font-serif-editorial text-lg leading-loose text-ink-mute">
              {unavailableCopy[locale]}
            </p>
          )}

          {ctaLabel && ctaHref ? (
            <div className="mt-14 border-t border-hairline pt-8">
              <a
                href={ctaHref}
                className="font-ui text-xs font-semibold uppercase tracking-[0.18em] text-penacova"
              >
                {ctaLabel} -&gt;
              </a>
            </div>
          ) : null}
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            createArticleJsonLd({
              article,
              categoryLabel: meta.label,
              locale,
              path: `/${locale}/${category}/${article.slug}`,
              image: heroImageUrl,
            }),
          ),
        }}
      />

      <MagazineFooter />
    </main>
  );
}

function createArticleJsonLd({
  article,
  categoryLabel,
  locale,
  path,
  image,
}: {
  article: ArticleDoc;
  categoryLabel: string;
  locale: Locale;
  path: string;
  image: string | null;
}) {
  const title = pickLocalized(article.seo?.title ?? article.title, locale) || SITE_NAME;
  const description = pickLocalized(article.seo?.description ?? article.excerpt, locale);
  const authors = article.authors
    ?.map((author) => pickLocalized(author.name, locale))
    .filter(Boolean)
    .map((name) => ({ '@type': 'Person', name }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description || undefined,
    image: image ? [image] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    articleSection: categoryLabel,
    inLanguage: locale === 'jp' ? 'ja-JP' : locale === 'en' ? 'en-US' : 'ko-KR',
    mainEntityOfPage: absoluteUrl(path),
    author: authors?.length ? authors : { '@type': 'Organization', name: SITE_NAME },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };
}

function getCtaHref(cta: ArticleDoc['cta'], locale: Locale) {
  if (!cta) {
    return null;
  }

  if (locale === 'jp') {
    return cta.urlJP ?? cta.urlKR ?? cta.urlEN ?? null;
  }

  if (locale === 'en') {
    return cta.urlEN ?? cta.urlKR ?? cta.urlJP ?? null;
  }

  return cta.urlKR ?? cta.urlJP ?? cta.urlEN ?? null;
}
