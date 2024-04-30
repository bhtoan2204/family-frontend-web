"use server";

import PaymentUrl from "@/services/url/payment-url";

export const AllPackages = async (token: string) => {
  try {
    const response = await fetch(PaymentUrl.getAllPricing, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "Something wrong!" };
  }
};
export const GetPackageDetail = async (token: string, packageId: number) => {
  try {
    const response = await fetch(
      `${PaymentUrl.getPackageDetail}?id_package=${packageId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "Something wrong!" };
  }
};
export const GetPaymentMethod = async (token: string) => {
  try {
    const response = await fetch(PaymentUrl.getPaymentMethod, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "Something wrong!" };
  }
};
export const CreateOrderVNPAY = async (
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
    return { error: "Something wrong!" };
  }
};
export const CheckOrder = async (token: string, order: any) => {
  try {
    const response = await fetch(`${PaymentUrl.checkOrder}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "Something wrong!" };
  }
};
export const GetOrder = async (token: string) => {
  try {
    const response = await fetch(PaymentUrl.getSuccessfulOrder, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
