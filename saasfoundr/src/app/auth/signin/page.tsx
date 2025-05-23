"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/ui/icons"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signIn("resend", { email, callbackUrl: "/home" })
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProviderSignIn = (provider: "github" | "google") => {
    setIsLoading(true)
    try {
      signIn(provider, { callbackUrl: "/home" })
    } catch (error) {
      console.error(`${provider} sign in error:`, error)
      setIsLoading(false)
    }
  }

  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">
            Welcome back, founder!
          </h1>
          <p className="text-sm text-muted-foreground">
            Ready to connect with fellow SaaS builders and potential co-founders?
          </p>
        </div>

        {/* Email Sign In Form */}
        <form onSubmit={handleEmailSignIn}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-visible:ring-blue-600"
              />
              <Button 
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign in with Email
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
            onClick={() => handleProviderSignIn("github")}
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
            onClick={() => handleProviderSignIn("google")}
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
          New to SaaSFoundr?{" "}
          <a
            href="/auth/signup"
            className="underline underline-offset-4 hover:text-primary"
          >
            Join the community
          </a>
        </p>
      </div>
    </div>
  )
}
