import Image from 'next/image';

export default function SustainabilityPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-zinc-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-[64px] bg-zinc-900 text-white p-12 md:p-24 mb-32 group">
                    <div className="absolute inset-0 opacity-40">
                        <Image
                            src="https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Sustainability"
                            fill
                            className="object-cover transition-transform duration-[5s] group-hover:scale-105"
                        />
                    </div>
                    <div className="relative z-10 max-w-2xl space-y-8">
                        <span className="text-xs font-black uppercase tracking-[0.5em] text-emerald-400">Ethical by Design</span>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-none">
                            Fashion <br />
                            <span className="text-emerald-400">for Good</span>
                        </h1>
                        <p className="text-xl font-medium text-zinc-300 italic leading-relaxed">
                            Trendora is committed to a circular future. We believe that true luxury should be timeless, not just in style, but in its impact on our world.
                        </p>
                    </div>
                </div>

                {/* Our Approach */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-48">
                    {[
                        {
                            title: "Circular Design",
                            desc: "We design products that are meant to last and easier to recycle, reducing waste at every stage of the lifecycle.",
                            icon: "🔄"
                        },
                        {
                            title: "Eco Materials",
                            desc: "From organic cotton to recycled ocean plastics, we only source materials that meet the highest environmental standards.",
                            icon: "🌿"
                        },
                        {
                            title: "Net Zero Path",
                            desc: "Our workshops are powered by renewable energy, and we are on a mission to be carbon neutral by 2030.",
                            icon: "⚡"
                        }
                    ].map((item) => (
                        <div key={item.title} className="space-y-6 p-10 bg-white rounded-[48px] shadow-sm hover:shadow-xl transition-all duration-500 border border-zinc-100">
                            <div className="text-4xl">{item.icon}</div>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-900">{item.title}</h3>
                            <p className="text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Impact Statement */}
                <div className="bg-emerald-950 rounded-[48px] p-12 md:p-24 text-center space-y-12">
                    <h2 className="text-4xl md:text-6xl font-black text-emerald-100 tracking-tighter italic uppercase">Reducing our footprint, <br /> enhancing your style.</h2>
                    <div className="flex flex-wrap justify-center gap-12 text-zinc-400 font-black uppercase tracking-widest text-[10px]">
                        <span>• Zero Plastic Packaging</span>
                        <span>• Fair Wage Certified</span>
                        <span>• Water-Wise Dyeing</span>
                        <span>• Regenerative Farming</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
