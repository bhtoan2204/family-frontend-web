import { ModalProvider } from "@/components/providers/modal-provider";
import QueryProvider from "@/components/providers/query-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { Open_Sans } from "next/font/google";
import { ReactNode } from "react";
import "./globals-dark.css";

const font = Open_Sans({ subsets: ["latin"] });

const UserLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="user-default-theme"
        >
          <SocketProvider>
            <ModalProvider />
            <QueryProvider>{children}</QueryProvider>
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default UserLayout;
