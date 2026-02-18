'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MoveUpRight, Sparkles } from 'lucide-react';

const CATEGORIES = [
    { name: 'Men', href: '/products?category=men', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=format&fit=crop&w=800', count: '120+' },
    { name: 'Women', href: '/products?category=women', image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=format&fit=crop&w=800', count: '450+' },
    { name: 'Kids', href: '/products?category=kids', image: 'https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=format&fit=crop&w=800', count: '80+' },
    { name: 'Home', href: '/products?category=home', image: 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=format&fit=crop&w=800', count: '200+' },
    { name: 'Beauty', href: '/products?category=beauty', image: 'https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=format&fit=crop&w=800', count: '150+' },
    { name: 'Accessories', href: '/products?category=accessories', image: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=format&fit=crop&w=800', count: '300+' },
];

const CategoryShowcase = () => {
    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-[#818CF8]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#94A3B8]">Curated Collections</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black text-[#0F172A] tracking-tighter italic uppercase">
                            Aura of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#F472B6] to-[#2DD4BF] not-italic">Style</span>
                        </h2>
                    </div>
                    <Link href="/products" className="group flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0F172A] transition-all">
                        VIEW ENTIRE ARCHIVE
                        <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-[#818CF8] group-hover:bg-[#818CF8]/5 transition-all">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
                    {CATEGORIES.map((category, idx) => (
                        <Link
                            key={category.name}
                            href={category.href}
                            aria-label={`Shop ${category.name} collection`}
                            className="group relative flex flex-col animate-fade-in"
                            style={{ animationDelay: `${idx * 150}ms` }}
                        >
                            <div className="relative w-full aspect-[3/4] rounded-[48px] overflow-hidden bg-gray-50 border border-transparent group-hover:border-[#818CF8]/20 transition-all duration-700 shadow-2xl shadow-gray-200/50 group-hover:shadow-[#818CF8]/10">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <p className="text-[8px] font-black text-white/60 uppercase tracking-[0.4em] mb-2">{category.count} items</p>
                                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center ml-auto group-hover:border-[#2DD4BF]/50">
                                            <MoveUpRight className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 space-y-2 pl-4">
                                <h3 className="text-lg font-black text-[#0F172A] uppercase italic tracking-tighter group-hover:text-[#818CF8] transition-colors">
                                    {category.name}
                                </h3>
                                <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#818CF8] to-[#2DD4BF] transition-all duration-500"></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
