import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    // Paths that are always accessible
    const publicPaths = ['/login', '/register', '/api'];
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    // Static assets (images, logos, etc.) should be public
    const isStaticAsset = pathname.includes('.') || pathname.startsWith('/_next');

    if (!token && !isPublicPath && !isStaticAsset) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If logged in, don't allow visiting login/register
    if (token && (pathname === '/login' || pathname === '/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)'],
};
