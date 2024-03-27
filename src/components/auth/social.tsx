"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const Social = () => {
  const router = useRouter();
  const handleGoogle = () => {
    const googleLoginWindow = window.open(
      "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=https%3A%2F%2Fapi.rancher.io.vn%2Fapi%2Fv1%2Fauth%2Fgoogle%2Fcallback&scope=email%20profile&client_id=62584885035-5m2vf184f7bessf9bk6ki3hmd5ncrlf3.apps.googleusercontent.com&service=lso&o2v=2&theme=mn&ddm=0&flowName=GeneralOAuthFlow",
      "_blank",
      "height=600,width=500"
    );

    const messageEventListener = (event: any) => {
      if (event.origin !== window.location.origin) return; // Only accept messages from the same origin
      const urlFromPopup = event.data;
      router.push(urlFromPopup); // Navigate to the URL from the popup
      googleLoginWindow!.close(); // Close the popup
    };

    window.addEventListener("message", messageEventListener);

    return () => {
      window.removeEventListener("message", messageEventListener);
    };
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={handleGoogle}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaFacebook className="h-5 w-5" color="blue" />
      </Button>
    </div>
  );
};
