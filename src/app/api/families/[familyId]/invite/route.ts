import { UpdateFamily } from "@/actions/family-actions";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { familyId: string };
  }
) {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.familyId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const family = await UpdateFamily(
      session.accessToken,
      { code_invite: uuidv4() },
      Number(params.familyId)
    );

    return NextResponse.json(family);
  } catch (error) {
    return new NextResponse("internal Error", { status: 500 });
  }
}
