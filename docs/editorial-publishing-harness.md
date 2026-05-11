# Editorial Publishing Harness

이 문서는 Penacova Magazine을 관리하는 사람이 코드 없이 Sanity Studio에서
콘텐츠를 게시하기 위한 운영 원본이다. 새 에이전트는 CMS, 라우팅, 콘텐츠
모델을 바꾸기 전에 이 문서를 먼저 확인해야 한다.

실제 글을 직접 쓰는 방법은 `docs/editor-writing-guide.md`를 함께 본다.
런칭 12개 기사별 입력 체크리스트는 `docs/launch-story-workbook.md`를 함께 본다.

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
| Launch Desk | 론칭 기사, 라이더 프로필, 용어집 배치의 준비 상태 관리 |
| Articles by Category | 매거진 기사 작성과 카테고리별 게시 |
| Rider Profiles | 라이더 인물 프로필 작성 |
| Look Book Setup | 시즌 컬렉션, 룩, 제품 참조 데이터 준비 |
| Editorial Support | 작성자와 용어집 관리 |

## Launch Desk

Launch Desk는 실제 공개 문서가 아니라 게시 준비 카드다.

관리자는 이곳에서 각 론칭 콘텐츠의 상태를 다음 순서로 옮긴다.

```text
Planned -> Needs assets -> Writing -> Review -> Ready to publish -> Published
```

Launch Brief 문서에는 다음을 적는다.

- working title
- planned slug
- article category or profile/batch type
- required assets
- CTA intent
- public route hint
- approval notes
- final Article, Rider, or Glossary references

중요한 규칙:

- Launch Brief를 Publish해도 공개 사이트에는 노출되지 않는다.
- 실제 공개는 Article, Rider, Collection, Look, Product, Glossary 문서에서 한다.
- 라이더 실명, 초상, 클럽, 대회 이력은 승인 전까지 Launch Brief에만 둔다.
- 준비가 끝난 브리프만 `Ready to publish`로 바꾼다.

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
| Collection | `/ko/look/[slug]` |

이 분리는 중요하다. `riders` 섹션에는 인터뷰 기사와 라이더 프로필이 함께
존재하지만, 상세 URL은 서로 충돌하면 안 된다.

Look Book Story는 Article 문서이고, Collection은 시즌 룩북 문서다. 관리자가
시즌 전체 룩북을 만들 때는 Collection, 개별 룩 이미지는 Look, 착장 상품은
Product를 사용한다.

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

Collection 게시 최소 필드:

- season
- slug
- Korean title

Look 게시 최소 필드:

- number
- Korean name
- collection reference

론칭 전 Look 권장 필드:

- image
- products
- rider

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

Collection은 다음 경로다.

```text
https://penacova-magazine.vercel.app/ko/look/[slug]
```

## Troubleshooting

404가 뜨는 경우:

- Publish가 아니라 Draft 상태인지 확인한다.
- slug가 비어 있는지 확인한다.
- category가 맞는지 확인한다.
- Rider Interview 기사는 `/riders/[slug]`가 아니라
  `/riders/interviews/[slug]`로 확인한다.
- Rider Profile은 Article이 아니라 Rider 문서로 만들었는지 확인한다.
- 시즌 룩북은 Article이 아니라 Collection 문서로 만들었는지 확인한다.
- Collection에 slug가 있는지 확인한다.

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
- Collection 상세는 `/[locale]/look/[slug]`로 유지한다.
- Studio 구조는 문서 타입 나열보다 게시 흐름을 우선한다.
- 필수 게시 규칙은 Sanity schema description, validation, preview, templates,
  docs에 같이 반영한다.
- 관리자가 수동으로 URL을 조합해야 하는 기능은 미완성으로 본다.
## Newsletter / Follow Settings

Newsletter and follow capture is managed without code in Studio:

1. Open `/studio`.
2. Open `Site Settings`.
3. Edit the newsletter title, description, consent copy, and follow links.
4. When an email provider is chosen, paste its HTTPS form action URL into
   `Newsletter form action URL`.
5. Set `Email input field name` to the provider value. Use `EMAIL` unless the
   provider says otherwise.
6. Publish the settings document.

Public routes:

- Homepage section: `/ko#newsletter`
- Standalone route: `/ko/subscribe`

If the provider URL is blank, the public site still shows the newsletter copy
and follow links. No developer is needed to turn on the email form later.

## Glossary Review Flow

Glossary terms are managed in Studio under:

```text
Editorial Support -> All Glossary Terms
Editorial Support -> Glossary Needs JP Review
Editorial Support -> Glossary Ready
```

The first 50 starter terms are already seeded from
`sanity/seed/glossary-starter.json`.

Review status rules:

- `Needs review`: term was created but not checked.
- `Korean / English reviewed`: Korean and English are checked, Japanese is not.
- `Japanese review needed`: Korean and English are usable; Japanese must stay
  blank until a reviewer confirms it.
- `Ready`: Korean, English, and Japanese terms are all approved.

For launch, editors can use the Korean and English terms immediately as internal
copy guidance. Do not fill `Japanese term` by machine translation and mark
`Ready` only after a Japanese reviewer has checked the term.
