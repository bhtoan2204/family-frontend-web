import { GetAllGuideline } from "@/actions/guideline-actions";
import { auth } from "@/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import GuidelineItem from "@/components/user/guideline/guideline-item";
import { redirect } from "next/navigation";
import AddGuidelineButton from "./add-guideline-button";

interface GuidelineSidebarProps {
  familyId: string;
}

const GuidelineSidebar = async ({ familyId }: GuidelineSidebarProps) => {
  const session = await auth();
  if (!session?.accessToken) {
    return redirect("/signin");
  }

  const { guidelines: allGuidelines, total } = await GetAllGuideline(
    session.accessToken,
    Number(familyId),
    1,
    10
  );

  if (allGuidelines.length === 0) {
    return null;
  } else {
    return (
      <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5] border-l-2 border-r-2 border-zinc-200 dark:border-zinc-700">
        <AddGuidelineButton />
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-2">
            {allGuidelines.map((guideline, i) => (
              <GuidelineItem
                key={guideline.id_item}
                name={guideline.name}
                description={guideline.description}
                itemId={guideline.id_item}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }
};

export default GuidelineSidebar;
