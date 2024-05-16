import MobileToggle from "@/components/mobile-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import NewsCategoriesToggle from "@/components/user/crawler/news-categories-toggle";
import { NewsCategories } from "@/util/news-caterories";
import { redirect } from "next/navigation";

interface NewsSubHeaderProps {
  familyId: string;
  crawlerCode: string;
  crawlerType: string;
}

const NewsSubHeader = ({
  familyId,
  crawlerCode,
  crawlerType,
}: NewsSubHeaderProps) => {
  if (crawlerCode) {
    return (
      <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
        <MobileToggle familyId={familyId} />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/family/${familyId}/crawler/home`}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/family/${familyId}/crawler/home/${crawlerType}`}
              >
                {
                  NewsCategories.find(
                    (category) => category.url === `/${crawlerType}`
                  )!.title
                }
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center">
          <NewsCategoriesToggle familyId={familyId} />
        </div>
      </div>
    );
  } else {
    return redirect(`/family/${familyId}/crawler/home`);
  }
};

export default NewsSubHeader;
