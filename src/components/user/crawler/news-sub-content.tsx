"use client";

import NewsSubPost from "@/components/user/crawler/news-sub-post";
import { News } from "@/types/news";

interface NewsSubContentProps {
  news: News[];
}

const NewsSubContent = ({ news }: NewsSubContentProps) => {
  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 pt-5 gap-10">
          {news &&
            news.length > 0 &&
            news.map((n) => <NewsSubPost news={n} key={n.guid} />)}
        </div>
      </div>
    </div>
  );
};

export default NewsSubContent;
