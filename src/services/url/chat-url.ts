import { baseUrl } from "@/services/url";

const ChatUrl = {
  getAllChats: `${baseUrl}/api/v1/chat/getUsersChat`,
  getMessages: `${baseUrl}/api/v1/chat/getMessages`,
  getMessagesOfFamily: `${baseUrl}/api/v1/chat/getFamilyMessages`,
  markSeenMessage: `${baseUrl}/api/v1/chat/markSeenMessage`,
  removeMessage: `${baseUrl}/api/v1/chat/removeMessage`,
};

export default ChatUrl;
