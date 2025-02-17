import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Please provide your email." },
        { status: 400 },
      );
    }

    // Example logic: Send email to an external service (e.g., Resend)
    // Add your logic here (e.g., save to database or use email service)

    return NextResponse.json(
      {
        message: "Thanks for signing up! We’ll notify you when we’re live!",
        type: "success",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error during subscription:", error);
    return NextResponse.json(
      { message: "Error processing subscription.", type: "error" },
      { status: 500 },
    );
  }
}
