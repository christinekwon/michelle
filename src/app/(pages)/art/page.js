import PageArtIndex from './_components/PageArtIndex'
import PreviewPageArtIndex from './_components/PreviewPageArtIndex'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'
import defineMetadata from '@/lib/defineMetadata'
import { getArtIndexPage } from '@/sanity/lib/fetch'
import { pageArtIndex } from '@/sanity/lib/queries'

export async function generateMetadata() {
  const isPreviewMode = draftMode().isEnabled
  const data = await getArtIndexPage({ isPreviewMode })
  return defineMetadata({ data })
}

export default async function Page() {
  const isPreviewMode = draftMode().isEnabled
  const pageData = await getArtIndexPage({
    isPreviewMode,
    isArticleDataSSG: true,
  })
  const { page } = pageData || {}

  if (!page) return notFound()

  return (
    <LiveQuery enabled={isPreviewMode} query={pageArtIndex} initialData={page} as={PreviewPageArtIndex}>
      <PageArtIndex data={page} />
    </LiveQuery>
  )
}
