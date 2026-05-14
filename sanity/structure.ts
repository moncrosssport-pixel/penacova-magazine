import type { StructureBuilder, StructureResolver } from 'sanity/structure';
import {
  articlePublishingCategories,
  glossaryReviewSections,
  launchDeskSections,
  type StudioDocumentListSection,
} from './publishing';
import { OperatorGuide } from './components/OperatorGuide';

function documentListItem(
  S: StructureBuilder,
  section: StudioDocumentListSection,
) {
  const documentList = S.documentList()
    .id(section.id)
    .title(section.title)
    .schemaType(section.schemaType)
    .filter(section.filter)
    .defaultOrdering(section.defaultOrdering);

  return S.listItem()
    .id(section.id)
    .title(section.title)
    .child(section.params ? documentList.params(section.params) : documentList);
}

function articleDocumentList(
  S: StructureBuilder,
  item: (typeof articlePublishingCategories)[number],
) {
  return S.documentList()
    .id(`${item.templateId}-documents`)
    .title(item.structureTitle)
    .schemaType('article')
    .filter('_type == "article" && category == $category')
    .params({ category: item.category })
    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
    .initialValueTemplates([S.initialValueTemplateItem(item.templateId)]);
}

export const publishingStructure: StructureResolver = (S) =>
  S.list()
    .id('penacova-magazine-root')
    .title('페나코바 매거진 관리')
    .items([
      S.listItem()
        .id('operator-guide')
        .title('처음 시작하기 / 작성 가이드')
        .child(
          S.component(OperatorGuide).id('operator-guide-pane').title(
            '처음 시작하기 / 작성 가이드',
          ),
        ),
      S.listItem()
        .id('new-article')
        .title('새 게시글 만들기')
        .child(
          S.list()
            .id('new-article-list')
            .title('새 게시글 만들기')
            .items(
              articlePublishingCategories.map((item) =>
                S.listItem()
                  .id(`${item.templateId}-new`)
                  .title(item.templateTitle)
                  .child(articleDocumentList(S, item)),
              ),
            ),
        ),
      S.divider(),
      S.listItem()
        .id('launch-desk')
        .title('런칭 작업실')
        .child(
          S.list()
            .id('launch-desk-list')
            .title('런칭 작업실')
            .items([
              S.documentTypeListItem('launchBrief').title('모든 런칭 카드'),
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
        .id('articles-by-category')
        .title('카테고리별 게시글 관리')
        .child(
          S.list()
            .id('articles-by-category-list')
            .title('카테고리별 게시글 관리')
            .items([
              S.documentTypeListItem('article').title('모든 게시글'),
              S.divider(),
              ...articlePublishingCategories.map((item) =>
                S.listItem()
                  .id(`${item.templateId}-manage`)
                  .title(item.structureTitle)
                  .child(articleDocumentList(S, item)),
              ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .id('site-settings')
        .title('사이트 기본 설정')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('site-settings')
            .title('사이트 기본 설정'),
        ),
      S.divider(),
      S.documentTypeListItem('rider').title('라이더 프로필'),
      S.listItem()
        .id('lookbook-setup')
        .title('룩북 / 상품 준비')
        .child(
          S.list()
            .id('lookbook-setup-list')
            .title('룩북 / 상품 준비')
            .items([
              S.documentTypeListItem('collection').title('시즌 컬렉션'),
              S.documentTypeListItem('look').title('룩'),
              S.documentTypeListItem('product').title('상품 참고자료'),
            ]),
        ),
      S.listItem()
        .id('editorial-support')
        .title('작성 지원 / 용어집')
        .child(
          S.list()
            .id('editorial-support-list')
            .title('작성 지원 / 용어집')
            .items([
              S.documentTypeListItem('person').title('작성자 / 편집자'),
              S.documentTypeListItem('glossary').title('모든 용어'),
              S.divider(),
              ...glossaryReviewSections.map((section) =>
                documentListItem(S, section),
              ),
            ]),
        ),
    ]);
