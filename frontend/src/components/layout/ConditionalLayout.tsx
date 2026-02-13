'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import { cn } from '@/lib/utils';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/register';

    return (
        <>
            {!isAuthPage && <Navbar />}
            <main className={cn(
                "flex-grow",
                isAuthPage ? "h-screen overflow-hidden" : ""
            )}>
                {children}
            </main>
            {!isAuthPage && <Footer />}
        </>
    );
}
