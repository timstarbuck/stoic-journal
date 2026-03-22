'use client';

import { NeonAuthUIProvider, UserButton } from '@neondatabase/auth/react';
import { authClient } from '@/lib/auth/client';
import { ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <NeonAuthUIProvider
      authClient={authClient as any}
      redirectTo="/account/settings"
      emailOTP
    >
      <header className="flex justify-end items-center p-4 gap-4 h-16">
        <UserButton size="icon" />
      </header>
      {children}
    </NeonAuthUIProvider>
  );
}
