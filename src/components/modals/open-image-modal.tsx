"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";

const OpenImageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "openImage";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-transparent text-black p-5 overflow-hidden border-none">
        <DialogHeader className="pt-8 px-6">
          <DialogDescription className="text-center text-zinc-500">
            <img
              src={data?.imageUrl}
              alt="Image"
              className="w-full h-auto rounded-lg"
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OpenImageModal;
