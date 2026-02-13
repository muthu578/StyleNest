'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '@/services/api';
import { Product } from '@/types';
import Button from '@/components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import Image from 'next/image';
import { Loader2, Star, ShoppingBag, Truck, ShieldCheck, Heart, ArrowLeft, Share2, Sparkles, Ruler, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [activeTab, setActiveTab] = useState('description');

    const isWishlisted = product ? wishlistItems.some(item => item.id === product.id) : false;

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(Number(id));
                setProduct(data);
                setSelectedImage(data.thumbnail);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart(product));
        }
    };

    const handleToggleWishlist = () => {
        if (product) {
            dispatch(toggleWishlist(product));
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-vh-screen py-40">
                <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
                <p className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Revealing Excellence...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-40">
                <h2 className="text-4xl font-black text-gray-900 uppercase italic mb-4 tracking-tighter">Piece Not Found</h2>
                <Link href="/products" className="text-pink-600 font-bold uppercase tracking-widest text-xs hover:underline underline-offset-8">Return to Collection</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-24 pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-4 mb-12 animate-fade-in">
                    <Link href="/products" className="p-2 hover:bg-gray-50 rounded-full transition-colors group">
                        <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-black" />
                    </Link>
                    <div className="h-[1px] w-8 bg-gray-100"></div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        {product.category} / <span className="text-black">{product.title}</span>
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-16 xl:gap-24">
                    {/* Left Side: Dynamic Gallery */}
                    <div className="lg:col-span-7 space-y-8 animate-slide-right">
                        <div className="relative aspect-[3/4] rounded-[40px] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl group cursor-zoom-in">
                            <Image
                                src={selectedImage || product.thumbnail}
                                alt={product.title}
                                fill
                                className="object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                                priority
                            />
                            {product.discountPercentage > 0 && (
                                <div className="absolute top-8 left-8 bg-black text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
                                    -{Math.round(product.discountPercentage)}% Exclusive
                                </div>
                            )}
                            <button className="absolute top-8 right-8 p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-4 gap-6">
                            {product.images?.slice(0, 4).map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    className={`aspect-[3/4] relative rounded-3xl overflow-hidden bg-gray-50 border-4 transition-all duration-500 transform ${selectedImage === img
                                        ? 'border-pink-500 scale-95 shadow-lg shadow-pink-500/10'
                                        : 'border-transparent hover:scale-105'
                                        }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.title} ${idx + 1}`}
                                        fill
                                        className="object-cover object-center"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Sophisticated Info */}
                    <div className="lg:col-span-5 mt-16 sm:mt-20 lg:mt-0 animate-slide-left" style={{ animationDelay: '200ms' }}>
                        <div className="sticky top-24 space-y-12">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="w-4 h-4 text-pink-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500">Essential Collection</span>
                                </div>
                                <h1 className="text-6xl font-black text-gray-900 leading-[0.9] tracking-tighter uppercase italic">
                                    {product.title}
                                </h1>
                                <div className="flex items-center gap-6 pt-2">
                                    <p className="text-lg font-bold text-gray-400 uppercase tracking-widest">{product.brand}</p>
                                    <div className="h-4 w-[1px] bg-gray-200"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-pink-500 fill-current' : 'text-gray-200'}`} />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-black text-gray-900 tracking-widest uppercase">{product.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 rounded-[40px] bg-black text-white relative overflow-hidden shadow-2xl group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full"></div>
                                <div className="relative z-10 space-y-8">
                                    <div className="flex items-end gap-4">
                                        <span className="text-5xl font-black italic tracking-tighter">${product.price}</span>
                                        {product.discountPercentage > 0 && (
                                            <span className="text-xl text-white/30 line-through pb-1.5 font-bold">
                                                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                                            <Truck className="w-4 h-4 text-pink-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Global Express</span>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                                            <ShieldCheck className="w-4 h-4 text-green-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Authentic Piece</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <Button
                                            onClick={handleAddToCart}
                                            className="grow bg-white hover:bg-pink-50 text-black border-none rounded-2xl py-6 font-black tracking-[0.2em] text-[10px] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-4"
                                        >
                                            RESERVE FOR SHIPMENT
                                            <ShoppingBag className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            onClick={handleToggleWishlist}
                                            className={`w-16 h-16 rounded-2xl border-none transition-all flex items-center justify-center bg-white/5 hover:bg-white/10 ${isWishlisted ? 'text-pink-500' : 'text-white'}`}
                                        >
                                            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-8 border-b border-gray-100 pb-4">
                                    {['description', 'details', 'shipping'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`text-[10px] font-black uppercase tracking-widest pb-1 transition-all relative ${activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
                                        >
                                            {tab}
                                            {activeTab === tab && <div className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-pink-500"></div>}
                                        </button>
                                    ))}
                                </div>
                                <div className="text-sm text-gray-500 font-medium leading-[1.8] min-h-[100px] animate-fade-in">
                                    {activeTab === 'description' && product.description}
                                    {activeTab === 'details' && (
                                        <ul className="space-y-4">
                                            <li className="flex justify-between border-b border-gray-50 pb-2">
                                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Material</span>
                                                <span className="font-bold text-black">Luxury Blend</span>
                                            </li>
                                            <li className="flex justify-between border-b border-gray-50 pb-2">
                                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Care</span>
                                                <span className="font-bold text-black">Dry Clean Only</span>
                                            </li>
                                        </ul>
                                    )}
                                    {activeTab === 'shipping' && "Complimentary global shipping on all Trendora Signature pieces. Estimated delivery in 3-5 business days."}
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-between p-6 rounded-3xl border-2 border-dashed border-gray-100 hover:border-pink-500/20 hover:bg-pink-50/10 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                                        <Ruler className="w-4 h-4 text-gray-400 group-hover:text-pink-500" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">Virtual Fitting Room</p>
                                        <p className="text-[8px] font-medium text-gray-500 uppercase tracking-widest">Find your perfect match</p>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                    <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-black" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ProductPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="h-10 w-10 animate-spin text-pink-500" />
            </div>
        }>
            <ProductDetail />
        </Suspense>
    );
}
