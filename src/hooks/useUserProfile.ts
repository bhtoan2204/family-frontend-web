"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { usePathname } from "next/navigation";
import { RootState, useAppDispatch } from "@/redux/store";
import {
  fetchUserProfile,
  fetchUserProfileActions,
} from "@/redux/user/userProfile/userProfileSlice";

const useUserProfile = (accessToken: string) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const userProfile = useSelector((state: RootState) => state.userProfile);

  const pathName = usePathname();

  useEffect(() => {
    if (!accessToken) {
      dispatch(fetchUserProfileActions.setError("Access token is not found"));
    } else {
      const fetchUserData = async () => {
        try {
          dispatch(fetchUserProfile({ accessToken: accessToken }));
          // dispatch(fetchAllFamily({ accessToken: accessToken }));
        } catch (error) {
          console.error("Error fetching user data:", error);
          sessionStorage.setItem("redirect", pathName);
          router.push("/login");
        }
      };

      fetchUserData();
    }
  }, [accessToken, router, pathName, dispatch]);

  return { userProfile };
};

export default useUserProfile;
