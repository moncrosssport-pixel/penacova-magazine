import { createElement } from 'react';

const h = createElement;
const productionOrigin = 'https://penacova-magazine.vercel.app';

const writingSteps = [
  '새 게시글 만들기에서 카테고리를 고릅니다.',
  '한국어 제목을 쓰고 Slug의 Generate 버튼을 누릅니다.',
  '대표 이미지를 올리고 hotspot으로 얼굴, 제품, 움직임의 중심을 맞춥니다.',
  '본문은 한국어부터 완성합니다. EN/JP는 검수 전이면 Not started로 둡니다.',
  '게시 전 체크리스트가 모두 준비되면 Publish 후 미리보기 URL을 확인합니다.',
];

const imageTips = [
  '어둡거나 흐린 사진보다 실제 라이더, 제품, 장소가 분명한 사진을 고릅니다.',
  '모바일에서 잘리지 않도록 image field 안의 hotspot을 가운데에 맞춥니다.',
  '본문 이미지는 1-3장 정도로 충분합니다. 상품 나열보다 장면을 우선합니다.',
];

const bodyTips = [
  '첫 문단은 장소, 시간, 움직임, 촉감 중 하나로 시작하면 매거진 톤이 살아납니다.',
  '광고 문구보다 장면과 사실을 씁니다. 구매 유도는 End CTA에만 조용히 넣습니다.',
  '라이더 이름, 사진, 경력은 승인된 내용만 씁니다.',
];

function LinkButton({
  href,
  children,
}: {
  href: string;
  children?: string;
}) {
  return h(
    'a',
    {
      href,
      rel: 'noreferrer',
      target: '_blank',
      style: {
        border: '1px solid #1f1b16',
        borderRadius: 4,
        color: '#1f1b16',
        display: 'inline-flex',
        fontWeight: 700,
        padding: '9px 12px',
        textDecoration: 'none',
      },
    },
    children,
  );
}

function GuideCard({ title, items }: { title: string; items: string[] }) {
  return h(
    'section',
    {
      style: {
        background: '#fbfaf7',
        border: '1px solid #ded7ca',
        borderRadius: 6,
        padding: 18,
      },
    },
    h('h2', { style: { fontSize: 18, margin: '0 0 12px' } }, title),
    h(
      'ol',
      { style: { display: 'grid', gap: 8, margin: 0, paddingLeft: 20 } },
      items.map((item) =>
        h('li', { key: item, style: { lineHeight: 1.55 } }, item),
      ),
    ),
  );
}

export function OperatorGuide() {
  return h(
    'main',
    {
      style: {
        background: '#f5f1e8',
        color: '#1f1b16',
        minHeight: '100%',
        padding: 32,
      },
    },
    h(
      'div',
      { style: { maxWidth: 920 } },
      h(
        'p',
        {
          style: {
            color: '#766f64',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0,
            margin: '0 0 8px',
            textTransform: 'uppercase',
          },
        },
        'Penacova Magazine Studio',
      ),
      h(
        'h1',
        { style: { fontSize: 32, lineHeight: 1.15, margin: '0 0 12px' } },
        '처음 시작하기 / 작성 가이드',
      ),
      h(
        'p',
        { style: { color: '#5f5a52', fontSize: 16, lineHeight: 1.65, margin: 0 } },
        '이 화면은 GitHub, Vercel, 코드 없이 매거진 글을 올리는 운영자용 시작점입니다. 실제 공개 글은 Article 문서에서 Publish할 때 사이트에 보입니다.',
      ),
      h(
        'div',
        { style: { display: 'flex', flexWrap: 'wrap', gap: 10, margin: '22px 0 28px' } },
        h(LinkButton, { href: `${productionOrigin}/ko/launch-workbook` }, '런칭 글 워크북 보기'),
        h(LinkButton, { href: `${productionOrigin}/ko/launch-readiness` }, '런칭 준비 상태 보기'),
        h(LinkButton, { href: `${productionOrigin}/studio` }, 'Studio 처음 화면으로 가기'),
      ),
      h(
        'div',
        { style: { display: 'grid', gap: 16 } },
        h(GuideCard, { title: '새 게시글 작성 순서', items: writingSteps }),
        h(GuideCard, { title: '이미지 업로드 기준', items: imageTips }),
        h(GuideCard, { title: '본문 작성 기준', items: bodyTips }),
      ),
    ),
  );
}
