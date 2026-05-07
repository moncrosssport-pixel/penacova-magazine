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
              S.documentTypeListItem('glossary').title('Glossary Terms'),
            ]),
        ),
    ]);
