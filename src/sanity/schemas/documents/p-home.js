import { defineType } from 'sanity'
import { SlugField } from '@/sanity/component/SlugField'
import customImage from '@/sanity/lib/custom-image'

export default defineType({
  title: 'Page',
  name: 'pHome',
  type: 'document',
  fields: [
    {
      title: 'Page Slug (URL)',
      name: 'slug',
      type: 'slug',
      initialValue: 'homepage',
      components: {
        field: SlugField,
      },
      options: {
        source: 'title',
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 96),
      },
      validation: (Rule) => [Rule.required()],
      hidden: true,
      // ^ uncomment once page is published
    },
    {
      title: 'Korean Title',
      name: 'titleKorean',
      type: 'text',
    },
    customImage({ name: 'titleImage', title: 'Title Image' }),
    customImage({ name: 'mainImage', title: 'Main Image' }),
    {
      title: 'SEO + Share Settings',
      name: 'sharing',
      type: 'sharing',
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare({ title = 'Untitled', slug = {} }) {
      return {
        title,
        subtitle: slug.current ? `/${slug.current}` : 'Missing page slug',
      }
    },
  },
})
