"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { EducationProgress } from "@/types/education";
import { NotebookPen, School } from "lucide-react";

interface ProgressCardProps {
  progressDetail: EducationProgress;
  color: string;
  onSwitchMode: (progress: EducationProgress) => void;
}

const ProgressCard = ({
  progressDetail,
  color,
  onSwitchMode,
}: ProgressCardProps) => {
  return (
    <button
      onClick={() => onSwitchMode(progressDetail)}
      className="rounded-lg shadow-lg p-5 relative cursor-pointer hover:shadow-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-black dark:bg-neutral-700"
    >
      <div className="group flex items-center transition w-full">
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-row gap-4 items-center">
            <Avatar className="bg-gray-300 dark:bg-slate-200">
              <AvatarImage
                src={progressDetail.avatar}
                alt={progressDetail.firstname}
              />
            </Avatar>
            <p>
              {progressDetail.firstname} {progressDetail.lastname}
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <div className={`${color} w-full`}>
              <h1 className="p-1">{progressDetail.title}</h1>
            </div>
            <div className="flex flex-row gap-2 items-center h-6">
              <School className="w-4 h-4" />
              <p>{progressDetail.school_info}</p>
            </div>
            <div className="flex flex-row gap-2 items-center h-6">
              <NotebookPen className="w-4 h-4" />
              <p>{progressDetail.progress_notes}</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ProgressCard;
