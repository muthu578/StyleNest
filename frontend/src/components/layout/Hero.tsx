'use client';

import Link from 'next/link';
import { ArrowRight, Play, Sparkles, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
    return (
        <div className="relative h-screen w-full bg-black mt-20 overflow-hidden group">
            {/* Immersive Editorial Background */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=format&fit=crop&w=1920&q=80"
                    alt="Trendora Haute Couture"
                    fill
                    className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-[4s] ease-out opacity-70"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                {/* Header Vignette */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Content Container */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                <div className="max-w-4xl space-y-12">
                    {/* Badge */}
                    <div className="flex items-center gap-4 animate-fade-in">
                        <div className="w-12 h-[1px] bg-gradient-to-r from-[#818CF8] to-[#2DD4BF]"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] to-[#2DD4BF]">
                            The 2026 Collection
                        </span>
                    </div>

                    {/* Main Heading with Luxe Overlay */}
                    <div className="space-y-6 animate-slide-up relative" style={{ animationDelay: '200ms' }}>
                        <div className="absolute -inset-x-12 -inset-y-6 bg-[#0F172A]/60 backdrop-blur-2xl rounded-[40px] -z-10 hidden md:block border border-white/5 shadow-[0_0_50px_rgba(129,140,248,0.1)]"></div>
                        <h1 className="text-8xl md:text-[160px] font-black text-white leading-[0.8] tracking-tighter uppercase italic">
                            Elegance <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#F472B6] to-[#2DD4BF] not-italic">Defined</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-2xl font-medium max-w-xl leading-relaxed pt-6 border-l-2 border-[#818CF8]/30 pl-8 bg-[#0F172A]/40 backdrop-blur-md rounded-r-3xl py-6">
                            Unveil the new season's most-coveted silhouettes. A selection that honors heritage while embracing the avant-garde future.
                        </p>
                    </div>

                    {/* CTA Actions */}
                    <div className="flex flex-col sm:flex-row gap-8 pt-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
                        <Link href="/products" aria-label="Explore products collection">
                            <button aria-label="Discover Pieces" className="group/btn bg-white hover:bg-[#F8FAFC] text-black px-12 py-6 rounded-full font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95 flex items-center gap-6">
                                DISCOVER PIECES
                                <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center group-hover/btn:bg-[#818CF8] transition-all group-hover/btn:translate-x-2">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </button>
                        </Link>
                        <button aria-label="Watch fashion film" className="flex items-center gap-6 group/video">
                            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover/video:border-[#818CF8] group-hover/video:bg-[#818CF8]/10 backdrop-blur-sm transition-all duration-700">
                                <Play className="w-5 h-5 text-white fill-current" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover/video:text-[#818CF8] transition-colors">Watch Film</span>
                                <span className="text-[8px] font-medium text-gray-500 uppercase tracking-widest">Paris Vogue '26</span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Glassmorphism Stats Card */}
                <div className="absolute bottom-20 right-8 md:right-12 hidden lg:block animate-fade-in" style={{ animationDelay: '1s' }}>
                    <div className="p-10 rounded-[60px] bg-[#0F172A]/20 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-center gap-12">
                        <div className="space-y-2 text-center">
                            <p className="text-4xl font-black text-white italic tracking-tighter">2.5k+</p>
                            <div className="flex items-center gap-2 justify-center">
                                <Sparkles className="w-3 h-3 text-[#2DD4BF]" />
                                <p className="text-[8px] font-black text-[#2DD4BF] uppercase tracking-widest">New Drops</p>
                            </div>
                        </div>
                        <div className="w-[1px] h-12 bg-white/10"></div>
                        <div className="space-y-2 text-center">
                            <p className="text-4xl font-black text-white italic tracking-tighter">45k</p>
                            <div className="flex items-center gap-2 justify-center">
                                <Users className="w-3 h-3 text-[#94A3B8]" />
                                <p className="text-[8px] font-black text-[#94A3B8] uppercase tracking-widest">Global Clients</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Interaction */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white">Scroll</span>
                <div className="relative w-[2px] h-16 bg-white/10 overflow-hidden rounded-full">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#818CF8] to-[#2DD4BF] animate-bounce"></div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
