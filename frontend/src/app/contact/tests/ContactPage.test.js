import { render, screen } from '@testing-library/react';
import ContactPage from '../page';

describe('ContactPage', () => {
    it('renders contact page content', () => {
        render(<ContactPage />);
        expect(screen.getByText(/How can we assist you\?/i)).toBeInTheDocument();
        expect(screen.getByText(/Contact/i)).toBeInTheDocument();
        expect(screen.getByText(/The House/i)).toBeInTheDocument();
        expect(screen.getByText(/house@trendora.com/i)).toBeInTheDocument();
    });

    it('displays the contact form', () => {
        render(<ContactPage />);
        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
    });
});
