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

- `Launch Desk`
- `Articles by Category`
- `Site Settings`
- `Rider Profiles`
- `Look Book Setup`
- `Editorial Support`

Inside `Launch Desk`, verify:

- `All Launch Briefs`
- `Story Briefs`
- `Rider Profile Briefs`
- `Glossary Batch`
- `Needs Assets / Approval`
- `Ready to Publish`

Inside `Articles by Category`, verify:

- `All Articles`
- `Editorial`
- `Rider Interviews`
- `Look Book Stories`
- `Heritage`
- `Guide`
- `News`
- `Stories`

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
