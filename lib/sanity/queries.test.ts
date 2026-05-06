import { describe, expect, it } from 'vitest';
import {
  articleBySlugParams,
  articleBySlugQuery,
  articlesByCategoryParams,
  articlesByCategoryQuery,
  sitemapArticlesQuery,
} from './queries';

describe('articleBySlugQuery', () => {
  it('filters article documents by slug and category', () => {
    const query = articleBySlugQuery();

    expect(query).toContain('_type == "article"');
    expect(query).toContain('slug.current == $slug');
    expect(query).toContain('category == $category');
    expect(query).toContain('publishedAt <= now()');
    expect(query).toContain('!(_id in path("drafts.**"))');
  });

  it('projects the fields needed by the article page', () => {
    const query = articleBySlugQuery();

    for (const field of [
      'title',
      'excerpt',
      '"slug": slug.current',
      'category',
      'heroImage',
      'body',
      'publishedAt',
      'moodVariant',
      'seo',
      'authors[]->',
      'featuredProducts[]->',
      'relatedRiders[]->',
    ]) {
      expect(query).toContain(field);
    }
  });
});

describe('articleBySlugParams', () => {
  it('returns the expected slug and category params', () => {
    expect(articleBySlugParams('quiet-morning', 'editorial')).toEqual({
      slug: 'quiet-morning',
      category: 'editorial',
    });
  });
});

describe('articlesByCategoryQuery', () => {
  it('filters published article documents by category', () => {
    const query = articlesByCategoryQuery();

    expect(query).toContain('_type == "article"');
    expect(query).toContain('category == $category');
    expect(query).toContain('defined(slug.current)');
    expect(query).toContain('publishedAt <= now()');
    expect(query).toContain('!(_id in path("drafts.**"))');
    expect(query).toContain('order(publishedAt desc');
  });

  it('projects teaser fields for category pages', () => {
    const query = articlesByCategoryQuery();

    for (const field of [
      'title',
      'excerpt',
      '"slug": slug.current',
      'category',
      'heroImage',
      'publishedAt',
      'moodVariant',
      'authors[]->',
    ]) {
      expect(query).toContain(field);
    }
  });
});

describe('articlesByCategoryParams', () => {
  it('returns the expected category param', () => {
    expect(articlesByCategoryParams('heritage')).toEqual({
      category: 'heritage',
    });
  });
});

describe('sitemapArticlesQuery', () => {
  it('selects published article route fields for sitemap generation', () => {
    const query = sitemapArticlesQuery();

    expect(query).toContain('_type == "article"');
    expect(query).toContain('defined(slug.current)');
    expect(query).toContain('defined(category)');
    expect(query).toContain('publishedAt <= now()');
    expect(query).toContain('"slug": slug.current');
    expect(query).toContain('_updatedAt');
  });
});
