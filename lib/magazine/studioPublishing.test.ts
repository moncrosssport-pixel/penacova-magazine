import { MAGAZINE_CATEGORIES } from '@/lib/magazine/categories';
import {
  articlePublishingCategories,
  launchDeskSections,
} from '@/sanity/publishing';
import { article } from '@/sanity/schemas/article';
import { schemaTemplates } from '@/sanity/templates';
import { describe, expect, it } from 'vitest';

type TemplateValue = {
  category?: string;
  moodVariant?: string;
  translationStatus?: Record<string, string>;
};

type SanityField = {
  name?: string;
  title?: string;
  type?: string;
  description?: string;
  readOnly?: boolean;
  components?: Record<string, unknown>;
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
    expect(articlePublishingCategories.map((item) => item.templateTitle)).toEqual([
      '새 Editorial 글 만들기',
      '새 Riders 인터뷰 글 만들기',
      '새 Look 글 만들기',
      '새 Heritage 글 만들기',
      '새 Guide 글 만들기',
      '새 News 글 만들기',
      '새 Stories 글 만들기',
    ]);
  });

  it('keeps Launch Desk filters focused on no-code publishing work', () => {
    expect(launchDeskSections.map((section) => section.title)).toEqual([
      '런칭 글 카드',
      '라이더 프로필 카드',
      '용어집 작업 카드',
      '사진 / 승인 필요',
      '게시 준비 완료',
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

  it('keeps Article documents operator-friendly inside Studio', () => {
    const fields = article.fields as SanityField[];
    const byName = (name: string) => fields.find((field) => field.name === name);

    expect(byName('operatorPreview')).toMatchObject({
      title: '미리보기 버튼',
      type: 'string',
      readOnly: true,
    });
    expect(byName('operatorPreview')?.components?.input).toBeTypeOf('function');

    expect(byName('operatorChecklist')).toMatchObject({
      title: '게시 전 체크리스트',
      type: 'string',
      readOnly: true,
    });
    expect(byName('operatorChecklist')?.components?.input).toBeTypeOf('function');

    expect(byName('slug')?.description).toContain('게시 주소입니다');
    expect(byName('heroImage')?.description).toContain(
      '대표 이미지를 올려주세요',
    );
    expect(byName('body')?.description).toContain('본문 작성 영역입니다');
  });
});
