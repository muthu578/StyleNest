import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "@/store/Provider";
import AuthInit from "@/components/auth/AuthInit";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Trendora | Premier Fashion & Lifestyle Destination",
    template: "%s | Trendora"
  },
  description: "Experience curated excellence with Trendora. Shop the latest in high-end Men, Women, and Kids' fashion. Beyond trends, timeless style.",
  keywords: ["fashion", "luxury apparel", "men's style", "women's fashion", "kids clothing", "curated collection", "Trendora"],
  authors: [{ name: "Trendora Team" }],
  creator: "Trendora",
  publisher: "Trendora",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://stylenest-trendora.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Trendora | Premier Fashion & Lifestyle Destination",
    description: "Experience curated excellence with Trendora. Shop the latest in high-end Men, Women, and Kids' fashion.",
    url: 'https://stylenest-trendora.vercel.app',
    siteName: 'Trendora',
    images: [
      {
        url: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=format&fit=crop&w=1200&h=630',
        width: 1200,
        height: 630,
        alt: 'Trendora Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trendora | Premier Fashion & Lifestyle Destination',
    description: 'Experience curated excellence with Trendora.',
    images: ['https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=format&fit=crop&w=1200&h=630'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import ChatSupport from "@/components/support/ChatSupport";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} font-outfit antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          <AuthInit>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            <ChatSupport />
          </AuthInit>
        </Providers>
      </body>
    </html>
  );
}
