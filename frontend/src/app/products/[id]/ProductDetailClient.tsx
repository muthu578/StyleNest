'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById } from '@/services/api';
import { Product } from '@/types';
import Button from '@/components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import Image from 'next/image';
import {
    Loader2, Star, ShoppingBag, Truck, ShieldCheck, Heart,
    Sparkles, Ruler, ArrowRight, ChevronDown
} from 'lucide-react';
import Link from 'next/link';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('Standard');
    const [quantity, setQuantity] = useState(1);
    const [openAccordion, setOpenAccordion] = useState<string | null>('details');

    const isWishlisted = product ? wishlistItems.some(item => item.id === product.id) : false;

    // Mock options for UI demonstration
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const colors = [
        { name: 'Black', hex: '#000000' },
        { name: 'Navy', hex: '#000080' },
        { name: 'Heather Gray', hex: '#808080' },
        { name: 'Burgundy', hex: '#800020' }
    ];

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(Number(id));
                setProduct(data);
                if (data) {
                    setSelectedImage(data.thumbnail);
                }
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
            // Add quantity support if possible, or just add multiple times
            for (let i = 0; i < quantity; i++) {
                dispatch(addToCart(product));
            }
        }
    };

    const handleToggleWishlist = () => {
        if (product) {
            dispatch(toggleWishlist(product));
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-vh-screen py-40">
                <Loader2 className="h-12 w-12 animate-spin text-blue-900" />
                <p className="mt-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Loading Your Style...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-40">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                <Link href="/products" className="text-blue-900 font-bold hover:underline">Back to All Products</Link>
            </div>
        );
    }

    const regPrice = (product.price / (1 - (product.discountPercentage || 0) / 100)).toFixed(2);

    return (
        <div className="bg-white min-h-screen pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex mb-8 text-[11px] uppercase tracking-wider text-gray-500 font-medium">
                    <Link href="/" className="hover:text-black">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href={`/products?category=${product.category}`} className="hover:text-black">{product.category}</Link>
                    <span className="mx-2">/</span>
                    <span className="text-black font-bold truncate max-w-[200px]">{product.title}</span>
                </nav>

                <div className="lg:grid lg:grid-cols-12 lg:gap-10">
                    {/* Left Side: Vertical Gallery */}
                    <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
                        {/* Thumbnails */}
                        <div className="hidden md:flex flex-col gap-3 w-20 flex-shrink-0">
                            {product.images?.slice(0, 5).map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    className={`aspect-square relative border-2 transition-all ${selectedImage === img ? 'border-blue-900' : 'border-gray-100 hover:border-gray-300'}`}
                                >
                                    <Image src={img} alt={`${product.title} ${idx}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="relative aspect-[4/5] grow bg-gray-50 border border-gray-100 overflow-hidden group">
                            <Image
                                src={selectedImage || product.thumbnail}
                                alt={product.title}
                                fill
                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                priority
                            />
                            {product.discountPercentage > 0 && (
                                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-tight">
                                    SAVE {Math.round(product.discountPercentage)}%
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Product Details */}
                    <div className="lg:col-span-5 mt-10 lg:mt-0 space-y-6">
                        <div className="space-y-2 border-b border-gray-100 pb-6">
                            <p className="text-sm font-black uppercase text-blue-900 tracking-tighter">{product.brand}</p>
                            <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-4 pt-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-gray-600 underline cursor-pointer hover:text-blue-900">{product.rating} (124 Reviews)</span>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="py-4 space-y-1">
                            {product.discountPercentage > 0 ? (
                                <>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-black text-red-600 tracking-tight">${product.price.toFixed(2)}</span>
                                        <span className="text-xs font-bold text-red-600 uppercase">Sale</span>
                                    </div>
                                    <p className="text-xs text-gray-500 font-medium italic">
                                        Regular <span className="line-through">${regPrice}</span>
                                    </p>
                                </>
                            ) : (
                                <span className="text-3xl font-black text-gray-900 tracking-tight">${product.price.toFixed(2)}</span>
                            )}

                            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded flex items-center justify-between group cursor-pointer">
                                <span className="text-[10px] font-bold text-blue-900 uppercase">Earn StyleNest Rewards Points</span>
                                <ArrowRight className="w-3 h-3 text-blue-900 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>

                        {/* Options */}
                        <div className="space-y-8 pt-4">
                            {/* Color Selection */}
                            <div className="space-y-3">
                                <p className="text-xs font-bold uppercase text-gray-900">Color: <span className="font-medium text-gray-600 normal-case">{selectedColor}</span></p>
                                <div className="flex gap-3">
                                    {colors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all ${selectedColor === color.name ? 'border-blue-900' : 'border-transparent'}`}
                                            title={color.name}
                                        >
                                            <div className="w-full h-full rounded-full border border-gray-100" style={{ backgroundColor: color.hex }}></div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <p className="text-xs font-bold uppercase text-gray-900">Select Size</p>
                                    <button className="text-[11px] font-bold text-blue-900 underline flex items-center gap-1">
                                        <Ruler className="w-3 h-3" /> Size Chart
                                    </button>
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`py-3 text-xs font-bold border transition-all ${selectedSize === size ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-900 border-gray-200 hover:border-gray-400'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity & Add to Bag */}
                            <div className="space-y-4 pt-4">
                                <div className="flex gap-4">
                                    <div className="flex items-center border border-gray-200 rounded">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-gray-50 text-xl">-</button>
                                        <span className="w-10 text-center font-bold">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-gray-50 text-xl">+</button>
                                    </div>
                                    <Button
                                        onClick={handleAddToCart}
                                        className="grow bg-blue-900 hover:bg-blue-950 text-white rounded-none font-black text-xs uppercase tracking-widest py-4 transition-all active:scale-[0.98]"
                                    >
                                        Add to Bag
                                    </Button>
                                </div>
                                <button
                                    onClick={handleToggleWishlist}
                                    className="w-full py-3 flex items-center justify-center gap-2 text-xs font-bold text-gray-600 hover:text-red-500 transition-colors"
                                >
                                    <Heart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-current' : ''}`} />
                                    {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
                                </button>
                            </div>
                        </div>

                        {/* Delivering/Pickup Info */}
                        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                            <div className="flex gap-3">
                                <Truck className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-[11px] font-black uppercase text-gray-900">Ship to Home</p>
                                    <p className="text-[10px] text-gray-500 font-medium">Free shipping on orders over $49</p>
                                </div>
                            </div>
                        </div>

                        {/* Accordions */}
                        <div className="border-t border-gray-100 pt-8 space-y-2">
                            {[
                                { id: 'details', title: 'Product Details' },
                                { id: 'shipping', title: 'Shipping & Returns' }
                            ].map((section) => (
                                <div key={section.id} className="border-b border-gray-100">
                                    <button
                                        onClick={() => setOpenAccordion(openAccordion === section.id ? null : section.id)}
                                        className="w-full py-4 flex justify-between items-center text-sm font-bold uppercase tracking-tight text-gray-900"
                                    >
                                        {section.title}
                                        <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === section.id ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openAccordion === section.id && (
                                        <div className="pb-6 text-sm text-gray-600 leading-relaxed animate-fade-in">
                                            {section.id === 'details' ? (
                                                <div className="space-y-4">
                                                    <p>{product.description}</p>
                                                    <ul className="list-disc pl-5 space-y-2">
                                                        <li>Highly durable and comfortable fabric</li>
                                                        <li>Classic {product.brand} design</li>
                                                        <li>Versatile for any occasion</li>
                                                        <li>Category: {product.category}</li>
                                                    </ul>
                                                </div>
                                            ) : (
                                                <p>Standard delivery within 3-5 business days. Free returns at any StyleNest location within 90 days of purchase.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

