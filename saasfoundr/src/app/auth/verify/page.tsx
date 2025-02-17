import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Verify Email",
}

export default function VerifyRequest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-green-600 text-center text-3xl font-extrabold">
            Hooray ! You're done
          </h2>
          <div className="mt-4">
            <p className="text-center text-sm text-gray-600">
              A sign in link has been sent to your email address.
            </p>
            <p className="text-center text-sm text-gray-600 mt-2">
              Please check your email (including spam folder) and click the link to continue.
            </p>
          </div>
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
