'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, ArrowRight, Sparkles, TrendingUp, Star, MoveUpRight, Zap, Loader2, Heart, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { getProducts } from '@/services/api';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

const BRANDS = [
    {
        id: 1,
        name: 'Gini & Jony',
        discount: '40-60% Off',
        image: 'https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=format&fit=crop&w=800',
        color: 'text-orange-500',
        href: '/products?category=kids'
    },
    {
        id: 2,
        name: 'U.S. Polo Assn.',
        discount: 'Flat 50% Off',
        image: 'https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=format&fit=crop&w=800',
        color: 'text-blue-800',
        href: '/products?category=kids'
    },
    {
        id: 3,
        name: 'Mothercare',
        discount: 'Up To 50% Off',
        image: 'https://images.pexels.com/photos/3662839/pexels-photo-3662839.jpeg?auto=format&fit=crop&w=800',
        color: 'text-blue-400',
        href: '/products?category=kids'
    },
    {
        id: 4,
        name: 'Liliput',
        discount: 'Min. 40% Off',
        image: 'https://images.pexels.com/photos/1619702/pexels-photo-1619702.jpeg?auto=format&fit=crop&w=800',
        color: 'text-pink-500',
        href: '/products?category=kids'
    },
];

const KIDS_QUICK_ACCESS = [
    { name: 'Boys Clothing', image: 'https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=format&fit=crop&w=400', query: 'boys clothing' },
    { name: 'Girls Clothing', image: 'https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=format&fit=crop&w=400', query: 'girls clothing' },
    { name: 'Baby Gear', image: 'https://images.pexels.com/photos/3662839/pexels-photo-3662839.jpeg?auto=format&fit=crop&w=400', query: 'baby clothing gear' },
    { name: 'Toys & Games', image: 'https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=format&fit=crop&w=400', query: 'toys games' },
];

const KIDS_RECT_CATEGORIES = [
    { name: 'School Uniforms', query: 'kids school uniforms' },
    { name: 'Pajamas', query: 'kids pajamas' },
    { name: 'Character Shop', query: 'kids character shop' },
    { name: 'Shoes', query: 'kids shoes' },
    { name: 'Adaptive Clothing', query: 'kids adaptive clothing' },
    { name: 'Accessories', query: 'kids accessories' },
];

const KidsLandingPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts('kids');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching kids products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-white min-h-screen pb-32">
            {/* Playful Premium Hero */}
            <section className="relative h-[80vh] w-full mt-20 overflow-hidden bg-[#F8F9FB] group">
                <Image
                    src="https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=format&fit=crop&w=1920&q=80"
                    alt="Kids Collection"
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[3s] ease-out"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
                {/* Header Vignette */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 via-black/10 to-transparent pointer-events-none"></div>

                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                    <div className="max-w-xl space-y-10 animate-fade-in">
                        <div className="flex items-center gap-3">
                            <Heart className="w-5 h-5 text-pink-500 fill-current" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-900">Wonder & Whimsy</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black text-gray-900 leading-[0.85] tracking-tighter uppercase italic">
                            Little <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 not-italic">Icons</span>
                        </h1>
                        <p className="text-gray-500 text-lg font-medium max-w-md leading-relaxed border-l-4 border-pink-500 pl-6 py-4 bg-white/40 backdrop-blur-md rounded-r-2xl">
                            Where comfort meets couture for the next generation of style. Discover a world of vibrant imagination and premium play.
                        </p>
                        <div className="flex gap-6 pt-4">
                            <button className="bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 group/btn flex items-center gap-2">
                                BROWSE JUNIOR
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Kids One-Stop Shop Banner */}
            <section className="bg-[#A40047] py-6 text-center overflow-hidden relative">
                <div className="flex justify-center items-center gap-2 px-4">
                    <h2 className="text-white text-xl md:text-3xl font-medium tracking-tight">
                        The Kids' one-stop shop <span className="font-extrabold">for every adventure.</span>
                    </h2>
                </div>
            </section>

            {/* Quick Access Grid Style */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {KIDS_QUICK_ACCESS.map((cat, idx) => (
                        <Link href={`/products?category=${cat.query}`} key={idx} className="group relative space-y-4 text-center">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 border border-gray-100 shadow-sm">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <span className="block text-sm font-bold border-b border-black pb-0.5 w-max mx-auto hover:text-[#A40047] hover:border-[#A40047] transition-colors">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Rectangular Categories */}
            <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {KIDS_RECT_CATEGORIES.map((cat, idx) => (
                        <Link
                            href={`/products?category=${cat.query}`}
                            key={idx}
                            className="bg-[#D80056] text-white py-4 px-2 text-center text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-[#A40047] transition-colors flex items-center justify-center leading-tight min-h-[60px]"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </section>

            {/* Discovery Feed */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-50">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 whitespace-normal">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-gray-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Discovery Mode</span>
                        </div>
                        <div className="flex items-baseline gap-4">
                            <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">Kids' <span className="text-blue-500 not-italic">Clothing</span></h2>
                            <span className="text-xl font-medium text-gray-300 italic">(64,737)</span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="py-40 flex flex-col items-center gap-6">
                        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Unboxing Joy...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-12 gap-y-20">
                        {products.map((product, index) => (
                            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Playful Brands */}
            <section className="py-32 bg-[#FDF8F9]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-24">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-pink-400">Chosen with Love</span>
                        <h2 className="text-6xl font-black text-gray-900 tracking-tighter uppercase italic">The House of <span className="text-blue-500">Icons</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {BRANDS.map((brand, idx) => (
                            <Link href={brand.href} key={brand.id} className="group relative aspect-[3/4] rounded-[64px] overflow-hidden animate-fade-in" style={{ animationDelay: `${idx * 200}ms` }}>
                                <Image
                                    src={brand.image}
                                    alt={brand.name}
                                    fill
                                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent"></div>
                                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                                    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[40px] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                                        <h3 className={`text-2xl font-black uppercase italic tracking-tighter mb-2 ${brand.color}`}>{brand.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{brand.discount}</p>
                                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-pink-500 transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
};

export default KidsLandingPage;
