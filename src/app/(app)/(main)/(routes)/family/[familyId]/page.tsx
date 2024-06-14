import { CheckIfUserIsInFamily } from "@/actions/family-actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface FamilyPageProps {
  params: {
    familyId: string;
  };
}

const FamilyPage = async ({ params }: FamilyPageProps) => {
  const session = await auth();
  if (!session?.accessToken) {
    return redirect("/signin");
  }

  const isMember = await CheckIfUserIsInFamily(
    session.accessToken,
    session.user.id,
    params.familyId
  ).catch((error) => { 
    return redirect("/family");
  });

  if (!isMember) {
    return redirect("/family");
  }

  return redirect(`/family/${params.familyId}/chat`);
};

export default FamilyPage;
