import Link from 'next/link';
import Image from 'next/image';
import { Cpu, Globe, Zap, ShieldCheck, Sparkles, Layers, Box, Terminal } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-white selection:bg-pink-100 selection:text-pink-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="relative mb-40 group">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-pink-500/5 via-orange-500/5 to-transparent group-hover:from-pink-500/10 group-hover:via-orange-500/10 transition-colors duration-700 rounded-[80px]" />
                    <div className="relative flex flex-col items-center text-center space-y-10 py-24">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-8 bg-pink-500/30" />
                            <span className="text-sm font-black uppercase tracking-[0.6em] text-pink-500">The Vision of Trendora</span>
                            <div className="h-[1px] w-8 bg-pink-500/30" />
                        </div>
                        <h1 className="text-4xl md:text-9xl font-black text-gray-900 tracking-tighter italic uppercase leading-[0.85]">
                            Architecting <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-600 to-orange-500">Global Luxury</span>
                        </h1>
                        <p className="max-w-3xl text-lg md:text-2xl font-medium text-gray-500 leading-relaxed italic border-l-4 border-pink-500 pl-6 md:pl-10 text-left mx-auto">
                            Trendora is not just an e-commerce platform; it is a digital sanctuary for the modern vanguard.
                            We merge centuries-old artisanal craftsmanship with the frontier of computational intelligence.
                        </p>
                    </div>
                </div>

                {/* Founder & CTO Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center mb-48">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] md:rounded-[64px] bg-gray-100 group shadow-2xl shadow-pink-500/10">
                        <Image
                            src="/founder.jpg"
                            alt="Muthukumar - Founder & CTO"
                            fill
                            className="object-cover object-top transition-transform duration-[4s] group-hover:scale-110"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                        <div className="absolute bottom-12 left-12 text-white group-hover:translate-x-4 transition-transform duration-700">
                            <p className="text-sm font-black uppercase tracking-[0.4em] mb-4 text-pink-400">The Visionary Engineer</p>
                            <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">Muthukumar</h2>
                        </div>
                    </div>
                    <div className="space-y-12">
                        <div className="space-y-8">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 text-[10px] font-black uppercase tracking-widest border border-pink-100">Executive Leadership</span>
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter italic uppercase leading-tight">Mastermind of <br /> Digital Couture</h2>
                            <p className="text-xl text-gray-600 leading-relaxed font-normal">
                                <span className="font-black text-pink-500">Muthukumar</span>, the Founder and Chief Technology Officer of Trendora, bridges the gap between high-fashion heritage and technical supremacy.
                            </p>
                            <p className="text-xl text-gray-600 leading-relaxed italic border-l-2 border-gray-100 pl-8">
                                "Our mission is to decouple luxury from accessibility boundaries while maintaining the sanctity of artisanal quality. We aren't just building a store; we're building the future of human-AI collaboration in aesthetic expression."
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="p-6 md:p-10 border border-gray-100 rounded-[32px] md:rounded-[40px] bg-gray-50/50 hover:bg-white hover:shadow-xl hover:border-pink-500/20 transition-all duration-700 group">
                                <p className="text-2xl md:text-4xl font-black text-gray-900 mb-2 group-hover:text-pink-600 transition-colors italic uppercase">Founder</p>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Strategic Intelligence</p>
                            </div>
                            <div className="p-6 md:p-10 border border-gray-100 rounded-[32px] md:rounded-[40px] bg-gray-50/50 hover:bg-white hover:shadow-xl hover:border-pink-500/20 transition-all duration-700 group">
                                <p className="text-2xl md:text-4xl font-black text-gray-900 mb-2 group-hover:text-pink-600 transition-colors italic uppercase">CTO</p>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Technological Zenith</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Excellence Section */}
                <section className="mb-48 space-y-24">
                    <div className="max-w-3xl space-y-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Product Philosophy</span>
                        <h2 className="text-6xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">The Anatomy of <br /> Excellence</h2>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed italic">
                            Every piece in the Trendora collection undergoes a rigorous 14-point validation process. We source exclusively from gold-certified tanneries and fair-wage silk houses across Lyon and Tuscany.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {[
                            { icon: Box, title: "Artisanal Sourcing", desc: "Direct partnerships with heritage workshops, bypassing traditional supply chain inefficiencies." },
                            { icon: ShieldCheck, title: "Vault Authentication", desc: "Proprietary NFC-backed authenticity tags embedded in every premium garment." },
                            { icon: Sparkles, title: "Curated Currencies", desc: "A selection process so elite, only 2% of reviewed designs make it into our seasonal drops." },
                            { icon: Globe, title: "Global Logisitics", desc: "Eco-optimized shipping routes that reduce carbon footprint by 40% compared to industry norms." }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-6 md:p-10 rounded-[32px] md:rounded-[48px] bg-[#F8FAFC] border border-transparent hover:bg-white hover:shadow-[0_32px_64px_-16px_rgba(236,72,153,0.1)] hover:border-pink-500/20 transition-all duration-700">
                                <div className="flex flex-row md:flex-col items-center md:items-start gap-6 md:gap-0">
                                    <div className="p-4 bg-white rounded-2xl w-14 h-14 md:w-fit md:h-fit flex items-center justify-center mb-0 md:mb-8 shadow-sm group-hover:bg-black group-hover:text-white transition-all duration-500 shrink-0">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-2 md:space-y-4">
                                        <h3 className="text-lg md:text-2xl font-black italic tracking-tighter uppercase text-gray-900 group-hover:text-pink-600 transition-colors leading-none">{item.title}</h3>
                                        <p className="text-gray-500 leading-relaxed font-medium text-xs md:text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tech Stack Segment */}
                <section className="relative overflow-hidden rounded-[80px] bg-black text-white p-12 md:p-32 mb-48 group">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Terminal className="w-96 h-96 -mr-32 -mt-32" />
                    </div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <span className="text-pink-500 text-[10px] font-black uppercase tracking-[0.5em]">The Infrastructure</span>
                                <h2 className="text-6xl font-black tracking-tighter italic uppercase leading-none">Powered by <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">The Edge</span></h2>
                                <p className="text-xl text-gray-400 font-medium leading-relaxed">
                                    Under the guidance of our CTO, Trendora utilizes a bespoke tech stack designed for sub-100ms response times and predictive commerce.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Layers className="w-5 h-5 text-pink-500" />
                                        <p className="font-black italic uppercase tracking-tighter text-lg">Next.js 15</p>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed font-bold uppercase tracking-widest">Server Component Architecture for ultimate SEO and speed.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Cpu className="w-5 h-5 text-pink-500" />
                                        <p className="font-black italic uppercase tracking-tighter text-lg">AI Core</p>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed font-bold uppercase tracking-widest">Vector search and LLM-powered concierge for personalized discovery.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Terminal className="w-5 h-5 text-pink-500" />
                                        <p className="font-black italic uppercase tracking-tighter text-lg">TypeScript</p>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed font-bold uppercase tracking-widest">Type-safe development ensuring zero-failure checkout flows.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Zap className="w-5 h-5 text-pink-500" />
                                        <p className="font-black italic uppercase tracking-tighter text-lg">Redux Toolkit</p>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed font-bold uppercase tracking-widest">Predictable state management for a seamless global shopping bag.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-auto md:aspect-square bg-white/5 rounded-[40px] md:rounded-[64px] border border-white/10 p-8 md:p-12 flex items-center justify-center group-hover:border-pink-500/30 transition-colors duration-700">
                            <div className="grid grid-cols-2 gap-4 md:gap-8 text-center w-full">
                                <div className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-3xl animate-pulse">
                                    <p className="text-2xl md:text-4xl font-black tracking-tighter">99.9%</p>
                                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-pink-500">Uptime</p>
                                </div>
                                <div className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-pink-500 animate-bounce duration-3000">
                                    <p className="text-2xl md:text-4xl font-black tracking-tighter">45ms</p>
                                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-black">Latancy</p>
                                </div>
                                <div className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white text-black">
                                    <p className="text-2xl md:text-4xl font-black tracking-tighter">AI</p>
                                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">Integrated</p>
                                </div>
                                <div className="p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-3xl">
                                    <p className="text-2xl md:text-4xl font-black tracking-tighter">SSL+</p>
                                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-pink-500">Secure</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final Vision Segment */}
                <div className="text-center space-y-12 py-32 border-t border-gray-100">
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-pink-500">The 2030 Roadmap</span>
                    <h2 className="text-4xl md:text-9xl font-black text-gray-900 tracking-[0.05em] uppercase italic leading-none">
                        Digital <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-400">Renaissance</span>
                    </h2>
                    <p className="max-w-3xl mx-auto text-xl text-gray-500 italic font-medium leading-relaxed">
                        By 2030, Trendora aims to be the first fully circular luxury fashion ecosystem powered by the decentralized web. We are moving beyond e-commerce, into a world where fashion, technology, and sustainability are one singular, beautiful breath.
                    </p>
                    <Link href="/" className="inline-block bg-black text-white px-16 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[11px] hover:bg-pink-600 hover:scale-105 transition-all shadow-2xl shadow-pink-500/20 active:scale-95">Explore the Collection</Link>
                </div>
            </div>
        </main>
    );
}
