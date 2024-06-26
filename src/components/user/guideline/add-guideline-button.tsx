"use client";

import { Plus } from "lucide-react";

const AddGuidelineButton = () => {
  return (
    <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-3">
      {/* <Plus className="h-5 w-5 dark:text-white text-black" />
      <span className="ml-2 dark:text-white text-black">Add Guideline</span> */}
    </button>
  );
};

export default AddGuidelineButton;
