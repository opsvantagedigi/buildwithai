import './globals.css'
import '@/styles/landing.css'
import '@/assets/gds.css'
import '@/assets/docs.css'

import type { Metadata } from "next";
import { Inter, Orbitron } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from 'next/script'



export const metadata: Metadata = {
  title: "Build With AI | Next-Gen AI Website Builder",
  description: "The most advanced AI Website Builder platform for businesses, agencies, and creators. Futuristic, easy, and powerful.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        {/* Remove attributes injected by browser extensions (e.g. Grammarly) before React hydrates */}
        <Script id="strip-ext-attrs" strategy="beforeInteractive">
{`(() => {
  try {
    const attrs = ['data-new-gr-c-s-check-loaded','data-gr-ext-installed'];
    attrs.forEach(a => {
      if (document.documentElement && document.documentElement.hasAttribute(a)) {
        document.documentElement.removeAttribute(a);
      }
      if (document.body && document.body.hasAttribute(a)) {
        document.body.removeAttribute(a);
      }
      const els = document.querySelectorAll('[' + a + ']');
      els.forEach(e => e.removeAttribute(a));
    });
  } catch (e) {
    // ignore
  }
})();`}
        </Script>
        {/* Fonts are loaded via next/font (Inter + Orbitron) above; avoid duplicate manual preloads. */}
      </head>
      <body className="antialiased bg-black text-white">
        <Header />
        <div className="site-content">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
