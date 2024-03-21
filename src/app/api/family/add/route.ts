import { AuthServices } from "@/services/apiclient";
import FamilyService from "@/services/apiclient/family-services";
import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ message: "GET request to /login" });
};

export const POST = async (req: Request) => {
  try {
    const headers = req.headers.get("Authorization");
    const accessToken = headers?.split(" ")[1];
    const body = await req.json();
    console.log("body", body);
    const response = await FamilyService.createFamily(
      accessToken!,
      body.name,
      body.description
    );
    console.log(response);
    return NextResponse.json({
      id_family: response,
    });
  } catch (error: any) {
    return NextResponse.error().json();
  }
};
