import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ReactNode } from "react";

interface FamilyProjectLinkProps {
  children: ReactNode;
  name: string;
  setSelectedProject: (val: string | null) => void;
}

const FamilyProjectLink = ({
  children,
  name,
  setSelectedProject,
}: FamilyProjectLinkProps) => {
  const handleClick = () => {
    setSelectedProject(null);
    setTimeout(() => {
      setSelectedProject(name);
    }, 250);
  };
  return (
    <Link
      href="#"
      onClick={handleClick}
      className="flex p-1 rounded cursor-pointer stroke-[0.75] dark:hover:stroke-neutral-100 dark:stroke-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-100 place-items-center gap-3 dark:hover:bg-neutral-700/30 transition-colors duration-100 hover:bg-neutral-300/40 hover:text-neutral-900 stroke-neutral-700 hover:stroke-neutral-900"
    >
      {children}
      <div className="flex overflow-clip place-items-center justify-between w-full">
        <p className="text-inherit truncate whitespace-nowrap tracking-wide">
          {name}
        </p>
        <ChevronRightIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
      </div>
    </Link>
  );
};

export default FamilyProjectLink;
