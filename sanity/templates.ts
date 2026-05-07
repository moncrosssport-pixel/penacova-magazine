import type { Template } from 'sanity';

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
  articleTemplate(
    'article-editorial',
    'Article - Editorial',
    'editorial',
    'editorial',
  ),
  articleTemplate('article-riders', 'Article - Rider Interview', 'riders'),
  articleTemplate('article-look', 'Article - Look Book Story', 'look'),
  articleTemplate('article-heritage', 'Article - Heritage', 'heritage'),
  articleTemplate('article-guide', 'Article - Guide', 'guide'),
  articleTemplate('article-news', 'Article - News', 'news'),
  articleTemplate('article-stories', 'Article - Stories', 'stories'),
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
    value: {},
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
    value: {},
  },
];
