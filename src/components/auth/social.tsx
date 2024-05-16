"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
  const router = useRouter();
  const handleSocialSignIn = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleSocialSignIn("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleSocialSignIn("facebook")}
      >
        <FaFacebook className="h-5 w-5" color="blue" />
      </Button>
    </div>
  );
};
