"use client";

import { News } from "@/types/news";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";

interface NewsTrendingPostProps {
  news: News;
  index: number;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  console.log(date, dateString);
  return formatDistanceToNow(date, { addSuffix: true, locale: vi });
}

const NewsTrendingPost = ({ news, index }: NewsTrendingPostProps) => {
  return (
    <li className="block last:border-b-0">
      <Link
        className="block p-5 border-b-[1px] border-solid border-black/10 relative overflow-hidden hover:bg-zinc-200/50 dark:hover:bg-zinc-700"
        href={news.link}
        target="_blank"
      >
        <span className="absolute -z-1 text-xl -left-2.5 -top-5 font-bold text-black/5">
          {index + 1}
        </span>
        <h3 className="text-2.5 text-black dark:text-white mb-2 font-bold">
          {news.title}
        </h3>
        <span className="text-black/50 text-xs text-right dark:text-white/50 font-semibold">
          {formatDate(news.isoDate)}
        </span>
      </Link>
    </li>
  );
};

export default NewsTrendingPost;
