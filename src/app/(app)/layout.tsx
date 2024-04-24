"use client";

import { SignOut } from "@/actions/auth/signout";
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
      } else {
        setLoading(false);
        await SignOut();
      }
    };
    getAccessToken();
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
