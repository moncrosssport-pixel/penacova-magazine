// Masthead.jsx — print-magazine style: large centered wordmark
const { useState } = React;

function Masthead({ locale = 'ko', onLocaleChange, onNav, active }) {
  const categories = [
    { id: 'editorial', label: 'Editorial' },
    { id: 'riders',    label: 'Riders' },
    { id: 'look',      label: 'Look' },
    { id: 'heritage',  label: 'Heritage' },
    { id: 'guide',     label: 'Guide' },
    { id: 'news',      label: 'News' },
    { id: 'stories',   label: 'Stories' },
  ];
  const locales = ['ko', 'en', 'jp'];

  return (
    <header style={mastheadStyles.root}>
      {/* Top utility row — date stamp + locale */}
      <div style={mastheadStyles.utilRow}>
        <div style={mastheadStyles.utilLeft}>
          <span>2026.05.06 · 화요일</span>
          <span style={mastheadStyles.dot}>·</span>
          <span>ISSUE №03</span>
        </div>
        <div style={mastheadStyles.utilRight}>
          {locales.map((l, i) => (
            <React.Fragment key={l}>
              <span
                onClick={()=>onLocaleChange(l)}
                style={{...mastheadStyles.localeItem, ...(l===locale ? mastheadStyles.localeActive : {})}}
              >{l.toUpperCase()}</span>
              {i < locales.length - 1 && <span style={mastheadStyles.dot}>·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Big print-magazine masthead */}
      <div style={mastheadStyles.brandRow}>
        <a href="#" onClick={(e)=>{e.preventDefault(); onNav('home');}} style={mastheadStyles.wordmarkLink}>
          <img src="../../assets/logo-horizontal.png" alt="Penacova Magazine" style={mastheadStyles.wordmark} />
        </a>
        <p style={mastheadStyles.tagline}>승마, 그리고 그 주변의 풍경</p>
      </div>

      {/* Search / Subscribe utility (left) + Nav (centered) */}
      <div style={mastheadStyles.navWrap}>
        <div style={mastheadStyles.navUtilLeft}>
          <span style={mastheadStyles.utilLink}>Search</span>
        </div>
        <nav style={mastheadStyles.nav}>
          {categories.map(c => (
            <a key={c.id} href="#"
              onClick={(e)=>{e.preventDefault(); onNav(c.id);}}
              style={{...mastheadStyles.navItem, ...(active===c.id ? mastheadStyles.navActive : {})}}
            >{c.label}</a>
          ))}
        </nav>
        <div style={mastheadStyles.navUtilRight}>
          <span style={mastheadStyles.utilLink}>Subscribe</span>
        </div>
      </div>
    </header>
  );
}

const mastheadStyles = {
  root: { background: 'var(--paper)', borderBottom: '1px solid var(--ink)', position: 'sticky', top: 0, zIndex: 50 },
  utilRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '10px 32px',
    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.10em',
    color: 'var(--gray-500)',
    borderBottom: '1px solid var(--gray-200)',
  },
  utilLeft: { display: 'flex', gap: 10, alignItems: 'center' },
  utilRight: { display: 'flex', gap: 8, alignItems: 'center', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, letterSpacing: '0.20em', textTransform: 'uppercase' },
  localeItem: { cursor: 'pointer', padding: '2px 0', color: 'var(--gray-500)' },
  localeActive: { color: 'var(--ink)', borderBottom: '1px solid var(--ink)' },
  dot: { color: 'var(--gray-300)' },

  brandRow: { textAlign: 'center', padding: '32px 32px 20px' },
  wordmarkLink: { display: 'inline-block', textDecoration: 'none' },
  wordmark: { height: 'clamp(48px, 8vw, 96px)', display: 'block', margin: '0 auto' },
  tagline: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 14, color: 'var(--ink-mute)', margin: '12px 0 0' },

  navWrap: {
    display: 'grid', gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center', padding: '14px 32px',
    borderTop: '1px solid var(--gray-200)',
  },
  navUtilLeft: { fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--ink)' },
  navUtilRight: { fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'var(--ink)', textAlign: 'right' },
  utilLink: { cursor: 'pointer', borderBottom: '1px solid transparent', paddingBottom: 2, transition: 'border-color 0.15s' },
  nav: {
    display: 'flex', gap: 32, justifyContent: 'center',
    fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase',
  },
  navItem: { color: 'var(--ink)', textDecoration: 'none', cursor: 'pointer', paddingBottom: 4, borderBottom: '1px solid transparent', transition: 'all 0.15s' },
  navActive: { borderBottomColor: 'var(--penacova-red)', color: 'var(--penacova-red)' },
};

window.Masthead = Masthead;
