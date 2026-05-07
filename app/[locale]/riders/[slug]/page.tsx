import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArticleTeaser } from '@/components/magazine/ArticleTeaser';
import { MagazineFooter } from '@/components/magazine/MagazineFooter';
import { MagazineMasthead } from '@/components/magazine/MagazineMasthead';
import { isLocale, type Locale } from '@/lib/i18n/locales';
import { getArticleHref, type ArticleCategory } from '@/lib/magazine/categories';
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
import { riderBySlugParams, riderBySlugQuery } from '@/lib/sanity/queries';
import { absoluteUrl, createLocalizedMetadata } from '@/lib/seo/metadata';
import { SITE_NAME } from '@/lib/site';

type RiderPageProps = {
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

type RiderTitle = Partial<Record<Locale, string>> & {
  _key?: string;
  _type?: string;
};

type RiderInterview = {
  _id: string;
  title?: Partial<Record<Locale, string>>;
  excerpt?: Partial<Record<Locale, string>>;
  slug: string;
  category: ArticleCategory;
  heroImage?: SanityImage;
  publishedAt?: string;
  moodVariant?: 'editorial' | 'feature';
  translationStatus?: TranslationStatusMap;
  authors?: {
    _id: string;
    name?: Partial<Record<Locale, string>>;
    role?: string;
  }[];
};

type RiderProduct = {
  _id: string;
  name?: Partial<Record<Locale, string>>;
  slug?: string;
  image?: SanityImage;
  priceKR?: number;
  priceJP?: number;
  cafe24UrlKR?: string;
  cafe24UrlJP?: string;
  color?: string;
};

type RiderDoc = {
  _id: string;
  name?: Partial<Record<Locale, string>>;
  romanizedName?: string;
  slug: string;
  portrait?: SanityImage;
  discipline?: 'dressage' | 'jumping' | 'eventing' | 'other';
  careerYears?: number;
  club?: string;
  titles?: RiderTitle[];
  favoriteProducts?: RiderProduct[];
  interviews?: RiderInterview[];
};

const disciplineLabel: Record<NonNullable<RiderDoc['discipline']>, string> = {
  dressage: 'Dressage',
  jumping: 'Show Jumping',
  eventing: 'Eventing',
  other: 'Riding',
};

export async function generateMetadata({ params }: RiderPageProps): Promise<Metadata> {
  if (!isLocale(params.locale)) {
    return {};
  }

  const rider = await sanityClient.fetch<RiderDoc | null>(
    riderBySlugQuery(),
    riderBySlugParams(params.slug),
    { next: { revalidate: 60 } },
  );

  if (!rider) {
    return {};
  }

  const title = riderTitle(rider, params.locale);
  const description = [
    rider.romanizedName,
    rider.discipline ? disciplineLabel[rider.discipline] : null,
    rider.club,
  ]
    .filter(Boolean)
    .join(' · ');
  const image = rider.portrait?.asset?._ref
    ? urlFor(rider.portrait).width(1200).height(630).fit('crop').url()
    : null;

  return createLocalizedMetadata({
    locale: params.locale,
    pathSegments: ['riders', rider.slug],
    title: { [params.locale]: title },
    description: { [params.locale]: description },
    fallbackTitle: SITE_NAME,
    image,
  });
}

export default async function RiderPage({ params }: RiderPageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale;
  const rider = await sanityClient.fetch<RiderDoc | null>(
    riderBySlugQuery(),
    riderBySlugParams(params.slug),
    { next: { revalidate: 60 } },
  );

  if (!rider) {
    notFound();
  }

  const name = riderTitle(rider, locale);
  const portraitUrl = rider.portrait?.asset?._ref
    ? urlFor(rider.portrait).width(1100).height(1400).fit('crop').url()
    : null;
  const titles = rider.titles
    ?.map((title) => pickLocalized(title, locale))
    .filter(Boolean);
  const interviews = rider.interviews ?? [];
  const products = rider.favoriteProducts ?? [];

  return (
    <main className="min-h-screen bg-paper text-ink">
      <MagazineMasthead locale={locale} pathSegments={['riders', rider.slug]} />

      <article>
        <header className="border-b border-hairline">
          <div className="mx-auto grid max-w-content gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-14 lg:py-16">
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-tonal">
              {portraitUrl ? (
                <Image
                  src={portraitUrl}
                  alt=""
                  fill
                  className="object-cover"
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              ) : (
                <Image
                  src="/brand/logo-mark.png"
                  alt=""
                  width={128}
                  height={128}
                  className="h-24 w-24 object-contain opacity-20"
                />
              )}
            </div>

            <div className="flex flex-col justify-end">
              <p className="kicker">Rider Profile</p>
              <h1 className="mt-5 font-display text-6xl font-semibold leading-none text-balance sm:text-7xl lg:text-8xl">
                {name}
              </h1>
              {rider.romanizedName ? (
                <p className="mt-5 font-ui text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                  {rider.romanizedName}
                </p>
              ) : null}

              <dl className="mt-10 grid gap-4 border-y border-hairline py-6 font-ui text-xs uppercase tracking-[0.16em] text-muted sm:grid-cols-3">
                <RiderFact label="Discipline" value={rider.discipline ? disciplineLabel[rider.discipline] : null} />
                <RiderFact label="Career" value={rider.careerYears ? `${rider.careerYears} years` : null} />
                <RiderFact label="Club" value={rider.club} />
              </dl>

              {titles?.length ? (
                <ul className="mt-8 space-y-3 font-serif-editorial text-xl leading-relaxed text-ink-mute">
                  {titles.map((title) => (
                    <li key={title}>{title}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </header>

        {interviews.length ? (
          <section className="mx-auto max-w-content px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            <p className="kicker">Interviews</p>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              {interviews.map((interview, index) => {
                const interviewLocale = teaserLocaleFor(locale, interview.translationStatus);

                return (
                  <ArticleTeaser
                    key={interview._id}
                    href={getArticleHref(locale, interview.category, interview.slug)}
                    kicker={articleKicker('Rider Interview', locale, interview.translationStatus)}
                    title={pickLocalized(interview.title, interviewLocale) || 'Untitled'}
                    excerpt={pickLocalized(interview.excerpt, interviewLocale)}
                    byline={formatByline(interview.authors, interviewLocale)}
                    date={formatDate(interview.publishedAt, interviewLocale)}
                    imageUrl={getImageUrl(interview.heroImage)}
                    priority={index === 0}
                  />
                );
              })}
            </div>
          </section>
        ) : null}

        {products.length ? (
          <section className="border-t border-hairline px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            <div className="mx-auto max-w-content">
              <p className="kicker">Favorite Pieces</p>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {products.map((product) => (
                  <ProductBlock key={product._id} product={product} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createRiderJsonLd(rider, locale)),
        }}
      />

      <MagazineFooter />
    </main>
  );
}

function RiderFact({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-[10px] text-muted">{label}</dt>
      <dd className="mt-2 text-ink">{value || 'Not listed'}</dd>
    </div>
  );
}

function ProductBlock({
  product,
  locale,
}: {
  product: RiderProduct;
  locale: Locale;
}) {
  const name = pickLocalized(product.name, locale) || 'Penacova';
  const imageUrl = product.image?.asset?._ref
    ? urlFor(product.image).width(800).height(1000).fit('crop').url()
    : null;
  const href = locale === 'jp'
    ? product.cafe24UrlJP ?? product.cafe24UrlKR
    : product.cafe24UrlKR ?? product.cafe24UrlJP;

  return (
    <article className="border-t border-hairline pt-5">
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-tonal">
        {imageUrl ? (
          <Image src={imageUrl} alt="" fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
        ) : (
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={80}
            height={80}
            className="h-14 w-14 object-contain opacity-20"
          />
        )}
      </div>
      <h2 className="mt-4 font-display text-2xl font-semibold leading-tight">{name}</h2>
      {product.color ? (
        <p className="mt-2 font-ui text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          {product.color}
        </p>
      ) : null}
      {href ? (
        <a
          href={href}
          className="mt-4 inline-block font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-penacova"
        >
          Shop at Cafe24 -&gt;
        </a>
      ) : null}
    </article>
  );
}

function riderTitle(rider: RiderDoc, locale: Locale) {
  return pickLocalized(rider.name, locale) || rider.romanizedName || 'Rider';
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

function getImageUrl(image: SanityImage | undefined) {
  return image?.asset?._ref
    ? urlFor(image).width(900).height(1125).fit('crop').url()
    : null;
}

function createRiderJsonLd(rider: RiderDoc, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: riderTitle(rider, locale),
    alternateName: rider.romanizedName,
    affiliation: rider.club,
    url: absoluteUrl(`/${locale}/riders/${rider.slug}`),
  };
}
