import type { Locale } from '@/lib/i18n/locales';
import type { LocalizedCopy } from '@/lib/magazine/categories';

export type LocalizedBlocks = Partial<Record<Locale, unknown[]>>;

export type BylineAuthor = {
  name?: LocalizedCopy;
};

export function pickLocalized(value: LocalizedCopy | undefined, locale: Locale) {
  return value?.[locale] ?? value?.ko ?? '';
}

export function formatByline(authors: BylineAuthor[] | undefined, locale: Locale) {
  if (!authors?.length) {
    return null;
  }

  const names = authors
    .map((author) => pickLocalized(author.name, locale))
    .filter(Boolean);

  return names.length ? `BY ${names.join(', ')}` : null;
}

export function formatDate(value: string | undefined, locale: Locale) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  if (locale === 'en') {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  return new Intl.DateTimeFormat(locale === 'jp' ? 'ja-JP' : 'ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replace(/\.\s?/g, '.')
    .replace(/\.$/, '');
}
