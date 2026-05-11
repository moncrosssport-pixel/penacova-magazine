# Launch Content Inventory

This is the working inventory for the first public Penacova Magazine launch.
It is not a substitute for finished articles, photography, or legal review.
Use it as the Studio entry plan so editors and future agents do not invent
categories, slugs, or publishing order from scratch.

The matching no-code Studio planning payload lives at
`sanity/seed/launch-briefs.json` and can be imported with:

```powershell
$env:SANITY_AUTH_TOKEN="<token>"
pnpm run seed:launch-briefs
```

The story-by-story writing workbook lives at
`docs/launch-story-workbook.md`. Use that file when turning Launch Desk cards
into final Article documents.

The glossary starter terms from this file are also available as
`sanity/seed/glossary-starter.json`:

```powershell
$env:SANITY_AUTH_TOKEN="<token>"
pnpm run seed:glossary
```

## Publishing Rule

- Korean is the source language.
- Create content in Studio, not by editing seed JSON, once launch writing begins.
- Do not publish an article until it has a real hero image, Korean title,
  Korean excerpt, Korean body, publish date, category, and slug.
- Keep commerce quiet. Use one end-of-article text CTA when useful.
- EN/JP can remain `not-started` until reviewed translations are ready.

## First 12 Stories

| No | Category | Working slug | Working Korean title | Purpose | Required assets | CTA |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | editorial | `quiet-morning` | 초원 위의 침묵, 지원의 아침 | Seed hero editorial and brand tone anchor. | Rider-at-dawn hero, 2 body images. | SS26 collection KR/JP. |
| 2 | editorial | `field-light-after-rain` | 비가 지난 뒤의 필드 라이트 | Photo-led fashion story with outdoor field mood. | Full-bleed field image, fabric detail. | Featured collection. |
| 3 | riders | `listening-before-riding` | 말보다 먼저 듣는 사람 | Rider interview focused on discipline and routine. | Portrait, stable candid, riding shot. | Rider-worn product or collection. |
| 4 | riders | `trainer-morning-routine` | 트레이너의 하루는 어디서 시작되는가 | Coach/trainer authority story for trust. | Trainer portrait, tack-room image. | Guide or shop link. |
| 5 | look | `ss26-dawn-silhouettes` | SS26, 새벽의 실루엣 | Editorial article supporting the SS26 look book. | 6 to 12 look images. | `/ko/look/ss26` or Cafe24 collection. |
| 6 | heritage | `red-stitch-standard` | 페나코바 레드 스티치의 기준 | Brand craft and visual identity story. | Stitch macro, logo/label detail. | Brand follow link. |
| 7 | heritage | `fabric-that-keeps-shape` | 안장 위에서 구겨지지 않는 원단 | Material confidence story for apparel. | Fabric macro, movement image. | Related product/category. |
| 8 | guide | `riding-jacket-fit-guide` | 승마 재킷 핏 가이드 | Practical sizing and fit reference. | Fit comparison images. | Jacket category. |
| 9 | guide | `care-after-ride` | 라이딩 후 의류 관리법 | Utility article for repeat visits and SEO. | Care flat lay, label detail. | Care-related products if any. |
| 10 | news | `ss26-preview-note` | SS26 프리뷰 노트 | Launch news and collection announcement. | Campaign image, look book thumbnail. | SS26 collection. |
| 11 | stories | `first-competition-morning` | 첫 대회 아침에 준비하는 것들 | Community/customer story format. | Amateur rider portrait, event detail. | Subscribe/follow. |
| 12 | stories | `stable-weekend-style` | 주말 마방에서 입는 옷 | Softer lifestyle-adjacent story without leaving equestrian focus. | Stable weekend image, outfit detail. | Cafe24 KR/JP. |

## First 5 Rider Profiles

Only use real names after permission is confirmed. Until then, keep the Studio
draft title as the working profile type below.

| No | Working slug | Profile type | Minimum fields | Useful links |
| --- | --- | --- | --- | --- |
| 1 | `jiwon-kim` | Existing seed rider / campaign rider | Name, romanized name, discipline, club, career years, portrait. | `quiet-morning`, SS26 look book. |
| 2 | `junior-dressage-rider` | Junior dressage rider | Name, discipline, age band if approved, club, titles, portrait. | Rider interview article. |
| 3 | `amateur-club-rider` | Amateur club rider | Name, riding history, club, favorite products, portrait. | Stories article. |
| 4 | `show-jumping-rider` | Show jumping rider | Name, discipline, competition history, favorite products, portrait. | News or rider interview. |
| 5 | `trainer-coach-profile` | Trainer or coach | Name, role, club, coaching focus, portrait. | Guide article and interview. |

## Glossary Starter Set

The glossary is for consistency across Korean source copy, EN/JP translation,
SEO, and future agent handoffs. Japanese terms should be reviewed by a native
speaker before import.

| No | Korean term | English term | Scope | Notes |
| --- | --- | --- | --- | --- |
| 1 | 승마 | equestrian riding | equestrian | General activity term. |
| 2 | 마장 | riding arena | equestrian | Use for arena or training ground. |
| 3 | 마방 | stable | equestrian | Stable or horse housing area. |
| 4 | 안장 | saddle | tack | Core tack term. |
| 5 | 굴레 | bridle | tack | Headgear including bit/reins. |
| 6 | 고삐 | reins | tack | Rider hand connection. |
| 7 | 재갈 | bit | tack | Mouthpiece. |
| 8 | 등자 | stirrup | tack | Foot support. |
| 9 | 등자끈 | stirrup leather | tack | Stirrup strap. |
| 10 | 복대 | girth | tack | Saddle securing strap. |
| 11 | 안장 패드 | saddle pad | tack | Pad under saddle. |
| 12 | 채찍 | riding crop | tack | Use carefully in brand copy. |
| 13 | 박차 | spur | tack | Use only where accurate. |
| 14 | 헬멧 | riding helmet | apparel | Safety gear. |
| 15 | 장갑 | riding gloves | apparel | Apparel/accessory. |
| 16 | 승마 부츠 | riding boots | apparel | Footwear. |
| 17 | 챕스 | chaps | apparel | Lower-leg riding gear. |
| 18 | 재킷 | jacket | apparel | Apparel term. |
| 19 | 브리치 | breeches | apparel | Riding pants. |
| 20 | 셔츠 | shirt | apparel | Apparel term. |
| 21 | 보호대 | horse boots | tack | Horse leg protection, not human boots. |
| 22 | 마의 | horse blanket | tack | Horse covering. |
| 23 | 워밍업 | warm-up | training | Pre-ride preparation. |
| 24 | 평보 | walk | gait | Four-beat gait. |
| 25 | 속보 | trot | gait | Two-beat gait. |
| 26 | 구보 | canter | gait | Three-beat gait. |
| 27 | 좌속보 | sitting trot | gait | Dressage/training term. |
| 28 | 경속보 | rising trot | gait | Posting trot. |
| 29 | 반정지 | half-halt | training | Translation must stay consistent. |
| 30 | 원형 운동 | circle work | training | Training pattern. |
| 31 | 대각선 | diagonal | training | Arena/riding line. |
| 32 | 리듬 | rhythm | training | Dressage principle. |
| 33 | 균형 | balance | training | Rider/horse balance. |
| 34 | 접촉 | contact | training | Rein connection. |
| 35 | 추진 | impulsion | training | Dressage principle. |
| 36 | 수축 | collection | training | Do not confuse with fashion collection. |
| 37 | 신장 | extension | training | Extended movement. |
| 38 | 드레사지 | dressage | discipline | Discipline. |
| 39 | 장애물 | show jumping | discipline | Use context to avoid obstacle-only meaning. |
| 40 | 크로스컨트리 | cross-country | discipline | Eventing discipline. |
| 41 | 종합마술 | eventing | discipline | Three-phase discipline. |
| 42 | 마필 관리 | horse care | horse care | General care. |
| 43 | 그루밍 | grooming | horse care | Horse grooming. |
| 44 | 편자 | horseshoe | horse care | Existing seed term should match. |
| 45 | 말굽 | hoof | horse care | Hoof, not horseshoe. |
| 46 | 대회 | competition | competition | General competition term. |
| 47 | 출전표 | start list | competition | Competition document. |
| 48 | 경기장 | competition arena | competition | Event venue/arena. |
| 49 | 마장마술 | dressage test | competition | When referring to the test, use carefully. |
| 50 | 코스 워크 | course walk | competition | Show jumping/eventing course inspection. |

## Studio Entry Sequence

1. Open `Site Settings` and confirm subscribe/follow copy.
2. Create or update Rider profiles before rider interviews.
3. Create Product and Collection references before look book stories.
4. Create the Article from the category template.
5. Generate slug from Korean title.
6. Add hero image and set hotspot.
7. Add Korean excerpt and body.
8. Set `publishedAt`.
9. Keep EN/JP translation status as `not-started` until reviewed.
10. Preview the public URL after publishing.

## Launch Readiness Check

- At least one article exists in each category.
- The homepage lead story is no longer a placeholder.
- Every public article has a real hero image.
- Every commerce CTA has UTM parameters.
- `/ko/subscribe` shows the intended provider form or follow links.
- `/sitemap.xml` includes the published routes.
