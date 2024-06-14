"use client";

import { SignOut } from "@/actions/auth-actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOut } from "lucide-react";
import { Session } from "next-auth";

const UserItem = (session: Session) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="group relative flex items-center">
          <div className="shadow-1 relative bg-neutral-400 dark:bg-slate-300 group flex mx-3 h-[40px] w-[40px] rounded-[20px] group-hover:rounded-[14px] transition-all overflow-hidden">
            <Avatar className="h-full w-full">
              <AvatarImage
                src={session.user.avatar}
                alt={session.user.lastname}
              />
            </Avatar>
          </div>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
      >
        <button className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
          My Families
        </button>
        <button className="text-zinc-700 dark:text-zinc-200 px-3 py-2 text-sm cursor-pointer">
          Profile
        </button>
        <button className="text-zinc-700 dark:text-zinc-200 px-3 py-2 text-sm cursor-pointer">
          Settings
        </button>
        <button
          onClick={async () => await SignOut()}
          className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
        >
          Sign Out
          <LogOut className="h-4 w-4 ml-auto" />
        </button>
      </SheetContent>
    </Sheet>
  );
};

export default UserItem;
