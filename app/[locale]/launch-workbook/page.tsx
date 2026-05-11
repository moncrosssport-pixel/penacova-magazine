import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MagazineFooter } from '@/components/magazine/MagazineFooter';
import { MagazineMasthead } from '@/components/magazine/MagazineMasthead';
import { isLocale } from '@/lib/i18n/locales';
import { launchStoryWorkbooks } from '@/lib/magazine/launchStories';

type LaunchWorkbookPageProps = {
  params: {
    locale: string;
  };
};

export function generateMetadata({
  params,
}: LaunchWorkbookPageProps): Metadata {
  if (!isLocale(params.locale)) {
    return {};
  }

  return {
    title: 'Launch Story Workbook | Penacova Magazine',
    description:
      'Editor-facing workbook for turning Launch Desk cards into Penacova Magazine articles.',
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

export default function LaunchWorkbookPage({
  params,
}: LaunchWorkbookPageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <MagazineMasthead
        locale={params.locale}
        pathSegments={['launch-workbook']}
      />

      <header className="border-b border-hairline">
        <div className="mx-auto max-w-content px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
          <p className="kicker">Editor Workbook</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-none text-balance sm:text-7xl">
            Launch stories, ready for Studio.
          </h1>
          <p className="dek mt-6 max-w-3xl">
            Launch Desk cards become public articles here: one slug, one source
            brief, one route, and one asset checklist per story. This page is
            for editors; it is intentionally marked noindex.
          </p>
        </div>
      </header>

      <section className="border-b border-hairline bg-tonal/60">
        <div className="mx-auto grid max-w-content gap-6 px-6 py-10 sm:px-10 lg:grid-cols-4 lg:px-14">
          <Metric label="Story briefs" value="12" />
          <Metric label="Required route" value="/ko" />
          <Metric label="Publishing source" value="Studio" />
          <Metric label="Search indexing" value="Noindex" />
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="border-y border-ink py-6">
            <p className="kicker">Workflow</p>
            <ol className="mt-5 space-y-4 font-ui text-sm leading-relaxed text-ink-mute">
              <li>1. Open the matching Launch Desk card.</li>
              <li>2. Create the Article from the category template.</li>
              <li>3. Fill Source launch brief, slug, category, and Korean copy.</li>
              <li>4. Add a real hero image and set hotspot.</li>
              <li>5. Publish, then open the public route below.</li>
            </ol>
          </aside>

          <div className="divide-y divide-hairline border-y border-hairline">
            {launchStoryWorkbooks.map((story) => (
              <article
                key={story.sourceBriefId}
                className="grid gap-6 py-8 lg:grid-cols-[120px_1fr]"
              >
                <div>
                  <p className="font-mono text-xs uppercase text-muted">
                    No. {String(story.priority).padStart(2, '0')}
                  </p>
                  <p className="mt-3 font-ui text-[11px] font-semibold uppercase text-penacova">
                    {story.category}
                  </p>
                </div>

                <div>
                  <div className="flex flex-col gap-3 border-b border-hairline pb-5 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.01em]">
                        <code className="font-mono text-[0.72em] font-normal">
                          {story.slug}
                        </code>
                      </h2>
                      <p className="mt-3 font-ui text-sm leading-relaxed text-ink-mute">
                        {story.purpose}
                      </p>
                    </div>
                    <Link
                      href={story.publicRoute}
                        className="font-ui text-[11px] font-semibold uppercase no-underline"
                    >
                      Open route
                    </Link>
                  </div>

                  <dl className="mt-6 grid gap-5 md:grid-cols-2">
                    <Field label="Source launch brief" value={story.sourceBriefId} />
                    <Field label="Public route" value={story.publicRoute} />
                    <Field
                      label="Required assets"
                      value={story.requiredAssets.join('; ')}
                    />
                    <Field label="CTA intent" value={story.ctaIntent} />
                    <Field label="Approval note" value={story.approvalNote} wide />
                    <Field label="Body angle" value={story.bodyAngle} wide />
                  </dl>

                  <div className="mt-6 border-t border-hairline pt-5">
                    <p className="font-ui text-[11px] font-semibold uppercase text-muted">
                      Studio checklist
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-ui text-sm text-ink-mute">
                      {story.editorChecklist.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MagazineFooter locale={params.locale} />
    </main>
  );
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

function Field({
  label,
  value,
  wide = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? 'md:col-span-2' : undefined}>
      <dt className="font-ui text-[11px] font-semibold uppercase text-muted">
        {label}
      </dt>
      <dd className="mt-2 font-ui text-sm leading-relaxed text-ink">{value}</dd>
    </div>
  );
}
