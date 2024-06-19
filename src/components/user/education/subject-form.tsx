"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubjectDetail } from "@/types/education";
import {
  CheckIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";

interface SubjectFormProps {
  onSubmit: (data: any) => void;
  isSubjectLoading: boolean;
  subjectForm: any;
  subjectDetail: SubjectDetail;
  isEditSubject: boolean;
  setIsEditSubject: (value: boolean) => void;
}

const SubjectForm = ({
  isSubjectLoading,
  subjectForm,
  onSubmit,
  subjectDetail,
  isEditSubject,
  setIsEditSubject,
}: SubjectFormProps) => {
  useEffect(() => {
    subjectForm.setValue("name", subjectDetail.subject_name);
    subjectForm.setValue("description", subjectDetail.description);
  }, [subjectDetail.subject_name, subjectDetail.description, subjectForm]);

  return (
    <div className="flex flex-row gap-3">
      {!isEditSubject && (
        <>
          <div className="flex flex-1 flex-col items-start gap-4 p-4">
            <h3 className="text-lg font-semibold">
              {subjectDetail.subject_name}
            </h3>
            <p className="text-sm">{subjectDetail.description}</p>
          </div>
          <Button variant="outline" onClick={() => setIsEditSubject(true)}>
            <PencilSquareIcon className="h-5 w-5" />
          </Button>
        </>
      )}
      {isEditSubject && (
        <Form {...subjectForm}>
          <form
            onSubmit={subjectForm.handleSubmit(onSubmit)}
            className="w-full"
          >
            <div className="flex flex-row gap-3">
              <div className="gap-[2px] flex flex-1 flex-col">
                <FormField
                  control={subjectForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
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
              </div>
              <div className="flex flex-col gap-[2px]">
                <Button type="submit" variant="outline">
                  <CheckIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setIsEditSubject(false)}
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default SubjectForm;
