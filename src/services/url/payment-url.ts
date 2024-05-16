import { baseUrl } from "@/services/url";

const PaymentUrl = {
  getAllPricing: `${baseUrl}/api/v1/payment/getAllPackage`,
  getPackageDetail: `${baseUrl}/api/v1/payment/getPackage`,
  getPaymentMethod: `${baseUrl}/api/v1/payment/getMethod`,
  checkOrder: `${baseUrl}/api/v1/payment/checkOrder`,
  createOrderVNPAY: `${baseUrl}/api/v1/payment/createOrderVNPAY`,
  getSuccessfulOrder: `${baseUrl}/api/v1/payment/getOrder`,
};
export default PaymentUrl;
