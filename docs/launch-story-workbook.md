# Launch Story Workbook

This workbook turns the 12 Launch Desk story briefs into concrete Studio input
checklists. It helps an editor create the first public stories without touching
GitHub, Vercel, seed JSON, or code.

Do not publish from this workbook alone. Publish only after the Studio Article
has a real hero image, reviewed Korean source copy, category, slug, publish
date, and any required identity or product approval.

## Studio Flow

1. Open `/studio`.
2. Open `Launch Desk`.
3. Choose the matching story brief.
4. Confirm assets and approvals.
5. Open `Articles by Category`.
6. Create the matching Article template.
7. Fill `Source launch brief` with the original Launch Brief.
8. Copy the planned slug into the Article slug.
9. Fill Korean title, excerpt, body, hero image, publish date, and quiet CTA.
10. Publish only after the public URL matches the route in this workbook.

## Required Article Fields

- `Source launch brief`: link back to the matching Launch Desk card.
- `Title`: Korean source title.
- `Slug`: the exact planned slug below.
- `Category / public section`: the exact category below.
- `Excerpt`: one or two quiet Korean sentences.
- `Hero image`: real editorial image with hotspot.
- `Body`: Korean source body, not machine filler.
- `Published at`: approved date and time.
- `Translation status`: keep EN/JP as `not-started` until reviewed.
- `End CTA`: optional quiet text link only.

## Body Skeleton

Use this shape for every launch story:

```text
Kicker
One short opening scene.

Paragraph 1: where we are, who or what is in frame, and why it matters.
Paragraph 2: the riding, material, product, or person detail.
Paragraph 3: the Penacova point of view, written quietly.
Paragraph 4: practical or emotional close.

Optional end CTA as one text line.
```

## Story Worksheets

### 1. `quiet-morning`

- Category: `editorial`
- Public route: `/ko/editorial/quiet-morning`
- Source launch brief: `launch-brief-story-quiet-morning`
- Purpose: Seed hero editorial and brand tone anchor.
- Required assets: Rider-at-dawn hero image; two body images.
- CTA intent: SS26 collection KR/JP.
- Approval note: Use as homepage lead only after the hero image is real and the
  Korean body has been reviewed.
- Suggested body angle: A quiet morning field scene, centered on light,
  posture, fabric, and the discipline around getting ready.

### 2. `field-light-after-rain`

- Category: `editorial`
- Public route: `/ko/editorial/field-light-after-rain`
- Source launch brief: `launch-brief-story-field-light-after-rain`
- Purpose: Photo-led fashion story with outdoor field mood.
- Required assets: Full-bleed field image; fabric detail image.
- CTA intent: Featured collection.
- Approval note: Keep the copy atmospheric and specific to the apparel in the
  photos.
- Suggested body angle: Wet ground, clear air after rain, field texture, and
  how the clothing holds shape in a natural riding environment.

### 3. `listening-before-riding`

- Category: `riders`
- Public route: `/ko/riders/interviews/listening-before-riding`
- Source launch brief: `launch-brief-story-listening-before-riding`
- Purpose: Rider interview focused on discipline and routine.
- Required assets: Rider portrait; stable candid; riding shot; interview
  approval.
- CTA intent: Rider-worn product or collection.
- Approval note: Publish as an Article with category Riders, not as a Rider
  Profile document.
- Suggested body angle: A rider's pre-ride listening routine, the horse's
  response, and the restraint that gives the interview its tone.

### 4. `trainer-morning-routine`

- Category: `riders`
- Public route: `/ko/riders/interviews/trainer-morning-routine`
- Source launch brief: `launch-brief-story-trainer-morning-routine`
- Purpose: Coach or trainer authority story for trust.
- Required assets: Trainer portrait; tack-room image; name and club approval.
- CTA intent: Guide article or shop link.
- Approval note: Confirm all credentials and titles before moving this brief to
  Ready to publish.
- Suggested body angle: A trainer's first checks of the day, what they notice
  before a lesson begins, and how preparation shapes confidence.

### 5. `ss26-dawn-silhouettes`

- Category: `look`
- Public route: `/ko/look/ss26-dawn-silhouettes`
- Source launch brief: `launch-brief-story-ss26-dawn-silhouettes`
- Purpose: Editorial article supporting the SS26 look book.
- Required assets: Six to twelve look images; collection reference; product
  references.
- CTA intent: `/ko/look/ss26` or Cafe24 collection.
- Approval note: Create Collection and Look documents before publishing this
  story.
- Suggested body angle: SS26 silhouettes as a dawn sequence, moving from stable
  preparation to field light and finishing with the collection link.

### 6. `red-stitch-standard`

- Category: `heritage`
- Public route: `/ko/heritage/red-stitch-standard`
- Source launch brief: `launch-brief-story-red-stitch-standard`
- Purpose: Brand craft and visual identity story.
- Required assets: Stitch macro; logo or label detail.
- CTA intent: Brand follow link.
- Approval note: Use restrained brand language and avoid sounding like a product
  page.
- Suggested body angle: The red stitch as a small design decision, not a slogan:
  where it appears, why it matters, and how it behaves in close-up.

### 7. `fabric-that-keeps-shape`

- Category: `heritage`
- Public route: `/ko/heritage/fabric-that-keeps-shape`
- Source launch brief: `launch-brief-story-fabric-that-keeps-shape`
- Purpose: Material confidence story for apparel.
- Required assets: Fabric macro; movement image.
- CTA intent: Related product or category.
- Approval note: Use only claims that the product team can support.
- Suggested body angle: Fabric after motion, how shape is maintained, and the
  difference between visible polish and functional comfort.

### 8. `riding-jacket-fit-guide`

- Category: `guide`
- Public route: `/ko/guide/riding-jacket-fit-guide`
- Source launch brief: `launch-brief-story-riding-jacket-fit-guide`
- Purpose: Practical sizing and fit reference.
- Required assets: Fit comparison images; sizing notes.
- CTA intent: Jacket category.
- Approval note: Keep the guide useful even when no product link is clicked.
- Suggested body angle: Fit checkpoints around shoulder, sleeve, waist, and
  riding posture, written as calm practical guidance.

### 9. `care-after-ride`

- Category: `guide`
- Public route: `/ko/guide/care-after-ride`
- Source launch brief: `launch-brief-story-care-after-ride`
- Purpose: Utility article for repeat visits and SEO.
- Required assets: Care flat lay; label detail; care instructions review.
- CTA intent: Care-related products if any.
- Approval note: Confirm care instructions with product labels before
  publishing.
- Suggested body angle: What to do after returning from the arena: airing,
  brushing, checking labels, storing, and protecting fabric shape.

### 10. `ss26-preview-note`

- Category: `news`
- Public route: `/ko/news/ss26-preview-note`
- Source launch brief: `launch-brief-story-ss26-preview-note`
- Purpose: Launch news and collection announcement.
- Required assets: Campaign image; look book thumbnail; launch date approval.
- CTA intent: SS26 collection.
- Approval note: Set `publishedAt` only after launch timing is approved.
- Suggested body angle: A short editor's note announcing SS26 with restrained
  dates, collection context, and where readers can see the look book.

### 11. `first-competition-morning`

- Category: `stories`
- Public route: `/ko/stories/first-competition-morning`
- Source launch brief: `launch-brief-story-first-competition-morning`
- Purpose: Community or customer story format.
- Required assets: Amateur rider portrait; event detail; identity approval.
- CTA intent: Subscribe or follow.
- Approval note: Do not publish personal details until the featured person
  approves the final copy.
- Suggested body angle: The small preparations of a first competition morning,
  with personal details kept approved and modest.

### 12. `stable-weekend-style`

- Category: `stories`
- Public route: `/ko/stories/stable-weekend-style`
- Source launch brief: `launch-brief-story-stable-weekend-style`
- Purpose: Lifestyle-adjacent story without leaving equestrian focus.
- Required assets: Stable weekend image; outfit detail.
- CTA intent: Cafe24 KR/JP.
- Approval note: Keep the subject anchored in riding culture, not generic
  weekend fashion.
- Suggested body angle: Weekend stable dressing as a riding-life story: comfort,
  movement, quiet polish, and the environment around the rider.
