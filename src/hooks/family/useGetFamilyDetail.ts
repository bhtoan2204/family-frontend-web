import { FamilyDetail } from "@/types/familyDetail";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetFamilyDetail = (accessToken: string | null, familyId: number) => {
  const [familyDetail, setFamilyDetail] = useState<FamilyDetail>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const handleFetchFamilies = async () => {
      try {
        const response = await axios.get(
          "/api/family/detail?id_family=" + familyId.toString(),
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setFamilyDetail(response.data.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        console.log(error);
      }
    };
    if (accessToken) {
      handleFetchFamilies();
    }
  }, [accessToken, familyId]);
  return { familyDetail, loading, error };
};

export default useGetFamilyDetail;
