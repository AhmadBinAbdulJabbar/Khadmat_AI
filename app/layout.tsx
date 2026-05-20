import type { Metadata, Viewport } from "next";
import "./globals.css";
import GlobalFooter from "../components/GlobalFooter";

export const metadata: Metadata = {
  title: "Khadmat AI — Pakistan's Smartest Home Services Platform",
  description:
    "Book plumbers, electricians, AC technicians, tutors and more in Urdu, Roman Urdu, or English. Powered by Google Antigravity AI agents.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/khadmat-icon.svg",
    apple: "/khadmat-icon.svg",
  },
  applicationName: "Khadmat AI",
  appleWebApp: {
    capable: true,
    title: "Khadmat AI",
    statusBarStyle: "default",
  },
  keywords: [
    "home services",
    "Pakistan",
    "AI booking",
    "plumber",
    "electrician",
    "Khadmat",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1d9e75",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {children}
        <GlobalFooter />
      </body>
    </html>
  );
}
