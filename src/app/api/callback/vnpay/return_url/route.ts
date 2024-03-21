import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import config from '../../../../../configs/vnpayConfigs.json'


export async function GET(request: NextRequest, res: NextResponse) {
    try {
        let vnp_Params = new URLSearchParams(request.nextUrl.searchParams);
        var secureHash = vnp_Params.get('vnp_SecureHash');
        vnp_Params.delete('vnp_SecureHash');
        vnp_Params.delete('vnp_SecureHashType');
        vnp_Params = new URLSearchParams(sortObject(Object.fromEntries(vnp_Params)));

        var tmnCode = config['vnp_TmnCode'];
        var secretKey = config['vnp_HashSecret'];
        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");
        var hmac = crypto.createHmac("sha256", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

        if (secureHash === signed) {
            return NextResponse.redirect('http://localhost:3000/plans/KIMLONG/checkout/success', { status: 308 });
            // res.ẻ('/return_/redirect')
            return NextResponse.json({ haha: "haha" });

        } else {
            // return NextResponse.json({ haha: "haha" });
            return NextResponse.redirect('http://localhost:3000/plans/KIMLONG/checkout/success', { status: 308 });
            // return NextResponse.redirect('https://localhost:3000/return_/redirect', { status: 308 });
        }
    } catch (error) {
        return NextResponse.json({ error: "not gud" }, { status: 500 });
    }
}

function sortObject(obj: Record<string, any>): Record<string, any> {
    const sorted: Record<string, any> = {};
    Object.keys(obj)
        .sort()
        .forEach((key) => {
            sorted[key] = obj[key];
        });
    return sorted;
}
