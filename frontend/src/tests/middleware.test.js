import { middleware } from '../middleware';
import { NextRequest, NextResponse } from 'next/server';

jest.mock('next/server', () => ({
    NextResponse: {
        next: jest.fn(),
        redirect: jest.fn(),
    },
}));

describe('Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('allows static assets of type .svg', () => {
        const mockRequest = {
            cookies: { get: () => null },
            nextUrl: { pathname: '/logo.svg' },
            url: 'http://localhost/logo.svg',
        };
        middleware(mockRequest);
        expect(NextResponse.next).toHaveBeenCalled();
    });

    it('redirects to login if accessing private path without token', () => {
        const mockRequest = {
            cookies: { get: () => null },
            nextUrl: { pathname: '/profile' },
            url: 'http://localhost/profile',
        };
        middleware(mockRequest);
        expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/login', 'http://localhost/profile'));
    });

    it('redirects to home if accessing login with token', () => {
        const mockRequest = {
            cookies: { get: () => ({ value: 'token' }) },
            nextUrl: { pathname: '/login' },
            url: 'http://localhost/login',
        };
        middleware(mockRequest);
        expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/', 'http://localhost/login'));
    });

    it('allows public paths without token', () => {
        const mockRequest = {
            cookies: { get: () => null },
            nextUrl: { pathname: '/products' },
            url: 'http://localhost/products',
        };
        middleware(mockRequest);
        expect(NextResponse.next).toHaveBeenCalled();
    });
});
