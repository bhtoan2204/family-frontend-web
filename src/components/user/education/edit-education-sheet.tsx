"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EducationProgress } from "@/types/education";
import { Member } from "@/types/member";
import { useEffect } from "react";

interface EditEducationSheetProps {
  familyMembers: Member[];
  onSubmit: (data: any) => void;
  isEducationProgressLoading: boolean;
  educationProgressForm: any;
  educationProgress: EducationProgress;
}

const EditEducationSheet = ({
  familyMembers,
  isEducationProgressLoading,
  educationProgressForm,
  onSubmit,
  educationProgress,
}: EditEducationSheetProps) => {
  useEffect(() => {
    educationProgressForm.setValue(
      "idMember",
      educationProgress.id_user
    );
    educationProgressForm.setValue(
      "title",
      educationProgress.title
    );
    educationProgressForm.setValue(
      "schoolInfo",
      educationProgress.school_info
    );
    educationProgressForm.setValue(
      "progressNotes",
      educationProgress.progress_notes
    );
  }, [
    educationProgress.id_user,
    educationProgress.title,
    educationProgress.school_info,
    educationProgress.progress_notes,
    educationProgressForm,
  ]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Progress</SheetTitle>
          <SheetDescription>
            Edit the progress of a family member
          </SheetDescription>
        </SheetHeader>
        <Form {...educationProgressForm}>
          <form onSubmit={educationProgressForm.handleSubmit(onSubmit)}>
            <div className="gap-5 flex flex-col pt-5">
              <FormField
                control={educationProgressForm.control}
                name="idMember"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Member</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="h-15"
                          disabled
                        >
                          <SelectValue placeholder="Select member" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {familyMembers.map((member) => (
                          <SelectItem
                            key={member.id_user}
                            value={member.id_user}
                          >
                            <div className="flex flex-row gap-4 items-center">
                              <Avatar className="bg-gray-300 dark:bg-slate-200">
                                <AvatarImage
                                  src={member.avatar}
                                  alt={member.firstname}
                                />
                              </Avatar>
                              <div className="flex flex-col gap-1 items-start">
                                <p>
                                  {member.firstname} {member.lastname}
                                </p>
                                <h4 className="text-xs text-gray-500">
                                  {member.email}
                                </h4>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={educationProgressForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter progress title"
                        disabled={isEducationProgressLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={educationProgressForm.control}
                name="schoolInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter school name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={educationProgressForm.control}
                name="progressNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Progress Notes</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter progress note"
                        disabled={isEducationProgressLoading}
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
                  disabled={isEducationProgressLoading}
                >
                  Save
                </Button>
              </SheetClose>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditEducationSheet;
