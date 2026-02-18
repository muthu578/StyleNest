import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Twitter, Facebook, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0A0F1D] text-white py-24 overflow-hidden border-t-8 border-[#1E293B] relative">
            <div className="absolute top-0 left-0 w-full h-[8px] bg-gradient-to-r from-[#818CF8] via-[#F472B6] to-[#2DD4BF]"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-8 col-span-1 lg:col-span-1">
                        <Link href="/" className="inline-block">
                            <Image src="/logo.svg" alt="StyleNest" width={234} height={78} className="h-[52px] w-auto invert brightness-0 invert" />
                        </Link>
                        <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs italic border-l-2 border-[#818CF8]/30 pl-6">
                            Redefining the digital shopping experience through curated masterpieces and timeless fashion.
                        </p>
                        <div className="flex gap-6 pt-4">
                            <Link href="#" className="p-3 bg-white/5 rounded-full hover:bg-[#818CF8] hover:text-white transition-all duration-300">
                                <Instagram className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="p-3 bg-white/5 rounded-full hover:bg-[#F472B6] hover:text-white transition-all duration-300">
                                <Twitter className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="p-3 bg-white/5 rounded-full hover:bg-[#2DD4BF] hover:text-white transition-all duration-300">
                                <Facebook className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-2 gap-8 col-span-1 lg:col-span-2">
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] to-[#2DD4BF]">Collections</h3>
                            <ul className="space-y-4">
                                {['Men', 'Women', 'Kids', 'New Arrivals', 'Signature Series'].map((link) => (
                                    <li key={link}>
                                        <Link href={`/products?category=${link.toLowerCase()}`} className="text-sm font-bold text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-8">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] to-[#2DD4BF]">The House</h3>
                            <ul className="space-y-4">
                                <li>
                                    <Link href="/about" className="text-sm font-bold text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                                        About the Brand
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/artisans" className="text-sm font-bold text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                                        Our Artisans
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/sustainability" className="text-sm font-bold text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                                        Sustainability
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/flagships" className="text-sm font-bold text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                                        Global Flagships
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-sm font-bold text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">
                                        Contact House
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="space-y-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] to-[#2DD4BF]">Newsletter</h3>
                        <p className="text-sm text-gray-500 font-medium">Join the StyleNest inner circle for exclusive access to launches and private sales.</p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-white/5 border-b border-white/10 py-4 px-0 focus:outline-none focus:border-[#818CF8] transition-colors text-sm font-bold placeholder:text-gray-700"
                            />
                            <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:translate-x-1 transition-all">
                                <ArrowRight className="w-4 h-4 text-[#818CF8]" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                        <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">&copy; 2026 TRENDORA HOUSE</p>
                        <Link href="/contact" className="text-[10px] font-black text-gray-700 hover:text-[#818CF8] uppercase tracking-widest transition-colors">Privacy Policy</Link>
                        <Link href="/contact" className="text-[10px] font-black text-gray-700 hover:text-[#818CF8] uppercase tracking-widest transition-colors">Terms of Service</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-8 bg-gray-800"></div>
                        <p className="text-[10px] font-black text-gray-800 uppercase tracking-[0.5em]">Crafted for the elite</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
