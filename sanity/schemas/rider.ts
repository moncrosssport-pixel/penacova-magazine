import { defineField, defineType } from 'sanity';
import {
  localizedField,
  localizedStringObjectFields,
} from '../helpers/localizedField';

export const rider = defineType({
  name: 'rider',
  title: 'Rider',
  type: 'document',
  description:
    'No-code rider profile. Publishes at /[locale]/riders/[slug] and can link to interview articles.',
  fields: [
    localizedField('name', 'Name'),
    defineField({
      name: 'romanizedName',
      title: 'Romanized name',
      description:
        'Used for slug generation and fallback display when a localized name is missing.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'Click Generate from the romanized name. This becomes /ko/riders/[slug].',
      type: 'slug',
      options: { source: 'romanizedName', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      description:
        'Recommended for launch. Without a portrait, the page uses the Penacova mark.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'discipline',
      title: 'Discipline',
      type: 'string',
      options: {
        list: [
          { title: 'Dressage', value: 'dressage' },
          { title: 'Show jumping', value: 'jumping' },
          { title: 'Eventing', value: 'eventing' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'careerYears',
      title: 'Career years',
      type: 'number',
    }),
    defineField({
      name: 'club',
      title: 'Club',
      type: 'string',
    }),
    defineField({
      name: 'titles',
      title: 'Titles / accolades',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'localizedTitle',
          title: 'Localized title',
          fields: localizedStringObjectFields(true),
        },
      ],
    }),
    defineField({
      name: 'favoriteProducts',
      title: 'Favorite products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'interviews',
      title: 'Interviews',
      description:
        'Reference published Article documents with category Rider Interview.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'name.ko',
      slug: 'slug.current',
      romanizedName: 'romanizedName',
      media: 'portrait',
    },
    prepare({ title, slug, romanizedName, media }) {
      return {
        title: title || romanizedName || 'Untitled rider',
        subtitle: slug ? `/ko/riders/${slug}` : 'Generate slug before publishing',
        media,
      };
    },
  },
});
