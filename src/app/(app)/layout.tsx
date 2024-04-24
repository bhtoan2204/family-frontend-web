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
  useEffect(() => {
    const getAccessToken = async () => {
      if (session?.accessToken) {
        setAccessToken(session.accessToken);
        setLoading(false);
      }
    };
    getAccessToken();
  }, [session?.accessToken]);

  if (loading) {
    return <Loader />;
  }

  if (!accessToken) {
    return <>{admin}</>;
  } else {
    return <>{user}</>;
  }
};

export default AppLayout;
