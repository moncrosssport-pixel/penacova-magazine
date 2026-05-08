import {
  formatLaunchReadinessReport,
  isVercelDomainReady,
  summarizeLaunchReadiness,
} from '@/scripts/check-launch-readiness.mjs';
import { describe, expect, it } from 'vitest';

const categories = [
  'editorial',
  'riders',
  'look',
  'heritage',
  'guide',
  'news',
  'stories',
];

describe('summarizeLaunchReadiness', () => {
  it('marks the launch incomplete when required category articles are missing', () => {
    const summary = summarizeLaunchReadiness({
      categories,
      articleCountsByCategory: { editorial: 1, guide: 1 },
      completeArticleCount: 2,
      riderProfileCount: 1,
      glossaryReadyCount: 0,
      glossaryNeedsJapaneseReviewCount: 50,
      launchBriefCount: 18,
      newsletterReady: true,
      productionChecks: [
        { label: 'Homepage', ok: true },
        { label: 'Sitemap', ok: true },
      ],
      domain: {
        host: 'magazine.penacova.co.kr',
        cname: 'penacova.co.kr',
        ready: false,
      },
    });

    expect(summary.ready).toBe(false);
    expect(summary.missingCategories).toEqual([
      'riders',
      'look',
      'heritage',
      'news',
      'stories',
    ]);
    expect(summary.blockers).toContain(
      '5 article categories still have no published story.',
    );
    expect(summary.blockers).toContain(
      'Custom domain is not pointing at Vercel DNS.',
    );
  });

  it('marks the launch ready when content, domain, and production checks pass', () => {
    const articleCountsByCategory = Object.fromEntries(
      categories.map((category) => [category, 1]),
    );

    const summary = summarizeLaunchReadiness({
      categories,
      articleCountsByCategory,
      completeArticleCount: 12,
      riderProfileCount: 5,
      glossaryReadyCount: 50,
      glossaryNeedsJapaneseReviewCount: 0,
      launchBriefCount: 18,
      newsletterReady: true,
      productionChecks: [
        { label: 'Homepage', ok: true },
        { label: 'Sitemap', ok: true },
      ],
      domain: {
        host: 'magazine.penacova.co.kr',
        cname: 'cname.vercel-dns.com',
        ready: true,
      },
    });

    expect(summary.ready).toBe(true);
    expect(summary.blockers).toEqual([]);
  });

  it('accepts the Vercel-recommended A record for the custom domain', () => {
    const articleCountsByCategory = Object.fromEntries(
      categories.map((category) => [category, 1]),
    );

    const summary = summarizeLaunchReadiness({
      categories,
      articleCountsByCategory,
      completeArticleCount: 12,
      riderProfileCount: 5,
      glossaryReadyCount: 50,
      glossaryNeedsJapaneseReviewCount: 0,
      launchBriefCount: 18,
      newsletterReady: true,
      productionChecks: [
        { label: 'Homepage', ok: true },
        { label: 'Sitemap', ok: true },
      ],
      domain: {
        host: 'magazine.penacova.co.kr',
        aRecords: ['76.76.21.21'],
        ready: true,
      },
    });

    expect(summary.ready).toBe(true);
  });
});

describe('formatLaunchReadinessReport', () => {
  it('prints a human-readable checklist for the current state', () => {
    const report = formatLaunchReadinessReport({
      ready: false,
      missingCategories: ['news'],
      blockers: ['1 article category still has no published story.'],
      warnings: ['50 glossary terms still need Japanese review.'],
      facts: [
        'Published complete articles: 6',
        'Rider profiles: 2',
        'Custom domain CNAME: penacova.co.kr',
      ],
    });

    expect(report).toContain('Penacova Magazine Launch Readiness');
    expect(report).toContain('[BLOCKED]');
    expect(report).toContain('Missing categories: news');
    expect(report).toContain('50 glossary terms still need Japanese review.');
  });
});

describe('isVercelDomainReady', () => {
  it('accepts either the Vercel CNAME target or the Vercel A record', () => {
    expect(
      isVercelDomainReady({ cname: 'cname.vercel-dns.com', aRecords: [] }),
    ).toBe(true);
    expect(isVercelDomainReady({ cname: '', aRecords: ['76.76.21.21'] })).toBe(
      true,
    );
    expect(isVercelDomainReady({ cname: 'penacova.co.kr', aRecords: [] })).toBe(
      false,
    );
  });
});
