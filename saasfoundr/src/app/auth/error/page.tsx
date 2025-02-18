import { type Metadata } from "next"

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
            <a
              href="/auth/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Return to sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
