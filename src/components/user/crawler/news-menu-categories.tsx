"use client";

import { AllCategories } from "@/util/app-news-categories";
import Link from "next/link";
import styles from "./app-news-categories.module.css";

const NewsMenuCategory = () => {
  return (
    <div className="mt-[35px] mb-15 flex flex-wrap gap-5">
      {AllCategories.map((category, index) => (
        <Link
          key={category.title}
          href={`/news/${category.slug}`}
          className={`py-[10px] px-[25px] rounded-[10px] text-[14px] hover:font-semibold ${
            styles[category.slug]
          }`}
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
};

export default NewsMenuCategory;
