import { MAGAZINE_CATEGORIES } from '@/lib/magazine/categories';
import {
  articlePublishingCategories,
  launchDeskSections,
} from '@/sanity/publishing';
import { schemaTemplates } from '@/sanity/templates';
import { describe, expect, it } from 'vitest';

type TemplateValue = {
  category?: string;
  moodVariant?: string;
  translationStatus?: Record<string, string>;
};

function valueOf(template: { value?: unknown }) {
  return template.value as TemplateValue;
}

describe('Studio publishing harness', () => {
  it('keeps article menus and templates aligned with public categories', () => {
    const publicCategoryIds = MAGAZINE_CATEGORIES.map((category) => category.id);
    const articleTemplates = schemaTemplates.filter(
      (template) => template.schemaType === 'article',
    );

    expect(articlePublishingCategories.map((item) => item.category)).toEqual(
      publicCategoryIds,
    );
    expect(articleTemplates.map((template) => template.id)).toEqual(
      articlePublishingCategories.map((item) => item.templateId),
    );
    expect(articleTemplates.map((template) => valueOf(template).category)).toEqual(
      publicCategoryIds,
    );

    for (const template of articleTemplates) {
      expect(valueOf(template).translationStatus).toEqual({
        en: 'not-started',
        jp: 'not-started',
      });
    }

    expect(valueOf(articleTemplates[0]).moodVariant).toBe('editorial');
  });

  it('keeps Launch Desk filters focused on no-code publishing work', () => {
    expect(launchDeskSections.map((section) => section.title)).toEqual([
      'Story Briefs',
      'Rider Profile Briefs',
      'Glossary Batch',
      'Needs Assets / Approval',
      'Ready to Publish',
    ]);

    for (const section of launchDeskSections) {
      expect(section.schemaType).toBe('launchBrief');
      expect(section.defaultOrdering).toEqual([
        { field: 'priority', direction: 'asc' },
      ]);
    }

    expect(launchDeskSections[0].filter).toContain('briefType == "story"');
    expect(launchDeskSections[3].filter).toContain('needsApproval == true');
    expect(launchDeskSections[4].filter).toContain(
      'status == "ready-to-publish"',
    );
  });
});
