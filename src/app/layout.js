"use client"

import Head from "next/head";
import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function RootLayout({ children }) {

  const pathname = usePathname()

  const protectNavbar = pathname === '/login'

  return (
    <html lang="en">
      <body>
        <Head>
          <link
              href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css"
              rel="stylesheet"
              type="text/css"
          />
          {/* Script for Tailwind CSS */}
          <script src="https://cdn.tailwindcss.com" defer></script>
          <title>Puitisy - The world of poetry</title>
          <meta name="description" content="A place for writers to work digitally" />
        </Head>

        {/* Navbar */}
        {!protectNavbar && <Navbar />}

        {/* Content */}
        {
          !protectNavbar ? (
            <section className="mt-[54px]">
              {children}
            </section>
          ):
            {children}
        }
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
