import type { Locale } from '@/lib/i18n/locales';

type LocalizedText = Partial<Record<Locale, string>>;

export type NewsletterFollowLink = {
  label?: string;
  url?: string;
};

export type NewsletterSettingsDoc = {
  title?: LocalizedText;
  description?: LocalizedText;
  consentCopy?: LocalizedText;
  newsletterFormAction?: string;
  newsletterEmailFieldName?: string;
  newsletterProviderName?: string;
  followLinks?: NewsletterFollowLink[];
};

export type NormalizedNewsletterSettings = {
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  consentCopy: Record<Locale, string>;
  newsletterFormAction: string | null;
  newsletterEmailFieldName: string;
  newsletterProviderName: string | null;
  followLinks: Required<NewsletterFollowLink>[];
};

const fallbackTitle: Record<Locale, string> = {
  ko: 'Receive the next issue.',
  en: 'Receive the next issue.',
  jp: 'Receive the next issue.',
};

const fallbackDescription: Record<Locale, string> = {
  ko: 'A quiet monthly note from Penacova Magazine.',
  en: 'A quiet monthly note from Penacova Magazine.',
  jp: 'A quiet monthly note from Penacova Magazine.',
};

const fallbackConsentCopy: Record<Locale, string> = {
  ko: 'One email per month. No shop account is required.',
  en: 'One email per month. No shop account is required.',
  jp: 'One email per month. No shop account is required.',
};

export function normalizeNewsletterSettings(
  settings: NewsletterSettingsDoc | null | undefined,
): NormalizedNewsletterSettings {
  return {
    title: normalizeLocalizedText(settings?.title, fallbackTitle),
    description: normalizeLocalizedText(
      settings?.description,
      fallbackDescription,
    ),
    consentCopy: normalizeLocalizedText(
      settings?.consentCopy,
      fallbackConsentCopy,
    ),
    newsletterFormAction: normalizeHttpUrl(settings?.newsletterFormAction),
    newsletterEmailFieldName:
      normalizeText(settings?.newsletterEmailFieldName) ?? 'EMAIL',
    newsletterProviderName: normalizeText(settings?.newsletterProviderName),
    followLinks: normalizeFollowLinks(settings?.followLinks),
  };
}

function normalizeLocalizedText(
  value: LocalizedText | undefined,
  fallback: Record<Locale, string>,
) {
  return {
    ko: normalizeText(value?.ko) ?? fallback.ko,
    en: normalizeText(value?.en) ?? fallback.en,
    jp: normalizeText(value?.jp) ?? fallback.jp,
  };
}

function normalizeFollowLinks(
  links: NewsletterFollowLink[] | undefined,
): Required<NewsletterFollowLink>[] {
  return (links ?? []).flatMap((link) => {
    const label = normalizeText(link.label);
    const url = normalizeHttpUrl(link.url);

    return label && url ? [{ label, url }] : [];
  });
}

function normalizeText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed || null;
}

function normalizeHttpUrl(value: string | null | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  try {
    const url = new URL(trimmed);
    return url.protocol === 'https:' || url.protocol === 'http:'
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}
