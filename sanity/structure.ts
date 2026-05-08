import type { StructureResolver } from 'sanity/structure';

const articleCategories = [
  { title: 'Editorial', category: 'editorial' },
  { title: 'Rider Interviews', category: 'riders' },
  { title: 'Look Book Stories', category: 'look' },
  { title: 'Heritage', category: 'heritage' },
  { title: 'Guide', category: 'guide' },
  { title: 'News', category: 'news' },
  { title: 'Stories', category: 'stories' },
];

export const publishingStructure: StructureResolver = (S) =>
  S.list()
    .title('Penacova Publishing')
    .items([
      S.listItem()
        .title('Launch Desk')
        .child(
          S.list()
            .title('Launch Desk')
            .items([
              S.documentTypeListItem('launchBrief').title('All Launch Briefs'),
              S.divider(),
              S.listItem()
                .title('Story Briefs')
                .child(
                  S.documentList()
                    .title('Story Briefs')
                    .schemaType('launchBrief')
                    .filter('_type == "launchBrief" && briefType == "story"')
                    .defaultOrdering([{ field: 'priority', direction: 'asc' }]),
                ),
              S.listItem()
                .title('Rider Profile Briefs')
                .child(
                  S.documentList()
                    .title('Rider Profile Briefs')
                    .schemaType('launchBrief')
                    .filter(
                      '_type == "launchBrief" && briefType == "rider-profile"',
                    )
                    .defaultOrdering([{ field: 'priority', direction: 'asc' }]),
                ),
              S.listItem()
                .title('Glossary Batch')
                .child(
                  S.documentList()
                    .title('Glossary Batch')
                    .schemaType('launchBrief')
                    .filter(
                      '_type == "launchBrief" && briefType == "glossary-batch"',
                    )
                    .defaultOrdering([{ field: 'priority', direction: 'asc' }]),
                ),
              S.divider(),
              S.listItem()
                .title('Needs Assets / Approval')
                .child(
                  S.documentList()
                    .title('Needs Assets / Approval')
                    .schemaType('launchBrief')
                    .filter(
                      '_type == "launchBrief" && (status == "assets-needed" || needsApproval == true)',
                    )
                    .defaultOrdering([{ field: 'priority', direction: 'asc' }]),
                ),
              S.listItem()
                .title('Ready to Publish')
                .child(
                  S.documentList()
                    .title('Ready to Publish')
                    .schemaType('launchBrief')
                    .filter(
                      '_type == "launchBrief" && status == "ready-to-publish"',
                    )
                    .defaultOrdering([{ field: 'priority', direction: 'asc' }]),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Articles by Category')
        .child(
          S.list()
            .title('Articles by Category')
            .items([
              S.documentTypeListItem('article').title('All Articles'),
              S.divider(),
              ...articleCategories.map((item) =>
                S.listItem()
                  .title(item.title)
                  .child(
                    S.documentList()
                      .title(item.title)
                      .schemaType('article')
                      .filter('_type == "article" && category == $category')
                      .params({ category: item.category })
                      .defaultOrdering([
                        { field: 'publishedAt', direction: 'desc' },
                      ]),
                  ),
              ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('site-settings')
            .title('Site Settings'),
        ),
      S.divider(),
      S.documentTypeListItem('rider').title('Rider Profiles'),
      S.listItem()
        .title('Look Book Setup')
        .child(
          S.list()
            .title('Look Book Setup')
            .items([
              S.documentTypeListItem('collection').title('Collections'),
              S.documentTypeListItem('look').title('Looks'),
              S.documentTypeListItem('product').title('Products'),
            ]),
        ),
      S.listItem()
        .title('Editorial Support')
        .child(
          S.list()
            .title('Editorial Support')
            .items([
              S.documentTypeListItem('person').title('Authors / Editors'),
              S.documentTypeListItem('glossary').title('All Glossary Terms'),
              S.divider(),
              S.listItem()
                .title('Glossary Needs JP Review')
                .child(
                  S.documentList()
                    .title('Glossary Needs JP Review')
                    .schemaType('glossary')
                    .filter(
                      '_type == "glossary" && reviewStatus == "jp-review-needed"',
                    )
                    .defaultOrdering([{ field: 'koTerm', direction: 'asc' }]),
                ),
              S.listItem()
                .title('Glossary Ready')
                .child(
                  S.documentList()
                    .title('Glossary Ready')
                    .schemaType('glossary')
                    .filter('_type == "glossary" && reviewStatus == "ready"')
                    .defaultOrdering([{ field: 'koTerm', direction: 'asc' }]),
                ),
            ]),
        ),
    ]);
