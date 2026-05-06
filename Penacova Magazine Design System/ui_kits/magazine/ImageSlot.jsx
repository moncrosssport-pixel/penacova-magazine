// ImageSlot.jsx — empty placeholder showing intent. No fill, no gradient.
// Replaces gradient backgrounds across the kit. Pure markup, no drag-drop.
function ImageSlot({ ratio = '4 / 5', label = 'IMAGE', spec = '', tone = 'paper' }) {
  const bg = tone === 'ink' ? 'var(--ink)' : 'var(--paper-pure)';
  const fg = tone === 'ink' ? 'rgba(250,250,247,0.6)' : 'var(--gray-500)';
  const border = tone === 'ink' ? 'rgba(250,250,247,0.18)' : 'var(--gray-200)';
  const cross = tone === 'ink' ? 'rgba(250,250,247,0.10)' : 'rgba(10,10,10,0.06)';
  return (
    <div style={{
      position: 'relative', width: '100%', aspectRatio: ratio,
      background: bg, border: `1px solid ${border}`,
      backgroundImage: `linear-gradient(to top right, transparent calc(50% - 0.5px), ${cross} 50%, transparent calc(50% + 0.5px)), linear-gradient(to top left, transparent calc(50% - 0.5px), ${cross} 50%, transparent calc(50% + 0.5px))`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6,
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em',
        textTransform: 'uppercase', color: fg,
      }}>{label}</span>
      {spec && <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: fg, opacity: 0.75
      }}>{spec}</span>}
    </div>
  );
}
window.ImageSlot = ImageSlot;
