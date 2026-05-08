import { defineField, defineType } from 'sanity';
import { localizedField } from '../helpers/localizedField';

const articleCategories = [
  { title: 'Editorial', value: 'editorial' },
  { title: 'Riders', value: 'riders' },
  { title: 'Look', value: 'look' },
  { title: 'Heritage', value: 'heritage' },
  { title: 'Guide', value: 'guide' },
  { title: 'News', value: 'news' },
  { title: 'Stories', value: 'stories' },
];

const briefTypes = [
  { title: 'Story', value: 'story' },
  { title: 'Rider profile', value: 'rider-profile' },
  { title: 'Glossary batch', value: 'glossary-batch' },
];

const launchStatuses = [
  { title: 'Planned', value: 'planned' },
  { title: 'Needs assets', value: 'assets-needed' },
  { title: 'Writing', value: 'writing' },
  { title: 'Review', value: 'review' },
  { title: 'Ready to publish', value: 'ready-to-publish' },
  { title: 'Published', value: 'published' },
];

export const launchBrief = defineType({
  name: 'launchBrief',
  title: 'Launch Brief',
  type: 'document',
  description:
    'No-code launch planning card. Track each first story, rider profile, or glossary batch before the final public document is published.',
  fields: [
    defineField({
      name: 'briefType',
      title: 'Brief type',
      type: 'string',
      options: { list: briefTypes, layout: 'radio' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Lower numbers appear first in the Launch Desk.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: launchStatuses, layout: 'dropdown' },
      initialValue: 'planned',
      validation: (Rule) => Rule.required(),
    }),
    localizedField('title', 'Working title'),
    defineField({
      name: 'slug',
      title: 'Planned slug',
      type: 'slug',
      description:
        'Use this same slug when creating the final Article, Rider, or glossary import note.',
      options: { source: 'title.ko', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Article category',
      type: 'string',
      options: { list: articleCategories, layout: 'dropdown' },
      hidden: ({ parent }) => parent?.briefType !== 'story',
    }),
    defineField({
      name: 'purpose',
      title: 'Purpose',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'requiredAssets',
      title: 'Required assets',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Photography, profile permissions, product links, or review inputs needed before publishing.',
    }),
    defineField({
      name: 'ctaIntent',
      title: 'CTA intent',
      type: 'string',
      description:
        'Quiet end-of-story CTA target such as SS26 collection, Cafe24 KR/JP, subscribe, or follow link.',
    }),
    defineField({
      name: 'routeHint',
      title: 'Public route hint',
      type: 'string',
      readOnly: true,
      description:
        'Copy this pattern when checking the final published document.',
    }),
    defineField({
      name: 'needsApproval',
      title: 'Needs identity or asset approval',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'targetArticle',
      title: 'Final article',
      type: 'reference',
      to: [{ type: 'article' }],
      hidden: ({ parent }) => parent?.briefType !== 'story',
    }),
    defineField({
      name: 'targetRider',
      title: 'Final rider profile',
      type: 'reference',
      to: [{ type: 'rider' }],
      hidden: ({ parent }) => parent?.briefType !== 'rider-profile',
    }),
    defineField({
      name: 'targetGlossaryTerms',
      title: 'Final glossary terms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'glossary' }] }],
      hidden: ({ parent }) => parent?.briefType !== 'glossary-batch',
    }),
    defineField({
      name: 'publishingNotes',
      title: 'Publishing notes',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title.ko',
      briefType: 'briefType',
      status: 'status',
      priority: 'priority',
      slug: 'slug.current',
    },
    prepare({ title, briefType, status, priority, slug }) {
      return {
        title: title || 'Untitled launch brief',
        subtitle: `#${priority || '-'} · ${briefType || 'brief'} · ${
          status || 'planned'
        } · ${slug || 'missing-slug'}`,
      };
    },
  },
});
