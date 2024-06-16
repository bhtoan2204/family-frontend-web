"use client";

import {
  AdjustmentsHorizontalIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
  CursorArrowRaysIcon,
  PencilIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import FamilyNavigationLink from "./family-navigation-link";

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

interface FamilyProjectNavigationProps {
  selectedProject: string;
  isOpen: boolean;
  setSelectedProject: (val: string | null) => void;
}

const FamilyProjectNavigation = ({
  selectedProject,
  isOpen,
  setSelectedProject,
}: FamilyProjectNavigationProps) => {
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
      } border-r border-neutral-800 p-5`}
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
      />
      <div className="flex flex-col gap-3">
        <FamilyNavigationLink name="Progress" href="#" isOpen={isOpen}>
          <ArrowTrendingUpIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </FamilyNavigationLink>
        <FamilyNavigationLink href="#" name="Team Members" isOpen={isOpen}>
          <UserGroupIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </FamilyNavigationLink>
        <FamilyNavigationLink href="#" name="In Review" isOpen={isOpen}>
          <PencilIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </FamilyNavigationLink>
        <FamilyNavigationLink href="#" name="In Progress" isOpen={isOpen}>
          <BoltIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </FamilyNavigationLink>
        <FamilyNavigationLink href="#" name="Up Next" isOpen={isOpen}>
          <CursorArrowRaysIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </FamilyNavigationLink>
        <FamilyNavigationLink href="#" name="Project Settings" isOpen={isOpen}>
          <AdjustmentsHorizontalIcon className="stroke-[0.75] stroke-inherit min-w-8 w-8" />
        </FamilyNavigationLink>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="tracking-wide text-neutral-300">Team Members</h1>
        <Link href="#" className="flex flex-row gap-3 place-items-center">
          <UserIcon className="w-8 p-1 rounded-full stroke-2 stroke-rose-800 bg-rose-200/70" />
          <p className="tracking-wide text-neutral-400">Steve Jobs</p>
        </Link>
        <Link href="#" className="flex flex-row gap-3 place-items-center">
          <UserIcon className="w-8 p-1 rounded-full stroke-2 stroke-emerald-800 bg-emerald-200/70" />
          <p className="tracking-wide text-neutral-400">Bill Gates</p>
        </Link>
        <Link href="#" className="flex flex-row gap-3 place-items-center">
          <UserIcon className="w-8 p-1 rounded-full stroke-2 stroke-indigo-800 bg-indigo-200/70" />
          <p className="tracking-wide text-neutral-400">Jeff Bezos</p>
        </Link>
      </div>
    </motion.nav>
  );
};

export default FamilyProjectNavigation;
