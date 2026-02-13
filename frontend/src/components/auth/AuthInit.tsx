'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '@/services/api';
import { setUser, logout } from '@/store/slices/authSlice';
import Cookies from 'js-cookie';

export default function AuthInit({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const initAuth = async () => {
            const token = Cookies.get('accessToken');
            if (token) {
                try {
                    const user = await getCurrentUser();
                    dispatch(setUser(user));
                } catch (error) {
                    console.error('Auth initialization failed:', error);
                    // If getCurrentUser fails (e.g. invalid/expired token), we might want to clear it
                    // But our interceptor might handle the refresh. 
                    // If it still fails, it will call logout.
                }
            }
        };

        initAuth();
    }, [dispatch]);

    return <>{children}</>;
}
