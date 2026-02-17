import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Info Side */}
                    <div className="space-y-16">
                        <div className="space-y-8">
                            <span className="text-sm font-black uppercase tracking-[0.5em] text-pink-500">How can we assist you?</span>
                            <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">
                                Contact <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">The House</span>
                            </h1>
                            <p className="text-xl text-gray-500 font-medium italic max-w-md">Our concierge team is available around the clock to ensure your experience with Trendora is nothing short of exceptional.</p>
                        </div>

                        <div className="space-y-12">
                            {[
                                { icon: Phone, label: "Client Services", value: "+1 (800) TRENDORA" },
                                { icon: Mail, label: "Official Inquiry", value: "house@trendora.com" },
                                { icon: MessageCircle, label: "WhatsApp Concierge", value: "Live Chat Available" },
                                { icon: MapPin, label: "Corporate HQ", value: "Flagship HQ, Paris, FR" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-8 group">
                                    <div className="p-4 rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-pink-500 group-hover:text-white transition-all duration-500">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{item.label}</p>
                                        <p className="text-2xl font-black text-gray-900 italic tracking-tighter uppercase">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="bg-gray-50 rounded-[64px] p-12 md:p-16">
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Full Name</label>
                                    <input type="text" className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-pink-500 transition-colors" placeholder="Alexander McQueen" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Email Address</label>
                                    <input type="email" className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-pink-500 transition-colors" placeholder="alex@luxury.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Subject</label>
                                <select className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-pink-500 transition-colors appearance-none">
                                    <option>Bespoke Orders</option>
                                    <option>Wholesale Inquiries</option>
                                    <option>Press & Media</option>
                                    <option>Career Opportunities</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Message</label>
                                <textarea rows={6} className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-pink-500 transition-colors resize-none" placeholder="How can the House assist you today?"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-xs hover:bg-pink-600 transition-all shadow-2xl hover:translate-y-[-2px]">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
