import launchBriefSeed from '@/sanity/seed/launch-briefs.json';
import { describe, expect, it } from 'vitest';

describe('launch brief seed payload', () => {
  it('creates the planned launch desk without publishing articles', () => {
    expect(launchBriefSeed).toHaveLength(18);
    expect(launchBriefSeed.every((document) => document._type === 'launchBrief'))
      .toBe(true);

    expect(
      launchBriefSeed.filter((document) => document.briefType === 'story'),
    ).toHaveLength(12);
    expect(
      launchBriefSeed.filter(
        (document) => document.briefType === 'rider-profile',
      ),
    ).toHaveLength(5);
    expect(
      launchBriefSeed.filter(
        (document) => document.briefType === 'glossary-batch',
      ),
    ).toHaveLength(1);
  });

  it('keeps every launch brief trackable from Studio', () => {
    for (const document of launchBriefSeed) {
      expect(document._id).toMatch(/^launch-brief-/);
      expect(document.status).toBe('planned');
      expect(document.priority).toBeGreaterThan(0);
      expect(document.title.ko).toBeTruthy();
      expect(document.publishingNotes).toBeTruthy();
    }
  });

  it('does not invent real rider identities for placeholder profiles', () => {
    const riderBriefs = launchBriefSeed.filter(
      (document) => document.briefType === 'rider-profile',
    );

    expect(riderBriefs.map((document) => document.slug.current)).toEqual([
      'jiwon-kim',
      'junior-dressage-rider',
      'amateur-club-rider',
      'show-jumping-rider',
      'trainer-coach-profile',
    ]);
    expect(riderBriefs.slice(1).every((document) => document.needsApproval)).toBe(
      true,
    );
  });
});
