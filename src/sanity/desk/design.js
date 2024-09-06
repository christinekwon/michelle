import { HeartFilledIcon } from '@sanity/icons'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const designMenu = (S, context) => {
  return orderableDocumentListDeskItem({
    title: 'Design',
    type: 'pDesign',
    icon: HeartFilledIcon,
    S,
    context,
  })
}
