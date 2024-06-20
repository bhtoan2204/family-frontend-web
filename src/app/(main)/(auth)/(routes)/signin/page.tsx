"use client"

import SigninForm from "@/components/auth/signin-form";
import { authStation } from "@/ultils/stations";
import { redirect, RedirectType } from "next/navigation";

const SigninPage = () => {
  if (authStation.$state.status === "USER") {
    return redirect("/", RedirectType.replace);
  }
  return <SigninForm />;
};

export default SigninPage;
