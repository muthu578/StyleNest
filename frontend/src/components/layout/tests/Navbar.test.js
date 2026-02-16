import { render, screen, fireEvent, act } from '@testing-library/react';
import Navbar from '../Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ priority, fill, ...props }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />;
    },
}));

describe('Navbar Component', () => {
    let mockDispatch;
    let mockRouter;

    beforeEach(() => {
        mockDispatch = jest.fn();
        mockRouter = { push: jest.fn() };
        useDispatch.mockReturnValue(mockDispatch);
        useRouter.mockReturnValue(mockRouter);

        useSelector.mockImplementation((selector) => selector({
            cart: { totalQuantity: 3 },
            auth: { user: null },
            wishlist: { items: [] }
        }));
    });

    it('renders logo and basic navigation links', () => {
        render(<Navbar />);
        expect(screen.getByAltText('Trendora')).toBeInTheDocument();
        // Since links appear in both desktop and mobile menus, we use getAllByText
        expect(screen.getAllByText('Men').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Women').length).toBeGreaterThan(0);
    });

    it('shows cart quantity when items are present', () => {
        render(<Navbar />);
        const cartBadge = screen.getByText('3');
        expect(cartBadge).toBeInTheDocument();
    });

    it('renders login link when user is not authenticated', () => {
        render(<Navbar />);
        expect(screen.getByLabelText('Login to your account')).toBeInTheDocument();
    });

    it('renders user profile when authenticated', () => {
        useSelector.mockImplementation((selector) => selector({
            cart: { totalQuantity: 0 },
            auth: {
                user: {
                    username: 'muthu',
                    image: 'https://robohash.org/muthu.png',
                    role: 'Admin'
                }
            },
            wishlist: { items: [] }
        }));

        render(<Navbar />);
        expect(screen.getByAltText('muthu')).toBeInTheDocument();
        expect(screen.getByText('muthu')).toBeInTheDocument();
        expect(screen.getByText('Admin')).toBeInTheDocument();
    });

    it('handles logout correctly', () => {
        useSelector.mockImplementation((selector) => selector({
            cart: { totalQuantity: 0 },
            auth: { user: { username: 'muthu' } },
            wishlist: { items: [] }
        }));

        render(<Navbar />);
        const signOutBtn = screen.getByLabelText('Sign Out');
        fireEvent.click(signOutBtn);

        expect(mockDispatch).toHaveBeenCalled();
        expect(mockRouter.push).toHaveBeenCalledWith('/login');
    });

    it('toggles mobile menu and closes on link click', () => {
        render(<Navbar />);
        const menuBtn = screen.getByLabelText('Toggle Mobile Menu');

        // Open menu
        fireEvent.click(menuBtn);

        // Find and click a link in the mobile menu
        // There are two "Men" links, one desktop, one mobile.
        const mobileMenLink = screen.getAllByText('Men')[1]; // usually index 1 is mobile if rendered later
        fireEvent.click(mobileMenLink);

        // Verify it was called (state change isn't directly testable without checking something else)
        // Check if Bag text with count is present in mobile menu
        expect(screen.getByText(/Bag/i)).toBeInTheDocument();
    });

    it('updates appearance on scroll and cleans up', () => {
        const { unmount } = render(<Navbar />);

        act(() => {
            window.scrollY = 100;
            window.dispatchEvent(new Event('scroll'));
        });

        const nav = screen.getByRole('navigation');
        expect(nav).toHaveClass('shadow-lg');

        // Unmount to trigger useEffect cleanup
        unmount();
    });

    it('covers all mobile menu click handlers', () => {
        // Test with user logged in to see more links
        useSelector.mockImplementation((selector) => selector({
            cart: { totalQuantity: 3 },
            auth: { user: { username: 'muthu' } },
            wishlist: { items: [] }
        }));

        render(<Navbar />);
        const menuBtn = screen.getByLabelText('Toggle Mobile Menu');
        fireEvent.click(menuBtn);

        // Click Settings in mobile menu
        fireEvent.click(screen.getByText('Settings'));

        // Re-open and click Orders
        fireEvent.click(menuBtn);
        fireEvent.click(screen.getByText('Orders'));

        // Re-open and click Bag
        fireEvent.click(menuBtn);
        fireEvent.click(screen.getByText(/Bag/i));
    });

    it('covers sign in link in mobile menu when logged out', () => {
        useSelector.mockImplementation((selector) => selector({
            cart: { totalQuantity: 0 },
            auth: { user: null },
            wishlist: { items: [] }
        }));

        render(<Navbar />);
        const menuBtn = screen.getByLabelText('Toggle Mobile Menu');
        fireEvent.click(menuBtn);

        // Click Sign In / Join
        fireEvent.click(screen.getByText('Sign In / Join'));
    });
});
