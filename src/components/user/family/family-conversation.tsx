"use client";

import { cn } from "@/lib/utils";
import type { FamilyChat } from "@/types/chat";
import { Family } from "@/types/family";
import { MessageCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface FamilyChatProps {
  chat?: FamilyChat;
  family: Family;
  role?: string;
}

const FamilyConversation = ({ chat, family, role }: FamilyChatProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/family/${params?.familyId}/chat`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.chatCode === "chat" && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <MessageCircle className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.chatCode === "chat" &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {family.name}&apos;s chat
      </p>
    </button>
  );
};

export default FamilyConversation;
