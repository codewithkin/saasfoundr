import { Icons } from "./icons"

export function LoadingSpinner() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="relative">
        <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 animate-pulse" />
        <Icons.spinner className="relative h-16 w-16 animate-spin text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
        Loading...
      </h2>
      <p className="mt-2 text-sm text-gray-400">
        Preparing something amazing for you
      </p>
    </div>
  )
}