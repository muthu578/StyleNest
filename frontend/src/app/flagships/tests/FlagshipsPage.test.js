import { render, screen } from '@testing-library/react';
import FlagshipsPage from '../page';

describe('FlagshipsPage', () => {
    it('renders flagships page content', () => {
        render(<FlagshipsPage />);
        expect(screen.getByText(/World of StyleNest/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Paris/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Milan/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/London/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/New York/i).length).toBeGreaterThan(0);
    });

    it('displays call to action', () => {
        render(<FlagshipsPage />);
        expect(screen.getByText(/Personal Styling/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Book Concierge/i })).toBeInTheDocument();
    });
});
