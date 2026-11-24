import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Toaster } from "sonner";
import { FloatingButtons } from "@/components/shared/floating-buttons";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DESCRIPTION = "Music rentals, crew rewards and an M-Pesa wallet in one account."

/**
 * Link previews (WhatsApp, Telegram, Facebook) need absolute image URLs.
 * The base is read from the request so the share card resolves on whatever
 * domain the site is served from; without it Next falls back to localhost
 * and crawlers get no image. app/opengraph-image.jpg and twitter-image.jpg
 * are picked up automatically and resolved against this base.
 */
export async function generateMetadata(): Promise<Metadata> {
  const h = await headers()
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000"
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https")

  return {
    metadataBase: new URL(`${proto}://${host}`),
    title: {
      default: "Musically",
      template: "%s · Musically",
    },
    description: DESCRIPTION,
    applicationName: "Musically",
    openGraph: {
      type: "website",
      siteName: "Musically",
      title: "Musically: rent a track, earn every day",
      description: DESCRIPTION,
      url: "/",
    },
    twitter: {
      card: "summary_large_image",
      title: "Musically: rent a track, earn every day",
      description: DESCRIPTION,
    },
  }
}

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
