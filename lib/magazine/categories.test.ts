import { describe, expect, it } from 'vitest';
import {
  getCategoryMeta,
  isArticleCategory,
  MAGAZINE_CATEGORIES,
} from './categories';

describe('MAGAZINE_CATEGORIES', () => {
  it('contains the editorial magazine category set', () => {
    expect(MAGAZINE_CATEGORIES.map((category) => category.id)).toEqual([
      'editorial',
      'riders',
      'look',
      'heritage',
      'guide',
      'news',
      'stories',
    ]);
  });

  it('narrows valid category strings', () => {
    expect(isArticleCategory('editorial')).toBe(true);
    expect(isArticleCategory('shop')).toBe(false);
    expect(isArticleCategory(undefined)).toBe(false);
  });

  it('returns localized metadata for category pages', () => {
    const meta = getCategoryMeta('guide');

    expect(meta.label).toBe('Guide');
    expect(meta.dek.ko).toContain('사이즈');
    expect(meta.empty.en).toContain('No guides');
  });
});
