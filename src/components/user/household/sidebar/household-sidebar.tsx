"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

interface HouseholdSidebarProps {
  isOpen: boolean;
}

const containerVariants = {
  close: {
    width: "0rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "17.5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const HouseholdSidebar = ({ isOpen }: HouseholdSidebarProps) => {
  const containerControls = useAnimationControls();
  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  });
  return (
    <motion.nav
      variants={containerVariants}
      initial="close"
      animate={containerControls}
      className="h-full flex flex-col gap-8 w-64 absolute dark:bg-neutral-900 bg-white ml-0 border-r border-neutral-800 p-5 rounded-s-xl shadow shadow-neutral-600"
    >
      <div className="flex flex-row w-full justify-between place-items-center">
        <h1>
          
        </h1>
      </div>
    </motion.nav>
  );
};

export default HouseholdSidebar;
