import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import Provider from "@/components/providers";


export const metadata: Metadata = {
  title: "BubblyApp",
  description: "Enjoy your life",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Navbar />
          <main className=" overflow-hidden">
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
