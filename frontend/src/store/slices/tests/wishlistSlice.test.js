import wishlistReducer, { toggleWishlist, removeFromWishlist } from '../wishlistSlice';

describe('wishlistSlice', () => {
    const initialState = {
        items: [],
    };

    const mockProduct = { id: 1, title: 'Test Product' };

    it('should add item if not in wishlist', () => {
        const actual = wishlistReducer(initialState, toggleWishlist(mockProduct));
        expect(actual.items.length).toBe(1);
        expect(actual.items[0].id).toBe(1);
    });

    it('should remove item if already in wishlist using toggle', () => {
        const stateWithItem = { items: [mockProduct] };
        const actual = wishlistReducer(stateWithItem, toggleWishlist(mockProduct));
        expect(actual.items.length).toBe(0);
    });

    it('should handle removeFromWishlist', () => {
        const stateWithItem = { items: [mockProduct] };
        const actual = wishlistReducer(stateWithItem, removeFromWishlist(1));
        expect(actual.items.length).toBe(0);
    });
});
