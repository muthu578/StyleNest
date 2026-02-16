import Hero from '@/components/layout/Hero';
import FeaturedSection from '@/components/home/FeaturedSection';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import { ArrowRight, Sparkles, ShieldCheck, Globe, Star } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home | Trendora Premier Fashion",
  description: "Welcome to Trendora, the apex of curated fashion. Discover our latest collections for Men, Women, and Kids. Beyond trends, timeless style.",
};

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />

      <CategoryShowcase />

      {/* Brand Statement Section */}
      <section className="py-32 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 hidden lg:block">
          <Image
            src="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=format&fit=crop&w=1000"
            alt="Brand Heritage"
            fill
            className="object-cover grayscale"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-12">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-500">The Trendora Manifesto</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase italic">
              Beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 not-italic">Transient</span> <br />
              Trends.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed italic border-l-4 border-pink-500 pl-8">
              "Fashion is temporary, but style is who you are. We don't just sell apparel; we curate identities for the modern vanguard."
            </p>
            <div className="grid grid-cols-3 gap-12 pt-8">
              <div className="space-y-3">
                <ShieldCheck className="w-6 h-6 text-pink-500" />
                <p className="text-[10px] font-black uppercase tracking-widest">Ethical Craft</p>
              </div>
              <div className="space-y-3">
                <Globe className="w-6 h-6 text-pink-500" />
                <p className="text-[10px] font-black uppercase tracking-widest">Global Reach</p>
              </div>
              <div className="space-y-3">
                <Star className="w-6 h-6 text-pink-500" />
                <p className="text-[10px] font-black uppercase tracking-widest">Iconic Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-32 pb-32">
        <FeaturedSection title="Curated Essentials" limit={4} priority={true} />
        <FeaturedSection title="The Modern Voyager" category="men" limit={4} />
        <FeaturedSection title="Studio Feminine" category="women" limit={4} />
      </div>

      {/* Final Membership CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-[80px] p-20 md:p-32 relative overflow-hidden group text-center">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-500/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] italic tracking-tighter uppercase">Join the <br /> <span className="text-pink-500 not-italic">Vanguard</span></h2>
            <p className="text-gray-400 text-lg font-medium italic">Unlock the ultimate Trendora experience. Early access, bespoke styling, and events reserved for the few.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="ENTER EMAIL FOR ACCESS"
                className="bg-white/5 border border-white/10 rounded-full px-8 py-5 text-white text-[10px] uppercase font-black focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all flex-grow placeholder:text-gray-600"
              />
              <button className="bg-white hover:bg-pink-50 text-black px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all flex items-center gap-2">
                JOIN
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
