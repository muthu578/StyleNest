import { render, screen, waitFor } from '@testing-library/react';
import FeaturedSection from '../FeaturedSection';
import { getProducts } from '@/services/api';

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

jest.mock('@/services/api', () => ({
    getProducts: jest.fn(),
}));

jest.mock('@/components/product/ProductCard', () => {
    return function MockProductCard({ product }) {
        return <div data-testid="product-card">{product.title || product.name}</div>;
    };
});

describe('FeaturedSection Component', () => {
    it('renders featured header when products exist', async () => {
        getProducts.mockResolvedValue([
            { id: 1, title: 'Product 1', price: 100, images: ['test.jpg'], category: 'men' }
        ]);

        render(<FeaturedSection title="Test Title" />);

        await waitFor(() => {
            expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
            expect(screen.getByTestId('product-card')).toBeInTheDocument();
        });
    });
});
