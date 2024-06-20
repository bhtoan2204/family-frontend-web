/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { authStation, TState as TAuthState } from "@/ultils/stations";
import { redirect, RedirectType, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  if (typeof window !== "undefined") {
    const router = useRouter();
    const [authState, setAuthState] = useState(authStation.$state);

    if (authStation.$state.status === "USER") {
      return router.push("/");
    }

    const authStateListener = (args: TAuthState) => setAuthState(args);;

    // componentDidMount
    useEffect(() => {
      authStation.subscribe({
        listeners: authStateListener
      });

      return () => authStation.unsubscribe({
        listeners: authStateListener
      });
    }, []);

    useEffect(() => {
      if (authState.status === "USER") {
        router.push("/");
      }
    }, [authState]);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] abcabc">
      {children}
    </div>
  );
};

export default AuthLayout;
