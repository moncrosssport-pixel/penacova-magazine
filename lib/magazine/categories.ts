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
      ko: '마방의 빛과 필드의 공기, 컬렉션이 만들어내는 조용한 장면들.',
      en: 'Fashion editorials and photo essays shaped around stables, riders, fields, and collections.',
      jp: '馬房、ライダー、フィールド、コレクションをめぐる静かなフォトエッセイ。',
    },
    empty: {
      ko: '아직 공개된 에디토리얼이 없습니다.',
      en: 'No editorials are published here yet.',
      jp: '公開されたエディトリアルはまだありません。',
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
      ko: '선수, 코치, 클럽 라이더가 말하는 훈련과 옷의 리듬.',
      en: 'Interviews with athletes, coaches, club riders, and notable Penacova wearers.',
      jp: '選手、コーチ、クラブライダーの声で読むトレーニングと装い。',
    },
    empty: {
      ko: '아직 공개된 라이더 인터뷰가 없습니다.',
      en: 'No rider stories are published here yet.',
      jp: '公開されたライダーストーリーはまだありません。',
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
      ko: '시즌 컬렉션과 라이딩을 위한 스타일 노트.',
      en: 'Seasonal collection presentations, looks, and styling notes.',
      jp: 'シーズンコレクション、ルック、スタイリングノート。',
    },
    empty: {
      ko: '아직 공개된 룩북이 없습니다.',
      en: 'No look book stories are published here yet.',
      jp: '公開されたルックブックはまだありません。',
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
      ko: '소재, 자수, 패턴, 작업실에서 완성되는 브랜드의 시간.',
      en: 'Craft, material, embroidery, workshop, and origin stories.',
      jp: '素材、刺繍、パターン、工房から生まれるブランドの記録。',
    },
    empty: {
      ko: '아직 공개된 헤리티지 스토리가 없습니다.',
      en: 'No heritage stories are published here yet.',
      jp: '公開されたヘリテージストーリーはまだありません。',
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
      ko: '사이즈, 소재, 관리법, 초보 라이더를 위한 차분한 가이드.',
      en: 'Sizing, care, riding apparel guidance, and beginner explainers.',
      jp: 'サイズ、ケア、乗馬ウェア、ビギナーのためのガイド。',
    },
    empty: {
      ko: '아직 공개된 가이드가 없습니다.',
      en: 'No guides are published here yet.',
      jp: '公開されたガイドはまだありません。',
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
      ko: '대회, 이벤트, 론칭, 협업, 스토어 소식.',
      en: 'Competitions, events, launches, collaborations, and store updates.',
      jp: '大会、イベント、ローンチ、コラボレーション、ストアニュース。',
    },
    empty: {
      ko: '아직 공개된 뉴스가 없습니다.',
      en: 'No news items are published here yet.',
      jp: '公開されたニュースはまだありません。',
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
      ko: '고객 라이더, 필드 노트, 커뮤니티가 남긴 장면들.',
      en: 'Customer riders, styling, field notes, and curated community stories.',
      jp: 'カスタマーライダー、フィールドノート、コミュニティのストーリー。',
    },
    empty: {
      ko: '아직 공개된 스토리가 없습니다.',
      en: 'No community stories are published here yet.',
      jp: '公開されたストーリーはまだありません。',
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
