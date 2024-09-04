import { draftMode } from 'next/headers';
import { LiveQuery } from 'next-sanity/preview/live-query';
import { get404PageData } from '@/sanity/lib/fetch';
import { page404Query } from '@/sanity/lib/queries';
import Page404 from './_components/Page404';
import PreviewPage404 from './_components/PreviewPage404';

export async function generateMetadata() {
	const isPreviewMode = draftMode().isEnabled;
	const pageData = await get404PageData({ isPreviewMode });
	return defineMetadata({ data: pageData });
}

export default async function NotFound() {
	const isPreviewMode = draftMode().isEnabled;
	const pageData = await get404PageData({ isPreviewMode });
	const { page } = pageData || {};

	return (
		<LiveQuery
			enabled={isPreviewMode}
			query={page404Query}
			initialData={page}
			as={PreviewPage404}
		>
			<Page404 data={page} />
		</LiveQuery>
	);
}
