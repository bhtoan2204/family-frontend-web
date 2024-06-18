"use client";

import { SubjectInfo } from "@/types/education";
import { BarChartHorizontalBig, BookA } from "lucide-react";

interface SubjectCardProps {
  color: string;
  subject: SubjectInfo;
}

const SubjectCard = ({ color, subject }: SubjectCardProps) => {
  return (
    <button
      key={subject.id_subject}
      className="cursor-pointer flex items-center justify-center hover:bg-black/5 dark:hover:bg-black dark:bg-neutral-700 relative shadow shadow-neutral-300 p-5"
    >
      <div className="group flex items-center transition w-full">
        <div className="flex flex-col w-full gap-4">
          <p className={`${color} text-lg`}>{subject.subject_name}</p>
          <div className="flex flex-col items-start justify-center gap-4">
            <div className="flex flex-row gap-2 items-center h-6">
              <BookA className="w-4 h-4" />
              <p className="text-xs">{subject.description}</p>
            </div>
            <div className="flex flex-row gap-2 items-center h-6">
              <BarChartHorizontalBig className="w-4 h-4" />
              <p className="text-xs">
                {subject.status === "in_progress" ? "In Progress" : "Finished"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default SubjectCard;
