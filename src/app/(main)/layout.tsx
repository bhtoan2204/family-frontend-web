import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Toaster />
      <Navbar />
      {children}
    </>
  );
}
