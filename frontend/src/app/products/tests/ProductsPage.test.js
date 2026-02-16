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
jest.mock('@/components/kids/KidsLandingPage', () => () => <div data-testid="kids-landing">Kids</div>);
jest.mock('@/components/beauty/BeautyLandingPage', () => () => <div data-testid="beauty-landing">Beauty</div>);
jest.mock('@/components/home_living/HomeLivingLandingPage', () => () => <div data-testid="home-landing">Home</div>);
jest.mock('@/components/product/ProductCard', () => () => <div data-testid="product-card">Card</div>);
jest.mock('@/components/product/FilterSidebar', () => () => <div data-testid="filter-sidebar">Filters</div>);

describe('ProductsPage', () => {
    it('renders landing page when category is women', async () => {
        useSearchParams.mockReturnValue({ get: () => 'women' });
        render(<ProductsPage />);
        expect(await screen.findByTestId('women-landing')).toBeInTheDocument();
    });

    it('renders landing page when category is men', async () => {
        useSearchParams.mockReturnValue({ get: () => 'men' });
        render(<ProductsPage />);
        expect(await screen.findByTestId('men-landing')).toBeInTheDocument();
    });

    it('renders landing page when category is kids', async () => {
        useSearchParams.mockReturnValue({ get: () => 'kids' });
        render(<ProductsPage />);
        expect(await screen.findByTestId('kids-landing')).toBeInTheDocument();
    });

    it('renders landing page when category is beauty', async () => {
        useSearchParams.mockReturnValue({ get: () => 'beauty' });
        render(<ProductsPage />);
        expect(await screen.findByTestId('beauty-landing')).toBeInTheDocument();
    });

    it('renders landing page when category is home', async () => {
        useSearchParams.mockReturnValue({ get: () => 'home' });
        render(<ProductsPage />);
        expect(await screen.findByTestId('home-landing')).toBeInTheDocument();
    });

    it('renders empty state when no products found', async () => {
        useSearchParams.mockReturnValue({ get: () => 'some-category' });
        getProducts.mockResolvedValue([]);
        render(<ProductsPage />);
        expect(await screen.findByText(/No products found/i)).toBeInTheDocument();
    });

    it('logs error when fetch fails', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        useSearchParams.mockReturnValue({ get: () => 'error' });
        getProducts.mockRejectedValue(new Error('Fetch failed'));
        render(<ProductsPage />);
        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith('Error fetching products:', expect.any(Error));
        });
        consoleSpy.mockRestore();
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

describe('ProductsPage generateMetadata', () => {
    const { generateMetadata } = require('../page');

    it('returns default metadata when no category is provided', async () => {
        const searchParams = Promise.resolve({});
        const metadata = await generateMetadata({ searchParams });
        expect(metadata.title).toBe("All Curated Collections");
    });

    it('returns correct metadata for men category', async () => {
        const searchParams = Promise.resolve({ category: 'men' });
        const metadata = await generateMetadata({ searchParams });
        expect(metadata.title).toBe("Men's Luxury Fashion Collection");
        expect(metadata.description).toContain('men');
    });

    it('returns fallback title for unknown category', async () => {
        const searchParams = Promise.resolve({ category: 'unknown' });
        const metadata = await generateMetadata({ searchParams });
        expect(metadata.title).toBe("Shop unknown");
    });
});
