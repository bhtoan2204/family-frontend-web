import NavigationSidebar from "@/components/user/navigation";
import { ReactNode } from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="h-full">
      <main className="md:pr-[72px] h-full">{children}</main>
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0 right-0">
        <NavigationSidebar />
      </div>
    </div>
  );
};

export default MainLayout;
