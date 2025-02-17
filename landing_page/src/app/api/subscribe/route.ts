import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

const WaitlistEmail = ({ email }: { email: string }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to SaaSFoundr Waitlist! 🚀</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #374151;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 32px 24px;
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #1E40AF;
      margin-bottom: 16px;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #1F2937;
      margin-bottom: 16px;
    }
    .benefits {
      background-color: #F3F4F6;
      border-radius: 8px;
      padding: 24px;
      margin: 24px 0;
    }
    .benefit-item {
      margin-bottom: 16px;
    }
    .cta {
      text-align: center;
      margin: 32px 0;
    }
    .social {
      text-align: center;
      color: #6B7280;
      font-size: 14px;
    }
    .footer {
      text-align: center;
      color: #9CA3AF;
      font-size: 12px;
      margin-top: 32px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">SaaSFoundr</div>
    </div>
    
    <div class="title">You're in! 🎉</div>
    
    <p>Hey future founder! 👋</p>
    
    <p>We're thrilled to have you join the SaaSFoundr waitlist! You're now part of an exclusive group of ambitious entrepreneurs ready to revolutionize the SaaS industry. 🚀</p>
    
    <div class="benefits">
      <strong>Here's what you can look forward to:</strong>
      <div class="benefit-item">✨ Early access to the platform</div>
      <div class="benefit-item">🤝 Join our private community</div>
      <div class="benefit-item">⭐️ Priority support during launch</div>
    </div>
    
    <p>We're working hard to create the perfect platform for finding your ideal co-founder. We'll keep you updated on our progress and let you know as soon as we're ready to launch! 🎯</p>
    
    <div class="cta">
      <p>Got questions? We'd love to hear from you!</p>
      <p>Just reply to this email or reach out at <a href="mailto:support@saasfoundr.com">support@saasfoundr.com</a></p>
    </div>
    
    <div class="social">
      Let's connect:<br>
      <a href="https://twitter.com/codewithkin">Twitter</a> • 
    </div>
    
    <div class="footer">
      &copy; 2024 SaaSFoundr. All rights reserved.<br>
      You're receiving this email because you joined our waitlist.
    </div>
  </div>
</body>
</html>
`;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Please provide your email.", type: "error" },
        { status: 400 },
      );
    }

    // Send welcome email using Resend
    await resend.emails.send({
      from: 'SaaSFoundr <hello@aiseogen.com>',
      to: email,
      subject: '🎉 Welcome to the SaaSFoundr Waitlist!',
      html: WaitlistEmail({ email }),
    });

    // TODO: Save email to database

    return NextResponse.json(
      {
        message: "You're on the list! Check your email for confirmation. 🎉",
        type: "success",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error during subscription:", error);
    return NextResponse.json(
      { 
        message: "Oops! Something went wrong. Please try again.", 
        type: "error" 
      },
      { status: 500 },
    );
  }
}
