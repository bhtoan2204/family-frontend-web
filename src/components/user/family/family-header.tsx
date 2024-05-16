"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { FamilyWithMembers } from "@/types/family-with-members";
import {
  ChevronDown,
  LogOut,
  Package,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

interface FamilyHeaderProps {
  family: FamilyWithMembers;
  role: string;
}

const FamilyHeader = ({ family, role }: FamilyHeaderProps) => {
  const isOwner = role === "Owner family";
  const isModerator = role === "Moderator" || isOwner;

  const { onOpen } = useModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {family.name}
          <ChevronDown className="h-5 w-5 ml-auto hidden md:block" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem
            onClick={() =>
              onOpen("invite", {
                family,
              })
            }
            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
          >
            Invite People
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isOwner && (
          <DropdownMenuItem
            onClick={() =>
              onOpen("editFamily", {
                family,
              })
            }
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Family Settings
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isOwner && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { family })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Manage Members
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
            Manage Packages
            <Package className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isOwner && <DropdownMenuSeparator />}
        {isOwner && (
          <DropdownMenuItem
            onClick={() => {
              onOpen("deleteFamily", {
                family,
              });
            }}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            Delate Family
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isOwner && (
          <DropdownMenuItem
            onClick={() =>
              onOpen("leaveFamily", {
                family,
              })
            }
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Leave Family
            <LogOut className="text-rose-500 h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FamilyHeader;
