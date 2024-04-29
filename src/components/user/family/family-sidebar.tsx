import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FamilyHeader from "./family-header";

interface FamilySidebarProps {
  familyId: string;
}

const FamilySidebar = async ({ familyId }: FamilySidebarProps) => {
  const session = await auth();
  if (!session?.accessToken) {
    return redirect("/setup");
  }

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <FamilyHeader family={family} role={session.user.} />
    </div>
  );
};

export default FamilySidebar;
