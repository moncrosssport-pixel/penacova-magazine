import type { Locale } from '@/lib/i18n/locales';

export type TranslationStatus =
  | 'not-started'
  | 'auto-draft'
  | 'reviewed'
  | 'manual';

export type TranslationStatusMap = Partial<Record<'en' | 'jp', TranslationStatus>>;

export function isApprovedTranslationStatus(status: TranslationStatus | undefined) {
  return status === 'reviewed' || status === 'manual';
}

export function teaserLocaleFor(locale: Locale, statuses: TranslationStatusMap | undefined) {
  if (locale === 'ko') {
    return locale;
  }

  return isApprovedTranslationStatus(statuses?.[locale]) ? locale : 'ko';
}

export function bodyLocaleFor(
  locale: Locale,
  statuses: TranslationStatusMap | undefined,
  hasLocalizedBody: boolean,
) {
  if (locale === 'ko') {
    return locale;
  }

  return isApprovedTranslationStatus(statuses?.[locale]) && hasLocalizedBody
    ? locale
    : 'ko';
}

export const translationNoticeCopy: Record<Locale, string> = {
  ko: '현재 한국어 원문으로 제공됩니다.',
  en: 'This story is currently available in Korean. Translation is in editorial review.',
  jp: 'この記事は現在、韓国語の原文で表示されています。翻訳は編集中です。',
};

export const koreanOriginalLinkCopy: Record<Locale, string> = {
  ko: '한국어 원문 읽기',
  en: 'Read the Korean original',
  jp: '韓国語の原文を読む',
};

export const koreanOriginalLabel: Record<Locale, string> = {
  ko: 'Korean Original',
  en: 'Korean Original',
  jp: 'Korean Original',
};
