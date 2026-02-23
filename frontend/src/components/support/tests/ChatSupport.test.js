import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatSupport from '../ChatSupport';
import axios from 'axios';

jest.mock('axios');

// Mock Lucide icons
jest.mock('lucide-react', () => ({
    MessageCircle: () => <div data-testid="msg-circle" />,
    X: () => <div data-testid="x-icon" />,
    Send: () => <div data-testid="send-icon" />,
    User: () => <div data-testid="user-icon" />,
    Bot: () => <div data-testid="bot-icon" />,
    Loader2: () => <div data-testid="loader-icon" />,
}));

describe('ChatSupport', () => {
    beforeEach(() => {
        // Mock scrollIntoView
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
        jest.clearAllMocks();
    });

    it('renders chat toggle button initially', () => {
        render(<ChatSupport />);
        expect(screen.getByTestId('msg-circle')).toBeInTheDocument();
    });

    it('opens chat window when toggle is clicked', () => {
        render(<ChatSupport />);
        fireEvent.click(screen.getByTestId('msg-circle'));
        expect(screen.getByText(/Trendora AI/i)).toBeInTheDocument();
    });

    it('handles sending a message and receiving a response', async () => {
        axios.post.mockResolvedValueOnce({
            data: { response: 'Hello! How can I help you today?' },
        });

        render(<ChatSupport />);
        fireEvent.click(screen.getByTestId('msg-circle'));

        const input = screen.getByPlaceholderText(/Type a message.../i);
        fireEvent.change(input, { target: { value: 'Hi' } });
        fireEvent.click(screen.getByTestId('send-icon').closest('button'));

        expect(screen.getByText('Hi')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(/Hello! How can I help you today?/i)).toBeInTheDocument();
        });
    });

    it('shows error message if API fails', async () => {
        axios.post.mockRejectedValueOnce(new Error('API Error'));

        render(<ChatSupport />);
        fireEvent.click(screen.getByTestId('msg-circle'));

        const input = screen.getByPlaceholderText(/Type a message.../i);
        fireEvent.change(input, { target: { value: 'Hi' } });
        fireEvent.click(screen.getByTestId('send-icon').closest('button'));

        await waitFor(() => {
            expect(screen.getByText(/I'm having trouble connecting/i)).toBeInTheDocument();
        });
    });

    it('can be closed', () => {
        render(<ChatSupport />);
        fireEvent.click(screen.getByTestId('msg-circle'));
        expect(screen.getByText(/Trendora AI/i)).toBeInTheDocument();

        // Click the toggle button again (it now shows an x-icon)
        fireEvent.click(screen.getAllByTestId('x-icon')[0].closest('button'));

        expect(screen.queryByText(/Trendora AI/i)).not.toBeInTheDocument();
    });
});
