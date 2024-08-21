"use client";

import Head from "next/head";
import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/Store";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Kondisi untuk menyembunyikan Navbar dan Footer pada halaman tertentu
  const protectNavbar =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.includes("/upload") ||
    pathname.includes("/edit");

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* Head hanya perlu satu kali digunakan untuk seluruh halaman */}
            <Head>
              <link
                href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css"
                rel="stylesheet"
                type="text/css"
              />
              <title>Puitisy - The World of Poetry</title>
              <meta
                name="description"
                content="A place for writers to work digitally"
              />
            </Head>

            {/* Navbar akan ditampilkan kecuali pada halaman yang dilindungi */}
            {!protectNavbar && <Navbar />}

            <section className={protectNavbar ? "" : "mt-[54px]"}>
              {children}
            </section>

            {/* Footer akan ditampilkan kecuali pada halaman yang dilindungi */}
            {!protectNavbar && <Footer />}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
