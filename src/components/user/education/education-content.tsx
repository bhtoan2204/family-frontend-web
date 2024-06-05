"use client";

import { GetEducationDetail } from "@/actions/education-actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EducationProgress, EducationProgressDetail } from "@/types/education";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface EducationContentProps {
  familyId: string;
  token: string;
  educationProgress: EducationProgress[];
}

const EducationContent = ({
  familyId,
  token,
  educationProgress,
}: EducationContentProps) => {
  const [selectedEducation, setSelectedEducation] =
    useState<EducationProgressDetail>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEducationClick = async (id: number) => {
    setLoading(true);
    const detail = await GetEducationDetail(token, Number(familyId), id);
    setSelectedEducation(detail);
    setLoading(false);
  };
  
  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto">
      <div className="grid grid-cols-6 h-full">
        <div className="col-span-2">
          <ScrollArea>
            {educationProgress.map((item, index) => (
              <button
                onClick={() => handleEducationClick(item.id_education_progress)}
                key={item.id_education_progress}
                className="group flex w-full"
              >
                <Card className="my-4 w-full">
                  <CardHeader>
                    <div className="group flex items-center gap-x-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={item.avatar} />
                      </Avatar>
                      <p className="text-sm font-medium text-black dark:text-white">
                        {item.firstname} {item.lastname}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-y-2 items-start">
                      <p className="text-lg text-black dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-black dark:text-white">
                        {item.school_info}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </ScrollArea>
        </div>
        <div className="col-span-4">
          <ScrollArea>
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-7 h-7 text-zinc-500 animate-spin" />
              </div>
            ) : selectedEducation ? (
              <div className="flex flex-col gap-y-4">
                <div>
                  <p className="text-lg font-medium text-black dark:text-white">
                    {selectedEducation.education_progress_info.title}
                  </p>
                  <p className="text-xs text-black dark:text-white">
                    {selectedEducation.education_progress_info.school_info}
                  </p>
                </div>
                <div className="flex flex-col gap-y-4">
                  {selectedEducation.subjects_info ? (
                    selectedEducation.subjects_info.map((subject) => (
                      <Card key={subject.id_subject}>
                        <CardHeader>
                          <p className="text-sm font-medium text-black dark:text-white">
                            {subject.subject_name}
                          </p>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col gap-y-2">
                            <p className="text-xs text-black dark:text-white">
                              {subject.description}
                            </p>
                            <p className="text-xs text-black dark:text-white">
                              Status: {subject.status}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p className="text-xs text-black dark:text-white">
                      No subjects available
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-xs text-black dark:text-white">
                  Select an education to view detail
                </p>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default EducationContent;
