import { describe, expect, it } from 'vitest';
import {
  articleBySlugParams,
  articleBySlugQuery,
  articlesByCategoryParams,
  articlesByCategoryQuery,
  collectionBySlugParams,
  collectionBySlugQuery,
  riderBySlugParams,
  riderBySlugQuery,
  sitemapArticlesQuery,
  sitemapCollectionsQuery,
  sitemapRidersQuery,
  siteSettingsQuery,
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
      'translationStatus',
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
      'translationStatus',
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

describe('riderBySlugQuery', () => {
  it('filters rider documents by slug', () => {
    const query = riderBySlugQuery();

    expect(query).toContain('_type == "rider"');
    expect(query).toContain('slug.current == $slug');
    expect(query).toContain('!(_id in path("drafts.**"))');
  });

  it('projects rider profile fields and linked content', () => {
    const query = riderBySlugQuery();

    for (const field of [
      'name',
      'romanizedName',
      '"slug": slug.current',
      'portrait',
      'discipline',
      'careerYears',
      'club',
      'titles',
      'favoriteProducts[]->',
      'interviews[]->',
      'translationStatus',
    ]) {
      expect(query).toContain(field);
    }
  });
});

describe('riderBySlugParams', () => {
  it('returns the expected rider slug param', () => {
    expect(riderBySlugParams('jiwon-kim')).toEqual({
      slug: 'jiwon-kim',
    });
  });
});

describe('collectionBySlugQuery', () => {
  it('filters collection documents by slug', () => {
    const query = collectionBySlugQuery();

    expect(query).toContain('_type == "collection"');
    expect(query).toContain('slug.current == $slug');
    expect(query).toContain('!(_id in path("drafts.**"))');
  });

  it('projects collection look book fields', () => {
    const query = collectionBySlugQuery();

    for (const field of [
      'season',
      'title',
      '"slug": slug.current',
      'heroImage',
      'cafe24CollectionUrlKR',
      'cafe24CollectionUrlJP',
      'looks[]->',
      'products[]->',
      'rider->',
    ]) {
      expect(query).toContain(field);
    }
  });
});

describe('collectionBySlugParams', () => {
  it('returns the expected collection slug param', () => {
    expect(collectionBySlugParams('ss26')).toEqual({
      slug: 'ss26',
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

describe('sitemapCollectionsQuery', () => {
  it('selects collection route fields for sitemap generation', () => {
    const query = sitemapCollectionsQuery();

    expect(query).toContain('_type == "collection"');
    expect(query).toContain('defined(slug.current)');
    expect(query).toContain('"slug": slug.current');
    expect(query).toContain('_updatedAt');
  });
});

describe('sitemapRidersQuery', () => {
  it('selects rider route fields for sitemap generation', () => {
    const query = sitemapRidersQuery();

    expect(query).toContain('_type == "rider"');
    expect(query).toContain('defined(slug.current)');
    expect(query).toContain('"slug": slug.current');
    expect(query).toContain('_updatedAt');
  });
});

describe('siteSettingsQuery', () => {
  it('selects the singleton newsletter and follow settings', () => {
    const query = siteSettingsQuery();

    expect(query).toContain('_type == "siteSettings"');
    expect(query).toContain('_id == "site-settings"');
    expect(query).toContain('newsletterFormAction');
    expect(query).toContain('newsletterEmailFieldName');
    expect(query).toContain('followLinks');
  });
});
