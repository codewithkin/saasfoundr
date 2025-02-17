"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter text-red-600 sm:text-5xl">
          Oops! Something went wrong
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Don't worry, it's not you - it's us. Our team has been notified and we're working on it.
        </p>
        <div className="mx-auto max-w-xs space-y-2">
          <Button 
            onClick={reset}
            className="w-full"
          >
            Try Again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full"
          >
            Return Home
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 text-left p-4 bg-gray-100 rounded-lg">
            <p className="text-sm font-mono text-gray-700">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
