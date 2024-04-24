import { ModalProvider } from "@/components/providers/modal-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { Open_Sans } from "next/font/google";
import { ReactNode } from "react";

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
          <ModalProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default UserLayout;
