import productReducer, { fetchStart, fetchSuccess, fetchFailure, setCurrentProduct } from '../productSlice';

describe('productSlice', () => {
    const initialState = {
        items: [],
        currentProduct: null,
        loading: false,
        error: null,
    };

    it('should handle fetchStart', () => {
        const actual = productReducer(initialState, fetchStart());
        expect(actual.loading).toBe(true);
        expect(actual.error).toBeNull();
    });

    it('should handle fetchSuccess', () => {
        const products = [{ id: 1, title: 'Test Product' }];
        const actual = productReducer(initialState, fetchSuccess(products));
        expect(actual.items).toEqual(products);
        expect(actual.loading).toBe(false);
    });

    it('should handle fetchFailure', () => {
        const error = 'Failed to fetch';
        const actual = productReducer(initialState, fetchFailure(error));
        expect(actual.error).toBe(error);
        expect(actual.loading).toBe(false);
    });

    it('should handle setCurrentProduct', () => {
        const product = { id: 1, title: 'Test Product' };
        const actual = productReducer(initialState, setCurrentProduct(product));
        expect(actual.currentProduct).toEqual(product);
    });
});
