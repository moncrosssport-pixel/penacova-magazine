import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MagazineFooter } from '@/components/magazine/MagazineFooter';
import { MagazineMasthead } from '@/components/magazine/MagazineMasthead';
import { isLocale, type Locale } from '@/lib/i18n/locales';
import { formatByline, formatDate, pickLocalized, type LocalizedBlocks } from '@/lib/magazine/format';
import { sanityClient, urlFor } from '@/lib/sanity/client';
import { articleBySlugParams, articleBySlugQuery } from '@/lib/sanity/queries';

type EditorialArticlePageProps = {
  params: {
    locale: string;
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
  category: string;
  heroImage?: SanityImage;
  body?: LocalizedBlocks;
  publishedAt?: string;
  moodVariant?: 'editorial' | 'feature';
  issueNumber?: number;
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

export default async function EditorialArticlePage({
  params,
}: EditorialArticlePageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale;
  const article = await sanityClient.fetch<ArticleDoc | null>(
    articleBySlugQuery(),
    articleBySlugParams(params.slug, 'editorial'),
    { next: { revalidate: 60 } },
  );

  if (!article) {
    notFound();
  }

  const title = pickLocalized(article.title, locale);
  const excerpt = pickLocalized(article.excerpt, locale);
  const body = article.body?.[locale] ?? article.body?.ko;
  const byline = formatByline(article.authors, locale);
  const date = article.publishedAt ? formatDate(article.publishedAt, locale) : null;
  const ctaLabel = pickLocalized(article.cta?.label, locale);
  const ctaHref = getCtaHref(article.cta, locale);
  const heroImageUrl = article.heroImage?.asset?._ref
    ? urlFor(article.heroImage).width(1800).height(860).fit('crop').url()
    : null;

  return (
    <main className="min-h-screen bg-paper text-ink">
      <MagazineMasthead locale={locale} />

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
          <p className="kicker">Editorial</p>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-none tracking-[-0.015em] text-balance sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {excerpt ? <p className="dek mt-6">{excerpt}</p> : null}
          <div className="mt-8 flex flex-wrap gap-3 border-t border-hairline pt-4 font-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            {byline ? <span>{byline}</span> : null}
            {byline && date ? <span className="text-stone-300">·</span> : null}
            {date ? <span>{date}</span> : null}
          </div>
        </header>

        <div className="mx-auto max-w-reading px-6 pb-16 sm:px-10">
          {body ? (
            <div className="article-prose">
              <PortableText value={body as never} />
            </div>
          ) : (
            <p className="font-serif-editorial text-lg leading-loose text-ink-mute">
              This article body is not available yet.
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

      <MagazineFooter />
    </main>
  );
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
