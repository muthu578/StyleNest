import { render, screen } from '@testing-library/react';
import CategoryShowcase from '../CategoryShowcase';

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

describe('CategoryShowcase Component', () => {
    it('renders category sections', () => {
        render(<CategoryShowcase />);
        expect(screen.getByText(/Aura of/i)).toBeInTheDocument();
    });
});
