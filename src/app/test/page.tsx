"use client";

import { signOut } from "@/auth";
import { useSession } from "next-auth/react";

const Test = () => {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div>
      <div>{session?.accessToken}</div>
      <form action={handleSignOut}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default Test;
