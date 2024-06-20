"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import IndexString from "@/components/user/education/color/index-string";
import { EducationProgressDetailWithSubject, SubjectDetail } from "@/types/education";
import { Member } from "@/types/member";
import {
  CircleUserRoundIcon,
  NotebookPen,
  PhoneCall,
  School,
} from "lucide-react";
import SubjectCard from "./subject-card";

interface ProgressDetailProps {
  educationProgressDetail: EducationProgressDetailWithSubject;
  searchSubjectText: string;
  familyMember: Member;
  styles: any;
  sortSubjectType: string;
  progressBar: number;
  onSubjectClick: (subjectId: SubjectDetail) => void;
  selectedSubject: SubjectDetail | null;
}

const ProgressDetail = ({
  educationProgressDetail,
  searchSubjectText,
  familyMember,
  styles,
  sortSubjectType,
  progressBar,
  onSubjectClick,
  selectedSubject,
}: ProgressDetailProps) => {
  return (
    <>
      <button className="flex flex-col lg:flex-row p-5 relative shadow-md hover:shadow-xl rounded-md cursor-pointer gap-10 hover:bg-black/5 dark:hover:bg-black dark:bg-neutral-700">
        <div className="flex flex-col items-start justify-center gap-3">
          <div className="flex flex-row gap-4 items-center">
            <Avatar className="bg-gray-300 dark:bg-slate-200">
              <AvatarImage
                src={familyMember.avatar}
                alt={familyMember.firstname}
              />
            </Avatar>
            <div className="group flex flex-col gap-1 items-start overflow-clip">
              <p className="truncate whitespace-nowrap">
                {familyMember.firstname} {familyMember.lastname}
              </p>
              <h4 className="text-xs truncate whitespace-nowrap text-gray-500 dark:text-gray-300">
                {familyMember.email}
              </h4>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-start justify-center">
            <div className="flex flex-row items-center gap-4">
              <PhoneCall className="w-4 h-4" />
              <p>{familyMember.phone}</p>
            </div>
            <div className="flex flex-row items-center gap-4">
              <CircleUserRoundIcon className="w-4 h-4" />
              <p>{familyMember.role}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-3">
          <div className="">
            <h1 className="p-1 font-bold text-lg">
              {educationProgressDetail.title}
            </h1>
          </div>
          <div className="flex flex-row gap-2 items-center h-6">
            <School className="w-4 h-4" />
            <p>{educationProgressDetail.school_info}</p>
          </div>
          <div className="flex flex-row gap-2 items-center h-6">
            <NotebookPen className="w-4 h-4" />
            <p>{educationProgressDetail.progress_notes}</p>
          </div>
          {/* <div className="flex flex-row gap-2 items-center h-6">
            <p>{progressBar}%</p>
            <Progress value={50} max={100} className="flex flex-1" />
          </div> */}
        </div>
      </button>
      <div className="flex flex-1 flex-col overflow-y-auto">
        {!educationProgressDetail.subjects && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-lg">No data available</p>
          </div>
        )}
        {educationProgressDetail.subjects && (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
            {educationProgressDetail.subjects
              .filter((value) =>
                value.subject_name
                  .toLowerCase()
                  .includes(searchSubjectText.toLowerCase())
              )
              .sort((a, b) => {
                if (sortSubjectType === "asc") {
                  return a.subject_name.localeCompare(b.subject_name);
                } else if (sortSubjectType === "desc") {
                  return b.subject_name.localeCompare(a.subject_name);
                } else {
                  return 0;
                }
              })
              .map((subject, index) => (
                <SubjectCard
                  key={subject.id_subject}
                  color={styles[IndexString[index % IndexString.length].name]}
                  subject={subject}
                  onClick={onSubjectClick}
                  selectedSubject={selectedSubject}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProgressDetail;
