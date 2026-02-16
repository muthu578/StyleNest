import { render, screen, waitFor } from '@testing-library/react';
import OrdersPage from '../page';
import { getOrders } from '@/services/api';

jest.mock('@/services/api', () => ({
    getOrders: jest.fn(),
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

describe('OrdersPage', () => {
    it('renders empty state when no orders found', async () => {
        getOrders.mockResolvedValue([]);
        render(<OrdersPage />);

        await waitFor(() => {
            expect(screen.getByText(/No orders yet/i)).toBeInTheDocument();
        });
    });

    it('renders orders list', async () => {
        const mockOrders = [
            {
                id: '1',
                createdAt: new Date().toISOString(),
                totalAmount: 99.99,
                status: 'Delivered',
                items: [{ id: 101, title: 'Item 1', price: 99.99, quantity: 1, thumbnail: '/item.jpg' }],
                shippingAddress: { name: 'John Doe', email: 'john@example.com' }
            }
        ];
        getOrders.mockResolvedValue(mockOrders);
        render(<OrdersPage />);

        await waitFor(() => {
            expect(screen.getByText('Item 1')).toBeInTheDocument();
            expect(screen.getAllByText('$99.99').length).toBeGreaterThan(0);
            expect(screen.getByText('Delivered')).toBeInTheDocument();
        });
    });
});
