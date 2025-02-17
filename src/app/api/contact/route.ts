import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const ContactEmail = ({ name, email, subject, message }: { 
  name: string;
  email: string;
  subject: string;
  message: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #374151;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
    }
    .header {
      font-size: 24px;
      font-weight: bold;
      color: #1F2937;
      margin-bottom: 20px;
    }
    .field {
      margin-bottom: 16px;
    }
    .label {
      font-weight: bold;
      color: #4B5563;
    }
    .value {
      margin-top: 4px;
    }
    .message {
      background-color: #F3F4F6;
      padding: 16px;
      border-radius: 8px;
      margin-top: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">New Contact Form Submission</div>
    
    <div class="field">
      <div class="label">From:</div>
      <div class="value">${name} (${email})</div>
    </div>
    
    <div class="field">
      <div class="label">Subject:</div>
      <div class="value">${subject}</div>
    </div>
    
    <div class="field">
      <div class="label">Message:</div>
      <div class="message">${message}</div>
    </div>
  </div>
</body>
</html>
`;

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required.", type: "error" },
        { status: 400 }
      );
    }

    // Send email using Resend
    await resend.emails.send({
      from: 'SaaSFoundr Contact <hello@aiseogen.com>',
      to: 'admin@aiseogen.com',
      subject: `New Contact Form: ${subject}`,
      html: ContactEmail({ name, email, subject, message }),
      replyTo: email
    });

    return NextResponse.json(
      {
        message: "Your message has been sent successfully! We'll get back to you soon.",
        type: "success"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { 
        message: "Oops! Something went wrong. Please try again.",
        type: "error"
      },
      { status: 500 }
    );
  }
}
