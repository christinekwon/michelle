import { HeartFilledIcon, DocumentIcon } from '@sanity/icons'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

const artIndexPage = (S) => {
  return S.listItem()
    .title('Index Page')
    .child(S.editor().id('pArtIndex').title('Art Index Page').schemaType('pArtIndex').documentId('pArtIndex'))
    .icon(DocumentIcon)
}

export const artMenu = (S, context) => {
  return S.listItem()
    .icon(HeartFilledIcon)
    .title('Art')
    .id('art')
    .child(
      S.list()
        .title('Art')
        .items([
          artIndexPage(S),
          orderableDocumentListDeskItem({
            title: 'Art Projects',
            type: 'pArt',
            icon: HeartFilledIcon,
            S,
            context,
          }),
        ]),
    )
}
