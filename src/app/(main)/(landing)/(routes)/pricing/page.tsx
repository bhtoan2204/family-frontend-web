"use client";

import { PaymentActions } from "@/actions/payment-actions";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UpgradeButton from "@/components/upgrade-button";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const PricingPage = () => {
  const { data: session } = useSession();
  const [pricing, setPricing] = useState([]);

  useEffect(() => {
    const handleGetAllPricing = async () => {
      if (!session?.accessToken) return;
      const allPrices = await PaymentActions.AllPackages(session?.accessToken);
      setPricing(allPrices);
    };

    handleGetAllPricing();
  }, [session, pricing]);

  const pricingItems = [
    {
      id_package: 0,
      name: "Free",
      description:
        "A one-month trial package designed for users to experience the smart family platform",
      quota: 2,
      price: 0,
      expired: 1,
      features: [
        {
          text: "Family tree creation",
          footnote: "Create a family tree with up to 10 members",
        },
        {
          text: "Smart family tree",
          footnote:
            "Automatically generate a family tree based on the information provided",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Family financial management",
          footnote: "Manage your family's finances",
          negative: true,
        },
        {
          text: "Calender",
          footnote: "Keep track of important dates and events",
          negative: true,
        },
        {
          text: "Children's education",
          footnote: "Manage your children's education",
          negative: true,
        },
      ],
    },
    {
      id_package: 1,
      name: "Basic",
      description:
        "A one-month trial package designed for users to experience the smart family platform",
      quota: 4,
      price: 100000,
      expired: 1,
      features: [
        {
          text: "Family tree creation",
          footnote: "Create a family tree with up to 10 members",
        },
        {
          text: "Smart family tree",
          footnote:
            "Automatically generate a family tree based on the information provided",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Family financial management",
          footnote: "Manage your family's finances",
        },
        {
          text: "Calender",
          footnote: "Keep track of important dates and events",
          negative: true,
        },
        {
          text: "Children's education",
          footnote: "Manage your children's education",
          negative: true,
        },
      ],
    },
    {
      id_package: 2,
      name: "Preminum",
      description:
        "A 6-month subscription providing access to all features available within the application.",
      quota: 6,
      price: 500000,
      expired: 6,
      features: [
        {
          text: "Family tree creation",
          footnote: "Create a family tree with up to 10 members",
        },
        {
          text: "Smart family tree",
          footnote:
            "Automatically generate a family tree based on the information provided",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Family financial management",
          footnote: "Manage your family's finances",
        },
        {
          text: "Calender",
          footnote: "Keep track of important dates and events",
        },
        {
          text: "Children's education",
          footnote: "Manage your children's education",
        },
      ],
    },
  ];

  return (
    <MaxWidthWrapper className="mb-8 pb-8 mt-24 text-center max-w-5xl">
      <div className="mx-auto mb-10 sm:max-w-lg">
        <h1 className="text-6xl font-bold sm:text-7xl">Pricing</h1>
        <p className="mt-5 text-gray-600 sm:text-lg">
          Whether you&apos;re just trying out our service or need more,
          we&apos;ve got you covered.
        </p>
      </div>
      <div className="pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <TooltipProvider>
          {pricingItems.map(
            ({
              name,
              description,
              quota,
              features,
              price,
              expired,
              id_package,
            }) => {
              return (
                <div
                  key={name}
                  className={cn("relative rounded-2xl bg-white shadow-lg", {
                    "border-2 border-blue-600 shadow-blue-200": name !== "Free",
                    "border border-gray-200": name === "Free",
                  })}
                >
                  {name !== "Free" && (
                    <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white">
                      Upgrade now
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="my-3 text-center font-display text-3xl font-bold">
                      {name}
                    </h3>
                    <p className="text-gray-500">{description}</p>
                    <p className="my-5 font-display text-6xl font-semibold">
                      {price === 0
                        ? "Free"
                        : `${price.toLocaleString("de-DE")} VND`}
                    </p>
                    <p className="text-gray-500">
                      per
                      {expired === 1 ? " month" : ` ${expired} months`}
                    </p>
                  </div>

                  <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-1">
                      <p>{quota.toLocaleString()} features/month included</p>

                      <Tooltip delayDuration={300}>
                        <TooltipTrigger className="cursor-default ml-1.5">
                          <HelpCircle className="h-4 w-4 text-zinc-500" />
                        </TooltipTrigger>
                        <TooltipContent className="w-80 p-2">
                          The number of features you can use within the package
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <ul className="my-10 space-y-5 px-8">
                    {features.map(({ text, footnote, negative }) => (
                      <li key={text} className="flex space-x-5">
                        <div className="flex-shrink-0">
                          {negative ? (
                            <Minus className="h-6 w-6 text-gray-300" />
                          ) : (
                            <Check className="h-6 w-6 text-blue-500" />
                          )}
                        </div>
                        {footnote ? (
                          <div className="flex items-center space-x-1">
                            <p
                              className={cn("text-gray-600", {
                                "text-gray-400": negative,
                              })}
                            >
                              {text}
                            </p>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger className="cursor-default ml-1.5">
                                <HelpCircle className="h-4 w-4 text-zinc-500" />
                              </TooltipTrigger>
                              <TooltipContent className="w-80 p-2">
                                {footnote}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        ) : (
                          <p
                            className={cn("text-gray-600", {
                              "text-gray-400": negative,
                            })}
                          >
                            {text}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-200" />
                  <div className="p-5">
                    {name === "Free" ? (
                      <Link
                        href="/signin"
                        className={buttonVariants({
                          className: "w-full",
                          variant: "secondary",
                        })}
                      >
                        Upgrade now
                        <ArrowRight className="h-5 w-5 ml-1.5" />
                      </Link>
                    ) : (
                      <UpgradeButton
                        token={session?.accessToken!}
                        packageId={id_package}
                        amount={price}
                      />
                    )}
                  </div>
                </div>
              );
            }
          )}
        </TooltipProvider>
      </div>
    </MaxWidthWrapper>
  );
};

export default PricingPage;
