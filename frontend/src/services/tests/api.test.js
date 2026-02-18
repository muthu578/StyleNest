import axios from 'axios';
import Cookies from 'js-cookie';

// Mock setup before importing api
const mockApi = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
    },
    defaults: { headers: { common: {} } }
};

jest.mock('axios', () => ({
    create: jest.fn(() => mockApi),
    post: jest.fn(),
}));
jest.mock('js-cookie');

const { getProducts, getProductById, login, register, logout } = require('../api');

describe('API Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Mock localStorage properly
        const mockStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
        };
        Object.defineProperty(window, 'localStorage', {
            value: mockStorage,
            writable: true
        });
    });

    it('getProducts fetches products', async () => {
        const mockProducts = [{ id: 1, title: 'Test Product' }];
        mockApi.get.mockResolvedValue({ data: { products: mockProducts } });

        const products = await getProducts('men');
        expect(mockApi.get).toHaveBeenCalledWith('/products', { params: { category: 'men' } });
        expect(products).toEqual(mockProducts);
    });

    it('getProductById fetches a single product', async () => {
        const mockProduct = { id: 1, title: 'Test Product' };
        mockApi.get.mockResolvedValue({ data: mockProduct });

        const product = await getProductById(1);
        expect(mockApi.get).toHaveBeenCalledWith('/products/1');
        expect(product).toEqual(mockProduct);
    });

    it('login calls auth/login and sets cookies', async () => {
        const mockUser = { username: 'testuser', accessToken: 'access', refreshToken: 'refresh' };
        mockApi.post.mockResolvedValue({ data: mockUser });

        const credentials = { username: 'testuser', password: 'password' };
        const result = await login(credentials);

        expect(mockApi.post).toHaveBeenCalledWith('/auth/login', credentials);
        expect(Cookies.set).toHaveBeenCalledWith('accessToken', 'access', expect.any(Object));
        expect(Cookies.set).toHaveBeenCalledWith('refreshToken', 'refresh', expect.any(Object));
        expect(localStorage.setItem).toHaveBeenCalled();
        expect(result).toEqual(mockUser);
    });

    it('register calls auth/register', async () => {
        const mockUser = { username: 'testuser', accessToken: 'access', refreshToken: 'refresh' };
        mockApi.post.mockResolvedValue({ data: mockUser });

        const userData = { username: 'testuser', email: 'test@example.com', password: 'password' };
        const result = await register(userData);

        expect(mockApi.post).toHaveBeenCalledWith('/auth/register', userData);
        expect(Cookies.set).toHaveBeenCalled();
        expect(result).toEqual(mockUser);
    });

    it('logout clears cookies and localStorage', () => {
        logout();
        expect(Cookies.remove).toHaveBeenCalledWith('accessToken');
        expect(Cookies.remove).toHaveBeenCalledWith('refreshToken');
        expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    });
});
