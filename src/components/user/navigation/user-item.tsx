"use client";

import { SignOut } from "@/actions/auth-actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Session } from "next-auth";

const UserItem = (session: Session) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className=" group relative flex items-center">
          <div className="shadow-1 relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden">
            <Avatar className="h-full w-full">
              <AvatarImage src={session.user.avatar} />
            </Avatar>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
      >
        <DropdownMenuItem className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
          Profile Settings
          <User className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => await SignOut()}
          className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
        >
          Sign Out
          <LogOut className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
