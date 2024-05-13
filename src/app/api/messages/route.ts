import { GetAllMember } from "@/actions/family-actions";
import { auth } from "@/auth";
import ChatUrl from "@/services/url/chat-url";
import { FamilyChat, FamilyChatWithMember } from "@/types/chat";
import { Member } from "@/types/member";
import { NextResponse } from "next/server";

const MESSAGES_BATCH = 30;

export async function GET(req: Request) {
  try {
    const session = await auth();
    const { searchParams } = new URL(req.url);

    const index = searchParams.get("index");
    const chatId = searchParams.get("chatId");

    if (!session?.accessToken) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!chatId) {
      return new Response("Missing family id", { status: 400 });
    }

    let messages: FamilyChatWithMember[] = [];

    if (index) {
      const reponse = await fetch(
        `${ChatUrl.getMessagesOfFamily}/${chatId}/${index}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      const messagesRes = await reponse.json();
      const members = await GetAllMember(session.accessToken, chatId);

      messages = messagesRes.map((message: FamilyChat) => {
        return {
          ...message,
          member: members.find(
            (member: Member) => member.id_user === message.senderId
          ),
        };
      });
    }

    let nextCursor = null;

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = Number(index) + 1;
    }

    return NextResponse.json({
      items: messages,
      nextCursor,
    });
  } catch (error) {
    console.log("[MESSAGES_GET]", error);
    return new Response("Internal Error!", { status: 500 });
  }
}
