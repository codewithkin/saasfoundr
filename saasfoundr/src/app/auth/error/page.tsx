import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication Error",
}

export default function AuthError({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const error = searchParams?.error

  const errors = {
    Configuration: {
      title: "Configuration Error",
      message: "There is a problem with the server configuration. Check if all environment variables are properly set.",
    },
    AccessDenied: {
      title: "Access Denied",
      message: "You do not have permission to sign in. Please contact support if you think this is a mistake.",
    },
    Verification: {
      title: "Unable to Verify",
      message: "The sign in link is no longer valid. It may have been used already or it may have expired.",
    },
    Default: {
      title: "Authentication Error",
      message: "An error occurred during authentication. Please try again.",
    },
  }

  const { title, message } = errors[error as keyof typeof errors] ?? errors.Default

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {message}
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
