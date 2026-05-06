import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/locales';
import {
  languageAlternates,
  localePath,
} from '@/lib/i18n/routes';
import type { LocalizedCopy } from '@/lib/magazine/categories';
import { pickLocalized } from '@/lib/magazine/format';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

export { languageAlternates, localePath } from '@/lib/i18n/routes';

type MetadataInput = {
  locale: Locale;
  pathSegments?: string[];
  title?: string;
  description?: string;
  image?: string | null;
  type?: 'website' | 'article';
  noIndex?: boolean;
};

const openGraphLocale: Record<Locale, string> = {
  ko: 'ko_KR',
  en: 'en_US',
  jp: 'ja_JP',
};

const homeTitle: Record<Locale, string> = {
  ko: SITE_NAME,
  en: SITE_NAME,
  jp: SITE_NAME,
};

const homeDescription: Record<Locale, string> = {
  ko: SITE_DESCRIPTION,
  en: SITE_DESCRIPTION,
  jp: SITE_DESCRIPTION,
};

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString();
}

export function createPageMetadata({
  locale,
  pathSegments = [],
  title = SITE_NAME,
  description = SITE_DESCRIPTION,
  image,
  type = 'website',
  noIndex = false,
}: MetadataInput): Metadata {
  const canonical = localePath(locale, pathSegments);
  const fullTitle = title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`;

  return {
    title: title === SITE_NAME ? { absolute: SITE_NAME } : title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(pathSegments),
    },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: canonical,
      locale: openGraphLocale[locale],
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      images: image ? [image] : undefined,
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

export function createHomeMetadata(locale: Locale) {
  return createPageMetadata({
    locale,
    title: homeTitle[locale],
    description: homeDescription[locale],
  });
}

export function createLocalizedMetadata({
  locale,
  pathSegments,
  title,
  description,
  fallbackTitle,
  fallbackDescription = SITE_DESCRIPTION,
  image,
  type,
  noIndex,
}: {
  locale: Locale;
  pathSegments: string[];
  title?: LocalizedCopy;
  description?: LocalizedCopy;
  fallbackTitle: string;
  fallbackDescription?: string;
  image?: string | null;
  type?: 'website' | 'article';
  noIndex?: boolean;
}) {
  return createPageMetadata({
    locale,
    pathSegments,
    title: pickLocalized(title, locale) || fallbackTitle,
    description: pickLocalized(description, locale) || fallbackDescription,
    image,
    type,
    noIndex,
  });
}
