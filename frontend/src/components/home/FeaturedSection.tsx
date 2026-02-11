'use client';

import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import { useEffect, useState } from 'react';
import { getProducts } from '@/services/api';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Loader2 } from 'lucide-react';

interface FeaturedSectionProps {
    title: string;
    category?: string;
    limit?: number;
}

const CATEGORY_BANNERS: Record<string, string> = {
    men: 'https://loremflickr.com/800/600/man,fashion/all',
    women: 'https://loremflickr.com/800/600/woman,fashion/all',
    kids: 'https://loremflickr.com/800/600/kid,fashion/all',
    default: 'https://loremflickr.com/800/600/fashion/all',
};

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ title, category, limit = 4 }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                setLoading(true);
                const allProducts = await getProducts(category);
                const sliced = allProducts.slice(0, limit);
                setProducts(sliced);
            } catch (error) {
                console.error('Failed to fetch featured products', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, [category, limit]);

    if (loading) {
        return (
            <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    const bannerImage = CATEGORY_BANNERS[category || 'default'] || CATEGORY_BANNERS.default;

    return (
        <section className="mb-16">
            {/* Category Banner - Inspired by AJIO */}
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden mb-12 group">
                <Image
                    src={bannerImage}
                    alt={`${title} Banner`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8 md:px-16">
                    <div className="max-w-xl text-white space-y-4">
                        <span className="inline-block bg-yellow-400 text-black text-xs font-bold px-2 py-1 uppercase tracking-widest mb-2">
                            New Season
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                            {title}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-200 font-medium max-w-md">
                            Discover the latest trends and elevate your style with our premium collection.
                        </p>
                        <div className="pt-4">
                            <Link
                                href={`/products${category ? `?category=${category}` : ''}`}
                                className="inline-flex items-center bg-white text-black px-8 py-3 font-bold text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors"
                            >
                                Shop Now
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
                    <h3 className="text-2xl font-bold text-gray-900">Trending Now</h3>
                    <Link href={`/products${category ? `?category=${category}` : ''}`} className="hidden md:flex items-center text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors">
                        View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-10 md:hidden flex justify-center">
                    <Link href={`/products${category ? `?category=${category}` : ''}`} className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors w-full">
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;
