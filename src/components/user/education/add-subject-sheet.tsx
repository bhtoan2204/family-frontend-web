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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface AddEducationSheetProps {
  onSubmit: (data: any) => void;
  isSubjectLoading: boolean;
  subjectForm: any;
}

const AddSubjectSheet = ({
  isSubjectLoading,
  subjectForm,
  onSubmit,
}: AddEducationSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="primary">Add Subject</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Subject</SheetTitle>
          <SheetDescription>Add the subject of a progress</SheetDescription>
        </SheetHeader>
        <Form {...subjectForm}>
          <form onSubmit={subjectForm.handleSubmit(onSubmit)}>
            <div className="gap-5 flex flex-col pt-5">
              <FormField
                control={subjectForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter subject name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={subjectForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter subject description"
                        disabled={isSubjectLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SheetClose>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubjectLoading}
                >
                  Add Progress
                </Button>
              </SheetClose>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddSubjectSheet;
