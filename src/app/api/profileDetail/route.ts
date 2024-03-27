import UserService from "@/services/apiclient/user";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = await UserService.getUserProfile();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error().json();
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const response = await UserService.changePassword(body);
    return NextResponse.json({ message: "POST request to /profile" });
  } catch (error: any) {
    return NextResponse.error().json();
  }
};

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();

    const response = await UserService.updateUserProfile(body);
    return NextResponse.json({ message: "PUT request to /profile" });
  } catch (error: any) {
    return NextResponse.error().json();
  }
};
