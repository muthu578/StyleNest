'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bell, ArrowRight, Sparkles, TrendingUp, Star, MoveUpRight, Zap, Loader2, Heart } from 'lucide-react';
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

const CATEGORIES = [
    { name: 'Boys Clothing', image: 'https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Girls Clothing', image: 'https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Infant Wear', image: 'https://images.pexels.com/photos/3662839/pexels-photo-3662839.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Footwear', image: 'https://images.pexels.com/photos/1619702/pexels-photo-1619702.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Party Wear', image: 'https://images.pexels.com/photos/1484439/pexels-photo-1484439.jpeg?auto=format&fit=crop&w=800' },
    { name: 'Co-ord Sets', image: 'https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?auto=format&fit=crop&w=800' },
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

                {/* Performance Badge */}
                <div className="absolute bottom-12 right-12 hidden md:block animate-fade-in" style={{ animationDelay: '1s' }}>
                    <div className="bg-white/60 backdrop-blur-md border border-white/40 p-10 rounded-[48px] shadow-2xl shadow-blue-500/5">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                    <Star className="w-5 h-5 text-white fill-current" />
                                </div>
                                <div>
                                    <p className="text-[14px] font-black text-gray-900 uppercase tracking-tighter">Premium Comfort</p>
                                    <p className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">Certified Fabrics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Joyful Categories */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-2 text-blue-500">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Magic in Every Stitch</span>
                        </div>
                        <h2 className="text-6xl font-black text-gray-900 tracking-tighter uppercase italic">
                            Little <span className="text-pink-500">Wardrobe</span>
                        </h2>
                    </div>
                    <p className="text-gray-400 text-sm font-medium italic max-w-xs text-center md:text-right">"Children see magic because they look for it."</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
                    {CATEGORIES.map((cat, idx) => (
                        <Link href="#" key={idx} className="group flex flex-col items-center animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="relative w-full aspect-square rounded-[48px] overflow-hidden bg-white border-4 border-transparent group-hover:border-blue-300/30 transition-all duration-700 shadow-xl shadow-gray-200/50 group-hover:shadow-blue-500/10">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border border-white/20 flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <MoveUpRight className="w-4 h-4 text-gray-900" />
                                </div>
                            </div>
                            <span className="mt-8 text-[10px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-[0.4em] transition-colors">{cat.name}</span>
                        </Link>
                    ))}
                </div>
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

            {/* Discovery Feed */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 pb-12 border-b border-gray-100">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-gray-900" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-900">Trending Now</span>
                        </div>
                        <h2 className="text-6xl font-black text-gray-900 tracking-tighter uppercase italic">Little <br /> <span className="text-blue-500 not-italic">Luxe</span></h2>
                    </div>
                    <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-900 hover:text-blue-500 transition-colors group">
                        VIEW ENTIRE CLOSET
                        <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-50 transition-all">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </button>
                </div>

                {loading ? (
                    <div className="py-40 flex flex-col items-center gap-6">
                        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Unboxing Joy...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-20">
                        {products.map((product, index) => (
                            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Newsletter/Membership */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-24">
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-[80px] p-20 md:p-32 relative overflow-hidden group text-center">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

                    <div className="relative z-10 max-w-3xl mx-auto space-y-12">
                        <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] italic tracking-tighter uppercase">Join the <br /> <span className="text-pink-500 not-italic">Junior Elite</span></h2>
                        <p className="text-gray-400 text-lg font-medium italic">Unlock early access to festive collections, birthday surprises, and personal shopping for your little ones.</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="ENTER EMAIL FOR ADVENTURE"
                                className="bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white text-[10px] uppercase font-black focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all flex-grow placeholder:text-gray-600"
                            />
                            <button className="bg-white hover:bg-pink-50 text-black px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all">
                                JOIN
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default KidsLandingPage;
