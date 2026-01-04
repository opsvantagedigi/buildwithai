import './globals.css'
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
  import type { Metadata } from "next";
  import { Inter, Orbitron } from "next/font/google";
  import "./globals.css";
  import "@/styles/landing.css";
  import { ThemeToggle } from "@/components/ThemeToggle";

  const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-inter",
  });

  const orbitron = Orbitron({
    subsets: ["latin"],
    weight: ["500", "700"],
    variable: "--font-orbitron",
  });

  export const metadata: Metadata = {
    title: "Build With AI — AI-Native Web Infrastructure",
    description:
      "Ship AI-first websites with intent-aware generation, structure-first layouts, and continuous optimization. Built for teams that move fast and stay reliable.",
  };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${orbitron.variable} antialiased theme-bg theme-text`}
        >
          <div className="app-shell">
            <header className="bw-header glass-surface">
              <div className="bw-header-inner">
                <div className="bw-logo">Build With AI</div>
                <nav className="bw-nav">
                  <a href="#platform" className="bw-nav-link">
                    Platform
                  </a>
                  <a href="#solutions" className="bw-nav-link">
                    Solutions
                  </a>
                  <a href="#docs" className="bw-nav-link">
                    Docs
                  </a>
                  <a href="#pricing" className="bw-nav-link">
                    Pricing
                  </a>
                </nav>
                <div className="bw-header-actions">
                  <button className="bw-link-button">Sign in</button>
                  <a href="#start" className="bw-cta bw-cta-primary">
                    Start building — free
                  </a>
                  <ThemeToggle />
                </div>
              </div>
            </header>

            <main className="bw-main">{children}</main>

            <footer className="bw-footer glass-surface">
              <div className="bw-footer-inner">
                <div className="bw-footer-column">
                  <div className="bw-footer-logo">Build With AI</div>
                  <p className="bw-footer-text">
                    AI-native web infrastructure for teams that want predictable
                    outcomes and human-centered experiences.
                  </p>
                </div>
                <div className="bw-footer-column">
                  <h4 className="bw-footer-heading">Platform</h4>
                  <a href="#platform" className="bw-footer-link">
                    AI Website Builder
                  </a>
                  <a href="#features" className="bw-footer-link">
                    Features
                  </a>
                  <a href="#templates" className="bw-footer-link">
                    Templates
                  </a>
                </div>
                <div className="bw-footer-column">
                  <h4 className="bw-footer-heading">Company</h4>
                  <a href="#about" className="bw-footer-link">
                    About
                  </a>
                  <a href="#case-studies" className="bw-footer-link">
                    Case studies
                  </a>
                  <a href="#careers" className="bw-footer-link">
                    Careers
                  </a>
                </div>
                <div className="bw-footer-column">
                  <h4 className="bw-footer-heading">Resources</h4>
                  <a href="#docs" className="bw-footer-link">
                    Docs
                  </a>
                  <a href="#blog" className="bw-footer-link">
                    Blog
                  </a>
                  <a href="#support" className="bw-footer-link">
                    Support
                  </a>
                </div>
              </div>
              <div className="bw-footer-bottom">
                <span className="bw-footer-note">
                  Building the future of AI-native websites.
                </span>
                <span className="bw-footer-note">© {new Date().getFullYear()} Build With AI</span>
              </div>
            </footer>
          </div>
        </body>
      </html>
    );
  }
