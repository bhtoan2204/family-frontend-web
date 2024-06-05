"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { HouseholdCategory, HouseholdItem, Room } from "@/types/household";
import { useState } from "react";

interface HouseholdContentProps {
  rooms: Room[];
  householdCategory: HouseholdCategory[];
  householdItems: HouseholdItem[];
}

const HouseholdContent = ({
  rooms,
  householdCategory,
  householdItems,
}: HouseholdContentProps) => {
  const [selectedRoom, setSelectedRoom] = useState<Room>();
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="flex-1 flex flex-col p-4 overflow-y-auto">
      <div className="grid grid-cols-6 h-full">
        <div className="col-span-2">
          <ScrollArea>
            {rooms.map((room, index) => (
              <button
                onClick={() => setSelectedRoom(room)}
                key={room.room_name}
                className="group flex w-full"
              >
                <div className="flex items-center gap-x-2">
                  <p className="text-sm font-medium text-black dark:text-white">
                    {room.room_name}
                  </p>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>
        <div className="col-span-4">
          <ScrollArea>
            {householdItems.map((item, index) => (
              <div key={item.id_household_item} className="group flex w-full">
                <div className="flex items-center gap-x-2">
                  <p className="text-sm font-medium text-black dark:text-white">
                    {item.item_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-black dark:text-white">
                    {item.item_description}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default HouseholdContent;
