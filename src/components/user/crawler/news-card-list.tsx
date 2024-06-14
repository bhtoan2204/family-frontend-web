"use client";

import { GetNews } from "@/actions/rss-crawler-actions";
import { News } from "@/types/news";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import NewsCard from "./news-card";
import NewsPagination from "./pagination/news-pagination";

interface NewsCardListProps {
  page: number;
  cat: string | null;
  token: string;
}

const NewsCardList = ({ page, cat, token }: NewsCardListProps) => {
  const [newsRes, setNewsRes] = useState<{ news: News[]; total: number }>({
    news: [],
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!page) {
    page = 1;
  }
  if (!cat) {
    cat = "newest";
  }

  useEffect(() => {
    if (token && cat && page) {
      const fetchNews = async () => {
        setIsLoading(true);
        const news = await GetNews(token, cat, page.toString(), "5");
        setNewsRes(news);
        setIsLoading(false);
      };
      fetchNews();
    }
  }, [cat, page, token]);

  const POST_PER_PAGE = 5;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < newsRes.total;

  if (
    (!isLoading && newsRes.news && newsRes.news.length === 0) ||
    newsRes.news === undefined
  ) {
    return (
      <div className="flex-[5]">
        <h1 className="my-12.5 mx-0 text-3xl">Recent Posts</h1>
        <div>
          <h1 className="text-2xl mb-12.5">No news found</h1>
        </div>
        <NewsPagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
      </div>
    );
  } else if (!isLoading && newsRes.news.length > 0) {
    return (
      <div className="flex-[5]">
        <h1 className="my-12.5 mx-0 text-3xl">Recent Posts</h1>
        <div>
          {newsRes.news.map((newsItem) => (
            <NewsCard news={newsItem} key={newsItem.guid} />
          ))}
        </div>
        <NewsPagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
      </div>
    );
  } else {
    return <Loader2 className="w-7 h-7 text-zinc-500 animate-spin my-4" />;
  }
};

export default NewsCardList;
