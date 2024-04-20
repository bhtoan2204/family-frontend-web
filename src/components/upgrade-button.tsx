"use client";

import { paymentUrl } from "@/actions/payment/payment";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const UpgradeButton = ({
  packageId,
  amount,
  token,
}: {
  packageId: number;
  amount: number;
  token: string;
}) => {
  const handleNavigateToPaymentUrl = async () => {
    const url = await paymentUrl(token, packageId, amount);
    window.open(url, "_blank");
  };

  return (
    <Button onClick={handleNavigateToPaymentUrl} className="w-full">
      Upgrade now <ArrowRight className="h-5 w-5 ml-1.5" />
    </Button>
  );
};

export default UpgradeButton;
