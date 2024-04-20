"use server";

import PaymentUrl from "@/services/url/payment-url";

export const getAllPricing = async (token: string) => {
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
    return { error: "Somwthing wrong!" };
  }
};
