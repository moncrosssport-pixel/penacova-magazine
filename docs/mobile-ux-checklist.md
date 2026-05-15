# Mobile UX Checklist

Use this checklist before public launch on a 390px-wide mobile viewport and one
small-width viewport near 320px.

## Priority 1 - Launch Blockers

- [x] Mobile masthead exposes only `Editorial`, `Riders`, `Look`, and
  `Subscribe`.
- [x] Hidden categories do not appear in the masthead or sitemap until content
  exists.
- [x] `/ko/launch-workbook` returns 404 in production by default.
- [x] `/ko/launch-readiness` returns 404 in production by default.
- [x] `/ko/riders` links to the seeded Kim Jiwon rider profile.
- [x] `/ko/look` links to the seeded SS26 collection page.
- [x] Mobile Korean headings use keep-all wrapping so words do not split in the
  middle.
- [x] Article pages do not reserve a blank hero image area when no hero image is
  available.
- [x] Article/list cards do not show large placeholder logo boxes when no real
  image is available.

## Priority 2 - Pre-Launch Polish

- [x] Mobile navigation links have touch-friendly height.
- [x] Subscribe page shows an email input layout even before the real newsletter
  provider is connected.
- [x] Subscribe input uses a 16px mobile font size to avoid iOS zoom.
- [x] Lookbook and product CTAs avoid exposing the Cafe24 platform name in
  visible copy.
- [x] Footer shows only the public launch navigation set.
- [x] Footer spacing is tighter on mobile than desktop.
- [ ] Upload real hero images for `quiet-morning`, `jiwon-kim`, and `ss26`.
- [ ] Connect the actual newsletter provider in Studio `site-settings`.

## Priority 3 - Content And QA

- [ ] Publish at least 3 Editorial stories.
- [ ] Publish 1 to 3 real Rider profiles with portraits.
- [ ] Publish 1 SS26 lookbook with real look images.
- [ ] Add mobile Open Graph image checks after final visuals are uploaded.
- [ ] Re-check `/ko`, `/ko/editorial`, `/ko/riders`, `/ko/look`,
  `/ko/subscribe`, `/ko/editorial/quiet-morning`, `/ko/riders/jiwon-kim`, and
  `/ko/look/ss26` on mobile after content changes.

## Current Mobile Verification

Latest local mobile captures were saved under:

```text
D:\20240228\AI\output\penacova-magazine-mobile-check\
```

The latest local 390px verification covers:

- `/ko`
- `/ko/riders`
- `/ko/riders/jiwon-kim`
- `/ko/look`
- `/ko/look/ss26`
- `/ko/subscribe`
- `/ko/editorial/quiet-morning`
- `/ko/launch-workbook` returning 404 by default
- `/ko/launch-readiness` returning 404 by default

Use production checks after each pushed launch UX change:

```powershell
$base = "https://penacova-magazine.vercel.app"
Invoke-WebRequest -UseBasicParsing "$base/ko"
Invoke-WebRequest -UseBasicParsing "$base/ko/riders"
Invoke-WebRequest -UseBasicParsing "$base/ko/riders/jiwon-kim"
Invoke-WebRequest -UseBasicParsing "$base/ko/look"
Invoke-WebRequest -UseBasicParsing "$base/ko/look/ss26"
Invoke-WebRequest -UseBasicParsing "$base/ko/subscribe"
Invoke-WebRequest -UseBasicParsing "$base/ko/editorial/quiet-morning"
```

Internal routes should return 404 unless explicitly enabled:

```powershell
Invoke-WebRequest -UseBasicParsing "$base/ko/launch-workbook"
Invoke-WebRequest -UseBasicParsing "$base/ko/launch-readiness"
```
