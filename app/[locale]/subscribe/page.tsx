import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MagazineFooter } from '@/components/magazine/MagazineFooter';
import { MagazineMasthead } from '@/components/magazine/MagazineMasthead';
import { MagazineNewsletter } from '@/components/magazine/MagazineNewsletter';
import { isLocale } from '@/lib/i18n/locales';
import { createPageMetadata } from '@/lib/seo/metadata';

type SubscribePageProps = {
  params: {
    locale: string;
  };
};

export function generateMetadata({ params }: SubscribePageProps): Metadata {
  if (!isLocale(params.locale)) {
    return {};
  }

  return createPageMetadata({
    locale: params.locale,
    pathSegments: ['subscribe'],
    title: 'Subscribe',
    description: 'Receive the next issue from Penacova Magazine.',
  });
}

export default function SubscribePage({ params }: SubscribePageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <MagazineMasthead locale={params.locale} pathSegments={['subscribe']} />
      <MagazineNewsletter locale={params.locale} variant="page" />
      <MagazineFooter locale={params.locale} />
    </main>
  );
}
