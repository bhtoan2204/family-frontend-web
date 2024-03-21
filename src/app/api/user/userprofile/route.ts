import { AuthServices } from "@/services/apiclient";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import UserService from "@/services/apiclient/user";

export const GET = async (req: Request) => {
  //   const headersList = headers();
  const s = req.headers.get("Authorization");
  //   const referer = headersList.get("Authorization");
  const accessToken = s?.split(" ")[1];
  const data = await UserService.getUserProfile(accessToken!);
  
  return NextResponse.json({ data });
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const response = await AuthServices.login({
      email: body.email,
      password: body.password,
    });
    return NextResponse.json({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });
  } catch (error: any) {
    return NextResponse.error().json();
  }
};
