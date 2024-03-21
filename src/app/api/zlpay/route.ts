import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { HmacSHA256 } from "crypto-js";
import axios from "axios";

const config = {
  app_id: "2553",
  key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
  key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

export async function GET(request: Request) {
  try {
    return Response.json({ haha: "haha" });
  } catch (error) {
    return NextResponse.json({ error: "not gud" }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    // const items = [
    //   {
    //     id: 1,
    //     plansAbbrevation: "basic",
    //     plansName: "Basic Premium Plan",
    //   },
    // ];
    const body = await request.json();
    const redirect_url_2 = body.redirect_url;
    const amount = body.amount;
    const description = body.description;
    const items = body.items;
    const transID = Math.floor(Math.random() * 1000000);

    const trans_id = `${moment().format("YYMMDD")}_${transID}`;
    const embed_data = {
      merchantinfo: "Fam fun",
      redirecturl: redirect_url_2,
    };
    const order: any = {
      app_id: config.app_id,
      app_trans_id: trans_id, // mã giao dich có định dạng yyMMdd_xxxx
      app_user: "KIMLONG",
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: amount,
      description: `Paid for plan #${trans_id}`,
      bank_code: "zalopayapp",
      //   bank_code: 38,
      //   expire_duration_seconds: 900,
    };
    // const order: any = {
    //   app_id: config.app_id,
    //   app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
    //   app_user: "user123",
    //   app_time: Date.now(), // miliseconds
    //   item: JSON.stringify(items),
    //   embed_data: JSON.stringify(embed_data),
    //   amount: 50000,
    //   description: `Lazada - Payment for the order #${transID}`,
    //   bank_code: "zalopayapp",
    // };
    const datas =
      config.app_id +
      "|" +
      order.app_trans_id +
      "|" +
      order.app_user +
      "|" +
      order.amount +
      "|" +
      order.app_time +
      "|" +
      order.embed_data +
      "|" +
      order.item;
    order.mac = HmacSHA256(datas, config.key1).toString();

    const response = await axios.post(config.endpoint, null, { params: order });
    console.log(response.data);
    return Response.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "not gud" }, { status: 500 });
  }
}
