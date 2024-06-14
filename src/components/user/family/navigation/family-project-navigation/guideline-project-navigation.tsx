"use client";

import { GetAllGuideline } from "@/actions/guideline-actions";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "@/hooks/use-modal-store";
import { GuidelineItemInList } from "@/types/guideline";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const variants = {
  close: {
    x: -300,
    opacity: 0,
  },
  open: {
    x: 0,
    opacity: 100,
  },
};

interface GuidelineProjectNavigationProps {
  selectedProject: string;
  isOpen: boolean;
  setSelectedProject: (val: string | null) => void;
  familyId: string;
  token: string;
}

const GuidelineProjectNavigation = ({
  selectedProject,
  isOpen,
  setSelectedProject,
  familyId,
  token,
}: GuidelineProjectNavigationProps) => {
  const [guidelines, setGuidelines] = useState<GuidelineItemInList[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  const { onOpen } = useModal();

  useEffect(() => {
    if (familyId) {
      const fetchGuidelines = async () => {
        setIsLoading(true);
        const { guidelines: fetchedGuidelines, total } = await GetAllGuideline(
          token,
          Number(familyId),
          page,
          10
        );
        setGuidelines(fetchedGuidelines);
        setTotal(total);
        setIsLoading(false);
      };
      fetchGuidelines();
    }
  }, [familyId, page, token]);

  const hasNextPage = total > page * 10;
  const hasPrevPage = page > 1;
  return (
    <motion.nav
      variants={variants}
      initial="close"
      animate="open"
      exit="close"
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className={`h-full flex flex-col gap-8 w-64 absolute dark:bg-neutral-900 bg-white ml-0 ${
        isOpen ? "left-64" : "left-20"
      } border-r border-neutral-800 p-5 rounded-e-xl`}
    >
      <div className="flex flex-row w-full justify-between place-items-center">
        <h1 className="tracking-wide dark:text-neutral-100 text-lg">
          {selectedProject}
        </h1>
        <button onClick={() => setSelectedProject(null)}>
          <XMarkIcon className="w-8 stroke-neutral-400" />
        </button>
      </div>
      <input
        placeholder="Search"
        type="text"
        className="px-3 py-2 tracking-wide rounded-lg bg-neutral-400/40 dark:bg-neutral-600/40 dark:text-neutral-100"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="flex items-center gap-1">
        <button
          className={`${buttonVariants({
            variant: "primary",
            size: "icon",
          })} h-8`}
          onClick={() => onOpen("createGuideline", { familyId, token })}
        >
          <PlusIcon className="w-8 stroke-neutral-100" />
        </button>
        <div className="flex items-center justify-between w-full">
          <button
            disabled={!hasPrevPage}
            onClick={() => setPage((prev) => prev - 1)}
            className="text-sm dark:text-neutral-100 text-neutral-300 bg-sky-400 cursor-pointer rounded-md px-2 py-1 disabled:bg-sky-700 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            disabled={!hasNextPage}
            onClick={() => setPage((prev) => prev + 1)}
            className="text-sm dark:text-neutral-100 text-neutral-300 bg-sky-400 cursor-pointer rounded-md px-2 py-1 disabled:bg-sky-700 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
      <ScrollArea>
        <div className="flex flex-col gap-5">
          {isLoading ? (
            <div className="flex flex-col flex-1 justify-center items-center">
              <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
            </div>
          ) : (
            guidelines
              .filter((guideline) =>
                guideline.name.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((guideline) => (
                <Link
                  href={`/family/${familyId}/guideline?gl=${guideline.id_item}`}
                  key={guideline.id_item}
                  className="flex p-1 rounded cursor-pointer stroke-[0.75] dark:hover:stroke-neutral-100 dark:stroke-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-100 place-items-center gap-3 dark:hover:bg-neutral-700/30 transition-colors duration-100 hover:bg-neutral-300/40 hover:text-neutral-900 stroke-neutral-700 hover:stroke-neutral-900"
                >
                  <p className="text-inherit overflow-clip whitespace-break-spaces tracking-wide">
                    {guideline.name}
                  </p>
                </Link>
              ))
          )}
        </div>
      </ScrollArea>
    </motion.nav>
  );
};

export default GuidelineProjectNavigation;
