import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Dummy middleware
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/orders', request.url));
  }
  // You can access cookies or headers here
  // const token = request.cookies.get('token')?.value;

  // Dummy check — you can replace this with real logic
  // if (!token) {
  // Redirect to login if no token found
  // return NextResponse.redirect(new URL('/login', request.url));
  // }

  // Continue to requested page if token exists
  return NextResponse.next();
}

// Match all routes except the specified ones
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
