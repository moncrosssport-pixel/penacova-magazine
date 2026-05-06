import { defineField, defineType } from 'sanity';
import {
  localizedField,
  localizedPortableText,
} from '../helpers/localizedField';

const articleCategories = [
  { title: 'Editorial', value: 'editorial' },
  { title: 'Riders', value: 'riders' },
  { title: 'Look', value: 'look' },
  { title: 'Heritage', value: 'heritage' },
  { title: 'Guide', value: 'guide' },
  { title: 'News', value: 'news' },
  { title: 'Stories', value: 'stories' },
];

const translationStatuses = [
  { title: 'Not started', value: 'not-started' },
  { title: 'Auto draft', value: 'auto-draft' },
  { title: 'Reviewed', value: 'reviewed' },
  { title: 'Manual', value: 'manual' },
];

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    localizedField('title', 'Title'),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.ko', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: articleCategories,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    localizedField('excerpt', 'Excerpt', 'text'),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    localizedPortableText('body', 'Body'),
    defineField({
      name: 'issueNumber',
      title: 'Issue number',
      type: 'number',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'moodVariant',
      title: 'Mood variant',
      type: 'string',
      options: {
        list: [
          { title: 'Editorial', value: 'editorial' },
          { title: 'Feature', value: 'feature' },
        ],
        layout: 'radio',
      },
      initialValue: 'feature',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'relatedRiders',
      title: 'Related riders',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'rider' }] }],
    }),
    defineField({
      name: 'translationStatus',
      title: 'Translation status',
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
      type: 'object',
      fields: [
        localizedField('title', 'SEO title', 'string', { required: false }),
        localizedField('description', 'SEO description', 'text', {
          required: false,
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'End CTA',
      type: 'object',
      fields: [
        localizedField('label', 'Label', 'string', { required: false }),
        defineField({ name: 'urlKR', title: 'URL KR', type: 'url' }),
        defineField({ name: 'urlJP', title: 'URL JP', type: 'url' }),
        defineField({ name: 'urlEN', title: 'URL EN', type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.ko',
      subtitle: 'category',
      media: 'heroImage',
    },
  },
});
