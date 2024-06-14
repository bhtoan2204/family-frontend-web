"use client";

import { PopularCategories } from "@/util/app-news-categories";
import Link from "next/link";
import styles from "./app-news-categories.module.css";

const NewsCategoryList = () => {
  return (
    <div>
      <h1 className="my-12.5 mx-0 text-3xl">Popular Categories</h1>
      <div className="flex flex-wrap justify-between gap-5">
        {PopularCategories.map((category, index) => (
          <Link
            key={category.title}
            href={`/news/${category.slug}`}
            className={`flex items-center gap-2.5 capitalize w-[15%] max-xl:w-[20%] max-lg:w-[25%] max-md:w-[45%] max-sm:w-[100%] h-20 justify-center rounded-xl hover:font-semibold ${
              styles[category.slug]
            }`}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewsCategoryList;
