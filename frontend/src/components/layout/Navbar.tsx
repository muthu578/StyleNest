'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, User, Search, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import { cn } from '@/lib/utils';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { totalQuantity } = useSelector((state: RootState) => state.cart);
    const { user } = useSelector((state: RootState) => state.auth);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.account-dropdown-container')) {
                setIsAccountOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'Men', href: '/products?category=men' },
        { name: 'Women', href: '/products?category=women' },
        { name: 'Kids', href: '/products?category=kids' },
        { name: 'Home', href: '/products?category=home' },
        { name: 'Beauty', href: '/products?category=beauty' },
    ];

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-[120] h-20 bg-white md:bg-white/95 md:backdrop-blur-3xl border-b border-gray-100 flex items-center transition-all duration-300",
            scrolled ? "shadow-lg shadow-black/5" : "shadow-none"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full relative z-[130]">
                <div className="flex justify-between items-center h-full">
                    {/* Logo Area */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="group relative">
                            <div className={cn(
                                "transition-all duration-500",
                                scrolled ? "scale-90" : "scale-100"
                            )}>
                                <Image
                                    src="/logo.svg"
                                    alt="Trendora"
                                    width={234}
                                    height={78}
                                    priority
                                    className="h-[45px] md:h-[84px] w-auto"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Center Navigation */}
                    <div className="hidden lg:flex items-center space-x-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900/60 hover:text-black transition-all relative group py-2"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[#818CF8] to-[#2DD4BF] transition-all duration-500 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-4 sm:space-x-8">
                        {/* Search icon */}
                        <button suppressHydrationWarning aria-label="Search" className="p-2 text-gray-900/40 hover:text-black transition-colors hidden sm:block">
                            <Search className="w-5 h-5 stroke-[1.5]" />
                        </button>

                        {/* Account icon with Dropdown */}
                        <div className="relative account-dropdown-container">
                            {user ? (
                                <div
                                    className="flex items-center gap-3 cursor-pointer py-1 px-1"
                                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                                >
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E293B] to-[#94A3B8] p-[1.5px] shadow-sm">
                                        <div className="w-full h-full rounded-full bg-white p-[1px] overflow-hidden">
                                            <Image
                                                src={user.image || "https://robohash.org/muthu.png"}
                                                alt={user.username}
                                                width={36}
                                                height={36}
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <ChevronDown className={cn(
                                        "w-3 h-3 text-gray-400 transition-transform duration-500",
                                        isAccountOpen ? "rotate-180" : "rotate-0"
                                    )} />

                                    {/* Glassmorphism Dropdown */}
                                    <div className={cn(
                                        "absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-3xl border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[32px] py-6 px-3 transition-all duration-500 z-[150]",
                                        isAccountOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4"
                                    )}>
                                        <div className="px-5 py-3 mb-4 border-b border-gray-50 pb-6">
                                            <p className="text-[9px] font-black text-[#94A3B8] uppercase tracking-widest mb-1">{user.role || 'Member'}</p>
                                            <p className="text-base font-black text-[#0F172A] truncate uppercase italic tracking-tighter">{user.username}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <Link href="/profile" onClick={() => setIsAccountOpen(false)} aria-label="View Profile" className="flex items-center gap-4 px-5 py-3.5 text-[11px] font-black uppercase tracking-widest text-gray-600 hover:text-[#818CF8] hover:bg-gray-50 rounded-2xl transition-all">
                                                <User className="w-4 h-4" /> Account Details
                                            </Link>
                                            <Link href="/orders" onClick={() => setIsAccountOpen(false)} aria-label="View Orders" className="flex items-center gap-4 px-5 py-3.5 text-[11px] font-black uppercase tracking-widest text-gray-600 hover:text-[#818CF8] hover:bg-gray-50 rounded-2xl transition-all">
                                                <ShoppingBag className="w-4 h-4" /> Order History
                                            </Link>
                                            <Link href="/wishlist" onClick={() => setIsAccountOpen(false)} aria-label="View Wishlist" className="flex items-center gap-4 px-5 py-3.5 text-[11px] font-black uppercase tracking-widest text-gray-600 hover:text-[#818CF8] hover:bg-gray-50 rounded-2xl transition-all">
                                                <Heart className="w-4 h-4" /> My Wishlist
                                            </Link>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-50">
                                            <button
                                                suppressHydrationWarning
                                                aria-label="Sign Out"
                                                onClick={() => {
                                                    dispatch(logout());
                                                    setIsAccountOpen(false);
                                                    router.push('/login');
                                                }}
                                                className="w-full flex items-center gap-4 px-5 py-4 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/login" aria-label="Login to your account" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-900/60 hover:text-[#818CF8] transition-all">
                                    <User className="w-5 h-5 stroke-[1.5]" />
                                    <span className="hidden sm:inline italic">Vault</span>
                                </Link>
                            )}
                        </div>

                        {/* Cart icon */}
                        <Link href="/cart" aria-label={`View Cart with ${totalQuantity} items`} className="relative group p-2 text-gray-900/60 hover:text-black transition-all">
                            <ShoppingBag className="w-5 h-5 stroke-[1.5] group-hover:scale-110 transition-transform duration-500" />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gradient-to-tr from-[#818CF8] to-[#2DD4BF] text-white text-[9px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-lg group-hover:animate-pulse">
                                    {totalQuantity}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu button */}
                        <button
                            suppressHydrationWarning
                            aria-label="Toggle Mobile Menu"
                            onClick={toggleMenu}
                            className="lg:hidden p-2 text-gray-900/60 hover:text-black transition-all"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <div className={cn(
                "fixed inset-0 bg-white z-[110] lg:hidden transition-all duration-700 ease-in-out",
                isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
            )}>
                <div className="pt-32 px-10 space-y-10">
                    {navLinks.map((link, idx) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block text-5xl font-black uppercase tracking-tighter italic text-[#0F172A] hover:text-[#818CF8] transition-colors"
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="pt-12 border-t border-gray-100 space-y-8">
                        {user ? (
                            <div className="grid grid-cols-2 gap-6">
                                <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="text-xs font-black uppercase tracking-widest text-[#94A3B8]">Settings</Link>
                                <Link href="/orders" onClick={() => setIsMenuOpen(false)} className="text-xs font-black uppercase tracking-widest text-[#94A3B8]">Orders</Link>
                            </div>
                        ) : (
                            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-xl font-black uppercase tracking-widest text-[#0F172A]">Sign In / Join</Link>
                        )}
                        <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4 italic group text-[#0F172A]">
                            Bag <span className="text-[#818CF8]">({totalQuantity})</span>
                            <ShoppingBag className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Progress Bar */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-gray-100 w-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-[#818CF8] via-[#F472B6] to-[#2DD4BF] transition-all duration-300"
                    style={{ width: `${Math.min(scrolled ? 100 : 0, 100)}%` }}
                ></div>
            </div>
        </nav>
    );
};

export default Navbar;
