"use client";

import CreateFamilyModal from "@/components/modals/create-family-modal";
import DeleteFamilyModel from "@/components/modals/delete-family-model";
import DeleteMessageModel from "@/components/modals/delete-message-model";
import EditFamilyModal from "@/components/modals/edit-family-modal";
import InviteModel from "@/components/modals/invite-model";
import LeaveFamilyModel from "@/components/modals/leave-family-model";
import MembersModel from "@/components/modals/members-model";
import MessageFileModal from "@/components/modals/message-file-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateFamilyModal />
      <InviteModel />
      <EditFamilyModal />
      <MembersModel />
      <LeaveFamilyModel />
      <DeleteFamilyModel />
      <MessageFileModal />
      <DeleteMessageModel />
    </>
  );
};
