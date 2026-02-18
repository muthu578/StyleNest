import { render, screen } from '@testing-library/react';
import ArtisansPage from '../page';

describe('ArtisansPage', () => {
    it('renders artisans page content', () => {
        render(<ArtisansPage />);
        expect(screen.getByText(/Mastery in Every Stitch/i)).toBeInTheDocument();
        expect(screen.getByText(/Masters of Silk/i)).toBeInTheDocument();
        expect(screen.getByText(/Leather Architects/i)).toBeInTheDocument();
    });

    it('displays craftsmanship stats', () => {
        render(<ArtisansPage />);
        expect(screen.getByText(/Hand-Stitched/i)).toBeInTheDocument();
        expect(screen.getByText(/Master Artisans/i)).toBeInTheDocument();
        expect(screen.getByText(/Hours per Garment/i)).toBeInTheDocument();
    });
});
