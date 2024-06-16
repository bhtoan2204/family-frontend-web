import { SignOut } from "@/actions/auth-actions";
import { GetFamilyDetail } from "@/actions/family-actions";
import { auth } from "@/auth";
import FamilyNavigationSidebar from "@/components/user/family/navigation/family-navigation-sidebar";
import { Family } from "@/types/family";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const FamilyIdLayout = async ({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: { familyId: string };
}>) => {
  const session = await auth();
  if (!session?.accessToken) {
    return await SignOut();
  }

  const family: Family = await GetFamilyDetail(
    session.accessToken,
    params.familyId
  );

  if (!family) {
    return redirect("/family");
  }

  return (
    <div className="h-full">
      <div className="flex h-full w-20 z-30 flex-col fixed inset-y-0">
        <FamilyNavigationSidebar
          familyId={params.familyId}
          session={session}
          familyName={family.name}
        />
      </div>
      <main className="h-full pl-20 dark:bg-neutral-900 bg-white">
        {children}
      </main>
    </div>
  );
};

export default FamilyIdLayout;
