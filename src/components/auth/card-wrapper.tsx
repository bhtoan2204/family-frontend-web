"use client";

import { BackButton } from "@/components/auth/back-button";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  isLogin?: boolean;
}

export const CardWrapper = ({
  children,
  headerTitle,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  isLogin,
}: CardWrapperProps) => {
  return (
    <Card
      className={
        isLogin
          ? "w-[50vw] lg:w-[30vw] shadow-md"
          : "w-[50vw]  lg:w-[25vw] shadow-md"
      }
    >
      <CardHeader>
        <Header title={headerTitle} label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
