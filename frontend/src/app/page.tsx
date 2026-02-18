import Hero from '@/components/layout/Hero';
import FeaturedSection from '@/components/home/FeaturedSection';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import { ArrowRight, Sparkles, ShieldCheck, Globe, Star } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "StyleNest | Cyber-Luxe Fashion Archive",
  description: "Welcome to StyleNest, the apex of curated fashion. Discover our latest collections for Men, Women, and Kids. VER:2026 // TYPE:ARCHIVE.",
};

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />

      <CategoryShowcase />

      {/* Brand Statement Section */}
      <section className="py-32 bg-[#0A0F1D] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 hidden lg:block">
          <Image
            src="https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=format&fit=crop&w=1000"
            alt="Brand Heritage"
            fill
            className="object-cover grayscale"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1D] via-[#0A0F1D]/80 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl space-y-12">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#818CF8]" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#818CF8]">The StyleNest Manifesto</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase italic">
              Beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#F472B6] to-[#2DD4BF] not-italic">Transient</span> <br />
              Trends.
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed italic border-l-2 border-[#818CF8]/30 pl-8">
              "Fashion is temporary, but style is who you are. We don't just sell apparel; we curation identities for the modern vanguard in the digital era."
            </p>
            <div className="grid grid-cols-3 gap-12 pt-8">
              <div className="space-y-3">
                <ShieldCheck className="w-6 h-6 text-[#2DD4BF]" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Ethical Craft</p>
              </div>
              <div className="space-y-3">
                <Globe className="w-6 h-6 text-[#818CF8]" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Global Reach</p>
              </div>
              <div className="space-y-3">
                <Star className="w-6 h-6 text-[#F472B6]" />
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Iconic Design</p>
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
        <div className="bg-[#0F172A] rounded-[80px] p-20 md:p-32 relative overflow-hidden group text-center border border-white/5">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#818CF8]/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#2DD4BF]/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] italic tracking-tighter uppercase">Join the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] to-[#2DD4BF] not-italic">Vault</span></h2>
            <p className="text-gray-400 text-lg font-medium italic">Unlock the ultimate StyleNest experience. Early access, bespoke styling, and events reserved for the digital elite.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto bg-white/5 p-2 rounded-full backdrop-blur-xl border border-white/10">
              <input
                type="email"
                placeholder="ENTER EMAIL FOR ACCESS"
                className="bg-transparent rounded-full px-8 py-5 text-white text-[10px] uppercase font-black focus:outline-none focus:ring-0 transition-all flex-grow placeholder:text-gray-600"
              />
              <button className="bg-white hover:bg-gray-100 text-[#0F172A] px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95">
                ENTER
                <ArrowRight className="w-4 h-4 text-[#818CF8]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
