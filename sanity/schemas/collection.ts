import { defineField, defineType } from 'sanity';
import { localizedField } from '../helpers/localizedField';

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'season',
      title: 'Season',
      description: 'Example: SS 2026',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    localizedField('title', 'Title'),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'looks',
      title: 'Looks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'look' }] }],
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'cafe24CollectionUrlKR',
      title: 'Cafe24 collection URL (KR)',
      type: 'url',
    }),
    defineField({
      name: 'cafe24CollectionUrlJP',
      title: 'Cafe24 collection URL (JP)',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'season',
      subtitle: 'title.ko',
      media: 'heroImage',
    },
  },
});
