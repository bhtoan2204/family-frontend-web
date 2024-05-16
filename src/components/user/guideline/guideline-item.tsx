"use client";

import ActionTooltip from "@/components/user/action-tooltip";
import { cn } from "@/lib/utils";
import { Plus, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface GuidelineItemProps {
  name: string;
  description: string;
  itemId: number;
  isSelected?: boolean;
}

const GuidelineItem = ({
  name,
  description,
  itemId,
  isSelected,
}: GuidelineItemProps) => {
  const params = useParams();
  const router = useRouter();
  
  const onClick = () => {
    router.push(
      `/family/${params?.familyId}/guideline/${params?.guidelineCode}/${itemId}`
    );
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center justify-between gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.itemId === itemId.toString() &&
          "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.itemId === itemId.toString() &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {name}
      </p>
      {/* <div className="space-x-2">
        <ActionTooltip label="Add Step" side="top">
          <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
        <ActionTooltip label="Delete" side="top">
          <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
            <Trash className="h-4 w-4" />
          </button>
        </ActionTooltip>
      </div> */}
    </button>
  );
};

export default GuidelineItem;
