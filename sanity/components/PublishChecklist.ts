import { createElement } from 'react';
import { useFormValue } from 'sanity';

const h = createElement;

type LocalizedValue = {
  ko?: unknown;
};

type ArticleDocument = {
  title?: LocalizedValue;
  excerpt?: LocalizedValue;
  body?: LocalizedValue;
  category?: unknown;
  slug?: {
    current?: unknown;
  };
  heroImage?: unknown;
  publishedAt?: unknown;
  translationStatus?: {
    en?: unknown;
    jp?: unknown;
  };
};

function hasText(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0;
}

function hasPortableText(value: unknown) {
  return Array.isArray(value) && value.length > 0;
}

export function PublishChecklist() {
  const document = useFormValue([]) as ArticleDocument | undefined;
  const checks = [
    { label: '한국어 제목', done: hasText(document?.title?.ko) },
    { label: '게시 주소 slug', done: hasText(document?.slug?.current) },
    { label: '카테고리', done: hasText(document?.category) },
    { label: '한국어 소개문', done: hasText(document?.excerpt?.ko) },
    { label: '대표 이미지', done: Boolean(document?.heroImage) },
    { label: '한국어 본문', done: hasPortableText(document?.body?.ko) },
    { label: '공개일', done: hasText(document?.publishedAt) },
    {
      label: 'EN/JP 번역 상태',
      done:
        hasText(document?.translationStatus?.en) &&
        hasText(document?.translationStatus?.jp),
    },
  ];
  const doneCount = checks.filter((check) => check.done).length;

  return h(
    'div',
    {
      style: {
        border: '1px solid #d7d0c3',
        borderRadius: 6,
        background: '#fffdf8',
        padding: 16,
      },
    },
    h(
      'div',
      { style: { display: 'flex', justifyContent: 'space-between', gap: 12 } },
      h('strong', null, '게시 전 체크리스트'),
      h('span', { style: { color: '#5f5a52' } }, `${doneCount}/${checks.length}`),
    ),
    h(
      'ul',
      {
        style: {
          display: 'grid',
          gap: 8,
          listStyle: 'none',
          margin: '12px 0 0',
          padding: 0,
        },
      },
      checks.map((check) =>
        h(
          'li',
          {
            key: check.label,
            style: {
              alignItems: 'center',
              color: check.done ? '#1f4b2d' : '#7a4e1e',
              display: 'flex',
              fontWeight: 700,
              gap: 8,
            },
          },
          h('span', { 'aria-hidden': 'true' }, check.done ? '✓' : '!'),
          check.label,
        ),
      ),
    ),
  );
}
