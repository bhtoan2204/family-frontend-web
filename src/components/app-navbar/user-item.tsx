"use client";

import { SignOut } from "@/actions/auth-actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User } from "@/ultils/models";
import { LogOut } from "lucide-react";


type TProps = {
  user: User;
}


const UserItem = ({ user }: TProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="group relative flex items-center">
          <div className="shadow-1 relative bg-neutral-400 dark:bg-slate-300 group flex mx-3 h-[40px] w-[40px] rounded-[20px] group-hover:rounded-[14px] transition-all overflow-hidden">
            <Avatar className="h-full w-full">
              <AvatarImage
                src={user.avatar || "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2118b09e-1d8b-4119-8b2f-c00441a3d9fa/d3065zt-7f94a803-ce36-4048-b865-1a491ba4384c.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzIxMThiMDllLTFkOGItNDExOS04YjJmLWMwMDQ0MWEzZDlmYVwvZDMwNjV6dC03Zjk0YTgwMy1jZTM2LTQwNDgtYjg2NS0xYTQ5MWJhNDM4NGMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vs_CL7QX-anVo3oPRm6gN3g0JoVQjMCX0FL14dnPU3U"}
                alt={user.lastname}
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
