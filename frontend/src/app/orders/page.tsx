'use client';

import { useEffect, useState } from 'react';
import { getOrders } from '@/services/api';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Search, ShoppingBag, ChevronRight, Package, Calendar, DollarSign, ExternalLink } from 'lucide-react';

const OrdersPage = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Loading your style history...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#fafafa] min-h-screen font-sans">
            {/* Elegant Header Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-pink-600 uppercase tracking-[0.2em]">
                                <ShoppingBag className="w-3 h-3" />
                                <span>Order History</span>
                            </div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight italic">
                                YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 not-italic">COLLECTION</span>
                            </h1>
                            <p className="text-gray-500 font-medium">Manage and track your premium fashion choices.</p>
                        </div>

                        <div className="flex items-center bg-gray-50 p-1.5 rounded-2xl border border-gray-100 focus-within:ring-2 focus-within:ring-pink-500/20 transition-all w-full md:w-96">
                            <Search className="ml-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Find an order..."
                                className="flex-grow bg-transparent border-none outline-none px-3 py-2 text-sm font-medium text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {orders.length === 0 ? (
                    <div className="bg-white p-20 rounded-[32px] text-center border border-gray-100 shadow-sm animate-fade-in">
                        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Package className="h-10 w-10 text-pink-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">No orders yet</h2>
                        <p className="text-gray-500 mb-10 max-w-xs mx-auto font-medium">Your exquisite collection is waiting to be started. Explore our latest arrivals today.</p>
                        <Link href="/products">
                            <Button size="lg" className="bg-black hover:bg-gray-800 text-white rounded-full px-12 py-4 font-bold tracking-wide shadow-xl transition-all active:scale-95">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {orders.map((order) => (
                            <div key={order.id} className="group animate-fade-in">
                                <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-pink-100 transition-all duration-500">
                                    {/* Premium Header */}
                                    <div className="bg-white px-8 py-6 border-b border-gray-50 flex flex-wrap items-center justify-between gap-6">
                                        <div className="flex flex-wrap gap-10">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Placed</p>
                                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                                    <Calendar className="w-4 h-4 text-pink-500" />
                                                    <span>{new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Amount</p>
                                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                                    <DollarSign className="w-4 h-4 text-green-500" />
                                                    <span>${order.totalAmount.toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order Status</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                                    <span className="text-gray-900 font-bold">{order.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Reference No.</p>
                                            <p className="font-mono text-xs font-bold text-gray-900 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">{order.id}</p>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8">
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                            <div className="lg:col-span-8 space-y-8">
                                                {order.items.map((item: any) => (
                                                    <div key={item.id} className="flex gap-6 items-start group/item">
                                                        <div className="relative h-32 w-28 flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 group-hover/item:shadow-lg transition-all duration-300">
                                                            <Image src={item.thumbnail} alt={item.title} fill className="object-cover transition-transform group-hover/item:scale-110" />
                                                        </div>
                                                        <div className="flex-grow pt-2">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h4 className="text-lg font-bold text-gray-900 leading-tight group-hover/item:text-pink-600 transition-colors">
                                                                    {item.title}
                                                                </h4>
                                                                <span className="text-gray-900 font-bold">${item.price.toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-6">
                                                                <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Qty: {item.quantity}</span>
                                                                <span>•</span>
                                                                <span className="text-gray-400">Order ID: {item.id}</span>
                                                            </div>
                                                            <div className="flex gap-3">
                                                                <Link href={`/products/${item.id}`} className="inline-flex items-center gap-2 text-xs font-bold text-black border-b-2 border-pink-500/30 hover:border-pink-500 pb-0.5 transition-all group-hover/item:gap-3">
                                                                    VIEW ITEM DETAILS <ChevronRight className="w-3 h-3" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Action Sidebar */}
                                            <div className="lg:col-span-4 bg-gray-50/50 rounded-3xl p-6 border border-gray-100/50">
                                                <h5 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">Actions</h5>
                                                <div className="space-y-3">
                                                    <button className="w-full bg-white border border-gray-200 hover:border-black hover:bg-black hover:text-white py-3 px-4 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm flex items-center justify-between group/btn">
                                                        TRACK PACKAGE
                                                        <div className="p-1 rounded bg-gray-100 group-hover/btn:bg-white/20 transition-colors">
                                                            <ExternalLink className="w-3 h-3" />
                                                        </div>
                                                    </button>
                                                    <button className="w-full bg-white border border-gray-200 hover:border-pink-500 hover:text-pink-600 py-3 px-4 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm">
                                                        WRITE PRODUCT REVIEW
                                                    </button>
                                                    <button className="w-full bg-white border border-gray-200 hover:border-gray-900 py-3 px-4 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm text-gray-500">
                                                        GET INVOICE
                                                    </button>
                                                </div>

                                                <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                                                    <h6 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Shipping To</h6>
                                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-inner">
                                                        <p className="text-sm font-bold text-gray-900 mb-1">{order.shippingAddress.name}</p>
                                                        <p className="text-xs text-gray-500 leading-relaxed truncate">{order.shippingAddress.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Bottom Branding */}
                <div className="mt-24 pt-12 border-t border-gray-100 flex flex-col items-center gap-6">
                    <Image src="/logo.svg" alt="Trendora" width={180} height={60} className="h-10 w-auto opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-pointer" />
                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <span className="hover:text-pink-500 cursor-pointer transition-colors">Returns & Refunds</span>
                        <span className="hover:text-pink-500 cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-pink-500 cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium">© 2026 TRENDORA LUXURY RETAIL. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
