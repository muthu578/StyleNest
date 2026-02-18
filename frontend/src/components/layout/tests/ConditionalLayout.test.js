import { render, screen } from '@testing-library/react';
import ConditionalLayout from '../ConditionalLayout';
import { usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ fill, priority, ...props }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />;
    },
}));

describe('ConditionalLayout Component', () => {
    beforeEach(() => {
        useSelector.mockImplementation((selector) => selector({
            cart: { totalQuantity: 0 },
            auth: { user: null },
            wishlist: { items: [] }
        }));
        useDispatch.mockReturnValue(jest.fn());
    });

    it('renders children', () => {
        usePathname.mockReturnValue('/');
        render(
            <ConditionalLayout>
                <div data-testid="child">Test Child</div>
            </ConditionalLayout>
        );
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });
});
