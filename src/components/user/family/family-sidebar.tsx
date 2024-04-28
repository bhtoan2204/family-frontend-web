import getFamilyDetail from "@/actions/family/get-family-detail";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface FamilySidebarProps {
  familyId: string;
}

const FamilySidebar = async ({ familyId }: FamilySidebarProps) => {
  const session = await auth();
  if (!session?.accessToken) {
    return redirect("/setup");
  }

  return (
    <div>
      <h2>Family Sidebar</h2>
    </div>
  );
};

export default FamilySidebar;
