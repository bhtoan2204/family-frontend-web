"use server";

import PaymentUrl from "@/services/url/payment-url";

export const paymentUrl = async (
  token: string,
  packageId: number,
  amount: number
) => {
  try {
    const response = await fetch(PaymentUrl.createOrderVNPAY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_package: packageId,
        id_family: null,
        bankCode: "NCB",
        amount: amount,
        language: "vn",
        method: "vnpay",
      }),
    });

    const data = await response.json();
    return data.paymentUrl;
  } catch (error: any) {
    return { error: "Somwthing wrong!" };
  }
};
