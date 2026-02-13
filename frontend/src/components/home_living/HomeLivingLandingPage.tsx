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

const CATEGORIES = [
    { name: 'Living Room', image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Bedroom', image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Kitchen', image: 'https://images.pexels.com/photos/1080728/pexels-photo-1080728.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Decor', image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Lighting', image: 'https://images.pexels.com/photos/242827/pexels-photo-242827.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Outdoor', image: 'https://images.pexels.com/photos/1080646/pexels-photo-1080646.jpeg?auto=format&fit=crop&w=800' },
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

                {/* Performance Stats Overlay */}
                <div className="absolute bottom-12 left-12 hidden md:block animate-fade-in" style={{ animationDelay: '1s' }}>
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[48px] shadow-2xl">
                        <div className="flex items-center gap-6">
                            <div className="text-center group/stat">
                                <p className="text-2xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors tracking-tighter">1.2k+</p>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Artisans</p>
                            </div>
                            <div className="w-[1px] h-10 bg-gray-200"></div>
                            <div className="text-center group/stat">
                                <p className="text-2xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors tracking-tighter">15k+</p>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Spaces</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Curated Categories */}
            <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-24">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-emerald-600">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Design Perspectives</span>
                        </div>
                        <h2 className="text-6xl font-black text-gray-900 tracking-tighter uppercase italic">
                            The <span className="text-emerald-600">Living</span> Lab
                        </h2>
                    </div>
                    <button className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all group">
                        VIEW PHILOSOPHY
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-10">
                    {CATEGORIES.map((cat, idx) => (
                        <Link href="#" key={idx} className="group flex flex-col animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="relative w-full aspect-[3/4] rounded-[48px] overflow-hidden bg-[#F5F5F3] border border-transparent group-hover:border-emerald-600/30 transition-all duration-700">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 ml-auto">
                                        <MoveUpRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>
                            <span className="mt-8 text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-[0.4em] transition-colors pl-4">{cat.name}</span>
                        </Link>
                    ))}
                </div>
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

            {/* Product Feed */}
            <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 pb-12 border-b border-gray-100">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-gray-900" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-900">Atmospheric Accents</span>
                        </div>
                        <h2 className="text-6xl font-black text-gray-900 tracking-tighter uppercase italic line-clamp-2">Lustre <br /> <span className="text-emerald-600 not-italic">Interior</span></h2>
                    </div>
                    <button className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-emerald-600 transition-all group">
                        VIEW ENTIRE TROVE
                        <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-emerald-600 group-hover:bg-emerald-50 transition-all">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </button>
                </div>

                {loading ? (
                    <div className="py-40 flex flex-col items-center gap-8">
                        <Loader2 className="h-12 w-12 animate-spin text-emerald-600" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Crafting Ambiance...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-12 gap-y-24">
                        {products.map((product, index) => (
                            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Newsletter - Concierge Style */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-32">
                <div className="bg-emerald-950 rounded-[80px] p-20 md:p-32 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

                    <div className="relative z-10 max-w-2xl space-y-12">
                        <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] italic tracking-tighter uppercase">The <span className="text-emerald-500 not-italic font-serif">Sanctuary</span> Club</h2>
                        <p className="text-emerald-100/60 text-lg font-medium italic">Join our private circle of interior enthusiasts. Exclusive access to artist collaborations, white-glove delivery, and bespoke furniture consultations.</p>
                        <div className="flex flex-col sm:flex-row gap-6 max-w-md">
                            <input
                                type="email"
                                placeholder="ENTER RESIDENCE EMAIL"
                                className="bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white text-[10px] uppercase font-black focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all flex-grow placeholder:text-emerald-800"
                            />
                            <button className="bg-white hover:bg-emerald-50 text-emerald-950 px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all">
                                JOIN
                            </button>
                        </div>
                    </div>

                    <div className="absolute right-0 bottom-0 w-1/3 h-full hidden lg:block">
                        <Image
                            src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=format&fit=crop&w=800"
                            alt="Interior Design"
                            fill
                            className="object-cover opacity-30 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeLivingLandingPage;
