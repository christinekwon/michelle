import { HomeIcon, MasterDetailIcon, UnknownIcon, DocumentsIcon, UserIcon } from '@sanity/icons'

const homePage = (S) => {
  return S.listItem()
    .title('Homepage')
    .child(S.editor().id('pHome').title('Homepage').schemaType('pHome').documentId('pHome'))
    .icon(HomeIcon)
}

const aboutPage = (S) => {
  return S.listItem()
    .title('About Page')
    .child(S.editor().id('pAbout').title('About Page').schemaType('pAbout').documentId('pAbout'))
    .icon(UserIcon)
}

const errorPage = (S) => {
  return S.listItem()
    .title('404 Page')
    .child(S.editor().id('p404').title('404 Page').schemaType('p404').documentId('p404'))
    .icon(UnknownIcon)
}

export const pagesMenu = (S) => {
  return S.listItem()
    .title('Pages')
    .id('pages')
    .icon(DocumentsIcon)
    .child(
      S.list()
        .title('Primary Pages')
        .items([homePage(S), aboutPage(S), errorPage(S)]),
    )
}

export const otherPagesMenu = (S) => {
  return S.listItem()
    .title('Other Pages')
    .schemaType('pGeneral')
    .icon(DocumentsIcon)
    .child(
      S.documentTypeList('pGeneral')
        .title('Other Pages')
        .filter(`_type == "pGeneral"`)
        .apiVersion('v2023-08-01')
        .child((documentId) => S.document().documentId(documentId).schemaType('pGeneral'))
        .canHandleIntent((intent, { type }) => ['create', 'edit'].includes(intent) && type === 'pGeneral'),
    )
}
