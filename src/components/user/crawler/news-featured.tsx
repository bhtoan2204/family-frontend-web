"use client";

import { News } from "@/types/news";
import Image from "next/image";
import Link from "next/link";

interface NewsPageProps {
  news: News;
}

const NewsFeatured = ({ news }: NewsPageProps) => {
  return (
    <div className="mt-7.5">
      <h1 className="text-8xl font-light">
        <b>FamFund.</b> Discover the latest news and updates.
      </h1>
      <div className="mt-15 flex items-center gap-12.5">
        {news.enclosure && (
          <div className="flex-1 h-125 relative max-lg:hidden">
            <Image
              src={news.enclosure.url}
              alt={news.title}
              className="object-cover"
              fill
            />
          </div>
        )}
        <div className="flex-1 flex flex-col gap-5">
          <h1 className="text-4xl max-xl:text-7xl max-lg:text-6xl max-md:text-5xl max-sm:text-4xl">
            {news.title}
          </h1>
          <p className="text-xl font-light text-[#626262] dark:text-[#a6a6a6]">
            {news.contentSnippet}
          </p>
          <Link
            href={news.link}
            target="_blank"
            className="py-4 px-5 border-none rounded-sm w-max bg-gray-300 hover:font-semibold dark:bg-gray-500 dark:text-[#ddd] hover:bg-gray-400 hover:text-black transition-colors duration-100 cursor-pointer"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsFeatured;
