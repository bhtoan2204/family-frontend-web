"use client";

import { GetAllFamilies } from "@/actions/family-actions";
import Loader from "@/components/loader";
import InitialModal from "@/components/modals/initial-modal";
import { Family } from "@/types/family";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SetupPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const [families, setFamilies] = useState<Family[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      // If there's no session, redirect to sign-in page
      router.replace("/signin");
      return;
    }

    const getFamilies = async () => {
      if (session?.accessToken) {
        const family: Family[] = await GetAllFamilies(session.accessToken);
        setFamilies(family);
        setIsLoading(false);
      }
    };
    getFamilies();
  }, [session, router]);

  useEffect(() => {
    if (!isLoading) {
      if (families.length > 0) {
        // Redirect to the family page if families are available
        router.replace(`/family/${families[0].id_family}`);
      }
    }
  }, [families, isLoading, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (families.length === 0 && !isLoading) {
    return <InitialModal />;
  }

  return null;
};

export default SetupPage;
