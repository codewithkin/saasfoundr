import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter text-blue-600 sm:text-5xl md:text-6xl">
          404
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          Page Not Found
        </h2>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Oops! Looks like you've ventured into uncharted territory. 
          Let's get you back on track.
        </p>
        <div className="mx-auto max-w-xs space-y-2">
          <Button asChild className="w-full">
            <Link href="/">
              Return Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full"
          >
            <Link href="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
