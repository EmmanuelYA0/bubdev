import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import Provider from "@/components/providers";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from 'react-hot-toast'


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
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=" bg-transparent"
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: 'bg-transparent',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            // Default options for specific types
            success: {
              duration: 3000,
            },
          }}
        />
        <Provider>
          <CartProvider>
            <Navbar />
            <main className=" overflow-hidden">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </Provider>
      </body>
    </html>
  )
}
