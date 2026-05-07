import { defineField, defineType } from 'sanity';
import { localizedField } from '../helpers/localizedField';

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  description:
    'No-code seasonal look book. Publishes at /[locale]/look/[slug] after looks are linked.',
  fields: [
    defineField({
      name: 'season',
      title: 'Season',
      description: 'Example: SS 2026',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'Click Generate from the season. Example: SS26 becomes /ko/look/ss26.',
      type: 'slug',
      options: { source: 'season', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    localizedField('title', 'Title'),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      description:
        'Recommended before launch. Without a hero image, the page uses a quiet tonal fallback.',
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
      slug: 'slug.current',
      media: 'heroImage',
    },
    prepare({ title, subtitle, slug, media }) {
      return {
        title: title || 'Untitled collection',
        subtitle: slug ? `/ko/look/${slug} - ${subtitle || 'No Korean title'}` : 'Generate slug before publishing',
        media,
      };
    },
  },
});
