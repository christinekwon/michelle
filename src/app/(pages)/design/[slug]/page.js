import PageDesignSingle from '../_components/PageDesignSingle'
import PreviewPageDesignSingle from '../_components/PreviewPageDesignSingle'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'
import defineMetadata from '@/lib/defineMetadata'
import { pageDesignSingleQuery } from '@/sanity/lib/queries'
import { getDesignProjectPage, getPagesPaths } from '@/sanity/lib/fetch'

export async function generateStaticParams() {
  const slugs = await getPagesPaths({ pageType: 'pDesign' })
  const params = slugs.map((slug) => ({ slug }))
  return params
}

export async function generateMetadata({ params }) {
  const isPreviewMode = draftMode().isEnabled
  const data = await getDesignProjectPage({ queryParams: params, isPreviewMode })
  return defineMetadata({ data })
}

export default async function Page({ params }) {
  const isPreviewMode = draftMode().isEnabled
  const pageData = await getDesignProjectPage({
    queryParams: params,
    isPreviewMode,
  })
  const { page } = pageData || {}

  if (!page) return notFound()

  return (
    <LiveQuery
      enabled={isPreviewMode}
      query={pageDesignSingleQuery}
      initialData={page}
      params={{ slug: params.slug }}
      as={PreviewPageDesignSingle}>
      <PageDesignSingle data={page} />
    </LiveQuery>
  )
}
