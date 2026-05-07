import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MagazineFooter } from '@/components/magazine/MagazineFooter';
import { MagazineMasthead } from '@/components/magazine/MagazineMasthead';
import { isLocale, type Locale } from '@/lib/i18n/locales';
import { pickLocalized } from '@/lib/magazine/format';
import { sanityClient, urlFor } from '@/lib/sanity/client';
import {
  collectionBySlugParams,
  collectionBySlugQuery,
} from '@/lib/sanity/queries';
import { absoluteUrl, createLocalizedMetadata } from '@/lib/seo/metadata';
import { SITE_NAME } from '@/lib/site';

type LookBookPageProps = {
  params: {
    locale: string;
    season: string;
  };
};

type SanityImage = {
  asset?: {
    _ref?: string;
  };
};

type LookBookProduct = {
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

type LookBookLook = {
  _id: string;
  number: string;
  name?: Partial<Record<Locale, string>>;
  image?: SanityImage;
  products?: LookBookProduct[];
  rider?: {
    _id: string;
    name?: Partial<Record<Locale, string>>;
    romanizedName?: string;
    slug?: string;
  };
};

type CollectionDoc = {
  _id: string;
  season: string;
  title?: Partial<Record<Locale, string>>;
  slug: string;
  heroImage?: SanityImage;
  cafe24CollectionUrlKR?: string;
  cafe24CollectionUrlJP?: string;
  looks?: LookBookLook[];
  products?: LookBookProduct[];
};

export async function generateMetadata({
  params,
}: LookBookPageProps): Promise<Metadata> {
  if (!isLocale(params.locale)) {
    return {};
  }

  const collection = await sanityClient.fetch<CollectionDoc | null>(
    collectionBySlugQuery(),
    collectionBySlugParams(params.season),
    { next: { revalidate: 60 } },
  );

  if (!collection) {
    return {};
  }

  const title = collectionTitle(collection, params.locale);
  const image = collection.heroImage?.asset?._ref
    ? urlFor(collection.heroImage).width(1200).height(630).fit('crop').url()
    : null;

  return createLocalizedMetadata({
    locale: params.locale,
    pathSegments: ['look', collection.slug],
    title: { [params.locale]: `${collection.season} ${title}` },
    description: {
      [params.locale]: `${collection.season} look book from ${SITE_NAME}`,
    },
    fallbackTitle: SITE_NAME,
    image,
  });
}

export default async function LookBookPage({ params }: LookBookPageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale;
  const collection = await sanityClient.fetch<CollectionDoc | null>(
    collectionBySlugQuery(),
    collectionBySlugParams(params.season),
    { next: { revalidate: 60 } },
  );

  if (!collection) {
    notFound();
  }

  const title = collectionTitle(collection, locale);
  const heroImageUrl = getImageUrl(collection.heroImage, 1800, 1100);
  const looks = collection.looks ?? [];
  const collectionHref = getCollectionHref(collection, locale);

  return (
    <main className="min-h-screen bg-paper text-ink">
      <MagazineMasthead locale={locale} pathSegments={['look', collection.slug]} />

      <article
        data-analytics-surface="lookbook"
        data-analytics-locale={locale}
        data-analytics-category="look"
        data-analytics-slug={collection.slug}
      >
        <header className="border-b border-hairline">
          <div className="mx-auto grid max-w-content gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:px-14 lg:py-16">
            <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden bg-tonal">
              {heroImageUrl ? (
                <Image
                  src={heroImageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  priority
                  sizes="(min-width: 1024px) 56vw, 100vw"
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
              <p className="kicker">Look Book</p>
              <p className="mt-6 font-ui text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                {collection.season}
              </p>
              <h1 className="mt-5 font-display text-6xl font-semibold leading-none text-balance sm:text-7xl lg:text-8xl">
                {title}
              </h1>
              <p className="dek mt-6 max-w-xl">
                Seasonal silhouettes, riding details, and quiet product notes
                from Penacova Magazine.
              </p>
              {collectionHref ? (
                <a
                  href={collectionHref}
                  data-analytics-event="outbound_cafe24"
                  data-analytics-label="collection_cta"
                  data-analytics-locale={locale}
                  data-analytics-category="look"
                  data-analytics-slug={collection.slug}
                  data-analytics-href={collectionHref}
                  className="mt-8 inline-block font-ui text-xs font-semibold uppercase tracking-[0.18em] text-penacova"
                >
                  View collection at Cafe24 -&gt;
                </a>
              ) : null}
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-content px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
          {looks.length ? (
            <div className="grid gap-12 md:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
              {looks.map((look, index) => (
                <LookBlock
                  key={look._id}
                  look={look}
                  locale={locale}
                  priority={index < 2}
                />
              ))}
            </div>
          ) : (
            <div className="border-y border-hairline py-16 text-center lg:py-24">
              <p className="kicker">{collection.season}</p>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight text-balance">
                Looks are being prepared.
              </h2>
              <p className="mx-auto mt-5 max-w-xl font-serif-editorial text-lg leading-relaxed text-ink-mute">
                Add Look documents in Studio and link them to this collection.
              </p>
            </div>
          )}
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createCollectionJsonLd(collection, locale)),
        }}
      />

      <MagazineFooter />
    </main>
  );
}

function LookBlock({
  look,
  locale,
  priority,
}: {
  look: LookBookLook;
  locale: Locale;
  priority: boolean;
}) {
  const imageUrl = getImageUrl(look.image, 1100, 1400);
  const name = pickLocalized(look.name, locale) || look.number;
  const riderName = look.rider
    ? pickLocalized(look.rider.name, locale) || look.rider.romanizedName
    : null;

  return (
    <article className="border-t border-hairline pt-5">
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-tonal">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover"
            priority={priority}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ) : (
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={96}
            height={96}
            className="h-16 w-16 object-contain opacity-20"
          />
        )}
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-[0.25fr_0.75fr]">
        <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          {look.number}
        </p>
        <div>
          <h2 className="font-display text-3xl font-semibold leading-tight">
            {name}
          </h2>
          {riderName && look.rider?.slug ? (
            <Link
              href={`/${locale}/riders/${look.rider.slug}`}
              className="mt-3 inline-block font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-muted no-underline"
            >
              {riderName}
            </Link>
          ) : null}
          {look.products?.length ? (
            <ul className="mt-5 space-y-2 border-t border-hairline pt-4">
              {look.products.map((product) => (
                <li
                  key={product._id}
                  className="font-ui text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
                >
                  <ProductLink product={product} locale={locale} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ProductLink({
  product,
  locale,
}: {
  product: LookBookProduct;
  locale: Locale;
}) {
  const name = pickLocalized(product.name, locale) || 'Penacova';
  const href = locale === 'jp'
    ? product.cafe24UrlJP ?? product.cafe24UrlKR
    : product.cafe24UrlKR ?? product.cafe24UrlJP;

  if (!href) {
    return <span>{name}</span>;
  }

  return (
    <a
      href={href}
      data-analytics-event="outbound_cafe24"
      data-analytics-label="lookbook_product"
      data-analytics-locale={locale}
      data-analytics-category="look"
      data-analytics-slug={product.slug ?? product._id}
      data-analytics-href={href}
      className="text-penacova"
    >
      {name} -&gt;
    </a>
  );
}

function collectionTitle(collection: CollectionDoc, locale: Locale) {
  return pickLocalized(collection.title, locale) || collection.season;
}

function getImageUrl(
  image: SanityImage | undefined,
  width: number,
  height: number,
) {
  return image?.asset?._ref
    ? urlFor(image).width(width).height(height).fit('crop').url()
    : null;
}

function getCollectionHref(collection: CollectionDoc, locale: Locale) {
  if (locale === 'jp') {
    return collection.cafe24CollectionUrlJP ?? collection.cafe24CollectionUrlKR;
  }

  return collection.cafe24CollectionUrlKR ?? collection.cafe24CollectionUrlJP;
}

function createCollectionJsonLd(collection: CollectionDoc, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${collection.season} ${collectionTitle(collection, locale)}`,
    url: absoluteUrl(`/${locale}/look/${collection.slug}`),
  };
}
