import { defineType } from 'sanity';

export default defineType({
	title: 'General Settings',
	name: 'settingsGeneral',
	type: 'document',
	fields: [
		{
			name: 'siteTitle',
			type: 'string',
			description: 'The name of your site, usually your company/brand name',
		},
		{
			name: 'favicon',
			type: 'image',
			description: '256 x 256px in PNG',
			options: {
				accept: '.png',
			},
		},
		{
			name: 'faviconLight',
			type: 'image',
			description:
				'For devices in dark mode, use a light color to create contrast with dark backgrounds.',
			options: {
				accept: '.png',
			},
		},
	],
	preview: {
		prepare() {
			return {
				title: 'General Settings',
			};
		},
	},
});
