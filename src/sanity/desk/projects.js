import { HeartFilledIcon } from '@sanity/icons'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const projectsMenu = (S, context) => {
  return orderableDocumentListDeskItem({
    title: 'Projects',
    type: 'pProject',
    icon: HeartFilledIcon,
    S,
    context,
  })
}
