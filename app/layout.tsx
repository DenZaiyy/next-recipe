import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import {Navbar} from "@/components/Navbar";
import React from "react";

const merriweather = Merriweather({
    weight: ['300', '400', '700', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap'
})

export const metadata: Metadata = {
  title: "Next Recipes",
  description: "List of recipes with blog, comments and tags",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${merriweather.className} antialiased`}
      >
          <header>
              <Navbar />
          </header>
          <main className="p-4">
              {children}
          </main>
      </body>
    </html>
  );
}
