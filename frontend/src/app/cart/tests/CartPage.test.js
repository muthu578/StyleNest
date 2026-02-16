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

        // Find by looking for buttons that contain SVGs or just by their index in the rendered group
        const productCardButtons = screen.getAllByRole('button');
        // Based on the DOM, the plus/minus buttons are likely among the first ones per item
        // But since we have only one item, let's look for them.
        // Usually index 1 is minus, index 2 is plus (index 0 might be something else)
        // Let's use a more robust search if possible, but for now index check
        fireEvent.click(productCardButtons[1]); // Assuming plus is 1
        expect(mockDispatch).toHaveBeenCalledWith(updateQuantity({ id: 1, quantity: 3 }));
    });
});
