import { AuthServices } from "@/services/apiclient";
import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({ message: "GET request to /login" });
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const response = await AuthServices.login({
      email: body.email,
      password: body.password,
    });
    console.log(response.data);
    return NextResponse.json({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });
  } catch (error: any) {
    return NextResponse.error().json();
  }
};
