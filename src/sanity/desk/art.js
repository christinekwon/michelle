import { HeartFilledIcon } from '@sanity/icons'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const artMenu = (S, context) => {
  return orderableDocumentListDeskItem({
    title: 'Art',
    type: 'pArt',
    icon: HeartFilledIcon,
    S,
    context,
  })
}
