import { GetAllGuideline } from "@/actions/guideline-actions";
import { auth } from "@/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import GuidelineItem from "@/components/user/guideline/guideline-item";
import { GuidelineItemType } from "@/types/guideline";
import { redirect } from "next/navigation";
import FinanceSidebarBtn from "./finance-sidebar-btn";


interface FinanceSidebarProps {
    familyId: string;
}

const financeCategories = [
    {
        id: 1,
        name: "Summary",
    },
    {
        id: 2,
        name: "Expenditure",
    },
    {
        id: 3,
        name: "Income",
    },
    {
        id:4,
        name: "Chart"
    }
]

const FinanceSidebar = async ({ familyId }: FinanceSidebarProps) => {
    const session = await auth();
    if (!session?.accessToken) {
        return redirect("/signin");
    }

    // const allGuidelines: GuidelineItemType[] = await GetAllGuideline(
    //     session.accessToken,
    //     Number(familyId),
    //     1,
    //     10
    // ).catch((error) => {
    //     console.log(error);
    //     return [];
    // });



    if (financeCategories.length === 0) {
        return null;
    } else {
        return (
            <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5] border-l-2 border-r-2 border-zinc-200 dark:border-zinc-700">
                <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-3">
                    {/* <Plus className="h-5 w-5 dark:text-white text-black" />
      <span className="ml-2 dark:text-white text-black">Add Guideline</span> */}
                </button>
                <ScrollArea className="flex-1 px-3">
                    <div className="space-y-2">
                        {financeCategories.map((category, i) => (
                            <>
                                <FinanceSidebarBtn
                                    key={category.id}
                                    name={category.name}
                                    itemId={category.id}
                                    description=""
                                />
                            </>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        );
    }
};

export default FinanceSidebar;
