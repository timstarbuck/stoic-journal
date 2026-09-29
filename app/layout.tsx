import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AuthProvider } from './providers';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  applicationName: 'Stoic Journal',
  title: {
    default: 'Stoic Journal | Daily Stoic Reflection',
    template: '%s | Stoic Journal',
  },
  description:
    'Build a daily journaling practice with morning and evening reflections guided by Stoic wisdom from Marcus Aurelius, Seneca, and Epictetus.',
  keywords: [
    'Stoic journal',
    'Stoicism',
    'daily reflection',
    'morning journal',
    'evening journal',
    'Marcus Aurelius',
    'Seneca',
    'Epictetus',
    'self-reflection',
  ],
  authors: [{ name: 'Tim Starbuck' }],
  creator: 'Tim Starbuck',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Stoic Journal',
    title: 'Stoic Journal | Daily Stoic Reflection',
    description:
      'Build a daily journaling practice with morning and evening reflections guided by timeless Stoic wisdom.',
  },
  twitter: {
    card: 'summary',
    title: 'Stoic Journal | Daily Stoic Reflection',
    description:
      'Build a daily journaling practice with morning and evening reflections guided by timeless Stoic wisdom.',
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  icons: {
    icon: [
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon-180x180.png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
