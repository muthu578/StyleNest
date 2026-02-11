import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="mb-8 md:mb-0">
                        <h2 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-pink-500 via-purple-600 to-teal-500 text-transparent bg-clip-text inline-block">Trendora.</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your premier destination for fashion. Experience the best in class shopping for Men, Women and Kids.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Shop</h3>
                        <ul className="space-y-3">
                            <li><Link href="/products?category=men" className="text-gray-400 hover:text-white transition-colors text-sm">Men</Link></li>
                            <li><Link href="/products?category=women" className="text-gray-400 hover:text-white transition-colors text-sm">Women</Link></li>
                            <li><Link href="/products?category=kids" className="text-gray-400 hover:text-white transition-colors text-sm">Kids</Link></li>
                            <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors text-sm">New Arrivals</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">FAQs</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Shipping & Returns</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Stay Connected</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for updates.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full text-sm placeholder-gray-500"
                            />
                            <button className="bg-indigo-600 px-4 py-2 rounded-r-md text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; 2024 Trendora. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Facebook</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
