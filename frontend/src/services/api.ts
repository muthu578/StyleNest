import axios from 'axios';
import { Product, User } from '@/types';

const API_URL = 'http://127.0.0.1:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

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
    const response = await api.post<User & { token: string }>('/auth/login', credentials);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get<User>('/auth/me');
    return response.data;
};

export default api;
