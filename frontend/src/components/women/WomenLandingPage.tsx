'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, ArrowRight, Sparkles, TrendingUp, Star, MoveUpRight, Zap, Loader2 } from 'lucide-react';
import { getProducts } from '@/services/api';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

const WOMEN_QUICK_ACCESS = [
    { name: 'Tops & Tees', image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=format&fit=crop&w=400', query: 'womens tops t-shirts' },
    { name: 'Sweaters & Cardigans', image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=format&fit=crop&w=400', query: 'womens sweaters cardigans' },
    { name: 'Dresses', image: 'https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=format&fit=crop&w=400', query: 'womens dresses' },
    { name: 'Bottoms', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=format&fit=crop&w=400', query: 'womens bottoms' },
    { name: 'Shirts & Blouses', image: 'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=format&fit=crop&w=400', query: 'womens shirts blouses' },
    { name: 'Coats & Jackets', image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=format&fit=crop&w=400', query: 'womens coats jackets' },
];

const WOMEN_RECT_CATEGORIES = [
    { name: 'WOMEN', query: 'womens clothing' },
    { name: "WOMEN'S PLUS", query: 'womens plus size' },
    { name: 'PETITES', query: 'womens petite' },
    { name: 'JUNIORS', query: 'juniors clothing' },
];

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

            {/* "Back to the Basics" Banner */}
            <section className="bg-[#6D002D] py-8 text-center overflow-hidden relative border-b-8 border-[#A40047]">
                <div className="flex flex-col md:flex-row justify-center items-center gap-2 px-4">
                    <h2 className="text-white text-2xl md:text-5xl font-extrabold tracking-tight">
                        Back to the basics. <span className="text-[#D80056]">Because the sequins deserve a break.</span>
                    </h2>
                </div>
            </section>

            {/* Quick Access Grid Style */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6">
                    {WOMEN_QUICK_ACCESS.map((cat, idx) => (
                        <Link href={`/products?category=${cat.query}`} key={idx} className="group relative space-y-4 text-center">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-gray-50 border border-gray-100 shadow-sm">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <span className="block text-xs font-black uppercase tracking-widest border-b border-black md:border-transparent group-hover:border-black pb-0.5 w-max mx-auto transition-all">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Shop by Size Section */}
            <section className="py-12 bg-[#FFF9F3] relative overflow-hidden">
                {/* Decorative Dots */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:grid grid-cols-4 gap-2 opacity-20">
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#6D002D]"></div>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-[#6D002D] mb-10 tracking-tighter">Shop by <span className="text-[#D80056]">size.</span></h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {WOMEN_RECT_CATEGORIES.map((cat, idx) => (
                            <Link
                                href={`/products?category=${cat.query}`}
                                key={idx}
                                className="bg-[#6D002D] text-white py-4 md:py-6 px-4 text-center text-xs md:text-sm font-black uppercase tracking-[0.2em] hover:bg-[#8A0039] transition-all transform hover:scale-[1.02] shadow-xl shadow-red-900/10"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
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

            {/* Curated Feed Section Header */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-50">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 whitespace-normal">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-gray-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Discovery Mode</span>
                        </div>
                        <div className="flex items-baseline gap-4">
                            <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">Women's <span className="text-[#D80056] not-italic">Clothing</span></h2>
                            <span className="text-xl font-medium text-gray-300 italic">(123,321)</span>
                        </div>
                    </div>
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

        </div>
    );
};

export default WomenLandingPage;
