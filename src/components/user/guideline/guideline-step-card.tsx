"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useModal } from "@/hooks/use-modal-store";
import { Images } from "lucide-react";

interface GuidelineStepCardProps {
  step: number;
  title: string;
  description?: string;
  image?: string;
}

const GuidelineStepCard = ({
  step,
  title,
  description,
  image,
}: GuidelineStepCardProps) => {
  const { onOpen } = useModal();
  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle>
            Step {step}: {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-end">
          <Button
            onClick={() =>
              onOpen("openImage", {
                imageUrl: image,
              })
            }
          >
            <Images size={24} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GuidelineStepCard;
