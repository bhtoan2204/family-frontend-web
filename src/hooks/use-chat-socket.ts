import { GetAllMember } from "@/actions/family-actions";
import { useSocket } from "@/components/providers/socket-provider";
import ChatUrl from "@/services/url/chat-url";
import { FamilyChat, FamilyChatWithMember } from "@/types/chat";
import { Member } from "@/types/member";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ChatSocketProps = {
  addKey: string;
  deleteKey: string;
  queryKey: string;
};

export const useChatSocket = ({
  addKey,
  deleteKey,
  queryKey,
}: ChatSocketProps) => {
  const { socket, isConnected } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket || !isConnected) {
      return;
    }
    socket.on(deleteKey, (message: any) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }
        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.filter(
              (item: FamilyChatWithMember) => item._id !== message.messageId
            ),
          };
        });
        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    socket.on(addKey, async (message: any) => {
      console.log("addKey", message);
      const response = await fetch(
        `${ChatUrl.getMessagesOfFamily}/${message.familyId}/0`,
        {
          headers: {
            Authorization: `Bearer ${message.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = (await response.json()) as FamilyChat[];

      const newMessageRes = data[0];

      const members = await GetAllMember(message.token, message.familyId);

      const newMessage: FamilyChatWithMember = {
        ...newMessageRes,
        member: members.find(
          (member: Member) => member.id_user === newMessageRes.senderId
        )!,
      };
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [{ items: [newMessage] }],
          };
        }

        const newData = [...oldData.pages];
        newData[0] = {
          ...newData[0],
          items: [newMessage, ...newData[0].items],
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(deleteKey);
    };
  }, [queryClient, socket, addKey, deleteKey, queryKey, isConnected]);
};
