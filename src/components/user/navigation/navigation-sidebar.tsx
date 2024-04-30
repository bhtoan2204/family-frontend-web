import { GetAllFamilies } from "@/actions/family-actions";
import { auth } from "@/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ModeToggle from "@/components/user/mode-togger";
import { NavigationItem } from "@/components/user/navigation";
import NavigationAction from "@/components/user/navigation/navigation-action";
import { Family } from "@/types/family";
import { redirect } from "next/navigation";

const NavigationSidebar = async () => {
  const session = await auth();
  if (!session?.accessToken) return redirect("/login");

  const families: Family[] = await GetAllFamilies(session.accessToken);
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {families.map((family) => (
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
      </div>
    </div>
  );
};

export default NavigationSidebar;
