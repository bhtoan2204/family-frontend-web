"use client";

import { useSession } from "next-auth/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socketServer: any;
  socket: any;
  isServerConnected: boolean;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socketServer: null,
  socket: null,
  isServerConnected: false,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socketServer, setSocketServer] = useState(null);
  const [isServerConnected, setIsServerConnected] = useState(false);

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const socketServerInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SOCKET_URL!,
      {
        extraHeaders: {
          Authorization: `Bearer ${session!.accessToken}`,
        },
      }
    );

    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: true,
      }
    );

    socketServerInstance.on("connect", () => {
      setIsServerConnected(true);
    });

    socketServerInstance.on("disconnect", () => {
      setIsServerConnected(false);
    });

    setSocketServer(socketServerInstance);

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketServerInstance.disconnect();
      socketInstance.disconnect();
    };
  }, [session]);

  return useMemo(
    () => (
      <SocketContext.Provider
        value={{
          socketServer,
          socket,
          isServerConnected,
          isConnected,
        }}
      >
        {children}
      </SocketContext.Provider>
    ),
    [socketServer, socket, isServerConnected, isConnected, children]
  );
};
