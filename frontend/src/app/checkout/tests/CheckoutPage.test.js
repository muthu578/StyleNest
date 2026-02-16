import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Checkout from '../page';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '@/services/api';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('@/services/api', () => ({
    createOrder: jest.fn(),
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

describe('Checkout Component', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        useDispatch.mockReturnValue(mockDispatch);
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    it('renders sign in prompt if user is not logged in', () => {
        useSelector.mockImplementation((selector) => selector({
            cart: { items: [{ id: 1 }], totalAmount: 10 },
            auth: { user: null }
        }));

        render(<Checkout />);
        expect(screen.getByText(/SECURE/i)).toBeInTheDocument();
        expect(screen.getByText(/CHECKOUT/i)).toBeInTheDocument();
        expect(screen.getByText(/Please sign in/i)).toBeInTheDocument();
    });

    it('renders checkout form if user is logged in', () => {
        useSelector.mockImplementation((selector) => selector({
            cart: { items: [{ id: 1, title: 'Test Item', price: 10, quantity: 1, thumbnail: '/test.jpg' }], totalAmount: 10 },
            auth: { user: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' } }
        }));

        render(<Checkout />);
        expect(screen.getByRole('heading', { name: /Shipping/i })).toBeInTheDocument();
        expect(screen.getAllByText(/Address/i).length).toBeGreaterThan(0);
        expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    it('handles order placement', async () => {
        useSelector.mockImplementation((selector) => selector({
            cart: { items: [{ id: 1, title: 'Item 1', price: 10, quantity: 1, thumbnail: '/test.jpg' }], totalAmount: 10 },
            auth: { user: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' } }
        }));

        createOrder.mockResolvedValue({});

        render(<Checkout />);
        const buyButton = screen.getByText(/COMPLETE PURCHASE/i);
        fireEvent.click(buyButton);

        expect(createOrder).toHaveBeenCalled();

        jest.advanceTimersByTime(2000);

        await waitFor(() => {
            expect(screen.getByRole('heading', { level: 1, name: /ORDER/i })).toHaveTextContent(/CONFIRMED/i);
        }, { timeout: 3000 });
    });
});
