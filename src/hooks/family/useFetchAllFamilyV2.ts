"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
// Thay đổi đường dẫn tới các action của bạn
import LocalStorage from "@/store/local-storage/local-storage";
import { useParams, usePathname } from "next/navigation";
import { RootState, useAppDispatch } from "@/redux/store";

import {
  fetchAllFamily,
  fetchAllFamilyActions,
} from "@/redux/family/getAllFamily/getAllFamilySlice";

const useFetchAllFamily = (accessToken: string) => {
  const router = useRouter();
  // const accessToken = LocalStorage.GetAccessToken();
  const dispatch = useAppDispatch();
  const families = useSelector((state: RootState) => state.getAllFamily);
  const pathName = usePathname();

  useEffect(() => {
    if (!accessToken) {
      dispatch(fetchAllFamilyActions.setError("Access token is not found"));
    } else {
      const handleFetchAllFamily = async () => {
        try {
          dispatch(fetchAllFamily({ accessToken: accessToken }));
        } catch (error) {
          console.error("Error fetching user data:", error);
          sessionStorage.setItem("redirect", pathName);
          router.push("/login");
        }
      };

      handleFetchAllFamily();
    }
  }, [accessToken, router, pathName, dispatch]);

  return { families };
};

export default useFetchAllFamily;
