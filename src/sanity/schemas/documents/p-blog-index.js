import { defineType } from 'sanity';
import { SlugField } from '@/sanity/component/SlugField';
import { BookIcon } from '@sanity/icons';

export default defineType({
	title: 'News',
	name: 'pBlogIndex',
	type: 'document',
	icon: BookIcon,
	groups: [
		{ title: 'Content', name: 'content' },
		{ title: 'Settings', name: 'settings' },
	],
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
			group: 'content',
		},
		{
			title: 'URL Slug',
			name: 'slug',
			type: 'slug',
			description: '(required)',
			components: {
				field: SlugField,
			},
			group: 'settings',
			validation: (Rule) => Rule.required(),
			readOnly: true,
			initialValue: { _type: 'slug', current: 'blog' },
		},
		{
			name: 'articlesPerPage',
			title: 'Articles per page',
			type: 'number',
			validation: (rule) => rule.min(4).required(),
			group: 'content',
		},

		{
			name: 'paginationMethod',
			title: 'Pagination Method',
			type: 'string',
			options: {
				list: [
					{ title: 'Page numbers', value: 'page-numbers' },
					{ title: 'Load more', value: 'load-more' },
					{
						title: 'Infinite scroll without load more button',
						value: 'infinite-scroll',
					},
				],
				layout: 'radio',
			},
			initialValue: 'page-numbers',
			group: 'content',
		},
		{
			name: 'loadMoreButtonLabel',
			title: 'Load more label',
			type: 'string',
			group: 'content',
			hidden: ({ parent }) => {
				const { paginationMethod } = parent;
				if (paginationMethod !== 'load-more') {
					return true;
				}
			},
		},
		{
			name: 'infiniteScrollCompleteLabel',
			title: 'Complete message',
			type: 'string',
			group: 'content',
			hidden: ({ parent }) => {
				const { paginationMethod } = parent;
				if (paginationMethod === 'page-numbers') {
					return true;
				}
			},
		},
		{
			title: 'SEO + Share Settings',
			name: 'sharing',
			type: 'sharing',
			group: 'settings',
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare({ title = 'Untitled' }) {
			return {
				title: title,
			};
		},
	},
});
