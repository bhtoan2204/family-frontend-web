import { AuthServices } from "@/services/apiclient";
import FamilyService from "@/services/apiclient/family-services";
import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ message: "GET request to /login" });
};

export const DELETE = async (req: Request) => {
  try {
    const headers = req.headers.get("Authorization");
    const accessToken = headers?.split(" ")[1];
    const body = await req.json();
    console.log("body nè", body);
    const response = await FamilyService.deleteMember(
      body.id_family,
      body.id_user,
      accessToken!
    );
    return NextResponse.json({
      message: "ok",
    });
  } catch (error: any) {
    return NextResponse.error().json();
  }
};
