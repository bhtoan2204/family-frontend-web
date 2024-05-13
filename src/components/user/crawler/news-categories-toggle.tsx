"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewsCategories } from "@/util/news-caterories";
import { Compass } from "lucide-react";
import { useRouter } from "next/navigation";

const NewsCategoriesToggle = ({ familyId }: { familyId: string }) => {
  const router = useRouter();
  const onCilck = (url: string) => {
    router.push(`/family/${familyId}/crawler/main${url}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button className="hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition font-semibold flex items-center h-12 px-3 border-neutral-200 dark:border-neutral-800">
          <Compass className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-100 w-auto grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-5 hide-scrollbar overflow-auto text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {NewsCategories.map((category, id) => {
          return (
            <DropdownMenuItem
              onClick={() => onCilck(category.url)}
              key={category.title}
              className="px-3 py-2 text-sm cursor-pointer"
            >
              {category.icon}
              {category.title}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NewsCategoriesToggle;
