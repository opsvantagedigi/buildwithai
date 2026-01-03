import type { Metadata } from "next";

import "./globals.css";
import "@/assets/gds.css";
import "@/assets/docs.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { Orbitron } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-default-body',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-default-heading',
  display: 'swap',
})



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
      </head>
      <body className="antialiased font-inter bg-gradient-brand">
        <Header />
        <div className="pt-20 pb-16 min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
