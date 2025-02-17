import * as React from 'react';
import {
  Html,
  Body,
  Container,
  Tailwind,
  Text,
  Link,
  Preview,
  Hr,
  Section,
} from '@react-email/components';

interface SignInEmailProps {
  url: string;
}

export default function SignInEmail({ url }: SignInEmailProps) {
  return (
    <Html>
      <Preview>🚀 Your magic link is ready - Let's get you back in!</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-8 px-4 max-w-[600px]">
            <Section className="text-center mb-8">
              <Text className="text-3xl font-bold text-blue-600 mb-2">
                🎉 Welcome Back!
              </Text>
              <Text className="text-xl text-gray-700">
                We've missed you at SaaSFoundr
              </Text>
            </Section>

            <Section className="bg-gray-50 rounded-lg p-6 mb-6">
              <Text className="text-gray-700 mb-4">
                Great to see you again! We've prepared your magic link - it's like a VIP pass to your account. ✨
              </Text>
              <Text className="text-gray-700 mb-6">
                Just click the button below, and we'll get you right back to where you left off.
              </Text>
              
              <Link
                href={url}
                className="inline-block w-full px-6 py-4 bg-blue-600 text-white font-bold rounded-md text-center hover:bg-blue-700 transition-colors text-lg"
              >
                🚪 Open Sesame!
              </Link>
              
              <Text className="text-sm text-gray-600 mt-4 text-center">
                This magic link will expire in 24 hours, so don't wait too long! ⏳
              </Text>
            </Section>

            <Hr className="border-gray-200 my-6" />
            
            <Section className="text-center">
              <Text className="text-sm text-gray-500 mb-4">
                🔒 For your security: If you didn't request this magic link, feel free to ignore this email. Your account is safe and sound!
              </Text>
              <Text className="text-sm text-gray-400">
                Powered by ⚡ SaaSFoundr - Where Innovation Meets Simplicity
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
