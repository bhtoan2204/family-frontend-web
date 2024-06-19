"use client";

import { CheckIfUserIsInFamily } from "@/actions/family-actions";
import Loader from "@/components/loader";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FamilyPageProps {
  params: {
    familyId: string;
  };
}

const FamilyPage = () => {
  const { data: session } = useSession();
  const params = useParams();
  const [isMember, setIsMember] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!session?.accessToken) {
      router.push("/signin");
    } else {
      const fetchData = async () => {
        setIsLoading(true);
        await CheckIfUserIsInFamily(
          session.accessToken,
          session.user.id,
          params!.familyId as string
        )
          .then((data) => {
            setIsMember(data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            return router.push("/family");
          });
        fetchData();
      };
    }
  }, [params, session?.accessToken, router, session?.user.id]);

  if (isLoading) {
    return <Loader />;
  } else if (!isLoading && !isMember) {
    return router.push("/family");
  } else {
    return router.push(`/family/${params!.familyId}/chat`);
  }
};

export default FamilyPage;
