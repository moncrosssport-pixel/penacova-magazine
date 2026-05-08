# Custom Domain Runbook

Target domain:

```text
magazine.penacova.co.kr
```

Current Vercel project:

```text
https://vercel.com/moncrosssport-pixels-projects/penacova-magazine
```

Current production fallback:

```text
https://penacova-magazine.vercel.app
```

## Current DNS State

Checked from this workspace on 2026-05-08.

```text
magazine.penacova.co.kr CNAME penacova.co.kr
penacova.co.kr A 183.111.139.226
penacova.co.kr A 183.111.139.225
penacova.co.kr A 203.245.12.102
penacova.co.kr A 183.111.139.230
```

This means the magazine subdomain is not pointing at Vercel yet.

The desired Vercel DNS record is:

```text
magazine.penacova.co.kr CNAME cname.vercel-dns.com
```

If the DNS admin screen asks for host/name and value:

```text
Type: CNAME
Host: magazine
Value: cname.vercel-dns.com
TTL: Auto or 300
```

Before adding this, remove the existing `magazine -> penacova.co.kr` CNAME if
the DNS provider does not allow duplicate records.

## Important Account Rule

Do not use the local Vercel CLI unless it is authenticated to the correct
Moncrosssport account.

The local CLI currently lists only:

```text
etehofk1-ops-projects
```

That is not the correct Vercel scope for this project.

Use the Vercel dashboard in the `moncrosssport-pixels-projects` scope instead,
or re-login the CLI to the correct account before running domain commands.

## Dashboard Steps

1. Open:

```text
https://vercel.com/moncrosssport-pixels-projects/penacova-magazine
```

2. Go to `Domains`.
3. Add:

```text
magazine.penacova.co.kr
```

4. Vercel will show the DNS record it expects. It should be:

```text
CNAME cname.vercel-dns.com
```

5. Open the DNS provider for `penacova.co.kr`.
6. Replace the current `magazine` CNAME target with:

```text
cname.vercel-dns.com
```

7. Wait for DNS propagation.
8. Return to Vercel and click `Refresh` or wait until the domain shows Valid.

## Sanity CORS

After the custom domain works, add this origin in Sanity Manage for project
`6pelmu7l`:

```text
https://magazine.penacova.co.kr
```

Use the same setting area where the current Vercel production origin is allowed.
This protects Studio/browser access if the custom domain becomes the primary
editing or preview surface later.

## Verification

DNS should return:

```powershell
Resolve-DnsName magazine.penacova.co.kr -Type CNAME
```

Expected:

```text
NameHost : cname.vercel-dns.com
```

Public site check:

```text
https://magazine.penacova.co.kr/ko
```

Expected:

- The magazine homepage loads.
- `/` redirects to `/ko`.
- `/studio` loads the Studio shell after login.
- `/sitemap.xml` still works.

Full launch check:

```powershell
pnpm check:launch
```

Expected when the domain and content are ready:

```text
Penacova Magazine Launch Readiness
[READY]
```

## Do Not Change

- Do not move the project to an `etehofk` Vercel scope.
- Do not point the root domain `penacova.co.kr` to Vercel for this task.
- Do not add Cafe24 shop checkout or cart behavior to the magazine.
- Do not commit Vercel tokens or DNS credentials.
