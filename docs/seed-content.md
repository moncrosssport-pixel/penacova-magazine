# Seed Content

Phase 1 includes a small seed payload so agents can verify the editorial route
without inventing new content.

## What It Creates

`sanity/seed/phase1-seed.json` creates:

- `person-editorial-desk`
- `article-quiet-morning`
- 5 glossary terms:
  - Penacova
  - 편자 / horseshoe / 蹄鉄
  - 채찍 / whip / 鞭
  - 마방 / stable / 馬房
  - 라이더 / rider / ライダー

The seed article intentionally omits `heroImage` because binary Sanity assets
need to be uploaded through Studio or an authenticated asset API flow. The
frontend route has a tonal fallback so the page can still verify the full text
rendering path. Before public launch, upload a real hero image in Studio.

Do not use dots in public seed document IDs. Dot IDs such as
`article.quiet-morning` are treated as private documents by Sanity and will not
appear to the unauthenticated public read client used by the production site.

## Apply The Seed

Preferred path: create a Sanity project token with write access, then keep it
only in the current shell session:

```powershell
$env:SANITY_AUTH_TOKEN="<token>"
pnpm run seed:sanity
```

Do not commit real Sanity tokens.

Alternative path: log the CLI into the Sanity account that owns project
`6pelmu7l`, then use the legacy CLI import script:

```bash
pnpm exec sanity login --no-open
pnpm run seed:sanity:cli
```

## Verify

After the seed is applied:

```bash
pnpm exec sanity documents query "*[_type == 'article' && slug.current == 'quiet-morning'][0]{_id,title,slug}"
pnpm build
```

Then check:

- `http://localhost:3000/ko/editorial/quiet-morning`
- `https://penacova-magazine.vercel.app/ko/editorial/quiet-morning`

The Vercel route can take a short time to refresh because the article page uses
revalidation.
