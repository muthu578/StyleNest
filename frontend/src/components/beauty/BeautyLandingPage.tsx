'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, ArrowRight, Sparkles, TrendingUp, Star, MoveUpRight, Zap, Loader2, Flower2 } from 'lucide-react';
import { getProducts } from '@/services/api';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

const BRANDS = [
    {
        id: 1,
        name: 'MAC',
        discount: 'Flat 20% Off',
        image: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-gray-900',
        href: '/products?category=beauty'
    },
    {
        id: 2,
        name: 'L-Oreal',
        discount: 'Buy 2 Get 1',
        image: 'https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-gray-900',
        href: '/products?category=beauty'
    },
    {
        id: 3,
        name: 'Lakme',
        discount: 'Up To 40% Off',
        image: 'https://images.pexels.com/photos/3738339/pexels-photo-3738339.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-black',
        href: '/products?category=beauty'
    },
    {
        id: 4,
        name: 'Forest Essentials',
        discount: 'Free Sample',
        image: 'https://images.pexels.com/photos/3951783/pexels-photo-3951783.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-green-800',
        href: '/products?category=beauty'
    },
];

const BEAUTY_QUICK_ACCESS = [
    { name: 'Makeup', image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=format&fit=crop&w=800', query: 'makeup' },
    { name: 'Skincare', image: 'https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=format&fit=crop&w=800', query: 'skincare' },
    { name: 'Haircare', image: 'https://images.pexels.com/photos/3738339/pexels-photo-3738339.jpeg?auto=format&fit=crop&w=800', query: 'haircare' },
    { name: 'Fragrance', image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=format&fit=crop&w=800', query: 'fragrance' },
];

const BEAUTY_RECT_CATEGORIES = [
    { name: 'Bath & Body', query: 'bath body' },
    { name: 'Men\'s Grooming', query: 'mens grooming' },
    { name: 'Tools & Brushes', query: 'beauty tools brushes' },
    { name: 'Wellness', query: 'beauty wellness' },
    { name: 'K-Beauty', query: 'korean beauty' },
    { name: 'Clean Beauty', query: 'clean beauty' },
];

const BeautyLandingPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts('beauty');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching beauty products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-white min-h-screen pb-32">
            {/* Serene Hero Banner */}
            <section className="relative h-[85vh] w-full mt-20 overflow-hidden bg-[#FAF7F5] group">
                <Image
                    src="https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=format&fit=crop&w=1920&q=80"
                    alt="Beauty Collection"
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[3s] ease-out opacity-90"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
                {/* Header Vignette */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 via-black/10 to-transparent pointer-events-none"></div>

                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                    <div className="max-w-2xl space-y-10 animate-fade-in">
                        <div className="flex items-center gap-3">
                            <Flower2 className="w-5 h-5 text-pink-400 fill-current" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-900">Ephemeral Glow</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black text-gray-900 leading-[0.85] tracking-tighter uppercase italic">
                            Radiant <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 not-italic">Alchemy</span>
                        </h1>
                        <p className="text-gray-500 text-lg font-medium max-w-md leading-relaxed border-l-4 border-pink-400 pl-6 py-4 bg-white/60 backdrop-blur-md rounded-r-2xl">
                            Unlock the secret to timeless vitality. A curated selection of botanical brilliance and scientific precision for your ultimate canvas.
                        </p>
                        <div className="flex gap-6 pt-4">
                            <button className="bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 group/btn flex items-center gap-2">
                                REVEAL RADIANCE
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Beauty One-Stop Shop Banner */}
            <section className="bg-[#A40047] py-6 text-center overflow-hidden relative">
                <div className="flex justify-center items-center gap-2 px-4">
                    <h2 className="text-white text-xl md:text-3xl font-medium tracking-tight">
                        The Beauty one-stop shop <span className="font-extrabold">for every glow-up.</span>
                    </h2>
                </div>
            </section>

            {/* Quick Access Grid Style */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {BEAUTY_QUICK_ACCESS.map((cat, idx) => (
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
                    {BEAUTY_RECT_CATEGORIES.map((cat, idx) => (
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
                            <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">Beauty <span className="text-pink-400 not-italic">Vault</span></h2>
                            <span className="text-xl font-medium text-gray-300 italic">(48,291)</span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="py-40 flex flex-col items-center gap-6">
                        <Loader2 className="h-12 w-12 animate-spin text-pink-400" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Sourcing Rare Essences...</p>
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

            {/* Apothecary Brands */}
            <section className="py-32 bg-[#FAF7F5] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex justify-between items-end mb-24">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-pink-400">Connoisseur's Collection</span>
                            <h2 className="text-6xl font-black text-gray-900 tracking-tighter uppercase italic leading-none">The <span className="text-pink-400">Grand</span> Houses</h2>
                        </div>
                        <p className="text-gray-400 text-sm font-medium italic max-w-xs text-right">"Elegance is the only beauty that never fades."</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {BRANDS.map((brand, idx) => (
                            <Link href={brand.href} key={brand.id} className="group flex flex-col items-center animate-fade-in" style={{ animationDelay: `${idx * 200}ms` }}>
                                <div className="relative w-full aspect-[3/4] rounded-[64px] overflow-hidden mb-8 shadow-2xl">
                                    <Image
                                        src={brand.image}
                                        alt={brand.name}
                                        fill
                                        className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0"></div>
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2 italic translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{brand.name}</h3>
                                <p className="text-[10px] font-black text-pink-500 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity border-b-2 border-pink-100 pb-2">{brand.discount}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BeautyLandingPage;
