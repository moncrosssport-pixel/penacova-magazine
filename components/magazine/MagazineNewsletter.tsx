import {
  normalizeNewsletterSettings,
  type NewsletterSettingsDoc,
} from '@/lib/magazine/newsletter';
import { type Locale } from '@/lib/i18n/locales';
import { sanityClient } from '@/lib/sanity/client';
import { siteSettingsQuery } from '@/lib/sanity/queries';

type MagazineNewsletterProps = {
  locale: Locale;
  variant?: 'section' | 'page';
};

export async function MagazineNewsletter({
  locale,
  variant = 'section',
}: MagazineNewsletterProps) {
  const settingsDoc = await sanityClient.fetch<NewsletterSettingsDoc | null>(
    siteSettingsQuery(),
    {},
    { next: { revalidate: 60 } },
  );
  const settings = normalizeNewsletterSettings(settingsDoc);
  const hasForm = Boolean(settings.newsletterFormAction);
  const hasFollowLinks = settings.followLinks.length > 0;
  const isPage = variant === 'page';

  return (
    <section
      id="newsletter"
      className={
        isPage
          ? 'mx-auto max-w-reading px-6 py-16 text-center sm:px-10 lg:py-24'
          : 'mx-auto max-w-reading px-6 py-16 text-center sm:px-10 lg:py-24'
      }
    >
      <p className="kicker">Subscribe</p>
      <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.015em] text-balance sm:text-5xl">
        {settings.title[locale]}
      </h2>
      <p className="dek mx-auto mt-5 max-w-xl">{settings.description[locale]}</p>

      {hasForm && settings.newsletterFormAction ? (
        <form
          action={settings.newsletterFormAction}
          method="post"
          target="_blank"
          data-analytics-event="newsletter_submit"
          data-analytics-label={settings.newsletterProviderName ?? 'newsletter'}
          data-analytics-locale={locale}
          data-analytics-href={settings.newsletterFormAction}
          className="mx-auto mt-9 max-w-xl"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <div className="grid gap-4 border-y border-hairline py-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <input
              id="newsletter-email"
              name={settings.newsletterEmailFieldName}
              type="email"
              required
              placeholder="Email address"
              className="min-w-0 bg-transparent font-ui text-sm text-ink outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              className="font-ui text-[11px] font-semibold uppercase tracking-[0.2em] text-penacova"
            >
              Subscribe -&gt;
            </button>
          </div>
          <p className="mt-4 font-ui text-[11px] leading-relaxed uppercase tracking-[0.12em] text-muted">
            {settings.consentCopy[locale]}
          </p>
        </form>
      ) : (
        <p className="mt-8 font-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
          magazine.penacova.co.kr
        </p>
      )}

      {hasFollowLinks ? (
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-hairline pt-6 font-ui text-[11px] font-semibold uppercase tracking-[0.18em]">
          {settings.followLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="follow_link_click"
              data-analytics-label={link.label}
              data-analytics-locale={locale}
              data-analytics-href={link.url}
              className="text-ink no-underline"
            >
              {link.label} -&gt;
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );
}
