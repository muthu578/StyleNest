'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '@/services/api';
import { Product } from '@/types';
import Button from '@/components/ui/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import Image from 'next/image';
import { Loader2, Star, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string>('');

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(Number(id));
                setProduct(data);
                setSelectedImage(data.thumbnail);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart(product));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!product) {
        return <div className="text-center py-20 text-gray-500">Product not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Images Section */}
                <div className="space-y-4">
                    <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                        <Image
                            src={selectedImage || product.thumbnail}
                            alt={product.title}
                            fill
                            className="object-contain object-center"
                            priority
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images?.slice(0, 4).map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                className={`aspect-square relative rounded-md overflow-hidden bg-gray-100 border-2 transition-colors ${selectedImage === img ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                            >
                                <Image
                                    src={img}
                                    alt={`${product.title} ${idx + 1}`}
                                    fill
                                    className="object-cover object-center"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info Section */}
                <div>
                    <div className="mb-2">
                        <span className="text-sm text-indigo-600 font-semibold tracking-wide uppercase">{product.category}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                    <p className="text-gray-500 mb-6">{product.brand}</p>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center text-yellow-400">
                            <Star className="h-5 w-5 fill-current" />
                            <span className="ml-1 text-gray-900 font-medium">{product.rating}</span>
                        </div>
                    </div>

                    <div className="flex items-end gap-3 mb-8">
                        <p className="text-4xl font-bold text-gray-900">${product.price}</p>
                        {product.discountPercentage > 0 && (
                            <div className="mb-1">
                                <p className="text-lg text-gray-400 line-through">${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</p>
                            </div>
                        )}
                        {product.discountPercentage > 0 && (
                            <span className="mb-2 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">
                                SAVE {Math.round(product.discountPercentage)}%
                            </span>
                        )}
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="space-y-4 mb-8 border-t border-b border-gray-100 py-6">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Truck className="h-5 w-5 text-gray-400" />
                            <span>Free shipping on orders over $50</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <ShieldCheck className="h-5 w-5 text-gray-400" />
                            <span>2 year extended warranty</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={handleAddToCart} size="lg" className="flex-1 text-base">
                            <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
                        </Button>
                        {/* Wishlist button placeholder */}
                        <Button variant="outline" size="lg" className="px-4">
                            <Star className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ProductPage() {
    return <ProductDetail />
}
