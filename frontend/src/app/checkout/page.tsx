'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { clearCart } from '@/store/slices/cartSlice';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
    const { items, totalAmount } = useSelector((state: RootState) => state.cart);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');

    if (!user && step !== 'confirmation') {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">You must be logged in to checkout.</h2>
                <div className="flex justify-center gap-4">
                    <Link href="/login"><Button>Sign In</Button></Link>
                    <Link href="/register"><Button variant="outline">Create Account</Button></Link>
                </div>
            </div>
        );
    }

    if (items.length === 0 && step !== 'confirmation') {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link href="/products"><Button>Go Shopping</Button></Link>
            </div>
        );
    }

    const handlePlaceOrder = () => {
        // Simulate order processing
        setTimeout(() => {
            dispatch(clearCart());
            setStep('confirmation');
        }, 1500);
    };

    if (step === 'confirmation') {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="h-24 w-24 text-green-500" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
                <p className="text-xl text-gray-600 mb-8">Your order has been placed successfully.</p>
                <div className="bg-gray-50 p-8 rounded-lg mb-8 text-left">
                    <h3 className="font-bold text-lg mb-4">Order Details</h3>
                    <p>Order ID: #{Math.floor(Math.random() * 1000000)}</p>
                    <p>Total Paid: ${totalAmount.toFixed(2)}</p>
                    <p>Estimated Delivery: 3-5 Business Days</p>
                </div>
                <Link href="/">
                    <Button size="lg">Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column - Forms */}
                <div>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="First Name" className="border p-2 rounded w-full" defaultValue={user?.firstName || ''} />
                                <input type="text" placeholder="Last Name" className="border p-2 rounded w-full" defaultValue={user?.lastName || ''} />
                            </div>
                            <input type="email" placeholder="Email Address" className="border p-2 rounded w-full" defaultValue={user?.email || ''} />
                            <input type="text" placeholder="Address" className="border p-2 rounded w-full" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="City" className="border p-2 rounded w-full" />
                                <input type="text" placeholder="Postal Code" className="border p-2 rounded w-full" />
                            </div>
                        </form>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                        <div className="border p-4 rounded bg-gray-50 text-sm text-gray-500 mb-4">
                            Dummy Payment Gateway. No sensitive data required.
                        </div>
                        <form className="space-y-4">
                            <input type="text" placeholder="Card Number" className="border p-2 rounded w-full" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="MM/YY" className="border p-2 rounded w-full" />
                                <input type="text" placeholder="CVC" className="border p-2 rounded w-full" />
                            </div>
                        </form>
                    </div>

                    <Button onClick={handlePlaceOrder} className="w-full" size="lg">
                        Place Order (${totalAmount.toFixed(2)})
                    </Button>
                </div>

                {/* Right Column - Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg h-fit">
                    <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                    <ul className="space-y-4 mb-6">
                        {items.map((item) => (
                            <li key={item.id} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-3">
                                    <span className="font-medium text-gray-900">{item.quantity} x</span>
                                    <span className="text-gray-600 truncate max-w-[150px]">{item.title}</span>
                                </div>
                                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">${totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
                            <span>Total</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
