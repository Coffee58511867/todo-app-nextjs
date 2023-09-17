"use client"

import { Open_Sans } from "next/font/google";
import Navigation from "../components/NavBar/Navbar";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const inter = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 const router = useRouter();

  useEffect(() => {
    const userToken = localStorage.getItem("token") as string;
    
    if (!userToken){
     router.back();
    }

  })
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
