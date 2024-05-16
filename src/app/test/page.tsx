"use client";

import { SignOut } from "@/actions/auth-actions";
import { useSession } from "next-auth/react";

const Test = () => {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await SignOut();
  };

  return (
    <div>
      <h4>{session?.accessToken}</h4>
      <h4>{session?.refreshToken}</h4>
      <br />
      <h4>{session?.user.id}</h4>
      <h4>{session?.user.email}</h4>
      <h4>{session?.user.phone}</h4>
      <h4>{session?.user.firstname}</h4>
      <h4>{session?.user.lastname}</h4>
      <h4>{session?.user.avatar}</h4>
      <h4>{session?.user.created_at}</h4>
      <h4>{session?.user.updated_at}</h4>
      <h4>{session?.user.isEmailVerified}</h4>
      <h4>{session?.user.isPhoneVerified}</h4>
      <h4>{session?.user.isAdmin ? "Admin" : "User"}</h4>
      <br />
      <form action={handleSignOut}>
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default Test;
