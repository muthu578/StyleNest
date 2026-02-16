import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

jest.mock('next/link', () => {
    return ({ children, href }) => {
        return <a href={href}>{children}</a>;
    };
});

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ priority, fill, ...props }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />;
    },
}));

describe('Footer Component', () => {
    it('renders footer brand name', () => {
        render(<Footer />);
        // Use a more specific matcher to avoid duplicates
        expect(screen.getAllByText(/Trendora/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/Redefining the digital shopping experience/i)).toBeInTheDocument();
    });
});
