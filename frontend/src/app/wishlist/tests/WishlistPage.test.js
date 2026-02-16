import { render, screen } from '@testing-library/react';
import WishlistPage from '../page';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

jest.mock('@/components/product/ProductCard', () => () => <div data-testid="product-card">Card</div>);

jest.mock('next/link', () => {
    return ({ children, href }) => {
        return <a href={href}>{children}</a>;
    };
});

describe('WishlistPage', () => {
    it('renders empty wishlist message', () => {
        useSelector.mockReturnValue({ items: [] });
        render(<WishlistPage />);
        expect(screen.getByText(/is empty/i)).toBeInTheDocument();
        expect(screen.getByText(/Your personal collection/i)).toBeInTheDocument();
    });

    it('renders wishlist items', () => {
        const mockItems = [{ id: 1, title: 'Item 1' }];
        useSelector.mockReturnValue({ items: mockItems });
        render(<WishlistPage />);
        expect(screen.getByText(/My/i)).toBeInTheDocument();
        expect(screen.getByText(/Wishlist/i)).toBeInTheDocument();
        expect(screen.getByTestId('product-card')).toBeInTheDocument();
    });
});
