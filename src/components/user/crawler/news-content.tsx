"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import NewsHero from "@/components/user/crawler/news-hero";
import NewsPost from "@/components/user/crawler/news-post";
import { News } from "@/types/news";
import AOS from "aos";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

interface NewsContentProps {
  token: string;
  latestNews: News[];
  tredingNews: News[];
  healthNews: News[];
  businessNews: News[];
  homeNews: News;
}

const NewsContent = ({
  token,
  latestNews,
  tredingNews,
  healthNews,
  homeNews,
  businessNews,
}: NewsContentProps) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: false,
    });
  }, []);

  if (latestNews.length === 0) {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="w-7 h-7 tex-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading news...
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <NewsHero news={latestNews} />
        <NewsPost
          token={token}
          businessNews={businessNews}
          healthNews={healthNews}
          homeNews={homeNews}
          trendingNews={tredingNews}
        />
      </div>
    );
  }
};

export default NewsContent;
