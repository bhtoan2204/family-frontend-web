"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ActionTooltip from "@/components/user/action-tooltip";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface HouseholdHoverCardProps {
  item_id: number;
  familyId: number;
  token: string;
  name: string;
  image: string | null;
  description: string;
}

const HouseholdHoverCard = ({
  item_id,
  familyId,
  token,
  name,
  image,
  description,
}: HouseholdHoverCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger
        asChild
        className="bg-white dark:bg-[#313338] rounded-lg shadow-lg p-5 relative cursor-pointer hover:shadow-xl flex items-center justify-center"
      >
        <div className="group flex items-center hover:bg-black/5 p-4 transition w-full">
          <div
            className={`flex items-center justify-center place-items-center h-full ${
              image && "flex-col"
            }`}
          >
            {image && (
              <Image
                src={image}
                alt={name}
                width={100}
                height={100}
                className="rounded-full"
              />
            )}
            <div className="flex items-center justify-center text-center">
              <p className="text-lg">{name}</p>
            </div>
          </div>
          <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-1 bg-white dark:bg-zinc-800 border rounded-sm">
            <button>
              <ActionTooltip label="Edit">
                <PencilSquareIcon className="w-6 h-6 mr-1" />
              </ActionTooltip>
            </button>
            <button>
              <ActionTooltip label="Delete">
                <TrashIcon className="w-6 h-6" />
              </ActionTooltip>
            </button>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="w-80">
        <div className="flex flex-col">
          <p>
            <span className="font-semibold">{description}</span>
          </p>
          <div className="grid grid-cols-2">
            <div className="flex gap-2">
              <div className="min-w-4 mx-2 border-pink-600 border rounded-full aspect-square bg-pink-700" />
            </div>
            <div className="flex gap-2">
              <div className="min-w-4 mx-2 border-indigo-600 border rounded-full aspect-square bg-indigo-700" />
            </div>
            <div className="flex gap-2">
              <div className="min-w-4 mx-2 border-cyan-600 border rounded-full aspect-square bg-cyan-700" />
            </div>
            <div className="flex gap-2">
              <div className="min-w-4 mx-2 border-yellow-600 border rounded-full aspect-square bg-yellow-700" />
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HouseholdHoverCard;
