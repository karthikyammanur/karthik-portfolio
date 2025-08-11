import type { Metadata } from "next";
import { Tomorrow } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import { Analytics } from "@vercel/analytics/next"

const tomorrow = Tomorrow({
  variable: "--font-tomorrow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: 'Karthik Yammanur | Portfolio',
  description: 'AI Developer, Researcher, and Builder',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-black text-white ${tomorrow.variable} antialiased`}>
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen px-4 pt-20">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}