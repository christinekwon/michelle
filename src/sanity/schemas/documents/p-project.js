import { defineType } from 'sanity'
import { HeartFilledIcon } from '@sanity/icons'
import { SlugField } from '@/sanity/component/SlugField'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import customImage from '@/sanity/lib/custom-image'

export default defineType({
  title: 'Project',
  name: 'pProject',
  type: 'document',
  icon: HeartFilledIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'project' }),
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => [Rule.required()],
    },
    {
      title: 'URL Slug',
      name: 'slug',
      type: 'slug',
      description: '(required)',
      components: {
        field: SlugField,
      },
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    customImage(),
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'portableText',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title = 'Untitled' }) {
      return {
        title: title,
        media: HeartFilledIcon,
      }
    },
  },
})
