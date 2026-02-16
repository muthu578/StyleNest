'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice';
import { login } from '@/services/api';
import Link from 'next/link';
import Image from 'next/image';
import { User, Lock, ArrowRight, Check } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginStart());
        setError('');

        try {
            const data = await login({ username, password });
            const { accessToken, refreshToken, ...user } = data as any;
            dispatch(loginSuccess({ user, accessToken, refreshToken }));
            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
            dispatch(loginFailure(err.response?.data?.message || 'Login failed'));
        }
    };

    return (
        <div className="h-screen flex flex-col bg-white overflow-hidden font-sans">
            {/* Header */}
            <header className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="Trendora" width={304} height={135} priority className="h-[73px] w-auto" />
                </Link>
                <Link href="/" className="text-xs font-bold text-gray-500 hover:text-black uppercase tracking-widest transition-colors">
                    Back to Store
                </Link>
            </header>

            <div className="flex-grow flex flex-col lg:flex-row min-h-0">
                {/* Left Side: Login Form */}
                <div className="w-full lg:w-[45%] flex items-center justify-center p-6 lg:p-8 xl:p-12 relative bg-white overflow-y-auto no-scrollbar">
                    <div className="w-full max-w-sm animate-fade-in">
                        <div className="space-y-1 mb-6 text-center lg:text-left">
                            <h2 className="text-3xl xl:text-4xl font-extrabold text-gray-900 tracking-tight">Welcome Back!</h2>
                            <p className="text-gray-500 text-base font-medium">Please enter your details to sign in.</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label htmlFor="username" className="text-[10px] font-bold text-gray-700 ml-1 uppercase tracking-[0.2em]">Username</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-black text-gray-400 transition-colors">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <input
                                        id="username"
                                        type="text"
                                        required
                                        placeholder="Enter username"
                                        className="block w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all outline-none text-sm text-gray-900 placeholder:text-gray-400 font-medium"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="password" className="text-[10px] font-bold text-gray-700 ml-1 uppercase tracking-[0.2em]">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-black text-gray-400 transition-colors">
                                        <Lock className="h-4 w-4" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="block w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all outline-none text-sm text-gray-900 placeholder:text-gray-400 font-medium"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-xs font-semibold bg-red-50 p-2.5 rounded-lg border border-red-100 animate-pulse">{error}</p>}

                            <div className="flex items-center justify-between py-0.5">
                                <label className="flex items-center space-x-2.5 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={rememberMe}
                                            onChange={() => setRememberMe(!rememberMe)}
                                        />
                                        <div className="w-5 h-5 border-2 border-gray-200 rounded-md peer-checked:bg-pink-500 peer-checked:border-pink-500 transition-all duration-300 group-hover:border-pink-300 shadow-sm"></div>
                                        <Check className="absolute top-0.5 left-0.5 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-all duration-300 scale-50 peer-checked:scale-100" />
                                    </div>
                                    <span className="text-xs text-gray-600 group-hover:text-black transition-colors font-semibold">Keep me logged in</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-pink-500 text-white py-3 rounded-xl font-bold text-base hover:bg-pink-600 hover:shadow-xl hover:shadow-pink-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-pink-500/10"
                            >
                                LOG IN
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-500 text-sm font-medium">
                                Don't have an account?{' '}
                                <Link href="/register" className="text-pink-500 font-bold hover:underline underline-offset-4 decoration-2 transition-all">
                                    Register Now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Lifestyle Image */}
                <div className="hidden lg:block lg:w-[55%] relative overflow-hidden group">
                    <Image
                        src="https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Fashion Lifestyle"
                        fill
                        className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Floating Badge */}
                    <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl animate-bounce-slow">
                        <div className="text-white text-[8px] font-black uppercase tracking-[0.3em] opacity-80 mb-0.5 text-center">Trending</div>
                        <div className="text-pink-400 text-lg font-black text-center">#STREETSTYLE</div>
                    </div>

                    <div className="absolute bottom-12 left-12 right-12 text-white max-w-md">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-1 bg-pink-500 rounded-full"></div>
                            <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-90">Spring Summer 2026</p>
                        </div>
                        <h3 className="text-5xl xl:text-6xl font-black leading-[1] tracking-tighter mb-6 italic">
                            STYLE IS <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-300 not-italic">EVERYTHING</span>
                        </h3>
                        <p className="text-sm text-gray-200 font-medium leading-relaxed opacity-90 p-3 border-l-3 border-pink-500 bg-white/5 backdrop-blur-sm rounded-r-xl">
                            Discover the latest streetwear trends and unleash your unique personality with Trendora collections.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Promo Banner */}
            <div className="w-full bg-pink-500 text-white py-3 px-4 text-center shadow-2xl relative z-10 overflow-hidden shrink-0">
                <div className="flex items-center justify-center gap-8 animate-marquee whitespace-nowrap">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-8">
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase flex items-center gap-2">
                                SIGN UP AND GET 20% OFF FOR ALL STYLE-NEST COLLECTIONS <ArrowRight className="w-3 h-3" />
                            </span>
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-50">•</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Login;
