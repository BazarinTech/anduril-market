import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { FloatingButtons } from "@/components/shared/floating-buttons";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Musically",
    template: "%s · Musically",
  },
  description: "Music rentals, crew rewards and an M-Pesa wallet in one account.",
  applicationName: "Musically",
};

// Tints the mobile browser chrome to match the dark stage surfaces.
export const viewport: Viewport = {
  themeColor: "#09090B",
};

export const dynamic = "force-dynamic"
export const revalidate = 0


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable, geistMono.variable)}>
      <body className="antialiased">
        {children}
        <FloatingButtons />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
