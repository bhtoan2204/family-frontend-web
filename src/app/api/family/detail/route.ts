import { AuthServices } from "@/services/apiclient";
import FamilyService from "@/services/apiclient/family-services";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const s = req.headers.get("Authorization");
  const id_family = req.nextUrl.searchParams.get("id_family");
  if (isNaN(parseInt(id_family!))) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  //   const referer = headersList.get("Authorization");
  const accessToken = s?.split(" ")[1];
  try {
    // console.log(id_family, accessToken)
    const data = await FamilyService.getFamilyDetail(id_family!, accessToken!);
    // console.log("data detail nè", { data })
    return NextResponse.json({ data });
  } catch (error: any) {
    console.log("cout<err message fetch detail", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "GET request to /login" });
};
