import MobileToggle from "@/components/mobile-toggle";
import AddGuidelineButton from "@/components/user/guideline/add-guideline-button";
import { BookCheck } from "lucide-react";

interface GuidelineHeaderProps {
  familyId: string;
}

const GuidelineHeader = ({ familyId }: GuidelineHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle familyId={familyId} />
      <BookCheck className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      <p className="font-semibold text-md text-black dark:text-white">
        Guideline
      </p>
    </div>
  );
};

export default GuidelineHeader;
