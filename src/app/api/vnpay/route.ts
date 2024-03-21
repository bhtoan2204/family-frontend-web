import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { HmacSHA256, HmacSHA512 } from "crypto-js";
import axios from "axios";
import config from "../../../configs/vnpayConfigs.json";
import { NextApiRequest } from "next";
import dateFormat from "dateformat";
import { create } from "domain";
import { baseUrl } from "@/services/url";
const qs = require("qs");

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

// export async function POST(request: NextRequest, res: NextResponse) {
//   try {
//     // const requestHeaders = new Headers(request.headers);

//     // const ip = request.ip || "";
//     // const ipAddr = ip;

//     // var tmnCode = config["vnp_TmnCode"];
//     // var secretKey = config["vnp_HashSecret"];
//     // console.log("secretKey", secretKey);
//     // var vnpUrl = config.vnp_Url;
//     // var returnUrl = config.vnp_ReturnUrl;

//     // var date = moment();

//     // var createDate = date.format("YYYYMMDDHHmmss");
//     // var orderId = date.format("HHmmss");
//     // var amount = 200;
//     // var bankCode = "";

//     // var orderInfo = "Paid for basic premium plan ";
//     // var orderType = "other";
//     // var locale = "vn";

//     // var currCode = "VND";
//     // var vnp_Params: any = {};
//     // vnp_Params["vnp_Version"] = "2.1.0";
//     // vnp_Params["vnp_Command"] = "pay";
//     // vnp_Params["vnp_TmnCode"] = tmnCode;
//     // // vnp_Params['vnp_Merchant'] = ''
//     // vnp_Params["vnp_Locale"] = locale;
//     // vnp_Params["vnp_CurrCode"] = currCode;
//     // vnp_Params["vnp_TxnRef"] = orderId;
//     // vnp_Params["vnp_OrderInfo"] = orderInfo;
//     // vnp_Params["vnp_OrderType"] = orderType;
//     // vnp_Params["vnp_Amount"] = amount * 100;
//     // vnp_Params["vnp_ReturnUrl"] = returnUrl;
//     // vnp_Params["vnp_IpAddr"] = ipAddr;
//     // vnp_Params["vnp_CreateDate"] = createDate;
//     // if (bankCode !== null && bankCode !== "") {
//     //   vnp_Params["vnp_BankCode"] = bankCode;
//     // }

//     // vnp_Params = sortObject(vnp_Params);

//     // var querystring = require('qs');
//     // var signData = querystring.stringify(vnp_Params, { encode: false });
//     // var crypto = require("crypto");
//     // var hmac = crypto.createHmac("sha512", secretKey);
//     // var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
//     // vnp_Params['vnp_SecureHash'] = signed;
//     // vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
//     // // var signed = HmacSHA256(signData, secretKey);

//     // // var signed = HmacSHA256(signData, secretKey);
//     // // vnp_Params["vnp_SecureHash"] = signed;
//     // // vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });
//     // // console.log(vnpUrl)
//     // return NextResponse.json({ order_url: vnpUrl, qr_code: "" });
//     // return NextResponse.redirect(vnpUrl, { status: 308 });
//     const ip: string | string[] | undefined = (
//       request.headers.get("x-forwarded-for") ?? "127.0.0.1"
//     ).split(",")[0];
//     // Kiểm tra nếu IP được trả về là một mảng

//     // var config = require('config');
//     // var dateFormat = require('dateformat');
//     const body = await request.json();

//     var tmnCode = config["vnp_TmnCode"];
//     var secretKey = config["vnp_HashSecret"];
//     console.log("secretKey", secretKey);
//     var vnpUrl = config["vnp_Url"];
//     var returnUrl = config["vnp_ReturnUrl"];
//     console.log(returnUrl);

//     // var date = new Date();

//     var date = new Date();
//     console.log(date);
//     const createDate = moment(date).format("YYYYMMDDHHmmss");
//     var orderId = moment(date).format("HHmmss");

//     console.log(createDate, orderId);
//     var amount = 10000;
//     const amount_2 = body.amount;
//     var orderInfo = "Paidpaidpaid";
//     const order_info2 = body.order_info;
//     var orderType = "other";
//     var locale = "vn";

//     var locale = "vn";

//     var currCode = "VND";
//     var vnp_Params: any = {};
//     vnp_Params["vnp_Version"] = "2.1.0";
//     vnp_Params["vnp_Command"] = "pay";
//     vnp_Params["vnp_TmnCode"] = tmnCode;
//     // vnp_Params['vnp_Merchant'] = ''
//     vnp_Params["vnp_Locale"] = locale;
//     vnp_Params["vnp_CurrCode"] = currCode;
//     vnp_Params["vnp_TxnRef"] = orderId;
//     vnp_Params["vnp_OrderInfo"] = orderInfo;
//     vnp_Params["vnp_OrderType"] = orderType;
//     vnp_Params["vnp_Amount"] = amount * 100;
//     vnp_Params["vnp_ReturnUrl"] = returnUrl;
//     vnp_Params["vnp_IpAddr"] = ip || "127.0.0.1";
//     vnp_Params["vnp_CreateDate"] = createDate;
//     // if (bankCode !== null && bankCode !== '') {
//     //   vnp_Params['vnp_BankCode'] = bankCode;
//     // }

//     vnp_Params = sortObject(vnp_Params);

//     var querystring = require("qs");
//     var signData = querystring.stringify(vnp_Params, { encode: false });
//     var crypto = require("crypto");
//     var hmac = crypto.createHmac("sha512", secretKey);
//     var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
//     vnp_Params["vnp_SecureHash"] = signed;
//     vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
//     console.log(vnpUrl);
//     return NextResponse.json({ order_url: vnpUrl, qr_code: "" });
//   } catch (error) {
//     return NextResponse.json({ error: "not gud" }, { status: 500 });
//   }
// }
export async function POST(request: NextRequest, res: NextResponse) {
  try {
    const body = await request.json();
    const headers = request.headers;
    const bearer = headers.get("Authorization");
    const authorization = bearer?.split(" ")[1];
    const id_package = body.id_package;
    const id_family = body.id_family;
    const amount = body.amount;
    const language = body.language;
    const method = body.method;
    console.log("body", body);
    const data = await axios.post(
      baseUrl + "/api/v1/payment/createOrderVNPAY",
      {
        id_package: id_package,
        id_family: id_family,
        bankCode: "NCB",
        amount: amount,
        language: language,
        method: method,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorization}`,
        },
      }
    );
    console.log("âsasasa", data);
    return NextResponse.json({ order_url: data.data.paymentUrl, qr_code: "" });
  } catch (error) {
    console.log("áasasas", error);
    return NextResponse.json({ error: "not gud" }, { status: 500 });
  }
}
// function sortObject(obj: Record<string, any>): Record<string, any> {
//   const sorted: Record<string, any> = {};
//   Object.keys(obj)
//     .sort()
//     .forEach((key) => {
//       sorted[key] = obj[key];
//     });
//   return sorted;
// }

function sortObject(obj: any) {
  const sorted: any = {};
  const string = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      string.push(encodeURIComponent(key));
    }
  }
  string.sort();
  for (key = 0; key < string.length; key++) {
    sorted[string[key]] = encodeURIComponent(obj[string[key]]).replace(
      / /g,
      "+"
    );
  }
  return sorted;
}
