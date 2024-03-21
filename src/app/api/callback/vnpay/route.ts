import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";


// const config = {
//   vnp_TmnCode: "U4EYG2S0",
//   vnp_HashSecret: "ROVRCDEONFOLXOSZUULGXWRXXPDUVHID",
//   vnp_Url: " https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
//   vnp_ReturnUrl: "https://localhost:3000/return_/redirect",
// };

export async function GET(request: Request) {
  try {
    return Response.json({ haha: "haha" });
  } catch (error) {
    return NextResponse.json({ error: "not gud" }, { status: 500 });
  }
}
