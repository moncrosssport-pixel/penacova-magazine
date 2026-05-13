'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LOCALES, type Locale } from '@/lib/i18n/locales';
import { localePath } from '@/lib/i18n/routes';
import { MAGAZINE_CATEGORIES } from '@/lib/magazine/categories';

type MagazineMastheadProps = {
  locale: Locale;
  pathSegments?: string[];
  hideOnScroll?: boolean;
};

export function MagazineMasthead({
  locale,
  pathSegments = [],
  hideOnScroll = false,
}: MagazineMastheadProps) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (!hideOnScroll) {
      setIsHidden(false);
      return;
    }

    let frame = 0;

    const sync = () => {
      frame = 0;
      const hideZone = document.querySelector<HTMLElement>(
        '[data-masthead-hide-zone="true"]',
      );

      if (!hideZone) {
        setIsHidden(window.scrollY > 24);
        return;
      }

      const rect = hideZone.getBoundingClientRect();
      const isInsideHideZone =
        rect.top < window.innerHeight * 0.72 && rect.bottom > 72;

      setIsHidden(window.scrollY > 24 && isInsideHideZone);
    };

    const requestSync = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);

    return () => {
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [hideOnScroll]);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-ink bg-paper/96 shadow-[0_1px_0_rgba(16,14,12,0.04)] backdrop-blur transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${
        isHidden ? 'pointer-events-none -translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-5 px-4 py-3 sm:px-8 lg:px-10">
        <Link href={`/${locale}`} className="inline-flex no-underline">
          <Image
            src="/brand/logo-horizontal.png"
            alt="Penacova Magazine"
            width={320}
            height={104}
            className="h-auto w-32 sm:w-40 lg:w-44"
            priority
          />
        </Link>

        <nav className="hidden justify-center gap-6 whitespace-nowrap font-ui text-[10px] font-semibold uppercase tracking-[0.2em] xl:flex">
          {MAGAZINE_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/${locale}/${category.id}`}
              data-analytics-event="category_nav"
              data-analytics-label={category.label}
              data-analytics-locale={locale}
              data-analytics-category={category.id}
              data-analytics-href={`/${locale}/${category.id}`}
              className="no-underline transition-colors hover:text-penacova"
            >
              {category.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          {LOCALES.map((item, index) => (
            <span key={item} className="flex items-center gap-2">
              <Link
                href={localePath(item, pathSegments)}
                aria-current={item === locale ? 'page' : undefined}
                data-analytics-event="locale_switch"
                data-analytics-label={`${locale}:${item}`}
                data-analytics-locale={item}
                data-analytics-href={localePath(item, pathSegments)}
                className={`font-ui text-[10px] font-semibold uppercase tracking-[0.18em] no-underline ${
                  item === locale ? 'border-b border-ink text-ink' : 'text-muted'
                }`}
              >
                {item.toUpperCase()}
              </Link>
              {index < LOCALES.length - 1 ? (
                <span className="text-stone-300">/</span>
              ) : null}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-hairline px-4 py-2 sm:px-8 xl:hidden">
        <nav className="flex gap-5 overflow-x-auto whitespace-nowrap font-ui text-[10px] font-semibold uppercase tracking-[0.2em] sm:justify-center sm:gap-7">
          {MAGAZINE_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/${locale}/${category.id}`}
              data-analytics-event="category_nav"
              data-analytics-label={category.label}
              data-analytics-locale={locale}
              data-analytics-category={category.id}
              data-analytics-href={`/${locale}/${category.id}`}
              className="no-underline transition-colors hover:text-penacova"
            >
              {category.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
