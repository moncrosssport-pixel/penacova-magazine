// LeadStory.jsx — full-width hero with EMPTY image area, copy below (not overlaid)
function LeadStory({ onOpen }) {
  return (
    <section style={leadStyles.root} onClick={onOpen}>
      <ImageSlot ratio="16 / 9" label="LEAD EDITORIAL" spec="16:9 · FULL-BLEED HERO" />
      <div style={leadStyles.copy}>
        <span style={leadStyles.kicker}>EDITORIAL · SS26</span>
        <h1 style={leadStyles.title}>초원 위의 침묵,<br/>지원의 아침</h1>
        <p style={leadStyles.dek}>새벽 다섯 시, 안성의 마방에서 시작되는 라이더의 하루. 가죽과 면, 그리고 한 잔의 커피.</p>
        <span style={leadStyles.byline}>BY 박세진 — 사진 KIM J.</span>
      </div>
    </section>
  );
}

const leadStyles = {
  root: { background: 'var(--paper)', cursor: 'pointer', borderBottom: '1px solid var(--gray-200)' },
  copy: { padding: '40px 56px 64px', maxWidth: 900 },
  kicker: { display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--penacova-red)', marginBottom: 18 },
  title: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1.02, letterSpacing: '-0.015em', color: 'var(--ink)', margin: 0, marginBottom: 20, textWrap: 'balance' },
  dek: { fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.5, color: 'var(--ink-mute)', margin: 0, marginBottom: 18, maxWidth: 680 },
  byline: { fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gray-500)' },
};

window.LeadStory = LeadStory;
