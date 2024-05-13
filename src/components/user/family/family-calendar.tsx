"use client";

import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const FamilyCalendar = () => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/family/${params?.familyId}/calendar/event`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.calendarCode === "event" && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <Calendar className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.calendarCode === "event" &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        Family Calendar
      </p>
    </button>
  );
};

export default FamilyCalendar;
