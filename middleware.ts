import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';

// Protected routes that require authentication
const PROTECTED_ROUTES = [
  '/account',
  '/dashboard',
  '/evening',
  '/morning',
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip auth check for API routes - let them handle auth separately
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check if this is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute) {
    // Get session from Neon Auth
    const { data: session } = await auth.getSession();

    // If no session, redirect to sign-in
    if (!session?.user) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and images
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

