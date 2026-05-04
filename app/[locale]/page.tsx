import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n/locales';

type LocaleHomePageProps = {
  params: {
    locale: string;
  };
};

const copy: Record<Locale, {
  kicker: string;
  title: string;
  dek: string;
  primary: string;
  secondary: string;
  notes: string[];
}> = {
  ko: {
    kicker: 'PENACOVA MAGAZINE',
    title: '승마의 장면을 기록하는 매거진',
    dek: '라이더, 마방, 제품, 헤리티지를 하나의 에디토리얼 흐름으로 엮습니다.',
    primary: '스튜디오 열기',
    secondary: '첫 기사 준비 중',
    notes: ['Riders', 'Editorial', 'Guide'],
  },
  en: {
    kicker: 'PENACOVA MAGAZINE',
    title: 'An editorial home for equestrian stories',
    dek: 'Riders, stables, product craft, and heritage gathered into one magazine.',
    primary: 'Open Studio',
    secondary: 'First story in progress',
    notes: ['Riders', 'Editorial', 'Guide'],
  },
  jp: {
    kicker: 'PENACOVA MAGAZINE',
    title: '乗馬の物語を記録するマガジン',
    dek: 'ライダー、厩舎、製品、ヘリテージをひとつの編集体験にまとめます。',
    primary: 'Studio',
    secondary: '最初の記事を準備中',
    notes: ['Riders', 'Editorial', 'Guide'],
  },
};

export default function LocaleHomePage({ params }: LocaleHomePageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const content = copy[params.locale];

  return (
    <main className="min-h-screen bg-stone-50 text-neutral-950">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-6 py-8 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between border-b border-neutral-900 pb-4 text-xs font-semibold uppercase tracking-[0.24em]">
          <span>{content.kicker}</span>
          <span>{params.locale}</span>
        </header>

        <div className="grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-red-800">
              {content.secondary}
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-none sm:text-7xl lg:text-8xl">
              {content.title}
            </h1>
          </div>

          <div className="border-l border-neutral-900 pl-6">
            <p className="max-w-md text-lg leading-8 text-neutral-700">{content.dek}</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold uppercase tracking-[0.18em]">
              {content.notes.map((note) => (
                <span key={note} className="border border-neutral-900 px-3 py-2">
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>

        <footer className="flex flex-col gap-4 border-t border-neutral-900 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <Link href="/studio" className="font-semibold uppercase tracking-[0.2em] underline underline-offset-4">
            {content.primary}
          </Link>
          <span className="text-neutral-600">magazine.penacova.co.kr</span>
        </footer>
      </section>
    </main>
  );
}
