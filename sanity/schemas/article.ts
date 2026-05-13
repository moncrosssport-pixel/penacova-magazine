import { defineField, defineType } from 'sanity';
import {
  localizedField,
  localizedPortableText,
} from '../helpers/localizedField';
import { ArticlePreviewLink } from '../components/ArticlePreviewLink';
import { PublishChecklist } from '../components/PublishChecklist';
import { articlePublishingCategories } from '../publishing';

const articleCategories = articlePublishingCategories.map((item) => ({
  title: item.structureTitle,
  value: item.category,
}));

const translationStatuses = [
  { title: '번역 전', value: 'not-started' },
  { title: '자동 초안', value: 'auto-draft' },
  { title: '검수 완료', value: 'reviewed' },
  { title: '수동 작성 완료', value: 'manual' },
];

export const article = defineType({
  name: 'article',
  title: '매거진 게시글',
  type: 'document',
  description:
    '운영자가 코드 없이 올리는 매거진 글입니다. 카테고리, slug, 대표 이미지, 한국어 본문, 공개일을 채우고 Publish하세요.',
  fields: [
    localizedField('title', '제목', 'string', {
      description: '목록, 상세 페이지, SEO 기본값으로 쓰이는 공개 제목입니다.',
      localeDescriptions: {
        ko: '한국어가 원본입니다. 먼저 여기를 완성하세요.',
        en: '검수된 영어 제목이 있을 때만 입력하세요.',
        jp: '검수된 일본어 제목이 있을 때만 입력하세요.',
      },
    }),
    defineField({
      name: 'slug',
      title: '게시 주소 slug',
      description:
        '게시 주소입니다. 한국어 제목을 입력한 뒤 Generate를 누르세요. 예: /ko/editorial/quiet-morning',
      type: 'slug',
      options: { source: 'title.ko', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '카테고리 / 공개 메뉴',
      description:
        '이 글이 어느 메뉴에 노출될지 정합니다. Riders 인터뷰 글은 /riders/interviews/[slug]로 공개되고, 라이더 프로필은 별도 Rider 문서에서 만듭니다.',
      type: 'string',
      options: {
        list: articleCategories,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'operatorPreview',
      title: '미리보기 버튼',
      description: '카테고리와 slug를 기준으로 실제 사이트 주소를 엽니다.',
      type: 'string',
      readOnly: true,
      components: { input: ArticlePreviewLink },
    }),
    defineField({
      name: 'operatorChecklist',
      title: '게시 전 체크리스트',
      description: 'Publish 전에 꼭 확인할 필수 항목입니다.',
      type: 'string',
      readOnly: true,
      components: { input: PublishChecklist },
    }),
    defineField({
      name: 'sourceBrief',
      title: '원본 런칭 카드',
      description:
        '런칭 작업실에서 만든 카드와 연결합니다. 사진, 승인, 최종 상태를 코드 없이 추적하기 위한 선택 항목입니다.',
      type: 'reference',
      to: [{ type: 'launchBrief' }],
      options: {
        filter: 'briefType == "story"',
      },
    }),
    localizedField('excerpt', '소개문', 'text', {
      description:
        '목록 카드와 검색/공유 기본 설명으로 쓰입니다. 한국어 기준 1-2문장으로 짧게 작성하세요.',
      localeDescriptions: {
        ko: '한국어 소개문은 필수입니다.',
        en: '영어 검수가 끝났을 때만 입력하세요.',
        jp: '일본어 검수가 끝났을 때만 입력하세요.',
      },
    }),
    defineField({
      name: 'heroImage',
      title: '대표 이미지',
      description:
        '대표 이미지를 올려주세요. 모바일에서 얼굴, 제품, 움직임이 잘리지 않도록 hotspot/focal point를 맞추세요.',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    localizedPortableText('body', '본문', {
      description:
        '본문 작성 영역입니다. 먼저 한국어 원문을 완성하고, 필요한 경우 본문 안에 이미지 1-3장을 추가하세요.',
      localeDescriptions: {
        ko: '한국어 본문은 필수입니다. 광고 문구보다 장면과 사실을 중심으로 작성하세요.',
        en: '검수된 영어 본문이 있을 때만 입력하세요.',
        jp: '검수된 일본어 본문이 있을 때만 입력하세요.',
      },
    }),
    defineField({
      name: 'issueNumber',
      title: '이슈 번호',
      description: '필요할 때만 입력합니다. 비워도 게시에는 문제가 없습니다.',
      type: 'number',
    }),
    defineField({
      name: 'publishedAt',
      title: '공개일',
      description:
        '공개일입니다. 즉시 공개하려면 오늘 날짜와 시간을 넣으세요. 미래 날짜는 편집 일정 표시용입니다.',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'moodVariant',
      title: '글 분위기',
      description:
        'Editorial은 사진 중심의 화보형 글에, Feature는 가이드/뉴스/인터뷰형 글에 어울립니다.',
      type: 'string',
      options: {
        list: [
          { title: 'Editorial / 화보형', value: 'editorial' },
          { title: 'Feature / 설명형', value: 'feature' },
        ],
        layout: 'radio',
      },
      initialValue: 'feature',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: '작성자',
      description: '필요하면 작성자/편집자를 연결합니다.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    }),
    defineField({
      name: 'featuredProducts',
      title: '관련 상품 참고자료',
      description: '본문 끝 CTA나 룩북 연결에 필요한 상품 참고자료를 연결합니다.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'relatedRiders',
      title: '관련 라이더',
      description: '승인된 라이더 프로필이 있을 때만 연결합니다.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'rider' }] }],
    }),
    defineField({
      name: 'translationStatus',
      title: '번역 상태',
      description:
        'EN/JP는 검수 완료 또는 수동 작성 완료일 때만 완성 번역으로 표시됩니다. 번역 전이면 한국어 원문 안내가 표시됩니다.',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
          options: { list: translationStatuses },
          initialValue: 'not-started',
        }),
        defineField({
          name: 'jp',
          title: 'Japanese',
          type: 'string',
          options: { list: translationStatuses },
          initialValue: 'not-started',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      description:
        '검색/공유 문구를 별도로 쓰고 싶을 때만 입력합니다. 비워두면 제목, 소개문, 대표 이미지를 자동으로 사용합니다.',
      type: 'object',
      fields: [
        localizedField('title', 'SEO 제목', 'string', { required: false }),
        localizedField('description', 'SEO 설명', 'text', {
          required: false,
        }),
        defineField({
          name: 'ogImage',
          title: '공유 이미지',
          description: 'SNS 공유용 이미지를 대표 이미지와 다르게 쓰고 싶을 때만 올립니다.',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: '본문 끝 CTA',
      description:
        'Cafe24 또는 컬렉션 페이지로 조용히 연결하는 텍스트 CTA입니다. 매거진 안 장바구니/결제처럼 쓰지 마세요.',
      type: 'object',
      fields: [
        localizedField('label', '버튼/링크 문구', 'string', {
          required: false,
        }),
        defineField({ name: 'urlKR', title: 'URL KR', type: 'url' }),
        defineField({ name: 'urlJP', title: 'URL JP', type: 'url' }),
        defineField({ name: 'urlEN', title: 'URL EN', type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.ko',
      category: 'category',
      slug: 'slug.current',
      media: 'heroImage',
    },
    prepare({ title, category, slug, media }) {
      const path = slug
        ? category === 'riders'
          ? `/ko/riders/interviews/${slug}`
          : category
            ? `/ko/${category}/${slug}`
            : 'Choose category before publishing'
        : 'Generate slug before publishing';

      return {
        title: title || 'Untitled article',
        subtitle: path,
        media,
      };
    },
  },
});
