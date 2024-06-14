"use client";

import ActionTooltip from "@/components/user/action-tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface NavigationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const NavigationItem = ({ id, name, imageUrl }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/family/${id}`);
  };

  return (
    <ActionTooltip side="right" label={name} align="center">
      <button
        onClick={handleClick}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute right-0 bg-primary rounded-l-full transition-all w-[4px]",
            params?.familyId !== id && "group-hover:h-[20px]",
            params?.familyId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.familyId === id &&
              "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image fill src="/images/admin/user/user-01.png" alt="Family" />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
