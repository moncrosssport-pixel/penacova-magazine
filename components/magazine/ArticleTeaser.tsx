import Image from 'next/image';
import Link from 'next/link';

type ArticleTeaserProps = {
  href: string;
  kicker: string;
  title: string;
  excerpt?: string;
  byline?: string | null;
  date?: string | null;
  imageUrl?: string | null;
  priority?: boolean;
  lead?: boolean;
};

export function ArticleTeaser({
  href,
  kicker,
  title,
  excerpt,
  byline,
  date,
  imageUrl,
  priority = false,
  lead = false,
}: ArticleTeaserProps) {
  return (
    <article
      className={`group grid gap-5 ${
        lead ? 'border-b border-ink pb-10 lg:grid-cols-[1.35fr_1fr] lg:items-end' : ''
      }`}
    >
      <Link href={href} className="block no-underline" aria-label={title}>
        <div
          className={`relative flex items-center justify-center overflow-hidden bg-tonal transition duration-200 group-hover:opacity-90 ${
            lead ? 'aspect-[16/10]' : 'aspect-[4/5]'
          }`}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes={lead ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
              priority={priority}
            />
          ) : (
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={96}
              height={96}
              className="h-16 w-16 object-contain opacity-20"
            />
          )}
        </div>
      </Link>

      <div className={lead ? 'pb-1' : ''}>
        <p className="kicker">{kicker}</p>
        <h2
          className={`mt-3 font-display font-semibold leading-tight tracking-[-0.01em] text-ink text-balance ${
            lead ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-2xl'
          }`}
        >
          <Link href={href} className="no-underline group-hover:underline">
            {title}
          </Link>
        </h2>
        {excerpt ? (
          <p className={`dek mt-4 ${lead ? 'max-w-xl' : 'text-lg'}`}>{excerpt}</p>
        ) : null}
        <p className="mt-5 flex flex-wrap gap-2 font-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
          {byline ? <span>{byline}</span> : null}
          {byline && date ? <span className="text-stone-300">/</span> : null}
          {date ? <span>{date}</span> : null}
        </p>
      </div>
    </article>
  );
}
