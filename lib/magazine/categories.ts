import type { Locale } from '@/lib/i18n/locales';

export type ArticleCategory =
  | 'editorial'
  | 'riders'
  | 'look'
  | 'heritage'
  | 'guide'
  | 'news'
  | 'stories';

export type LocalizedCopy = Partial<Record<Locale, string>>;

export type MagazineCategory = {
  id: ArticleCategory;
  label: string;
  title: LocalizedCopy;
  dek: LocalizedCopy;
  empty: LocalizedCopy;
};

export const MAGAZINE_CATEGORIES = [
  {
    id: 'editorial',
    label: 'Editorial',
    title: {
      ko: 'Editorial',
      en: 'Editorial',
      jp: 'Editorial',
    },
    dek: {
      ko: '마장, 라이더, 필드, 컬렉션을 중심으로 한 패션 에디토리얼과 포토 에세이.',
      en: 'Fashion editorials and photo essays shaped around stables, riders, fields, and collections.',
      jp: '厩舎、ライダー、フィールド、コレクションを軸にしたファッションエディトリアル。',
    },
    empty: {
      ko: '아직 공개된 에디토리얼이 없습니다.',
      en: 'No editorials are published here yet.',
      jp: 'まだ公開されたエディトリアルはありません。',
    },
  },
  {
    id: 'riders',
    label: 'Riders',
    title: {
      ko: 'Riders',
      en: 'Riders',
      jp: 'Riders',
    },
    dek: {
      ko: '선수, 코치, 클럽 라이더, Penacova를 입는 사람들의 인터뷰.',
      en: 'Interviews with athletes, coaches, club riders, and notable Penacova wearers.',
      jp: '選手、コーチ、クラブライダー、Penacovaをまとう人々のインタビュー。',
    },
    empty: {
      ko: '아직 공개된 라이더 스토리가 없습니다.',
      en: 'No rider stories are published here yet.',
      jp: 'まだ公開されたライダーストーリーはありません。',
    },
  },
  {
    id: 'look',
    label: 'Look',
    title: {
      ko: 'Look',
      en: 'Look',
      jp: 'Look',
    },
    dek: {
      ko: '시즌 컬렉션, 룩, 스타일링 노트.',
      en: 'Seasonal collection presentations, looks, and styling notes.',
      jp: 'シーズンコレクション、ルック、スタイリングノート。',
    },
    empty: {
      ko: '아직 공개된 룩북 스토리가 없습니다.',
      en: 'No look book stories are published here yet.',
      jp: 'まだ公開されたルックブックストーリーはありません。',
    },
  },
  {
    id: 'heritage',
    label: 'Heritage',
    title: {
      ko: 'Heritage',
      en: 'Heritage',
      jp: 'Heritage',
    },
    dek: {
      ko: '소재, 자수, 공방, 브랜드의 배경에 있는 이야기.',
      en: 'Craft, material, embroidery, workshop, and origin stories.',
      jp: '素材、刺繍、工房、ブランドの背景にある物語。',
    },
    empty: {
      ko: '아직 공개된 헤리티지 스토리가 없습니다.',
      en: 'No heritage stories are published here yet.',
      jp: 'まだ公開されたヘリテージストーリーはありません。',
    },
  },
  {
    id: 'guide',
    label: 'Guide',
    title: {
      ko: 'Guide',
      en: 'Guide',
      jp: 'Guide',
    },
    dek: {
      ko: '사이즈, 케어, 라이딩 의류 선택을 위한 차분한 가이드.',
      en: 'Sizing, care, riding apparel guidance, and beginner explainers.',
      jp: 'サイズ、手入れ、乗馬服の選び方を静かに案内するガイド。',
    },
    empty: {
      ko: '아직 공개된 가이드가 없습니다.',
      en: 'No guides are published here yet.',
      jp: 'まだ公開されたガイドはありません。',
    },
  },
  {
    id: 'news',
    label: 'News',
    title: {
      ko: 'News',
      en: 'News',
      jp: 'News',
    },
    dek: {
      ko: '대회, 이벤트, 론칭, 협업, 스토어 업데이트.',
      en: 'Competitions, events, launches, collaborations, and store updates.',
      jp: '大会、イベント、ローンチ、コラボレーション、ストア更新。',
    },
    empty: {
      ko: '아직 공개된 뉴스가 없습니다.',
      en: 'No news items are published here yet.',
      jp: 'まだ公開されたニュースはありません。',
    },
  },
  {
    id: 'stories',
    label: 'Stories',
    title: {
      ko: 'Stories',
      en: 'Stories',
      jp: 'Stories',
    },
    dek: {
      ko: '고객 라이더, 필드 노트, 큐레이션된 커뮤니티 스토리.',
      en: 'Customer riders, styling, field notes, and curated community stories.',
      jp: 'カスタマーライダー、フィールドノート、コミュニティの物語。',
    },
    empty: {
      ko: '아직 공개된 커뮤니티 스토리가 없습니다.',
      en: 'No community stories are published here yet.',
      jp: 'まだ公開されたコミュニティストーリーはありません。',
    },
  },
] satisfies MagazineCategory[];

export function isArticleCategory(value: unknown): value is ArticleCategory {
  return (
    typeof value === 'string' &&
    MAGAZINE_CATEGORIES.some((category) => category.id === value)
  );
}

export function getCategoryMeta(categoryId: ArticleCategory) {
  return MAGAZINE_CATEGORIES.find((category) => category.id === categoryId)!;
}

export function getArticlePathSegments(category: ArticleCategory, slug: string) {
  return category === 'riders'
    ? ['riders', 'interviews', slug]
    : [category, slug];
}

export function getArticleHref(
  locale: Locale,
  category: ArticleCategory,
  slug: string,
) {
  return `/${locale}/${getArticlePathSegments(category, slug).join('/')}`;
}
