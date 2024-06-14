"use client";

import { useRouter } from "next/navigation";

interface NewsPaginationProps {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
}

const NewsPagination = ({ page, hasPrev, hasNext }: NewsPaginationProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-between">
      <button
        className="w-25 border-none p-4 bg-rose-500 text-white cursor-pointer disabled:bg-rose-900 disabled:cursor-not-allowed hover:bg-rose-300 hover:font-semibold disabled:hover:bg-rose-900 disabled:hover:font-normal"
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${Number(page) - 1}`)}
      >
        Previous
      </button>
      <button
        className="w-25 border-none p-4 bg-rose-500 text-white cursor-pointer disabled:bg-rose-900 disabled:cursor-not-allowed hover:bg-rose-300 hover:font-semibold disabled:hover:bg-rose-900 disabled:hover:font-normal"
        disabled={!hasNext}
        onClick={() => router.push(`?page=${Number(page) + 1}`)}
      >
        Next
      </button>
    </div>
  );
};

export default NewsPagination;
