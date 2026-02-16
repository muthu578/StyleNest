import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ priority, fill, ...props }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />;
    },
}));

jest.mock('next/link', () => {
    return ({ children, href }) => {
        return <a href={href}>{children}</a>;
    };
});

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

describe('ProductCard Component', () => {
    beforeEach(() => {
        useDispatch.mockReturnValue(jest.fn());
        useSelector.mockImplementation((selector) => selector({
            wishlist: { items: [] }
        }));
    });

    const mockProduct = {
        id: 1,
        title: 'Test Product',
        price: 99.99,
        thumbnail: 'test.jpg',
        category: 'men',
        brand: 'Test Brand',
        discountPercentage: 0
    };

    it('renders product information', () => {
        render(<ProductCard product={mockProduct} />);
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$99.99')).toBeInTheDocument();
    });
});
