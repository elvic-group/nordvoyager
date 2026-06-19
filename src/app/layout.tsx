import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { LocaleProvider } from "@/lib/i18n";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NordVoyager — AI-reiseplanlegger for Nord-Norge",
  description:
    "AI-drevet reiseplanlegger for Nord-Norge. Skreddersydd for sesong, budsjett og interesser.",
  keywords: [
    "Nord-Norge",
    "reiseplanlegger",
    "nordlys",
    "Tromsø",
    "Lofoten",
    "AI",
    "Norge",
  ],
  openGraph: {
    title: "NordVoyager — Planlegg din Nord-Norge-reise",
    description:
      "AI-drevet reiseplanlegger skreddersydd for sesong, budsjett og interesser",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb" className={inter.variable}>
      <body className="min-h-full flex flex-col font-sans">
        <SessionProvider>
          <LocaleProvider>
            <Navbar />
            <ErrorBoundary>
              <main className="flex-1">{children}</main>
            </ErrorBoundary>
            <Footer />
          </LocaleProvider>
        </SessionProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
