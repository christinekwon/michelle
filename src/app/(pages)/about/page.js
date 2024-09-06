import PageAbout from './_components/PageAbout'
import PreviewPageAbout from './_components/PreviewPageAbout'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'
import defineMetadata from '@/lib/defineMetadata'
import { getAboutPage } from '@/sanity/lib/fetch'
import { pageAboutQuery } from '@/sanity/lib/queries'

export async function generateMetadata() {
  const isPreviewMode = draftMode().isEnabled
  const data = await getAboutPage({ isPreviewMode })
  return defineMetadata({ data })
}

export default async function Page() {
  const isPreviewMode = draftMode().isEnabled
  const pageData = await getAboutPage({
    isPreviewMode,
  })
  const { page } = pageData || {}

  if (!page) return notFound()

  return (
    <LiveQuery enabled={isPreviewMode} query={pageAboutQuery} initialData={page} as={PreviewPageAbout}>
      <PageAbout data={page} />
    </LiveQuery>
  )
}
