'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { clearCart } from '@/store/slices/cartSlice';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { CheckCircle, ArrowLeft, ShieldCheck, Truck, CreditCard, ChevronRight, MapPin, Package, ArrowRight, Lock, ShoppingBag } from 'lucide-react';
import { createOrder } from '@/services/api';
import Image from 'next/image';

const Checkout = () => {
    const { items, totalAmount } = useSelector((state: RootState) => state.cart);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!user && step !== 'confirmation') {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center animate-fade-in">
                <div className="bg-white p-12 rounded-[40px] shadow-xl border border-gray-50 max-w-xl mx-auto">
                    <div className="bg-pink-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Lock className="w-10 h-10 text-pink-500" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4 italic uppercase">SECURE <span className="text-pink-600">CHECKOUT</span></h2>
                    <p className="text-gray-400 font-medium mb-12">Please sign in to your account to continue with your purchase and enjoy a personalized experience.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/login" className="flex-1">
                            <Button className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-2xl font-black tracking-widest uppercase text-xs">Sign In</Button>
                        </Link>
                        <Link href="/register" className="flex-1">
                            <Button variant="outline" className="w-full border-2 border-black hover:bg-black hover:text-white py-4 rounded-2xl font-black tracking-widest uppercase text-xs">Join StyleNest</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (items.length === 0 && step !== 'confirmation') {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center animate-fade-in">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <ShoppingBag className="w-10 h-10 text-gray-300" />
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-4 italic uppercase">BAG IS <span className="text-pink-600">EMPTY</span></h2>
                <p className="text-gray-400 font-medium mb-10">You haven't added any masterpieces to your collection yet.</p>
                <Link href="/products">
                    <Button className="bg-black hover:bg-gray-800 text-white px-12 py-4 rounded-full font-black tracking-widest uppercase text-xs">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        try {
            await createOrder({
                items: items.map(i => ({
                    id: i.id,
                    title: i.title,
                    price: i.price,
                    quantity: i.quantity,
                    thumbnail: i.thumbnail
                })),
                totalAmount,
                shippingAddress: {
                    name: `${user?.firstName} ${user?.lastName}`,
                    email: user?.email
                }
            });
            // Simulate a slight delay for premium feel
            setTimeout(() => {
                dispatch(clearCart());
                setStep('confirmation');
                setIsProcessing(false);
            }, 1500);
        } catch (error) {
            alert('Failed to place order');
            setIsProcessing(false);
        }
    };

    if (step === 'confirmation') {
        return (
            <div className="min-h-screen bg-[#fcfcfc] py-20 animate-fade-in">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="mb-12 relative flex justify-center">
                        <div className="bg-green-500 w-24 h-24 rounded-full flex items-center justify-center z-10 shadow-2xl shadow-green-200">
                            <CheckCircle className="h-12 w-12 text-white" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-50 rounded-full animate-ping opacity-20"></div>
                    </div>

                    <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tighter uppercase italic">
                        ORDER <span className="text-pink-600">CONFIRMED</span>
                    </h1>
                    <p className="text-gray-400 font-medium text-lg mb-16 max-w-lg mx-auto leading-relaxed">
                        A confirmation email has been sent to <span className="text-gray-900 font-bold">{user?.email}</span>. Your pieces are being prepared for shipment.
                    </p>

                    <div className="bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden text-left mb-16">
                        <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Receipt Number</p>
                                <p className="text-xl font-black text-gray-900 tracking-tight">#TRND-{Math.floor(Math.random() * 1000000)}</p>
                            </div>
                            <div className="text-md-right">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Arrival</p>
                                <p className="text-xl font-black text-pink-600 tracking-tight italic">3-5 Business Days</p>
                            </div>
                        </div>

                        <div className="p-10 bg-gray-50/50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 px-1 border-l-2 border-pink-500">Shipping Details</h3>
                                    <div className="bg-white p-6 rounded-2xl border border-white shadow-sm">
                                        <p className="font-black text-gray-900 uppercase mb-1">{user?.firstName} {user?.lastName}</p>
                                        <p className="text-sm text-gray-500 font-medium">123 Fashion Street, Suite 500<br />New York, NY 10001</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 px-1 border-l-2 border-pink-500">Amount Paid</h3>
                                    <div className="bg-white p-6 rounded-2xl border border-white shadow-sm flex items-center justify-between">
                                        <span className="text-sm text-gray-500 font-medium italic">Total (Incl. Tax)</span>
                                        <span className="text-3xl font-black text-gray-900 italic">${totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/orders">
                            <Button className="w-full sm:w-auto px-12 py-5 bg-black text-white rounded-full font-black tracking-widest uppercase text-xs shadow-xl active:scale-95 transition-all">Track Order</Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline" className="w-full sm:w-auto px-12 py-5 border-2 border-black hover:bg-black hover:text-white rounded-full font-black tracking-widest uppercase text-xs active:scale-95 transition-all">Back to Home</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#fcfcfc] min-h-screen">
            {/* Minimal Header */}
            <div className="bg-white border-b border-gray-50 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <Link href="/cart" className="flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-black transition-colors uppercase tracking-widest group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Bag
                    </Link>
                    <Image src="/logo.svg" alt="StyleNest" width={130} height={52} className="h-[42px] w-auto" />
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Secure Payment</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16">
                    {/* Left Side: Checkout Form */}
                    <div className="lg:col-span-7 space-y-10">
                        <section className="bg-white rounded-[32px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 font-black">1</div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic underline decoration-pink-500/20 underline-offset-8">Shipping <span className="text-pink-600">Address</span></h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                                    <input type="text" className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-pink-500/30 focus:ring-4 focus:ring-pink-500/5 p-4 rounded-2xl text-gray-900 font-bold transition-all" defaultValue={user?.firstName || ''} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                                    <input type="text" className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-pink-500/30 focus:ring-4 focus:ring-pink-500/5 p-4 rounded-2xl text-gray-900 font-bold transition-all" defaultValue={user?.lastName || ''} />
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Company (Optional)</label>
                                    <input type="text" className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-pink-500/30 focus:ring-4 focus:ring-pink-500/5 p-4 rounded-2xl text-gray-900 font-bold transition-all" placeholder="Pikkol Tech" />
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Street Address</label>
                                    <input type="text" className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-pink-500/30 focus:ring-4 focus:ring-pink-500/5 p-4 rounded-2xl text-gray-900 font-bold transition-all" placeholder="House number and street name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                                    <input type="text" className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-pink-500/30 focus:ring-4 focus:ring-pink-500/5 p-4 rounded-2xl text-gray-900 font-bold transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Postcode / ZIP</label>
                                    <input type="text" className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-pink-500/30 focus:ring-4 focus:ring-pink-500/5 p-4 rounded-2xl text-gray-900 font-bold transition-all" />
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-[32px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 opacity-60 grayscale-[0.5]">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 font-black">2</div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase italic">Payment <span className="text-gray-400">Method</span></h2>
                            </div>
                            <div className="p-8 border-2 border-dashed border-gray-100 rounded-[24px] text-center">
                                <CreditCard className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                                <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Secured Payment Processing</p>
                                <p className="text-xs text-gray-300 mt-1 italic font-medium">Payment details will be requested in the next step</p>
                            </div>
                        </section>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:col-span-5 mt-16 lg:mt-0">
                        <div className="sticky top-10 space-y-8">
                            <div className="bg-black text-white rounded-[32px] p-10 shadow-2xl overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500 rounded-full blur-[100px] -mr-32 -mt-32 opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>

                                <div className="relative">
                                    <h2 className="text-xl font-black uppercase italic tracking-tighter mb-10 border-b border-white/10 pb-6">YOUR <span className="text-pink-500">ORDER</span></h2>

                                    <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar space-y-6 mb-10">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex justify-between items-start gap-4">
                                                <div className="flex gap-4">
                                                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/10 relative">
                                                        <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                                                        <div className="absolute -top-2 -right-2 bg-pink-500 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-black">{item.quantity}</div>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-black uppercase text-white/90 truncate max-w-[140px] leading-tight">{item.title}</p>
                                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">{item.brand}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-black italic text-pink-500">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4 pt-6 border-t border-white/10">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                                            <span>Subtotal</span>
                                            <span className="text-white font-black italic">${totalAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                                            <span>Shipping</span>
                                            <span className="text-green-400 font-black italic">FREE</span>
                                        </div>
                                        <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                                            <span className="text-sm font-black uppercase tracking-widest italic">Total Due</span>
                                            <span className="text-3xl font-black text-pink-500 italic">${totalAmount.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handlePlaceOrder}
                                        disabled={isProcessing}
                                        className="w-full mt-10 bg-white hover:bg-pink-50 text-black py-5 rounded-2xl font-black tracking-[0.2em] shadow-xl active:scale-95 transition-all text-xs flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-wait"
                                    >
                                        {isProcessing ? 'PROCESSING...' : (
                                            <>
                                                COMPLETE PURCHASE
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </Button>

                                    <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
                                        <Lock className="w-3 h-3" />
                                        Encrypted Checkout
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center gap-2">
                                    <Truck className="w-6 h-6 text-pink-500" />
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Express Shipping</span>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center gap-2">
                                    <CheckCircle className="w-6 h-6 text-pink-500" />
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Curated Quality</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
