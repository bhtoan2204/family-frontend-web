"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";

interface HouseholdHoverCardProps {
  item_id: number;
  familyId: number;
  token: string;
  name: string;
  image: string | null;
}

const HouseholdHoverCard = ({
  item_id,
  familyId,
  token,
  name,
  image,
}: HouseholdHoverCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger
        asChild
        className="bg-white dark:bg-[#313338] rounded-lg shadow-lg p-5 relative cursor-pointer hover:shadow-xl "
      >
        <div className="">
          <div className="flex flex-col items-center">
            {image && (
              <Image
                src={image}
                alt={name}
                width={100}
                height={100}
                className="rounded-full"
              />
            )}
            <div className="flex items-center justify-center">
              <p className="text-lg">{name}</p>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent></HoverCardContent>
    </HoverCard>
  );
};

export default HouseholdHoverCard;
