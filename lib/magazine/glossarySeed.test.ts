import glossaryStarterSeed from '@/sanity/seed/glossary-starter.json';
import { describe, expect, it } from 'vitest';

const allowedScopes = [
  'brand',
  'product',
  'equestrian',
  'rider',
  'tack',
  'apparel',
  'training',
  'gait',
  'discipline',
  'horse-care',
  'competition',
];

describe('glossary starter seed payload', () => {
  it('contains the 50 launch glossary starter terms', () => {
    expect(glossaryStarterSeed).toHaveLength(50);
    expect(glossaryStarterSeed.every((document) => document._type === 'glossary'))
      .toBe(true);
  });

  it('keeps Korean and English terms ready while flagging Japanese for review', () => {
    for (const document of glossaryStarterSeed) {
      expect(document._id).toMatch(/^glossary-/);
      expect(document.koTerm).toBeTruthy();
      expect(document.enTerm).toBeTruthy();
      expect(document.jpTerm ?? '').toBe('');
      expect(document.reviewStatus).toBe('jp-review-needed');
      expect(document.sourceBrief._ref).toBe(
        'launch-brief-glossary-starter-set',
      );
    }
  });

  it('uses only glossary scopes supported by the Studio schema', () => {
    for (const document of glossaryStarterSeed) {
      expect(allowedScopes).toContain(document.scope);
    }
  });
});
