'use client';

import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import { useEffect, useState } from 'react';
import { getProducts } from '@/services/api';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Loader2, Sparkles, TrendingUp } from 'lucide-react';

interface FeaturedSectionProps {
    title: string;
    category?: string;
    limit?: number;
    priority?: boolean;
}

const CATEGORY_BANNERS: Record<string, string> = {
    men: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=format&fit=crop&w=1600',
    women: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=format&fit=crop&w=1600',
    kids: 'https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=format&fit=crop&w=1600',
    default: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=format&fit=crop&w=1600',
};

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ title, category, limit = 4, priority = false }) => {
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
            <div className="py-24 px-4 max-w-7xl mx-auto flex justify-center items-center h-64">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-[#818CF8]" />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Curating Perfection...</p>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return null;
    }

    const bannerImage = CATEGORY_BANNERS[category || 'default'] || CATEGORY_BANNERS.default;

    return (
        <section className="mb-32">
            {/* Premium Category Banner */}
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden mb-20 group">
                <Image
                    src={bannerImage}
                    alt={`${title} Banner`}
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                    priority={priority}
                />
                <div className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-[2px] md:backdrop-blur-0 md:bg-gradient-to-r md:from-[#0F172A] md:via-[#0F172A]/40 md:to-transparent"></div>

                <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-xl space-y-6 animate-fade-in">
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-4 h-4 text-[#818CF8]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] to-[#2DD4BF]">
                                    New Drops 2026
                                </span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight italic tracking-tighter uppercase">
                                {title} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#F472B6] to-[#2DD4BF] not-italic">ESSENTIALS</span>
                            </h2>

                            <p className="text-gray-300 text-lg font-light max-w-md leading-relaxed border-l-2 border-[#818CF8]/30 pl-6 italic">
                                Elevate your daily rotation with pieces that blend timeless elegance with contemporary edge.
                            </p>

                            <div className="pt-6">
                                <Link
                                    href={`/products${category ? `?category=${category}` : ''}`}
                                    className="inline-flex items-center gap-4 bg-white hover:bg-[#F8FAFC] text-black px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 group/btn"
                                >
                                    SURVEY THE COLLECTION
                                    <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center group-hover/btn:bg-[#818CF8] transition-all">
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Curated Product Display */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-50 pb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#818CF8]" />
                            <span className="text-[10px] font-black text-[#818CF8] uppercase tracking-widest">Trending Choice</span>
                        </div>
                        <h3 className="text-3xl font-black text-[#0F172A] tracking-tight uppercase italic underline decoration-[#818CF8]/10 underline-offset-8">
                            Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] to-[#2DD4BF]">Masterpieces</span>
                        </h3>
                    </div>
                    <Link
                        href={`/products${category ? `?category=${category}` : ''}`}
                        className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                    >
                        Explore the wider range
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {products.map((product, index) => (
                        <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;
