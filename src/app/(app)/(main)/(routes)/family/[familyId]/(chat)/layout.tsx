import { SocketProvider } from "@/components/providers/socket-provider";
import { ReactNode } from "react";

const ChatLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <SocketProvider>{children};</SocketProvider>;
};

export default ChatLayout;
