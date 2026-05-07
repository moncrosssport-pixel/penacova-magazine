import { describe, expect, it } from 'vitest';
import {
  bodyLocaleFor,
  isApprovedTranslationStatus,
  teaserLocaleFor,
} from './translation';

describe('isApprovedTranslationStatus', () => {
  it('treats reviewed and manual translations as publishable', () => {
    expect(isApprovedTranslationStatus('reviewed')).toBe(true);
    expect(isApprovedTranslationStatus('manual')).toBe(true);
    expect(isApprovedTranslationStatus('auto-draft')).toBe(false);
    expect(isApprovedTranslationStatus('not-started')).toBe(false);
    expect(isApprovedTranslationStatus(undefined)).toBe(false);
  });
});

describe('teaserLocaleFor', () => {
  it('uses Korean for source locale and unapproved translations', () => {
    expect(teaserLocaleFor('ko', { en: 'not-started' })).toBe('ko');
    expect(teaserLocaleFor('en', { en: 'not-started' })).toBe('ko');
    expect(teaserLocaleFor('jp', { jp: 'auto-draft' })).toBe('ko');
  });

  it('uses the requested locale once translation is approved', () => {
    expect(teaserLocaleFor('en', { en: 'reviewed' })).toBe('en');
    expect(teaserLocaleFor('jp', { jp: 'manual' })).toBe('jp');
  });
});

describe('bodyLocaleFor', () => {
  it('requires both approval and localized body content', () => {
    expect(bodyLocaleFor('en', { en: 'reviewed' }, true)).toBe('en');
    expect(bodyLocaleFor('en', { en: 'reviewed' }, false)).toBe('ko');
    expect(bodyLocaleFor('en', { en: 'not-started' }, true)).toBe('ko');
  });
});
