import { ReactNode } from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="flex items-center justify-center h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]">
      {children}
    </div>
  );
};

export default AuthLayout;
