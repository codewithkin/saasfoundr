// lib/resend.ts

import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY as string);

export const sendEmail = async (email: string) => {
  try {
    await resend.emails.send({
      from: "your-email@example.com", // The email you're sending from
      to: email,
      subject: "You've Joined the Waitlist!",
      html: `<p>Thank you for signing up for SaaSFoundr! You're now on the waitlist. We’ll notify you when we’re ready.</p>`,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
