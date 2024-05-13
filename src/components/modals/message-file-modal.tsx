"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useModal } from "@/hooks/use-modal-store";
import { MessageFileSchema } from "@/schemas/chat-input-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const MessageFileModal = () => {
  const { socket } = useSocket();
  const { isOpen, onClose, type, data } = useModal();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isModelOpen = isOpen && type === "messageFile";

  const form = useForm({
    resolver: zodResolver(MessageFileSchema),
    defaultValues: {
      imageUrl: undefined,
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof MessageFileSchema>) => {
    const file = values.imageUrl;

    if (file && selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        socket.emit("newFamilyImageMessage", {
          familyId: data.query!.familyId,
          imageData: base64,
        });
      };
      reader.readAsDataURL(selectedFile);
    }
    onClose();
  };

  return (
    <Dialog open={isModelOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Send a file or a photo as a message
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                {selectedFile ? (
                  <div className="md:max-w-[200px]">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected"
                    />
                  </div>
                ) : null}
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Choose file
                      </FormLabel>
                      <FormControl>
                        <Button size="lg" type="button">
                          <input
                            type="file"
                            className="hidden"
                            id="fileInput"
                            onBlur={field.onBlur}
                            name={field.name}
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              setSelectedFile(e.target.files?.[0] || null);
                            }}
                            ref={field.ref}
                          />
                          <label
                            htmlFor="fileInput"
                            className="bg-blue-500 hover:bg-blue-600 text-neutral-90  rounded-md cursor-pointer inline-flex items-center"
                          >
                            <span className="whitespace-nowrap">
                              choose your image
                            </span>
                          </label>
                        </Button>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="px-6 py-4 bg-gray-100">
              <Button variant="primary" disabled={isLoading}>
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
