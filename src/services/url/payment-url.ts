import { baseUrl } from "@/services/url";

const PaymentUrl = {
  getAllPricing: `${baseUrl}/api/v1/payment/getAllPackage`,
  checkOrder: `${baseUrl}/api/v1/payment/checkOrder`,
  createOrderVNPAY: `${baseUrl}/api/v1/payment/createOrderVNPAY`,
  getSuccessfulOrder: `${baseUrl}/api/v1/payment/getOrder`,
};
export default PaymentUrl;