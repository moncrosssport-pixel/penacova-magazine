# Editor Writing Guide

이 문서는 Penacova Magazine 글을 직접 쓰고 게시하는 사람을 위한 실전
가이드다. GitHub, Vercel, 터미널을 몰라도 된다. 글 작성과 게시 작업은
Sanity Studio에서 한다.

Studio:

```text
https://penacova-magazine.vercel.app/studio
```

## One Page Workflow

1. `Launch Desk`에서 쓸 브리프를 고른다.
2. 상태를 `Writing`으로 바꾼다.
3. 필요한 사진, 실명 승인, 제품 링크가 준비됐는지 확인한다.
4. `Articles by Category`에서 같은 카테고리의 Article 문서를 만든다.
5. Korean 필드부터 채운다.
6. slug를 만든다.
7. hero image와 본문 이미지를 넣는다.
8. `End CTA`를 조용한 텍스트 링크로 넣는다.
9. `Published at`을 넣고 Publish한다.
10. 공개 URL을 열어 확인한 뒤 Launch Brief 상태를 `Published`로 바꾼다.

## Article Skeleton

새 글은 아래 순서로 쓰면 된다.

```text
Title
한 줄로 장면 또는 주제를 말한다.

Excerpt
2문장 이내. 검색 결과와 목록 카드에 보이는 소개문이다.

Opening
장면으로 시작한다. 장소, 시간, 빛, 손의 움직임, 옷감의 느낌 중 하나를 잡는다.

Body 1
라이더, 제품, 장소, 기술 중 이 글의 중심 소재를 설명한다.

Body 2
구체적인 디테일을 넣는다. 원단, 핏, 움직임, 마방, 훈련 루틴, 대회 준비처럼
말할 수 있는 사실을 쓴다.

Quote or Short Paragraph
기억에 남는 한 문장. 과장된 광고 문구보다 조용하고 정확한 문장이 좋다.

Closing
다음 행동을 자연스럽게 연결한다. 컬렉션 보기, 팔로우, 뉴스레터 구독 정도면 충분하다.
```

## Field By Field

| Studio field | What to write |
| --- | --- |
| `Title > Korean` | 공개 제목. 너무 길게 쓰지 않는다. |
| `Slug` | Generate를 눌러 만든다. 공개 후 바꾸지 않는다. |
| `Category / public section` | 공개 섹션이다. 브리프의 category와 맞춘다. |
| `Excerpt > Korean` | 1-2문장 소개문. 목록/SEO 기본값으로 쓰인다. |
| `Hero image` | 반드시 실제 사진을 넣고 hotspot을 잡는다. |
| `Body > Korean` | 본문. 먼저 한국어만 완성한다. |
| `Published at` | 공개 날짜. 즉시 공개면 오늘 날짜로 둔다. |
| `Mood variant` | 화보형은 Editorial, 정보형은 Feature. |
| `Translation status` | 번역 전에는 EN/JP 모두 `Not started`. |
| `SEO` | 비워도 된다. 특별히 검색 문구를 다듬을 때만 작성한다. |
| `End CTA` | 기사 끝의 조용한 링크. 구매 버튼처럼 쓰지 않는다. |

## Category Tone

| Category | Good angle | Avoid |
| --- | --- | --- |
| Editorial | 사진, 장면, 브랜드 무드 | 할인, 구매 강요 |
| Riders | 인터뷰, 루틴, 훈련 태도 | 승인 안 된 실명/경력 |
| Look | 시즌, 착장, 실루엣 | 상품 나열만 하는 글 |
| Heritage | 원단, 스티치, 브랜드 기준 | 근거 없는 품질 주장 |
| Guide | 사이즈, 관리법, 선택 기준 | 너무 감성적인 설명 |
| News | 출시, 행사, 공지 | 날짜 없는 막연한 예고 |
| Stories | 고객/커뮤니티 경험 | 승마와 무관한 라이프스타일 |

## Title Patterns

좋은 제목은 짧고 장면이 있다.

사용하기 좋은 형태:

- `[장면]의 [감각]`
- `[상황]에서 입는 [아이템]`
- `[라이더/트레이너]의 [루틴]`
- `[제품/소재]가 필요한 이유`
- `[시즌명], [핵심 이미지]`

예시:

- `초원 위의 침묵, 지원의 아침`
- `비가 지난 뒤의 필드 라이트`
- `승마 재킷 핏 가이드`
- `라이딩 후 의류 관리법`

## Body Copy Rules

- 한국어가 원본이다.
- 한 문단은 2-4문장 정도로 짧게 쓴다.
- “최고”, “완벽”, “압도적” 같은 광고 단어를 남발하지 않는다.
- 승마 용어는 `Editorial Support -> All Glossary Terms`를 확인한다.
- 제품 설명은 실제 사진과 제품 정보로 확인 가능한 것만 쓴다.
- 라이더 실명, 클럽, 대회 이력, 나이는 승인 전에는 쓰지 않는다.
- Cafe24 링크는 본문 중간이 아니라 `End CTA`에 넣는다.

## Image Rules

게시 전 반드시 필요한 이미지:

- hero image 1장
- 본문 이미지 1-3장 권장

좋은 이미지:

- 실제 라이더, 실제 제품, 실제 장소가 보인다.
- 옷의 핏이나 움직임을 확인할 수 있다.
- 너무 어둡거나 흐린 사진이 아니다.
- 얼굴/실명 사용 허락이 확인되어 있다.

Hero image를 넣은 뒤 image field에서 hotspot을 잡는다. 모바일에서 얼굴이나
제품 중심이 잘리지 않게 가운데를 맞춘다.

## CTA Rules

CTA는 기사 끝에 한 번만 쓴다.

좋은 CTA:

```text
SS26 컬렉션을 더 살펴보기
페나코바 소식을 받아보기
일본 스토어에서 보기
```

나쁜 CTA:

```text
지금 당장 구매하세요
놓치면 후회합니다
특가 확인하기
```

URL은 가능하면 UTM을 붙인다.

```text
?utm_source=penacova_magazine&utm_medium=article&utm_campaign=ss26
```

## Publish Checklist

Publish 전에 이것만 확인한다.

- Korean title이 있다.
- slug가 있다.
- category가 맞다.
- Korean excerpt가 있다.
- hero image가 있다.
- Korean body가 있다.
- Published at이 있다.
- EN/JP translation status가 번역 전이면 `Not started`다.
- 라이더 실명/사진/경력은 승인됐다.
- End CTA 링크가 열리는지 확인했다.
- Launch Brief 상태를 `Ready to publish`로 바꿨다.

Publish 후 확인 URL:

```text
https://penacova-magazine.vercel.app/ko/[category]/[slug]
```

Rider Interview만 예외:

```text
https://penacova-magazine.vercel.app/ko/riders/interviews/[slug]
```

## First Story Order

론칭용으로는 이 순서가 가장 안전하다.

1. `quiet-morning`
2. `field-light-after-rain`
3. `ss26-preview-note`
4. `riding-jacket-fit-guide`
5. `care-after-ride`
6. `red-stitch-standard`
7. `fabric-that-keeps-shape`
8. `ss26-dawn-silhouettes`
9. `listening-before-riding`
10. `trainer-morning-routine`
11. `first-competition-morning`
12. `stable-weekend-style`

사람이 등장하는 글은 승인과 사진이 늦어질 수 있으므로 뒤쪽에 둔다.
