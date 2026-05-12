# Launch Readiness Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a noindex editor-facing launch readiness page that shows the same launch blockers as `pnpm check:launch` without requiring a manager to run CLI commands.

**Architecture:** Move the reusable launch readiness logic out of the CLI script and into `lib/magazine/launchReadiness.mjs`. Keep the CLI as a thin formatter/exit-code wrapper, and add a dynamic App Router page at `/[locale]/launch-readiness` that reads the live Sanity and production checks on the server. Document the route as a no-code launch harness companion to `/[locale]/launch-workbook`.

**Tech Stack:** Next.js 14 App Router, React 18 server components, Sanity client, Vitest, existing magazine masthead/footer shell.

---

## File Structure

- Create `lib/magazine/launchReadiness.mjs`: shared launch readiness summary helpers, domain checks, Sanity/production data collector, and text formatter.
- Modify `scripts/check-launch-readiness.mjs`: import shared helpers and only run collection, formatting, and process exit behavior.
- Modify `lib/magazine/launchReadiness.test.ts`: import from the shared module and add a page-facing status label test.
- Create `app/[locale]/launch-readiness/page.tsx`: noindex server-rendered readiness dashboard.
- Modify `README.md`, `AGENTS.md`, `docs/agent-harness.md`, `tasks/plan.md`, and `tasks/todo.md`: record the new public editor route and verification expectations.

## Task 1: Extract Launch Readiness Core

**Files:**
- Create: `lib/magazine/launchReadiness.mjs`
- Modify: `scripts/check-launch-readiness.mjs`
- Modify: `lib/magazine/launchReadiness.test.ts`

- [ ] **Step 1: Move shared readiness logic into `lib/magazine/launchReadiness.mjs`**

Create the module with these exports:

```js
import { createClient } from '@sanity/client';
import { resolve4, resolveCname } from 'node:dns/promises';

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

export const productionOrigin =
  process.env.PENACOVA_MAGAZINE_ORIGIN ||
  'https://penacova-magazine.vercel.app';
export const customDomain = 'magazine.penacova.co.kr';
export const launchCategories = [
  'editorial',
  'riders',
  'look',
  'heritage',
  'guide',
  'news',
  'stories',
];
```

- [ ] **Step 2: Add summary and formatter helpers**

Move `pluralize`, `normalizeCname`, `isVercelDomainReady`, `summarizeLaunchReadiness`, and `formatLaunchReadinessReport` from `scripts/check-launch-readiness.mjs` into the shared module. Keep the same user-facing strings so existing tests continue to prove CLI compatibility.

- [ ] **Step 3: Add page status helper**

Add this helper for the route UI:

```js
export function getLaunchReadinessStatus(summary) {
  if (summary.ready) {
    return {
      label: 'Ready',
      tone: 'ready' as const,
      description: 'All launch gates are currently clear.',
    };
  }

  return {
    label: 'Blocked',
    tone: 'blocked' as const,
    description: `${summary.blockers.length} launch blocker${
      summary.blockers.length === 1 ? '' : 's'
    } need attention before public launch.`,
  };
}
```

- [ ] **Step 4: Add the live collector**

Move `hasKoreanText`, `hasKoreanPortableText`, `isCompleteLaunchArticle`, `fetchStatus`, `getDomainStatus`, and `collectLaunchReadinessInput` into the shared module. Export `collectLaunchReadinessInput`.

- [ ] **Step 5: Make the CLI script a thin wrapper**

Replace `scripts/check-launch-readiness.mjs` with:

```js
import {
  collectLaunchReadinessInput,
  formatLaunchReadinessReport,
  summarizeLaunchReadiness,
} from '../lib/magazine/launchReadiness.mjs';

async function main() {
  const input = await collectLaunchReadinessInput();
  const summary = summarizeLaunchReadiness(input);

  console.log(formatLaunchReadinessReport(summary));

  if (!summary.ready) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

- [ ] **Step 6: Update tests to import shared helpers**

Change the import in `lib/magazine/launchReadiness.test.ts` to:

```ts
import {
  formatLaunchReadinessReport,
  getLaunchReadinessStatus,
  isVercelDomainReady,
  summarizeLaunchReadiness,
} from './launchReadiness.mjs';
```

Add this test:

```ts
it('returns a page-facing blocked status with blocker count', () => {
  const status = getLaunchReadinessStatus({
    ready: false,
    missingCategories: ['news'],
    blockers: [
      '1 article category still has no published story.',
      'Launch story set has 6/12 complete articles.',
    ],
    warnings: [],
    facts: [],
  });

  expect(status).toEqual({
    label: 'Blocked',
    tone: 'blocked',
    description: '2 launch blockers need attention before public launch.',
  });
});
```

- [ ] **Step 7: Verify extraction**

Run:

```powershell
pnpm test lib/magazine/launchReadiness.test.ts
```

Expected: all launch readiness tests pass.

## Task 2: Build The Noindex Launch Readiness Page

**Files:**
- Create: `app/[locale]/launch-readiness/page.tsx`

- [ ] **Step 1: Create the route shell**

Create `app/[locale]/launch-readiness/page.tsx` with a dynamic Node runtime, metadata, locale validation, and the existing magazine shell:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MagazineFooter } from '@/components/magazine/MagazineFooter';
import { MagazineMasthead } from '@/components/magazine/MagazineMasthead';
import { isLocale } from '@/lib/i18n/locales';
import {
  collectLaunchReadinessInput,
  getLaunchReadinessStatus,
  summarizeLaunchReadiness,
} from '@/lib/magazine/launchReadiness.mjs';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type LaunchReadinessPageProps = {
  params: {
    locale: string;
  };
};

export function generateMetadata({
  params,
}: LaunchReadinessPageProps): Metadata {
  if (!isLocale(params.locale)) {
    return {};
  }

  return {
    title: 'Launch Readiness | Penacova Magazine',
    description:
      'Editor-facing launch readiness status for Penacova Magazine.',
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}
```

- [ ] **Step 2: Render the live summary**

Add the default server component:

```tsx
export default async function LaunchReadinessPage({
  params,
}: LaunchReadinessPageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const input = await collectLaunchReadinessInput();
  const summary = summarizeLaunchReadiness(input);
  const status = getLaunchReadinessStatus(summary);

  return (
    <main className="min-h-screen bg-paper text-ink">
      <MagazineMasthead
        locale={params.locale}
        pathSegments={['launch-readiness']}
      />

      <header className="border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
          <p className="kicker">Launch Readiness</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-none text-balance sm:text-7xl">
            {status.label}
          </h1>
          <p className="dek mt-6 max-w-3xl">{status.description}</p>
          <div className="mt-8 flex flex-wrap gap-3 font-ui text-sm">
            <Link href={`/${params.locale}/launch-workbook`}>
              Open story workbook
            </Link>
            <Link href="/studio">Open Studio</Link>
          </div>
        </div>
      </header>

      <section className="border-b border-hairline bg-tonal/60">
        <div className="mx-auto grid max-w-content gap-6 px-6 py-10 sm:px-10 lg:grid-cols-3 lg:px-14">
          <Metric label="Blockers" value={String(summary.blockers.length)} />
          <Metric label="Warnings" value={String(summary.warnings.length)} />
          <Metric label="Missing sections" value={String(summary.missingCategories.length)} />
        </div>
      </section>

      <section className="mx-auto grid max-w-content gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[1fr_1fr] lg:px-14 lg:py-16">
        <ReadinessList title="Blockers" items={summary.blockers} empty="No launch blockers." />
        <ReadinessList title="Warnings" items={summary.warnings} empty="No warnings." />
        <ReadinessList title="Facts" items={summary.facts} empty="No facts returned." />
        <ReadinessList title="Missing categories" items={summary.missingCategories} empty="Every launch category has content." />
      </section>

      <MagazineFooter locale={params.locale} />
    </main>
  );
}
```

- [ ] **Step 3: Add small presentational helpers**

Add below the page component:

```tsx
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-ink pt-4">
      <p className="font-mono text-2xl font-semibold">{value}</p>
      <p className="mt-2 font-ui text-[11px] font-semibold uppercase text-muted">
        {label}
      </p>
    </div>
  );
}

function ReadinessList({
  title,
  items,
  empty,
}: {
  title: string;
  items: string[];
  empty: string;
}) {
  return (
    <section className="border-y border-hairline py-6">
      <h2 className="font-ui text-[11px] font-semibold uppercase text-muted">
        {title}
      </h2>
      {items.length > 0 ? (
        <ul className="mt-5 space-y-3 font-ui text-sm leading-relaxed text-ink-mute">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 font-ui text-sm leading-relaxed text-ink-mute">
          {empty}
        </p>
      )}
    </section>
  );
}
```

- [ ] **Step 4: Verify route compilation**

Run:

```powershell
pnpm build
```

Expected: build output includes `ƒ /[locale]/launch-readiness`.

## Task 3: Document The Manager Harness

**Files:**
- Modify: `README.md`
- Modify: `AGENTS.md`
- Modify: `docs/agent-harness.md`
- Modify: `tasks/plan.md`
- Modify: `tasks/todo.md`

- [ ] **Step 1: Add the route to README**

Add this line under the existing launch workbook route:

```md
- Public launch readiness route: `/ko/launch-readiness`
```

- [ ] **Step 2: Add implementation state to AGENTS.md**

Add this bullet under `Implemented:`:

```md
- Public editor launch readiness route at `/[locale]/launch-readiness`, marked noindex
```

- [ ] **Step 3: Add the route to docs/agent-harness.md**

Add this paragraph near the launch workbook note:

```md
- The public editor-facing launch readiness route is
  `https://penacova-magazine.vercel.app/ko/launch-readiness` and is marked
  noindex. It mirrors the blockers from `pnpm check:launch` for managers who
  should not need CLI access.
```

- [ ] **Step 4: Update tasks**

Add this completed item to `tasks/todo.md`:

```md
- [x] Add public noindex `/[locale]/launch-readiness` manager route.
```

Add a new completed slice to `tasks/plan.md`:

```md
### Slice 26: Public Launch Readiness Route

Expose launch readiness blockers as a noindex manager page so non-technical
owners can see what remains before launch.

Acceptance:

- `/[locale]/launch-readiness` renders live launch blockers, warnings, facts,
  and missing categories.
- The route reuses the same readiness summary logic as `pnpm check:launch`.
- Metadata marks the page `noindex, nofollow`.
- The page links to Studio and the launch story workbook.

Status: complete locally.
```

## Task 4: Full Verification And Ship

**Files:**
- Verify all files changed above.

- [ ] **Step 1: Run targeted tests**

Run:

```powershell
pnpm test lib/magazine/launchReadiness.test.ts
```

Expected: pass.

- [ ] **Step 2: Run the full test suite**

Run:

```powershell
pnpm test
```

Expected: pass.

- [ ] **Step 3: Run production build**

Run:

```powershell
pnpm build
```

Expected: pass, with `ƒ /[locale]/launch-readiness` listed.

- [ ] **Step 4: Run launch checker**

Run:

```powershell
$env:NODE_OPTIONS='--use-system-ca'
pnpm check:launch
```

Expected: exits non-zero with `[BLOCKED]` until real launch content is complete. Treat this as correct if blockers match content gaps.

- [ ] **Step 5: Commit and push**

Run:

```powershell
git status --short --branch
git add README.md AGENTS.md docs/agent-harness.md tasks/plan.md tasks/todo.md scripts/check-launch-readiness.mjs lib/magazine/launchReadiness.mjs lib/magazine/launchReadiness.test.ts app/[locale]/launch-readiness/page.tsx docs/superpowers/plans/2026-05-12-launch-readiness-page.md
git commit -m "feat(launch): add readiness manager page"
git push origin main
```

Expected: GitHub main advances by one commit.

- [ ] **Step 6: Verify live link**

Poll:

```powershell
Invoke-WebRequest -Uri "https://penacova-magazine.vercel.app/ko/launch-readiness" -UseBasicParsing
```

Expected: status `200`, page content includes `Launch Readiness`, `Blocked`, and `noindex`.

## Self-Review

- Spec coverage: this plan covers the current no-code management gap by making CLI launch blockers visible through a manager-facing route.
- Placeholder scan: no `TBD`, `TODO`, or vague implementation-only steps remain.
- Type consistency: shared helper names are introduced before use and reused consistently across CLI, tests, and page route.
