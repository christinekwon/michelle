import { defineType } from 'sanity'
import { HeartFilledIcon } from '@sanity/icons'
import { SlugField } from '@/sanity/component/SlugField'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'
import customImage from '@/sanity/lib/custom-image'

export default defineType({
  title: 'Art',
  name: 'pArt',
  type: 'document',
  icon: HeartFilledIcon,
  orderings: [orderRankOrdering],
  fieldsets: [{ name: 'media', title: 'Media' }],
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
    {
      name: 'date',
      title: 'Date',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'text',
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'string',
    },
    {
      name: 'contribution',
      title: 'Contribution',
      type: 'string',
    },
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'portableText',
    },
    customImage({ name: 'thumbnail', title: 'Thumbnail', fieldset: 'media' }),
    customImage({ name: 'mainImage', title: 'Main Image', fieldset: 'media' }),
    {
      title: 'Gallery',
      name: 'gallery',
      type: 'array',
      fieldset: 'media',
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'heading',
              title: 'Section Heading (Optional)',
            },
            {
              name: 'images',
              type: 'array',
              of: [customImage()],
            },
          ],
        },
      ],
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
