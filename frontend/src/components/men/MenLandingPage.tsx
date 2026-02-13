'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, ArrowRight, Sparkles, TrendingUp, Star, MoveUpRight, Zap, Loader2, Anchor } from 'lucide-react';
import { getProducts } from '@/services/api';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

const BRANDS = [
    {
        id: 1,
        name: 'U.S. POLO ASSN.',
        discount: '30-60% Off',
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-blue-900',
        href: '/products?category=men'
    },
    {
        id: 2,
        name: 'LEVIS',
        discount: 'Flat 40% Off',
        image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-red-600',
        href: '/products?category=men'
    },
    {
        id: 3,
        name: 'TOMMY HILFIGER',
        discount: 'Up To 50% Off',
        image: 'https://images.pexels.com/photos/1040851/pexels-photo-1040851.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-blue-800',
        href: '/products?category=men'
    },
    {
        id: 4,
        name: 'BENETTON',
        discount: 'Min. 40% Off',
        image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=format&fit=crop&w=1000',
        color: 'text-green-600',
        href: '/products?category=men'
    },
];

const CATEGORIES = [
    { name: 'T-Shirts', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Casual Shirts', image: 'https://images.pexels.com/photos/1040851/pexels-photo-1040851.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Jeans', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Trousers', image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Sports Shoes', image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Watches', image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=format&fit=crop&w=800' },
];

const MenLandingPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts('men');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching men products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="bg-white min-h-screen pb-32">
            {/* Immersive Hero Header */}
            <section className="relative h-[85vh] w-full mt-20 overflow-hidden bg-black group">
                <Image
                    src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=format&fit=crop&w=1920&q=80"
                    alt="Men's Collection"
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[3s] ease-out opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
                {/* Header Vignette */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none"></div>

                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                    <div className="max-w-2xl space-y-8 animate-fade-in">
                        <div className="flex items-center gap-3">
                            <Anchor className="w-5 h-5 text-orange-400 fill-current" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-400">The Modern Voyager</span>
                        </div>
                        <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                            Urban <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400 not-italic">Edge</span>
                        </h1>
                        <p className="text-gray-400 text-lg font-medium max-w-md leading-relaxed border-l-4 border-orange-400 pl-6 py-4 bg-white/5 backdrop-blur-sm rounded-r-2xl">
                            Precision tailoring meets contemporary streetwear. Discover the pieces defining the next generation of masculinity.
                        </p>
                        <div className="flex gap-6 pt-4">
                            <button className="bg-white hover:bg-orange-50 text-black px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95 group/btn flex items-center gap-2">
                                EXPLORE DEPOT
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute bottom-12 right-12 hidden md:block animate-fade-in" style={{ animationDelay: '1s' }}>
                    <div className="p-8 rounded-[40px] bg-white/5 backdrop-blur-2xl border border-white/10 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
                                <TrendingUp className="w-6 h-6 text-black" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">Trending Now</p>
                                <p className="text-lg font-black text-white italic">+142% Volume</p>
                            </div>
                        </div>
                        <div className="h-[1px] w-full bg-white/10"></div>
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest leading-relaxed">Curated by our <br /> global style council.</p>
                    </div>
                </div>
            </section>

            {/* Core Categories */}
            <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-orange-400">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Masterpieces</span>
                        </div>
                        <h2 className="text-6xl font-black text-gray-900 tracking-tighter uppercase italic">
                            The <span className="text-orange-400">Blueprint</span>
                        </h2>
                    </div>
                    <p className="text-gray-400 text-sm font-medium italic max-w-xs text-right">"Style is a way to say who you are without having to speak."</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-10">
                    {CATEGORIES.map((cat, idx) => (
                        <Link href="#" key={idx} className="group flex flex-col items-center animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="relative w-full aspect-[4/5] rounded-[48px] overflow-hidden bg-gray-50 border-4 border-transparent group-hover:border-orange-400/20 transition-all duration-700 shadow-2xl shadow-gray-200/50 group-hover:shadow-orange-500/10">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity"></div>
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <span className="text-[8px] font-black text-white uppercase tracking-widest">Explore</span>
                                    <MoveUpRight className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <span className="mt-8 text-[10px] font-black text-gray-400 group-hover:text-black uppercase tracking-[0.4em] transition-colors">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Brand Powerhouses */}
            <section className="py-32 bg-black text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center space-y-6 mb-24">
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] text-orange-400">Exclusive Portfolio</span>
                        <h2 className="text-6xl font-black text-white tracking-tighter uppercase italic">Institutional <span className="text-orange-400">Giants</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {BRANDS.map((brand, idx) => (
                            <Link href={brand.href} key={brand.id} className="group relative aspect-[3/4] rounded-[56px] overflow-hidden animate-fade-in border border-white/5" style={{ animationDelay: `${idx * 200}ms` }}>
                                <Image
                                    src={brand.image}
                                    alt={brand.name}
                                    fill
                                    className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                                    <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{brand.name}</h3>
                                    <div className="h-[2px] w-0 bg-orange-400 group-hover:w-full transition-all duration-700 mb-6"></div>
                                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity delay-300">{brand.discount}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Curated Feed */}
            <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-orange-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">The Daily Drop</span>
                        </div>
                        <h2 className="text-6xl font-black text-gray-900 tracking-tighter uppercase italic">Curated <br /> <span className="text-orange-400 not-italic">Intel</span></h2>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">New Items Weekly</p>
                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest italic">Always authentic</p>
                        </div>
                        <button className="p-6 rounded-full bg-gray-50 hover:bg-orange-50 transition-colors group">
                            <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-orange-400 transition-all" />
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="py-40 flex flex-col items-center gap-6">
                        <Loader2 className="h-12 w-12 animate-spin text-orange-400" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Calibrating Quality...</p>
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

            {/* Final CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-32">
                <div className="relative h-[500px] rounded-[80px] overflow-hidden group">
                    <Image
                        src="https://images.pexels.com/photos/1040851/pexels-photo-1040851.jpeg?auto=format&fit=crop&w=1920"
                        alt="Join VIP"
                        fill
                        className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[4s]"
                    />
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-12 space-y-10">
                        <h2 className="text-6xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">Style <br /> <span className="text-orange-400 not-italic">Sovereignty</span></h2>
                        <p className="text-gray-300 text-lg font-medium italic max-w-xl">Join the inner circle. Be the first to secure limited drops and exclusive collaborations.</p>
                        <button className="bg-orange-400 hover:bg-orange-500 text-black px-12 py-6 rounded-full font-black text-[10px] uppercase tracking-[0.4em] transition-all active:scale-95 shadow-2xl shadow-orange-500/20">
                            SECURE ACCESS
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MenLandingPage;
