import type { Template } from 'sanity';
import { articlePublishingCategories } from './publishing';

const defaultTranslationStatus = {
  en: 'not-started',
  jp: 'not-started',
};

function articleTemplate(
  id: string,
  title: string,
  category: string,
  moodVariant: 'editorial' | 'feature' = 'feature',
): Template {
  return {
    id,
    title,
    schemaType: 'article',
    value: {
      category,
      moodVariant,
      translationStatus: defaultTranslationStatus,
    },
  };
}

export const schemaTemplates: Template[] = [
  {
    id: 'launch-brief-story',
    title: '런칭 카드 - 매거진 글',
    schemaType: 'launchBrief',
    value: {
      briefType: 'story',
      status: 'planned',
      needsApproval: false,
    },
  },
  {
    id: 'launch-brief-rider-profile',
    title: '런칭 카드 - 라이더 프로필',
    schemaType: 'launchBrief',
    value: {
      briefType: 'rider-profile',
      status: 'planned',
      needsApproval: true,
    },
  },
  {
    id: 'launch-brief-glossary-batch',
    title: '런칭 카드 - 용어집 묶음',
    schemaType: 'launchBrief',
    value: {
      briefType: 'glossary-batch',
      status: 'planned',
      needsApproval: false,
    },
  },
  ...articlePublishingCategories.map((item) =>
    articleTemplate(
      item.templateId,
      item.templateTitle,
      item.category,
      item.moodVariant,
    ),
  ),
  {
    id: 'rider-profile',
    title: '새 라이더 프로필 만들기',
    schemaType: 'rider',
    value: {},
  },
  {
    id: 'collection-season',
    title: '새 시즌 컬렉션 만들기',
    schemaType: 'collection',
    value: {
      season: 'SS26',
    },
  },
  {
    id: 'look-item',
    title: '새 룩 만들기',
    schemaType: 'look',
    value: {},
  },
  {
    id: 'product-reference',
    title: '새 상품 참고자료 만들기',
    schemaType: 'product',
    value: {},
  },
  {
    id: 'person-author',
    title: '새 작성자 만들기',
    schemaType: 'person',
    value: {},
  },
  {
    id: 'glossary-term',
    title: '새 용어 만들기',
    schemaType: 'glossary',
    value: {
      reviewStatus: 'needs-review',
    },
  },
];
