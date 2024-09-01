"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { persistor, store } from "@/redux/store";
import Head from "next/head";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./globals.css";

export default function RootLayout({ children }) {
  const auth = store.getState().Auth?.auth;
  const pathname = usePathname();
  const router = useRouter();

  const protectNavbar =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password" ||
    pathname.includes("/upload") ||
    pathname.includes("/reset-password") ||
    pathname.includes("/edit");

  useEffect(() => {
    const isPublicPath =
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/forgot-password" ||
      pathname.includes("/reset-password") ||
      pathname.includes("/upload");

    if (!auth || Object.keys(auth).length === 0) {
      if (!isPublicPath) {
        router.push("/login");
      }
    }
  }, [auth, pathname, router]);

  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <title>Puitisy - The World of Poetry</title>
        <meta name="description" content="A place for writers to work digitally" />
      </Head>
      <body style={{ overflowX: "hidden" }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
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
