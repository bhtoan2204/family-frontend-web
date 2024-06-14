"use server";

import RSSandCrawlerURL from "@/services/url/rss-crawler-url";
import { News } from "@/types/news";

export const GetNews = async (
  token: string,
  type: string,
  page: string,
  itemsPerPage: string
) => {
  try {
    const response = await fetch(
      `${RSSandCrawlerURL.news}?type=${type}&page=${page}&itemsPerPage=${itemsPerPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return {
      news: data.items as News[],
      total: data.totalItems as number,
    };
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const GetLocalBankInterest = async (token: string) => {
  try {
    const response = await fetch(RSSandCrawlerURL.localBankInterest, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Internal Error!" };
  }
};
