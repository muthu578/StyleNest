'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, ArrowRight, Sparkles, TrendingUp, Star, MoveUpRight, Zap, Loader2 } from 'lucide-react';
import { getProducts } from '@/services/api';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

const BRANDS = [
    {
        id: 1,
        name: 'BIBA',
        discount: '30-60% Off',
        image: 'https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-red-700',
        href: '/products?category=women'
    },
    {
        id: 2,
        name: 'W',
        discount: '30-60% Off',
        image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-red-600',
        href: '/products?category=women'
    },
    {
        id: 3,
        name: 'M&S',
        discount: 'Up To 60% Off',
        image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-gray-900',
        href: '/products?category=women'
    },
    {
        id: 4,
        name: 'VERO MODA',
        discount: 'Min. 50% Off',
        image: 'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-black',
        href: '/products?category=women'
    },
];

const CATEGORIES = [
    { name: 'Kurtas', image: 'https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Sarees', image: 'https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Dresses', image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Tops', image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Jewelry', image: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Handbags', image: 'https://images.pexels.com/photos/1353503/pexels-photo-1353503.jpeg?auto=format&fit=crop&w=800' },
];

const WomenLandingPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts('women');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching women products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-white min-h-screen pb-32">
            {/* Immersive Hero Header */}
            <section className="relative h-[80vh] w-full mt-20 overflow-hidden bg-black group">
                <Image
                    src="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=format&fit=crop&w=1920&q=80"
                    alt="Women's Collection"
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[3s] ease-out opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent"></div>
                {/* Header Vignette */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none"></div>

                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                    <div className="max-w-2xl space-y-8 animate-fade-in">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-pink-500 fill-current" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-500">The 2026 Collection</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                            Elegance <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 not-italic">Defined</span>
                        </h1>
                        <p className="text-gray-400 text-lg font-medium max-w-md leading-relaxed border-l-4 border-pink-500 pl-6 py-4 bg-white/5 backdrop-blur-sm rounded-r-2xl">
                            Unveil the new season's most-coveted silhouettes. A selection that honors heritage while embracing the future.
                        </p>
                        <div className="flex gap-6 pt-4">
                            <button className="bg-white hover:bg-pink-50 text-black px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 group/btn flex items-center gap-2">
                                DISCOVER PIECES
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Performance Badge */}
                <div className="absolute bottom-12 right-12 hidden md:block animate-fade-in" style={{ animationDelay: '1s' }}>
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-[32px] flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-pink-500 uppercase tracking-widest mb-1">New Arrivals</span>
                            <span className="text-2xl font-black text-white italic">2.5K+</span>
                        </div>
                        <div className="h-8 w-[1px] bg-white/20"></div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-pink-500 uppercase tracking-widest mb-1">Happy Clients</span>
                            <span className="text-2xl font-black text-white italic">45K</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Categories Section */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-pink-600">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Aura of Style</span>
                        </div>
                        <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase italic underline decoration-pink-500/10 underline-offset-8">
                            Shop by <span className="text-pink-600">Category</span>
                        </h2>
                    </div>
                    <p className="text-gray-400 text-sm font-medium italic max-w-xs text-right">"Fashion is part of the daily air and it changes all the time, with all the events."</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
                    {CATEGORIES.map((cat, idx) => (
                        <Link href="#" key={idx} className="group flex flex-col items-center animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="relative w-full aspect-square rounded-[40px] overflow-hidden bg-gray-50 border-4 border-transparent group-hover:border-pink-500/20 transition-all duration-500 shadow-xl shadow-gray-200/50 group-hover:shadow-pink-500/10">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity"></div>
                                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <MoveUpRight className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <span className="mt-6 text-[10px] font-black text-gray-400 group-hover:text-black uppercase tracking-[0.3em] transition-colors">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Highlighted Brands Section */}
            <section className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-4 mb-20">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-400">Collaborative Excellence</span>
                        <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase italic">The House of <span className="text-pink-600">Partners</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {BRANDS.map((brand, idx) => (
                            <Link href={brand.href} key={brand.id} className="group relative aspect-[4/5] rounded-[48px] overflow-hidden animate-fade-in" style={{ animationDelay: `${idx * 200}ms` }}>
                                <Image
                                    src={brand.image}
                                    alt={brand.name}
                                    fill
                                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                    <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Flagship House</p>
                                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">{brand.name}</h3>
                                    <div className="bg-pink-500/20 backdrop-blur-md border border-white/20 py-4 px-6 rounded-2xl">
                                        <p className="text-[10px] font-black text-white uppercase tracking-widest">{brand.discount}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Catalog Grid Section */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 pb-8 border-b border-gray-100">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-gray-900" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-900">Curated For Excellence</span>
                        </div>
                        <h2 className="text-5xl font-black text-gray-900 tracking-tighter uppercase italic">Recommended <br /> <span className="text-pink-600 not-italic">Selection</span></h2>
                    </div>
                    <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                        Refine Collection
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {loading ? (
                    <div className="py-40 flex flex-col items-center gap-4">
                        <Loader2 className="h-10 w-10 animate-spin text-pink-500" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sourcing Masterpieces...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-16">
                        {products.map((product, index) => (
                            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* VIP Invitation */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
                <div className="bg-black rounded-[64px] p-16 md:p-24 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative z-10 text-center max-w-3xl mx-auto space-y-10">
                        <h2 className="text-5xl md:text-7xl font-black text-white leading-[1] italic tracking-tighter uppercase">Join the House <br /> <span className="text-pink-600 not-italic">Elite</span></h2>
                        <p className="text-gray-400 text-lg font-medium italic">Unlock a world of private collections, early access, and personalized styling services.</p>
                        <button className="bg-white hover:bg-pink-50 text-black px-12 py-6 rounded-full font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95">
                            REQUEST ACCESS
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WomenLandingPage;
