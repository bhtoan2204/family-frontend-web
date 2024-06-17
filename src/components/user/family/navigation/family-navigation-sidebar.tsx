"use client";

import FamilyNavigationLink from "@/components/user/family/navigation/family-navigation-link";
import FamilyProjectLink from "@/components/user/family/navigation/family-project-link";
import GuidelineProjectNavigation from "@/components/user/family/navigation/family-project-navigation/guideline-project-navigation";
import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

interface FamilyNavigationProps {
  familyId: string;
  session: Session;
  familyName: string;
}

const containerVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const svgVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
};

const FamilyNavigationSidebar = ({
  familyId,
  session,
  familyName,
}: FamilyNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      svgControls.start("open");
    } else {
      containerControls.start("close");
      svgControls.start("close");
    }
  }, [isOpen, containerControls, svgControls]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
    setSelectedProject(null);
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        initial="close"
        animate={containerControls}
        className="dark:bg-neutral-900 bg-white flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow shadow-neutral-600"
      >
        <div className="flex flex-row w-full justify-between place-items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full" />

          <button className="p-1 rounded-full flex" onClick={handleOpenClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 dark:stroke-neutral-200 stroke-neutral-900"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                variants={svgVariants}
                animate={svgControls}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <FamilyNavigationLink
            name="Family Chat"
            href={`/family/${familyId}/chat`}
            isOpen={isOpen}
          >
            <ChatBubbleLeftRightIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </FamilyNavigationLink>
          <FamilyNavigationLink
            name="Calendar"
            href={`/family/${familyId}/calendar/main`}
            isOpen={isOpen}
          >
            <CalendarDaysIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </FamilyNavigationLink>
          <FamilyProjectLink
            name="Guideline"
            setSelectedProject={setSelectedProject}
            isOpen={isOpen}
          >
            <ClipboardDocumentListIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </FamilyProjectLink>
          <FamilyNavigationLink
            name="Household"
            href={`/family/${familyId}/household`}
            isOpen={isOpen}
          >
            <HomeModernIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </FamilyNavigationLink>
          <FamilyNavigationLink
            name="Education"
            href={`/family/${familyId}/education`}
            isOpen={isOpen}
          >
            <AcademicCapIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </FamilyNavigationLink>
          <FamilyNavigationLink
            name="Finance"
            href={`/family/${familyId}/finance/1`}
            isOpen={isOpen}
          >
            <ArrowTrendingUpIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
          </FamilyNavigationLink>
        </div>
        <div className="flex flex-col gap-3">
          <FamilyProjectLink
            name="Members"
            setSelectedProject={setSelectedProject}
            isOpen={isOpen}
          >
            <div className="min-w-4 mx-2 border-pink-600 border rounded-full aspect-square bg-pink-700" />
          </FamilyProjectLink>
          <FamilyProjectLink
            name="Members"
            setSelectedProject={setSelectedProject}
            isOpen={isOpen}
          >
            <div className="min-w-4 mx-2 border-indigo-600 border rounded-full aspect-square bg-indigo-700" />
          </FamilyProjectLink>
          <FamilyProjectLink
            name="Members"
            setSelectedProject={setSelectedProject}
            isOpen={isOpen}
          >
            <div className="min-w-4 mx-2 border-cyan-600 border rounded-full aspect-square bg-cyan-700" />
          </FamilyProjectLink>
          <FamilyProjectLink
            name="Members"
            setSelectedProject={setSelectedProject}
            isOpen={isOpen}
          >
            <div className="min-w-4 mx-2 border-yellow-600 border rounded-full aspect-square bg-yellow-700" />
          </FamilyProjectLink>
        </div>
      </motion.nav>
      <AnimatePresence>
        {selectedProject && selectedProject === "Guideline" && (
          <GuidelineProjectNavigation
            selectedProject={selectedProject}
            isOpen={isOpen}
            setSelectedProject={setSelectedProject}
            familyId={familyId}
            token={session.accessToken}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FamilyNavigationSidebar;
