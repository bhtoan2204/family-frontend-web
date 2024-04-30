"use server";

import RSSandCrawlerURL from "@/services/url/rss-crawler-url";

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
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
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
    return { error: "Something wrong!" };
  }
};
