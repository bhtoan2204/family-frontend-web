"use client";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import ModalProvider from "@/providers/ModalProvider";
import store from "@/redux/store";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";

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
            <div className="container">
              <Navbar />
              {children}
              <Footer />
            </div>
          </Provider>
        </ModalProvider>
      </body>
    </html>
  );
}
