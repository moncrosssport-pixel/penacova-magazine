import { describe, expect, it } from 'vitest';
import { getArticleHref, getArticlePathSegments } from './categories';

describe('article route helpers', () => {
  it('keeps ordinary article URLs under their category', () => {
    expect(getArticlePathSegments('guide', 'summer-care')).toEqual([
      'guide',
      'summer-care',
    ]);
    expect(getArticleHref('ko', 'guide', 'summer-care')).toBe(
      '/ko/guide/summer-care',
    );
  });

  it('routes rider interview articles away from rider profile slugs', () => {
    expect(getArticlePathSegments('riders', 'jiwon-interview')).toEqual([
      'riders',
      'interviews',
      'jiwon-interview',
    ]);
    expect(getArticleHref('ko', 'riders', 'jiwon-interview')).toBe(
      '/ko/riders/interviews/jiwon-interview',
    );
  });
});
