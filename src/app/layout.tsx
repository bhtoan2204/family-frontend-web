import AuthProvider from "@/components/providers/auth-provider";
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
    <html lang="en" className="light">
      <body
        className={cn(
          "min-h-screen font-sans antialiased grainy",
          font.className
        )}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
