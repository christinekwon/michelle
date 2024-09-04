import { defineType } from 'sanity';

export default defineType({
	title: 'SEO + Social Sharing',
	name: 'settingsSharing',
	type: 'document',
	fields: [
		{
			name: 'shareGraphic',
			type: 'image',
			description: '1200 x 630px in PNG, JPG, or GIF',
			options: {
				accept: '.jpg,.png,.gif',
			},
		},
	],
	preview: {
		prepare() {
			return {
				title: 'SEO + Social Sharing',
			};
		},
	},
});
