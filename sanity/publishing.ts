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
  riders: {
    structureTitle: 'Rider Interviews',
    templateTitle: 'Article - Rider Interview',
  },
  look: {
    structureTitle: 'Look Book Stories',
    templateTitle: 'Article - Look Book Story',
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
      templateTitle: copy.templateTitle || `Article - ${structureTitle}`,
      moodVariant: category.id === 'editorial' ? 'editorial' : 'feature',
    };
  });

export const priorityAscending: StudioOrdering[] = [
  { field: 'priority', direction: 'asc' },
];

export const launchDeskSections: StudioDocumentListSection[] = [
  {
    title: 'Story Briefs',
    schemaType: 'launchBrief',
    filter: '_type == "launchBrief" && briefType == "story"',
    defaultOrdering: priorityAscending,
  },
  {
    title: 'Rider Profile Briefs',
    schemaType: 'launchBrief',
    filter: '_type == "launchBrief" && briefType == "rider-profile"',
    defaultOrdering: priorityAscending,
  },
  {
    title: 'Glossary Batch',
    schemaType: 'launchBrief',
    filter: '_type == "launchBrief" && briefType == "glossary-batch"',
    defaultOrdering: priorityAscending,
  },
  {
    title: 'Needs Assets / Approval',
    schemaType: 'launchBrief',
    filter:
      '_type == "launchBrief" && (status == "assets-needed" || needsApproval == true)',
    defaultOrdering: priorityAscending,
  },
  {
    title: 'Ready to Publish',
    schemaType: 'launchBrief',
    filter: '_type == "launchBrief" && status == "ready-to-publish"',
    defaultOrdering: priorityAscending,
  },
];

export const glossaryReviewSections: StudioDocumentListSection[] = [
  {
    title: 'Glossary Needs JP Review',
    schemaType: 'glossary',
    filter: '_type == "glossary" && reviewStatus == "jp-review-needed"',
    defaultOrdering: [{ field: 'koTerm', direction: 'asc' }],
  },
  {
    title: 'Glossary Ready',
    schemaType: 'glossary',
    filter: '_type == "glossary" && reviewStatus == "ready"',
    defaultOrdering: [{ field: 'koTerm', direction: 'asc' }],
  },
];
