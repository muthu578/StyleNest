import { Metadata } from 'next';
import RegisterClient from './RegisterClient';

export const metadata: Metadata = {
    title: "Join StyleNest",
    description: "Create your StyleNest account and join the vanguard of modern fashion.",
};

export default function RegisterPage() {
    return <RegisterClient />;
}
