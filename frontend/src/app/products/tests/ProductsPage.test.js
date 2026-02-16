import { render, screen, waitFor } from '@testing-library/react';
import ProductsPage from '../page';
import { getProducts } from '@/services/api';
import { useSearchParams } from 'next/navigation';

jest.mock('@/services/api', () => ({
    getProducts: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
}));

// Mock landing pages to avoid deep rendering issues
jest.mock('@/components/women/WomenLandingPage', () => () => <div data-testid="women-landing">Women</div>);
jest.mock('@/components/men/MenLandingPage', () => () => <div data-testid="men-landing">Men</div>);
jest.mock('@/components/product/ProductCard', () => () => <div data-testid="product-card">Card</div>);
jest.mock('@/components/product/FilterSidebar', () => () => <div data-testid="filter-sidebar">Filters</div>);

describe('ProductsPage', () => {
    it('renders landing page when category is women', async () => {
        useSearchParams.mockReturnValue({ get: () => 'women' });
        render(<ProductsPage />);
        expect(await screen.findByTestId('women-landing')).toBeInTheDocument();
    });

    it('renders product list for other categories', async () => {
        useSearchParams.mockReturnValue({ get: () => null });
        getProducts.mockResolvedValue([
            { id: 1, title: 'Item 1', price: 10, thumbnail: '/test.jpg' }
        ]);

        render(<ProductsPage />);

        await waitFor(() => {
            expect(screen.getByText(/All Products/i)).toBeInTheDocument();
            expect(screen.getByTestId('product-card')).toBeInTheDocument();
        });
    });
});
