import { describe, expect, it } from 'vitest';
import {
  getPublicMastheadLinks,
  isPublicMastheadLinkActive,
  PUBLIC_MAGAZINE_CATEGORY_IDS,
} from './navigation';

describe('PUBLIC_MAGAZINE_CATEGORY_IDS', () => {
  it('keeps the launch navigation limited to content-backed sections', () => {
    expect(PUBLIC_MAGAZINE_CATEGORY_IDS).toEqual([
      'editorial',
      'riders',
      'look',
    ]);
  });
});

describe('getPublicMastheadLinks', () => {
  it('adds subscribe after the launch category links', () => {
    expect(getPublicMastheadLinks('ko').map((link) => link.href)).toEqual([
      '/ko/editorial',
      '/ko/riders',
      '/ko/look',
      '/ko/subscribe',
    ]);
  });

  it('marks category links with category analytics metadata', () => {
    expect(getPublicMastheadLinks('en')[0]).toMatchObject({
      id: 'editorial',
      analyticsEvent: 'category_nav',
      category: 'editorial',
    });
  });
});

describe('isPublicMastheadLinkActive', () => {
  it('treats nested routes as active under their first path segment', () => {
    const links = getPublicMastheadLinks('ko');

    expect(isPublicMastheadLinkActive(links[2], ['look', 'ss26'])).toBe(true);
    expect(isPublicMastheadLinkActive(links[3], ['look', 'ss26'])).toBe(false);
  });
});
