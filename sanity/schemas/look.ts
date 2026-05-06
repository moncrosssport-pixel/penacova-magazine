import { defineField, defineType } from 'sanity';
import { localizedField } from '../helpers/localizedField';

export const look = defineType({
  name: 'look',
  title: 'Look',
  type: 'document',
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
      type: 'reference',
      to: [{ type: 'collection' }],
    }),
  ],
  preview: {
    select: {
      title: 'number',
      subtitle: 'name.ko',
      media: 'image',
    },
  },
});
