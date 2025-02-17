import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    // Example logic: Send email to an external service (e.g., Resend)
    // Add your logic here (e.g., save to database or use email service)

    return NextResponse.json({ message: 'Thank you for subscribing!' }, { status: 200 });
  } catch (error) {
    console.error('Error during subscription:', error);
    return NextResponse.json({ message: 'Error processing subscription.' }, { status: 500 });
  }
}
