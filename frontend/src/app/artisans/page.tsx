import Image from 'next/image';

export default function ArtisansPage() {
    return (
        <main className="min-h-screen pt-20 md:pt-32 pb-16 md:pb-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="flex flex-col items-center text-center space-y-4 md:space-y-8 mb-12 md:mb-32">
                    <span className="text-[9px] md:text-sm font-black uppercase tracking-[0.5em] text-pink-500">Mastery in Every Stitch</span>
                    <h1 className="text-3xl md:text-8xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">
                        Our <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">Artisans</span>
                    </h1>
                    <p className="max-w-2xl text-sm md:text-xl font-medium text-gray-500 italic leading-relaxed px-4 md:px-0">
                        Behind every Trendora masterpiece is a lineage of skill. Our artisans are the guardians of craftsmanship, blending ancestral wisdom with contemporary design.
                    </p>
                </div>

                {/* Artisan Stories */}
                <div className="space-y-20 md:space-y-48">
                    {[
                        {
                            name: "Masters of Silk",
                            location: "Lyon, France",
                            desc: "In the heart of Lyon, our silk weavers use techniques passed down through six generations to create the luminous fabrics that define our evening collections.",
                            image: "https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        },
                        {
                            name: "Leather Architects",
                            location: "Florence, Italy",
                            desc: "Our leather goods are born in the workshops of Tuscany, where every hide is hand-selected and treated with organic extracts for unparalleled durability.",
                            image: "https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        }
                    ].map((story, idx) => (idx % 2 === 0 ? (
                        <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                            <div className="relative aspect-square overflow-hidden rounded-[32px] md:rounded-[64px] group">
                                <Image src={story.image} alt={story.name} fill className="object-cover transition-transform duration-[3s] group-hover:scale-110" />
                            </div>
                            <div className="space-y-6 md:space-y-8">
                                <div className="space-y-2">
                                    <p className="text-[9px] md:text-xs font-black uppercase tracking-[0.4em] text-pink-500">{story.location}</p>
                                    <h2 className="text-2xl md:text-5xl font-black text-gray-900 tracking-tighter italic uppercase">{story.name}</h2>
                                </div>
                                <p className="text-base md:text-xl text-gray-600 leading-relaxed font-medium italic">"{story.desc}"</p>
                                <div className="h-[1px] w-24 bg-gray-900" />
                            </div>
                        </div>
                    ) : (
                        <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
                            <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
                                <div className="space-y-2">
                                    <p className="text-[9px] md:text-xs font-black uppercase tracking-[0.4em] text-pink-500">{story.location}</p>
                                    <h2 className="text-2xl md:text-5xl font-black text-gray-900 tracking-tighter italic uppercase">{story.name}</h2>
                                </div>
                                <p className="text-sm md:text-xl text-gray-600 leading-relaxed font-medium italic">"{story.desc}"</p>
                                <div className="h-[1px] w-24 bg-gray-900" />
                            </div>
                            <div className="relative aspect-square overflow-hidden rounded-[32px] md:rounded-[64px] group order-1 lg:order-2">
                                <Image src={story.image} alt={story.name} fill className="object-cover transition-transform duration-[3s] group-hover:scale-110" />
                            </div>
                        </div>
                    )))}
                </div>

                {/* Craftsmanship Stats */}
                <div className="mt-20 md:mt-48 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 border-t border-gray-100 pt-12 md:pt-24">
                    {[
                        { label: "Hand-Stitched", value: "100%" },
                        { label: "Master Artisans", value: "250+" },
                        { label: "Hours per Garment", value: "48+" },
                        { label: "Global Workshops", value: "12" }
                    ].map((stat) => (
                        <div key={stat.label} className="text-center space-y-1">
                            <p className="text-2xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">{stat.value}</p>
                            <p className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
