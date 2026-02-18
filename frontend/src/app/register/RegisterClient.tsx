'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginStart, loginFailure } from '@/store/slices/authSlice';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { register } from '@/services/api';
import { Mail, User, Lock, ArrowRight, Check } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const dispatch = useDispatch();
    const router = useRouter();
    const [error, setError] = useState('');
    const { token, loading } = useSelector((state: any) => state.auth);
    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        uppercase: false,
        symbol: false,
    });

    useEffect(() => {
        if (token) {
            router.push('/');
        }
    }, [token, router]);

    const validatePassword = (pass: string) => {
        const validation = {
            length: pass.length >= 6,
            uppercase: /[A-Z]/.test(pass),
            symbol: /[!@#$%^&*(),.?":{}|<>_+-]/.test(pass),
        };
        setPasswordValidation(validation);
        return validation.length && validation.uppercase && validation.symbol;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'password') {
            validatePassword(e.target.value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginStart());
        setError('');

        const trimmedUsername = formData.username.trim();
        const trimmedEmail = formData.email.trim();
        const trimmedPassword = formData.password.trim();

        if (!validatePassword(trimmedPassword)) {
            setError('Password does not meet requirements');
            dispatch(loginFailure('Invalid password'));
            return;
        }

        if (trimmedPassword !== formData.confirmPassword.trim()) {
            setError('Passwords do not match');
            dispatch(loginFailure('Passwords mismatch'));
            return;
        }

        try {
            const data = await register({
                username: trimmedUsername,
                email: trimmedEmail,
                password: trimmedPassword
            });
            const { accessToken, refreshToken, ...user } = data as any;
            dispatch(loginSuccess({ user, accessToken, refreshToken }));

            setTimeout(() => {
                router.push('/');
            }, 100);
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Registration failed';
            setError(msg);
            dispatch(loginFailure(msg));
        }
    };

    return (
        <div className="h-screen flex flex-col bg-white overflow-hidden font-sans">
            {/* Header */}
            <header className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="StyleNest" width={304} height={135} priority className="h-[73px] w-auto" />
                </Link>
                <Link href="/" className="text-xs font-bold text-gray-500 hover:text-black uppercase tracking-widest transition-colors">
                    Back to Store
                </Link>
            </header>

            <div className="flex-grow flex flex-col lg:flex-row min-h-0">
                {/* Left Side: Register Form */}
                <div className="w-full lg:w-[45%] flex items-center justify-center p-6 lg:p-8 xl:p-12 relative bg-white overflow-y-auto no-scrollbar">
                    <div className="w-full max-w-sm animate-fade-in">
                        <div className="space-y-1 mb-6 text-center lg:text-left">
                            <h2 className="text-3xl xl:text-4xl font-extrabold text-gray-900 tracking-tight">Create Account</h2>
                            <p className="text-gray-500 text-base font-medium">Join us for a premium shopping experience.</p>
                        </div>

                        <form className="space-y-3" onSubmit={handleSubmit}>
                            <div className="space-y-1">
                                <label htmlFor="username" className="text-[10px] font-bold text-gray-700 ml-1 uppercase tracking-[0.2em]">Username</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-black text-gray-400 transition-colors">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        placeholder="Pick a username"
                                        className="block w-full pl-10 pr-4 py-2 bg-gray-50/50 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-[#818CF8]/10 focus:border-[#818CF8] transition-all outline-none text-sm text-[#0F172A] placeholder:text-gray-400 font-medium"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="email" className="text-[10px] font-bold text-gray-700 ml-1 uppercase tracking-[0.2em]">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-[#0F172A] text-gray-400 transition-colors">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="Enter email"
                                        className="block w-full pl-10 pr-4 py-2 bg-gray-50/50 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-[#818CF8]/10 focus:border-[#818CF8] transition-all outline-none text-sm text-[#0F172A] placeholder:text-gray-400 font-medium"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password" className="text-[10px] font-bold text-gray-700 ml-1 uppercase tracking-[0.2em]">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-[#0F172A] text-gray-400 transition-colors">
                                        <Lock className="h-4 w-4" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className={`block w-full pl-10 pr-4 py-2 bg-gray-50/50 border-2 rounded-xl focus:ring-4 focus:ring-[#818CF8]/10 focus:border-[#818CF8] transition-all outline-none text-sm text-[#0F172A] placeholder:text-gray-400 font-medium ${formData.password ? (Object.values(passwordValidation).every(v => v) ? 'border-green-100' : 'border-[#F472B6]/30') : 'border-gray-100'}`}
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                {formData.password && (
                                    <div className="mt-2 grid grid-cols-1 gap-1 px-1">
                                        <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${passwordValidation.length ? 'text-[#2DD4BF]' : 'text-gray-400'}`}>
                                            <div className={`w-1 h-1 rounded-full ${passwordValidation.length ? 'bg-[#2DD4BF]' : 'bg-gray-300'}`}></div>
                                            At least 6 characters
                                        </div>
                                        <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${passwordValidation.uppercase ? 'text-[#2DD4BF]' : 'text-gray-400'}`}>
                                            <div className={`w-1 h-1 rounded-full ${passwordValidation.uppercase ? 'bg-[#2DD4BF]' : 'bg-gray-300'}`}></div>
                                            One uppercase letter
                                        </div>
                                        <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${passwordValidation.symbol ? 'text-[#2DD4BF]' : 'text-gray-400'}`}>
                                            <div className={`w-1 h-1 rounded-full ${passwordValidation.symbol ? 'bg-[#2DD4BF]' : 'bg-gray-300'}`}></div>
                                            One special symbol
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="confirmPassword" className="text-[10px] font-bold text-gray-700 ml-1 uppercase tracking-[0.2em]">Confirm Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-[#0F172A] text-gray-400 transition-colors">
                                        <Check className="h-4 w-4" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="block w-full pl-10 pr-4 py-2 bg-gray-50/50 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-[#818CF8]/10 focus:border-[#818CF8] transition-all outline-none text-sm text-[#0F172A] placeholder:text-gray-400 font-medium"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-xs font-semibold bg-red-50 p-2.5 rounded-lg border border-red-100 animate-pulse">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-[#0F172A] text-white py-3 rounded-xl font-bold text-base hover:bg-[#1E293B] hover:shadow-xl hover:shadow-[#0F172A]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mt-4 shadow-lg shadow-[#0F172A]/10 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>CREATING ACCOUNT...</span>
                                    </div>
                                ) : (
                                    <>
                                        CREATE ACCOUNT
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-500 text-sm font-medium">
                                Already have an account?{' '}
                                <Link href="/login" className="text-[#818CF8] font-bold hover:underline underline-offset-4 decoration-2 transition-all">
                                    Sign In
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/20 to-transparent"></div>

                    <div className="absolute bottom-12 left-12 right-12 text-white max-w-md">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-1 bg-gradient-to-r from-[#818CF8] to-[#2DD4BF] rounded-full"></div>
                            <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-90">Exclusive Access</p>
                        </div>
                        <h3 className="text-5xl xl:text-6xl font-black leading-[1] tracking-tighter mb-6 italic">
                            JOIN THE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#F472B6] to-[#2DD4BF] not-italic">COMMUNITY</span>
                        </h3>
                        <p className="text-sm text-gray-200 font-medium leading-relaxed opacity-90 p-3 border-l-2 border-[#818CF8]/30 bg-[#0F172A]/40 backdrop-blur-sm rounded-r-xl italic">
                            "Unlock exclusive collections, early access to sales, and a personalized style feed."
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Promo Banner */}
            <div className="w-full bg-[#0F172A] text-white py-3 px-4 text-center shadow-2xl relative z-10 overflow-hidden shrink-0 border-t border-white/5">
                <div className="flex items-center justify-center gap-8 animate-marquee whitespace-nowrap">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-8">
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase flex items-center gap-2">
                                SIGN UP AND GET 20% OFF FOR ALL STYLE-NEST COLLECTIONS <ArrowRight className="w-3 h-3 text-[#818CF8]" />
                            </span>
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-20">•</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Register;
