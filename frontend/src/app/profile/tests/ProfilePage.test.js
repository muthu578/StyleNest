import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from '../page';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/slices/authSlice';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
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

describe('ProfilePage', () => {
    const mockDispatch = jest.fn();
    const mockRouter = { push: jest.fn() };
    const mockUser = {
        firstName: 'Muthukumar',
        lastName: 'M',
        email: 'muthummk@gmail.com',
        image: 'https://robohash.org/muthu.png'
    };

    beforeEach(() => {
        useDispatch.mockReturnValue(mockDispatch);
        useRouter.mockReturnValue(mockRouter);
        useSelector.mockImplementation((selector) => selector({
            auth: { user: mockUser }
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders profile information', () => {
        render(<ProfilePage />);
        expect(screen.getAllByText('Muthukumar').length).toBeGreaterThan(0);
        expect(screen.getAllByText('M').length).toBeGreaterThan(0);
        expect(screen.getAllByDisplayValue('muthummk@gmail.com').length).toBeGreaterThan(0);
    });

    it('handles logout', () => {
        render(<ProfilePage />);
        fireEvent.click(screen.getByText(/Sign Out/i));
        expect(mockDispatch).toHaveBeenCalledWith(logout());
        expect(mockRouter.push).toHaveBeenCalledWith('/login');
    });
});
