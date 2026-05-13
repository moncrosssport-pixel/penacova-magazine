import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HomePinnedHero } from '@/components/magazine/HomePinnedHero';
import { MagazineFooter } from '@/components/magazine/MagazineFooter';
import { MagazineMasthead } from '@/components/magazine/MagazineMasthead';
import { MagazineNewsletter } from '@/components/magazine/MagazineNewsletter';
import { StoryCard } from '@/components/magazine/StoryCard';
import { isLocale, type Locale } from '@/lib/i18n/locales';
import { createHomeMetadata } from '@/lib/seo/metadata';

type LocaleHomePageProps = {
  params: {
    locale: string;
  };
};

type HomeCopy = {
  issue: string;
  leadKicker: string;
  title: string;
  dek: string;
  byline: string;
  editorTitle: string;
  selections: Array<{
    kicker: string;
    title: string;
    byline: string;
    ratio: 'portrait' | 'landscape' | 'square';
  }>;
  rails: Array<{
    id: 'editorial' | 'riders' | 'look' | 'guide';
    title: string;
    dek: string;
  }>;
};

export function generateMetadata({ params }: LocaleHomePageProps): Metadata {
  if (!isLocale(params.locale)) {
    return {};
  }

  return createHomeMetadata(params.locale);
}

const copy: Record<Locale, HomeCopy> = {
  ko: {
    issue: 'ISSUE No. 03',
    leadKicker: 'EDITORIAL · SS26',
    title: '말의 리듬 위에 놓인 옷',
    dek: '새벽의 마장, 손끝의 가죽, 그리고 기승 전의 고요를 한 편의 필름처럼 기록합니다.',
    byline: 'BY EDITORIAL DESK · FILM BY HYPERFRAMES',
    editorTitle: "Editor's Selection",
    selections: [
      {
        kicker: 'RIDER INTERVIEW',
        title: '말의 리듬을 먼저 읽는 사람',
        byline: 'BY EDITORIAL DESK',
        ratio: 'portrait',
      },
      {
        kicker: 'LOOK BOOK',
        title: 'SS26, 움직임을 위한 재단',
        byline: 'STYLE NOTES',
        ratio: 'portrait',
      },
      {
        kicker: 'HERITAGE',
        title: '자수 한 땀이 완성하는 시간',
        byline: 'CRAFT JOURNAL',
        ratio: 'portrait',
      },
    ],
    rails: [
      {
        id: 'editorial',
        title: 'Editorial',
        dek: '마장과 빛을 따라 완성되는 포토 에세이',
      },
      {
        id: 'riders',
        title: 'Riders',
        dek: '선수, 코치, 클럽 라이더의 말과 목소리',
      },
      {
        id: 'look',
        title: 'Look',
        dek: '시즌 컬렉션과 라이딩을 위한 스타일 노트',
      },
      {
        id: 'guide',
        title: 'Guide',
        dek: '소재, 사이즈, 관리법을 차분하게 정리한 가이드',
      },
    ],
  },
  en: {
    issue: 'ISSUE No. 03',
    leadKicker: 'EDITORIAL · SS26',
    title: 'Clothes held in the rhythm of the ride',
    dek: 'A stable at dawn, leather in hand, and the quiet minutes before the rider mounts.',
    byline: 'BY EDITORIAL DESK · FILM BY HYPERFRAMES',
    editorTitle: "Editor's Selection",
    selections: [
      {
        kicker: 'RIDER INTERVIEW',
        title: 'The rider who reads the rhythm first',
        byline: 'BY EDITORIAL DESK',
        ratio: 'portrait',
      },
      {
        kicker: 'LOOK BOOK',
        title: 'SS26, tailored for movement',
        byline: 'STYLE NOTES',
        ratio: 'portrait',
      },
      {
        kicker: 'HERITAGE',
        title: 'The time held inside one stitch',
        byline: 'CRAFT JOURNAL',
        ratio: 'portrait',
      },
    ],
    rails: [
      {
        id: 'editorial',
        title: 'Editorial',
        dek: 'Photo essays shaped by the stable, the field, and the light',
      },
      {
        id: 'riders',
        title: 'Riders',
        dek: 'Voices from athletes, coaches, and club riders',
      },
      {
        id: 'look',
        title: 'Look',
        dek: 'Seasonal collections and notes for riding in motion',
      },
      {
        id: 'guide',
        title: 'Guide',
        dek: 'Materials, sizing, and care for the riding wardrobe',
      },
    ],
  },
  jp: {
    issue: 'ISSUE No. 03',
    leadKicker: 'EDITORIAL · SS26',
    title: 'ライドのリズムに沿う服',
    dek: '夜明けの厩舎、手に残る革の感触、騎乗前の静けさを一本のフィルムとして記録します。',
    byline: 'BY EDITORIAL DESK · FILM BY HYPERFRAMES',
    editorTitle: "Editor's Selection",
    selections: [
      {
        kicker: 'RIDER INTERVIEW',
        title: '馬のリズムを先に読む人',
        byline: 'BY EDITORIAL DESK',
        ratio: 'portrait',
      },
      {
        kicker: 'LOOK BOOK',
        title: 'SS26、動きのためのテーラリング',
        byline: 'STYLE NOTES',
        ratio: 'portrait',
      },
      {
        kicker: 'HERITAGE',
        title: '一針が完成させる時間',
        byline: 'CRAFT JOURNAL',
        ratio: 'portrait',
      },
    ],
    rails: [
      {
        id: 'editorial',
        title: 'Editorial',
        dek: '厩舎と光を軸にしたフォトエッセイ',
      },
      {
        id: 'riders',
        title: 'Riders',
        dek: '選手、コーチ、クラブライダーの声',
      },
      {
        id: 'look',
        title: 'Look',
        dek: 'シーズンコレクションとライディングのためのスタイルノート',
      },
      {
        id: 'guide',
        title: 'Guide',
        dek: '素材、サイズ、ケアを静かに案内するガイド',
      },
    ],
  },
};

export default function LocaleHomePage({ params }: LocaleHomePageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const content = copy[params.locale];

  return (
    <main className="min-h-screen bg-paper text-ink">
      <MagazineMasthead locale={params.locale} />

      <HomePinnedHero locale={params.locale} copy={content} />

      <section className="mx-auto max-w-content px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        <div className="mb-8 flex items-end justify-between border-b border-ink pb-4">
          <div>
            <p className="kicker">{content.issue}</p>
            <h2 className="mt-2 font-display text-4xl font-semibold">
              {content.editorTitle}
            </h2>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {content.selections.map((story) => (
            <StoryCard key={story.title} {...story} />
          ))}
        </div>
      </section>

      <section className="border-y border-hairline bg-tonal/60">
        <div className="mx-auto grid max-w-content divide-y divide-hairline px-6 sm:px-10 lg:px-14">
          {content.rails.map((rail) => (
            <Link
              id={rail.id}
              key={rail.id}
              href={`/${params.locale}/${rail.id}`}
              className="grid gap-3 py-8 no-underline md:grid-cols-[220px_1fr_auto] md:items-center"
            >
              <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.24em] text-penacova">
                {rail.title}
              </span>
              <span className="font-display text-2xl font-semibold text-ink">
                {rail.dek}
              </span>
              <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Read
              </span>
            </Link>
          ))}
        </div>
      </section>

      <MagazineNewsletter locale={params.locale} />

      <MagazineFooter locale={params.locale} />
    </main>
  );
}
