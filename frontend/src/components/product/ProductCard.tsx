'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { ShoppingBag, Heart, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();
    const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
    const isWishlisted = wishlistItems.some(item => item.id === product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart(product));
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleWishlist(product));
    };

    return (
        <Link href={`/products/${product.id}`} className="group relative block bg-white rounded-[32px] p-4 transition-all duration-700 hover:shadow-[0_32px_80px_-16px_rgba(0,0,0,0.1)] hover:-translate-y-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-gray-50 border border-gray-100">
                {/* Image */}
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover object-center transition-transform duration-[2s] ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Exclusive Glass Overlay on Hover */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10">
                    <button
                        aria-label={`Add ${product.title} to bag`}
                        onClick={handleAddToCart}
                        className="flex-grow mr-2 bg-white/80 backdrop-blur-xl border border-white/40 h-12 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-900 hover:bg-black hover:text-white transition-all shadow-xl"
                    >
                        <ShoppingBag className="w-3 h-3" />
                        ADD TO BAG
                    </button>
                    <button
                        aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
                        onClick={handleToggleWishlist}
                        className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/40 shadow-xl transition-all",
                            isWishlisted
                                ? "bg-pink-500 text-white border-pink-400"
                                : "bg-white/80 text-gray-900 hover:bg-pink-500 hover:text-white"
                        )}
                    >
                        <Heart className={cn("w-4 h-4", isWishlisted && "fill-current")} />
                    </button>
                </div>

                {/* Discount Badge */}
                {product.discountPercentage > 0 && (
                    <div className="absolute top-4 left-4">
                        <div className="bg-black/90 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-lg border border-white/10">
                            <span className="text-pink-400">Save</span>
                            {Math.round(product.discountPercentage)}%
                        </div>
                    </div>
                )}

                {/* View Details Icon */}
                <div className="absolute top-4 right-4 translate-x-2 -translate-y-2 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg">
                        <ArrowUpRight className="w-4 h-4 text-gray-900" />
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="mt-8 space-y-4 px-2">
                <div className="space-y-1">
                    <div className="flex items-start justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                            {product.brand}
                        </p>
                    </div>
                    <h3 className="text-lg font-black text-gray-900 leading-tight italic tracking-tighter uppercase group-hover:text-pink-600 transition-colors">
                        {product.title}
                    </h3>
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <p className="text-xl font-black text-gray-900 tracking-tighter italic">${product.price}</p>
                    {product.discountPercentage > 0 && (
                        <p className="text-xs text-gray-400 line-through tracking-tighter">
                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
