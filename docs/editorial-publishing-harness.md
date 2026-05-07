# Editorial Publishing Harness

이 문서는 Penacova Magazine을 관리하는 사람이 코드 없이 Sanity Studio에서
콘텐츠를 게시하기 위한 운영 원본이다. 새 에이전트는 CMS, 라우팅, 콘텐츠
모델을 바꾸기 전에 이 문서를 먼저 확인해야 한다.

## Core Principle

관리자는 GitHub, Vercel, 터미널을 몰라도 게시할 수 있어야 한다.

관리자가 해야 할 일은 다음 세 가지뿐이다.

1. `/studio`에 접속한다.
2. 알맞은 문서 타입 또는 템플릿을 선택한다.
3. 필수 필드를 채운 뒤 Publish를 누른다.

코드와 라우팅은 관리자가 선택한 CMS 필드를 기준으로 자동으로 따라가야 한다.

## Studio Entry Points

Production Studio:

```text
https://penacova-magazine.vercel.app/studio
```

Local Studio:

```text
http://localhost:3000/studio
```

Studio 왼쪽 메뉴는 게시 흐름 기준으로 구성한다.

| Studio section | Purpose |
| --- | --- |
| Articles by Category | 매거진 기사 작성과 카테고리별 게시 |
| Rider Profiles | 라이더 인물 프로필 작성 |
| Look Book Setup | 시즌 컬렉션, 룩, 제품 참조 데이터 준비 |
| Editorial Support | 작성자와 용어집 관리 |

## Publishing Routes

Article 문서의 `category`가 공개 URL을 결정한다.

| Studio template or category | Public list | Public detail |
| --- | --- | --- |
| Article - Editorial | `/ko/editorial` | `/ko/editorial/[slug]` |
| Article - Rider Interview | `/ko/riders` | `/ko/riders/interviews/[slug]` |
| Article - Look Book Story | `/ko/look` | `/ko/look/[slug]` |
| Article - Heritage | `/ko/heritage` | `/ko/heritage/[slug]` |
| Article - Guide | `/ko/guide` | `/ko/guide/[slug]` |
| Article - News | `/ko/news` | `/ko/news/[slug]` |
| Article - Stories | `/ko/stories` | `/ko/stories/[slug]` |

Rider Profile 문서는 Article이 아니다.

| Document type | Public route |
| --- | --- |
| Rider | `/ko/riders/[slug]` |

이 분리는 중요하다. `riders` 섹션에는 인터뷰 기사와 라이더 프로필이 함께
존재하지만, 상세 URL은 서로 충돌하면 안 된다.

## Five-Minute Article Checklist

관리자가 새 기사를 게시할 때는 이 순서만 따르면 된다.

1. Studio에서 `Articles by Category`를 연다.
2. 새 문서 메뉴에서 카테고리에 맞는 Article 템플릿을 고른다.
3. `Title`의 Korean 필드를 입력한다.
4. `Slug`에서 Generate를 누른다.
5. `Category / public section`이 맞는지 확인한다.
6. `Excerpt`의 Korean 필드를 입력한다.
7. `Hero image`를 업로드하고 hotspot을 잡는다.
8. `Body`의 Korean 필드를 작성한다.
9. `Published at`을 입력한다.
10. `Translation status`는 번역 검수 전이면 `Not started`로 둔다.
11. 필요하면 `SEO`와 `End CTA`를 입력한다.
12. Publish를 누른 뒤 해당 공개 URL을 확인한다.

## Required Fields

Article 게시 최소 필드:

- Korean title
- slug
- category
- Korean excerpt
- hero image
- Korean body
- published at
- mood variant

Rider Profile 게시 최소 필드:

- Korean name
- romanized name
- slug

론칭 전 권장 필드:

- portrait
- discipline
- career years
- club
- titles / accolades
- interviews

## Translation Rule

한국어가 원본이다.

EN/JP 필드를 입력하더라도 `translationStatus`가 `Reviewed` 또는 `Manual`이
아니면 공개 페이지는 완성 번역처럼 보여주지 않는다. 대신 한국어 원문 안내를
표시한다.

관리자가 번역을 끝냈을 때만 다음 상태로 바꾼다.

```text
English: Reviewed or Manual
Japanese: Reviewed or Manual
```

## CTA Rule

매거진은 쇼핑몰이 아니다. CTA는 기사 끝의 조용한 텍스트 링크로만 사용한다.

허용:

- Cafe24 상품 또는 컬렉션 링크
- KR/JP 스토어 링크
- UTM이 붙은 캠페인 링크

금지:

- 매거진 안의 장바구니
- 매거진 안의 결제
- 본문 중간을 끊는 상품 카드
- 큰 빨간 구매 버튼

## Verification After Publishing

게시 후 관리자는 한 가지만 확인하면 된다.

```text
https://penacova-magazine.vercel.app/ko/[section]/[slug]
```

Rider Interview만 예외다.

```text
https://penacova-magazine.vercel.app/ko/riders/interviews/[slug]
```

Rider Profile은 다음 경로다.

```text
https://penacova-magazine.vercel.app/ko/riders/[slug]
```

## Troubleshooting

404가 뜨는 경우:

- Publish가 아니라 Draft 상태인지 확인한다.
- slug가 비어 있는지 확인한다.
- category가 맞는지 확인한다.
- Rider Interview 기사는 `/riders/[slug]`가 아니라
  `/riders/interviews/[slug]`로 확인한다.
- Rider Profile은 Article이 아니라 Rider 문서로 만들었는지 확인한다.

EN/JP에서 한국어 원문 안내가 뜨는 경우:

- 정상 동작이다.
- 번역 검수 후 `translationStatus`를 `Reviewed` 또는 `Manual`로 바꾼다.

이미지가 안 보이는 경우:

- hero image가 비어 있는지 확인한다.
- Sanity image asset 업로드가 끝났는지 확인한다.
- hotspot을 너무 극단적으로 잡지 않았는지 확인한다.

URL을 바꾸고 싶은 경우:

- slug를 바꾸면 기존 URL이 깨질 수 있다.
- 공개 후 slug 변경은 리디렉트 정책을 먼저 정한 뒤 진행한다.

## Agent Guardrails

새 에이전트는 다음을 지킨다.

- 관리자가 카테고리 선택만으로 게시할 수 있는 구조를 유지한다.
- `riders` Article 상세는 `/[locale]/riders/interviews/[slug]`로 유지한다.
- Rider Profile 상세는 `/[locale]/riders/[slug]`로 유지한다.
- Studio 구조는 문서 타입 나열보다 게시 흐름을 우선한다.
- 필수 게시 규칙은 Sanity schema description, validation, preview, templates,
  docs에 같이 반영한다.
- 관리자가 수동으로 URL을 조합해야 하는 기능은 미완성으로 본다.
