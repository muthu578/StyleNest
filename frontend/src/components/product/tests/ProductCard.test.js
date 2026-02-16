import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ priority, fill, ...props }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />;
    },
}));

jest.mock('next/link', () => {
    const MockLink = ({ children, href }) => <a href={href}>{children}</a>;
    MockLink.displayName = 'MockLink';
    return MockLink;
});

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('@/store/slices/cartSlice', () => ({
    addToCart: jest.fn(product => ({ type: 'cart/addToCart', payload: product })),
}));

jest.mock('@/store/slices/wishlistSlice', () => ({
    toggleWishlist: jest.fn(product => ({ type: 'wishlist/toggleWishlist', payload: product })),
}));

describe('ProductCard Component', () => {
    const mockDispatch = jest.fn();

    const mockProduct = {
        id: 1,
        title: 'Test Product',
        price: 99.99,
        thumbnail: 'test.jpg',
        category: 'men',
        brand: 'Test Brand',
        discountPercentage: 10
    };

    beforeEach(() => {
        useDispatch.mockReturnValue(mockDispatch);
        useSelector.mockImplementation((selector) => selector({
            wishlist: { items: [] }
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders product information', () => {
        render(<ProductCard product={mockProduct} />);
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$99.99')).toBeInTheDocument();
        expect(screen.getByText(/Test Brand/i)).toBeInTheDocument();
        expect(screen.getByText(/Save/i)).toBeInTheDocument();
        expect(screen.getByText(/10%/i)).toBeInTheDocument();
    });

    it('dispatches addToCart when clicking ADD TO BAG', () => {
        render(<ProductCard product={mockProduct} />);
        const addButton = screen.getByLabelText(/Add Test Product to bag/i);
        fireEvent.click(addButton);
        expect(mockDispatch).toHaveBeenCalledWith(addToCart(mockProduct));
    });

    it('dispatches toggleWishlist when clicking Heart button', () => {
        render(<ProductCard product={mockProduct} />);
        const wishlistButton = screen.getByLabelText(/Add Test Product to wishlist/i);
        fireEvent.click(wishlistButton);
        expect(mockDispatch).toHaveBeenCalledWith(toggleWishlist(mockProduct));
    });

    it('renders correctly when product is in wishlist', () => {
        useSelector.mockImplementation((selector) => selector({
            wishlist: { items: [mockProduct] }
        }));
        render(<ProductCard product={mockProduct} />);
        const wishlistButton = screen.getByLabelText(/Remove Test Product from wishlist/i);
        expect(wishlistButton).toBeInTheDocument();
        expect(wishlistButton.querySelector('svg')).toHaveClass('fill-current');
    });

    it('renders without discount badge when discount is 0', () => {
        const productNoDiscount = { ...mockProduct, discountPercentage: 0 };
        render(<ProductCard product={productNoDiscount} />);
        expect(screen.queryByText(/Save/i)).not.toBeInTheDocument();
    });
});
