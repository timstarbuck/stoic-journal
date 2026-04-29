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
      <header className="flex justify-between items-center p-4 h-16">
        <Logo />
        <UserButton size="icon" />
      </header>
      {children}
    </NeonAuthUIProvider>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <a
        href="/"
        title="Stoic Journal Home"
        className="flex items-center gap-3"
      >
        <img
          src="/icon-48x48.png"
          alt="Stoic Journal icon"
          className="w-8 h-8"
        />
        <div className="leading-tight">
          <div className="font-serif text-gray-600 text-2xl">Stoic Journal</div>
        </div>
      </a>
    </div>
  );
}
