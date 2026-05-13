import { createElement } from 'react';
import { useFormValue } from 'sanity';
import {
  getArticleHref,
  isArticleCategory,
  type ArticleCategory,
} from '../../lib/magazine/categories';

const h = createElement;
const productionOrigin = 'https://penacova-magazine.vercel.app';

type ArticleDocument = {
  category?: unknown;
  slug?: {
    current?: unknown;
  };
};

function getPreviewHref(document: ArticleDocument | undefined) {
  const category = document?.category;
  const slug = document?.slug?.current;

  if (!isArticleCategory(category) || typeof slug !== 'string' || !slug) {
    return null;
  }

  return `${productionOrigin}${getArticleHref('ko', category as ArticleCategory, slug)}`;
}

export function ArticlePreviewLink() {
  const document = useFormValue([]) as ArticleDocument | undefined;
  const href = getPreviewHref(document);

  return h(
    'div',
    {
      style: {
        border: '1px solid #d7d0c3',
        borderRadius: 6,
        background: '#fbfaf7',
        padding: 16,
      },
    },
    h('div', { style: { fontWeight: 700, marginBottom: 6 } }, '미리보기 / 공개 URL 확인'),
    h(
      'p',
      { style: { color: '#5f5a52', lineHeight: 1.55, margin: '0 0 12px' } },
      '카테고리와 slug가 준비되면 실제 사이트 주소를 열 수 있습니다. 아직 Publish 전인 글은 주소 구조 확인용으로 사용하고, 공개 후에는 같은 버튼으로 최종 화면을 확인하세요.',
    ),
    href
      ? h(
          'a',
          {
            href,
            rel: 'noreferrer',
            target: '_blank',
            style: {
              display: 'inline-flex',
              alignItems: 'center',
              border: '1px solid #1f1b16',
              borderRadius: 4,
              color: '#1f1b16',
              fontWeight: 700,
              padding: '8px 12px',
              textDecoration: 'none',
            },
          },
          '사이트에서 보기',
        )
      : h(
          'div',
          { style: { color: '#8a5a28', fontWeight: 700 } },
          '먼저 카테고리를 고르고 slug를 Generate 해주세요.',
        ),
  );
}
