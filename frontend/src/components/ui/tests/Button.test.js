import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
    it('renders button with children', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<Button className="custom-class">Click Me</Button>);
        expect(screen.getByText('Click Me')).toHaveClass('custom-class');
    });
});
