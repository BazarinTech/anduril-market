import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { FloatingButtons } from "@/components/shared/floating-buttons";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bima",
    template: "%s · Bima",
  },
  description: "Products, team rewards and an M-Pesa wallet in one account.",
  applicationName: "Bima",
};

// Tints the mobile browser chrome to match the ink hero surfaces.
export const viewport: Viewport = {
  themeColor: "#0A0E16",
};

export const dynamic = "force-dynamic"
export const revalidate = 0


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geistSans.variable, geistMono.variable)}>
      <body className="antialiased">
        {children}
        <FloatingButtons />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
