import { GetFamilyWithMember } from "@/actions/family-actions";
import { auth } from "@/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import FamilyCalendar from "@/components/user/family/family-calendar";
import FamilyConversation from "@/components/user/family/family-conversation";
import FamilyHeader from "@/components/user/family/family-header";
import FamilyMember from "@/components/user/family/family-member";
import FamilyNews from "@/components/user/family/family-news";
import FamilySearch from "@/components/user/family/family-search";
import FamilySection from "@/components/user/family/family-section";
import { roleIconMapRight } from "@/util/rol-icon-map";
import { redirect } from "next/navigation";

interface FamilySidebarProps {
  familyId: string;
}

const FamilySidebar = async ({ familyId }: FamilySidebarProps) => {
  const session = await auth();
  if (!session?.accessToken) {
    return redirect("/setup");
  }

  const family = await GetFamilyWithMember(
    session.accessToken,
    session.user.id,
    familyId
  ).catch((error) => {
    return redirect("/setup");
  });

  if (family.members.length === 0 || !family) {
    return redirect("/setup");
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
          <div className="space-y-[2px]"></div>
        </div>
        <div className="mb-2">
          <FamilySection
            label="Education"
            role={role}
            sectionType="education"
            family={family}
          />
          <div className="space-y-[2px]"></div>
        </div>
        <div className="mb-2">
          <FamilySection
            label="Household"
            role={role}
            sectionType="household"
            family={family}
          />
          <div className="space-y-[2px]"></div>
        </div>
        <div className="mb-2">
          <FamilySection
            label="Finance"
            role={role}
            sectionType="finance"
            family={family}
          />
          <div className="space-y-[2px]"></div>
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
