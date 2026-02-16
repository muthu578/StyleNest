import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductPage from '../page';
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

describe('ProductDetailsPage', () => {
    const mockDispatch = jest.fn();
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
        render(<ProductPage />);
        expect(screen.getByText(/Revealing Excellence/i)).toBeInTheDocument();
    });

    it('renders product details after loading', async () => {
        getProductById.mockResolvedValue(mockProduct);
        render(<ProductPage />);

        await waitFor(() => {
            expect(screen.getByRole('heading', { name: 'Premium Jacket' })).toBeInTheDocument();
            expect(screen.getByText('$299')).toBeInTheDocument();
            expect(screen.getByText('Trendora Luxury')).toBeInTheDocument();
        });
    });

    it('dispatches addToCart when clicking reserve button', async () => {
        getProductById.mockResolvedValue(mockProduct);
        render(<ProductPage />);

        await waitFor(() => expect(screen.getByRole('heading', { name: 'Premium Jacket' })).toBeInTheDocument());

        fireEvent.click(screen.getByText(/RESERVE FOR SHIPMENT/i));
        expect(mockDispatch).toHaveBeenCalledWith(addToCart(mockProduct));
    });
});
