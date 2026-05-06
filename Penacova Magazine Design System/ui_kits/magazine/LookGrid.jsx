// LookGrid.jsx — seasonal look book grid with empty image placeholders
function LookGrid({ looks, onOpen }) {
  return (
    <section style={lgStyles.root}>
      <div style={lgStyles.head}>
        <span style={lgStyles.eyebrow}>LOOK BOOK</span>
        <h2 style={lgStyles.title}>SS26 — Quiet Field</h2>
        <p style={lgStyles.dek}>스물네 점의 룩으로 정리한 새 시즌. 라이더의 새벽과 들판의 정적을 한 권의 매거진으로.</p>
      </div>
      <div style={lgStyles.grid}>
        {looks.map((l, i) => (
          <figure key={l.id} style={lgStyles.figure} onClick={()=>onOpen?.(l)}>
            <ImageSlot ratio="3 / 4" label={`LOOK ${String(i+1).padStart(2,'0')}`} spec="3:4 · LOOK" />
            <figcaption style={lgStyles.cap}>
              <span style={lgStyles.lookNo}>LOOK {String(i+1).padStart(2,'0')}</span>
              <span style={lgStyles.lookName}>{l.name}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const lgStyles = {
  root: { padding: '96px 56px', borderBottom: '1px solid var(--gray-200)' },
  head: { textAlign: 'center', maxWidth: 720, margin: '0 auto 64px' },
  eyebrow: { display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--penacova-red)', marginBottom: 18 },
  title: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.015em', color: 'var(--ink)', margin: 0, marginBottom: 18 },
  dek: { fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.5, color: 'var(--ink-mute)', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px 28px' },
  figure: { display: 'flex', flexDirection: 'column', gap: 12, margin: 0, cursor: 'pointer' },
  cap: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 4 },
  lookNo: { fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--gray-500)' },
  lookName: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 500, fontSize: 16, color: 'var(--ink)' },
};

window.LookGrid = LookGrid;
