"use client";

import { SubjectInfo } from "@/types/education";
import { BarChartHorizontalBig, BookA } from "lucide-react";

interface SubjectCardProps {
  color: string;
  subject: SubjectInfo;
  onClick: (subjectId: number) => void;
  selectedSubject: number | null;
}

const SubjectCard = ({
  color,
  subject,
  onClick,
  selectedSubject,
}: SubjectCardProps) => {
  return (
    <button
      key={subject.id_subject}
      className={`flex items-center justify-center relative shadow-lg hover:shadow-xl rounded-md cursor-pointer hover:bg-black/5 dark:hover:bg-black p-5 ${
        selectedSubject === subject.id_subject
          ? "bg-black/5 dark:bg-black"
          : "dark:bg-neutral-700"
      }`}
      onClick={() => onClick(subject.id_subject)}
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
                {subject.status === "in_progress" ? "In Progress" : "Completed"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default SubjectCard;
