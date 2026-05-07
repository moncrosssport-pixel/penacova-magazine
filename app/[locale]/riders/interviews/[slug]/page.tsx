import ArticlePage, {
  generateMetadata as generateArticleMetadata,
} from '@/app/[locale]/[category]/[slug]/page';

type RiderInterviewPageProps = {
  params: {
    locale: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: RiderInterviewPageProps) {
  return generateArticleMetadata({
    params: {
      locale: params.locale,
      category: 'riders',
      slug: params.slug,
    },
  });
}

export default async function RiderInterviewPage({ params }: RiderInterviewPageProps) {
  return ArticlePage({
    params: {
      locale: params.locale,
      category: 'riders',
      slug: params.slug,
    },
  });
}
