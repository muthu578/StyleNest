import Image from 'next/image';

export default function FlagshipsPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-8 mb-32">
                    <span className="text-sm font-black uppercase tracking-[0.5em] text-pink-500">World of StyleNest</span>
                    <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">
                        Our <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-400">Flagships</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    {[
                        {
                            city: "Paris",
                            address: "15 Avenue Montaigne, 75008 Paris",
                            image: "https://images.pexels.com/photos/1530660/pexels-photo-1530660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        },
                        {
                            city: "Milan",
                            address: "Via Montenapoleone, 2, 20121 Milano",
                            image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        },
                        {
                            city: "London",
                            address: "160-166 New Bond St, London W1S 2UE",
                            image: "https://images.pexels.com/photos/1630344/pexels-photo-1630344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        },
                        {
                            city: "New York",
                            address: "711 5th Ave, New York, NY 10022",
                            image: "https://images.pexels.com/photos/1796730/pexels-photo-1796730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        }
                    ].map((store, idx) => (
                        <div key={idx} className="group relative aspect-video overflow-hidden rounded-[48px] bg-gray-100">
                            <Image src={store.image} alt={store.city} fill className="object-cover transition-transform duration-[4s] group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-12">
                                <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">{store.city}</h2>
                                <p className="text-gray-300 font-medium uppercase tracking-widest text-xs">{store.address}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="rounded-[64px] bg-pink-50 p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="space-y-6 max-w-xl">
                        <h2 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase">Personal Styling</h2>
                        <p className="text-lg text-gray-600 leading-relaxed font-medium capitalize">Book a private session at any of our global boutiques for a curated wardrobe experience.</p>
                        <button className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-pink-600 transition-colors">Book Concierge</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
