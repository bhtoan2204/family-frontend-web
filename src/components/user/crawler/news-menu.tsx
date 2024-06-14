"use client";

import NewsMenuCategory from "@/components/user/crawler/news-menu-categories";
import NewsMenuPosts from "@/components/user/crawler/news-menu-posts";

interface NewsMenuProps {
  token: string;
}

const NewsMenu = ({ token }: NewsMenuProps) => {
  return (
    <div className="flex-[2] mt-15 max-lg:hidden">
      <h2 className="text-gray-500 text-lg font-normal">{"What's hot"}</h2>
      <h1 className="text-3xl">Most Popular</h1>
      <NewsMenuPosts withImage={false} category="mostviewed" token={token} />
      <h2 className="text-gray-500 text-lg font-normal">Discover by Topic</h2>
      <h1 className="text-3xl">Categories</h1>
      <NewsMenuCategory />
      <h2 className="text-gray-500 text-lg font-normal">Discover World News</h2>
      <h1 className="text-3xl">World</h1>
      <NewsMenuPosts withImage={true} category="world" token={token} />
    </div>
  );
};

export default NewsMenu;
