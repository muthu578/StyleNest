import { Metadata } from 'next';
import ProductsClient from './ProductsClient';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const params = await searchParams;
    const category = params.category as string | undefined;

    const titles: { [key: string]: string } = {
        men: "Men's Luxury Fashion Collection",
        women: "Women's Designer Apparel & Style",
        kids: "Kids' Premium Clothing & Essentials",
        beauty: "Beauty & Personal Care Masterpieces",
        home: "Home & Living Curated Collection",
    };

    const title = category ? (titles[category] || `Shop ${category}`) : "All Curated Collections";
    const description = category
        ? `Explore our exclusive ${category} collection at StyleNest. Curated designer pieces for the modern vanguard.`
        : "Discover the full StyleNest collection. Premium apparel, beauty, and home essentials curated for quality and style.";

    return {
        title,
        description,
        openGraph: {
            title: `${title} | StyleNest`,
            description,
            images: ['https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=format&fit=crop&w=1200&h=630'],
        }
    };
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="flex justify-center pt-40 min-h-screen"><Loader2 className="h-12 w-12 animate-spin text-pink-500" /></div>}>
            <ProductsClient />
        </Suspense>
    );
}
