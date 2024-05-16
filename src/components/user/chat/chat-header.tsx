import MobileToggle from "@/components/mobile-toggle";
import SocketIndicator from "@/components/socket-indicator";
import UserAvatar from "@/components/user/user-avatar";
import { MessageCircle } from "lucide-react";

interface ChatHeaderProps {
  familyId: string;
  name: string;
  type: "chat" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({ familyId, name, type, imageUrl }: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle familyId={familyId} />
      {type === "chat" && (
        <MessageCircle className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversation" && imageUrl && (
        <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
      )}
      <p className="font-semibold text-md text-black dark:text-white">
        {type === "chat" ? `${name}'s chat` : `${name}`}
      </p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
