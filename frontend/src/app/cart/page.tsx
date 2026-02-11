'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

const CartPage = () => {
    const { items, totalAmount, totalQuantity } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="mb-6 flex justify-center">
                    <div className="bg-gray-100 p-6 rounded-full">
                        <ShoppingBag className="h-12 w-12 text-gray-400" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet.</p>
                <Link href="/products">
                    <Button size="lg">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalQuantity} items)</h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-8">
                    <ul className="divide-y divide-gray-200">
                        {items.map((item) => (
                            <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                        src={item.thumbnail}
                                        alt={item.title}
                                        width={96}
                                        height={96}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3>
                                                <Link href={`/products/${item.id}`}>{item.title}</Link>
                                            </h3>
                                            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="flex items-center border rounded-md">
                                            <button
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                                                className="p-1 hover:bg-gray-100 disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-4 w-4 text-gray-500" />
                                            </button>
                                            <span className="px-3 font-medium text-gray-900">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                                className="p-1 hover:bg-gray-100"
                                            >
                                                <Plus className="h-4 w-4 text-gray-500" />
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                        >
                                            <Trash2 className="h-4 w-4" /> Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-16 lg:mt-0 lg:col-span-4">
                    <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                        <div className="flow-root">
                            <dl className="-my-4 divide-y divide-gray-200 text-sm">
                                <div className="flex items-center justify-between py-4">
                                    <dt className="text-gray-600">Subtotal</dt>
                                    <dd className="font-medium text-gray-900">${totalAmount.toFixed(2)}</dd>
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <dt className="text-gray-600">Shipping</dt>
                                    <dd className="font-medium text-gray-900">Free</dd>
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <dt className="text-gray-600">Tax</dt>
                                    <dd className="font-medium text-gray-900">$0.00</dd>
                                </div>
                                <div className="flex items-center justify-between py-4 border-t border-gray-200">
                                    <dt className="text-base font-medium text-gray-900">Order Total</dt>
                                    <dd className="text-base font-bold text-gray-900">${totalAmount.toFixed(2)}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="mt-6">
                            <Link href="/checkout">
                                <Button className="w-full" size="lg">
                                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <Link href="/products" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
