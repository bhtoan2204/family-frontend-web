"use client";

import { CreateOrderVNPAY } from "@/actions/payment-actions";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    const url = await CreateOrderVNPAY(token, packageId, amount);
    window.open(url, "_blank");
  };

  return (
    <Button onClick={handleNavigateToPaymentUrl} className="w-full">
      Upgrade now <ArrowRight className="h-5 w-5 ml-1.5" />
    </Button>
  );
};

export default UpgradeButton;
