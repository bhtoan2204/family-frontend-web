"use client";

import DefaultLayout from "@/components/admin/layouts/default-layout";
import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import { ReactNode } from "react";

const AdminLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <DefaultLayout>{children}</DefaultLayout>
        </div>
      </body>
    </html>
  );
};

export default AdminLayout;
