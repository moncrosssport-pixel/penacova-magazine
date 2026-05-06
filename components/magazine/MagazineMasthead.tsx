import Image from 'next/image';
import Link from 'next/link';
import { LOCALES, type Locale } from '@/lib/i18n/locales';

const categories = [
  { id: 'editorial', label: 'Editorial' },
  { id: 'riders', label: 'Riders' },
  { id: 'look', label: 'Look' },
  { id: 'heritage', label: 'Heritage' },
  { id: 'guide', label: 'Guide' },
  { id: 'news', label: 'News' },
  { id: 'stories', label: 'Stories' },
];

export function MagazineMasthead({ locale }: { locale: Locale }) {
  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-paper">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted sm:px-8 sm:text-[11px]">
        <div className="hidden items-center gap-2 sm:flex">
          <span>Issue No. 03</span>
          <span className="text-stone-300">·</span>
          <span>Penacova Magazine</span>
        </div>
        <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
          {LOCALES.map((item, index) => (
            <span key={item} className="flex items-center gap-2">
              <Link
                href={`/${item}`}
                aria-current={item === locale ? 'page' : undefined}
                className={`font-ui text-[11px] font-semibold uppercase tracking-[0.2em] no-underline ${
                  item === locale ? 'border-b border-ink text-ink' : 'text-muted'
                }`}
              >
                {item.toUpperCase()}
              </Link>
              {index < LOCALES.length - 1 ? <span className="text-stone-300">·</span> : null}
            </span>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 text-center sm:px-8 lg:py-8">
        <Link href={`/${locale}`} className="inline-block no-underline">
          <Image
            src="/brand/logo-horizontal.png"
            alt="Penacova Magazine"
            width={320}
            height={104}
            className="mx-auto h-auto w-48 sm:w-64 lg:w-80"
            priority
          />
        </Link>
        <p className="mt-3 font-display text-sm italic text-ink-mute">
          승마, 그리고 그 주변의 풍경
        </p>
      </div>

      <div className="grid grid-cols-1 border-t border-hairline px-4 py-3 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <a
          href="#search"
          className="hidden font-ui text-[11px] font-semibold uppercase tracking-[0.2em] no-underline lg:block"
        >
          Search
        </a>
        <nav className="flex gap-5 overflow-x-auto whitespace-nowrap font-ui text-[11px] uppercase tracking-[0.22em] sm:justify-center sm:gap-8">
          {categories.map((category) => (
            <a key={category.id} href={`#${category.id}`} className="no-underline">
              {category.label}
            </a>
          ))}
        </nav>
        <a
          href="#newsletter"
          className="hidden text-right font-ui text-[11px] font-semibold uppercase tracking-[0.2em] no-underline lg:block"
        >
          Subscribe
        </a>
      </div>
    </header>
  );
}
