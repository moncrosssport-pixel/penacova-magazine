// CategoryRail.jsx — horizontal scrolling rail per category
function CategoryRail({ title, kicker, articles, onOpen }) {
  return (
    <section style={railStyles.root}>
      <div style={railStyles.head}>
        <span style={railStyles.eyebrow}>{kicker}</span>
        <h2 style={railStyles.title}>{title}</h2>
        <a href="#" style={railStyles.more}>전체 →</a>
      </div>
      <div style={railStyles.scroller}>
        {articles.map(a => (
          <div key={a.id} style={railStyles.item}>
            <ArticleCard article={a} onOpen={onOpen} size="sm" />
          </div>
        ))}
      </div>
    </section>
  );
}

const railStyles = {
  root: { padding: '64px 56px', borderBottom: '1px solid var(--gray-200)' },
  head: { display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'baseline', gap: 24, marginBottom: 32 },
  eyebrow: { fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--penacova-red)' },
  title: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 36, lineHeight: 1.1, letterSpacing: '-0.015em', color: 'var(--ink)', margin: 0, textAlign: 'center' },
  more: { fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none', textAlign: 'right', borderBottom: '1px solid var(--ink)', justifySelf: 'end', paddingBottom: 2 },
  scroller: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 },
  item: { minWidth: 0 },
};

window.CategoryRail = CategoryRail;
