import { defineField, defineType } from 'sanity';
import { localizedField } from '../helpers/localizedField';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  description:
    'No-code site-level settings for newsletter signup and follow links. Keep one published document with the ID site-settings.',
  fields: [
    localizedField('title', 'Newsletter title', 'string', { required: false }),
    localizedField('description', 'Newsletter description', 'text', {
      required: false,
    }),
    localizedField('consentCopy', 'Consent / frequency copy', 'string', {
      required: false,
    }),
    defineField({
      name: 'newsletterFormAction',
      title: 'Newsletter form action URL',
      description:
        'Paste the HTTPS form action URL from the newsletter provider. Leave blank until a provider is ready.',
      type: 'url',
    }),
    defineField({
      name: 'newsletterEmailFieldName',
      title: 'Email input field name',
      description:
        'Provider-specific email field name. Mailchimp often uses EMAIL.',
      type: 'string',
      initialValue: 'EMAIL',
    }),
    defineField({
      name: 'newsletterProviderName',
      title: 'Newsletter provider name',
      description: 'Optional internal label, such as Mailchimp or Klaviyo.',
      type: 'string',
    }),
    defineField({
      name: 'followLinks',
      title: 'Follow links',
      description:
        'Public links shown when readers want to follow Penacova before the email provider is connected.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Newsletter and follow links',
      };
    },
  },
});
