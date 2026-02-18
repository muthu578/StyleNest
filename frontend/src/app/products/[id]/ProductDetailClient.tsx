'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProductById, getProducts } from '@/services/api';
import { Product, Review } from '@/types';
import Button from '@/components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import Image from 'next/image';
import {
    Loader2, Star, ShoppingBag, Truck, ShieldCheck, Heart,
    Sparkles, Ruler, ArrowRight, ChevronDown, MessageSquare,
    ThumbsUp, Award, RefreshCw, Clock
} from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);

    const [product, setProduct] = useState<Product | null>(null);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('Standard');
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

        const fetchProductData = async () => {
            try {
                setLoading(true);
                const data = await getProductById(Number(id));
                setProduct(data);
                if (data) {
                    setSelectedImage(data.thumbnail);
                    // Fetch similar products
                    const similar = await getProducts(data.category);
                    setSimilarProducts(similar.filter(p => p.id !== data.id).slice(0, 8));
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
        window.scrollTo(0, 0);
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            dispatch(addToCart(product));
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
        <div className="bg-white min-h-screen pt-24 pb-20 font-sans">
            <div className="max-w-[1400px] mx-auto px-4 md:px-10">
                {/* Breadcrumbs */}
                <nav className="flex mb-6 text-[12px] text-gray-500 font-medium">
                    <Link href="/" className="hover:text-black">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href={`/products?category=${product.category}`} className="hover:text-black capitalize">{product.category}</Link>
                    <span className="mx-2">/</span>
                    <span className="text-black font-bold truncate max-w-[200px]">{product.title}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left: Image Grid (Myntra Style) */}
                    <div className="lg:w-[60%] space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            {product.images?.map((img, idx) => (
                                <div key={idx} className="relative aspect-[3/4] bg-gray-50 overflow-hidden cursor-zoom-in group">
                                    <Image
                                        src={img}
                                        alt={`${product.title} ${idx}`}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            )) || (
                                    <div className="col-span-2 relative aspect-[4/5] bg-gray-50">
                                        <Image src={product.thumbnail} alt={product.title} fill className="object-contain p-10" />
                                    </div>
                                )}
                        </div>
                    </div>

                    {/* Right: Sticky Details Section */}
                    <div className="lg:w-[40%] lg:sticky lg:top-24 h-fit space-y-6">
                        <div className="border-b border-gray-100 pb-5">
                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-1">{product.brand}</h2>
                            <h1 className="text-xl text-gray-500 font-medium mb-4 capitalize">{product.title}</h1>

                            <div className="inline-flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-sm hover:border-gray-900 cursor-pointer transition-colors group">
                                <div className="flex items-center gap-1 font-bold text-sm">
                                    {product.rating} <Star className="w-4 h-4 fill-green-600 text-green-600" />
                                </div>
                                <div className="h-4 w-[1px] bg-gray-200"></div>
                                <div className="text-gray-500 text-sm font-bold group-hover:text-black">1.2k Ratings</div>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-black text-gray-900">${product.price.toFixed(2)}</span>
                                <span className="text-xl text-gray-400 font-medium line-through">MRP ${regPrice}</span>
                                <span className="text-xl font-bold text-orange-500">({Math.round(product.discountPercentage)}% OFF)</span>
                            </div>
                            <p className="text-green-600 text-[13px] font-black uppercase">Inclusive of all taxes</p>
                        </div>

                        {/* Size Selection */}
                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-center">
                                <p className="text-[14px] font-black uppercase tracking-widest text-gray-900 flex items-center gap-2">
                                    Select Size <span className="text-pink-600 border-b border-pink-600 cursor-pointer text-xs ml-4">SIZE CHART</span>
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2 ${selectedSize === size ? 'border-pink-600 text-pink-600' : 'border-gray-200 text-gray-900 hover:border-pink-600'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-8">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-5 rounded-md font-black text-sm uppercase flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-pink-600/20"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Add to Bag
                            </button>
                            <button
                                onClick={handleToggleWishlist}
                                className={`flex-1 border-2 py-5 rounded-md font-black text-sm uppercase flex items-center justify-center gap-3 transition-all active:scale-95 ${isWishlisted ? 'border-red-600 text-red-600 bg-red-50' : 'border-gray-200 text-gray-900 hover:border-black'}`}
                            >
                                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                            </button>
                        </div>

                        {/* Delivery Info */}
                        <div className="pt-10 space-y-6">
                            <h3 className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3">
                                Delivery Options <Truck className="w-5 h-5" />
                            </h3>
                            <div className="relative max-w-xs">
                                <input
                                    type="text"
                                    placeholder="Enter pincode"
                                    className="w-full border border-gray-200 p-4 rounded-md text-[13px] font-bold focus:outline-none focus:border-gray-900"
                                />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-600 font-black text-xs uppercase cursor-pointer hover:text-pink-700">Check</button>
                            </div>
                            <p className="text-[12px] text-gray-500 font-medium">Please enter PIN code to check delivery time & Pay on Delivery Availability</p>

                            <div className="space-y-4 pt-2">
                                <div className="flex items-start gap-4">
                                    <ShieldCheck className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <p className="text-[13px] text-gray-900 font-medium leading-relaxed">100% Original Products</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <RefreshCw className="w-5 h-5 text-gray-400 mt-0.5" />
                                    <p className="text-[13px] text-gray-900 font-medium leading-relaxed">Easy 14 days returns and exchanges</p>
                                </div>
                            </div>
                        </div>

                        {/* Best Offers Section */}
                        <div className="pt-10 space-y-4">
                            <h3 className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3">
                                Best Offers <Award className="w-5 h-5" />
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-orange-500" />
                                        <span className="text-[13px] font-black text-gray-900">StyleNest First User Offer</span>
                                    </div>
                                    <p className="text-[12px] text-gray-600 font-medium">Get extra $10 off on orders above $50. Use code: NEST10</p>
                                </div>
                            </div>
                        </div>

                        {/* Product Spec Section */}
                        <div className="pt-10 border-t border-gray-100">
                            <h3 className="text-[14px] font-black uppercase tracking-widest mb-4">Product Details</h3>
                            <p className="text-[14px] text-gray-600 leading-relaxed font-medium mb-6">
                                {product.description}
                            </p>
                            <div className="grid grid-cols-2 gap-y-4 text-[13px]">
                                <div>
                                    <p className="text-gray-400 uppercase text-[10px] font-black mb-0.5">Brand</p>
                                    <p className="font-bold text-gray-800">{product.brand}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 uppercase text-[10px] font-black mb-0.5">Category</p>
                                    <p className="font-bold text-gray-800 capitalize">{product.category}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 uppercase text-[10px] font-black mb-0.5">Article ID</p>
                                    <p className="font-bold text-gray-800">{product.id}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 uppercase text-[10px] font-black mb-0.5">Stock</p>
                                    <p className="font-bold text-gray-800">{product.stock} units available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ratings & Reviews Section */}
                <section className="mt-32 pt-20 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row gap-20">
                        <div className="md:w-[30%]">
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-3 mb-10">
                                Customer Reviews <MessageSquare className="w-6 h-6 text-pink-600" />
                            </h2>
                            <div className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="text-6xl font-black text-gray-900">{product.rating}</div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-green-600 text-green-600' : 'text-gray-200'}`} />
                                            ))}
                                        </div>
                                        <p className="text-sm font-bold text-gray-500 italic">Based on 1.2k+ verified reviews</p>
                                    </div>
                                </div>

                                {/* Ratings Bars */}
                                <div className="space-y-3 pt-4">
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <div key={star} className="flex items-center gap-4 group">
                                            <span className="text-xs font-black text-gray-500 w-3">{star}</span>
                                            <Star className="w-3 h-3 fill-gray-300 text-gray-300 group-hover:fill-pink-500 transition-colors" />
                                            <div className="h-1.5 grow bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 rounded-full"
                                                    style={{ width: `${star === 5 ? '85' : star === 4 ? '10' : '5'}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400 w-8">{star === 5 ? '842' : star === 4 ? '124' : '42'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="md:w-[70%] space-y-10">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-black uppercase tracking-widest italic">Most Recent Feedback</h3>
                                <button className="text-xs font-black text-pink-600 border-b-2 border-pink-600 pb-1">VIEW ALL REVIEWS</button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {product.reviews?.map((review) => (
                                    <div key={review.id} className="bg-gray-50/50 p-8 rounded-[32px] border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all group">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm ring-2 ring-gray-100">
                                                    <Image src={review.avatar || `https://robohash.org/${review.user}.png`} alt={review.user} width={48} height={48} className="object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-sm text-gray-900">{review.user}</p>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex text-green-600">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} className={`w-2.5 h-2.5 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                                                            ))}
                                                        </div>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ThumbsUp className="w-4 h-4 text-gray-300 group-hover:text-pink-500 cursor-pointer transition-colors" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-600 leading-relaxed italic">"{review.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Similar Products Section */}
                <section className="mt-32 pt-20 border-t border-gray-100 overflow-hidden">
                    <div className="flex justify-between items-end mb-12">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-1 bg-pink-600 rounded-full"></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-600">Curated Collection</span>
                            </div>
                            <h2 className="text-5xl font-black uppercase tracking-tighter italic">
                                SIMILAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-400 not-italic underline decoration-pink-600/30">STYLE</span>
                            </h2>
                        </div>
                        <Link href={`/products?category=${product.category}`} className="text-xs font-black uppercase tracking-widest group flex items-center gap-3 hover:text-pink-600 transition-colors">
                            Explore All {product.category} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                        {similarProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductDetail;
