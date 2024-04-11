import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FamFund",
  description: "A platform for managing family finances.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn("relative h-full font-sans antialiased", font.className)}
      >
        <main className="relative flex flex-col min-h-screen">
          <div className="flex-grow fle-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
