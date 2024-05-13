import { Hash } from "lucide-react";

interface ChatWelcomeProps {
  type: "chat" | "conversation";
  name: string;
}

const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === "chat" && (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="h-12 w-12 text-white" />
        </div>
      )}
      <p className="text-xl md:text-3xl font-bold">
        {type === "chat" ? "Welcome to the " : ""}
        {name}
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "chat"
          ? `This is the start of the ${name}'s chat`
          : `This is the start of your conversation with ${name}`}
      </p>
    </div>
  );
};

export default ChatWelcome;
