'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts } from '@/services/api';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
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
            <div className="flex justify-center items-center -h-screen pt-40">
                <Loader2 className="h-10 w-10 animate-spin text-black" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">{getPageTitle()}</h1>

            {products.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-lg text-gray-500">No products found in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
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
