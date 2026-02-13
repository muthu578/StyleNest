'use client';

import { useState } from 'react';
import { Filter, ChevronDown, Check } from 'lucide-react';

interface FilterOption {
    id: string;
    label: string;
    count?: number;
}

interface FilterGroup {
    id: string;
    name: string;
    options: FilterOption[];
}

const FILTERS: FilterGroup[] = [
    {
        id: 'category',
        name: 'Categories',
        options: [
            { id: 'western', label: 'Western Wear', count: 1240 },
            { id: 'ethnic', label: 'Ethnic Wear', count: 856 },
            { id: 'footwear', label: 'Footwear', count: 420 },
            { id: 'accessories', label: 'Accessories', count: 325 },
            { id: 'beauty', label: 'Beauty', count: 156 },
        ]
    },
    {
        id: 'brand',
        name: 'Brand',
        options: [
            { id: 'hm', label: 'H&M', count: 245 },
            { id: 'zara', label: 'Zara', count: 189 },
            { id: 'mango', label: 'Mango', count: 134 },
            { id: 'forever21', label: 'Forever 21', count: 112 },
            { id: 'levis', label: 'Levis', count: 98 },
        ]
    },
    {
        id: 'price',
        name: 'Price',
        options: [
            { id: 'under500', label: 'Under $500', count: 120 },
            { id: '500-1000', label: '$500 - $1000', count: 450 },
            { id: '1000-2000', label: '$1000 - $2000', count: 320 },
            { id: 'above2000', label: 'Above $2000', count: 85 },
        ]
    },
    {
        id: 'color',
        name: 'Color',
        options: [
            { id: 'black', label: 'Black', count: 540 },
            { id: 'blue', label: 'Blue', count: 320 },
            { id: 'white', label: 'White', count: 280 },
            { id: 'red', label: 'Red', count: 145 },
            { id: 'pink', label: 'Pink', count: 190 },
        ]
    }
];

const FilterSidebar = () => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [expandedGroups, setExpandedGroups] = useState<string[]>(['category', 'brand', 'price']);

    const toggleFilter = (id: string) => {
        setSelectedFilters(prev =>
            prev.includes(id)
                ? prev.filter(f => f !== id)
                : [...prev, id]
        );
    };

    const toggleGroup = (id: string) => {
        setExpandedGroups(prev =>
            prev.includes(id)
                ? prev.filter(g => g !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="w-64 flex-shrink-0 hidden lg:block pr-8 border-r border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filters
                </h3>
                {selectedFilters.length > 0 && (
                    <button
                        onClick={() => setSelectedFilters([])}
                        className="text-xs text-pink-600 font-bold uppercase hover:text-pink-700"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <div className="space-y-6">
                {FILTERS.map(group => (
                    <div key={group.id} className="border-b border-gray-100 pb-6 last:border-0">
                        <button
                            onClick={() => toggleGroup(group.id)}
                            className="flex items-center justify-between w-full mb-4 group"
                        >
                            <span className="text-sm font-bold text-gray-800 uppercase tracking-wide group-hover:text-black">
                                {group.name}
                            </span>
                            <ChevronDown
                                className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${expandedGroups.includes(group.id) ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {expandedGroups.includes(group.id) && (
                            <div className="space-y-3">
                                {group.options.map(option => (
                                    <label key={option.id} className="flex items-center cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters.includes(option.id)}
                                                onChange={() => toggleFilter(option.id)}
                                                className="peer h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500 cursor-pointer"
                                            />
                                        </div>
                                        <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                            {option.label}
                                        </span>
                                        {option.count && (
                                            <span className="ml-auto text-xs text-gray-400">
                                                ({option.count})
                                            </span>
                                        )}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterSidebar;
