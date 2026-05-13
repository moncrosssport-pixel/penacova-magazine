import { defineField } from 'sanity';

export const SUPPORTED_LOCALES = [
  { id: 'ko', title: '한국어' },
  { id: 'en', title: 'English' },
  { id: 'jp', title: '日本語' },
] as const;

type LocalizedScalarType = 'string' | 'text';
type LocaleId = (typeof SUPPORTED_LOCALES)[number]['id'];
type LocalizedFieldOptions = {
  required?: boolean;
  description?: string;
  localeDescriptions?: Partial<Record<LocaleId, string>>;
};

export function localizedField(
  name: string,
  title: string,
  type: LocalizedScalarType = 'string',
  options: LocalizedFieldOptions = { required: true },
) {
  return defineField({
    name,
    title,
    description: options.description,
    type: 'object',
    fields: SUPPORTED_LOCALES.map((locale) =>
      defineField({
        name: locale.id,
        title: locale.title,
        description: options.localeDescriptions?.[locale.id],
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
  options: LocalizedFieldOptions = { required: true },
) {
  return defineField({
    name,
    title,
    description: options.description,
    type: 'object',
    fields: SUPPORTED_LOCALES.map((locale) =>
      defineField({
        name: locale.id,
        title: locale.title,
        description: options.localeDescriptions?.[locale.id],
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
