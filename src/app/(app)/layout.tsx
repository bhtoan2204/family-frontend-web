"use client";

import Loader from "@/components/loader";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";

const AppLayout = ({
  user,
  admin,
}: Readonly<{
  user: ReactNode;
  admin: ReactNode;
}>) => {
  const { data: session } = useSession();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  console.log("session", session);
  useEffect(() => {
    if (session?.accessToken) {
      setAccessToken(session.accessToken);
      setLoading(false);
    }
  }, [session?.accessToken]);

  if (loading) {
    return <Loader />;
  }

  if (!accessToken) {
    return <>{user}</>;
  } else {
    return <>{admin}</>;
  }
};

export default AppLayout;
