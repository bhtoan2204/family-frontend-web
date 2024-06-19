"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ComponentScore } from "@/types/education";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface AddComponentLastProps {
  onSubmit: (data: any, index: number, oldIndex: number) => void;
  isComponentLoading: boolean;
  componentForm: any;
  index: number;
  componentScore: ComponentScore;
  indexLength: number;
}

const EditComponentIndex = ({
  onSubmit,
  isComponentLoading,
  componentForm,
  index,
  componentScore,
  indexLength,
}: AddComponentLastProps) => {
  const [indexValue, setIndexValue] = useState<string>(index.toString());
  useEffect(() => {
    componentForm.setValue("name", componentScore.component_name);
    componentForm.setValue("score", componentScore.score.toString());
  }, [componentScore, componentForm]);

  return (
    <Sheet>
      <SheetTrigger>
        <button className="hover:rounded-full hover:bg-slate-200 hover:shadow">
          <PencilSquareIcon className="h-5 w-5 text-green-500" />
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Edit Component</SheetTitle>
          <SheetDescription>Add a component to the subject</SheetDescription>
        </SheetHeader>
        <Form {...componentForm}>
          <form
            onSubmit={componentForm.handleSubmit((data: any) =>
              onSubmit(data, Number(indexValue), index)
            )}
          >
            <div className="gap-5 flex flex-col pt-5">
              <FormField
                control={componentForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Component Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={componentForm.control}
                name="score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Score</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Select
                defaultValue={index.toString()}
                value={index.toString()}
                onValueChange={(value) => {
                  setIndexValue(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add Type" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: indexLength }, (_, i) => i).map(
                    (indexTemp) => (
                      <SelectItem key={indexTemp} value={indexTemp.toString()}>
                        {indexTemp + 1}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <Button
                type="submit"
                variant="primary"
                disabled={isComponentLoading}
              >
                Add Component
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditComponentIndex;
