import { AuthServices } from "@/services/apiclient";
import FamilyService from "@/services/apiclient/family-services";
import { baseUrl } from "@/services/url";
import axios from "axios";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const s = req.headers.get("Authorization");
  const accessToken = s?.split(" ")[1];
  try {
    const response = await axios.get(baseUrl + "/api/v1/payment/getMethod", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("data nè", { data })
    return NextResponse.json({ data: response.data });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: "Error fetching user data" });
  }

  return NextResponse.json({ message: "GET request to /login" });
};
