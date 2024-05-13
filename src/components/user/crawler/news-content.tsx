"use client";

import { GetNews } from "@/actions/rss-crawler-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { News } from "@/types/news";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NewsContentProps {
  token: string;
}

import { useWindowSize } from "@/hooks/use-windows-size";
import { vi } from "date-fns/locale";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  console.log(date, dateString);
  return formatDistanceToNow(date, { addSuffix: true, locale: vi });
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";

const NewsContent = ({ token }: NewsContentProps) => {
  const [news, setNews] = useState<News[]>([]);
  const size = useWindowSize();

  useEffect(() => {
    const fetchNews = async () => {
      const responseNews = await GetNews(token, "newest", "1", "3");
      setNews(responseNews);
    };

    fetchNews();
  }, [token]);

  if (news.length === 0) {
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
      <div className="flex-1 flex py-4 overflow-y-auto">
        <div className="flex flex-col mt-auto p-4">
          <div className="text-lg gap-x-4 py-4">Latest News</div>
          <ResizablePanelGroup
            direction={
              size.width && size.width <= 1248 ? "vertical" : "horizontal"
            }
            className="space-x-4"
          >
            <ResizablePanel defaultSize={70}>
              <a href={news[0].link} target="_blank" rel="noopener noreferrer">
                <Card className="dark:bg-[#2B2D31] bg-[#F2F3F5] h-full">
                  <CardHeader className="flex items-center">
                    <Image
                      className="object-cover rounded-md"
                      width={800}
                      height={700}
                      quality={100}
                      src={news[0]?.enclosure?.url}
                      alt=""
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="pb-2">{news[0]?.title}</CardTitle>
                    <CardDescription>{news[0]?.contentSnippet}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    {formatDate(news[0].isoDate)}
                  </CardFooter>
                </Card>
              </a>
            </ResizablePanel>
            <ResizablePanel defaultSize={30}>
              <a href={news[1].link} target="_blank" rel="noopener noreferrer">
                <Card className="dark:bg-[#2B2D31] bg-[#F2F3F5] h-full">
                  <CardHeader className="flex items-center">
                    <Image
                      className="object-cover rounded-md"
                      width={800}
                      height={700}
                      quality={100}
                      src={news[1]?.enclosure?.url}
                      alt=""
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="pb-2">{news[1]?.title}</CardTitle>
                    <CardDescription>{news[1]?.contentSnippet}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    {formatDate(news[1].isoDate)}
                  </CardFooter>
                </Card>
              </a>
            </ResizablePanel>
          </ResizablePanelGroup>
          <div className="text-lg gap-x-4 py-4">Most Views</div>
        </div>
      </div>
    );
  }
};

export default NewsContent;
