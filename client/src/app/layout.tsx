import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";
import QueryProvider from "@/lib/query-provider";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plant Pals",
  description: "Share plants easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(geistSans.variable, geistMono.variable, "font-sans", inter.variable, "dark")} >
      <body>
        <div className="p-6 flex items-center justify-between border-b border-border">
          <h1 className="text-primary">🌱 Plant Pals</h1>
          <div className="bg-primary-dark flex items-center rounded-lg px-6">
            <Link href="/" className="px-4 py-2">
              <p className="text-primary">Browse</p>
            </Link>
            <Link href="/my-requests" className="px-4 py-2">
              <p className="text-primary">My Requests</p>
            </Link>
          </div>

          <div className="bg-primary-dark flex items-center rounded-lg">
            <Link href="/" className="px-4 py-2">
              <p className="text-primary">Sign In</p>
            </Link>
          </div>
        </div>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
