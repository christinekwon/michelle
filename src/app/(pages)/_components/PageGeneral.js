'use client';

import PageModules from '@/components/PageModules';

export default function PageGeneral({ data }) {
	const { pageModules } = data || {};

	return (
		<div className="page-general c-narrow">
			{pageModules &&
				pageModules.length > 0 &&
				pageModules?.map((module, i) => (
					<PageModules key={i} module={module} />
				))}
		</div>
	);
}
