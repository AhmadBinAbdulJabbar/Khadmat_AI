import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalFooter from "../components/GlobalFooter";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khadmat AI — Pakistan's Smartest Home Services Platform",
  description:
    "Book plumbers, electricians, AC technicians, tutors and more in Urdu, Roman Urdu, or English. Powered by Google Antigravity AI agents.",
  keywords: [
    "home services",
    "Pakistan",
    "AI booking",
    "plumber",
    "electrician",
    "Khadmat",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {children}
        <GlobalFooter />
      </body>
    </html>
  );
}
