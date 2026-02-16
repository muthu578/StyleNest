'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Heart, Sparkles, FolderHeart } from 'lucide-react';

const WishlistPage = () => {
    const { items } = useSelector((state: RootState) => state.wishlist);

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center animate-fade-in">
                <div className="mb-10 flex justify-center">
                    <div className="bg-white p-10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative border border-gray-50">
                        <Heart className="h-16 w-16 text-gray-100" />
                        <div className="absolute top-0 right-0 bg-pink-500 w-6 h-6 rounded-full border-4 border-white animate-pulse"></div>
                    </div>
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-4 italic tracking-tight uppercase tracking-tighter">Your <span className="text-pink-600">Wishlist</span> is empty</h2>
                <p className="text-gray-500 mb-12 max-w-sm mx-auto font-medium leading-relaxed">Save the pieces you love and they'll appear here. Your personal collection starts with one click.</p>
                <Link href="/products">
                    <Button size="lg" className="bg-black hover:bg-gray-800 text-white rounded-full px-12 py-4 font-bold tracking-[0.2em] shadow-xl transition-all active:scale-95 uppercase text-xs">
                        Start Your Collection
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#fcfcfc] min-h-screen">
            {/* Elegant Header */}
            <div className="bg-white border-b border-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[10px] font-black text-pink-600 uppercase tracking-[0.3em]">
                                <FolderHeart className="w-4 h-4" />
                                <span>Personal Collection</span>
                            </div>
                            <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic uppercase">
                                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 not-italic underline decoration-pink-500/20 underline-offset-8">Wishlist</span>
                            </h1>
                            <p className="text-gray-400 font-medium max-w-md">A curated gallery of your favorite pieces and future additions to your wardrobe.</p>
                        </div>
                        <div className="flex items-center gap-6 pb-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Items Saved</p>
                                <p className="text-2xl font-black text-gray-900 italic leading-none">{items.length}</p>
                            </div>
                            <Link href="/products" className="flex items-center gap-2 text-xs font-black text-gray-900 hover:text-pink-600 transition-colors uppercase tracking-[0.2em] group border-b-2 border-transparent hover:border-pink-500/20 pb-1">
                                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                Explore New
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {items.map((product, index) => (
                        <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Bottom Call to Action */}
                <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col items-center text-center">
                    <div className="max-w-xl">
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic mb-4">WANT TO SEE <span className="text-pink-600">MORE?</span></h3>
                        <p className="text-gray-400 font-medium text-sm mb-10">Our spring collection has just arrived with over 500+ new pieces curated just for you.</p>
                        <Link href="/products">
                            <Button variant="outline" className="rounded-full px-10 py-4 border-2 border-black hover:bg-black hover:text-white transition-all font-black text-xs tracking-widest uppercase">
                                View New Arrivals
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
