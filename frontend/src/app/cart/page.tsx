import { Metadata } from 'next';
import CartClient from './CartClient';

export const metadata: Metadata = {
    title: "Your Bag",
    description: "Review your selected pieces at Trendora. Curated fashion awaits.",
    robots: { index: false, follow: false },
};

export default function CartPage() {
    return <CartClient />;
}
