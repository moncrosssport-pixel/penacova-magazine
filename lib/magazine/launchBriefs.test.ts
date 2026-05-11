import launchBriefSeed from '@/sanity/seed/launch-briefs.json';
import { article } from '@/sanity/schemas/article';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

type SanityField = {
  name?: string;
  title?: string;
  type?: string;
  description?: string;
  to?: Array<{ type: string }>;
};

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

  it('lets final articles reference their source Launch Desk brief', () => {
    const sourceBriefField = (article.fields as SanityField[]).find(
      (field) => field.name === 'sourceBrief',
    );

    expect(sourceBriefField).toMatchObject({
      title: 'Source launch brief',
      type: 'reference',
      to: [{ type: 'launchBrief' }],
    });
    expect(sourceBriefField?.description).toContain('Launch Desk');
  });

  it('documents a writing worksheet for every launch story brief', () => {
    const workbook = readFileSync(
      join(process.cwd(), 'docs/launch-story-workbook.md'),
      'utf8',
    );
    const storyBriefs = launchBriefSeed.filter(
      (document) => document.briefType === 'story',
    );

    for (const brief of storyBriefs) {
      expect(workbook).toContain(`\`${brief.slug.current}\``);
      expect(workbook).toContain(brief.routeHint);
    }

    expect(workbook).toContain('Source launch brief');
    expect(workbook).toContain('Do not publish from this workbook alone');
  });
});
