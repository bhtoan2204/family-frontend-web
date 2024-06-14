"use client";

import { GetAllFamilies } from "@/actions/family-actions";
import Loader from "@/components/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ModeToggle from "@/components/user/mode-togger";
import { NavigationItem } from "@/components/user/navigation";
import NavigationAction from "@/components/user/navigation/navigation-action";
import UserItem from "@/components/user/navigation/user-item";
import { Family } from "@/types/family";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const NavigationSidebar = () => {
  const { data: session } = useSession();
  const [families, setFamilies] = useState<Family[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFamilies = async () => {
      setIsLoading(true);
      const familiesRes: Family[] = await GetAllFamilies(session!.accessToken);
      setFamilies(familiesRes);
      setIsLoading(false);
    };
    if (session) {
      fetchFamilies();
    }
  }, [session]);

  if (!isLoading && session && families && families.length === 0) {
    return (
      <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-neutral-900 bg-white py-3 shadow shadow-neutral-600">
        <NavigationAction />
        <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
        <div className="flex-1 w-full"></div>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
          <ModeToggle />
          <UserItem {...session} />
        </div>
      </div>
    );
  } else if (!isLoading && session && families && families.length > 0) {
    return (
      <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-neutral-900 bg-white py-3 shadow shadow-neutral-600">
        <NavigationAction />
        <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
        <ScrollArea className="flex-1 w-full">
          {families?.map((family) => (
            <div key={family.name} className="mb-4">
              <NavigationItem
                id={family.id_family.toString()}
                name={family.name}
                imageUrl={family.avatar}
              />
            </div>
          ))}
        </ScrollArea>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
          <ModeToggle />
          <UserItem {...session} />
        </div>
      </div>
    );
  } else {
    return <Loader height="h-8" width="w-8" />;
  }
};

export default NavigationSidebar;
