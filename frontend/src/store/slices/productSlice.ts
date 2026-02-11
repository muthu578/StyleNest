import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '@/types';

const initialState: ProductState = {
    items: [],
    currentProduct: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSuccess: (state, action: PayloadAction<Product[]>) => {
            state.loading = false;
            state.items = action.payload;
        },
        fetchFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        setCurrentProduct: (state, action: PayloadAction<Product | null>) => {
            state.currentProduct = action.payload;
        },
    },
});

export const { fetchStart, fetchSuccess, fetchFailure, setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
