import type { Locale } from '@/lib/i18n/locales';
import {
  getCategoryMeta,
  type ArticleCategory,
} from '@/lib/magazine/categories';

export type PublicMastheadLink = {
  id: ArticleCategory | 'subscribe';
  label: string;
  href: string;
  analyticsEvent: 'category_nav' | 'subscribe_nav';
  category?: ArticleCategory;
};

export const PUBLIC_MAGAZINE_CATEGORY_IDS = [
  'editorial',
  'riders',
  'look',
] as const satisfies readonly ArticleCategory[];

export function getPublicMastheadLinks(locale: Locale): PublicMastheadLink[] {
  return [
    ...PUBLIC_MAGAZINE_CATEGORY_IDS.map((categoryId) => {
      const category = getCategoryMeta(categoryId);

      return {
        id: category.id,
        label: category.label,
        href: `/${locale}/${category.id}`,
        analyticsEvent: 'category_nav' as const,
        category: category.id,
      };
    }),
    {
      id: 'subscribe',
      label: 'Subscribe',
      href: `/${locale}/subscribe`,
      analyticsEvent: 'subscribe_nav',
    },
  ];
}

export function isPublicMastheadLinkActive(
  link: PublicMastheadLink,
  pathSegments: string[],
) {
  return pathSegments[0] === link.id;
}
