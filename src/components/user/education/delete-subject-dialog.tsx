"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TrashIcon } from "@heroicons/react/24/outline";

interface DeleteSubjectDialogProps {
  onDelete: () => void;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const DeleteSubjectDialog = ({
  onDelete,
  onOpen,
  onClose,
  isOpen,
}: DeleteSubjectDialogProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogTrigger>
        <Button variant="destructive" onClick={onOpen}>
          <TrashIcon className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-xl font-bold">Are you sure you want to delete?</h2>
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
  );
};

export default DeleteSubjectDialog;
