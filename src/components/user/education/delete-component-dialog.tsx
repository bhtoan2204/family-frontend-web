"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TrashIcon } from "@heroicons/react/24/outline";

interface DeleteEducationDialogProps {
  onDelete: (index: number) => void;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  index: number;
}

const DeleteComponentDialog = ({
  onDelete,
  onOpen,
  onClose,
  isOpen,
  index,
}: DeleteEducationDialogProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogTrigger>
        <button
          className="hover:rounded-full hover:bg-slate-200 hover:shadow"
          onClick={onOpen}
        >
          <TrashIcon className="h-5 w-5 text-rose-500" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-xl font-bold">Are you sure you want to delete?</h2>
        <div className="flex gap-4 mt-4">
          <Button variant="destructive" onClick={() => onDelete(index)}>
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

export default DeleteComponentDialog;
