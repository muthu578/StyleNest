import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mock components
jest.mock('@/components/layout/Hero', () => () => <div data-testid="hero">Hero</div>);
jest.mock('@/components/home/FeaturedSection', () => () => <div data-testid="featured-section">FeaturedSection</div>);
jest.mock('@/components/home/CategoryShowcase', () => () => <div data-testid="category-showcase">CategoryShowcase</div>);

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ priority, fill, ...props }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />;
    },
}));

describe('Home Page', () => {
    it('renders home page components', () => {
        render(<Home />);
        expect(screen.getByTestId('hero')).toBeInTheDocument();
        expect(screen.getByTestId('category-showcase')).toBeInTheDocument();
        expect(screen.getAllByTestId('featured-section').length).toBeGreaterThan(0);
    });

    it('renders manifesto section', () => {
        render(<Home />);
        expect(screen.getByText(/The Trendora Manifesto/i)).toBeInTheDocument();
        expect(screen.getByText(/Beyond/i)).toBeInTheDocument();
    });
});
