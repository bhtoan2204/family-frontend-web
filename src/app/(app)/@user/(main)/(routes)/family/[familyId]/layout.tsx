import { AuthActions } from "@/actions/auth-actions";
import { FamilyActions } from "@/actions/family-actions";
import { auth } from "@/auth";
import FamilySidebar from "@/components/user/family/family-sidebar";
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
    return AuthActions.SignOut();
  }

  const family = await FamilyActions.GetFamilyDetail(
    session.accessToken,
    params.familyId
  );

  if (!family) {
    return redirect("/setup");
  }

  return (
    <div className="h-full">
      <div
        className="hidden md:flex h-full w-60 z-20 flex-col fixed
      inset-y-0"
      >
        <FamilySidebar familyId={params.familyId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default FamilyIdLayout;
