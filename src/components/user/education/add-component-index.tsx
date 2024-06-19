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
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface AddComponentLastProps {
  onSubmit: (data: any, index: number) => void;
  isComponentLoading: boolean;
  componentForm: any;
  index: number;
}

const AddComponentIndex = ({
  onSubmit,
  isComponentLoading,
  componentForm,
  index,
}: AddComponentLastProps) => {
  const [indexValue, setIndexValue] = useState<string>(index.toString());
  return (
    <Sheet>
      <SheetTrigger>
        <button className="hover:rounded-full hover:bg-slate-200 hover:shadow">
          <PlusCircleIcon className="h-5 w-5 text-sky-500" />
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Add Component</SheetTitle>
          <SheetDescription>Add a component to the subject</SheetDescription>
        </SheetHeader>
        <Form {...componentForm}>
          <form
            onSubmit={componentForm.handleSubmit((data: any) =>
              onSubmit(data, Number(indexValue))
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
                  <SelectItem value={index.toString()}>Add Above</SelectItem>
                  <SelectItem value={(index + 1).toString()}>
                    Add Below
                  </SelectItem>
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

export default AddComponentIndex;
