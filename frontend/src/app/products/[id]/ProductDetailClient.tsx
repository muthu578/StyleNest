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
                <Loader2 className="h-12 w-12 animate-spin text-[#818CF8]" />
                <p className="mt-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Loading Your Style...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-40">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Product Not Found</h2>
                <Link href="/products" className="text-[#818CF8] font-bold hover:underline">Back to All Products</Link>
            </div>
        );
    }

    const regPrice = (product.price / (1 - (product.discountPercentage || 0) / 100)).toFixed(2);

    return (
        <div className="bg-white min-h-screen pt-24 pb-20 font-sans">
            <div className="max-w-[1400px] mx-auto px-4 md:px-10">
                {/* Breadcrumbs */}
                <nav className="flex mb-6 text-[12px] text-gray-400 font-medium">
                    <Link href="/" className="hover:text-[#0F172A]">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href={`/products?category=${product.category}`} className="hover:text-[#0F172A] capitalize">{product.category}</Link>
                    <span className="mx-2">/</span>
                    <span className="text-[#0F172A] font-bold truncate max-w-[200px]">{product.title}</span>
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
                                    <div className="absolute inset-0 bg-[#0F172A]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                            <h2 className="text-2xl font-black text-[#0F172A] uppercase tracking-tight mb-1">{product.brand}</h2>
                            <h1 className="text-xl text-gray-500 font-medium mb-4 capitalize">{product.title}</h1>

                            <div className="inline-flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-sm hover:border-[#818CF8] cursor-pointer transition-colors group">
                                <div className="flex items-center gap-1 font-bold text-sm">
                                    {product.rating} <Star className="w-4 h-4 fill-green-600 text-green-600" />
                                </div>
                                <div className="h-4 w-[1px] bg-gray-200"></div>
                                <div className="text-gray-500 text-sm font-bold group-hover:text-[#0F172A]">1.2k Ratings</div>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-black text-[#0F172A]">${product.price.toFixed(2)}</span>
                                <span className="text-xl text-gray-400 font-medium line-through">MRP ${regPrice}</span>
                                <span className="text-xl font-bold text-[#F472B6]">({Math.round(product.discountPercentage)}% OFF)</span>
                            </div>
                            <p className="text-green-600 text-[13px] font-black uppercase tracking-widest">Inclusive of all taxes</p>
                        </div>

                        {/* Size Selection */}
                        <div className="space-y-4 pt-4">
                            <div className="flex justify-between items-center">
                                <p className="text-[14px] font-black uppercase tracking-widest text-[#0F172A] flex items-center gap-2">
                                    Select Size <span className="text-[#818CF8] border-b border-[#818CF8]/30 cursor-pointer text-xs ml-4 hover:border-[#818CF8] transition-all">SIZE CHART</span>
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2 ${selectedSize === size ? 'border-[#0F172A] bg-[#0F172A] text-white' : 'border-gray-100 text-gray-900 hover:border-[#818CF8]'}`}
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
                                className="flex-1 bg-[#0F172A] hover:bg-[#1E293B] text-white py-5 rounded-xl font-black text-sm uppercase flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl shadow-[#0F172A]/20 group/bag"
                            >
                                <ShoppingBag className="w-5 h-5 group-hover/bag:scale-110 transition-transform" />
                                Add to Bag
                            </button>
                            <button
                                onClick={handleToggleWishlist}
                                className={`flex-1 border-2 py-5 rounded-xl font-black text-sm uppercase flex items-center justify-center gap-3 transition-all active:scale-95 ${isWishlisted ? 'bg-gradient-to-br from-[#818CF8] to-[#2DD4BF] text-white border-transparent' : 'border-gray-100 text-[#0F172A] hover:border-[#818CF8]'}`}
                            >
                                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                {isWishlisted ? 'Wishlisted' : 'Wishlist'}
                            </button>
                        </div>

                        {/* Delivery Info */}
                        <div className="pt-10 space-y-6">
                            <h3 className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3 text-[#0F172A]">
                                Delivery Options <Truck className="w-5 h-5 text-[#818CF8]" />
                            </h3>
                            <div className="relative max-w-xs">
                                <input
                                    type="text"
                                    placeholder="Enter pincode"
                                    className="w-full border-b-2 border-gray-100 py-4 px-0 text-[13px] font-bold focus:outline-none focus:border-[#818CF8] transition-colors"
                                />
                                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[#818CF8] font-black text-xs uppercase cursor-pointer hover:text-[#F472B6]">Check</button>
                            </div>
                            <p className="text-[12px] text-gray-400 font-medium">Please enter PIN code to check delivery availability</p>

                            <div className="space-y-4 pt-2">
                                <div className="flex items-start gap-4">
                                    <ShieldCheck className="w-5 h-5 text-[#2DD4BF] mt-0.5" />
                                    <p className="text-[13px] text-[#0F172A] font-medium leading-relaxed">100% Original Products</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <RefreshCw className="w-5 h-5 text-[#818CF8] mt-0.5" />
                                    <p className="text-[13px] text-[#0F172A] font-medium leading-relaxed">Easy 14 days returns and exchanges</p>
                                </div>
                            </div>
                        </div>

                        {/* Best Offers Section */}
                        <div className="pt-10 space-y-4">
                            <h3 className="text-[14px] font-black uppercase tracking-widest flex items-center gap-3 text-[#0F172A]">
                                Best Offers <Award className="w-5 h-5 text-[#F472B6]" />
                            </h3>
                            <div className="space-y-4">
                                <div className="p-6 rounded-[32px] bg-[#0F172A]/5 border border-[#0F172A]/5 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#818CF8]/10 to-transparent rounded-bl-full"></div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-[#818CF8]" />
                                        <span className="text-[13px] font-black text-[#0F172A]">Trendora Premiere Offer</span>
                                    </div>
                                    <p className="text-[12px] text-gray-500 font-medium">Get extra $10 off on orders above $50. Use code: NEST26</p>
                                </div>
                            </div>
                        </div>

                        {/* Product Spec Section */}
                        <div className="pt-10 border-t border-gray-100">
                            <h3 className="text-[14px] font-black uppercase tracking-widest mb-4 text-[#0F172A]">Product Details</h3>
                            <p className="text-[14px] text-gray-500 leading-relaxed font-medium mb-6 italic">
                                "{product.description}"
                            </p>
                            <div className="grid grid-cols-2 gap-y-4 text-[13px]">
                                <div>
                                    <p className="text-gray-400 uppercase text-[10px] font-black mb-0.5">Brand</p>
                                    <p className="font-bold text-[#0F172A]">{product.brand}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 uppercase text-[10px] font-black mb-0.5">Category</p>
                                    <p className="font-bold text-[#0F172A] capitalize">{product.category}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 uppercase text-[10px] font-black mb-0.5">Article ID</p>
                                    <p className="font-bold text-[#0F172A]">#{product.id}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 uppercase text-[10px] font-black mb-0.5">Status</p>
                                    <p className="font-bold text-[#0F172A]">{product.stock} units in vault</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ratings & Reviews Section */}
                <section className="mt-32 pt-20 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row gap-20">
                        <div className="md:w-[30%]">
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-3 mb-10 text-[#0F172A]">
                                Verified Feedback <MessageSquare className="w-6 h-6 text-[#818CF8]" />
                            </h2>
                            <div className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="text-6xl font-black text-[#0F172A]">{product.rating}</div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-green-600 text-green-600' : 'text-gray-100'}`} />
                                            ))}
                                        </div>
                                        <p className="text-sm font-bold text-gray-400 italic">Based on 1.2k global clients</p>
                                    </div>
                                </div>

                                {/* Ratings Bars */}
                                <div className="space-y-3 pt-4">
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <div key={star} className="flex items-center gap-4 group">
                                            <span className="text-xs font-black text-gray-400 w-3">{star}</span>
                                            <Star className="w-3 h-3 fill-gray-200 text-gray-200 group-hover:fill-[#818CF8] transition-colors" />
                                            <div className="h-1.5 grow bg-gray-50 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#0F172A] rounded-full"
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
                                <h3 className="text-lg font-black uppercase tracking-widest italic text-[#0F172A]">Gallery Experience</h3>
                                <button className="text-xs font-black text-[#818CF8] border-b-2 border-[#818CF8]/30 hover:border-[#818CF8] pb-1 transition-all">VIEW ALL REVIEWS</button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {product.reviews?.map((review) => (
                                    <div key={review.id} className="bg-white p-10 rounded-[48px] border border-gray-100 hover:shadow-2xl hover:shadow-[#0F172A]/5 transition-all group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#818CF8]/5 to-transparent rounded-bl-full"></div>
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-xl ring-2 ring-gray-50 translate-y-[-20%]">
                                                    <Image src={review.avatar || `https://robohash.org/${review.user}.png`} alt={review.user} width={56} height={56} className="object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-sm text-[#0F172A]">{review.user}</p>
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex text-green-600">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} className={`w-2.5 h-2.5 ${i < review.rating ? 'fill-current' : 'text-gray-100'}`} />
                                                            ))}
                                                        </div>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ThumbsUp className="w-4 h-4 text-gray-200 group-hover:text-[#818CF8] cursor-pointer transition-colors" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-500 leading-relaxed italic">"{review.comment}"</p>
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
                                <div className="w-10 h-1 bg-gradient-to-r from-[#818CF8] to-[#2DD4BF] rounded-full"></div>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] to-[#2DD4BF]">Curated Collection</span>
                            </div>
                            <h2 className="text-5xl font-black uppercase tracking-tighter italic text-[#0F172A]">
                                SIMILAR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#F472B6] to-[#2DD4BF] not-italic underline decoration-[#818CF8]/20">STYLE</span>
                            </h2>
                        </div>
                        <Link href={`/products?category=${product.category}`} className="text-xs font-black uppercase tracking-widest group flex items-center gap-3 text-gray-400 hover:text-[#818CF8] transition-colors">
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
