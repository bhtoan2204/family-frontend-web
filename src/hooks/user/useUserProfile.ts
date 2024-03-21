import { UserProfile } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetUserProfile = (accessToken: string | null) => {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const handleFetchUserProfile = async () => {
      try {
        if (!accessToken) {
          setError("Access token is null");
          throw new Error("Access token is null");
        }
        const response = await axios.get("/api/user/userprofile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserProfile(response.data.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        console.log(error);
      }
    };
    if (accessToken) {
      handleFetchUserProfile();
    }
  }, [accessToken]);
  return { userProfile, loading, error };
};

export default useGetUserProfile;
