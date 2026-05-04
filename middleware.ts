import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, isLocale } from '@/lib/i18n/locales';

const PUBLIC_FILE = /\.(.*)$/;
const STUDIO_PREFIX = '/studio';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Studio, API routes, Next internals, and static files
  if (
    pathname.startsWith(STUDIO_PREFIX) ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // First path segment after / — if it's already a valid locale, pass through
  const firstSegment = pathname.split('/')[1];
  if (isLocale(firstSegment)) {
    return NextResponse.next();
  }

  // Otherwise, redirect to default locale, preserving the rest of the path
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
