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
  collectionsIndexQuery,
  ridersIndexQuery,
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

type LocalizedTitle = Partial<Record<Locale, string>>;

type IndexRider = {
  _id: string;
  name?: LocalizedTitle;
  romanizedName?: string;
  slug: string;
  portrait?: SanityImage;
  discipline?: string;
  careerYears?: number;
  club?: string;
  titles?: LocalizedTitle[];
};

type IndexCollection = {
  _id: string;
  season: string;
  title?: LocalizedTitle;
  slug: string;
  heroImage?: SanityImage;
  looks?: {
    _id: string;
    image?: SanityImage;
  }[];
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  if (!isLocale(params.locale) || !isArticleCategory(params.category)) {
    notFound();
  }

  const locale = params.locale;
  const category = params.category;
  const meta = getCategoryMeta(category);
  const [articles, riderProfiles, collections] = await Promise.all([
    sanityClient.fetch<CategoryArticle[]>(
      articlesByCategoryQuery(),
      articlesByCategoryParams(category),
      { next: { revalidate: 60 } },
    ),
    category === 'riders'
      ? sanityClient.fetch<IndexRider[]>(
          ridersIndexQuery(),
          {},
          { next: { revalidate: 60 } },
        )
      : Promise.resolve([] as IndexRider[]),
    category === 'look'
      ? sanityClient.fetch<IndexCollection[]>(
          collectionsIndexQuery(),
          {},
          { next: { revalidate: 60 } },
        )
      : Promise.resolve([] as IndexCollection[]),
  ]);
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
        ) : category === 'riders' && riderProfiles.length ? (
          <RiderProfileGrid riders={riderProfiles} locale={locale} />
        ) : category === 'look' && collections.length ? (
          <CollectionGrid collections={collections} locale={locale} />
        ) : (
          <CategoryEmptyState
            category={category}
            label={meta.label}
            fallbackTitle={pickLocalized(meta.empty, locale)}
            locale={locale}
          />
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

      <MagazineFooter locale={locale} />
    </main>
  );
}

function RiderProfileGrid({
  riders,
  locale,
}: {
  riders: IndexRider[];
  locale: Locale;
}) {
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {riders.map((rider, index) => {
        const name =
          pickLocalized(rider.name, locale) || rider.romanizedName || 'Rider';

        return (
          <ArticleTeaser
            key={rider._id}
            href={`/${locale}/riders/${rider.slug}`}
            kicker="Rider Profile"
            title={name}
            excerpt={riderProfileExcerpt(locale)}
            byline={riderProfileByline(rider, locale)}
            imageUrl={getImageUrl(rider.portrait, false)}
            priority={index < 3}
          />
        );
      })}
    </div>
  );
}

function CollectionGrid({
  collections,
  locale,
}: {
  collections: IndexCollection[];
  locale: Locale;
}) {
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {collections.map((collection, index) => (
        <ArticleTeaser
          key={collection._id}
          href={`/${locale}/look/${collection.slug}`}
          kicker="Look Book"
          title={`${collection.season} ${pickLocalized(collection.title, locale) || ''}`.trim()}
          excerpt={collectionExcerpt(locale)}
          byline="Penacova Magazine"
          imageUrl={getImageUrl(collectionImage(collection), false)}
          priority={index < 3}
        />
      ))}
    </div>
  );
}

function CategoryEmptyState({
  category,
  label,
  fallbackTitle,
  locale,
}: {
  category: ArticleCategory;
  label: string;
  fallbackTitle?: string;
  locale: Locale;
}) {
  const copy = categoryEmptyCopy[category];

  return (
    <div className="border-y border-hairline py-16 text-center lg:py-24">
      <p className="kicker">{label}</p>
      <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-[-0.015em] text-balance">
        {pickLocalized(copy.title, locale) || fallbackTitle}
      </h2>
      <p className="mx-auto mt-5 max-w-xl font-serif-editorial text-lg leading-relaxed text-ink-mute">
        {pickLocalized(copy.description, locale)}
      </p>
    </div>
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

function collectionImage(collection: IndexCollection) {
  return collection.heroImage ?? collection.looks?.find((look) => look.image)?.image;
}

function riderProfileByline(rider: IndexRider, locale: Locale) {
  const title = rider.titles?.[0]
    ? pickLocalized(rider.titles[0], locale)
    : null;
  const details = [title, rider.discipline, rider.club].filter(Boolean);

  if (details.length) {
    return details.join(' / ');
  }

  return rider.careerYears ? `${rider.careerYears} years` : 'Penacova Rider';
}

function riderProfileExcerpt(locale: Locale) {
  return (
    {
      ko: '말 위의 루틴과 필드의 시간을 기록하는 Penacova 라이더 프로필.',
      en: 'A Penacova rider profile shaped around routine, field notes, and time in the saddle.',
      jp: 'Routine, field notes, and time in the saddle from a Penacova rider.',
    } satisfies Record<Locale, string>
  )[locale];
}

function collectionExcerpt(locale: Locale) {
  return (
    {
      ko: '시즌 컬렉션의 실루엣과 라이딩 디테일을 조용히 기록합니다.',
      en: 'Seasonal silhouettes, riding details, and quiet product notes.',
      jp: 'Seasonal silhouettes, riding details, and quiet product notes.',
    } satisfies Record<Locale, string>
  )[locale];
}

const categoryEmptyCopy = {
  editorial: {
    title: {
      ko: '첫 번째 에디토리얼을 준비하고 있습니다.',
      en: 'The first editorial is being prepared.',
      jp: 'The first editorial is being prepared.',
    },
    description: {
      ko: '마장과 필드, 컬렉션을 잇는 이야기를 곧 공개합니다.',
      en: 'Stories shaped around stables, fields, and collections will open soon.',
      jp: 'Stories shaped around stables, fields, and collections will open soon.',
    },
  },
  riders: {
    title: {
      ko: '첫 번째 라이더 인터뷰를 준비하고 있습니다.',
      en: 'The first rider interview is being prepared.',
      jp: 'The first rider interview is being prepared.',
    },
    description: {
      ko: '말 위의 루틴과 필드의 이야기를 곧 전합니다.',
      en: 'Rider routines and field stories will open soon.',
      jp: 'Rider routines and field stories will open soon.',
    },
  },
  look: {
    title: {
      ko: '새로운 룩북이 준비 중입니다.',
      en: 'A new look book is being prepared.',
      jp: 'A new look book is being prepared.',
    },
    description: {
      ko: '시즌 컬렉션의 실루엣과 라이딩 디테일을 곧 공개합니다.',
      en: 'Seasonal silhouettes and riding details will open soon.',
      jp: 'Seasonal silhouettes and riding details will open soon.',
    },
  },
  heritage: {
    title: {
      ko: '브랜드의 제작 이야기를 준비하고 있습니다.',
      en: 'Brand craft stories are being prepared.',
      jp: 'Brand craft stories are being prepared.',
    },
    description: {
      ko: '소재와 자수, 공방의 시간을 차분히 기록합니다.',
      en: 'Material, embroidery, and workshop notes will open soon.',
      jp: 'Material, embroidery, and workshop notes will open soon.',
    },
  },
  guide: {
    title: {
      ko: '승마 의류 가이드를 준비하고 있습니다.',
      en: 'Riding apparel guides are being prepared.',
      jp: 'Riding apparel guides are being prepared.',
    },
    description: {
      ko: '사이즈와 케어, 선택 기준을 운영자가 직접 올릴 수 있게 준비 중입니다.',
      en: 'Sizing, care, and apparel choice guides will open soon.',
      jp: 'Sizing, care, and apparel choice guides will open soon.',
    },
  },
  news: {
    title: {
      ko: '새 소식을 정리하고 있습니다.',
      en: 'News notes are being prepared.',
      jp: 'News notes are being prepared.',
    },
    description: {
      ko: '지속적으로 업데이트할 수 있는 소식만 신중히 공개합니다.',
      en: 'Only sustainable updates will be opened here.',
      jp: 'Only sustainable updates will be opened here.',
    },
  },
  stories: {
    title: {
      ko: '커뮤니티 스토리를 준비하고 있습니다.',
      en: 'Community stories are being prepared.',
      jp: 'Community stories are being prepared.',
    },
    description: {
      ko: '고객 라이더와 필드 노트를 모아 곧 공개합니다.',
      en: 'Customer rider notes and field stories will open soon.',
      jp: 'Customer rider notes and field stories will open soon.',
    },
  },
} satisfies Record<
  ArticleCategory,
  { title: Record<Locale, string>; description: Record<Locale, string> }
>;

function articleKicker(
  label: string,
  locale: Locale,
  statuses: TranslationStatusMap | undefined,
) {
  return teaserLocaleFor(locale, statuses) === locale
    ? label
    : `${label} / ${koreanOriginalLabel[locale]}`;
}
