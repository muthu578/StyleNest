import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../page';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '@/store/slices/cartSlice';

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

describe('CartPage', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        useDispatch.mockReturnValue(mockDispatch);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders empty cart message when items is empty', () => {
        useSelector.mockReturnValue({ items: [], totalAmount: 0, totalQuantity: 0 });
        render(<CartPage />);
        expect(screen.getByText(/YOUR BAG IS/i)).toBeInTheDocument();
        expect(screen.getByText(/EMPTY/i)).toBeInTheDocument();
    });

    it('renders cart items and summary', () => {
        const mockItems = [
            { id: 1, title: 'Item 1', price: 10, quantity: 2, thumbnail: '/test.jpg', brand: 'Brand' }
        ];
        useSelector.mockReturnValue({ items: mockItems, totalAmount: 20, totalQuantity: 2 });

        render(<CartPage />);
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getAllByText('$20.00').length).toBeGreaterThan(0);
    });

    it('dispatches updateQuantity when clicking plus/minus', () => {
        const mockItems = [
            { id: 1, title: 'Item 1', price: 10, quantity: 2, thumbnail: '/test.jpg', brand: 'Brand' }
        ];
        useSelector.mockReturnValue({ items: mockItems, totalAmount: 20, totalQuantity: 2 });

        render(<CartPage />);

        // Get buttons. In the item card: index 0: minus, 1: plus, 2: remove
        const buttons = screen.getAllByRole('button');

        // Plus button (index 1)
        fireEvent.click(buttons[1]);
        expect(mockDispatch).toHaveBeenCalledWith(updateQuantity({ id: 1, quantity: 3 }));

        // Minus button (index 0)
        fireEvent.click(buttons[0]);
        expect(mockDispatch).toHaveBeenCalledWith(updateQuantity({ id: 1, quantity: 1 }));
    });

    it('dispatches removeFromCart when clicking remove', () => {
        const mockItems = [
            { id: 1, title: 'Item 1', price: 10, quantity: 2, thumbnail: '/test.jpg', brand: 'Brand' }
        ];
        useSelector.mockReturnValue({ items: mockItems, totalAmount: 20, totalQuantity: 2 });

        render(<CartPage />);

        const removeButton = screen.getByText(/Remove Item/i);
        fireEvent.click(removeButton);
        expect(mockDispatch).toHaveBeenCalledWith(removeFromCart(1));
    });
});
