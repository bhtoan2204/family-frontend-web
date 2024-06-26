"use client";

import { buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileNavbar from "./mobile-navbar";
import UserItem from "./user-item";

const AppNavbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (!session) return null;
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 dark:bg-[#0f172a] dark:border-gray-700 backdrop-blur-lg transition-all">
      <div className="w-full px-2.5 md:px-10">
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-gray-700 ">
          <Link className="flex x-40 font-semibold" href="/">
            <span>FamFund.</span>
          </Link>
          <MobileNavbar session={session} isAuth={!!session?.accessToken} />
          <div className="hidden items-center space-x-4 sm:flex">
            <button
              className={buttonVariants({
                variant: "primary",
                size: "sm",
              })}
              onClick={() => router.push("/family")}
            >
              My Families
            </button>
            <button
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              onClick={() => router.push("/news")}
            >
              News
            </button>
            <button
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              onClick={() => router.push("/contact")}
            >
              Contact
            </button>
            <button
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
              onClick={() => router.push("/about")}
            >
              About
            </button>
            <UserItem {...session} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
