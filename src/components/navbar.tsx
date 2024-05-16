"use client";

import { SignOut } from "@/actions/auth-actions";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const handleSignOut = async () => {
    await SignOut();
  };
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link className="flex x-40 font-semibold" href="/">
            <span>FamFund.</span>
          </Link>
          {/* Note: add mobile navbar */}
          <div className="hidden items-center space-x-4 sm:flex">
            <Link
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              href="/pricing"
            >
              Pricing
            </Link>
            {session?.accessToken ? (
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Sign out
              </Button>
            ) : (
              <>
                <Link
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                  href="/signin"
                >
                  Sign in
                </Link>
                <Link
                  className={buttonVariants({
                    size: "sm",
                  })}
                  href="/signup"
                >
                  Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
