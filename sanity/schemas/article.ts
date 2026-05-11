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
  description:
    'No-code magazine story. Choose a category, generate a slug, add Korean source content, then publish.',
  fields: [
    localizedField('title', 'Title'),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'Click Generate from the Korean title. This becomes the public URL slug.',
      type: 'slug',
      options: { source: 'title.ko', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category / public section',
      description:
        'Controls where the story appears. Rider interview articles publish under /riders/interviews/[slug]; rider profiles use Rider documents.',
      type: 'string',
      options: {
        list: articleCategories,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceBrief',
      title: 'Source launch brief',
      description:
        'Optional but recommended for launch content. Link the Article back to the Launch Desk card so editors can track assets, approval, and final status without code.',
      type: 'reference',
      to: [{ type: 'launchBrief' }],
      options: {
        filter: 'briefType == "story"',
      },
    }),
    localizedField('excerpt', 'Excerpt', 'text'),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      description:
        'Required before publishing. Use editorial photography with hotspot/focal point set.',
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
      description:
        'Set the public publish date. Future dates are for scheduled editorial planning.',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'moodVariant',
      title: 'Mood variant',
      description:
        'Editorial is more photo-led. Feature is better for guides, news, and interviews.',
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
      description:
        'Only Reviewed or Manual shows EN/JP as finished translations. Otherwise EN/JP routes show the Korean original notice.',
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
        'Optional search/social overrides. Leave blank to reuse the article title, excerpt, and hero image.',
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
      description:
        'Optional quiet text CTA to Cafe24 or a collection page. Do not use this as an in-site cart.',
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
