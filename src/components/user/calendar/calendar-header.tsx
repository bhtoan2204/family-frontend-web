import MobileToggle from "@/components/mobile-toggle";
import { Calendar } from "lucide-react";

interface CalendarHeaderProps {
  familyId: string;
}

const CalendarHeader = ({ familyId }: CalendarHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle familyId={familyId} />
      <Calendar className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      <p className="font-semibold text-md text-black dark:text-white">
        Calendar
      </p>
    </div>
  );
};

export default CalendarHeader;
