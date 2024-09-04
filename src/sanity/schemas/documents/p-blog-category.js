import { defineType } from 'sanity';
import { TagsIcon } from '@sanity/icons';

export default defineType({
	title: 'Categories',
	name: 'pBlogCategory',
	type: 'document',
	icon: TagsIcon,
	fields: [
		{ name: 'title', type: 'string' },
		{
			title: 'URL Slug',
			name: 'slug',
			type: 'slug',
			description: '(required)',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		},
		{
			title: 'Category Color',
			name: 'categoryColor',
			type: 'reference',
			to: [{ type: 'settingsBrandColors' }],
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare: ({ title }) => ({
			title,
		}),
	},
});
