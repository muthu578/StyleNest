import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../page';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { login } from '@/services/api';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/services/api', () => ({
    login: jest.fn(),
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

describe('Login Page', () => {
    const mockDispatch = jest.fn();
    const mockRouter = { push: jest.fn() };

    beforeEach(() => {
        useDispatch.mockReturnValue(mockDispatch);
        useRouter.mockReturnValue(mockRouter);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders login form', () => {
        render(<Login />);
        expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
    });

    it('handles successful login', async () => {
        login.mockResolvedValue({ accessToken: 'token', user: { username: 'testuser' } });
        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText(/Enter username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /LOG IN/i }));

        await waitFor(() => {
            expect(login).toHaveBeenCalledWith({ username: 'testuser', password: 'password' });
            expect(mockRouter.push).toHaveBeenCalledWith('/');
        });
    });

    it('shows error on login failure', async () => {
        login.mockRejectedValue({ response: { data: { message: 'Failed' } } });
        render(<Login />);

        fireEvent.change(screen.getByPlaceholderText(/Enter username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /LOG IN/i }));

        await waitFor(() => {
            expect(screen.getByText(/Failed/i)).toBeInTheDocument();
        });
    });
});
