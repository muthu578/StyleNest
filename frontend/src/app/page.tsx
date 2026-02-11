import Hero from '@/components/layout/Hero';
import FeaturedSection from '@/components/home/FeaturedSection';

export default function Home() {
  // We don't have server data fetching in this page yet because the API is local and might not be reachable during build if I were to use generateStaticParams etc. 
  // For now I'll use client components inside.

  return (
    <div className="bg-white">
      <Hero />
      <div className="space-y-16 py-16">
        <FeaturedSection title="Featured Collection" limit={4} />
        <FeaturedSection title="New Arrivals" category="women" limit={4} />
        <FeaturedSection title="Trending for Men" category="men" limit={4} />
        <FeaturedSection title="Kids Fashion" category="kids" limit={4} />
        <FeaturedSection title="Home Decor" category="home" limit={4} />
        <FeaturedSection title="Beauty Picks" category="beauty" limit={4} />
      </div>
    </div>
  );
}
