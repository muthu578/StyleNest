import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

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

describe('Hero Component', () => {
    it('renders hero content', () => {
        render(<Hero />);
        expect(screen.getByText(/Elegance/i)).toBeInTheDocument();
        expect(screen.getByText(/Defined/i)).toBeInTheDocument();
    });
});
