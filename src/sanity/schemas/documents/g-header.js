import customImage from '@/sanity/lib/custom-image'
import { defineType } from 'sanity'

export default defineType({
  title: 'Header Settings',
  name: 'gHeader',
  type: 'document',
  fields: [
    {
      title: 'Menu',
      name: 'menu',
      type: 'settingsMenu',
    },
    {
      title: 'Key Text',
      name: 'keyText',
      type: 'string',
    },
    customImage({ name: 'mobileImage', title: 'Mobile Header Image' }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header Settings',
      }
    },
  },
})
