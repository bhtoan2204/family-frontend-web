"use client";

import { cn } from "@/lib/utils";
import { Newspaper } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const FamilyNews = () => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/family/${params?.familyId}/crawler/home`);
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.crawlerCode === "home" && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <Newspaper className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.crawlerCode === "home" &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        Family News
      </p>
    </button>
  );
};

export default FamilyNews;
