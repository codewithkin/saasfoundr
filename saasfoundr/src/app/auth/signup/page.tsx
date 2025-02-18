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
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container flex min-h-screen items-center justify-center">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="flex flex-col space-y-3 text-center">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
              Welcome to SaaSFoundr
            </h1>
            <p className="text-base text-gray-600">
              Join a community of innovative founders building the next generation of SaaS
            </p>
          </div>

          {/* Email Sign Up Form */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-4">
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
                className="h-11 rounded-lg border-gray-200 focus-visible:ring-blue-500"
              />
              <Button 
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-700 hover:from-blue-600 hover:to-purple-800 text-white rounded-lg font-medium"
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Get Started with Email
              </Button>
            </div>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gradient-to-br from-blue-50 to-purple-50 px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => handleProviderSignUp("github")}
              className="w-full h-11 bg-[#24292F] text-white hover:bg-[#24292F]/90 border-0 rounded-lg font-medium"
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.gitHub className="mr-2 h-5 w-5" />
              )}
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={() => handleProviderSignUp("google")}
              className="w-full h-11 bg-white text-gray-800 hover:bg-gray-50 border border-gray-200 rounded-lg font-medium"
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-5 w-5" />
              )}
              Continue with Google
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500">
            By signing up, you agree to our{" "}
            <a href="/terms" className="underline underline-offset-4 hover:text-blue-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline underline-offset-4 hover:text-blue-500">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
