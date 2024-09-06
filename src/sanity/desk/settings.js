import { CogIcon, EarthGlobeIcon, InfoFilledIcon, PackageIcon } from '@sanity/icons'

export const settingsMenu = (S) => {
  return S.listItem()
    .title('Settings')
    .child(
      S.list()
        .title('Settings')
        .items([
          S.listItem()
            .title('General')
            .child(S.editor().id('settingsGeneral').schemaType('settingsGeneral').documentId('settingsGeneral'))
            .icon(EarthGlobeIcon),
          S.listItem()
            .title('SEO + Social Sharing')
            .child(S.editor().id('settingsSharing').schemaType('settingsSharing').documentId('settingsSharing'))
            .icon(InfoFilledIcon),
        ]),
    )
    .icon(CogIcon)
}
