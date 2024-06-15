"use client";

import { GetAllRooms } from "@/actions/room-actions";
import { buttonVariants } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "@/hooks/use-modal-store";
import { Room } from "@/types/household";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import IndexString from "./index-string";
import styles from "./room-color.module.css";

interface RoomSidebarProps {
  familyId: string;
}

const containerVariants = {
  close: {
    width: "0rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "17.5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const RoomSidebar = ({ familyId }: RoomSidebarProps) => {
  const { data: session } = useSession();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const { onOpen } = useModal();

  useEffect(() => {
    if (familyId && session?.accessToken) {
      const fetchRooms = async () => {
        setIsLoading(true);
        const roomsRes = await GetAllRooms(
          session.accessToken,
          Number(familyId)
        );
        setRooms(roomsRes);
        setIsLoading(false);
      };
      fetchRooms();
    }
  }, [session?.accessToken, familyId]);

  const renderRooms = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col flex-1 justify-center items-center">
          <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />
        </div>
      );
    }

    if (!isLoading && rooms.length === 0) {
      return (
        <div className="flex flex-col flex-1 justify-center items-center">
          <p className="text-neutral-500 dark:text-neutral-400">
            No rooms found
          </p>
        </div>
      );
    }

    return rooms
      .filter((room) =>
        room.room_name.toLowerCase().includes(searchText.toLowerCase())
      )
      .map((room, index) => (
        <ContextMenu key={room.id_room}>
          <ContextMenuTrigger
            className={`py-[10px] px-[25px] rounded-[10px] text-[14px] hover:font-semibold ${
              styles[IndexString[index % IndexString.length].name]
            } cursor-pointer`}
          >
            {room.room_name}
          </ContextMenuTrigger>
          <ContextMenuContent className="w-15">
            <ContextMenuItem
              inset
              onClick={() =>
                onOpen("editRoom", {
                  familyId,
                  room: {
                    name: room.room_name,
                  },
                  token: session?.accessToken,
                  roomId: room.id_room.toString(),
                })
              }
            >
              Edit
              <ContextMenuShortcut>
                <PencilSquareIcon className="w-4 h-4 mr-2" />
              </ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem
              inset
              onClick={() =>
                onOpen("deleteRoom", {
                  roomId: room.id_room.toString(),
                  familyId,
                  token: session?.accessToken,
                })
              }
            >
              Delete
              <ContextMenuShortcut>
                <TrashIcon className="w-4 h-4 mr-2" />
              </ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ));
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="open"
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className="h-full flex flex-col gap-8 w-64 absolute dark:bg-neutral-900 bg-white ml-0 border-r border-neutral-800 p-5 shadow shadow-neutral-600"
    >
      <div className="flex flex-row w-full justify-between place-content-center">
        <h1 className="tracking-wide dark:text-neutral-100 text-lg">
          Room List
        </h1>
      </div>
      <div className="flex items-start">
        <button
          className={`${buttonVariants({
            variant: "primary",
            size: "sm",
          })} h-8`}
          onClick={() =>
            onOpen("createRoom", { familyId, token: session?.accessToken })
          }
        >
          <p className="text-lg dark:text-neutral-100 text-white">Add Room</p>
        </button>
      </div>
      <input
        type="text"
        placeholder="Search"
        className="px-3 py-2 tracking-wide rounded-lg bg-neutral-400/40 dark:bg-neutral-600/40 dark:text-neutral-100"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <ScrollArea>
        <div className="flex flex-wrap gap-5">{renderRooms()}</div>
      </ScrollArea>
    </motion.nav>
  );
};

export default RoomSidebar;
