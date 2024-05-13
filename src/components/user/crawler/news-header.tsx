"use client";

import MobileToggle from "@/components/mobile-toggle";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NewsCategoriesToggle from "@/components/user/crawler/news-categories-toggle";
import { NewsCategories } from "@/util/news-caterories";
import { useRouter } from "next/navigation";

interface NewsHeaderProps {
  familyId: string;
}

const NewsHeader = ({ familyId }: NewsHeaderProps) => {
  const router = useRouter();
  const onCilck = (url: string) => {
    router.push(`/family/${familyId}/crawler/main${url}`);
  };

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
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {NewsCategories.map((category, id) => {
                  return (
                    <DropdownMenuItem
                      onClick={() => onCilck(category.url)}
                      key={category.title}
                    >
                      {category.title}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center">
        <NewsCategoriesToggle familyId={familyId} />
      </div>
    </div>
  );
};

export default NewsHeader;
