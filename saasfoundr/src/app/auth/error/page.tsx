import { type Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Authentication Error",
}

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-red-600">
            Unable to Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We couldn't handle your request, please try again later
          </p>
          <div className="mt-4 text-center">
            <Link
              href="/auth/signin"
              className="font-medium text-white px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-800 hover:bg-indigo-800 transition duration-500"
            >
              Return to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
