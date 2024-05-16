"use client";

import { ChartThree } from "@/components/charts";
import TopPayTable from "@/components/table/top-pay-table";

const Control = () => {
  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <ChartThree />
      <div className="col-span-12 xl:col-span-8">
        <TopPayTable />
      </div>
    </div>
  );
};

export default Control;
