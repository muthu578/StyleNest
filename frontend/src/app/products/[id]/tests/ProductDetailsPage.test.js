import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductDetailClient from '../ProductDetailClient';
import { getProductById } from '@/services/api';
import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';

jest.mock('@/services/api', () => ({
    getProductById: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useParams: jest.fn(),
}));

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('next/link', () => {
    return ({ children, href }) => {
        return <a href={href}>{children}</a>;
    };
});

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ fill, priority, ...props }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />;
    },
}));

const mockProduct = {
    id: 1,
    title: 'Premium Jacket',
    price: 299,
    description: 'Elite quality jacket',
    category: 'men',
    brand: 'Trendora Luxury',
    thumbnail: '/jacket.jpg',
    images: ['/jacket1.jpg', '/jacket2.jpg'],
    rating: 4.8,
    discountPercentage: 10
};

describe('ProductDetailsPage', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        useParams.mockReturnValue({ id: '1' });
        useDispatch.mockReturnValue(mockDispatch);
        useSelector.mockReturnValue({ items: [] });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state initially', () => {
        getProductById.mockReturnValue(new Promise(() => { })); // Never resolves
        render(<ProductDetailClient />);
        expect(screen.getByText(/Revealing Excellence/i)).toBeInTheDocument();
    });

    it('renders product details after loading', async () => {
        getProductById.mockResolvedValue(mockProduct);
        render(<ProductDetailClient />);

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: 'Premium Jacket', level: 1 })).toBeInTheDocument();
            expect(screen.getByText('$299')).toBeInTheDocument();
            expect(screen.getByText('Trendora Luxury')).toBeInTheDocument();
        });
    });

    it('renders piece not found state', async () => {
        getProductById.mockResolvedValue(null);
        render(<ProductDetailClient />);

        await waitFor(() => {
            expect(screen.getByText(/Piece Not Found/i)).toBeInTheDocument();
        });
    });

    it('handles image selection', async () => {
        getProductById.mockResolvedValue(mockProduct);
        render(<ProductDetailClient />);

        await waitFor(() => expect(screen.getByRole('heading', { name: 'Premium Jacket', level: 1 })).toBeInTheDocument());

        const secondaryImage = screen.getByAltText('Premium Jacket 1');
        fireEvent.click(secondaryImage.parentElement);
    });

    it('dispatches toggleWishlist when clicking heart button and handles state change', async () => {
        getProductById.mockResolvedValue(mockProduct);
        // Mock isWishlisted logic: first call items is empty, second call it has the product
        useSelector.mockReturnValueOnce({ items: [] })
            .mockReturnValueOnce({ items: [mockProduct] });

        const { rerender } = render(<ProductDetailClient />);

        await waitFor(() => expect(screen.getByRole('heading', { name: 'Premium Jacket', level: 1 })).toBeInTheDocument());

        const heartButton = screen.getByLabelText(/Add to Wishlist/i);
        fireEvent.click(heartButton);

        const { toggleWishlist: toggleWishlistAction } = require('@/store/slices/wishlistSlice');
        expect(mockDispatch).toHaveBeenCalledWith(toggleWishlistAction(mockProduct));

        // Rerender to simulate state update from Redux
        rerender(<ProductDetailClient />);
        expect(screen.getByLabelText(/Remove from Wishlist/i)).toBeInTheDocument();
    });

    it('covers tab switching and virtual fitting room', async () => {
        getProductById.mockResolvedValue(mockProduct);
        render(<ProductDetailClient />);

        await waitFor(() => expect(screen.getByRole('heading', { name: 'Premium Jacket', level: 1 })).toBeInTheDocument());

        // Click Details tab
        fireEvent.click(screen.getByText('details'));
        expect(screen.getByText('Luxury Blend')).toBeInTheDocument();

        // Click Shipping tab
        fireEvent.click(screen.getByText('shipping'));
        expect(screen.getByText(/Complimentary global shipping/i)).toBeInTheDocument();

        // Click Virtual Fitting Room
        fireEvent.click(screen.getByText(/Virtual Fitting Room/i));
    });

    it('logs error when fetch fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        getProductById.mockRejectedValue(new Error('Fetch failed'));
        render(<ProductDetailClient />);

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Error fetching product:', expect.any(Error));
        });
        consoleSpy.mockRestore();
    });

    it('dispatches addToCart when clicking reserve button', async () => {
        getProductById.mockResolvedValue(mockProduct);
        render(<ProductDetailClient />);

        await waitFor(() => expect(screen.getByRole('heading', { name: 'Premium Jacket', level: 1 })).toBeInTheDocument());

        const reserveButton = screen.getByLabelText(/Add to Bag/i);
        fireEvent.click(reserveButton);

        expect(mockDispatch).toHaveBeenCalledWith(addToCart(mockProduct));
    });
});

describe('ProductPage Component', () => {
    const ProductPage = require('../page').default;

    it('renders ProductDetailClient inside Suspense', async () => {
        const params = Promise.resolve({ id: '1' });
        render(await ProductPage({ params }));
        // Looking for ProductDetailClient's content
        await waitFor(() => {
            // Since it renders client side fetching, it'll show loading state or similar
            // But we just need to ensure the component is called.
            // We can check for the "Revealing Excellence" text
            expect(screen.getByText(/Revealing Excellence/i)).toBeInTheDocument();
        });
    });
});

describe('Product Details Metadata', () => {
    const { generateMetadata } = require('../page');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('generates correct metadata for a product', async () => {
        getProductById.mockResolvedValue(mockProduct);
        const params = Promise.resolve({ id: '1' });
        const metadata = await generateMetadata({ params });

        expect(metadata.title).toBe('Premium Jacket');
        expect(metadata.openGraph.title).toBe('Premium Jacket | Trendora');
    });

    it('returns fallback title when product not found', async () => {
        getProductById.mockResolvedValue(null);
        const params = Promise.resolve({ id: '999' });
        const metadata = await generateMetadata({ params });

        expect(metadata.title).toBe('Product Not Found');
    });

    it('returns error fallback title on API error', async () => {
        getProductById.mockRejectedValue(new Error('API Error'));
        const params = Promise.resolve({ id: '1' });
        const metadata = await generateMetadata({ params });

        expect(metadata.title).toBe('Trendora Piece');
    });
});
