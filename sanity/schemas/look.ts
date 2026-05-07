import { defineField, defineType } from 'sanity';
import { localizedField } from '../helpers/localizedField';

export const look = defineType({
  name: 'look',
  title: 'Look',
  type: 'document',
  description:
    'Single look inside a seasonal collection. Link products and an optional rider for the public look book page.',
  fields: [
    defineField({
      name: 'number',
      title: 'Number',
      description: 'Example: No 01',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    localizedField('name', 'Name'),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'products',
      title: 'Products in this look',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'rider',
      title: 'Rider',
      type: 'reference',
      to: [{ type: 'rider' }],
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      description:
        'Choose the Collection this look belongs to so editors can manage the look from either side.',
      type: 'reference',
      to: [{ type: 'collection' }],
    }),
  ],
  preview: {
    select: {
      title: 'number',
      subtitle: 'name.ko',
      collection: 'collection.season',
      media: 'image',
    },
    prepare({ title, subtitle, collection, media }) {
      return {
        title: title || 'Untitled look',
        subtitle: [collection, subtitle].filter(Boolean).join(' - '),
        media,
      };
    },
  },
});
