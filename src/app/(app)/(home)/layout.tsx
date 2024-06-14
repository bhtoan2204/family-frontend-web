import { AppNavbar } from "@/components/app-navbar";
import { ReactNode } from "react";

const HomeLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <AppNavbar />
      {children}
    </>
  );
};

export default HomeLayout;
