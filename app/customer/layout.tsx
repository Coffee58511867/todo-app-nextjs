"use client"

import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navigation from "../components/NavBar/Navbar";

const inter = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>M4K Laundry</title>
      </head>
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
