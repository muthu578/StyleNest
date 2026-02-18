import { Metadata } from 'next';
import OrdersClient from './OrdersClient';

export const metadata: Metadata = {
    title: "Order History",
    description: "Review your StyleNest acquisitions and heritage.",
    robots: { index: false, follow: false },
};

export default function OrdersPage() {
    return <OrdersClient />;
}
