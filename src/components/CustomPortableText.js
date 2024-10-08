import { PortableText } from '@portabletext/react';
import React from 'react';
import CustomLink from '@/components/CustomLink';
import PortableTable from './PortableTable';
import Img from '@/components/Image';

const portableTextComponents = {
	block: {
		h1: ({ children }) => <h1>{children}</h1>,
		h2: ({ children }) => <h2>{children}</h2>,
		h3: ({ children }) => <h3>{children}</h3>,
		h4: ({ children }) => <h4>{children}</h4>,
		h5: ({ children }) => <h5>{children}</h5>,
		h6: ({ children }) => <h6>{children}</h6>,
	},
	list: {
		bullet: ({ children }) => <ul>{children}</ul>,
		number: ({ children }) => <ol>{children}</ol>,
	},
	types: {
		image: (data) => {
			const { value } = data;
			return <Img image={value} />;
		},
		iframe: ({ value }) => {
			const { embedSnippet } = value;
			if (!embedSnippet) {
				return null;
			}
			const width = embedSnippet.match(/width="\s*(\d+)"/)[1];
			const height = embedSnippet.match(/height="\s*(\d+)"/)[1];
			const aspectRatio =
				width && height ? `${(height / width) * 100}%` : '56.25%';

			return (
				<>
					<div
						className="iframe-container"
						dangerouslySetInnerHTML={{ __html: embedSnippet }}
					/>
					<style jsx>{`
						.iframe-container {
							position: relative;
							height: 0;
							overflow: hidden;
							max-width: 100%;
							padding-bottom: ${aspectRatio};
						}
						:global(.iframe-container iframe) {
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
						}
					`}</style>
				</>
			);
		},
		portableTable: (props) => {
			const { value } = props;
			return <PortableTable blocks={value} />;
		},
	},

	marks: {
		link: ({ value, children }) => {
			return <CustomLink link={value}>{children}</CustomLink>;
		},
		callToAction: ({ value, children }) => {
			return (
				<CustomLink link={value.link} isButton={true}>
					{children}
				</CustomLink>
			);
		},
	},
};

export default function CustomPortableText({ blocks }) {
	if (!blocks) return null;

	return <PortableText value={blocks} components={portableTextComponents} />;
}
