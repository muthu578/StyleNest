import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
}));

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ priority, fill, ...props }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />;
    },
}));

describe('Navbar Component', () => {
    beforeEach(() => {
        useSelector.mockImplementation((selector) => selector({
            cart: { totalQuantity: 0 },
            auth: { user: null },
            wishlist: { items: [] }
        }));
        useDispatch.mockReturnValue(jest.fn());
        useRouter.mockReturnValue({ push: jest.fn() });
        usePathname.mockReturnValue('/');
    });

    it('renders logo', () => {
        render(<Navbar />);
        expect(screen.getByAltText('Trendora')).toBeInTheDocument();
    });
});
