import type { AppProps } from 'next/app';
import "../app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 bg-black text-white">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
