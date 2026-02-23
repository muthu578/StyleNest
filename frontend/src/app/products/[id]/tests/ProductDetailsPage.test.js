import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductDetailClient from '../ProductDetailClient';
import { getProductById } from '@/services/api';
import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';

jest.mock('@/services/api', () => ({
    getProductById: jest.fn(),
    getProducts: jest.fn(),
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

    beforeAll(() => {
        global.scrollTo = jest.fn();
    });

    beforeEach(() => {
        useParams.mockReturnValue({ id: '1' });
        useDispatch.mockReturnValue(mockDispatch);
        useSelector.mockReturnValue({ items: [] });
        const { getProducts } = require('@/services/api');
        getProducts.mockResolvedValue([]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state initially', () => {
        getProductById.mockReturnValue(new Promise(() => { })); // Never resolves
        render(<ProductDetailClient />);
        expect(screen.getByText(/Loading Your Style\.\.\./i)).toBeInTheDocument();
    });

    it('renders product details after loading', async () => {
        getProductById.mockResolvedValue(mockProduct);
        render(<ProductDetailClient />);

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: 'Premium Jacket', level: 1 })).toBeInTheDocument();
            expect(screen.getByText(/\$299/)).toBeInTheDocument();
            expect(screen.getAllByText('Trendora Luxury').length).toBeGreaterThan(0);
        });
    });

    it('renders piece not found state', async () => {
        getProductById.mockResolvedValue(null);
        render(<ProductDetailClient />);

        await waitFor(() => {
            expect(screen.getByText(/Product Not Found/i)).toBeInTheDocument();
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

        const { rerender } = render(<ProductDetailClient />);

        await waitFor(() => expect(screen.getByRole('heading', { name: 'Premium Jacket', level: 1 })).toBeInTheDocument());

        const heartButton = screen.getByText(/Wishlist/i);
        fireEvent.click(heartButton);

        expect(mockDispatch).toHaveBeenCalled();

        // Rerender with mocked isWishlisted true
        useSelector.mockReturnValue({ items: [mockProduct] });
        rerender(<ProductDetailClient />);

        await waitFor(() => {
            expect(screen.getByText(/Wishlisted/i)).toBeInTheDocument();
        });
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

        const reserveButton = screen.getByText(/Add to Bag/i);
        fireEvent.click(reserveButton);

        const { addToCart: addToCartAction } = require('@/store/slices/cartSlice');
        expect(mockDispatch).toHaveBeenCalled();
    });
});

describe('ProductPage Component', () => {
    const ProductPage = require('../page').default;

    it('renders ProductDetailClient inside Suspense', async () => {
        const params = Promise.resolve({ id: '1' });
        render(await ProductPage({ params }));
        // Looking for ProductDetailClient's content
        await waitFor(() => {
            expect(screen.getByText(/Loading Your Style\.\.\./i)).toBeInTheDocument();
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

        expect(metadata.title).toBe('Premium Jacket | Trendora');
    });

    it('returns fallback title when product not found', async () => {
        getProductById.mockResolvedValue(null);
        const params = Promise.resolve({ id: '999' });
        const metadata = await generateMetadata({ params });

        expect(metadata.title).toBe('Product Not Found | Trendora');
    });

    it('returns error fallback title on API error', async () => {
        getProductById.mockRejectedValue(new Error('API Error'));
        const params = Promise.resolve({ id: '1' });
        const metadata = await generateMetadata({ params });

        expect(metadata.title).toBe('Archive Piece | Trendora');
    });
});
