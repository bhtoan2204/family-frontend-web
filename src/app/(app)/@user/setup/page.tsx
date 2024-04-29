"use client";

import { FamilyActions } from "@/actions/family-actions";
import InitialModal from "@/components/modals/initial-modal";
import { Family } from "@/types/family";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const SetupPage = () => {
  const { data: session } = useSession();
  const [families, setFamilies] = useState<Family[]>([]);

  useEffect(() => {
    const getFamilies = async () => {
      if (session?.accessToken) {
        const family: Family[] = await FamilyActions.GetAllFamilies(
          session.accessToken
        );
        setFamilies(family);
      }
    };
    getFamilies();
  }, [session?.accessToken]);

  if (families.length > 0) {
    return redirect(`/family/${families[0].id_family}`);
  }

  return <InitialModal />;
};

export default SetupPage;
