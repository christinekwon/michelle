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
  ],
  preview: {
    prepare() {
      return {
        title: 'Header Settings',
      }
    },
  },
})
