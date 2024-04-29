import { baseUrl } from "@/services/url";

const RSSandCrawlerURL = {
  news: `${baseUrl}/api/v1/crawler/news`,
  localBankInterest: `${baseUrl}/api/v1/crawler/localBankInterest`,
};

export default RSSandCrawlerURL;
