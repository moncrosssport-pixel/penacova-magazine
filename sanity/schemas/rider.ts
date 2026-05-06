import { defineField, defineType } from 'sanity';
import {
  localizedField,
  localizedStringObjectFields,
} from '../helpers/localizedField';

export const rider = defineType({
  name: 'rider',
  title: 'Rider',
  type: 'document',
  fields: [
    localizedField('name', 'Name'),
    defineField({
      name: 'romanizedName',
      title: 'Romanized name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'romanizedName', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
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
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'name.ko',
      subtitle: 'club',
      media: 'portrait',
    },
  },
});
