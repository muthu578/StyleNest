import { render, screen } from '@testing-library/react';
import FilterSidebar from '../FilterSidebar';

describe('FilterSidebar Component', () => {
    const mockProps = {
        categories: ['men', 'women'],
        selectedCategory: 'men',
        onCategoryChange: jest.fn(),
        priceRange: [0, 1000],
        onPriceChange: jest.fn(),
    };

    it('renders category filters', () => {
        render(<FilterSidebar {...mockProps} />);
        expect(screen.getByText(/Filters/i)).toBeInTheDocument();
    });
});
