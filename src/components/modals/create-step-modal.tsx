"use client";

import { AddStep, InsertStep } from "@/actions/guideline-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/use-modal-store";
import { StepSchema } from "@/schemas/guideline-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const CreateStepModal = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [stepPotionOption, setStepPotionOption] = useState<string>("0");
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "createStep";
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(StepSchema),
    defaultValues: {
      name: "",
      description: "",
      steps: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const addStep = async (values: z.infer<typeof StepSchema>) => {
    await AddStep(
      data.token!,
      Number(data.familyId!),
      Number(data.guidelineId!),
      null,
      values.name,
      values.description
    );
  };

  const insertStep = async (
    values: z.infer<typeof StepSchema>,
    index: string
  ) => {
    await InsertStep(
      data.token!,
      Number(data.familyId!),
      Number(data.guidelineId!),
      null,
      values.name,
      values.description,
      index
    );
  };

  const pageAction = () => {
    onClose();
    form.reset();
    setIsSwitchOn(false);
    router.refresh();
  };

  const onSubmit = async (values: z.infer<typeof StepSchema>) => {
    if (data.isUsingIndex) {
      if (isSwitchOn && values.steps !== "")
        await insertStep(values, (Number(values.steps!) - 1).toString());
      else await addStep(values);
    } else if (!data.isUsingIndex) {
      if (!data.addStepOption) {
        if (!data.index) await addStep(values);
        else await insertStep(values, data.index.toString());
      } else if (data.addStepOption) {
        if (stepPotionOption === "0")
          await insertStep(values, data.index!.toString());
        else if (stepPotionOption === "1")
          await insertStep(values, (data.index! + 1).toString());
      }
    }
    pageAction();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create a new step
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your step a name and description
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center"></div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Step name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter step name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Step description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        className="bg-zinc-300/50 dark:bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter step description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className={
                  data.addStepOption ? "flex flex-col space-y-2" : "hidden"
                }
              >
                <Select onValueChange={(value) => setStepPotionOption(value)}>
                  <SelectTrigger className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0">
                    <SelectValue placeholder="Select step position option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Add Above</SelectItem>
                    <SelectItem value="1">Add Below</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div
                className={
                  data.isUsingIndex ? "flex flex-col space-y-2" : "hidden"
                }
              >
                <div className="flex items-center space-x-2">
                  <Switch
                    id="airplane-mode"
                    checked={isSwitchOn}
                    onCheckedChange={() => setIsSwitchOn(!isSwitchOn)}
                    className="dark:bg-zinc-300/50"
                  />
                  <Label htmlFor="airplane-mode">
                    Step Position (Optional)
                  </Label>
                </div>
                <FormField
                  control={form.control}
                  name="steps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Choose step position
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!isSwitchOn}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0">
                            <SelectValue placeholder="Select step position" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data.maxStepIndex &&
                            Array.from(
                              { length: data.maxStepIndex },
                              (_, i) => i + 1
                            ).map((index) => (
                              <SelectItem key={index} value={index.toString()}>
                                {index}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="px-6 py-4 bg-gray-100">
              <Button variant="primary" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStepModal;
