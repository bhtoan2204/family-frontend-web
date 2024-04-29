"use server";

import ChatUrl from "@/services/url/chat-url";

const ChatActions = {
  GetAllChat: async (token: string, index: number) => {
    try {
      const response = await fetch(`${ChatUrl.getAllChats}/${index}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
  GetMessages: async (token: string, userId: string, index: number) => {
    try {
      const response = await fetch(
        `${ChatUrl.getMessages}/${userId}/${index}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
  GetMessagesOfFamily: async (
    token: string,
    familyId: number,
    index: number
  ) => {
    try {
      const response = await fetch(
        `${ChatUrl.getMessagesOfFamily}/${familyId}/${index}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
  MarkSeenMessage: async (token: string, receiverId: number) => {
    try {
      const response = await fetch(`${ChatUrl.markSeenMessage}/${receiverId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
};

export { ChatActions };
