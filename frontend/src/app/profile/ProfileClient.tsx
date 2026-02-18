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
    LogOut,
    Sparkles,
    MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

import { updateProfile } from '@/services/api';
import { setUser } from '@/store/slices/authSlice';

const ProfilePage = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState('account');
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        mobile: (user as any)?.mobile || '+91 97159 99305',
        gender: (user as any)?.gender || 'Male',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        setLoading(true);
        setSuccess('');
        try {
            const updatedUser = await updateProfile(formData);
            dispatch(setUser(updatedUser));
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
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
                                    {formData.firstName} <span className="text-pink-600 italic">{formData.lastName}</span>
                                </h2>
                                <p className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-widest opacity-70">Gold Member • Joined Oct 2024</p>

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
                                <Link href="/profile"
                                    onClick={(e) => { e.preventDefault(); setActiveTab('account'); }}
                                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'account' ? 'bg-black text-white shadow-lg shadow-black/10' : 'text-gray-500 hover:text-black hover:bg-gray-50 font-bold'}`}>
                                    <User className="w-5 h-5" />
                                    <span className="text-sm tracking-wide">Account Details</span>
                                </Link>
                                <button
                                    onClick={() => setActiveTab('addresses')}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'addresses' ? 'bg-black text-white shadow-lg shadow-black/10 font-bold' : 'text-gray-500 hover:text-black hover:bg-gray-50 font-bold'}`}>
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-sm tracking-wide">Saved Addresses</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('payment')}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'payment' ? 'bg-black text-white shadow-lg shadow-black/10 font-bold' : 'text-gray-500 hover:text-black hover:bg-gray-50 font-bold'}`}>
                                    <CreditCard className="w-5 h-5" />
                                    <span className="text-sm tracking-wide">Payment Methods</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('notifications')}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'notifications' ? 'bg-black text-white shadow-lg shadow-black/10 font-bold' : 'text-gray-500 hover:text-black hover:bg-gray-50 font-bold'}`}>
                                    <Bell className="w-5 h-5" />
                                    <span className="text-sm tracking-wide">Notifications</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('privacy')}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border-t border-gray-50 mt-4 pt-8 ${activeTab === 'privacy' ? 'text-black font-black' : 'text-gray-500 hover:text-black hover:bg-gray-50 font-bold'}`}>
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
                        {activeTab === 'account' && (
                            <section className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10 overflow-hidden relative">
                                {/* Accent Background */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-40"></div>

                                <div className="relative">
                                    <div className="flex items-center justify-between mb-12">
                                        <div>
                                            <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Personal <span className="text-pink-600 italic">Information</span></h3>
                                            <p className="text-gray-400 font-medium text-sm mt-1">Management of your identity details</p>
                                        </div>
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            className={`p-3 rounded-2xl transition-all border ${isEditing ? 'bg-pink-500 text-white border-pink-500 shadow-lg shadow-pink-200' : 'bg-gray-50 text-gray-400 border-transparent hover:border-pink-100 hover:text-pink-600'}`}>
                                            <Settings className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {success && (
                                        <div className="mb-8 p-4 bg-green-50 border border-green-100 text-green-600 rounded-2xl text-xs font-bold uppercase tracking-widest animate-fade-in flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            {success}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                                            <input
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-900 font-bold text-sm shadow-inner outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all disabled:opacity-70"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                                            <input
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-900 font-bold text-sm shadow-inner outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all disabled:opacity-70"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => isEditing && setFormData({ ...formData, gender: 'Male' })}
                                                    className={`flex-1 p-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${formData.gender === 'Male' ? 'bg-pink-50 border-2 border-pink-500/20 text-pink-600' : 'bg-gray-50 border-2 border-transparent text-gray-400 hover:bg-white hover:border-gray-100'}`}>
                                                    {formData.gender === 'Male' && <div className="w-2 h-2 rounded-full bg-pink-500"></div>}
                                                    MALE
                                                </button>
                                                <button
                                                    onClick={() => isEditing && setFormData({ ...formData, gender: 'Female' })}
                                                    className={`flex-1 p-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${formData.gender === 'Female' ? 'bg-pink-50 border-2 border-pink-500/20 text-pink-600' : 'bg-gray-50 border-2 border-transparent text-gray-400 hover:bg-white hover:border-gray-100'}`}>
                                                    {formData.gender === 'Female' && <div className="w-2 h-2 rounded-full bg-pink-500"></div>}
                                                    FEMALE
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Birth Date</label>
                                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-400 font-bold text-sm shadow-inner italic cursor-not-allowed">
                                                Not provided
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 pt-12 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 group">
                                                <Mail className="w-4 h-4 text-gray-400" />
                                                <input
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className="bg-transparent text-gray-900 font-bold text-sm truncate outline-none w-full"
                                                />
                                                <span className="ml-auto bg-green-500/10 text-green-600 text-[8px] font-black px-1.5 py-0.5 rounded">VERIFIED</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <input
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    className="bg-transparent text-gray-900 font-bold text-sm truncate outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12">
                                        <button
                                            onClick={handleUpdate}
                                            disabled={!isEditing || loading}
                                            className={`w-full md:w-auto px-12 py-4 rounded-2xl font-bold tracking-widest transition-all uppercase text-xs flex items-center justify-center gap-2 ${isEditing ? 'bg-black text-white shadow-xl shadow-black/10 hover:shadow-2xl active:scale-[0.98]' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
                                            {loading ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                    UPDATING...
                                                </>
                                            ) : 'Update Details'}
                                        </button>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === 'addresses' && (
                            <section className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10 space-y-8 animate-fade-in">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Saved <span className="text-pink-600 italic">Addresses</span></h3>
                                    <button className="bg-black text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-all">Add New</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-8 rounded-[40px] border-2 border-pink-500 bg-pink-50/10 space-y-4 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-6">
                                            <span className="bg-pink-500 text-white text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest">Default</span>
                                        </div>
                                        <h4 className="text-xl font-black text-gray-900 uppercase italic">Home Sanctuary</h4>
                                        <p className="text-gray-500 font-medium text-sm leading-relaxed">
                                            15 Avenue Montaigne,<br />
                                            75008 Paris,<br />
                                            France
                                        </p>
                                        <div className="flex gap-4 pt-4">
                                            <button className="text-[10px] font-black text-pink-600 uppercase tracking-widest hover:underline">Edit</button>
                                            <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500">Remove</button>
                                        </div>
                                    </div>
                                    <div className="p-8 rounded-[40px] border border-gray-100 bg-gray-50/50 space-y-4 hover:border-pink-200 transition-all cursor-pointer group">
                                        <h4 className="text-xl font-black text-gray-900 uppercase italic">Office Suite</h4>
                                        <p className="text-gray-500 font-medium text-sm leading-relaxed">
                                            711 5th Ave,<br />
                                            New York, NY 10022,<br />
                                            USA
                                        </p>
                                        <div className="flex gap-4 pt-4">
                                            <button className="text-[10px] font-black text-pink-600 uppercase tracking-widest hover:underline">Edit</button>
                                            <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {activeTab === 'payment' && (
                            <section className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10 space-y-8 animate-fade-in">
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase mb-8">Payment <span className="text-pink-600 italic">Methods</span></h3>
                                <div className="space-y-4">
                                    <div className="p-8 rounded-[40px] bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden group shadow-2xl shadow-black/20">
                                        <div className="absolute top-0 right-0 p-8 opacity-10">
                                            <CreditCard className="w-48 h-48 -mr-16 -mt-16" />
                                        </div>
                                        <div className="relative z-10 flex flex-col justify-between h-32">
                                            <div className="flex justify-between items-start">
                                                <p className="text-xs font-black uppercase tracking-[0.3em] text-pink-500">Mastercard World Elite</p>
                                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                                                    <div className="w-6 h-6 flex">
                                                        <div className="w-4 h-4 rounded-full bg-red-500 opacity-80"></div>
                                                        <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-80 -ml-2"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xl font-mono tracking-[0.2em] mb-2">•••• •••• •••• 8892</p>
                                                <div className="flex gap-8">
                                                    <div>
                                                        <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Expiry</p>
                                                        <p className="text-xs font-bold">12 / 28</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Card Holder</p>
                                                        <p className="text-xs font-bold uppercase">{formData.firstName} {formData.lastName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full p-6 rounded-[32px] border-2 border-dashed border-gray-200 text-gray-400 font-bold text-xs uppercase tracking-[0.3em] hover:border-pink-500 hover:text-pink-500 transition-all flex items-center justify-center gap-4">
                                        <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-black text-xl">+</div>
                                        Link New Asset
                                    </button>
                                </div>
                            </section>
                        )}

                        {activeTab === 'notifications' && (
                            <section className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10 animate-fade-in">
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase mb-8">Personal <span className="text-pink-600 italic">Feed</span></h3>
                                <div className="space-y-6">
                                    {[
                                        { title: "Spring Exclusive Access", time: "2 hours ago", desc: "You've been selected for early access to the Summer '26 Signature Collection.", type: "promo" },
                                        { title: "Security Alert", time: "1 day ago", desc: "Profile information was successfully updated.", type: "alert" },
                                        { title: "Style Milestone", time: "3 days ago", desc: "Congratulations! You've reached Gold Tier status in the StyleNest Vault.", type: "milestone" }
                                    ].map((note, idx) => (
                                        <div key={idx} className="flex gap-6 p-6 rounded-3xl bg-gray-50 border border-gray-50 hover:bg-white hover:border-pink-100 transition-all group">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${note.type === 'promo' ? 'bg-pink-100 text-pink-600' : note.type === 'alert' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                                                {note.type === 'promo' ? <Star className="w-5 h-5" /> : note.type === 'alert' ? <Shield className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between items-center">
                                                    <h4 className="font-black text-gray-900 text-sm uppercase italic tracking-tight">{note.title}</h4>
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{note.time}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 font-medium leading-relaxed">{note.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeTab === 'privacy' && (
                            <section className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10 animate-fade-in">
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight uppercase mb-8">Privacy & <span className="text-pink-600 italic">Security</span></h3>
                                <div className="space-y-8">
                                    <div className="p-8 rounded-[40px] bg-gray-50 border border-gray-100 flex items-center justify-between group hover:border-pink-200 transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-gray-400 group-hover:text-pink-600 transition-colors">
                                                <Shield className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-gray-900 text-sm uppercase">Two-Factor Authentication</h4>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Enhanced Vault Security</p>
                                            </div>
                                        </div>
                                        <div className="w-12 h-6 bg-pink-500 rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="p-8 rounded-[40px] bg-gray-50 border border-gray-100 flex items-center justify-between group hover:border-pink-200 transition-all cursor-pointer">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-gray-400 group-hover:text-pink-600 transition-colors">
                                                <Settings className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-gray-900 text-sm uppercase">Change Master Password</h4>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Last updated 3 months ago</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-pink-500" />
                                    </div>
                                    <div className="p-8 rounded-[40px] bg-red-50/30 border border-red-100 flex items-center justify-between group hover:bg-red-50 transition-all cursor-pointer">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-red-400">
                                                <Power className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-red-600 text-sm uppercase">Deactivate Account</h4>
                                                <p className="text-[10px] text-red-300 font-bold uppercase tracking-widest">Permanent Action</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-red-200" />
                                    </div>
                                </div>
                            </section>
                        )}

                        <section className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-10">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase mb-8 border-b border-gray-50 pb-6">Support <span className="text-pink-600 italic">Center</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Link href="/contact" className="flex items-center gap-6 p-6 rounded-3xl bg-gray-50 hover:bg-white hover:border-pink-100 transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-gray-400 group-hover:text-pink-600 transition-colors">
                                        <HelpCircle className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-black text-gray-900 text-sm uppercase">Help Center</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">F.A.Q & Guide</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-pink-500" />
                                </Link>
                                <Link href="/contact" className="flex items-center gap-6 p-6 rounded-3xl bg-gray-50 hover:bg-white hover:border-pink-100 transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-gray-400 group-hover:text-pink-600 transition-colors">
                                        <MessageCircle className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-black text-gray-900 text-sm uppercase">Chat Support</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Avg. speed: 45s</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-pink-500" />
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Footer Logo Section */}
                <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col items-center opacity-30">
                    <Image src="/logo.svg" alt="StyleNest" width={156} height={52} className="h-[52px] w-auto grayscale mb-4" />
                    <p className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">Premium Lifestyle Retail</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
