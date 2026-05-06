export const SITE_NAME = 'Penacova Magazine';
export const SITE_DESCRIPTION =
  'A quiet editorial magazine for Penacova equestrian apparel stories.';

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://penacova-magazine.vercel.app',
);

function normalizeSiteUrl(value: string) {
  return value.replace(/\/+$/, '');
}
