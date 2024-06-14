import {
  CheckIfUserIsInFamily,
  GetFamilyDetail,
  GetMemberDetail,
} from "@/actions/family-actions";
import { auth } from "@/auth";
import ChatHeader from "@/components/user/chat/chat-header";
import ChatInput from "@/components/user/chat/chat-input";
import ChatMessages from "@/components/user/chat/chat-messages";
import { Family } from "@/types/family";
import { redirect } from "next/navigation";

interface ChatPageProps {
  params: {
    familyId: string;
    chatCode: string;
  };
}

const ChatPage = async ({ params }: ChatPageProps) => {
  const session = await auth();

  const family: Family = await GetFamilyDetail(
    session!.accessToken,
    params.familyId
  );

  const isMember = await CheckIfUserIsInFamily(
    session!.accessToken,
    session!.user.id,
    params.familyId
  );

  if (!isMember) {
    return redirect("/family");
  }

  const member = await GetMemberDetail(session!.accessToken, session!.user.id);

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader type="chat" familyId={params.familyId} name={family.name} />
      <ChatMessages
        member={member}
        name={family.name}
        type="chat"
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{
          familyId: params.familyId,
          chatCode: params.chatCode,
          memberId: member.id_user,
          token: session!.accessToken,
        }}
        paramKey="chatId"
        paramValue={params.familyId}
        chatId={params.chatCode}
      />
      <ChatInput
        name={family.name}
        apiUrl="/api/socket/messages"
        query={{
          familyId: params.familyId,
          chatCode: params.chatCode,
          token: session!.accessToken,
        }}
        type="chat"
      />
    </div>
  );
};

export default ChatPage;
