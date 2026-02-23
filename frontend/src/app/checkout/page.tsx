import { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
    title: "Checkout",
    description: "Complete your Trendora acquisition. Secure and seamless checkout experience.",
    robots: { index: false, follow: false },
};

export default function CheckoutPage() {
    return <CheckoutClient />;
}
