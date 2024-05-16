"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { News } from "@/types/news";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

interface NewsSubContentProps {
  news: News;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  console.log(date, dateString);
  return formatDistanceToNow(date, { addSuffix: true, locale: vi });
}

const NewsSubPost = ({ news }: NewsSubContentProps) => {
  return (
    <Link href={news.link} target="_blank">
      <Card className="bg-white dark:dark:bg-[#313338]/100">
        <CardHeader>
          <CardDescription>
            <Image
              src={news.enclosure.url}
              alt={news.title}
              width={800}
              height={500}
            />
          </CardDescription>
        </CardHeader>
        <CardContent>{news.title}</CardContent>
        <CardFooter className="text-end">{formatDate(news.isoDate)}</CardFooter>
      </Card>
    </Link>
  );
};

export default NewsSubPost;
