import { Metadata } from 'next';
import ProfileClient from './ProfileClient';

export const metadata: Metadata = {
    title: "Account Settings",
    description: "Manage your Trendora profile and preferences.",
    robots: { index: false, follow: false },
};

export default function ProfilePage() {
    return <ProfileClient />;
}
