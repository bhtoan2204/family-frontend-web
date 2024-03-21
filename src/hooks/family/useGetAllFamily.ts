import { Family } from "@/types/family";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetAllFamily = (accessToken: string | null) => {
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const handleFetchFamilies = async () => {
      try {
        if (!accessToken) {
          setError("Access token is null");
          throw new Error("Access token is null");
        }
        const response = await axios.get("/api/family/get-all", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setFamilies(response.data.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        console.log(error);
      }
    };
    if (accessToken) {
      handleFetchFamilies();
    }
  }, [accessToken]);
  return { families, loading, error };
};

export default useGetAllFamily;
