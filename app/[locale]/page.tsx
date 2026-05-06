import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MagazineFooter } from '@/components/magazine/MagazineFooter';
import { MagazineMasthead } from '@/components/magazine/MagazineMasthead';
import { StoryCard } from '@/components/magazine/StoryCard';
import { isLocale, type Locale } from '@/lib/i18n/locales';
import { createHomeMetadata } from '@/lib/seo/metadata';

type LocaleHomePageProps = {
  params: {
    locale: string;
  };
};

export function generateMetadata({ params }: LocaleHomePageProps): Metadata {
  if (!isLocale(params.locale)) {
    return {};
  }

  return createHomeMetadata(params.locale);
}

const copy: Record<Locale, {
  issue: string;
  leadKicker: string;
  title: string;
  dek: string;
  byline: string;
  editorTitle: string;
  newsletterTitle: string;
  newsletterDek: string;
}> = {
  ko: {
    issue: 'ISSUE No. 03',
    leadKicker: 'EDITORIAL · SS26',
    title: '초원 위의 침묵, 지원의 아침',
    dek: '새벽의 마방, 손끝의 가죽, 그리고 라이더가 말 위에 오르기 전의 고요를 기록합니다.',
    byline: 'BY 편집부 — 사진 준비 중',
    editorTitle: 'Editor’s Selection',
    newsletterTitle: '다음 이슈를 받아보세요.',
    newsletterDek: '월 1회, 페나코바 매거진의 새 글과 시즌 노트를 조용히 전합니다.',
  },
  en: {
    issue: 'ISSUE No. 03',
    leadKicker: 'EDITORIAL · SS26',
    title: 'The quiet before the morning ride',
    dek: 'A stable at dawn, the weight of leather in hand, and the minutes before a rider mounts.',
    byline: 'BY Editorial Desk — Photography in progress',
    editorTitle: 'Editor’s Selection',
    newsletterTitle: 'Receive the next issue.',
    newsletterDek: 'A quiet monthly note from Penacova Magazine.',
  },
  jp: {
    issue: 'ISSUE No. 03',
    leadKicker: 'EDITORIAL · SS26',
    title: '朝の騎乗前にある静けさ',
    dek: '夜明けの馬房、手に残る革の感触、ライダーが馬上へ向かう前の数分を記録します。',
    byline: 'BY 編集部 — 写真準備中',
    editorTitle: 'Editor’s Selection',
    newsletterTitle: '次の号を受け取る',
    newsletterDek: 'Penacova Magazineから月に一度、静かな編集ノートをお届けします。',
  },
};

const selections = [
  {
    kicker: 'RIDER INTERVIEW',
    title: '말의 리듬을 먼저 듣는 사람',
    byline: 'BY 김지원',
    ratio: 'portrait' as const,
  },
  {
    kicker: 'LOOK BOOK',
    title: 'SS26, 움직임을 위한 재단',
    byline: 'STYLE NOTES',
    ratio: 'portrait' as const,
  },
  {
    kicker: 'HERITAGE',
    title: '작은 자수 하나가 완성되는 시간',
    byline: 'CRAFT JOURNAL',
    ratio: 'portrait' as const,
  },
];

const rails = [
  ['editorial', 'Editorial', '마방의 빛을 따라 완성한 화보와 포토 에세이'],
  ['riders', 'Riders', '국가대표, 코치, 클럽 라이더의 장면과 목소리'],
  ['look', 'Look', '시즌 컬렉션과 라이딩을 위한 스타일 노트'],
  ['guide', 'Guide', '소재, 사이즈, 관리법을 차분하게 정리한 가이드'],
] as const;

export default function LocaleHomePage({ params }: LocaleHomePageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const content = copy[params.locale];

  return (
    <main className="min-h-screen bg-paper text-ink">
      <MagazineMasthead locale={params.locale} />

      <section id="editorial" className="border-b border-hairline">
        <div className="mx-auto max-w-content">
          <div className="flex aspect-[16/9] min-h-[280px] items-center justify-center bg-tonal sm:min-h-[420px]">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={180}
              height={180}
              className="h-28 w-28 object-contain opacity-20 sm:h-40 sm:w-40"
              priority
            />
          </div>
          <div className="max-w-4xl px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
            <p className="kicker">{content.leadKicker}</p>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-none tracking-[-0.015em] text-ink text-balance sm:text-7xl lg:text-8xl">
              {content.title}
            </h1>
            <p className="dek mt-6 max-w-2xl">{content.dek}</p>
            <p className="mt-6 font-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
              {content.byline}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        <div className="mb-8 flex items-end justify-between border-b border-ink pb-4">
          <div>
            <p className="kicker">{content.issue}</p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.015em]">
              {content.editorTitle}
            </h2>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {selections.map((story) => (
            <StoryCard key={story.title} {...story} />
          ))}
        </div>
      </section>

      <section className="border-y border-hairline bg-tonal/60">
        <div className="mx-auto grid max-w-content divide-y divide-hairline px-6 sm:px-10 lg:px-14">
          {rails.map(([id, title, dek]) => (
            <Link
              id={id}
              key={id}
              href={`/${params.locale}/${id}`}
              className="grid gap-3 py-8 no-underline md:grid-cols-[220px_1fr_auto] md:items-center"
            >
              <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.24em] text-penacova">
                {title}
              </span>
              <span className="font-display text-2xl font-semibold tracking-[-0.01em] text-ink">
                {dek}
              </span>
              <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                Read
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="newsletter" className="mx-auto max-w-reading px-6 py-16 text-center sm:px-10 lg:py-24">
        <p className="kicker">Subscribe</p>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.015em] text-balance">
          {content.newsletterTitle}
        </h2>
        <p className="dek mx-auto mt-5 max-w-xl">{content.newsletterDek}</p>
        <p className="mt-8 font-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
          magazine.penacova.co.kr
        </p>
      </section>

      <MagazineFooter />
    </main>
  );
}
