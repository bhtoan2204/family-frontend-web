"use server";

import ChatUrl from "@/services/url/chat-url";
import { UserChat } from "@/types/chat";

export const GetAllChat = async (token: string, index: number) => {
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
    return { error: "Internal Error!" };
  }
};
export const GetMessages = async (
  token: string,
  userId: string,
  index: number
) => {
  try {
    const response = await fetch(`${ChatUrl.getMessages}/${userId}/${index}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data as UserChat[];
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const GetMessagesOfFamily = async (
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
    return { error: "Internal Error!" };
  }
};
export const MarkSeenMessage = async (token: string, receiverId: number) => {
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
    return { error: "Internal Error!" };
  }
};
export const SendMessage = async (content: string) => {
  try {
  } catch (error) {}
};
export const RemoveMessage = async (
  token: string,
  messageId: string,
  memberId: string
) => {
  try {
    const reponse = await fetch(
      `${ChatUrl.removeMessage}/${memberId}/${messageId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await reponse.json();
    console.log(data);
    if (data.statusCode === 500) {
      throw new Error(data);
    }
    return data;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
