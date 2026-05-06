import { defineField, defineType } from 'sanity';

export const glossary = defineType({
  name: 'glossary',
  title: 'Glossary',
  type: 'document',
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
      type: 'string',
    }),
    defineField({
      name: 'scope',
      title: 'Scope',
      type: 'string',
      options: {
        list: [
          { title: 'Brand', value: 'brand' },
          { title: 'Product', value: 'product' },
          { title: 'Equestrian', value: 'equestrian' },
          { title: 'Rider', value: 'rider' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
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
      subtitle: 'scope',
    },
  },
});
