// src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|public/|favicon.ico|sw.js).*)'],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host');

  // Use localhost:3000 as the root domain for local development
  const rootDomain = 'localhost:3000'; 
  if (hostname === rootDomain || hostname?.startsWith(`www.${rootDomain}`)) {
      // This is a request to the main site, let it pass.
      return NextResponse.next();
  }

  if (hostname) {
    // It's a subdomain. Rewrite the URL to a dynamic route.
    const subdomain = hostname.split('.')[0];
    url.pathname = `/store/<span class="math-inline">\{subdomain\}</span>{url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}