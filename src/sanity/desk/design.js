import { HeartFilledIcon, DocumentIcon } from '@sanity/icons'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

const designIndexPage = (S) => {
  return S.listItem()
    .title('Index Page')
    .child(
      S.editor().id('pDesignIndex').title('Design Index Page').schemaType('pDesignIndex').documentId('pDesignIndex'),
    )
    .icon(DocumentIcon)
}

export const designMenu = (S, context) => {
  return S.listItem()
    .title('Design')
    .id('design')
    .icon(HeartFilledIcon)
    .child(
      S.list()
        .title('Design')
        .items([
          designIndexPage(S),
          orderableDocumentListDeskItem({
            title: 'Design Projects',
            type: 'pDesign',
            icon: HeartFilledIcon,
            S,
            context,
          }),

          // 				S.listItem()
          // .title('Projects')
          // .child(
          // 	S.documentList()
          // 		.title('Projects')
          // 		.apiVersion(apiVersion)
          // 		.filter('_type == "pDesign"')
          // ),
        ]),
    )
}
