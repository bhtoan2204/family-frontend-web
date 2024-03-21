import { AuthServices } from "@/services/apiclient";
import FamilyService from "@/services/apiclient/family-services";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const s = req.headers.get("Authorization");
    //   const referer = headersList.get("Authorization");
    const accessToken = s?.split(" ")[1];
    try {
        const data = await FamilyService.getAllFamily(accessToken!);
        // console.log("data nè", { data })
        return NextResponse.json({ data });
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ message: "Error fetching user data" });
    }

    return NextResponse.json({ message: "GET request to /login" });
};


