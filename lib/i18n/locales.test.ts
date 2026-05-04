import { describe, it, expect } from 'vitest';
import { LOCALES, DEFAULT_LOCALE, isLocale, normalizeLocale } from './locales';

describe('LOCALES', () => {
  it('contains exactly ko, en, jp', () => {
    expect(LOCALES).toEqual(['ko', 'en', 'jp']);
  });
});

describe('DEFAULT_LOCALE', () => {
  it('is ko', () => {
    expect(DEFAULT_LOCALE).toBe('ko');
  });
});

describe('isLocale', () => {
  it('returns true for ko/en/jp', () => {
    expect(isLocale('ko')).toBe(true);
    expect(isLocale('en')).toBe(true);
    expect(isLocale('jp')).toBe(true);
  });

  it('returns false for unsupported codes', () => {
    expect(isLocale('fr')).toBe(false);
    expect(isLocale('')).toBe(false);
    expect(isLocale('KO')).toBe(false); // case-sensitive
  });
});

describe('normalizeLocale', () => {
  it('returns the locale when valid', () => {
    expect(normalizeLocale('en')).toBe('en');
  });

  it('returns DEFAULT_LOCALE when invalid', () => {
    expect(normalizeLocale('fr')).toBe('ko');
    expect(normalizeLocale(undefined)).toBe('ko');
  });
});
