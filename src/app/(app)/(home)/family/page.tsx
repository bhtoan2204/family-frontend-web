"use client";

import { GetAllFamilies } from "@/actions/family-actions";
import Loader from "@/components/loader";
import { buttonVariants } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Family } from "@/types/family";
import { TriangleAlert } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FamilySetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onOpen } = useModal();
  const { data: session } = useSession();
  const [families, setFamilies] = useState<Family[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!session?.accessToken) return router.push("/signin");
    else {
      const getFamilies = async () => {
        setIsLoading(true);
        const family: Family[] = await GetAllFamilies(session.accessToken);
        setFamilies(family);
        setIsLoading(false);
      };
      getFamilies();
    }
  }, [session, router]);

  if (isLoading) {
    return <Loader />;
  } else if (families.length > 0 && !isLoading) {
    return router.push(`/family/${families[0].id_family}/chat`);
  } else if (families.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full gap-10">
        <TriangleAlert className="text-rose-500" size={100} />
        <h1 className="font-semibold text-2xl text-center max-lg:text-xl max-md:text-lg max-sm:text-sm">
          You have not join any family yet. Please join a family to get started.
        </h1>
        <div className="">
          <button
            className={buttonVariants({
              variant: "primary",
              size: "lg",
            })}
            onClick={() => onOpen("createFamily")}
          >
            Join Family
          </button>
        </div>
      </div>
    );
  }
};

export default FamilySetup;
