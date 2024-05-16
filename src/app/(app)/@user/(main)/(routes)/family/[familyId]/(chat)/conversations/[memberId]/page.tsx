import { GetMessages } from "@/actions/chat-actions";
import { GetMemberDetail } from "@/actions/family-actions";
import { auth } from "@/auth";
import ChatHeader from "@/components/user/chat/chat-header";
import ChatInput from "@/components/user/chat/chat-input";
import { redirect } from "next/navigation";

interface MemberChatProps {
  params: {
    familyId: string;
    memberId: string;
  };
}

const MemberChat = async ({ params }: MemberChatProps) => {
  const session = await auth();
  if (!session?.accessToken) {
    return redirect("/login");
  }
  const conversation = await GetMessages(
    session.accessToken,
    params.memberId,
    0
  );

  if (!conversation || conversation.length === 0) {
    return redirect(`/family/${params.familyId}/chat`);
  }

  const memberOne = await GetMemberDetail(
    session.accessToken,
    conversation[0].receiverId
  );

  if (!memberOne) {
    return redirect(`/family/${params.familyId}/chat`);
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={memberOne.avatar}
        name={`${memberOne.lastname} ${memberOne.firstname}`}
        familyId={params.familyId}
        type="conversation"
      />
      <ChatInput
        name={`${memberOne.lastname} ${memberOne.firstname}`}
        apiUrl="/api/socket/messages"
        query={{
          familyId: params.familyId,
          memberId: params.memberId,
        }}
        type="conversation"
      />
    </div>
  );
};

export default MemberChat;
