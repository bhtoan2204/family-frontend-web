"use client";

import {
  CreateEducation,
  DeleteEducation,
  GetAllEducation,
  GetEducationDetail,
  UpdateEducation,
} from "@/actions/education-actions";
import { GetAllMember } from "@/actions/family-actions";
import {
  ChangeStatus,
  CreateSubject,
  DeleteSubject,
  GetSubjectDetail,
  ModifyScore,
  UpdateSubject,
} from "@/actions/subject-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddEducationSheet from "@/components/user/education/add-education-sheet";
import AddSubjectSheet from "@/components/user/education/add-subject-sheet";
import IndexString from "@/components/user/education/color/index-string";
import DeleteEducationDialog from "@/components/user/education/delete-education-dialog";
import DeleteSubjectDialog from "@/components/user/education/delete-subject-dialog";
import EditEducationSheet from "@/components/user/education/edit-education-sheet";
import MemberCard from "@/components/user/education/member-card";
import EducationPagination from "@/components/user/education/pagination";
import ProgressCard from "@/components/user/education/progress-card";
import ProgressDetail from "@/components/user/education/progress-detail";
import SearchSelect from "@/components/user/education/search-select";
import SubjectForm from "@/components/user/education/subject-form";
import SubjectTestsTable from "@/components/user/education/subject-tests-table";
import { EducationProgressSchema } from "@/schemas/education-schema";
import { SubjectSchema, SubjectTestSchema } from "@/schemas/subject-schema";
import {
  EducationProgress,
  EducationProgressDetail,
  SubjectDetail,
} from "@/types/education";
import { Member } from "@/types/member";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownAZ, ArrowUpAZ, Loader, RefreshCw } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import styles from "./color-string.module.css";

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

const editEducation = async (
  token: string,
  familyId: number,
  educationProgressId: number,
  title: string,
  progressNotes: string,
  schoolInfo: string
) => {
  try {
    const res = await UpdateEducation(
      token,
      educationProgressId,
      familyId,
      title,
      progressNotes,
      schoolInfo
    );
    return res;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

const deleteEducation = async (
  token: string,
  educationProgressId: number,
  familyId: number
) => {
  try {
    const res = await DeleteEducation(token, educationProgressId, familyId);
    return res;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

const fetchEducationDetail = async (
  token: string,
  familyId: number,
  educationProgressId: number
) => {
  try {
    const res = await GetEducationDetail(token, familyId, educationProgressId);
    return res;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

const fetchSubjectDetail = async (
  token: string,
  subjectId: number,
  educationProgressId: string,
  familyId: number
) => {
  try {
    const res = await GetSubjectDetail(
      token,
      subjectId,
      educationProgressId,
      familyId
    );
    return res;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

const addSubject = async (
  token: string,
  educationProgressId: number,
  familyId: number,
  subjectName: string,
  description: string
) => {
  try {
    const res = await CreateSubject(
      token,
      educationProgressId,
      familyId,
      subjectName,
      description
    );
    return res;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

const editSubject = async (
  token: string,
  subjectId: number,
  educationProgressId: number,
  familyId: number,
  subjectName: string,
  description: string
) => {
  try {
    const res = await UpdateSubject(
      token,
      subjectId,
      educationProgressId,
      familyId,
      subjectName,
      description
    );
    return res;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

const deleteSubject = async (
  token: string,
  subjectId: number,
  educationProgressId: number,
  familyId: number
) => {
  try {
    const res = await DeleteSubject(
      token,
      subjectId,
      educationProgressId,
      familyId
    );
    return res;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

const modifyScore = async (
  token: string,
  subjectId: number,
  educationProgressId: number,
  familyId: number,
  midtermScore: number,
  finalScore: number,
  bonusScore: number
) => {
  try {
    const res = await ModifyScore(
      token,
      subjectId,
      educationProgressId,
      familyId,
      midtermScore,
      finalScore,
      bonusScore
    );
    return res;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

const removeScore = async (
  token: string,
  subjectId: number,
  educationProgressId: number,
  familyId: number
) => {
  try {
    const res = await ModifyScore(
      token,
      subjectId,
      educationProgressId,
      familyId,
      null,
      null,
      null
    );
    return res;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

const changeStatus = async (
  token: string,
  subjectId: number,
  familyId: number,
  educationProgressId: number,
  status: string
) => {
  try {
    const res = await ChangeStatus(
      token,
      subjectId,
      educationProgressId,
      familyId,
      status
    );
    return res;
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
  const [sortMemberType, setSortMemberType] = useState<string>("");

  const [selectedProgress, setSelectedProgress] =
    useState<EducationProgress | null>(null);
  const [educationProgressDetail, setEducationProgressDetail] =
    useState<EducationProgressDetail | null>(null);
  const [isProgressDetailLoaded, setIsProgressDetailLoaded] = useState(false);
  const [searchSubjectText, setSearchSubjectText] = useState<string>("");
  const [sortSubjectType, setSortSubjectType] = useState<string>("");
  const [progressBar, setProgressBar] = useState<number>(0);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [isDeleteEducationDialogOpen, setIsDeleteEducationDialogOpen] =
    useState(false);
  const [subjectDetail, setSubjectDetail] = useState<SubjectDetail | null>(
    null
  );
  const [isSubjectDetailLoaded, setIsSubjectDetailLoaded] = useState(false);
  const [isEditSubject, setIsEditSubject] = useState(false);
  const [isDeleteSubjectDialogOpen, setIsDeleteSubjectDialogOpen] =
    useState(false);
  const [onDeleteTestsScoreDialog, setOnDeleteTestsScoreDialog] =
    useState(false);

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

  const handleSubjectClick = (subjectId: number) => {
    if (selectedSubject && selectedSubject === subjectId) {
      setSelectedSubject(null);
    } else {
      setSelectedSubject(subjectId);
      fetchSubjectDetail(
        session!.accessToken,
        subjectId,
        selectedProgress!.id_education_progress.toString(),
        Number(params!.familyId)
      ).then((res) => {
        setSubjectDetail(res);
        setIsSubjectDetailLoaded(true);
      });
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
    setSortMemberType("");
    setSelectedMember(null);
  };

  const handleSelectedProgress = (progress: EducationProgress) => {
    setIsDetailMode(true);
    setSelectedProgress(progress);
    setIsProgressDetailLoaded(false);
    if (progress.id_education_progress && session?.accessToken && params) {
      fetchEducationDetail(
        session.accessToken,
        Number(params.familyId),
        progress.id_education_progress
      ).then((res) => {
        if (res.subjects_info) {
          const totalSubject = res.subjects_info.length;
          const finishedSubject = res.subjects_info.filter(
            (subject) => subject.status !== "in_progress"
          ).length;
          const progress = (finishedSubject / totalSubject) * 100;
          setProgressBar(progress);
        }
        setEducationProgressDetail(res);
        setIsProgressDetailLoaded(true);
      });
    } else {
      setIsProgressDetailLoaded(true);
    }
  };

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
      educationProgressForm.reset();
    });
  };

  const editEducationProgress = async (
    values: z.infer<typeof EducationProgressSchema>
  ) => {
    await editEducation(
      session!.accessToken,
      Number(params!.familyId),
      selectedProgress!.id_education_progress,
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
      setEducationProgressDetail(
        (prev) =>
          prev && {
            ...prev,
            education_progress_info: {
              ...prev.education_progress_info,
              title: values.title,
              progress_notes: values.progressNotes,
              school_info: values.schoolInfo,
            },
          }
      );
    });
  };

  const addSubjectSubmit = async (values: z.infer<typeof SubjectSchema>) => {
    await addSubject(
      session!.accessToken,
      selectedProgress!.id_education_progress,
      Number(params!.familyId),
      values.name,
      values.description
    );
    addSubject(
      session!.accessToken,
      selectedProgress!.id_education_progress,
      Number(params!.familyId),
      values.name,
      values.description
    ).then((res) => {
      setEducationProgressDetail(
        (prev) =>
          prev && {
            ...prev,
            subjects_info: [
              ...prev.subjects_info!,
              {
                id_subject: res.id_subject,
                subject_name: values.name,
                description: values.description,
                status: res.status,
              },
            ],
          }
      );
      subjectForm.reset();
    });
  };

  const editSubjectSubmit = async (values: z.infer<typeof SubjectSchema>) => {
    await editSubject(
      session!.accessToken,
      selectedSubject!,
      selectedProgress!.id_education_progress,
      Number(params!.familyId),
      values.name,
      values.description
    );
    editSubject(
      session!.accessToken,
      selectedSubject!,
      selectedProgress!.id_education_progress,
      Number(params!.familyId),
      values.name,
      values.description
    ).then((res) => {
      setEducationProgressDetail(
        (prev) =>
          prev && {
            ...prev,
            subjects_info: prev.subjects_info!.map((subject) =>
              subject.id_subject === selectedSubject
                ? {
                    ...subject,
                    subject_name: values.name,
                    description: values.description,
                  }
                : subject
            ),
          }
      );
      setSubjectDetail(
        (prev) =>
          prev && {
            ...prev,
            subject_name: values.name,
            description: values.description,
          }
      );
      setIsEditSubject(false);
    });
  };

  const editTestsSubmit = (values: z.infer<typeof SubjectTestSchema>) => {
    modifyScore(
      session!.accessToken,
      selectedSubject!,
      selectedProgress!.id_education_progress,
      Number(params!.familyId),
      values.midtermScore!,
      values.finalScore!,
      values.bonusScore!
    ).then(() => {
      setSubjectDetail(
        (prev) =>
          prev && {
            ...prev,
            midterm_score: values.midtermScore!,
            final_score: values.finalScore!,
            bonus_score: values.bonusScore!,
          }
      );
    });
  };

  const removeTestSubmit = () => {
    removeScore(
      session!.accessToken,
      selectedSubject!,
      selectedProgress!.id_education_progress,
      Number(params!.familyId)
    ).then(() => {
      setSubjectDetail(
        (prev) =>
          prev && {
            ...prev,
            midterm_score: null,
            final_score: null,
            bonus_score: null,
          }
      );
      setOnDeleteTestsScoreDialog(false);
    });
  };

  const deleteEducationProgress = async () => {
    setIsDeleteEducationDialogOpen(false);
    setIsEducationLoaded(false);
    await deleteEducation(
      session!.accessToken,
      selectedProgress!.id_education_progress,
      Number(params!.familyId)
    );
    fetchEducationProgress(
      session!.accessToken,
      Number(params!.familyId),
      "1",
      ITEMS_PER_PAGE.toString()
    ).then((res) => {
      setEducationProgress(res);
      setIsDetailMode(false);
      setIsEducationLoaded(true);
    });
  };

  const deleteSubjectSubmit = async () => {
    setIsDeleteSubjectDialogOpen(false);
    await deleteSubject(
      session!.accessToken,
      selectedSubject!,
      selectedProgress!.id_education_progress,
      Number(params!.familyId)
    ).then(() => {
      setEducationProgressDetail(
        (prev) =>
          prev && {
            ...prev,
            subjects_info: prev.subjects_info!.filter(
              (subject) => subject.id_subject !== selectedSubject
            ),
          }
      );
      setSelectedSubject(null);
      setSubjectDetail(null);
    });
  };

  const handleChangeSubjectStatus = async (status: string) => {
    changeStatus(
      session!.accessToken,
      selectedSubject!,
      Number(params!.familyId),
      selectedProgress!.id_education_progress,
      status
    ).then((res) => {
      setEducationProgressDetail(
        (prev) =>
          prev && {
            ...prev,
            subjects_info: prev.subjects_info!.map((subject) =>
              subject.id_subject === selectedSubject
                ? { ...subject, status: status }
                : subject
            ),
          }
      );
      setSubjectDetail(
        (prev) =>
          prev && {
            ...prev,
            status: status,
          }
      );
    });
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

  const subjectForm = useForm({
    resolver: zodResolver(SubjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const subjectTestsForm = useForm({
    resolver: zodResolver(SubjectTestSchema),
    defaultValues: {
      midtermScore: 0,
      finalScore: 0,
      bonusScore: 0,
    },
  });

  const isSubjectTestsloading = subjectTestsForm.formState.isSubmitting;

  const isEducationProgressLoading =
    educationProgressForm.formState.isSubmitting;

  const isSubjectLoading = subjectForm.formState.isSubmitting;

  if (!educationProgress || !familyMembers) {
    return null;
  }

  if (!isDetailMode) {
    return (
      <ResizablePanelGroup key="group1" direction="horizontal">
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
                      onSwitchMode={handleSelectedProgress}
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
          <div className="flex flex-row gap-4">
            <Input
              placeholder="Search"
              onChange={(event) => setSearchMemberText(event.target.value)}
            />
            <Button
              variant="outline"
              onClick={() =>
                setSortMemberType(sortMemberType === "asc" ? "desc" : "asc")
              }
            >
              {sortMemberType === "asc" ? (
                <ArrowUpAZ className="w-6 h-6" />
              ) : (
                <ArrowDownAZ className="w-6 h-6" />
              )}
            </Button>
          </div>
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
                  .sort((a, b) => {
                    if (sortMemberType === "asc") {
                      return a.firstname.localeCompare(b.firstname);
                    } else if (sortMemberType === "desc") {
                      return b.firstname.localeCompare(a.firstname);
                    } else {
                      return 0;
                    }
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
    return (
      <ResizablePanelGroup key="group2" direction="horizontal">
        <ResizablePanel
          defaultSize={60}
          maxSize={70}
          minSize={40}
          className="bg-white dark:bg-[#313338] flex flex-col p-4 gap-4"
        >
          <div className="flex flex-row gap-4">
            <Button variant="outline" onClick={() => setIsDetailMode(false)}>
              Back
            </Button>
            <Input
              type="text"
              onChange={(event) => setSearchSubjectText(event.target.value)}
              value={searchSubjectText}
              placeholder="Search"
            />
            <Button
              variant="outline"
              onClick={() =>
                setSortSubjectType(sortSubjectType === "asc" ? "desc" : "asc")
              }
            >
              {sortSubjectType === "asc" ? (
                <ArrowUpAZ className="w-6 h-6" />
              ) : (
                <ArrowDownAZ className="w-6 h-6" />
              )}
            </Button>
            <AddSubjectSheet
              subjectForm={subjectForm}
              isSubjectLoading={isSubjectLoading}
              onSubmit={addSubjectSubmit}
            />
            <EditEducationSheet
              educationProgressForm={educationProgressForm}
              isEducationProgressLoading={isEducationProgressLoading}
              familyMembers={familyMembers}
              onSubmit={editEducationProgress}
              educationProgress={selectedProgress!}
            />
            <DeleteEducationDialog
              onDelete={deleteEducationProgress}
              onOpen={() => setIsDeleteEducationDialogOpen(true)}
              onClose={() => setIsDeleteEducationDialogOpen(false)}
              isOpen={isDeleteEducationDialogOpen}
            />
          </div>
          {!isProgressDetailLoaded && (
            <div className="flex flex-1 items-center justify-center">
              <Loader className="w-10 h-10 animate-spin" />
            </div>
          )}
          {isProgressDetailLoaded && !educationProgressDetail && (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-lg">No data available</p>
            </div>
          )}
          {isProgressDetailLoaded && educationProgressDetail && (
            <ProgressDetail
              educationProgressDetail={educationProgressDetail}
              familyMember={
                familyMembers[
                  familyMembers.findIndex(
                    (member) => member.id_user === selectedProgress?.id_user
                  )
                ]
              }
              searchSubjectText={searchSubjectText}
              styles={styles}
              sortSubjectType={sortSubjectType}
              progressBar={progressBar}
              onSubjectClick={handleSubjectClick}
              selectedSubject={selectedSubject}
            />
          )}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={40}
          maxSize={60}
          minSize={30}
          className="bg-white dark:bg-[#313338] flex flex-col p-4 gap-4"
        >
          {!selectedSubject && (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-lg">
                Please select a subject to view the details
              </p>
            </div>
          )}
          {!isSubjectDetailLoaded && selectedSubject && (
            <div className="flex flex-1 items-center justify-center">
              <Loader className="w-10 h-10 animate-spin" />
            </div>
          )}
          {isSubjectDetailLoaded && selectedSubject && !subjectDetail && (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-lg">No data available</p>
            </div>
          )}
          {isSubjectDetailLoaded && selectedSubject && subjectDetail && (
            <>
              <SubjectForm
                isSubjectLoading={isSubjectLoading}
                subjectForm={subjectForm}
                onSubmit={editSubjectSubmit}
                subjectDetail={subjectDetail}
                isEditSubject={isEditSubject}
                setIsEditSubject={setIsEditSubject}
              />
              <div className="flex flex-1 flex-col">
                <SubjectTestsTable
                  subjectDetail={subjectDetail}
                  isSubjectTestsLoading={isSubjectTestsloading}
                  subjectTestsForm={subjectTestsForm}
                  onSubmit={editTestsSubmit}
                  onDelete={removeTestSubmit}
                  onOpen={() => setOnDeleteTestsScoreDialog(true)}
                  onClose={() => setOnDeleteTestsScoreDialog(false)}
                  isOpen={onDeleteTestsScoreDialog}
                />
              </div>
              <div className="flex flex-row items-end">
                <div className="flex flex-row gap-5">
                  <DeleteSubjectDialog
                    onDelete={deleteSubjectSubmit}
                    onOpen={() => setIsDeleteSubjectDialogOpen(true)}
                    onClose={() => setIsDeleteSubjectDialogOpen(false)}
                    isOpen={isDeleteSubjectDialogOpen}
                  />
                  <Select
                    key={subjectDetail.id_subject}
                    defaultValue={subjectDetail.status}
                    onValueChange={(value) => handleChangeSubjectStatus(value)}
                  >
                    <SelectTrigger defaultValue={subjectDetail.status}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="done">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }
};

export default EducationPage;
