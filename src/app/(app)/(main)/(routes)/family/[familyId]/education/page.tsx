"use client";

import { CreateEducation, GetAllEducation } from "@/actions/education-actions";
import { GetAllMember } from "@/actions/family-actions";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AddEducationSheet from "@/components/user/education/add-education-sheet";
import styles from "./color-string.module.css";

import { Button } from "@/components/ui/button";
import IndexString from "@/components/user/education/color/index-string";
import MemberCard from "@/components/user/education/member-card";
import EducationPagination from "@/components/user/education/pagination";
import ProgressCard from "@/components/user/education/progress-card";
import SearchSelect from "@/components/user/education/search-select";
import { EducationProgressSchema } from "@/schemas/education-schema";
import { EducationProgress } from "@/types/education";
import { Member } from "@/types/member";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownAZ, ArrowUpAZ, Loader, RefreshCw } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const fetchEducationProgress = async (
  token: string,
  familyId: number,
  page: string,
  itemsPerPage: string
) => {
  try {
    const res = await GetAllEducation(token, familyId, page, itemsPerPage);
    return res;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

const fetchFamilyMembers = async (token: string, familyId: number) => {
  try {
    const res = await GetAllMember(token, familyId.toString());
    return res;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

const addEducation = async (
  token: string,
  familyId: number,
  userId: string,
  title: string,
  progressNotes: string,
  schoolInfo: string
) => {
  try {
    try {
      const res = await CreateEducation(
        token,
        familyId,
        userId,
        title,
        progressNotes,
        schoolInfo
      );
      return res;
    } catch (error) {
      throw new Error("Internal Error!");
    }
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

const EducationPage = () => {
  // Constants
  const ITEMS_PER_PAGE = 9;

  // Hooks
  const { data: session } = useSession();
  const params = useParams();
  const [isDetailMode, setIsDetailMode] = useState(false);
  const [educationProgress, setEducationProgress] = useState<
    EducationProgress[]
  >([]);
  const [familyMembers, setFamilyMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [searchProgressText, setSearchProgressText] = useState<string>("");
  const [searchMemberText, setSearchMemberText] = useState<string>("");
  const [isEducationLoaded, setIsEducationLoaded] = useState(false);
  const [isMemberLoaded, setIsMemberLoaded] = useState(false);
  const [searchOption, setSearchOption] = useState<string>("");
  const [sortProgressType, setSortProgressType] = useState<string>("");

  useEffect(() => {
    if (session?.accessToken && params!.familyId) {
      setIsEducationLoaded(false);
      setIsMemberLoaded(false);
      fetchEducationProgress(
        session.accessToken,
        Number(params!.familyId),
        "1",
        ITEMS_PER_PAGE.toString()
      ).then((res) => {
        setEducationProgress(res);
        setIsEducationLoaded(true);
      });
      fetchFamilyMembers(session.accessToken, Number(params!.familyId)).then(
        (res) => {
          setFamilyMembers(res);
          setIsMemberLoaded(true);
        }
      );
    }
  }, [session, params]);

  // Functions
  const handleMemberClick = (memberId: string) => {
    if (selectedMember && selectedMember === memberId) {
      setSelectedMember(null);
    } else {
      setSelectedMember(memberId);
    }
  };

  const handleSearchOption = (value: string) => {
    setSearchOption(value);
  };

  const handleReset = () => {
    setSearchProgressText("");
    setSearchMemberText("");
    setSearchOption("");
    setSortProgressType("");
    setSelectedMember(null);
  };

  // Forms
  const educationProgressForm = useForm({
    resolver: zodResolver(EducationProgressSchema),
    defaultValues: {
      idMember: "",
      title: "",
      progressNotes: "",
      schoolInfo: "",
    },
  });

  const isEducationProgressLoading =
    educationProgressForm.formState.isSubmitting;

  const addEducationProgress = async (
    values: z.infer<typeof EducationProgressSchema>
  ) => {
    await addEducation(
      session!.accessToken,
      Number(params!.familyId),
      values.idMember,
      values.title,
      values.progressNotes,
      values.schoolInfo
    );
    fetchEducationProgress(
      session!.accessToken,
      Number(params!.familyId),
      "1",
      ITEMS_PER_PAGE.toString()
    ).then((res) => {
      setEducationProgress(res);
    });
  };

  if (!educationProgress || !familyMembers) {
    return null;
  }

  if (!isDetailMode) {
    return (
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={70}
          minSize={30}
          maxSize={80}
          className="flex flex-col p-4 gap-4 bg-white dark:bg-[#313338]"
        >
          <div className="flex flex-row gap-4">
            <Input
              type="text"
              onChange={(event) => setSearchProgressText(event.target.value)}
              value={searchProgressText}
              placeholder="Search"
            />
            <SearchSelect setSearchOption={handleSearchOption} />
            <Button
              variant="outline"
              onClick={() =>
                setSortProgressType(sortProgressType === "asc" ? "desc" : "asc")
              }
            >
              {sortProgressType === "asc" ? (
                <ArrowUpAZ className="w-6 h-6" />
              ) : (
                <ArrowDownAZ className="w-6 h-6" />
              )}
            </Button>
            <Button variant="outline" onClick={() => handleReset()}>
              <RefreshCw className="w-6 h-6" />
            </Button>
            <AddEducationSheet
              educationProgressForm={educationProgressForm}
              isEducationProgressLoading={isEducationProgressLoading}
              familyMembers={familyMembers}
              onSubmit={addEducationProgress}
            />
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            {!isEducationLoaded && (
              <div className="flex flex-1 items-center justify-center">
                <Loader className="w-10 h-10 animate-spin" />
              </div>
            )}
            {educationProgress.length === 0 && isEducationLoaded && (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-lg">No data available</p>
              </div>
            )}
            {educationProgress.length > 0 && isEducationLoaded && (
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
                {educationProgress
                  .filter(
                    (value) =>
                      selectedMember === null ||
                      selectedMember === value.id_user
                  )
                  .filter((value) => {
                    const fields = {
                      member: `${value.firstname} ${value.lastname}`,
                      progress: value.title,
                      school: value.school_info,
                    };
                    const field =
                      fields[searchOption as keyof typeof fields] ||
                      value.title;
                    return field
                      .toLowerCase()
                      .includes(searchProgressText.toLowerCase());
                  })
                  .sort((a, b) => {
                    if (sortProgressType === "asc") {
                      return a.title.localeCompare(b.title);
                    } else if (sortProgressType === "desc") {
                      return b.title.localeCompare(a.title);
                    } else {
                      return 0;
                    }
                  })
                  .map((progress, index) => (
                    <ProgressCard
                      key={progress.id_education_progress}
                      progressDetail={progress}
                      color={
                        styles[IndexString[index % IndexString.length].name]
                      }
                    />
                  ))}
              </div>
            )}
          </div>
          <EducationPagination />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={20}
          minSize={20}
          maxSize={40}
          className="bg-white dark:bg-[#313338] flex flex-col p-4 gap-4"
        >
          <Input
            placeholder="Search"
            onChange={(event) => setSearchMemberText(event.target.value)}
          />
          <div className="flex flex-1 flex-col overflow-y-auto">
            {!isMemberLoaded && (
              <div className="flex flex-1 items-center justify-center">
                <Loader className="w-10 h-10 animate-spin" />
              </div>
            )}
            {familyMembers.length === 0 && isMemberLoaded && (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-lg">No data available</p>
              </div>
            )}
            {familyMembers.length > 0 && isMemberLoaded && (
              <div className="flex flex-col gap-5">
                {familyMembers
                  .filter((value) => {
                    const name =
                      value.firstname.toLowerCase() +
                      " " +
                      value.lastname.toLowerCase();
                    const email = value.email.toLowerCase();
                    return (
                      name.includes(searchMemberText.toLowerCase()) ||
                      email.includes(searchMemberText.toLowerCase())
                    );
                  })
                  .map((member) => (
                    <MemberCard
                      key={member.id_user}
                      member={member}
                      handleMemberClick={handleMemberClick}
                      selectedMember={selectedMember}
                    />
                  ))}
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  } else {
    return <div>Education</div>;
  }
};

export default EducationPage;
