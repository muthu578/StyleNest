'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    User,
    ShoppingBag,
    CreditCard,
    FolderHeart,
    Power,
    ChevronRight,
    MapPin,
    Bell,
    Settings,
    Shield,
    HelpCircle,
    Heart,
    Star,
    Mail,
    Phone,
    LogOut
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const ProfilePage = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const profileData = {
        firstName: user?.firstName || 'Muthukumar',
        lastName: user?.lastName || 'M',
        email: user?.email || 'muthukumar@pikkol.com',
        mobile: '+91 97159 99305',
        gender: 'Male',
        memberSince: 'October 2024'
    };

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    return (
        <div className="bg-[#fcfcfc] min-h-screen font-sans">
            {/* Minimal Header */}
            <div className="bg-white border-b border-gray-50 flex items-center justify-between px-8 py-4">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-black">Profile</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Sidebar: Modern Glassmorphism Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                            <div className="flex flex-col items-center text-center">
                                <div className="relative mb-6">
                                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-pink-500 to-orange-400">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-white shadow-xl relative">
                                            <Image
                                                src={user?.image || "https://robohash.org/muthu.png"}
                                                alt="Profile"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-1 uppercase">
                                    {profileData.firstName} <span className="text-pink-600 italic">{profileData.lastName}</span>
                                </h2>
                                <p className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-widest opacity-70">Gold Member • {profileData.memberSince}</p>

                                <div className="grid grid-cols-3 gap-4 w-full border-t border-gray-50 pt-8 mt-2">
                                    <Link href="/orders" className="flex flex-col items-center group">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-2 group-hover:bg-pink-50 transition-colors">
                                            <ShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-pink-600" />
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Orders</span>
                                    </Link>
                                    <Link href="/wishlist" className="flex flex-col items-center group">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-2 group-hover:bg-pink-50 transition-colors">
                                            <Heart className="w-5 h-5 text-gray-400 group-hover:text-pink-600" />
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Wishlist</span>
                                    </Link>
                                    <div className="flex flex-col items-center group cursor-pointer">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-2 group-hover:bg-pink-50 transition-colors">
                                            <Star className="w-5 h-5 text-gray-400 group-hover:text-pink-600" />
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Reviews</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-4">
                            <nav className="space-y-1">
                                <Link href="/profile" className="flex items-center gap-4 p-4 rounded-2xl bg-black text-white font-bold transition-all shadow-lg shadow-black/10">
                                    <User className="w-5 h-5" />
                                    <span className="text-sm tracking-wide">Account Details</span>
                                </Link>
                                <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-gray-500 hover:text-black hover:bg-gray-50 font-bold transition-all">
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-sm tracking-wide">Saved Addresses</span>
                                </button>
                                <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-gray-500 hover:text-black hover:bg-gray-50 font-bold transition-all">
                                    <CreditCard className="w-5 h-5" />
                                    <span className="text-sm tracking-wide">Payment Methods</span>
                                </button>
                                <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-gray-500 hover:text-black hover:bg-gray-50 font-bold transition-all">
                                    <Bell className="w-5 h-5" />
                                    <span className="text-sm tracking-wide">Notifications</span>
                                </button>
                                <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-gray-500 hover:text-black hover:bg-gray-50 font-bold transition-all border-t border-gray-50 mt-4 pt-8">
                                    <Shield className="w-5 h-5" />
                                    <span className="text-sm tracking-wide">Privacy & Security</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 font-bold transition-all"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="text-sm tracking-wide uppercase">Sign Out</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content: Clean & Modern Form */}
                    <div className="lg:col-span-8 space-y-8 animate-fade-in">
                        <section className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10 overflow-hidden relative">
                            {/* Accent Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-40"></div>

                            <div className="relative">
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Personal <span className="text-pink-600 italic">Information</span></h3>
                                        <p className="text-gray-400 font-medium text-sm mt-1">Management of your identity details</p>
                                    </div>
                                    <button className="bg-gray-50 hover:bg-pink-50 text-gray-400 hover:text-pink-600 p-3 rounded-2xl transition-all border border-transparent hover:border-pink-100">
                                        <Settings className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-900 font-bold text-sm shadow-inner truncate">
                                            {profileData.firstName}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-900 font-bold text-sm shadow-inner truncate">
                                            {profileData.lastName}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                                        <div className="flex gap-4">
                                            <button className="flex-1 bg-pink-50 border-2 border-pink-500/20 p-4 rounded-2xl text-pink-600 font-bold text-sm flex items-center justify-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                                                MALE
                                            </button>
                                            <button className="flex-1 bg-gray-50 border-2 border-transparent p-4 rounded-2xl text-gray-400 font-bold text-sm flex items-center justify-center gap-2 hover:bg-white hover:border-gray-100 transition-all">
                                                FEMALE
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Birth Date</label>
                                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-400 font-bold text-sm shadow-inner italic">
                                            Not provided
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-12 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 group">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-900 font-bold text-sm truncate">{profileData.email}</span>
                                            <span className="ml-auto bg-green-500/10 text-green-600 text-[8px] font-black px-1.5 py-0.5 rounded">VERIFIED</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-900 font-bold text-sm truncate">{profileData.mobile}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12">
                                    <Button className="w-full md:w-auto px-12 py-4 bg-black text-white rounded-2xl font-bold tracking-widest shadow-xl shadow-black/10 hover:shadow-2xl transition-all uppercase text-xs">
                                        Update Details
                                    </Button>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase mb-8 border-b border-gray-50 pb-6">Support <span className="text-pink-600 italic">Center</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <button className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 hover:bg-white border border-gray-50 hover:border-pink-100 transition-all group">
                                    <div className="flex items-center gap-4 text-left">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-pink-500 shadow-sm border border-gray-50">
                                            <HelpCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">Help Center</p>
                                            <p className="text-[10px] text-gray-400 font-medium">FAQs & Support guides</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-pink-500 transform group-hover:translate-x-1 transition-all" />
                                </button>
                                <button className="flex items-center justify-between p-6 rounded-3xl bg-gray-50 hover:bg-white border border-gray-50 hover:border-pink-100 transition-all group">
                                    <div className="flex items-center gap-4 text-left">
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-pink-500 shadow-sm border border-gray-50">
                                            <MessageCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">Chat Support</p>
                                            <p className="text-[10px] text-gray-400 font-medium">Speak with our stylists</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-pink-500 transform group-hover:translate-x-1 transition-all" />
                                </button>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Footer Logo Section */}
                <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col items-center opacity-30">
                    <Image src="/logo.svg" alt="Trendora" width={120} height={40} className="grayscale mb-4" />
                    <p className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">Premium Lifestyle Retail</p>
                </div>
            </div>
        </div>
    );
};

// Mock for MessageCircle since it wasn't imported from lucide-react in the original
const MessageCircle = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
);

export default ProfilePage;
