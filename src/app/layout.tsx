import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
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
      <body className={`bg-black text-white ${sourceCodePro.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen px-4 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}