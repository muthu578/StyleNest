import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
    it('renders about page content', () => {
        render(<AboutPage />);
        expect(screen.getByText(/The Vision of Trendora/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Muthukumar/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/Mastermind of Digital Couture/i)).toBeInTheDocument();
        expect(screen.getByText(/Explore the Collection/i)).toBeInTheDocument();
    });

    it('displays tech stack features', () => {
        render(<AboutPage />);
        expect(screen.getByText(/Next.js 15/i)).toBeInTheDocument();
        expect(screen.getByText(/AI Core/i)).toBeInTheDocument();
        expect(screen.getByText(/TypeScript/i)).toBeInTheDocument();
        expect(screen.getByText(/Redux Toolkit/i)).toBeInTheDocument();
    });
});
