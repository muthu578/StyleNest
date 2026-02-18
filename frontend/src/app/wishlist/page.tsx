import { Metadata } from 'next';
import WishlistClient from './WishlistClient';

export const metadata: Metadata = {
    title: "My Wishlist",
    description: "Your curated list of desired StyleNest pieces.",
    robots: { index: false, follow: false },
};

export default function WishlistPage() {
    return <WishlistClient />;
}
