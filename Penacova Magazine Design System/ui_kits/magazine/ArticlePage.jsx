// ArticlePage.jsx — article detail view; hero is empty placeholder
function ArticlePage({ article, onBack }) {
  return (
    <article style={artStyles.root}>
      <ImageSlot ratio="21 / 10" label={article.kicker} spec="21:10 · HERO" />

      <header style={artStyles.head}>
        <span style={artStyles.kicker}>{article.kicker}</span>
        <h1 style={artStyles.title}>{article.title}</h1>
        <p style={artStyles.dek}>{article.dek || '새벽 다섯 시, 안성의 마방에서 시작되는 라이더의 하루. 가죽과 면, 그리고 한 잔의 커피.'}</p>
        <div style={artStyles.bylineRow}>
          <span>{article.byline}</span>
          <span style={artStyles.dot}>·</span>
          <span>2026.05.06</span>
          <span style={artStyles.dot}>·</span>
          <span>8 MIN READ</span>
        </div>
      </header>

      <div style={artStyles.body}>
        <p style={{...artStyles.bodyP, ...artStyles.dropCap}} className="dropcap-p">
          안성으로 가는 길, 새벽의 안개가 마방의 지붕을 덮고 있었다. 지원은 가죽 부츠를 손에 든 채, 어둠 속에서 자신의 말 이름을 천천히 부른다. 답이 돌아오는 데 단 몇 초. 그 짧은 시간에 라이더와 말의 하루가 시작된다.
        </p>
        <p style={artStyles.bodyP}>
          페나코바의 SS26 컬렉션은 이 새벽의 정적을 옷감에 옮기려 한 시도다. 무거운 가죽 대신 가벼운 면과 리넨, 그러나 라이딩에 필요한 정확한 재단은 그대로. 박세진의 사진은 그 균형을 조용히 따라간다.
        </p>

        <blockquote style={artStyles.pullquote}>
          “좋은 안장은 라이더의 무게가 아니라 자세를 기억한다.”
        </blockquote>

        <div style={{margin: '48px 0'}}>
          <ImageSlot ratio="4 / 5" label="IN-ARTICLE" spec="4:5 · DETAIL" />
          <p style={artStyles.imgCap}>마방에서. 사진 KIM J.</p>
        </div>

        <p style={artStyles.bodyP}>
          작업실에서 만난 디자이너는 처음 승마복을 만들 때의 고민을 이렇게 정리했다. “옷이 라이더를 도와야지, 라이더가 옷에 맞춰서는 안 된다.” 그 말이 SS26 전체를 관통한다.
        </p>

        <p style={artStyles.bodyP}>
          오전 일곱 시. 마방 너머 들판은 이미 빛으로 채워져 있다. 지원이 말 위에 오르기까지 정확히 26분이 걸렸다. 그 26분 동안의 옷은, 보이지 않게 라이더의 편이 되어주어야 한다.
        </p>

        <hr style={artStyles.sep} />

        <p style={artStyles.cta}>
          SS26 컬렉션은 <a href="#" style={artStyles.ctaLink}>penacova.co.kr →</a> 에서 만나보실 수 있습니다.
        </p>
      </div>

      <footer style={artStyles.footRow}>
        <a href="#" onClick={(e)=>{e.preventDefault(); onBack();}} style={artStyles.backLink}>← 매거진으로 돌아가기</a>
      </footer>
    </article>
  );
}

const artStyles = {
  root: { background: 'var(--paper)' },
  head: { maxWidth: 760, margin: '0 auto', padding: '64px 24px 32px' },
  kicker: { display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--penacova-red)', marginBottom: 24 },
  title: { fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)', margin: 0, marginBottom: 24, textWrap: 'balance' },
  dek: { fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.4, color: 'var(--ink-mute)', margin: 0, marginBottom: 32 },
  bylineRow: { display: 'flex', gap: 12, alignItems: 'center', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-500)', paddingTop: 16, borderTop: '1px solid var(--gray-200)' },
  dot: { color: 'var(--gray-300)' },
  body: { maxWidth: 680, margin: '0 auto', padding: '0 24px 48px' },
  bodyP: { fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.75, color: 'var(--ink)', margin: '0 0 24px' },
  dropCap: {},
  imgCap: { fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gray-500)', marginTop: 10 },
  pullquote: { fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 500, fontSize: 32, lineHeight: 1.25, color: 'var(--ink)', borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)', padding: '32px 0', margin: '48px 0', textWrap: 'pretty' },
  sep: { border: 0, borderTop: '1px solid var(--gray-200)', margin: '48px 0 32px' },
  cta: { fontFamily: 'var(--font-sans)', fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink)' },
  ctaLink: { color: 'var(--penacova-red)', textDecoration: 'underline', textUnderlineOffset: '0.18em' },
  footRow: { maxWidth: 680, margin: '0 auto', padding: '32px 24px 96px', borderTop: '1px solid var(--gray-200)' },
  backLink: { fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--ink)', paddingBottom: 2 },
};

if (!document.getElementById('art-dropcap-style')) {
  const s = document.createElement('style');
  s.id = 'art-dropcap-style';
  s.textContent = `.dropcap-p::first-letter { font-family: var(--font-display); font-weight:700; font-size:5.4em; line-height:0.9; float:left; margin: 0.05em 0.08em 0 -0.04em; color: var(--penacova-red); }`;
  document.head.appendChild(s);
}

window.ArticlePage = ArticlePage;
