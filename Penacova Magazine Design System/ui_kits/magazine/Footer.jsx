// Footer.jsx — ink background footer
function Footer() {
  return (
    <footer style={ftStyles.root}>
      <div style={ftStyles.inner}>
        <div style={ftStyles.brand}>
          <img src="../../assets/logo-horizontal-white.png" alt="Penacova" style={{height: 28}} />
          <p style={ftStyles.tagline}>An editorial home for equestrian stories.</p>
        </div>
        <div style={ftStyles.col}>
          <h5 style={ftStyles.h}>Magazine</h5>
          <a style={ftStyles.a}>Editorial</a><a style={ftStyles.a}>Riders</a><a style={ftStyles.a}>Look</a><a style={ftStyles.a}>Heritage</a><a style={ftStyles.a}>Guide</a><a style={ftStyles.a}>News</a><a style={ftStyles.a}>Stories</a>
        </div>
        <div style={ftStyles.col}>
          <h5 style={ftStyles.h}>Shop</h5>
          <a style={ftStyles.a}>penacova.co.kr →</a>
          <a style={ftStyles.a}>penacova.jp →</a>
        </div>
        <div style={ftStyles.col}>
          <h5 style={ftStyles.h}>Brand</h5>
          <a style={ftStyles.a}>About</a><a style={ftStyles.a}>Subscribe</a><a style={ftStyles.a}>Press</a><a style={ftStyles.a}>Contact</a>
        </div>
      </div>
      <div style={ftStyles.legal}>
        <span>© 2026 Penacova · 페나코바</span>
        <span>magazine.penacova.co.kr</span>
        <span>KO · EN · JP</span>
      </div>
    </footer>
  );
}

const ftStyles = {
  root: { background: 'var(--ink)', color: 'var(--paper)', padding: '64px 56px 32px' },
  inner: { display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 40, paddingBottom: 48, borderBottom: '1px solid rgba(250,250,247,0.16)' },
  brand: { display: 'flex', flexDirection: 'column', gap: 18 },
  tagline: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 18, color: 'rgba(250,250,247,0.7)', lineHeight: 1.4, maxWidth: 280, margin: 0 },
  col: { display: 'flex', flexDirection: 'column', gap: 10 },
  h: { fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(250,250,247,0.5)', margin: 0, marginBottom: 6 },
  a: { fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--paper)', textDecoration: 'none', cursor: 'pointer', padding: '2px 0' },
  legal: { display: 'flex', justifyContent: 'space-between', paddingTop: 24, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'rgba(250,250,247,0.5)' },
};

window.Footer = Footer;
