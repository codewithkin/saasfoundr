"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/ui/icons"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signIn("resend", { email, callbackUrl: "/onboarding" })
    } catch (error) {
      console.error("Sign up error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProviderSignUp = (provider: "github" | "google") => {
    setIsLoading(true)
    try {
      signIn(provider, { callbackUrl: "/onboarding" })
    } catch (error) {
      console.error(`${provider} sign up error:`, error)
      setIsLoading(false)
    }
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">
            Join SaaSFoundr
          </h1>
          <p className="text-sm text-muted-foreground">
            Connect with fellow founders, share experiences, and find your next co-founder
          </p>
        </div>

        {/* Email Sign Up Form */}
        <form onSubmit={handleEmailSignUp}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="focus-visible:ring-blue-600"
              />
              <Button 
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign up with Email
              </Button>
            </div>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid gap-2">
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => handleProviderSignUp("github")}
            className="bg-[#24292F] text-white hover:bg-[#24292F]/90 border-0"
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.gitHub className="mr-2 h-4 w-4" />
            )}
            Continue with GitHub
          </Button>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => handleProviderSignUp("google")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}
            Continue with Google
          </Button>
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          Already a member?{" "}
          <a
            href="/auth/signin"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </a>
        </p>

        <p className="px-8 text-center text-xs text-muted-foreground">
          By signing up, you agree to our{" "}
          <a href="/terms" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
