import Image from 'next/image';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n/locales';

const magazineLinks = [
  ['Editorial', 'editorial'],
  ['Riders', 'riders'],
  ['Look', 'look'],
  ['Subscribe', 'subscribe'],
] as const;

export function MagazineFooter({ locale = 'ko' }: { locale?: Locale }) {
  return (
    <footer className="bg-ink px-6 py-12 text-paper sm:px-10 lg:px-14 lg:py-16">
      <div className="mx-auto grid max-w-content gap-10 border-b border-white/15 pb-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/logo-horizontal-white.png"
            alt="Penacova"
            width={190}
            height={62}
            className="h-auto w-40"
            priority
          />
          <p className="mt-5 max-w-xs font-display text-lg italic leading-relaxed text-paper/70">
            An editorial home for equestrian stories.
          </p>
        </div>

        <FooterColumn
          title="Magazine"
          items={magazineLinks.map(([label, path]) => ({
            label,
            href: `/${locale}/${path}`,
          }))}
        />
        <FooterColumn
          title="Shop"
          items={[
            { label: 'PENACOVA Korea ->', href: 'https://www.penacova.co.kr/' },
            { label: 'PENACOVA Japan ->', href: 'https://penacova.jp/' },
          ]}
        />
        <FooterColumn
          title="Brand"
          items={[
            { label: 'Contact', href: 'https://www.penacova.co.kr/' },
          ]}
        />
      </div>

      <div className="mx-auto flex max-w-content flex-col gap-3 pt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
        <span>2026 Penacova</span>
        <span>magazine.penacova.co.kr</span>
        <span>KO · EN · JP</span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/50">
        {title}
      </h2>
      <div className="flex flex-col gap-2 font-ui text-sm">
        {items.map((item) => (
          <FooterLink key={`${item.label}-${item.href}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function FooterLink({ item }: { item: { label: string; href: string } }) {
  const isExternal = item.href.startsWith('http');
  const isCafe24 =
    item.href.includes('penacova.co.kr') || item.href.includes('penacova.jp');

  if (isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        data-analytics-event={isCafe24 ? 'outbound_cafe24' : undefined}
        data-analytics-label={`footer_${item.label}`}
        data-analytics-href={item.href}
        className="text-paper no-underline"
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className="text-paper no-underline">
      {item.label}
    </Link>
  );
}
