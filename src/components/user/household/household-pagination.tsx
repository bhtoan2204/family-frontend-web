"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface HouseholdPaginationProps {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const HouseholdPagination = ({
  page,
  hasPrev,
  hasNext,
} :HouseholdPaginationProps) => {
  return (
    <div className="p-4 flex flex-row gap-4">
      <button className="p-1 flex items-center justify-center bg-sky-400 hover:bg-sky-600 rounded-sm cursor-pointer disabled:bg-sky-800 disabled:cursor-not-allowed">
        <ChevronLeftIcon className="h-4 w-4 text-white" />
      </button>
      <button className="p-1 flex items-center justify-center bg-sky-400 hover:bg-sky-600 rounded-sm cursor-pointer disabled:bg-sky-800 disabled:cursor-not-allowed">
        <ChevronRightIcon className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}
 
export default HouseholdPagination;