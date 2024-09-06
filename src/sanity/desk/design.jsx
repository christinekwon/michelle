import { HeartFilledIcon, DocumentIcon } from '@sanity/icons';
// import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { apiVersion } from '@/sanity/env';

const designIndexPage = (S) => {
	return S.listItem()
		.title('Index Page')
		.child(
			S.editor()
				.id('pDesignIndex')
				.title('Design Index Page')
				.schemaType('pDesignIndex')
				.documentId('pDesignIndex')
		)
		.icon(DocumentIcon);
};

export const designMenu = (S) => {
	return S.listItem()
		.title('Design')
		.id('design')
		.icon(HeartFilledIcon)
		.child(
			S.list()
				.title('Design')
				.items([
					designIndexPage(S),
					S.listItem()
						.title('Projects')
						.child(
							S.documentList()
								.title('Projects')
								.apiVersion(apiVersion)
								.filter('_type == "pDesign"')
						),
					// orderableDocumentListDeskItem({
					// 	title: 'Design Projects',
					// 	type: 'pDesign',
					// 	icon: HeartFilledIcon,
					// 	S,
					// 	context,
					// }),
				])
		);
};

// export const designMenu = (S) => {
// 	// return orderableDocumentListDeskItem({
// 	// 	title: 'Design',
// 	// 	type: 'pDesign',
// 	// 	icon: HeartFilledIcon,
// 	// 	S,
// 	// 	context,
// 	// });
// 	return S.listItem()
// 		.title('Index Page')
// 		.child(
// 			S.editor()
// 				.id('pDesignIndex')
// 				.title('Design Index Page')
// 				.schemaType('pDesignIndex')
// 				.documentId('pDesignIndex')
// 		)
// 		.icon(DocumentIcon);
// };
