import * as React from 'react';
import {
  Html,
  Body,
  Container,
  Tailwind,
  Text,
  Link,
  Preview,
} from '@react-email/components';

interface SignInEmailProps {
  url: string;
}

export default function SignInEmail({ url }: SignInEmailProps) {
  return (
    <Html>
      <Preview>Sign in to SaaSFoundr</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-8 px-4">
            <Text className="text-2xl font-bold text-blue-600 mb-4">
              Welcome to SaaSFoundr
            </Text>
            <Text className="text-gray-600 mb-4">
              Click the button below to sign in to your account. This link will expire in 24 hours.
            </Text>
            <Link
              href={url}
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md text-center hover:bg-blue-700 transition-colors"
            >
              Sign in to SaaSFoundr
            </Link>
            <Text className="text-sm text-gray-500 mt-6">
              If you didn't request this email, you can safely ignore it.
            </Text>
            <Text className="text-sm text-gray-400 mt-4">
              Powered by SaaSFoundr
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
