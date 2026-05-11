import type { StructureBuilder, StructureResolver } from 'sanity/structure';
import {
  articlePublishingCategories,
  glossaryReviewSections,
  launchDeskSections,
  type StudioDocumentListSection,
} from './publishing';

function documentListItem(
  S: StructureBuilder,
  section: StudioDocumentListSection,
) {
  const documentList = S.documentList()
    .title(section.title)
    .schemaType(section.schemaType)
    .filter(section.filter)
    .defaultOrdering(section.defaultOrdering);

  return S.listItem()
    .title(section.title)
    .child(section.params ? documentList.params(section.params) : documentList);
}

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
              ...launchDeskSections
                .slice(0, 3)
                .map((section) => documentListItem(S, section)),
              S.divider(),
              ...launchDeskSections
                .slice(3)
                .map((section) => documentListItem(S, section)),
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
              ...articlePublishingCategories.map((item) =>
                S.listItem()
                  .title(item.structureTitle)
                  .child(
                    S.documentList()
                      .title(item.structureTitle)
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
              ...glossaryReviewSections.map((section) =>
                documentListItem(S, section),
              ),
            ]),
        ),
    ]);
