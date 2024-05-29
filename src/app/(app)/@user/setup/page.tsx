"use client";

import { GetAllFamilies } from "@/actions/family-actions";
import Loader from "@/components/loader";
import InitialModal from "@/components/modals/initial-modal";
import { Family } from "@/types/family";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const SetupPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const [families, setFamilies] = useState<Family[]>([]);

  useEffect(() => {
    const getFamilies = async () => {
      const family: Family[] = await GetAllFamilies(session!.accessToken);
      setFamilies(family);
      setIsLoading(false);
    };

    getFamilies();
  }, [session]);

  if (families.length > 0 && !isLoading) {
    return redirect(`/family/${families[0].id_family}`);
  }
  if (families.length === 0 && !isLoading) {
    console.log(isLoading, families.length);
    return <InitialModal />;
  }
  return <Loader />;
};

export default SetupPage;
