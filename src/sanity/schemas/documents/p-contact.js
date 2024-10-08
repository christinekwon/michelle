import { defineField, defineType } from 'sanity';
import { BookIcon } from '@sanity/icons';
import { SlugField } from '@/sanity/component/SlugField';

const contactForm = {
	title: 'Contact Form',
	name: 'contactForm',
	type: 'object',
	fields: [
		{
			title: 'Form Title',
			name: 'formTitle',
			type: 'string',
		},
		{ title: 'Form', name: 'customForm', type: 'formBuilder' },
		{
			title: 'Success Message',
			name: 'successMessage',
			type: 'text',
			rows: 2,
		},
		{
			title: 'Error message',
			name: 'errorMessage',
			type: 'text',
			rows: 2,
		},
	],
};

export default defineType({
	title: 'Contact Page',
	name: 'pContact',
	type: 'document',
	icon: BookIcon,
	groups: [
		{ title: 'Content', name: 'content' },
		{ title: 'Settings', name: 'settings' },
	],
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
			group: 'content',
		}),
		defineField({
			title: 'URL Slug',
			name: 'slug',
			type: 'slug',
			description: '(required)',
			components: {
				field: SlugField,
			},
			options: {
				source: 'title',
				maxLength: 96,
			},
			group: 'settings',
			validation: (Rule) => Rule.required(),
			readOnly: true,
		}),
		defineField(contactForm),
	],
});
