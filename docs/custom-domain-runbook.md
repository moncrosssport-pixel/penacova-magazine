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

## Scope

This is an optional magazine subdomain setup. It is not a Cafe24 migration.

Use these steps only if `magazine.penacova.co.kr` should open the magazine.
The root domain `penacova.co.kr`, the existing shop, Cafe24 hosting, and domain
nameservers should stay exactly where they are.

## Current DNS State

Checked from this workspace on 2026-05-08 after the domain was added to Vercel.

```text
magazine.penacova.co.kr CNAME penacova.co.kr
penacova.co.kr A 183.111.139.226
penacova.co.kr A 183.111.139.225
penacova.co.kr A 203.245.12.102
penacova.co.kr A 183.111.139.230
```

This means the magazine subdomain is not pointing at Vercel yet.

Vercel now has `magazine.penacova.co.kr` added to the
`moncrosssport-pixels-projects/penacova-magazine` project.

If the optional magazine subdomain should use the brand URL, Vercel expects this
single subdomain record:

```text
A magazine.penacova.co.kr 76.76.21.21
```

If the DNS admin screen asks for host/name and value:

```text
Type: A
Host: magazine
Value: 76.76.21.21
TTL: Auto or 300
```

Before adding this, remove the existing `magazine -> penacova.co.kr` CNAME if
the DNS provider does not allow duplicate records.

## Important Account Rule

The local Vercel CLI has been re-authenticated and linked to the correct
project:

```text
moncrosssport-pixels-projects/penacova-magazine
```

Do not relink this repository to an `etehofk` Vercel scope.

## Dashboard Steps

1. Open:

```text
https://vercel.com/moncrosssport-pixels-projects/penacova-magazine
```

2. Go to `Domains`.
3. Confirm `magazine.penacova.co.kr` exists on the project.
4. Vercel should show the DNS record it expects:

```text
A magazine.penacova.co.kr 76.76.21.21
```

5. Open the DNS provider for `penacova.co.kr`.
6. Only edit the `magazine` host record. Replace the current `magazine` CNAME
   with:

```text
A magazine 76.76.21.21
```

7. Do not change the root `@` record, shop records, or nameservers.
8. Wait for DNS propagation.
9. Return to Vercel and click `Refresh` or wait until the domain shows Valid.

## Sanity CORS

This origin has already been added in Sanity Manage for project `6pelmu7l`:

```text
https://magazine.penacova.co.kr
```

Current CORS origins:

```text
http://localhost:3000
https://penacova-magazine.vercel.app
https://magazine.penacova.co.kr
http://localhost:3333
```

## Verification

DNS should return:

```powershell
Resolve-DnsName magazine.penacova.co.kr -Type A
```

Expected:

```text
IPAddress : 76.76.21.21
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

By default this command treats the magazine subdomain as optional. To make the
subdomain a required launch gate for a branded-domain launch, run:

```powershell
$env:PENACOVA_REQUIRE_CUSTOM_DOMAIN="1"
pnpm check:launch
```

Expected when required content and the optional domain gate are ready:

```text
Penacova Magazine Launch Readiness
[READY]
```

## Do Not Change

- Do not move the project to an `etehofk` Vercel scope.
- Do not move Cafe24 DNS or the domain nameservers for this magazine task.
- Do not point the root domain `penacova.co.kr` to Vercel for this task.
- Do not change existing shop DNS records.
- Do not add Cafe24 shop checkout or cart behavior to the magazine.
- Do not commit Vercel tokens or DNS credentials.
