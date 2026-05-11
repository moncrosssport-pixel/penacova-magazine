import launchBriefSeed from '@/sanity/seed/launch-briefs.json';
import { getArticleHref } from './categories';
import { launchStoryWorkbooks } from './launchStories';
import { describe, expect, it } from 'vitest';

describe('launchStoryWorkbooks', () => {
  it('covers every seeded launch story brief in publishing order', () => {
    const storyBriefs = launchBriefSeed
      .filter((brief) => brief.briefType === 'story')
      .sort((a, b) => a.priority - b.priority);

    expect(launchStoryWorkbooks).toHaveLength(12);
    expect(launchStoryWorkbooks.map((story) => story.sourceBriefId)).toEqual(
      storyBriefs.map((brief) => brief._id),
    );
    expect(launchStoryWorkbooks.map((story) => story.slug)).toEqual(
      storyBriefs.map((brief) => brief.slug.current),
    );
  });

  it('uses the same public routes as the magazine category routing helpers', () => {
    for (const story of launchStoryWorkbooks) {
      expect(story.publicRoute).toBe(
        getArticleHref('ko', story.category, story.slug),
      );
      expect(story.routeHint).toBe(story.publicRoute);
      expect(story.requiredAssets.length).toBeGreaterThan(0);
      expect(story.bodyAngle).toContain('.');
    }
  });

  it('keeps the workbook in editor-prep state rather than published content', () => {
    for (const story of launchStoryWorkbooks) {
      expect(story.publishReady).toBe(false);
      expect(story.editorChecklist).toContain('Source launch brief');
      expect(story.editorChecklist).toContain('Hero image');
      expect(story.editorChecklist).toContain('Korean body');
    }
  });
});
