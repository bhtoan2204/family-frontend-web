export const dynamic = "force-dynamic";
import PlanUrl from "@/services/url/plan-url";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const headers = req.headers.get("Authorization");
    const accessToken = headers?.split(" ")[1];
    if (!accessToken) return NextResponse.error().json();
    const response = await axios.get(PlanUrl.getAllPlan, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.data && typeof response.data === "object") {
      return NextResponse.json({ data: response.data });
    } else {
      throw new Error("Invalid JSON response");
    }
  } catch (error) {
    return NextResponse.error().json();
  }
};
