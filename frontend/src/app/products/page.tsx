'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts } from '@/services/api';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import FilterSidebar from '@/components/product/FilterSidebar';
import WomenLandingPage from '@/components/women/WomenLandingPage';
import MenLandingPage from '@/components/men/MenLandingPage';
import KidsLandingPage from '@/components/kids/KidsLandingPage';
import BeautyLandingPage from '@/components/beauty/BeautyLandingPage';
import HomeLivingLandingPage from '@/components/home_living/HomeLivingLandingPage';
import { Loader2 } from 'lucide-react';

const ProductList = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts(category || undefined);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    const getPageTitle = () => {
        if (!category) return 'All Products';
        switch (category) {
            case 'men': return "Men's Fashion";
            case 'women': return "Women's Fashion";
            case 'kids': return "Kids' Fashion";
            case 'beauty': return "Beauty & Personal Care";
            case 'home': return "Home & Living";
            default: return category.charAt(0).toUpperCase() + category.slice(1);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen pt-40">
                <Loader2 className="h-10 w-10 animate-spin text-pink-600" />
            </div>
        );
    }

    if (category === 'women') {
        return <WomenLandingPage />;
    }

    if (category === 'men') {
        return <MenLandingPage />;
    }

    if (category === 'kids') {
        return <KidsLandingPage />;
    }

    if (category === 'beauty') {
        return <BeautyLandingPage />;
    }

    if (category === 'home') {
        return <HomeLivingLandingPage />;
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs / Title Header (Simple for now) */}
                <div className="mb-6">
                    {/* For generic pages we show title here, for women's page the banner handles it */}
                    {category !== 'women' && <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">{getPageTitle()}</h1>}
                </div>

                <div className="flex gap-8">
                    {/* Sidebar - Conditional or always visible? Let's make it visible for main shop pages */}
                    <FilterSidebar />

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar (Sort, Results count) */}
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                            <span className="text-gray-500 text-sm font-medium">
                                Showing <span className="text-gray-900 font-bold">{products.length}</span> items
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Sort by:</span>
                                <select className="text-sm font-bold text-gray-900 bg-transparent border-none focus:ring-0 cursor-pointer">
                                    <option>Recommended</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest First</option>
                                </select>
                            </div>
                        </div>

                        {products.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-lg">
                                <p className="text-lg text-gray-500 font-medium">No products found for this category.</p>
                                <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or check back later.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="flex justify-center pt-20"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <ProductList />
        </Suspense>
    );
}
