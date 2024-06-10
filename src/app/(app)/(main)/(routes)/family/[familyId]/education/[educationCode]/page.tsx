import { GetAllEducation } from "@/actions/education-actions";
import { auth } from "@/auth";
import EducationContent from "@/components/user/education/education-content";
import EducationHeader from "@/components/user/education/education-header";
import { Loader2 } from "lucide-react";

interface EducationPageProps {
  params: {
    familyId: string;
    educationCode: string;
  };
}

const EducationPage = async ({ params }: EducationPageProps) => {
  const session = await auth();

  const educationProgress = await GetAllEducation(
    session!.accessToken,
    Number(params.familyId),
    String(1),
    String(5)
  );

  if (!educationProgress) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="w-7 h-7 tex-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading education...
        </p>
      </div>
    );
  } else {
    return (
      <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
        <EducationHeader familyId={params.familyId} />
        <EducationContent
          familyId={params.familyId}
          token={session!.accessToken}
          educationProgress={educationProgress}
        />
      </div>
    );
  }
};

export default EducationPage;
