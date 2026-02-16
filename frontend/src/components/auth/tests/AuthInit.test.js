import { render, waitFor } from '@testing-library/react';
import AuthInit from '../AuthInit';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { getCurrentUser } from '@/services/api';
import { setUser } from '@/store/slices/authSlice';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

jest.mock('js-cookie', () => ({
    get: jest.fn(),
}));

jest.mock('@/services/api', () => ({
    getCurrentUser: jest.fn(),
}));

jest.mock('@/store/slices/authSlice', () => ({
    setUser: jest.fn(),
}));

describe('AuthInit Component', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        useDispatch.mockReturnValue(mockDispatch);
        jest.clearAllMocks();
    });

    it('renders children', () => {
        const { getByText } = render(
            <AuthInit>
                <div>Test Child</div>
            </AuthInit>
        );
        expect(getByText('Test Child')).toBeInTheDocument();
    });

    it('initializes auth when token exists', async () => {
        const mockUser = { id: 1, username: 'testuser' };
        Cookies.get.mockReturnValue('fake-token');
        getCurrentUser.mockResolvedValue(mockUser);

        render(
            <AuthInit>
                <div>Test Child</div>
            </AuthInit>
        );

        await waitFor(() => {
            expect(getCurrentUser).toHaveBeenCalled();
            expect(mockDispatch).toHaveBeenCalledWith(setUser(mockUser));
        });
    });

    it('does not initialize auth when no token exists', async () => {
        Cookies.get.mockReturnValue(undefined);

        render(
            <AuthInit>
                <div>Test Child</div>
            </AuthInit>
        );

        await waitFor(() => {
            expect(getCurrentUser).not.toHaveBeenCalled();
        });
    });

    it('handles error during auth initialization', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        Cookies.get.mockReturnValue('fake-token');
        getCurrentUser.mockRejectedValue(new Error('Auth failed'));

        render(
            <AuthInit>
                <div>Test Child</div>
            </AuthInit>
        );

        await waitFor(() => {
            expect(getCurrentUser).toHaveBeenCalled();
            expect(consoleSpy).toHaveBeenCalledWith('Auth initialization failed:', expect.any(Error));
        });
        consoleSpy.mockRestore();
    });
});
