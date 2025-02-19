'use client';

import { NextUIProvider } from '@nextui-org/react';
import { useTheme } from 'next-themes';

export function NextUIClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}
