import { GetNews } from "@/actions/rss-crawler-actions";
import { auth } from "@/auth";
import NewsCardList from "@/components/user/crawler/news-card-list";
import NewsCategoryList from "@/components/user/crawler/news-category-list";
import NewsFeatured from "@/components/user/crawler/news-featured";
import NewsMenu from "@/components/user/crawler/news-menu";

interface NewsPageProps {
  params: any;
  searchParams: {
    page: number;
    cat: string;
  };
}

const NewsPage = async ({ params, searchParams }: NewsPageProps) => {
  const session = await auth();
  const page = searchParams.page || 1;

  const homeNews = await GetNews(session!.accessToken, "home", "1", "1");
  if (!homeNews.news || (homeNews.news && homeNews.news.length === 0)) {
    return (
      <div className="mb-5">
        <NewsCategoryList />
        <div className="flex gap-12.5">
          <NewsCardList
            page={page}
            cat={searchParams.cat}
            token={session!.accessToken}
          />
          <NewsMenu token={session!.accessToken} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="mb-5">
        <NewsFeatured news={homeNews.news[0]} />
        <NewsCategoryList />
        <div className="flex gap-12.5">
          <NewsCardList
            page={page}
            cat={searchParams.cat}
            token={session!.accessToken}
          />
          <NewsMenu token={session!.accessToken} />
        </div>
      </div>
    );
  }
};

export default NewsPage;
