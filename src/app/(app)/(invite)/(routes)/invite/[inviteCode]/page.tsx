import { SignOut } from "@/actions/auth-actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const session = await auth();

  if (!session?.accessToken) {
    await SignOut();
  }

  if (!params.inviteCode) {
    return redirect("/family");
  }


  return null;
};

export default InviteCodePage;
