# Studio Visual Verification

This note records what can be verified by an agent without a logged-in Sanity
browser session, and what still needs the project owner or editor account.

## Latest Check

Date: 2026-05-11

Local route checked:

```text
http://localhost:3000/studio
```

Result:

- The Next.js dev server started successfully.
- `/studio` rendered the embedded Sanity Studio shell.
- The page title was `Penacova Magazine`.
- The browser reached the Sanity login provider screen for project `6pelmu7l`.
- Login options shown: Google, GitHub, E-mail / password.

This confirms that the Studio route is reachable and not being redirected by
locale middleware.

## Remaining Manual Check

The actual no-code publishing menu requires an authenticated Sanity member
session. After logging in, verify that the left navigation includes:

- `처음 시작하기 / 작성 가이드`
- `새 게시글 만들기`
- `런칭 작업실`
- `카테고리별 게시글 관리`
- `사이트 기본 설정`
- `라이더 프로필`
- `룩북 / 상품 준비`
- `작성 지원 / 용어집`

Inside `새 게시글 만들기`, verify:

- `새 Editorial 글 만들기`
- `새 Riders 인터뷰 글 만들기`
- `새 Look 글 만들기`
- `새 Heritage 글 만들기`
- `새 Guide 글 만들기`
- `새 News 글 만들기`
- `새 Stories 글 만들기`

Inside `런칭 작업실`, verify:

- `모든 런칭 카드`
- `런칭 글 카드`
- `라이더 프로필 카드`
- `용어집 작업 카드`
- `사진 / 승인 필요`
- `게시 준비 완료`

Inside `카테고리별 게시글 관리`, verify:

- `모든 게시글`
- `Editorial 글`
- `Riders 인터뷰 글`
- `Look 글`
- `Heritage 글`
- `Guide 글`
- `News 글`
- `Stories 글`

Inside an Article document, verify:

- `미리보기 버튼`
- `게시 전 체크리스트`
- Korean field descriptions for title, slug, category, hero image, body, and
  publish date.

The code-level guard for these sections lives in
`lib/magazine/studioPublishing.test.ts`.

## Verification Commands

```powershell
pnpm test lib/magazine/studioPublishing.test.ts
pnpm build
pnpm exec next dev -p 3000
```

Then open:

```text
http://localhost:3000/studio
```
