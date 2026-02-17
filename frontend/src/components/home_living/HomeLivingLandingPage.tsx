'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, ArrowRight, Sparkles, TrendingUp, Star, MoveUpRight, Zap, Loader2, Home } from 'lucide-react';
import { getProducts } from '@/services/api';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

const BRANDS = [
    {
        id: 1,
        name: 'IKEA',
        discount: 'Flat 15% Off',
        image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-blue-700',
        href: '/products?category=home'
    },
    {
        id: 2,
        name: 'Home Centre',
        discount: '30-50% Off',
        image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-red-600',
        href: '/products?category=home'
    },
    {
        id: 3,
        name: 'Pepperfry',
        discount: 'Up To 60% Off',
        image: 'https://images.pexels.com/photos/1080728/pexels-photo-1080728.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-orange-900',
        href: '/products?category=home'
    },
    {
        id: 4,
        name: 'Fabindia',
        discount: 'Flat 20% Off',
        image: 'https://images.pexels.com/photos/242827/pexels-photo-242827.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-red-700',
        href: '/products?category=home'
    },
];

const HOME_QUICK_ACCESS = [
    { name: 'Kitchen & Dining', image: 'https://images.pexels.com/photos/1080728/pexels-photo-1080728.jpeg?auto=format&fit=crop&w=400', query: 'kitchen dining' },
    { name: 'Living Room', image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=format&fit=crop&w=400', query: 'living room' },
    { name: 'Bed & Bath', image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=format&fit=crop&w=400', query: 'bed bath' },
    { name: 'Patio & Garden', image: 'https://images.pexels.com/photos/1080646/pexels-photo-1080646.jpeg?auto=format&fit=crop&w=400', query: 'patio garden' },
];

const HOME_RECT_CATEGORIES = [
    { name: 'Furniture', query: 'home furniture' },
    { name: 'Home Decor', query: 'home decor' },
    { name: 'Storage & Org', query: 'home storage organization' },
    { name: 'Lighting', query: 'home lighting' },
    { name: 'Window Treatments', query: 'home window treatments' },
    { name: 'Rugs', query: 'home rugs' },
];

const HomeLivingLandingPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts('home');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching home products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-white min-h-screen pb-32">
            {/* Architectural Hero */}
            <section className="relative h-[85vh] w-full mt-20 overflow-hidden bg-[#F5F5F3] group">
                <Image
                    src="https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=format&fit=crop&w=1920&q=80"
                    alt="Home Living Collection"
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[3s] ease-out opacity-90"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent"></div>
                {/* Header Vignette */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 via-black/10 to-transparent pointer-events-none"></div>

                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                    <div className="max-w-xl space-y-10 animate-fade-in">
                        <div className="flex items-center gap-3">
                            <Home className="w-5 h-5 text-emerald-600 fill-current" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-900">Artisan Living</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black text-gray-900 leading-[0.85] tracking-tighter uppercase italic">
                            Spatial <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 not-italic">Poetry</span>
                        </h1>
                        <p className="text-gray-500 text-lg font-medium max-w-md leading-relaxed border-l-4 border-emerald-600 pl-6 py-4 bg-white/40 backdrop-blur-md rounded-r-2xl">
                            Transforming dwellings into sanctuaries. Discover a curated collection of architectural forms, natural textures, and timeless utility.
                        </p>
                        <div className="flex gap-6 pt-4">
                            <button className="bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 group/btn flex items-center gap-2 border border-white/20">
                                CURATE SPACE
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Home One-Stop Shop Banner */}
            <section className="bg-[#A40047] py-6 text-center overflow-hidden relative">
                <div className="flex justify-center items-center gap-2 px-4">
                    <h2 className="text-white text-xl md:text-3xl font-medium tracking-tight">
                        The Home one-stop shop <span className="font-extrabold">for every sanctuary.</span>
                    </h2>
                </div>
            </section>

            {/* Quick Access Grid Style */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {HOME_QUICK_ACCESS.map((cat, idx) => (
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
                    {HOME_RECT_CATEGORIES.map((cat, idx) => (
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

            {/* Discovery Feed Section Header */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-50">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 whitespace-normal">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-gray-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Discovery Mode</span>
                        </div>
                        <div className="flex items-baseline gap-4">
                            <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">Home <span className="text-emerald-600 not-italic">Interior</span></h2>
                            <span className="text-xl font-medium text-gray-300 italic">(112,431)</span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="py-40 flex flex-col items-center gap-6">
                        <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Crafting Ambiance...</p>
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

            {/* Architectural Brands */}
            <section className="py-32 bg-[#F8F9FA] relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-24">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-600">Design Powerhouses</span>
                        <h2 className="text-6xl font-black text-gray-900 tracking-tighter uppercase italic">The House of <span className="text-emerald-600">Heritage</span></h2>
                        <div className="w-24 h-[1px] bg-gray-200 mx-auto mt-8"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {BRANDS.map((brand, idx) => (
                            <Link href={brand.href} key={brand.id} className="group flex flex-col items-center animate-fade-in" style={{ animationDelay: `${idx * 200}ms` }}>
                                <div className="relative w-full aspect-[4/5] rounded-[64px] overflow-hidden mb-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group-hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.15)] transition-all duration-700">
                                    <Image
                                        src={brand.image}
                                        alt={brand.name}
                                        fill
                                        className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/5 opacity-100 group-hover:opacity-0 transition-opacity"></div>
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter italic mb-2 opacity-80 group-hover:opacity-100 transition-opacity">{brand.name}</h3>
                                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] overflow-hidden h-0 group-hover:h-5 transition-all duration-500">{brand.discount}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
};

export default HomeLivingLandingPage;
