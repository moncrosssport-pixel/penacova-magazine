import Link from 'next/link';

type StoryCardProps = {
  kicker: string;
  title: string;
  byline: string;
  href?: string;
  ratio?: 'portrait' | 'landscape' | 'square';
  quiet?: boolean;
};

const ratioClass: Record<NonNullable<StoryCardProps['ratio']>, string> = {
  portrait: 'min-h-[260px]',
  landscape: 'min-h-[220px]',
  square: 'min-h-[240px]',
};

export function StoryCard({
  kicker,
  title,
  byline,
  href,
  ratio = 'portrait',
  quiet = false,
}: StoryCardProps) {
  const card = (
    <article
      className={`group flex ${ratioClass[ratio]} flex-col justify-between border-y border-hairline py-5 transition-colors hover:border-ink ${
        quiet ? 'opacity-80' : ''
      }`}
    >
      <div>
        <p className="kicker">{kicker}</p>
        <h3 className="mt-8 font-display text-3xl font-semibold leading-tight tracking-[-0.01em] text-ink text-balance">
          {title}
        </h3>
      </div>
      <div className="mt-8 flex items-end justify-between gap-4">
        <p className="font-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
          {byline}
        </p>
        <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.18em] text-penacova">
          Read
        </span>
      </div>
    </article>
  );

  return href ? (
    <Link href={href} className="block no-underline">
      {card}
    </Link>
  ) : (
    card
  );
}
