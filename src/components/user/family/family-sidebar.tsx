import { GetFamilyWithMember } from "@/actions/family-actions";
import { GetAllGuideline } from "@/actions/guideline-actions";
import { auth } from "@/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import FamilyCalendar from "@/components/user/family/family-calendar";
import FamilyConversation from "@/components/user/family/family-conversation";
import FamilyEducation from "@/components/user/family/family-education";
import FamilyFinance from "@/components/user/family/family-finance";
import FamilyGuideline from "@/components/user/family/family-guideline";
import FamilyHeader from "@/components/user/family/family-header";
import FamilyHousehold from "@/components/user/family/family-household";
import FamilyMember from "@/components/user/family/family-member";
import FamilyNews from "@/components/user/family/family-news";
import FamilySearch from "@/components/user/family/family-search";
import FamilySection from "@/components/user/family/family-section";
import { GuidelineItemType } from "@/types/guideline";
import { roleIconMapRight } from "@/util/rol-icon-map";
import { redirect } from "next/navigation";

interface FamilySidebarProps {
  familyId: string;
}

const FamilySidebar = async ({ familyId }: FamilySidebarProps) => {
  // const [isExpanded, setIsExpanded] = useState(localStorage.getItem('isExpanded') === 'true');

  // const handleToggle = () => {
  //   const newValue = !isExpanded;
  //   setIsExpanded(newValue);
  //   localStorage.setItem('isExpanded', newValue.toString()); // Lưu trạng thái vào localStorage
  // };

  // useEffect(() => {
  //   setIsExpanded(localStorage.getItem('isExpanded') === 'true');
  // }, []);

  const session = await auth();
  if (!session?.accessToken) {
    return redirect("/family");
  }

  const family = await GetFamilyWithMember(
    session.accessToken,
    session.user.id,
    familyId
  ).catch((error) => {
    return redirect("/family");
  });

  const allGuidelines: GuidelineItemType[] = await GetAllGuideline(
    session.accessToken,
    Number(familyId),
    1,
    10
  ).catch((error) => {
    console.log(error);
    return [];
  });

  if (family.members.length === 0 || !family) {
    return redirect("/family");
  }

  const memberWithoutSelf = family.members.filter(
    (m) => m.id_user !== session.user.id
  );

  const role = family.members.find((m) => m.id_user === session.user.id)!.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <FamilyHeader family={family} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <FamilySearch
            familyData={[
              {
                label: "Members",
                type: "member",
                data: family.members.map((member) => ({
                  id: member.id_user,
                  name: member.lastname + " " + member.firstname,
                  icon: roleIconMapRight[
                    member.role as keyof typeof roleIconMapRight
                  ],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        <div className="mb-2">
          <FamilySection
            label="Chat"
            role={role}
            sectionType="chat"
            family={family}
          />
          <div className="space-y-[2px]">
            <FamilyConversation role={role} family={family} />
          </div>
        </div>
        <div className="mb-2">
          <FamilySection
            label="News"
            role={role}
            sectionType="news"
            family={family}
          />
          <div className="space-y-[2px]">
            <FamilyNews />
          </div>
        </div>
        <div className="mb-2">
          <FamilySection
            label="Calendar"
            role={role}
            sectionType="calendar"
            family={family}
          />
          <div className="space-y-[2px]">
            <FamilyCalendar />
          </div>
        </div>
        <div className="mb-2">
          <FamilySection
            label="Guideline"
            role={role}
            sectionType="guideline"
            family={family}
          />
          <div className="space-y-[2px]">
            <FamilyGuideline itemId={allGuidelines[0].id_item} />
          </div>
        </div>
        <div className="mb-2">
          <FamilySection
            label="Education"
            role={role}
            sectionType="education"
            family={family}
          />
          <div className="space-y-[2px]">
            <FamilyEducation />
          </div>
        </div>
        <div className="mb-2">
          <FamilySection
            label="Household"
            role={role}
            sectionType="household"
            family={family}
          />
          <div className="space-y-[2px]">
            <FamilyHousehold />
          </div>
        </div>
        <div className="mb-2">
          <FamilySection
            label="Finance"
            role={role}
            sectionType="finance"
            family={family}
          />
          <div className="space-y-[2px]">
            <FamilyFinance />
          </div>
        </div>
        <div className="mb-2">
          <FamilySection
            label="Members"
            role={role}
            sectionType="members"
            family={family}
          />
          <div className="space-y-[2px]">
            {memberWithoutSelf?.map((member) => (
              <FamilyMember
                key={member.id_user}
                member={member}
                family={family}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default FamilySidebar;
