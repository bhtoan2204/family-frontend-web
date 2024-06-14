import { ReactNode } from "react";

const NewsLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="max-w-[100vw] overflow-x-hidden min-h-[100vh] bg-white dark:bg-[#0f172a] text-black dark:text-[#ddd]">
      <div className="max-w-[1536px] mx-auto px-20 max-2xl:max-w-[1366px] max-xl:max-w-[1024px] max-lg:max-w-[768px] max-lg:px-10 max-md:max-w-[640px] max-sm:max-w-[475px]">
        {children}
      </div>
    </div>
  );
};

export default NewsLayout;
