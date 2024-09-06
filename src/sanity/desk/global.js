import { ComponentIcon, EnvelopeIcon } from '@sanity/icons'

export const globalMenu = (S) => {
  return S.listItem()
    .title('Global Modules')
    .child(
      S.list()
        .title('Global Modules')
        .items([
          S.listItem()
            .title('Header')
            .child(S.editor().id('gHeader').schemaType('gHeader').documentId('gHeader'))
            .icon(ComponentIcon),
        ]),
    )
    .icon(ComponentIcon)
}
