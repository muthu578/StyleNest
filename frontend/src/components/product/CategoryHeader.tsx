'use client';

import Image from 'next/image';
import Link from 'next/link';

interface CategoryHeaderProps {
    category: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category }) => {
    // Only show for 'women' category for now layout wise, but can be generic
    if (category !== 'women') return null;

    const SUB_CATEGORIES = [
        { name: 'Western Wear', image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=format&fit=crop&w=600' },
        { name: 'Ethnic Wear', image: 'https://images.pexels.com/photos/2235071/pexels-photo-2235071.jpeg?auto=format&fit=crop&w=600' },
        { name: 'Footwear', image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=format&fit=crop&w=600' },
        { name: 'Sportswear', image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=format&fit=crop&w=600' },
        { name: 'Lingerie', image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=format&fit=crop&w=600' },
        { name: 'Beauty', image: 'https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=format&fit=crop&w=600' },
    ];

    return (
        <div className="mb-8">
            {/* Main Banner */}
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg mb-8 group">
                <Image
                    src="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=format&fit=crop&w=1200"
                    alt="Women's Fashion"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent flex flex-col justify-center px-8 md:px-16">
                    <span className="text-white text-lg font-medium tracking-widest uppercase mb-2 drop-shadow-md">New Season</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                        Women's <br /> <span className="text-pink-400">Trendsetters</span>
                    </h1>
                    <p className="text-white/90 text-xl font-medium max-w-lg drop-shadow-md">
                        Explore the latest collection of dresses, tops, and ethnic wear.
                    </p>
                </div>
            </div>

            {/* Circular Sub-Categories */}
            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Shop by Category</h3>
                <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                    {SUB_CATEGORIES.map((sub, idx) => (
                        <div key={idx} className="flex flex-col items-center flex-shrink-0 group cursor-pointer">
                            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-pink-500 transition-all shadow-md group-hover:shadow-xl">
                                <Image
                                    src={sub.image}
                                    alt={sub.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="mt-3 text-sm font-bold text-gray-700 group-hover:text-pink-600 transition-colors uppercase text-center">
                                {sub.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryHeader;
