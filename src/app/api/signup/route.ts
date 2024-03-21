import { AuthServices } from "@/services/apiclient";
import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    message: "This is a GET request",
  });
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await AuthServices.signup({
      email: body.email,
      password: body.password,
      firstname: body.firstName,
      lastname: body.lastName,
      phone: body.phone,
    });

    return NextResponse.json({ message: "Signup successful" });
  } catch (error: any) {
    return NextResponse.error().json();
  }
};
