"use client";

import { SignOut } from "@/actions/auth/signout";
import { useSession } from "next-auth/react";

const Test = () => {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await SignOut();
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
