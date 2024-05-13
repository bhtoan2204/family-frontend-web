"use client";

import ActionTooltip from "@/components/user/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { FamilyWithMembers } from "@/types/family-with-members";
import { Plus, Settings } from "lucide-react";

interface FamilySectionProps {
  label: string;
  role: string;
  sectionType:
    | "chat"
    | "guideline"
    | "education"
    | "calendar"
    | "finance"
    | "news"
    | "household"
    | "members";
  family?: FamilyWithMembers;
}

const FamilySection = ({
  label,
  role,
  sectionType,
  family,
}: FamilySectionProps) => {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== "Member" && sectionType === "chat" && (
        <ActionTooltip label="Create Chat" side="top">
          <button
            onClick={() => onOpen("createChat")}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
      {role === "Owner family" && sectionType === "members" && (
        <ActionTooltip label="Manage Members" side="top">
          <button
            onClick={() => onOpen("members", { family })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default FamilySection;
