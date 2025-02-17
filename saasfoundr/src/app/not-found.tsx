import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 left-1/2 w-[40rem] h-[40rem] bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-0 right-1/2 w-[40rem] h-[40rem] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-0 left-1/2 w-[40rem] h-[40rem] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="space-y-6 text-center relative z-10">
        <div className="space-y-2">
          <h1 className="text-[8rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-none">
            404
          </h1>
          <div className="h-1 w-40 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
          <h2 className="text-3xl font-bold text-white mt-4">
            Lost in CyberSpace
          </h2>
        </div>
        <p className="mx-auto max-w-[42rem] text-gray-400 sm:text-lg">
          Sorry, the page you were looking for couldn't be found
        </p>
        <div className="mx-auto max-w-xs space-y-3">
          <Button asChild className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white border-0">
            <Link href="/">
              Take me home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full border-gray-700 text-gray-600 hover:text-white hover:bg-gray-800 hover:border-gray-600"
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
