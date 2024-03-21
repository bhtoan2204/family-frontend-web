export const dynamic = "force-dynamic";
import { baseUrl } from "@/services/url";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const headers = req.headers.get("Authorization");
    const accessToken = headers?.split(" ")[1];
    if (!accessToken) return NextResponse.error().json();
    const response = await axios.get(
      baseUrl + "/api/v1/payment/getAllPackage",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.data && typeof response.data === "object") {
      return NextResponse.json({ data: response.data });
    } else {
      return NextResponse.error().json();
    }
  } catch (error) {
    return NextResponse.error().json();
  }
};
