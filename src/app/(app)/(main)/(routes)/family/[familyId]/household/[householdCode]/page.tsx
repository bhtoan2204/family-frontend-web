import {
  GetHouseholdCategory,
  GetHouseholdItem,
} from "@/actions/household-actions";
import { GetAllRooms } from "@/actions/room-actions";
import { auth } from "@/auth";
import HouseholdContent from "@/components/user/household/household-content";
import HouseholdHeader from "@/components/user/household/household-header";
import { Loader2 } from "lucide-react";

interface HouseholdPageProps {
  params: {
    familyId: string;
    educationCode: string;
  };
}

const HouseholdPage = async ({ params }: HouseholdPageProps) => {
  const session = await auth();
  const rooms = await GetAllRooms(
    session!.accessToken,
    Number(params.familyId)
  );
  const householdCategory = await GetHouseholdCategory(session!.accessToken);
  const householdItems = await GetHouseholdItem(
    session!.accessToken,
    Number(params.familyId),
    "1",
    "10"
  );
  console.log(rooms, householdCategory, householdItems)
  if (!rooms || !householdCategory || !householdItems) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-10 w-10 text-blue-500 dark:text-blue-300" />
      </div>
    );
  } else {
    return (
      <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
        <HouseholdHeader familyId={params.familyId} />
        <HouseholdContent
          rooms={rooms}
          householdCategory={householdCategory}
          householdItems={householdItems}
        />
      </div>
    );
  }
};

export default HouseholdPage;
