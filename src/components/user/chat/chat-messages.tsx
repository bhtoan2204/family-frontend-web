"use client";

import ChatItem from "@/components/user/chat/chat-item";
import ChatWelcome from "@/components/user/chat/chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { FamilyChatWithMember } from "@/types/chat";
import { Member } from "@/types/member";
import { format } from "date-fns";
import { Loader2, ServerCrash } from "lucide-react";
import { ElementRef, Fragment, useRef } from "react";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "chatId" | "conversationId";
  paramValue: string;
  type: "chat" | "conversation";
}

const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${paramValue}`;
  const addKey = `chat:${paramValue}:add`;
  const deleteKey = `chat:${paramValue}:delete`;

  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  useChatSocket({
    queryKey,
    addKey,
    deleteKey,
  });

  useChatScroll({
    chatRef,
    bottomRef,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    loadMore: fetchNextPage,
    count: data?.pages?.[0]?.length ?? 0,
  });

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="w-7 h-7 tex-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="w-7 h-7 tex-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Error loading messages
        </p>
      </div>
    );
  }

  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage && <div className="flex-1" />}
      {!hasNextPage && <ChatWelcome type={type} name={name} />}
      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition my-4"
            >
              Load previous messages
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse mt-auto">
        {data?.pages.map((page, i) => (
          <Fragment key={`${i.toString()}code`}>
            {page.items.map((message: FamilyChatWithMember) => (
              <ChatItem
                key={message._id}
                id={message._id}
                currentMember={member}
                content={message.content}
                member={message.member}
                deleted={false}
                timestamp={format(new Date(message.timestamp), DATE_FORMAT)}
                isUpdated={message.isRead}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
                type={message.type}
              />
            ))}
          </Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
