import { describe, expect, it } from 'vitest';
import { languageAlternates, localePath } from './routes';

describe('localePath', () => {
  it('builds locale-scoped paths', () => {
    expect(localePath('ko')).toBe('/ko');
    expect(localePath('en', ['editorial'])).toBe('/en/editorial');
    expect(localePath('jp', ['guide', 'quiet morning'])).toBe('/jp/guide/quiet%20morning');
  });
});

describe('languageAlternates', () => {
  it('builds alternates for every supported locale plus x-default', () => {
    expect(languageAlternates(['editorial', 'quiet-morning'])).toEqual({
      'ko-KR': '/ko/editorial/quiet-morning',
      'en-US': '/en/editorial/quiet-morning',
      'ja-JP': '/jp/editorial/quiet-morning',
      'x-default': '/ko/editorial/quiet-morning',
    });
  });
});
