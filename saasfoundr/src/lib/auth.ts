import NextAuth from "next-auth"
import GitHub from "@auth/core/providers/github"
import Google from "@auth/core/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Resend from "@auth/core/providers/resend"
import { Resend as ResendClient } from 'resend'
import SignInEmail from "@/components/emails/signin-email"
import { render } from "@react-email/render"

const prisma = new PrismaClient()
const resend = new ResendClient(process.env.AUTH_RESEND_KEY)

export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "auth@saasfoundr.com",
      async sendVerificationRequest({ identifier: email, url }) {
        try {
          const html = await render(SignInEmail({ url }))
          
          await resend.emails.send({
            from: "SaaSFoundr <auth@saasfoundr.com>",
            to: email,
            subject: "Sign in to SaaSFoundr",
            html,
          })
        } catch (error) {
          console.error("Failed to send verification email", error)
          throw new Error("Failed to send verification email")
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify"
  },
})
