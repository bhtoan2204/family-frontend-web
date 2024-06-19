"use client";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubjectDetail } from "@/types/education";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@radix-ui/react-dialog";
import { useEffect } from "react";

interface SubjectTestsTableProps {
  subjectDetail: SubjectDetail;
  isSubjectTestsLoading: boolean;
  subjectTestsForm: any;
  onSubmit: (data: any) => void;
  onDelete: () => void;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const SubjectTestsTable = ({
  subjectDetail,
  isSubjectTestsLoading,
  subjectTestsForm,
  onSubmit,
  onDelete,
  onOpen,
  onClose,
  isOpen,
}: SubjectTestsTableProps) => {
  useEffect(() => {
    subjectTestsForm.setValue(
      "midtermScore",
      subjectDetail?.midterm_score?.toString()
    );
    subjectTestsForm.setValue(
      "finalScore",
      subjectDetail?.final_score?.toString()
    );
    subjectTestsForm.setValue(
      "bonusScore",
      subjectDetail?.bonus_score?.toString()
    );
  }, [
    subjectDetail.midterm_score,
    subjectDetail.final_score,
    subjectDetail.bonus_score,
    subjectTestsForm,
  ]);

  return (
    <Table className="w-full border">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Midterm</TableHead>
          <TableHead className="text-center">Final</TableHead>
          <TableHead className="text-center">Bonus</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-center">
            {subjectDetail.midterm_score}
          </TableCell>
          <TableCell className="text-center">
            {subjectDetail.final_score}
          </TableCell>
          <TableCell className="text-center">
            {subjectDetail.bonus_score}
          </TableCell>
          <TableCell className="flex items-center justify-center gap-5">
            <Sheet>
              <SheetTrigger asChild>
                <button className="hover:rounded-full hover:bg-slate-200 hover:shadow">
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Edit Test Scores</SheetTitle>
                  <SheetDescription>
                    Edit the test scores for this subject
                  </SheetDescription>
                </SheetHeader>
                <Form {...subjectTestsForm}>
                  <form onSubmit={subjectTestsForm.handleSubmit(onSubmit)}>
                    <div className="gap-5 flex flex-col pt-5">
                      <FormField
                        control={subjectTestsForm.control}
                        name="midtermScore"
                        disabled={isSubjectTestsLoading}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Midterm Score</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="0.1"
                                min={0}
                                max={10}
                                value={parseFloat(field.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={subjectTestsForm.control}
                        name="finalScore"
                        disabled={isSubjectTestsLoading}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Final Score</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="0.1"
                                min={0}
                                max={10}
                                value={parseFloat(field.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={subjectTestsForm.control}
                        name="bonusScore"
                        disabled={isSubjectTestsLoading}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bonus Score</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="0.1"
                                min={0}
                                max={1}
                                value={parseFloat(field.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubjectTestsLoading}
                      >
                        Save
                      </Button>
                    </div>
                  </form>
                </Form>
              </SheetContent>
            </Sheet>
            <Dialog open={isOpen}>
              <DialogTrigger asChild>
                <button
                  className="hover:rounded-full hover:bg-slate-200 hover:shadow"
                  onClick={onOpen}
                >
                  <TrashIcon className="h-5 w-5 text-rose-500" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <h2 className="text-xl font-bold">
                  Are you sure you want to delete?
                </h2>
                <div className="flex gap-4 mt-4">
                  <Button variant="destructive" onClick={onDelete}>
                    Yes
                  </Button>
                  <Button variant="secondary" onClick={onClose}>
                    No
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default SubjectTestsTable;
