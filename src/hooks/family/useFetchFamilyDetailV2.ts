"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import LocalStorage from "@/store/local-storage/local-storage";
import { useParams, usePathname } from "next/navigation";
import { RootState, useAppDispatch } from "@/redux/store";

import { fetchAllFamily } from "@/redux/family/getAllFamily/getAllFamilySlice";
import {
  fetchFamilyDetail,
  fetchFamilyDetailAction,
} from "@/redux/family/familyDetail/getFamilyDetailSlice";

const useFetchFamilyDetail = (id_family: string, accessToken: string) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const familyDetail = useSelector((state: RootState) => state.getFamilyDetail);
  const pathName = usePathname();

  useEffect(() => {
    if (!accessToken) {
      dispatch(fetchFamilyDetailAction.setError("Access token is not found"));
    } else if (isNaN(parseInt(id_family))) {
      dispatch(fetchFamilyDetailAction.setError("Family ID is not a number"));
    } else {
      const handleFetchAllFamily = async () => {
        dispatch(
          fetchFamilyDetail({
            accessToken: accessToken,
            familyId: parseInt(id_family),
          })
        );
      };

      handleFetchAllFamily();
    }
  }, [accessToken, router, pathName, dispatch, id_family]);

  return { familyDetail };
};

export default useFetchFamilyDetail;
