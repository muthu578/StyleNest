import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from '../cartSlice';

describe('cartSlice', () => {
    const initialState = {
        items: [],
        totalAmount: 0,
        totalQuantity: 0,
    };

    const mockProduct = {
        id: 1,
        title: 'Test Product',
        price: 100,
        thumbnail: 'test.jpg'
    };

    it('should handle initialState', () => {
        expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle addToCart', () => {
        const actual = cartReducer(initialState, addToCart(mockProduct));
        expect(actual.items.length).toBe(1);
        expect(actual.items[0].quantity).toBe(1);
        expect(actual.totalAmount).toBe(100);
        expect(actual.totalQuantity).toBe(1);
    });

    it('should increment quantity if same product added again', () => {
        const stateWithItem = {
            items: [{ ...mockProduct, quantity: 1 }],
            totalAmount: 100,
            totalQuantity: 1
        };
        const actual = cartReducer(stateWithItem, addToCart(mockProduct));
        expect(actual.items[0].quantity).toBe(2);
        expect(actual.totalAmount).toBe(200);
        expect(actual.totalQuantity).toBe(2);
    });

    it('should handle removeFromCart', () => {
        const stateWithItem = {
            items: [{ ...mockProduct, quantity: 2 }],
            totalAmount: 200,
            totalQuantity: 2
        };
        const actual = cartReducer(stateWithItem, removeFromCart(1));
        expect(actual.items.length).toBe(0);
        expect(actual.totalAmount).toBe(0);
        expect(actual.totalQuantity).toBe(0);
    });

    it('should handle updateQuantity', () => {
        const stateWithItem = {
            items: [{ ...mockProduct, quantity: 1 }],
            totalAmount: 100,
            totalQuantity: 1
        };
        const actual = cartReducer(stateWithItem, updateQuantity({ id: 1, quantity: 5 }));
        expect(actual.items[0].quantity).toBe(5);
        expect(actual.totalAmount).toBe(500);
        expect(actual.totalQuantity).toBe(5);
    });

    it('should handle clearCart', () => {
        const stateWithItems = {
            items: [{ ...mockProduct, quantity: 2 }],
            totalAmount: 200,
            totalQuantity: 2
        };
        const actual = cartReducer(stateWithItems, clearCart());
        expect(actual.items.length).toBe(0);
        expect(actual.totalAmount).toBe(0);
        expect(actual.totalQuantity).toBe(0);
    });
});
