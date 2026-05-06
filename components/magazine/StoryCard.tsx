import Image from 'next/image';

type StoryCardProps = {
  kicker: string;
  title: string;
  byline: string;
  ratio?: 'portrait' | 'landscape' | 'square';
  quiet?: boolean;
};

const ratioClass = {
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[16/10]',
  square: 'aspect-square',
};

export function StoryCard({
  kicker,
  title,
  byline,
  ratio = 'portrait',
  quiet = false,
}: StoryCardProps) {
  return (
    <article className="group cursor-default">
      <div
        className={`${ratioClass[ratio]} flex items-center justify-center bg-tonal transition duration-200 group-hover:opacity-90`}
      >
        <Image
          src="/brand/logo-mark.png"
          alt=""
          width={96}
          height={96}
          className={`h-16 w-16 object-contain ${quiet ? 'opacity-15' : 'opacity-25'}`}
        />
      </div>
      <div className="mt-4">
        <p className="kicker">{kicker}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-[-0.01em] text-ink text-balance">
          {title}
        </h3>
        <p className="mt-3 font-ui text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
          {byline}
        </p>
      </div>
    </article>
  );
}
