import { render, screen, fireEvent } from '@testing-library/react';
import FilterSidebar from '../FilterSidebar';

describe('FilterSidebar Component', () => {
    it('renders filter sidebar with initial groups expanded', () => {
        render(<FilterSidebar />);
        expect(screen.getByText(/Filters/i)).toBeInTheDocument();
        // category, brand, price are expanded by default
        expect(screen.getByText('Western Wear')).toBeInTheDocument();
        expect(screen.getByText('H&M')).toBeInTheDocument();
        expect(screen.getByText('Under $500')).toBeInTheDocument();
        // color is collapsed by default
        expect(screen.queryByText('Black')).not.toBeInTheDocument();
    });

    it('toggles filter groups', () => {
        render(<FilterSidebar />);

        // Collapse category
        const categoryBtn = screen.getByText('Categories');
        fireEvent.click(categoryBtn.parentElement);
        expect(screen.queryByText('Western Wear')).not.toBeInTheDocument();

        // Expand color
        const colorBtn = screen.getByText('Color');
        fireEvent.click(colorBtn.parentElement);
        expect(screen.getByText('Black')).toBeInTheDocument();
    });

    it('toggles filters and shows clear all button', () => {
        render(<FilterSidebar />);

        const westernWearLabel = screen.getByText('Western Wear');

        // Check filter
        fireEvent.click(westernWearLabel);

        // Should show Clear All button
        const clearBtn = screen.getByText('Clear All');
        expect(clearBtn).toBeInTheDocument();

        // Uncheck filter
        fireEvent.click(westernWearLabel);
        expect(screen.queryByText('Clear All')).not.toBeInTheDocument();
    });

    it('clears all filters when Clear All is clicked', () => {
        render(<FilterSidebar />);

        const westernWearLabel = screen.getByText('Western Wear');
        const hmLabel = screen.getByText('H&M');

        fireEvent.click(westernWearLabel);
        fireEvent.click(hmLabel);

        const clearBtn = screen.getByText('Clear All');
        fireEvent.click(clearBtn);

        expect(screen.queryByText('Clear All')).not.toBeInTheDocument();
    });
});
