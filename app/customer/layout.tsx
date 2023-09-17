"use client"

import { Open_Sans } from "next/font/google";
import Navigation from "../components/NavBar/Navbar";
import Head from "next/head";

const inter = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>M4K Laundry</title>
      </Head>
     <main>
        <Navigation />
        {children}
      
    </main>
    </>
  );
}
