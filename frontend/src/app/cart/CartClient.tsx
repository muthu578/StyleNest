'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import Image from 'next/image';

const CartPage = () => {
    const { items, totalAmount, totalQuantity } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center animate-fade-in">
                <div className="mb-10 flex justify-center">
                    <div className="bg-gray-50 p-10 rounded-full relative">
                        <ShoppingBag className="h-16 w-16 text-gray-200" />
                        <div className="absolute top-0 right-0 bg-pink-500 w-6 h-6 rounded-full border-4 border-white animate-bounce-slow"></div>
                    </div>
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-4 italic tracking-tight uppercase">YOUR BAG IS <span className="text-pink-600">EMPTY</span></h2>
                <p className="text-gray-500 mb-12 max-w-sm mx-auto font-medium leading-relaxed">It looks like you haven't made any selections yet. Your next look is waiting for you.</p>
                <Link href="/products">
                    <Button size="lg" className="bg-black hover:bg-gray-800 text-white rounded-full px-12 py-4 font-bold tracking-widest shadow-xl transition-all active:scale-95">
                        EXPLORE THE COLLECTION
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#fcfcfc] min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 border-b border-gray-100 pb-10">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold text-pink-600 uppercase tracking-[0.2em]">
                            <ShoppingBag className="w-3 h-3" />
                            <span>Shopping Cart</span>
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight italic">
                            YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 not-italic">SELECTIONS</span>
                        </h1>
                        <p className="text-gray-400 font-medium">You have {totalQuantity} masterpieces in your bag.</p>
                    </div>
                    <Link href="/products" className="hidden lg:flex items-center gap-2 text-xs font-black text-gray-400 hover:text-black transition-colors uppercase tracking-[0.2em] group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Continue Shopping
                    </Link>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-16">
                    {/* Items Section */}
                    <div className="lg:col-span-8">
                        <div className="space-y-8">
                            {items.map((item) => (
                                <div key={item.id} className="group bg-white rounded-[24px] p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-pink-100 transition-all duration-500 animate-fade-in">
                                    <div className="flex flex-col sm:flex-row gap-8">
                                        <div className="h-48 w-40 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-50 border border-gray-50 relative group-hover:shadow-lg transition-all duration-300">
                                            <Image
                                                src={item.thumbnail || 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=format&fit=crop&w=800'}
                                                alt={item.title}
                                                fill
                                                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>

                                        <div className="flex-grow flex flex-col justify-between py-2">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h3 className="text-xl font-black text-gray-900 tracking-tight leading-none group-hover:text-pink-600 transition-colors uppercase italic underline-offset-4 cursor-pointer">
                                                            <Link href={`/products/${item.id}`}>{item.title}</Link>
                                                        </h3>
                                                        <p className="mt-2 text-xs font-black text-gray-400 uppercase tracking-widest">{item.brand}</p>
                                                    </div>
                                                    <p className="text-xl font-black text-gray-900 italic">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>

                                                <div className="mt-6 flex flex-wrap gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-green-500" /> Authentic</span>
                                                    <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-pink-500" /> Fast Delivery</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-8">
                                                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100 shadow-inner">
                                                    <button
                                                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                                                        className="p-2 hover:bg-white hover:text-black text-gray-400 rounded-lg transition-all disabled:opacity-20"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="px-5 font-black text-gray-900 text-sm leading-none">{item.quantity}</span>
                                                    <button
                                                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                                        className="p-2 hover:bg-white hover:text-black text-gray-400 rounded-lg transition-all"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => dispatch(removeFromCart(item.id))}
                                                    className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest group/del"
                                                >
                                                    <Trash2 className="h-4 w-4 transform group-hover/del:scale-110 group-active/del:scale-90 transition-transform" />
                                                    Remove Item
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="mt-16 lg:mt-0 lg:col-span-4">
                        <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sticky top-24 overflow-hidden relative group">
                            {/* Decorative Accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="relative">
                                <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-8 border-b border-gray-50 pb-4 italic">ORDER <span className="text-pink-600">SUMMARY</span></h2>

                                <div className="space-y-6 mb-10">
                                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                                        <span>Subtotal</span>
                                        <span className="text-gray-900 font-black italic text-base">${totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-black italic text-base">FREE</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                                        <span>Estimated Tax</span>
                                        <span className="text-gray-900 font-black italic text-base">$0.00</span>
                                    </div>
                                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                                        <span className="text-sm font-black text-gray-900 uppercase tracking-widest italic">Total</span>
                                        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">${totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Link href="/checkout">
                                    <Button className="w-full bg-black hover:bg-gray-800 text-white py-6 rounded-2xl font-black tracking-[0.2em] shadow-xl group/btn active:scale-[0.98] transition-all flex items-center justify-center gap-4 text-sm" size="lg">
                                        CHECKOUT NOW
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                                    </Button>
                                </Link>

                                <div className="mt-10 space-y-4">
                                    <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        <ShieldCheck className="w-4 h-4" />
                                        100% SECURE CHECKOUT
                                    </div>
                                    <p className="text-[10px] text-gray-400 text-center font-medium leading-relaxed px-4">
                                        Prices include all taxes. We guarantee your personal Information is never shared.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Extra Trust Badges */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 flex flex-col items-center text-center gap-2">
                                <RotateCcw className="w-5 h-5 text-gray-400" />
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">30 Days Returns</span>
                            </div>
                            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 flex flex-col items-center text-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-gray-400" />
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Secure Payments</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
