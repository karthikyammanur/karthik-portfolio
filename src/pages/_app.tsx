import type { AppProps } from 'next/app';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxClientProvider from "@/components/ParallaxClientProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <ParallaxClientProvider>
      <Navbar />
      <main className="min-h-screen px-4 bg-black text-white">
        <Component {...pageProps} />
      </main>
      <Footer />
    </ParallaxClientProvider>
  );
}
