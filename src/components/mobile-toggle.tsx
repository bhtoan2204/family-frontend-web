import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import FamilySidebar from "@/components/user/family/family-sidebar";
import NavigationSidebar from "@/components/user/navigation";
import { Menu } from "lucide-react";

const MobileToggle = ({ familyId }: { familyId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>
        <FamilySidebar familyId={familyId} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileToggle;
