import Image from 'next/image';

const magazineLinks = ['Editorial', 'Riders', 'Look', 'Heritage', 'Guide', 'News', 'Stories'];

export function MagazineFooter() {
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

        <FooterColumn title="Magazine" items={magazineLinks} />
        <FooterColumn title="Shop" items={['penacova.co.kr ->', 'penacova.jp ->']} />
        <FooterColumn title="Brand" items={['About', 'Subscribe', 'Press', 'Contact']} />
      </div>

      <div className="mx-auto flex max-w-content flex-col gap-3 pt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-paper/50 sm:flex-row sm:items-center sm:justify-between">
        <span>2026 Penacova</span>
        <span>magazine.penacova.co.kr</span>
        <span>KO · EN · JP</span>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="mb-4 font-ui text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/50">
        {title}
      </h2>
      <div className="flex flex-col gap-2 font-ui text-sm">
        {items.map((item) => (
          <span key={item} className="text-paper">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
