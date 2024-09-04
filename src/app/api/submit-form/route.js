import { NextResponse } from 'next/server';

export async function POST(req) {
	const body = await req.json();
	console.log('🚀 ~ Form Submit:', body);
	/* do the form api here */

	try {
		return NextResponse.json({
			state: 'success',
			message: 'Form submitted successfully',
		});
	} catch (err) {
		console.error(err);
		return new NextResponse(
			{ state: 'error', message: err.message },
			{ status: 500 }
		);
	}
}
