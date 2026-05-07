import { describe, expect, it } from 'vitest';
import {
  createMagazineAnalyticsEvent,
  readDepthEventNameForSurface,
} from './events';

describe('createMagazineAnalyticsEvent', () => {
  it('keeps a compact provider-safe payload', () => {
    expect(
      createMagazineAnalyticsEvent('outbound_cafe24', {
        label: '  article_cta  ',
        locale: 'ko',
        depth: 50,
        active: true,
        missing: null,
        empty: '',
        nested: { ignored: true },
        list: ['ignored'],
        badNumber: Number.POSITIVE_INFINITY,
        ignored: undefined,
      }),
    ).toEqual({
      name: 'outbound_cafe24',
      payload: {
        label: 'article_cta',
        locale: 'ko',
        depth: 50,
        active: true,
        missing: null,
      },
    });
  });
});

describe('readDepthEventNameForSurface', () => {
  it('maps trackable page surfaces to stable event names', () => {
    expect(readDepthEventNameForSurface('article')).toBe('article_read_depth');
    expect(readDepthEventNameForSurface('lookbook')).toBe('lookbook_read_depth');
    expect(readDepthEventNameForSurface('home')).toBeNull();
    expect(readDepthEventNameForSurface(null)).toBeNull();
  });
});
