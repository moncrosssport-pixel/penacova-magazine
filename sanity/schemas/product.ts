import { defineField, defineType } from 'sanity';
import { localizedField } from '../helpers/localizedField';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    localizedField('name', 'Name'),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.ko', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'priceKR',
      title: 'Price KRW',
      type: 'number',
    }),
    defineField({
      name: 'priceJP',
      title: 'Price JPY',
      type: 'number',
    }),
    defineField({
      name: 'cafe24UrlKR',
      title: 'Cafe24 URL (KR)',
      type: 'url',
    }),
    defineField({
      name: 'cafe24UrlJP',
      title: 'Cafe24 URL (JP)',
      type: 'url',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
    }),
  ],
  preview: {
    select: {
      title: 'name.ko',
      subtitle: 'color',
      media: 'image',
    },
  },
});
