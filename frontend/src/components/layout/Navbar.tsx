'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Button from '@/components/ui/Button';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { totalQuantity } = useSelector((state: RootState) => state.cart);
    const { user } = useSelector((state: RootState) => state.auth);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 group">
                            <Image src="/logo.svg" alt="Trendora" width={234} height={104} priority className="h-14 w-auto" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/products?category=men" className="text-gray-600 hover:text-black font-medium transition-colors">Men</Link>
                        <Link href="/products?category=women" className="text-gray-600 hover:text-black font-medium transition-colors">Women</Link>
                        <Link href="/products?category=kids" className="text-gray-600 hover:text-black font-medium transition-colors">Kids</Link>
                        <Link href="/products?category=beauty" className="text-gray-600 hover:text-black font-medium transition-colors">Beauty</Link>
                        <Link href="/products?category=home" className="text-gray-600 hover:text-black font-medium transition-colors">Home</Link>
                        <Link href="/products" className="text-gray-600 hover:text-black font-medium transition-colors">All</Link>
                    </div>

                    {/* Icons & Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Search - Visual Only */}
                        <div className="relative group">
                            <Search className="h-5 w-5 text-gray-400 group-hover:text-black cursor-pointer transition-colors" />
                        </div>

                        {/* Account */}
                        <div className="relative group">
                            <Link href={user ? '/profile' : '/login'}>
                                <User className="h-5 w-5 text-gray-400 group-hover:text-black cursor-pointer transition-colors" />
                            </Link>
                        </div>

                        {/* Cart */}
                        <Link href="/cart" className="relative group">
                            <ShoppingBag className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors" />
                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                    {totalQuantity}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="pt-2 pb-3 space-y-1 px-4">
                        <Link
                            href="/products?category=men"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Men
                        </Link>
                        <Link
                            href="/products?category=women"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Women
                        </Link>
                        <Link
                            href="/products?category=kids"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Kids
                        </Link>
                        <Link
                            href="/products?category=beauty"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Beauty
                        </Link>
                        <Link
                            href="/products?category=home"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            All Products
                        </Link>
                    </div>
                    <div className="pt-4 pb-4 border-t border-gray-200 px-4">
                        <div className="flex items-center justify-between mb-4">
                            <Link href="/cart" className="flex items-center space-x-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                                <ShoppingBag className="h-6 w-6" />
                                <span className="font-medium">Cart ({totalQuantity})</span>
                            </Link>
                        </div>
                        <div className="mt-3">
                            {user ? (
                                <div className="flex items-center space-x-2">
                                    <User className="h-6 w-6 text-gray-500" />
                                    <span className="text-gray-900 font-medium">{user.username}</span>
                                </div>
                            ) : (
                                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                    <Button className="w-full">Sign In</Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
