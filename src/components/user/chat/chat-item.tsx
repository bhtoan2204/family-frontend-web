"use client";

import ActionTooltip from "@/components/user/action-tooltip";
import UserAvatar from "@/components/user/user-avatar";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Member } from "@/types/member";
import { roleIconMapLeft } from "@/util/rol-icon-map";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member;
  timestamp: string;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
  type: "text" | "photo";
}

const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
  type,
}: ChatItemProps) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const onMemberClick = () => {
    if (currentMember.id_user === member.id_user) {
      return;
    }
    router.push(`/family/${params?.familyId}/conversations/${member.id_user}`);
  };

  const isOwner = currentMember.role === "Owner family";
  const isMember = currentMember.role === "Member";
  const isModerator = currentMember.role === "Moderator";
  const isCurrentMember = currentMember.id_user === member.id_user;
  const canDeleteMessage =
    !deleted && (isOwner || isModerator || isCurrentMember);

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div
          onClick={onMemberClick}
          className="cursor-pointer hover:drop-shadow-md transition"
        >
          <UserAvatar src={member.avatar} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p
                onClick={onMemberClick}
                className="font-semibold text-sm hover:underline cursor-pointer"
              >
                {member.firstname} {member.lastname}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMapLeft[member.role as keyof typeof roleIconMapLeft]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {type === "photo" && (
            <a
              href={content}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image src={content} fill alt="Photo" className="object-cover" />
            </a>
          )}
          {type === "text" && (
            <p className={cn("text-sm text-zinc-600 dark:text-zinc-300")}>
              {content}
            </p>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
          <ActionTooltip label="Delete">
            <Trash
              onClick={() =>
                onOpen("deleteMessage", {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                })
              }
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
