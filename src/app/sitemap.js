import { getPagesPaths } from '@/sanity/lib/fetch';

const pageUrls = [
	'/',
	//add page slugs here ie. '/about'
];

export default async function sitemap() {
	const defaultPages = pageUrls.map((url) => {
		const path = url === '/' ? '' : url;
		return {
			url: `${process.env.SITE_URL}${path}`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		};
	});

	const generalSlugs = await getPagesPaths({ pageType: 'pGeneral' });
	const generalPages = generalSlugs.map((url) => {
		return {
			url: `${process.env.SITE_URL}/${url}`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		};
	});

	const sitemap = [...defaultPages, ...generalPages];

	return sitemap;
}
