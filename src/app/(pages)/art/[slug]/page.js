import PageArtSingle from '../_components/PageArtSingle'
import PreviewPageArtSingle from '../_components/PreviewPageArtSingle'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'
import defineMetadata from '@/lib/defineMetadata'
import { pageArtSingleQuery } from '@/sanity/lib/queries'
import { getArtProjectPage, getPagesPaths } from '@/sanity/lib/fetch'

export async function generateStaticParams() {
  const slugs = await getPagesPaths({ pageType: 'pArt' })
  const params = slugs.map((slug) => ({ slug }))
  return params
}

export async function generateMetadata({ params }) {
  const isPreviewMode = draftMode().isEnabled
  const data = await getArtProjectPage({ queryParams: params, isPreviewMode })
  return defineMetadata({ data })
}

export default async function Page({ params }) {
  const isPreviewMode = draftMode().isEnabled
  const pageData = await getArtProjectPage({
    queryParams: params,
    isPreviewMode,
  })
  const { page } = pageData || {}

  if (!page) return notFound()

  return (
    <LiveQuery
      enabled={isPreviewMode}
      query={pageArtSingleQuery}
      initialData={page}
      params={{ slug: params.slug }}
      as={PreviewPageArtSingle}>
      <PageArtSingle data={page} />
    </LiveQuery>
  )
}
