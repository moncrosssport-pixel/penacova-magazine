import { createClient } from '@sanity/client';
import { resolveCname } from 'node:dns/promises';
import { fileURLToPath } from 'node:url';

const projectId =
  process.env.SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  '6pelmu7l';
const dataset =
  process.env.SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production';
const apiVersion =
  process.env.SANITY_API_VERSION ||
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
  '2026-01-01';

const productionOrigin =
  process.env.PENACOVA_MAGAZINE_ORIGIN ||
  'https://penacova-magazine.vercel.app';
const customDomain = 'magazine.penacova.co.kr';
const expectedDomainCname = 'cname.vercel-dns.com';

export const launchCategories = [
  'editorial',
  'riders',
  'look',
  'heritage',
  'guide',
  'news',
  'stories',
];

function pluralize(count, singular, plural = `${singular}s`) {
  return count === 1 ? singular : plural;
}

function normalizeCname(value) {
  return value?.replace(/\.$/, '').toLowerCase() || '';
}

export function summarizeLaunchReadiness({
  categories = launchCategories,
  articleCountsByCategory,
  completeArticleCount,
  riderProfileCount,
  glossaryReadyCount,
  glossaryNeedsJapaneseReviewCount,
  launchBriefCount,
  newsletterReady,
  productionChecks,
  domain,
}) {
  const missingCategories = categories.filter(
    (category) => (articleCountsByCategory[category] || 0) < 1,
  );
  const blockers = [];
  const warnings = [];

  if (missingCategories.length > 0) {
    blockers.push(
      `${missingCategories.length} article ${pluralize(
        missingCategories.length,
        'category',
        'categories',
      )} still ${missingCategories.length === 1 ? 'has' : 'have'} no published story.`,
    );
  }

  if (completeArticleCount < 12) {
    blockers.push(`Launch story set has ${completeArticleCount}/12 complete articles.`);
  }

  if (riderProfileCount < 5) {
    blockers.push(`Rider profile set has ${riderProfileCount}/5 profiles.`);
  }

  if (launchBriefCount < 18) {
    blockers.push(`Launch Desk has ${launchBriefCount}/18 planning cards.`);
  }

  if (glossaryReadyCount < 50 && glossaryNeedsJapaneseReviewCount === 0) {
    blockers.push(`Glossary has ${glossaryReadyCount}/50 ready terms.`);
  }

  if (glossaryNeedsJapaneseReviewCount > 0) {
    warnings.push(
      `${glossaryNeedsJapaneseReviewCount} glossary terms still need Japanese review.`,
    );
  }

  if (!newsletterReady) {
    warnings.push('Newsletter/follow settings are incomplete.');
  }

  for (const check of productionChecks) {
    if (!check.ok) {
      blockers.push(`${check.label} check failed${check.detail ? `: ${check.detail}` : '.'}`);
    }
  }

  if (!domain.ready) {
    blockers.push('Custom domain is not pointing at cname.vercel-dns.com.');
  }

  return {
    ready: blockers.length === 0,
    missingCategories,
    blockers,
    warnings,
    facts: [
      `Published complete articles: ${completeArticleCount}`,
      `Rider profiles: ${riderProfileCount}`,
      `Glossary ready terms: ${glossaryReadyCount}`,
      `Glossary terms needing JP review: ${glossaryNeedsJapaneseReviewCount}`,
      `Launch Desk cards: ${launchBriefCount}`,
      `Newsletter/follow settings: ${newsletterReady ? 'present' : 'incomplete'}`,
      `Custom domain CNAME: ${domain.cname || 'not found'}`,
    ],
  };
}

export function formatLaunchReadinessReport(summary) {
  const lines = [
    'Penacova Magazine Launch Readiness',
    summary.ready ? '[READY]' : '[BLOCKED]',
    '',
    'Facts:',
    ...summary.facts.map((fact) => `- ${fact}`),
  ];

  if (summary.missingCategories.length > 0) {
    lines.push('', `Missing categories: ${summary.missingCategories.join(', ')}`);
  }

  if (summary.blockers.length > 0) {
    lines.push('', 'Blockers:', ...summary.blockers.map((blocker) => `- ${blocker}`));
  }

  if (summary.warnings.length > 0) {
    lines.push('', 'Warnings:', ...summary.warnings.map((warning) => `- ${warning}`));
  }

  return lines.join('\n');
}

function hasKoreanText(value) {
  return typeof value?.ko === 'string' && value.ko.trim().length > 0;
}

function hasKoreanPortableText(value) {
  return Array.isArray(value?.ko) && value.ko.length > 0;
}

function isCompleteLaunchArticle(article) {
  return Boolean(
    article.category &&
      article.slug &&
      hasKoreanText(article.title) &&
      hasKoreanText(article.excerpt) &&
      hasKoreanPortableText(article.body) &&
      article.heroImage?.asset,
  );
}

async function fetchStatus(url) {
  try {
    const response = await fetch(url, { redirect: 'follow' });
    return {
      label: url,
      ok: response.ok,
      detail: `${response.status} ${response.statusText}`.trim(),
    };
  } catch (error) {
    return {
      label: url,
      ok: false,
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}

async function getDomainStatus(host) {
  try {
    const records = await resolveCname(host);
    const cname = normalizeCname(records[0]);

    return {
      host,
      cname,
      ready: cname === expectedDomainCname,
    };
  } catch (error) {
    return {
      host,
      cname: '',
      ready: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function collectLaunchReadinessInput() {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  });

  const [
    articles,
    riderProfileCount,
    glossaryReadyCount,
    glossaryNeedsJapaneseReviewCount,
    launchBriefCount,
    siteSettings,
    domain,
    homepageCheck,
    sitemapCheck,
  ] = await Promise.all([
    client.fetch(`*[
      _type == "article" &&
      defined(slug.current) &&
      defined(category) &&
      publishedAt <= now() &&
      !(_id in path("drafts.**"))
    ]{
      category,
      title,
      excerpt,
      body,
      heroImage,
      "slug": slug.current
    }`),
    client.fetch(
      'count(*[_type == "rider" && defined(slug.current) && !(_id in path("drafts.**"))])',
    ),
    client.fetch('count(*[_type == "glossary" && reviewStatus == "ready"])'),
    client.fetch(
      'count(*[_type == "glossary" && reviewStatus == "jp-review-needed"])',
    ),
    client.fetch('count(*[_type == "launchBrief"])'),
    client.fetch(
      '*[_type == "siteSettings" && _id == "site-settings"][0]{newsletterFormAction, followLinks}',
    ),
    getDomainStatus(customDomain),
    fetchStatus(`${productionOrigin}/ko`),
    fetchStatus(`${productionOrigin}/sitemap.xml`),
  ]);

  const completeArticles = articles.filter(isCompleteLaunchArticle);
  const articleCountsByCategory = Object.fromEntries(
    launchCategories.map((category) => [
      category,
      completeArticles.filter((article) => article.category === category).length,
    ]),
  );
  const newsletterReady = Boolean(
    siteSettings?.newsletterFormAction ||
      (Array.isArray(siteSettings?.followLinks) && siteSettings.followLinks.length > 0),
  );

  return {
    categories: launchCategories,
    articleCountsByCategory,
    completeArticleCount: completeArticles.length,
    riderProfileCount,
    glossaryReadyCount,
    glossaryNeedsJapaneseReviewCount,
    launchBriefCount,
    newsletterReady,
    productionChecks: [
      { label: 'Production homepage /ko', ...homepageCheck },
      { label: 'Production sitemap.xml', ...sitemapCheck },
    ],
    domain,
  };
}

async function main() {
  const input = await collectLaunchReadinessInput();
  const summary = summarizeLaunchReadiness(input);

  console.log(formatLaunchReadinessReport(summary));

  if (!summary.ready) {
    process.exitCode = 1;
  }
}

const currentFilePath = fileURLToPath(import.meta.url);

if (process.argv[1] && currentFilePath === process.argv[1]) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
