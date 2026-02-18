import { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
    title: "Sign In",
    description: "Access your StyleNest account. Experience bespoke styling and early access.",
};

export default function LoginPage() {
    return <LoginClient />;
}
