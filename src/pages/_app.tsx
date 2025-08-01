import type { AppProps } from 'next/app';
import { useEffect } from "react";
import { Share_Tech_Mono } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";
import "../app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxClientProvider from "@/components/ParallaxClientProvider";

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className={`${shareTechMono.variable}`}>
      <ParallaxClientProvider>
        <Navbar />
        <main className="min-h-screen px-4 bg-black text-white">
          <Component {...pageProps} />
        </main>
        <Footer />
      </ParallaxClientProvider>
    </div>
  );
}
