"use client";

import { GetNews } from "@/actions/rss-crawler-actions";
import { News } from "@/types/news";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NewsMenuPostProps {
  withImage: boolean;
  category: string;
  token: string;
}

const NewsMenuPosts = ({ withImage, category, token }: NewsMenuPostProps) => {
  const [newsRes, setNewsRes] = useState<{ news: News[]; total: number }>({
    news: [],
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      const news = await GetNews(token, category, "1", "4");
      if (!news) {
        setIsLoading(false);
        return;
      }
      setNewsRes(news);
      setIsLoading(false);
    };
    fetchNews();
  }, [category, token]);

  if (
    (!isLoading && newsRes.news && newsRes.news.length === 0) ||
    newsRes.news === undefined
  ) {
    return (
      <div className="mt-[35px] mb-15 flex flex-col gap-[35px]">
        <h3 className="text-lg font-medium text-[#626262] dark:text-[#a6a6a6]">
          No news found
        </h3>
      </div>
    );
  } else if (!isLoading && newsRes.news && newsRes.news.length > 0) {
    return (
      <div className="mt-[35px] mb-15 flex flex-col gap-[35px]">
        {newsRes.news.map((newsItem, index) => (
          <Link
            key={newsItem.guid}
            href={newsItem.link}
            target="_blank"
            className="flex items-center gap-5"
          >
            {withImage && (
              <div className="flex-1 aspect-square relative">
                <Image
                  src={newsItem.enclosure.url}
                  alt=""
                  fill
                  className="rounded-[50%] border-[3px] border-solid border-gray-300 object-cover"
                />
              </div>
            )}
            <div className="flex-[4] flex flex-col gap-[5px]">
              <h3 className="text-lg font-medium text-[#626262] dark:text-[#a6a6a6] hover:text-sky-400 dark:hover:text-sky-600">
                {newsItem.title}
              </h3>
              <div className="text-xs">
                <span className="">{newsItem.contentSnippet}</span>
                <span className="text-gray-500">
                  {" "}
                  - {format(new Date(newsItem.pubDate), "MMM dd, yyyy")}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  } else {
    return <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />;
  }
};

export default NewsMenuPosts;
