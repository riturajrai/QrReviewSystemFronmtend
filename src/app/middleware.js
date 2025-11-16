// middleware.js (root of your project)
import { NextResponse } from 'next/server';

/**
 * Helper: Verify JWT using crypto.subtle (no external deps)
 * Assumes HS256 + base64url encoded
 */
async function verifyJwt(token) {
  const [headerB64, payloadB64, signatureB64] = token.split('.');

  if (!headerB64 || !payloadB64 || !signatureB64) throw new Error('Invalid token');

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');

  const encoder = new TextEncoder();
  const data = encoder.encode(`${headerB64}.${payloadB64}`);
  const keyData = encoder.encode(secret);

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const signature = Uint8Array.from(atob(signatureB64.padEnd((4 - (signatureB64.length % 4)) % 4, '='))
    .map(c => c.charCodeAt(0)));

  const valid = await crypto.subtle.verify('HMAC', key, signature, data);
  if (!valid) throw new Error('Invalid signature');

  const payload = JSON.parse(atob(payloadB64));
  const now = Math.floor(Date.now() / 1000);

  if (payload.exp && payload.exp < now) throw new Error('Token expired');

  return payload;
}

// Protected routes
const PROTECTED_PATHS = [
  '/dashboard',
  '/qr-generator',
  '/my-reviews',
  '/review-form',
  '/feedback',
  '/profile',
];

const PUBLIC_PATHS = ['/login', '/signup'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p));
  const isPublic = PUBLIC_PATHS.includes(pathname);
  const cookie = request.cookies.get('jwt')?.value;

  // 1. Protected route → must have valid JWT
  if (isProtected) {
    if (!cookie) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const payload = await verifyJwt(cookie);
      const response = NextResponse.next();
      response.headers.set('x-user-id', payload.sub || payload.id || '');
      response.headers.set('x-user-email', payload.email || '');
      return response;
    } catch (err) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('jwt');
      return response;
    }
  }

  // 2. Logged-in user trying to access login/signup → redirect to dashboard
  if (isPublic && cookie) {
    try {
      await verifyJwt(cookie);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch {
      // Invalid token → let them login again
    }
  }

  return NextResponse.next();
}

// Run middleware on all routes except static
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
};