import { RefObject } from "react";
import { Member } from "./member";

export type UserChat = {
  _id: string;
  senderId: string;
  receiverId: string;
  type: "text" | "photo";
  content: string;
  isRead: boolean;
  timestamp: string;
};

export type FamilyChat = {
  _id: string;
  senderId: string;
  type: "text" | "photo";
  content: string;
  isRead: boolean;
  timestamp: string;
};

export type FamilyChatWithMember = FamilyChat & {
  member: Member;
}

export type ChatScrollProps = {
  chatRef: RefObject<HTMLDivElement>;
  bottomRef: RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
}