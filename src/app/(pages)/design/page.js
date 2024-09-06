import PageDesignIndex from './_components/PageDesignIndex'
import PreviewPageDesignIndex from './_components/PreviewPageDesignIndex'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { LiveQuery } from 'next-sanity/preview/live-query'
import defineMetadata from '@/lib/defineMetadata'
import { getDesignIndexPage } from '@/sanity/lib/fetch'
import { pageDesignIndex } from '@/sanity/lib/queries'

export async function generateMetadata() {
  const isPreviewMode = draftMode().isEnabled
  const data = await getDesignIndexPage({ isPreviewMode })
  return defineMetadata({ data })
}

export default async function Page() {
  const isPreviewMode = draftMode().isEnabled
  const pageData = await getDesignIndexPage({
    isPreviewMode,
    isArticleDataSSG: true,
  })
  const { page } = pageData || {}

  if (!page) return notFound()

  return (
    <LiveQuery enabled={isPreviewMode} query={pageDesignIndex} initialData={page} as={PreviewPageDesignIndex}>
      <PageDesignIndex title={page?.title} data={page?.projects} />
    </LiveQuery>
  )
}
