import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    // Static assets (images, logos, etc.) should always be public
    const isStaticAsset = pathname.includes('.') || pathname.startsWith('/_next') || pathname === '/favicon.ico' || pathname === '/logo.svg';
    if (isStaticAsset) return NextResponse.next();

    // Paths that are specifically private and require authentication
    const privatePaths = ['/profile', '/orders', '/checkout', '/wishlist'];
    const isPrivatePath = privatePaths.some(path => pathname === path || pathname.startsWith(path + '/'));

    // If logged in, don't allow visiting auth pages (login/register)
    if (token && (pathname === '/login' || pathname === '/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect to login if a private path is accessed without a token
    if (!token && isPrivatePath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // All other paths (home, products, about, contact, etc.) are public
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)'],
};
