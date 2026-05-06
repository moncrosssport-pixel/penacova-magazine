// ArticleCard.jsx — atomic unit: image placeholder + kicker + title + byline
function ArticleCard({ article, onOpen, size = 'md' }) {
  const sizes = {
    sm: { titleFs: 16, kicker: 10, ratio: '4 / 3' },
    md: { titleFs: 22, kicker: 11, ratio: '4 / 5' },
    lg: { titleFs: 32, kicker: 12, ratio: '3 / 4' },
  };
  const s = sizes[size];
  return (
    <article style={cardStyles.root} onClick={()=>onOpen?.(article)}>
      <ImageSlot ratio={s.ratio} label={article.kicker} spec={article.spec || `${s.ratio.replace(' / ',':')} · IMAGE`} />
      <span style={{...cardStyles.kicker, fontSize: s.kicker}}>{article.kicker}</span>
      <h3 style={{...cardStyles.title, fontSize: s.titleFs}}>{article.title}</h3>
      <span style={cardStyles.byline}>{article.byline}</span>
    </article>
  );
}

const cardStyles = {
  root: { display: 'flex', flexDirection: 'column', gap: 12, cursor: 'pointer', textDecoration: 'none', color: 'inherit' },
  kicker: { fontFamily: 'var(--font-sans)', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--penacova-red)', marginTop: 4 },
  title: { fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.01em', color: 'var(--ink)', margin: 0, textWrap: 'balance' },
  byline: { fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray-500)' },
};

window.ArticleCard = ArticleCard;
