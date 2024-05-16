import { cn } from "@/lib/utils";
import { News } from "@/types/news";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface NewsPostItemOneProps {
  large: boolean;
  news: News;
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";

const NewsPostItemOne = ({ large, news }: NewsPostItemOneProps) => {
  return (
    <div className={cn("mb-7.5", large ? "text-2xl leading-tight" : null)}>
      <Link href={news.link} target="_blank">
        <Image
          src={news.enclosure.url}
          width={800}
          height={500}
          alt=""
          className="mb-7.5 img-fluid"
        />
      </Link>
      <div className="text-sm tracking-wider uppercase font-bold text-black/40 dark:text-zinc-500 mb-2.5">
        <span>{format(new Date(news.isoDate), DATE_FORMAT)}</span>
      </div>
      <h2
        className={cn(
          "mb-5 text-xl font-medium",
          large ? "leading-none" : "leading-tight",
          large && "text-2xl"
        )}
      >
        <Link className="text-black dark:text-white" href={news.link}>
          {news.title}
        </Link>
      </h2>
    </div>
  );
};

export default NewsPostItemOne;
