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
        image: 'https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=format&fit=crop&w=1000',
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
        image: 'https://images.pexels.com/photos/3722814/pexels-photo-3722814.jpeg?auto=format&fit=crop&w=1000',
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

const CATEGORIES = [
    { name: 'Makeup', image: 'https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Skincare', image: 'https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Haircare', image: 'https://images.pexels.com/photos/3722814/pexels-photo-3722814.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Fragrances', image: 'https://images.pexels.com/photos/1961791/pexels-photo-1961791.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Bath & Body', image: 'https://images.pexels.com/photos/3951783/pexels-photo-3951783.jpeg?auto=format&fit=crop&w=800' },
    { name: "Men's Grooming", image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=format&fit=crop&w=800' },
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
                    src="https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=format&fit=crop&w=1920&q=80"
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

                {/* Floating Elements */}
                <div className="absolute bottom-12 right-12 hidden md:block animate-fade-in" style={{ animationDelay: '1s' }}>
                    <div className="bg-white/40 backdrop-blur-xl p-10 rounded-[48px] border border-white/60 shadow-2xl">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center border border-pink-100 italic font-serif text-2xl text-pink-400">P</div>
                            <div>
                                <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Pure Ingredients</p>
                                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest italic">Ethically Sourced</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Aesthetic Categories */}
            <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center space-y-4 mb-24">
                    <div className="flex items-center gap-2 text-pink-400">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">The Sensory Edit</span>
                    </div>
                    <h2 className="text-6xl font-black text-gray-900 tracking-tighter uppercase italic">
                        By <span className="text-pink-400">Ritual</span>
                    </h2>
                    <div className="w-24 h-[2px] bg-pink-100 mt-6"></div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-10">
                    {CATEGORIES.map((cat, idx) => (
                        <Link href="#" key={idx} className="group flex flex-col items-center animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="relative w-full aspect-[4/5] rounded-[56px] overflow-hidden bg-white border-4 border-transparent group-hover:border-pink-200/50 transition-all duration-700 shadow-2xl shadow-gray-200/50 group-hover:shadow-pink-500/10">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/20 flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <MoveUpRight className="w-4 h-4 text-white" />
                                </div>
                            </div>
                            <span className="mt-8 text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-[0.4em] transition-colors">{cat.name}</span>
                        </Link>
                    ))}
                </div>
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

            {/* Discovery Grid */}
            <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 pb-12 border-b border-gray-100">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-gray-900" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-900">Recommended Drops</span>
                        </div>
                        <h2 className="text-6xl font-black text-gray-900 tracking-tighter uppercase italic">Curated <br /> <span className="text-pink-400 not-italic">Lustre</span></h2>
                    </div>
                    <button className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all group">
                        VIEW ENTIRE TROVE
                        <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-pink-400 group-hover:bg-pink-50 transition-all">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </button>
                </div>

                {loading ? (
                    <div className="py-40 flex flex-col items-center gap-8">
                        <Loader2 className="h-12 w-12 animate-spin text-pink-400" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Sourcing Rare Essences...</p>
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

            {/* VIP Invitation */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-32">
                <div className="relative h-[600px] rounded-[100px] overflow-hidden group">
                    <Image
                        src="https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=format&fit=crop&w=1920"
                        alt="Join VIP"
                        fill
                        className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[4s]"
                    />
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-20 space-y-12">
                        <h2 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.9] italic tracking-tighter uppercase">The Circle of <br /> <span className="text-pink-400 not-italic">Beauty</span></h2>
                        <p className="text-gray-600 text-lg font-medium italic max-w-xl">Join our elite skincare circle. Exclusive access to masterclasses, early releases, and personalized skin consultations.</p>
                        <button className="bg-gray-900 hover:bg-black text-white px-16 py-7 rounded-full font-black text-[10px] uppercase tracking-[0.4em] transition-all active:scale-95 shadow-2xl">
                            BECOME A MEMBER
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BeautyLandingPage;
