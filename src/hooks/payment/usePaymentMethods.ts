import { PaymentMethod } from "@/types/paymentMethod";
import { UserProfile } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

const usePaymentMethods = (accessToken: string | null) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const handleFetchPaymentMethod = async () => {
      try {
        if (!accessToken) {
          setError("Access token is null");
          throw new Error("Access token is null");
        }
        const response = await axios.get("/api/payment/method", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("cout<<",response.data.data);
        setPaymentMethod(response.data.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        console.log(error);
      }
    };
    if (accessToken) {
      handleFetchPaymentMethod();
    }
  }, [accessToken]);
  return { paymentMethod, loading, error };
};

export default usePaymentMethods;
