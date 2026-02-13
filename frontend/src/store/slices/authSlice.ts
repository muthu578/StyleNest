import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types';
import Cookies from 'js-cookie';

const initialState: AuthState = {
    user: null, // We'll load user from local storage if available in a more stable way later or just use the token check
    token: typeof window !== 'undefined' ? Cookies.get('accessToken') || null : null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            // Cookies are already set in api service but for redux consistency:
            if (typeof window !== 'undefined') {
                Cookies.set('accessToken', action.payload.accessToken, { expires: 1 / 96 });
                Cookies.set('refreshToken', action.payload.refreshToken, { expires: 7 });
            }
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
            if (typeof window !== 'undefined') {
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                localStorage.removeItem('user');
            }
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
