import { auth } from "@/auth";
import NewsCardList from "@/components/user/crawler/news-card-list";
import NewsMenu from "@/components/user/crawler/news-menu";

interface NewsCategoryPageProps {
  params: {
    category: string;
  };
  searchParams: {
    page: number;
  };
}

const NewsCategoryPage = async ({
  params,
  searchParams,
}: NewsCategoryPageProps) => {
  const session = await auth();
  const page = searchParams.page || 1;
  return (
    <div className="mb-5">
      <h1 className="bg-blue-500 text-white py-[5px] px-[10px] text-center capitalize">
        {params.category}
      </h1>
      <div className="flex gap-12.5">
        <NewsCardList
          page={page}
          cat={params.category}
          token={session!.accessToken}
        />
        <NewsMenu token={session!.accessToken} />
      </div>
    </div>
  );
};

export default NewsCategoryPage;
