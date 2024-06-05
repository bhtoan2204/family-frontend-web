import MobileToggle from "@/components/mobile-toggle";
import { School } from "lucide-react";

interface EducationHeaderProps {
  familyId: string;
}

const EducationHeader = ({ familyId }: EducationHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle familyId={familyId} />
      <School className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      <p className="font-semibold text-md text-black dark:text-white">
        Education
      </p>
    </div>
  );
};

export default EducationHeader;
