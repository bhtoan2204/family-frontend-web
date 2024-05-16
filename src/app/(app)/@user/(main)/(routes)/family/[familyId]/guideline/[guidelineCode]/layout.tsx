import { SignOut } from "@/actions/auth-actions";
import { GetFamilyDetail } from "@/actions/family-actions";
import { auth } from "@/auth";
import GuidelineSidebar from "@/components/user/guideline/guideline-sidebar";
import { Family } from "@/types/family";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const GuidelineIdLayout = async ({
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
    return redirect("/setup");
  }

  return (
    <div className="h-full">
      <div
        className="hidden md:flex h-full w-60 z-10 fixed
      inset-y-0"
      >
        <GuidelineSidebar familyId={params.familyId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default GuidelineIdLayout;
