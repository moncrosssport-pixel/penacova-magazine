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

export default async function LaunchReadinessPage({
  params,
}: LaunchReadinessPageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const summary = await getReadinessSummary();
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
          <div className="mt-8 flex flex-wrap gap-4 font-ui text-sm">
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
          <Metric
            label="Missing sections"
            value={String(summary.missingCategories.length)}
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-content gap-8 px-6 py-12 sm:px-10 lg:grid-cols-2 lg:px-14 lg:py-16">
        <ReadinessList
          title="Blockers"
          items={summary.blockers}
          empty="No launch blockers."
        />
        <ReadinessList
          title="Warnings"
          items={summary.warnings}
          empty="No warnings."
        />
        <ReadinessList
          title="Facts"
          items={summary.facts}
          empty="No facts returned."
        />
        <ReadinessList
          title="Missing categories"
          items={summary.missingCategories}
          empty="Every launch category has content."
        />
      </section>

      <MagazineFooter locale={params.locale} />
    </main>
  );
}

async function getReadinessSummary() {
  try {
    const input = await collectLaunchReadinessInput();
    return summarizeLaunchReadiness(input);
  } catch (error) {
    return {
      ready: false,
      missingCategories: [],
      blockers: [
        `Launch readiness data check failed: ${getErrorMessage(error)}`,
      ],
      warnings: [],
      facts: ['Live readiness data could not be loaded.'],
    };
  }
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

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
