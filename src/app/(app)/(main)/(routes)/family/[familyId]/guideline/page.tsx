"use client";

import { GetGuidelineDetail } from "@/actions/guideline-actions";
import Loader from "@/components/loader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ActionTooltip from "@/components/user/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { GuidelineItemDetail } from "@/types/guideline";
import {
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GuidelinePage = () => {
  const { data: session } = useSession();
  const [guideline, setGuideline] = useState<GuidelineItemDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const searchParams = useSearchParams();
  const { onOpen } = useModal();

  useEffect(() => {
    const fetchGuideline = async () => {
      setIsLoading(true);
      const guideline = await GetGuidelineDetail(
        session!.accessToken,
        Number(params!.familyId),
        Number(searchParams!.get("gl"))
      );
      setGuideline(guideline);
      setIsLoading(false);
    };
    if (session) {
      fetchGuideline();
    }
  }, [session, params, searchParams]);

  if (!guideline && !isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
        <div className="text-3xl font-semibold">Guideline not found</div>
      </div>
    );
  } else if (guideline && !isLoading) {
    return (
      <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
        <Card className="mx-10 mb-5 mt-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <h1 className="text-2xl font-semibold dark:text-white">
              {guideline.name}
            </h1>
            <div className="flex justify-evenly gap-1 items-start py-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      onClick={() =>
                        onOpen("createStep", {
                          familyId: params!.familyId as string,
                          guidelineId: guideline.id_item.toString(),
                          token: session?.accessToken,
                          isUsingIndex: true,
                          maxStepIndex: guideline.step.steps.length + 1,
                        })
                      }
                    >
                      <div className="min-w-4 mx-1 border-green-600 border rounded-full aspect-square bg-green-700" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Add</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      onClick={() =>
                        onOpen("editGuideline", {
                          familyId: params!.familyId as string,
                          guidelineId: guideline.id_item.toString(),
                          guideline: {
                            name: guideline.name,
                            description: guideline.description,
                          },
                          token: session?.accessToken,
                        })
                      }
                    >
                      <div className="min-w-4 mx-1 border-yellow-600 border rounded-full aspect-square bg-yellow-700" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Edit</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger>
                    <button
                      onClick={() =>
                        onOpen("deleteGuideline", {
                          familyId: params!.familyId as string,
                          guidelineId: guideline.id_item.toString(),
                          token: session?.accessToken,
                        })
                      }
                    >
                      <div className="min-w-4 mx-1 border-rose-600 border rounded-full aspect-square bg-rose-700" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Delete</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>{guideline.description}</CardContent>
        </Card>
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
          <div className="flex flex-col">
            {!guideline.step ? (
              <div className="text-3xl font-semibold">No steps found</div>
            ) : (
              <TooltipProvider>
                {guideline.step.steps.map((step, index) => (
                  <div
                    key={step.name}
                    className="relative group flex items-center hover:bg-black/5 p-4 transition w-full"
                  >
                    <div className="group flex gap-x-2 items-start w-full">
                      <div className="hover:drop-shadow-md transition items-center">
                        <p className="h-25 w-25">
                          Step {index + 1} of {guideline.step.steps.length} :{" "}
                        </p>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex items-center gap-x-2">
                          <div className="flex items-center">
                            <p className="font-semibold text-lg">{step.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
                      <button
                        onClick={() =>
                          onOpen("createStep", {
                            familyId: params!.familyId as string,
                            guidelineId: guideline.id_item.toString(),
                            token: session?.accessToken,
                            addStepOption: true,
                            index: index,
                          })
                        }
                      >
                        <ActionTooltip label="Add">
                          <PlusCircleIcon className="w-6 h-6 mr-2" />
                        </ActionTooltip>
                      </button>
                      <button
                        onClick={() =>
                          onOpen("editStep", {
                            familyId: params!.familyId as string,
                            guidelineId: guideline.id_item.toString(),
                            index: index,
                            token: session?.accessToken,
                            isUsingIndex: true,
                            step: {
                              name: step.name,
                              description: step.description,
                              position: index + 1,
                            },
                            maxStepIndex: guideline.step.steps.length,
                          })
                        }
                      >
                        <ActionTooltip label="Edit">
                          <PencilSquareIcon className="w-6 h-6 mr-2" />
                        </ActionTooltip>
                      </button>
                      <button
                        onClick={() =>
                          onOpen("deleteStep", {
                            familyId: params!.familyId as string,
                            guidelineId: guideline.id_item.toString(),
                            index: index,
                            token: session?.accessToken,
                          })
                        }
                      >
                        <ActionTooltip label="Delete">
                          <TrashIcon className="w-6 h-6 mr-2" />
                        </ActionTooltip>
                      </button>
                    </div>
                  </div>
                ))}
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default GuidelinePage;
