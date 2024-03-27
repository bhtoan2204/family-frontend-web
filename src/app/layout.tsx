"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/providers/ModalProvider";
import { Provider } from "react-redux";
import store from "@/redux/store";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>

        <ModalProvider>
          <Provider store={store}>

            {children}
          </Provider>
        </ModalProvider>
      </body>
    </html>
  );
}
