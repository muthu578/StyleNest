import { render, screen } from '@testing-library/react';
import CategoryHeader from '../CategoryHeader';

jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ priority, fill, ...props }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />;
    },
}));

jest.mock('next/link', () => {
    return ({ children, href }) => {
        return <a href={href}>{children}</a>;
    };
});

describe('CategoryHeader Component', () => {
    it('renders category title for women', () => {
        render(<CategoryHeader category="women" />);
        expect(screen.getByText(/Women's/i)).toBeInTheDocument();
        expect(screen.getByText(/Trendsetters/i)).toBeInTheDocument();
    });

    it('renders nothing for other categories', () => {
        const { container } = render(<CategoryHeader category="men" />);
        expect(container.firstChild).toBeNull();
    });
});
