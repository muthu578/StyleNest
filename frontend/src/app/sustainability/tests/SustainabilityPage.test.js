import { render, screen } from '@testing-library/react';
import SustainabilityPage from '../page';

describe('SustainabilityPage', () => {
    it('renders sustainability page content', () => {
        render(<SustainabilityPage />);
        expect(screen.getByText(/Fashion/i)).toBeInTheDocument();
        expect(screen.getByText(/for Good/i)).toBeInTheDocument();
        expect(screen.getByText(/Trendora is committed to a circular future/i)).toBeInTheDocument();
        expect(screen.getByText(/Circular Design/i)).toBeInTheDocument();
        expect(screen.getByText(/Eco Materials/i)).toBeInTheDocument();
        expect(screen.getByText(/Net Zero Path/i)).toBeInTheDocument();
    });

    it('displays impact points', () => {
        render(<SustainabilityPage />);
        expect(screen.getByText(/Zero Plastic Packaging/i)).toBeInTheDocument();
        expect(screen.getByText(/Fair Wage Certified/i)).toBeInTheDocument();
    });
});
