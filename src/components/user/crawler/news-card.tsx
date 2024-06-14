"use client"

import { News } from "@/types/news";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  news: News;
}

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <div className="mb-12.5 flex items-center gap-12.5">
      {news.enclosure && (
        <div className="flex-1 h-[350px] relative max-xl:hidden">
          <Image
            src={news.enclosure.url}
            alt={news.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex-1 flex flex-col gap-7.5">
        <div className="">
          <span className="text-gray-500">
            {format(new Date(news.isoDate), "d MMM yyyy, HH:mm")}
          </span>
        </div>
        <Link href={news.link} target="_blank" className="hover:font-semibold">
          <h1>{news.title}</h1>
        </Link>
        <div className="text-lg font-light text-[#626262] dark:text-[#a6a6a6]">
          {news.contentSnippet}
        </div>
        <Link
          href={news.link}
          target="_blank"
          className="border-b-[1px] border-solid border-rose-600 w-max py-[2px] px-0 hover:border-b-[3px]"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
