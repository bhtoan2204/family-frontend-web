"use client";

import CreateExpenditureModal from "@/components/modals/add-expenditure-modal";
import CreateExpenditureTypeModal from "@/components/modals/add-expenditure-type-modal";
import CreateIncomeModal from "@/components/modals/add-income-modal";
import CreateIncomeTypeModal from "@/components/modals/add-income-type-modal";
import CreateCalendarModal from "@/components/modals/create-calendar-modal";
import CreateFamilyModal from "@/components/modals/create-family-modal";
import CreateGuidelineModal from "@/components/modals/create-guideline-modal";
import CreateRoomModal from "@/components/modals/create-room-modal";
import CreateStepModal from "@/components/modals/create-step-modal";
import DeleteFamilyModel from "@/components/modals/delete-family-model";
import DeleteGuidelineModel from "@/components/modals/delete-guideline-modal";
import DeleteMessageModel from "@/components/modals/delete-message-model";
import DeleteRoomModel from "@/components/modals/delete-room-modal";
import DeleteStepModel from "@/components/modals/delete-step-modal";
import EditFamilyModal from "@/components/modals/edit-family-modal";
import EditGuidelineModal from "@/components/modals/edit-guideline-modal";
import EditRoomModal from "@/components/modals/edit-room-modal";
import EditStepModal from "@/components/modals/edit-step-modal";
import InviteModel from "@/components/modals/invite-model";
import LeaveFamilyModel from "@/components/modals/leave-family-model";
import MembersModel from "@/components/modals/members-model";
import MessageFileModal from "@/components/modals/message-file-modal";
import ModifyCalendarModal from "@/components/modals/modify-calendar.modal";
import OpenImageModal from "@/components/modals/open-image-modal";
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
      <ModifyCalendarModal />
      <CreateCalendarModal />
      <OpenImageModal />
      <CreateExpenditureModal />
      <CreateExpenditureTypeModal />
      <CreateIncomeModal />
      <CreateIncomeTypeModal />
      <CreateGuidelineModal />
      <EditGuidelineModal />
      <DeleteGuidelineModel />
      <CreateStepModal />
      <EditStepModal />
      <DeleteStepModel />
      <CreateRoomModal />
      <EditRoomModal />
      <DeleteRoomModel />
    </>
  );
};
