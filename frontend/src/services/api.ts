import axios from 'axios';
import Cookies from 'js-cookie';
import { Product, User } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add access token to requests
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Interceptor to handle expired tokens and refresh them
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = Cookies.get('refreshToken');

            if (refreshToken) {
                try {
                    const res = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
                    const { accessToken } = res.data;

                    Cookies.set('accessToken', accessToken, { expires: 1 / 96 }); // 15 mins approx
                    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                    return api(originalRequest);
                } catch (refreshError) {
                    // Refresh token expired or invalid - logout
                    logout();
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export const getProducts = async (category?: string) => {
    const params = category ? { category } : {};
    const response = await api.get<{ products: Product[] }>('/products', { params });
    return response.data.products;
};

export const getProductById = async (id: number) => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
};

export const login = async (credentials: { username: string; password: string }) => {
    const response = await api.post<User & { accessToken: string; refreshToken: string }>('/auth/login', credentials);
    const { accessToken, refreshToken, ...user } = response.data;

    if (typeof window !== 'undefined') {
        Cookies.set('accessToken', accessToken, { expires: 1 / 96 }); // 15 mins
        Cookies.set('refreshToken', refreshToken, { expires: 7 }); // 7 days
        localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
};

export const register = async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post<User & { accessToken: string; refreshToken: string }>('/auth/register', userData);
    const { accessToken, refreshToken, ...user } = response.data;

    if (typeof window !== 'undefined') {
        Cookies.set('accessToken', accessToken, { expires: 1 / 96 });
        Cookies.set('refreshToken', refreshToken, { expires: 7 });
        localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        localStorage.removeItem('user');
    }
};

export const updateProfile = async (userData: Partial<User> & { mobile?: string; gender?: string }) => {
    const response = await api.put<User>('/auth/profile', userData);
    const user = response.data;
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
};

export const getCurrentUser = async () => {
    const response = await api.get<User>('/auth/me');
    return response.data;
};

export const getOrders = async () => {
    const response = await api.get<any[]>('/orders');
    return response.data;
};

export const createOrder = async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
};

export default api;
