"use client"

import Head from "next/head";
import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/Redux/Store";

export default function RootLayout({ children }) {

  const pathname = usePathname()

  const protectNavbar = pathname === '/login' || pathname ===  '/register' ||  pathname.includes('/upload') ||  pathname.includes('/edit'); ; 


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

        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {!protectNavbar && <Navbar />}

            <section className={protectNavbar ? "" : "mt-[54px]"}>
              {children}
            </section>

            {!protectNavbar && <Footer />}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
