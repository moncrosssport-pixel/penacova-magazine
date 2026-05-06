import { defineField, defineType } from 'sanity';
import { localizedField } from '../helpers/localizedField';

export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    localizedField('name', 'Name'),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Editor', value: 'editor' },
          { title: 'Writer', value: 'writer' },
          { title: 'Photographer', value: 'photographer' },
          { title: 'Stylist', value: 'stylist' },
          { title: 'Contributor', value: 'contributor' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
    }),
    localizedField('bio', 'Bio', 'text', { required: false }),
  ],
  preview: {
    select: {
      title: 'name.ko',
      subtitle: 'role',
      media: 'portrait',
    },
  },
});
