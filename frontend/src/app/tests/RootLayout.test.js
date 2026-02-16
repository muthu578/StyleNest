import { render, screen } from '@testing-library/react';
import RootLayout from '../layout';

// Mock fonts
jest.mock('next/font/google', () => ({
    Geist: () => ({ variable: 'geist-sans' }),
    Geist_Mono: () => ({ variable: 'geist-mono' }),
}));

// Mock Providers and Components
jest.mock('@/store/Provider', () => ({
    Providers: ({ children }) => <div data-testid="providers">{children}</div>,
}));

jest.mock('@/components/auth/AuthInit', () => ({
    __esModule: true,
    default: ({ children }) => <div data-testid="auth-init">{children}</div>,
}));

jest.mock('@/components/layout/ConditionalLayout', () => ({
    __esModule: true,
    default: ({ children }) => <div data-testid="conditional-layout">{children}</div>,
}));

describe('RootLayout', () => {
    it('renders children within providers and layout', () => {
        render(
            <RootLayout>
                <div data-testid="test-child">Child Content</div>
            </RootLayout>
        );

        expect(screen.getByTestId('providers')).toBeInTheDocument();
        expect(screen.getByTestId('auth-init')).toBeInTheDocument();
        expect(screen.getByTestId('conditional-layout')).toBeInTheDocument();
        expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });
});
