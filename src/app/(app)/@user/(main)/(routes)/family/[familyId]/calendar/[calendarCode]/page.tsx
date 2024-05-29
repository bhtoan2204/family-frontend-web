import {
  GetAllCategoryEvent,
  GetAllEventOfFamily,
} from "@/actions/calendar-actions";
import { auth } from "@/auth";
import CalendarContent from "@/components/user/calendar/calendar-content";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

interface CalendarPageProps {
  params: {
    familyId: string;
    calendarCode: string;
  };
}

const CalendarPage = async ({ params }: CalendarPageProps) => {
  const session = await auth();
  if (!session?.accessToken) {
    return redirect("/signin");
  }

  const responseEvents = await GetAllEventOfFamily(
    session.accessToken,
    Number(params.familyId)
  );

  const responseCategoryEvents = await GetAllCategoryEvent(
    session.accessToken,
    Number(params.familyId)
  );

  const calendarCollenctions: Record<string, any>[] =
    responseCategoryEvents.map((item) => {
      return {
        CalendarText: item.title,
        CalendarId: item.id_category_event,
        CalendarColor: item.color,
      };
    });

  if (responseEvents.length === 0 || responseCategoryEvents.length === 0) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="w-7 h-7 tex-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading calendar...
        </p>
      </div>
    );
  } else {
    return (
      <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
        {/* <CalendarHeader familyId={params.familyId} /> */}
        <CalendarContent
          token={session.accessToken}
          familyId={Number(params.familyId)}
          events={responseEvents}
          calendarCollections={calendarCollenctions}
        />
      </div>
    );
  }
};

export default CalendarPage;
