import Link from "next/link";
import { ReactNode } from "react";

interface FamilyNavigationLinkProps {
  children: ReactNode;
  name: string;
  href: string;
  isOpen: boolean;
}

const FamilyNavigationLink = ({
  children,
  name,
  href,
  isOpen,
}: FamilyNavigationLinkProps) => {
  return (
    <Link
      href={href}
      className="flex p-1 rounded cursor-pointer stroke-[0.75] dark:hover:stroke-neutral-100 dark:stroke-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-100 place-items-center gap-3 dark:hover:bg-neutral-700/30 transition-colors duration-100 hover:bg-neutral-300/40 hover:text-neutral-900 stroke-neutral-700 hover:stroke-neutral-900"
    >
      {children}
      <p
        className={`text-inherit overflow-clip whitespace-nowrap tracking-wide ${
          !isOpen && "truncate"
        }`}
      >
        {name}
      </p>
    </Link>
  );
};

export default FamilyNavigationLink;
