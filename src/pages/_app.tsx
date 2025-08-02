import type { AppProps } from 'next/app';
import { useEffect } from "react";
import { Source_Code_Pro } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";
import "../app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxClientProvider from "@/components/ParallaxClientProvider";

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className={`${sourceCodePro.variable}`}>
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
