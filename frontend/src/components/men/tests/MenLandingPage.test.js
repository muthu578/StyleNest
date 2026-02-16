import { render, screen, waitFor } from '@testing-library/react';
import MenLandingPage from '../MenLandingPage';
import { getProducts } from '@/services/api';

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ priority, fill, ...props }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />;
    },
}));

jest.mock('next/link', () => ({
    __esModule: true,
    default: ({ children, href }) => <a href={href}>{children}</a>,
}));

jest.mock('@/services/api', () => ({
    getProducts: jest.fn(),
}));

jest.mock('@/components/product/ProductCard', () => {
    return function MockProductCard({ product }) {
        return <div data-testid="product-card">{product.title || product.name}</div>;
    };
});

describe('MenLandingPage', () => {
    it('renders landing page content', async () => {
        getProducts.mockResolvedValue([
            { id: 1, name: 'Men Product', category: 'men', price: 10, images: [] }
        ]);
        render(<MenLandingPage />);
        expect(screen.getByText(/Urban/i)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('Men Product')).toBeInTheDocument();
        });
    });
});
