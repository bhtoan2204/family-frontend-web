"use client";

import HouseholdContent from "@/components/user/household/household-content";
import HouseholdPagination from "@/components/user/household/household-pagination";
import RoomSidebar from "@/components/user/household/sidebar/room-sidebar";
import { useModal } from "@/hooks/use-modal-store";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

// interface HouseholdPageProps {
//   params: {
//     familyId: string;
//   };
//   searchParams: {
//     page: number;
//   };
// }

const HouseholdPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { onOpen } = useModal();
  const [hasPrev, setHasPrev] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<boolean>(false);
  const page = Number(searchParams!.get("page")) || 1;

  const POST_PER_PAGE = 5;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <div className="h-full pr-70">
        <div className="fixed w-full z-20">
          <div className="h-15 flex flex-row gap-4 bg-white dark:bg-[#313338] shadow shadow-neutral-600">
            <HouseholdPagination
              page={page}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />
            <button
              className="flex items-center justify-center my-4 p-3 rounded-md hover:bg-green-600 bg-green-400"
              onClick={() => {
                onOpen("createHouseholdItem");
              }}
            >
              <p className="text-white">Add household</p>
            </button>
          </div>
        </div>
        <div className="flex flex-1 m-5 pt-15 items-center justify-center">
          <HouseholdContent
            familyId={Number(params!.familyId)}
            page={page.toString()}
            token={session?.accessToken!}
          />
        </div>
      </div>
      <div className="flex h-full w-70 flex-col fixed right-[72px]">
        <RoomSidebar familyId={params!.familyId as string} />
      </div>
    </div>
  );
};

export default HouseholdPage;
