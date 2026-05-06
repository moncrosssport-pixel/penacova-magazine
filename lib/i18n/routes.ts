import { LOCALES, type Locale } from './locales';

const hrefLang: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  jp: 'ja-JP',
};

export function localePath(locale: Locale, pathSegments: string[] = []) {
  const suffix = pathSegments.length
    ? `/${pathSegments.map(encodeURIComponent).join('/')}`
    : '';

  return `/${locale}${suffix}`;
}

export function languageAlternates(pathSegments: string[] = []) {
  return {
    ...Object.fromEntries(
      LOCALES.map((locale) => [hrefLang[locale], localePath(locale, pathSegments)]),
    ),
    'x-default': localePath('ko', pathSegments),
  };
}
