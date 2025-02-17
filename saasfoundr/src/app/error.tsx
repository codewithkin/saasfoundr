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
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 left-1/2 w-[40rem] h-[40rem] bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-0 right-1/2 w-[40rem] h-[40rem] bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-[40rem] h-[40rem] bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="space-y-6 text-center relative z-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 sm:text-5xl">
            OOPS ! An error occured
          </h1>
          <div className="h-1 w-40 mx-auto bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full" />
        </div>
        <p className="mx-auto max-w-[42rem] text-gray-400 sm:text-lg">
          An error has occured, please try again or go back home. Happy browsing !
        </p>
        <div className="mx-auto max-w-xs space-y-3">
          <Button 
            onClick={reset}
            className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white border-0"
          >
            Try again
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full border-gray-700 text-gray-500 hover:text-white hover:bg-gray-800 hover:border-gray-600"
          >
            Take me home
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 mx-auto max-w-lg">
            <div className="text-left p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-sm font-mono text-orange-400">
                {error.message}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
