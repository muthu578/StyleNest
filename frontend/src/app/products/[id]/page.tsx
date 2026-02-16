import { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';
import { getProductById } from '@/services/api';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    try {
        const product = await getProductById(Number(id));
        if (!product) return { title: "Product Not Found" };

        return {
            title: product.title,
            description: product.description,
            openGraph: {
                title: `${product.title} | Trendora`,
                description: product.description,
                images: [product.thumbnail],
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: product.title,
                description: product.description,
                images: [product.thumbnail],
            }
        };
    } catch (error) {
        return { title: "Trendora Piece" };
    }
}

export default async function ProductPage({ params }: Props) {
    return (
        <Suspense fallback={
            <div className="flex flex-col justify-center items-center min-h-screen py-40">
                <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
                <p className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Revealing Excellence...</p>
            </div>
        }>
            <ProductDetailClient />
        </Suspense>
    );
}
