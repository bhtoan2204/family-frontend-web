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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface AddComponentLastProps {
  onSubmit: (data: any) => void;
  isComponentLoading: boolean;
  componentForm: any;
}

const AddComponentLast = ({
  onSubmit,
  isComponentLoading,
  componentForm,
}: AddComponentLastProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Add Component</SheetTitle>
          <SheetDescription>Add a component to the subject</SheetDescription>
        </SheetHeader>
        <Form {...componentForm}>
          <form onSubmit={componentForm.handleSubmit(onSubmit)}>
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

export default AddComponentLast;
