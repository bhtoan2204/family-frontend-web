"use client";

import { GetHouseholdItem } from "@/actions/household-actions";
import Loader from "@/components/loader";
import { HouseholdItem } from "@/types/household";
import { useEffect, useState } from "react";
import HouseholdHoverCard from "./hover-card/household-hover-card";

interface HouseholdContentProps {
  page: string;
  token: string;
  familyId: number;
}

const HouseholdContent = ({ page, token, familyId }: HouseholdContentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [householdItems, setHouseholdItems] = useState<HouseholdItem[]>([]);

  useEffect(() => {
    if (familyId && token) {
      const fetchHouseholdItems = async () => {
        setIsLoading(true);
        const householdItemsRes = await GetHouseholdItem(
          token,
          familyId,
          page,
          "9"
        );
        setHouseholdItems(householdItemsRes);
        setIsLoading(false);
      };
      fetchHouseholdItems();
    }
  }, [familyId, token, page]);

  if (!isLoading && householdItems && householdItems.length === 0) {
    return (
      <div className="flex-[5]">
        <h1 className="my-12.5 mx-0 text-3xl">Household Items</h1>
        <div>
          <h1 className="text-2xl mb-12.5">No items found</h1>
        </div>
      </div>
    );
  } else if (!isLoading && householdItems && householdItems.length > 0) {
    return (
      <div className="flex flex-col w-full flex-grow h-full">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {householdItems.map((item) => (
            <HouseholdHoverCard
              key={item.id_household_item}
              item_id={item.id_household_item}
              name={item.item_name}
              image={item.item_imageurl}
              familyId={familyId}
              token={token}
              description={item.item_description}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default HouseholdContent;
