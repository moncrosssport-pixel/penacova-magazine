import {
  MAGAZINE_CATEGORIES,
  type ArticleCategory,
} from '../lib/magazine/categories';

export type StudioOrdering = {
  field: string;
  direction: 'asc' | 'desc';
};

export type ArticlePublishingCategory = {
  category: ArticleCategory;
  structureTitle: string;
  templateId: `article-${ArticleCategory}`;
  templateTitle: string;
  moodVariant: 'editorial' | 'feature';
};

export type StudioDocumentListSection = {
  title: string;
  schemaType: string;
  filter: string;
  params?: Record<string, string>;
  defaultOrdering: StudioOrdering[];
};

const articleStudioCopy: Partial<
  Record<
    ArticleCategory,
    {
      structureTitle?: string;
      templateTitle?: string;
    }
  >
> = {
  editorial: {
    structureTitle: 'Editorial 글',
    templateTitle: '새 Editorial 글 만들기',
  },
  riders: {
    structureTitle: 'Riders 인터뷰 글',
    templateTitle: '새 Riders 인터뷰 글 만들기',
  },
  look: {
    structureTitle: 'Look 글',
    templateTitle: '새 Look 글 만들기',
  },
  heritage: {
    structureTitle: 'Heritage 글',
    templateTitle: '새 Heritage 글 만들기',
  },
  guide: {
    structureTitle: 'Guide 글',
    templateTitle: '새 Guide 글 만들기',
  },
  news: {
    structureTitle: 'News 글',
    templateTitle: '새 News 글 만들기',
  },
  stories: {
    structureTitle: 'Stories 글',
    templateTitle: '새 Stories 글 만들기',
  },
};

export const articlePublishingCategories: ArticlePublishingCategory[] =
  MAGAZINE_CATEGORIES.map((category) => {
    const copy = articleStudioCopy[category.id] || {};
    const structureTitle = copy.structureTitle || category.label;

    return {
      category: category.id,
      structureTitle,
      templateId: `article-${category.id}` as ArticlePublishingCategory['templateId'],
      templateTitle: copy.templateTitle || `새 ${structureTitle} 만들기`,
      moodVariant: category.id === 'editorial' ? 'editorial' : 'feature',
    };
  });

export const priorityAscending: StudioOrdering[] = [
  { field: 'priority', direction: 'asc' },
];

export const launchDeskSections: StudioDocumentListSection[] = [
  {
    title: '런칭 글 카드',
    schemaType: 'launchBrief',
    filter: '_type == "launchBrief" && briefType == "story"',
    defaultOrdering: priorityAscending,
  },
  {
    title: '라이더 프로필 카드',
    schemaType: 'launchBrief',
    filter: '_type == "launchBrief" && briefType == "rider-profile"',
    defaultOrdering: priorityAscending,
  },
  {
    title: '용어집 작업 카드',
    schemaType: 'launchBrief',
    filter: '_type == "launchBrief" && briefType == "glossary-batch"',
    defaultOrdering: priorityAscending,
  },
  {
    title: '사진 / 승인 필요',
    schemaType: 'launchBrief',
    filter:
      '_type == "launchBrief" && (status == "assets-needed" || needsApproval == true)',
    defaultOrdering: priorityAscending,
  },
  {
    title: '게시 준비 완료',
    schemaType: 'launchBrief',
    filter: '_type == "launchBrief" && status == "ready-to-publish"',
    defaultOrdering: priorityAscending,
  },
];

export const glossaryReviewSections: StudioDocumentListSection[] = [
  {
    title: '일본어 검수 필요 용어',
    schemaType: 'glossary',
    filter: '_type == "glossary" && reviewStatus == "jp-review-needed"',
    defaultOrdering: [{ field: 'koTerm', direction: 'asc' }],
  },
  {
    title: '게시 준비 완료 용어',
    schemaType: 'glossary',
    filter: '_type == "glossary" && reviewStatus == "ready"',
    defaultOrdering: [{ field: 'koTerm', direction: 'asc' }],
  },
];
