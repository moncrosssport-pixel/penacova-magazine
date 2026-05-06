// Newsletter.jsx — quiet subscribe (Korean)
function Newsletter() {
  const [email, setEmail] = React.useState('');
  const [done, setDone] = React.useState(false);
  return (
    <section style={nlStyles.root}>
      <div style={nlStyles.inner}>
        <span style={nlStyles.eyebrow}>구독</span>
        <h2 style={nlStyles.title}>다음 호를 받아보세요.</h2>
        <p style={nlStyles.dek}>한 달에 한 통의 편지. 새 에디토리얼, 라이더 인터뷰, 시즌 룩북.</p>
        {!done ? (
          <form style={nlStyles.form} onSubmit={(e)=>{e.preventDefault(); if(email) setDone(true);}}>
            <input type="email" placeholder="reader@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} style={nlStyles.input} />
            <button type="submit" style={nlStyles.submit}>구독 →</button>
          </form>
        ) : (
          <p style={nlStyles.thanks}>감사합니다. 다음 호가 메일로 도착합니다.</p>
        )}
      </div>
    </section>
  );
}

const nlStyles = {
  root: { padding: '96px 56px', background: 'var(--gray-100)', borderBottom: '1px solid var(--gray-200)' },
  inner: { maxWidth: 600, margin: '0 auto', textAlign: 'center' },
  eyebrow: { display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--penacova-red)', marginBottom: 18 },
  title: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 44, lineHeight: 1.05, letterSpacing: '-0.015em', color: 'var(--ink)', margin: 0, marginBottom: 14 },
  dek: { fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.5, color: 'var(--ink-mute)', margin: 0, marginBottom: 36 },
  form: { display: 'flex', gap: 16, alignItems: 'flex-end', borderBottom: '1px solid var(--ink)', paddingBottom: 8 },
  input: { flex: 1, fontFamily: 'var(--font-serif)', fontSize: 18, padding: '8px 0', background: 'transparent', border: 0, outline: 'none', color: 'var(--ink)' },
  submit: { fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', background: 'transparent', border: 0, color: 'var(--ink)', cursor: 'pointer', padding: '8px 0' },
  thanks: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 22, color: 'var(--ink)', margin: 0 },
};

window.Newsletter = Newsletter;
