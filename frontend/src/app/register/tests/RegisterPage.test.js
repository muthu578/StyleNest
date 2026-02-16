import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../page';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { register } from '@/services/api';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/services/api', () => ({
    register: jest.fn(),
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

describe('Register Page', () => {
    const mockDispatch = jest.fn();
    const mockRouter = { push: jest.fn() };

    beforeEach(() => {
        useDispatch.mockReturnValue(mockDispatch);
        useRouter.mockReturnValue(mockRouter);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders register form', () => {
        render(<Register />);
        expect(screen.getAllByText(/Create Account/i).length).toBeGreaterThan(0);
        expect(screen.getByPlaceholderText(/Pick a username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter email/i)).toBeInTheDocument();
    });

    it('handles successful registration', async () => {
        register.mockResolvedValue({ accessToken: 'token', user: { username: 'testuser' } });
        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText(/Pick a username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getAllByPlaceholderText(/••••••••/i)[0], { target: { value: 'password' } });
        fireEvent.change(screen.getAllByPlaceholderText(/••••••••/i)[1], { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /CREATE ACCOUNT/i }));

        await waitFor(() => {
            expect(register).toHaveBeenCalledWith({ username: 'testuser', email: 'test@example.com', password: 'password' });
            expect(mockRouter.push).toHaveBeenCalledWith('/');
        });
    });

    it('shows error if passwords do not match', async () => {
        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText(/Pick a username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getAllByPlaceholderText(/••••••••/i)[0], { target: { value: 'password123' } });
        fireEvent.change(screen.getAllByPlaceholderText(/••••••••/i)[1], { target: { value: 'wrongpassword' } });

        const submitButton = screen.getByRole('button', { name: /CREATE ACCOUNT/i });
        fireEvent.click(submitButton);

        expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
    });
});
