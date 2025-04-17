import { URL_ROUTES } from 'constants/urls.routes';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL(URL_ROUTES.orders, request.url));
  }
  return NextResponse.next();
}

// Match all routes except the specified ones
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
