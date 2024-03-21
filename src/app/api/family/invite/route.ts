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
    console.log(body)
    console.log("body nè", {
      id_family: parseInt(body.id_family as string),
      accessToken: accessToken!,
      gmail: body.gmail,
      phone: body.phone,
      role: body.role,
    });
    await FamilyService.inviteMember({
      id_family: body.id_family,
      accessToken: accessToken!,
      gmail: body.gmail,
      phone: body.phone,
      role: body.role,
    });
    return NextResponse.json({
      message: "ok",
    });
  } catch (error: any) {
    return NextResponse.error().json();
  }
};
