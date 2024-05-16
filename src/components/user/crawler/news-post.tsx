"use client";

import NewsPostItemOne from "@/components/user/crawler/news-post-item-one";
import NewsTrendingPost from "@/components/user/crawler/news-trending-post";
import { News } from "@/types/news";

interface NewsPostProps {
  token: string;
  healthNews: News[];
  homeNews: News;
  businessNews: News[];
  trendingNews: News[];
}

const NewsPost = ({
  token,
  healthNews,
  homeNews,
  businessNews,
  trendingNews,
}: NewsPostProps) => {
  return (
    <section className="pt-5">
      <div className="container" data-aos="fade-up">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-start-1 col-span-4">
            <NewsPostItemOne large={true} news={homeNews} />
          </div>
          <div className="col-end-13 col-span-8">
            <div className="grid grid-cols-3 gap-5">
              <div className="col-start-1 col-span-1 px-5 border-l-2 dark:border-zinc-700/70 border-zinc-200/70">
                {healthNews &&
                  healthNews.length > 0 &&
                  healthNews.map((news) => (
                    <NewsPostItemOne
                      large={false}
                      key={news.guid}
                      news={news}
                    />
                  ))}
              </div>
              <div className="col-start-2 col-span-1 px-5 border-l-2  dark:border-zinc-700/70 border-zinc-200/70">
                {businessNews &&
                  businessNews.length > 0 &&
                  businessNews.map((news) => (
                    <NewsPostItemOne
                      large={false}
                      key={news.guid} 
                      news={news}
                    />
                  ))}
              </div>
              <div className="col-span-1 col-end-4">
                <div className="dark:border-zinc-700/70 border-zinc-200/70 border-[1px] p-0 m-0 block">
                  <h3 className="text-black dark:text-white p-5 border-b-[1px] border-solid border-black/10 font-bold text-lg">
                    Xu hướng
                  </h3>
                  <ul className="p-0 m-0 block">
                    {trendingNews &&
                      trendingNews.length > 0 &&
                      trendingNews.map((news, i) => (
                        <NewsTrendingPost
                          key={news.guid}
                          news={news}
                          index={i}
                        />
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsPost;
