import PaymentUrl from "@/services/url/payment-url";

const getOrder = async (token: string) => {
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

export default getOrder;
