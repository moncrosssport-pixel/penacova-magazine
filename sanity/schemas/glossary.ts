import { defineField, defineType } from 'sanity';

const glossaryScopes = [
  { title: 'Brand', value: 'brand' },
  { title: 'Product', value: 'product' },
  { title: 'Equestrian', value: 'equestrian' },
  { title: 'Rider', value: 'rider' },
  { title: 'Tack', value: 'tack' },
  { title: 'Apparel', value: 'apparel' },
  { title: 'Training', value: 'training' },
  { title: 'Gait', value: 'gait' },
  { title: 'Discipline', value: 'discipline' },
  { title: 'Horse care', value: 'horse-care' },
  { title: 'Competition', value: 'competition' },
];

const reviewStatuses = [
  { title: 'Needs review', value: 'needs-review' },
  { title: 'Korean / English reviewed', value: 'ko-en-reviewed' },
  { title: 'Japanese review needed', value: 'jp-review-needed' },
  { title: 'Ready', value: 'ready' },
];

export const glossary = defineType({
  name: 'glossary',
  title: 'Glossary',
  type: 'document',
  description:
    'No-code terminology entry for consistent Korean source copy, EN/JP translation, SEO, and future agent handoffs.',
  fields: [
    defineField({
      name: 'koTerm',
      title: 'Korean term',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'enTerm',
      title: 'English term',
      type: 'string',
    }),
    defineField({
      name: 'jpTerm',
      title: 'Japanese term',
      description:
        'Leave blank until a Japanese reviewer confirms the correct term.',
      type: 'string',
    }),
    defineField({
      name: 'reviewStatus',
      title: 'Review status',
      type: 'string',
      options: {
        list: reviewStatuses,
        layout: 'dropdown',
      },
      initialValue: 'needs-review',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scope',
      title: 'Scope',
      type: 'string',
      options: {
        list: glossaryScopes,
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceBrief',
      title: 'Source launch brief',
      type: 'reference',
      to: [{ type: 'launchBrief' }],
      description:
        'Use this to connect launch glossary terms back to the Launch Desk planning batch.',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'koTerm',
      scope: 'scope',
      reviewStatus: 'reviewStatus',
    },
    prepare({ title, scope, reviewStatus }) {
      return {
        title: title || 'Untitled glossary term',
        subtitle: `${scope || 'scope'} · ${reviewStatus || 'needs-review'}`,
      };
    },
  },
});
