import { Icons } from "./icons"

export function LoadingSpinner() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Icons.spinner className="h-12 w-12 animate-spin text-blue-600" />
      <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading...</h2>
      <p className="mt-2 text-sm text-gray-500">Just a moment while we get things ready</p>
    </div>
  )
}
