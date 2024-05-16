"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user/user-avatar";
import { useModal } from "@/hooks/use-modal-store";
import { FamilyWithMembers } from "@/types/family-with-members";
import { roleIconMapNone } from "@/util/rol-icon-map";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MembersModel = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState<string>("");
  const router = useRouter();

  const isModalOpen = isOpen && type === "members";
  const { family } = data as { family: FamilyWithMembers };

  const onKick = async (id: string) => {
    try {
      setLoadingId(id);
      // await kickMember(id);
      router.refresh();
      // onOpen("members");
    } catch (error) {
    } finally {
      setLoadingId("");
    }
  };

  const onRoleChange = async (id: string, role: string) => {
    try {
      setLoadingId(id);
      // await changeRole({ id, role });
      router.refresh();
      // onOpen("members");
    } catch (error) {
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {family?.members.length} members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {family?.members.map((member) => (
            <div
              key={member.id_user}
              className="flex items-center gap-x-2 mb-6"
            >
              <UserAvatar src={member.avatar} />
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center gap-x-1">
                  {member.firstname} {member.lastname}
                  {roleIconMapNone[member.role as keyof typeof roleIconMapNone]}
                </div>
                <p className="text-xs text-zinc-500">{member.email}</p>
              </div>
              {family.owner_id !== member.id_user &&
                loadingId !== member.id_user && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="w-4 h-4 text-zinc-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id_user, "Member")
                                }
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Member
                                {member.role === "Member" && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id_user, "Moderator")
                                }
                              >
                                <ShieldCheck className="w-4 h-4 mr-2" />
                                Moderator
                                {member.role === "Moderator" && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onKick(member.id_user)}
                        >
                          <Gavel className="w-4 h-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id_user && (
                <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModel;
