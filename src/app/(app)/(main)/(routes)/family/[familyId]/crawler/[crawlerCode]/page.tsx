import { GetNews } from "@/actions/rss-crawler-actions";
import { auth } from "@/auth";
import NewsContent from "@/components/user/crawler/news-content";
import NewsHeader from "@/components/user/crawler/news-header";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

interface NewsPageProps {
  params: {
    familyId: string;
    crawlerCode: string;
  };
}

const NewsPage = async ({ params }: NewsPageProps) => {
  const session = await auth();
  if (!session?.accessToken) {
    return redirect("/signin");
  }

  const trendingNews = await GetNews(session.accessToken, "home", "1", "4");

  const latestNews = await GetNews(session.accessToken, "newest", "1", "4");

  const healthNews = await GetNews(session.accessToken, "health", "1", "4");

  const homeNews = await GetNews(session.accessToken, "news", "1", "1");

  const businessNews = await GetNews(session.accessToken, "business", "1", "4");

  console.log(params);

  if (
    !latestNews ||
    !healthNews ||
    !homeNews ||
    !businessNews ||
    !trendingNews
  ) {
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
      <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
        <NewsHeader familyId={params.familyId} />
        <NewsContent
          token={session.accessToken}
          latestNews={latestNews}
          healthNews={healthNews}
          homeNews={homeNews[0]}
          businessNews={businessNews}
          tredingNews={trendingNews}
        />
      </div>
    );
  }
};

export default NewsPage;
