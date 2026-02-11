import Link from 'next/link';
import Button from '@/components/ui/Button';

const Hero = () => {
    return (
        <div className="relative bg-gray-900 overflow-hidden h-[80vh] flex items-center">
            {/* Abstract Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[30%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-indigo-900/20 blur-3xl" />
                <div className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-3xl" />
                <div className="absolute bottom-[-10%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-pink-900/20 blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-xl">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Discover Your <br />
                        <span className="text-indigo-400">Signature Style</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-300 mb-8 leading-relaxed">
                        Explore the latest trends in fashion. Elevate your wardrobe with our curated collection of premium clothing and accessories.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/products?category=women">
                            <Button size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-gray-100">
                                Shop Women
                            </Button>
                        </Link>
                        <Link href="/products?category=men">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10">
                                Shop Men
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
