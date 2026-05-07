import { describe, expect, it } from 'vitest';
import { normalizeNewsletterSettings } from './newsletter';

describe('normalizeNewsletterSettings', () => {
  it('keeps valid provider and follow URLs while dropping unsafe values', () => {
    const settings = normalizeNewsletterSettings({
      newsletterFormAction: ' https://newsletter.example.com/signup ',
      newsletterEmailFieldName: '  member[email] ',
      followLinks: [
        { label: 'Instagram', url: 'https://instagram.com/penacova' },
        { label: 'Bad', url: 'javascript:alert(1)' },
        { label: '', url: 'https://example.com/ignored' },
      ],
    });

    expect(settings.newsletterFormAction).toBe(
      'https://newsletter.example.com/signup',
    );
    expect(settings.newsletterEmailFieldName).toBe('member[email]');
    expect(settings.followLinks).toEqual([
      { label: 'Instagram', url: 'https://instagram.com/penacova' },
    ]);
  });

  it('falls back to editorial copy and a safe email field name', () => {
    const settings = normalizeNewsletterSettings(null);

    expect(settings.title.ko).toBeTruthy();
    expect(settings.description.en).toContain('monthly');
    expect(settings.newsletterEmailFieldName).toBe('EMAIL');
    expect(settings.followLinks).toEqual([]);
  });
});
