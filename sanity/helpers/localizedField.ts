import { defineField } from 'sanity';

export const SUPPORTED_LOCALES = [
  { id: 'ko', title: 'Korean' },
  { id: 'en', title: 'English' },
  { id: 'jp', title: 'Japanese' },
] as const;

type LocalizedScalarType = 'string' | 'text';

export function localizedField(
  name: string,
  title: string,
  type: LocalizedScalarType = 'string',
  options: { required?: boolean } = { required: true },
) {
  return defineField({
    name,
    title,
    type: 'object',
    fields: SUPPORTED_LOCALES.map((locale) =>
      defineField({
        name: locale.id,
        title: locale.title,
        type,
        validation:
          locale.id === 'ko' && options.required
            ? (Rule) => Rule.required()
            : undefined,
      }),
    ),
  });
}

export function localizedPortableText(
  name: string,
  title: string,
  options: { required?: boolean } = { required: true },
) {
  return defineField({
    name,
    title,
    type: 'object',
    fields: SUPPORTED_LOCALES.map((locale) =>
      defineField({
        name: locale.id,
        title: locale.title,
        type: 'array',
        of: [
          { type: 'block' },
          { type: 'image', options: { hotspot: true } },
        ],
        validation:
          locale.id === 'ko' && options.required
            ? (Rule) => Rule.required()
            : undefined,
      }),
    ),
  });
}

export function localizedStringObjectFields(required = false) {
  return SUPPORTED_LOCALES.map((locale) =>
    defineField({
      name: locale.id,
      title: locale.title,
      type: 'string',
      validation:
        locale.id === 'ko' && required ? (Rule) => Rule.required() : undefined,
    }),
  );
}
