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
    title: 'Launch Brief - Story',
    schemaType: 'launchBrief',
    value: {
      briefType: 'story',
      status: 'planned',
      needsApproval: false,
    },
  },
  {
    id: 'launch-brief-rider-profile',
    title: 'Launch Brief - Rider Profile',
    schemaType: 'launchBrief',
    value: {
      briefType: 'rider-profile',
      status: 'planned',
      needsApproval: true,
    },
  },
  {
    id: 'launch-brief-glossary-batch',
    title: 'Launch Brief - Glossary Batch',
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
    title: 'Rider Profile',
    schemaType: 'rider',
    value: {},
  },
  {
    id: 'collection-season',
    title: 'Collection / Season',
    schemaType: 'collection',
    value: {
      season: 'SS26',
    },
  },
  {
    id: 'look-item',
    title: 'Look',
    schemaType: 'look',
    value: {},
  },
  {
    id: 'product-reference',
    title: 'Product Reference',
    schemaType: 'product',
    value: {},
  },
  {
    id: 'person-author',
    title: 'Author / Editor',
    schemaType: 'person',
    value: {},
  },
  {
    id: 'glossary-term',
    title: 'Glossary Term',
    schemaType: 'glossary',
    value: {
      reviewStatus: 'needs-review',
    },
  },
];
