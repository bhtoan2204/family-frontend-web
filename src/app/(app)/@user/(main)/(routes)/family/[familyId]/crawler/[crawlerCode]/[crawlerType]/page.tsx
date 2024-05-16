import { GetNews } from "@/actions/rss-crawler-actions";
import { auth } from "@/auth";
import NewsPagination from "@/components/user/crawler/news-pagination";
import NewsSubContent from "@/components/user/crawler/news-sub-content";
import NewsSubHeader from "@/components/user/crawler/news-sub-header";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

interface NewsCategoryPageProps {
  params: {
    familyId: string;
    crawlerCode: string;
    crawlerType: string;
  };
}

const NewsCategoryPage = async ({ params }: NewsCategoryPageProps) => {
  const session = await auth();
  if (!session?.accessToken) {
    return redirect("/signin");
  }

  const news = await GetNews(
    session.accessToken,
    params.crawlerType,
    "1",
    "20"
  );

  if (!params.crawlerType) {
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
        <NewsSubHeader
          familyId={params.familyId}
          crawlerCode={params.crawlerCode}
          crawlerType={params.crawlerType}
        />
        <NewsSubContent news={news} />
        <NewsPagination />
      </div>
    );
  }
};

export default NewsCategoryPage;
