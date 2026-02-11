'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import Button from '@/components/ui/Button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent
        e.stopPropagation(); // Also prevent bubbling just in case
        dispatch(addToCart(product));
    };

    return (
        <Link href={`/products/${product.id}`} className="group block relative">
            <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[3/4]">
                {/* Image */}
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Quick Add Button showing on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 transform">
                    <button
                        onClick={handleAddToCart}
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors"
                        title="Add to Cart"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>

                {/* Discount Badge */}
                {product.discountPercentage > 0 && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide">
                        -{Math.round(product.discountPercentage)}%
                    </div>
                )}
            </div>

            <div className="mt-4 space-y-1">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:underline decoration-1 underline-offset-4 transition-all">
                    {product.title}
                </h3>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm font-semibold text-gray-900">${product.price}</p>
                    {product.discountPercentage > 0 && (
                        <p className="text-xs text-gray-400 line-through">
                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
