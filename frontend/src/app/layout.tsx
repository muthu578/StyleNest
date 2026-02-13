import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "@/store/Provider";
import AuthInit from "@/components/auth/AuthInit";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trendora - Your Premier Fashion Destination",
  description: "Shop the latest Men, Women, and Kids fashion at Trendora.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Providers>
          <AuthInit>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </AuthInit>
        </Providers>
      </body>
    </html>
  );
}
