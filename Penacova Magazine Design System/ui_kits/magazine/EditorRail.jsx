// EditorRail.jsx — "Editor's Selection" 3-up
function EditorRail({ articles, onOpen }) {
  return (
    <section style={editorStyles.root}>
      <div style={editorStyles.head}>
        <span style={editorStyles.eyebrow}>EDITOR'S SELECTION</span>
        <a href="#" style={editorStyles.more}>모두 보기 →</a>
      </div>
      <div style={editorStyles.grid}>
        {articles.map(a => <ArticleCard key={a.id} article={a} onOpen={onOpen} size="md" />)}
      </div>
    </section>
  );
}

const editorStyles = {
  root: { padding: '96px 56px', borderBottom: '1px solid var(--gray-200)' },
  head: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 48, paddingBottom: 16, borderBottom: '1px solid var(--ink)' },
  eyebrow: { fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--ink)' },
  more: { fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--ink)', paddingBottom: 2 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 },
};

window.EditorRail = EditorRail;
