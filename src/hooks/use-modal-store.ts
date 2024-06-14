import { EventCalendar } from "@/types/calendar";
import { Family } from "@/types/family";
import {
  CreateExpenditure,
  CreateExpenditureType,
} from "@/types/finance-expenditure";
import { CreateIncome, CreateIncomeType } from "@/types/finance-income";
import { create } from "zustand";

export type ModalType =
  | "createChat"
  | "createFamily"
  | "invite"
  | "editFamily"
  | "members"
  | "leaveFamily"
  | "deleteFamily"
  | "messageFile"
  | "deleteMessage"
  | "createCalendar"
  | "modifyCalendar"
  | "createGuideline"
  | "editGuideline"
  | "deleteGuideline"
  | "createStep"
  | "editStep"
  | "deleteStep"
  | "openImage"
  | "createExpenditure"
  | "createExpenditureType"
  | "createIncome"
  | "createIncomeType"
  | "createRoom"
  | "editRoom"
  | "deleteRoom"
  | "createHouseholdItem"
  | "editHouseholdItem"
  | "deleteHouseholdItem";

interface ModalData {
  token?: string;
  family?: Family;
  familyId?: string;
  guidelineId?: string;
  guideline?: any;
  step?: any;
  roomId?: string;
  room?: any;
  householdItemId?: string;
  householdItem?: any;
  addStepOption?: boolean;
  maxStepIndex?: number;
  isUsingIndex?: boolean;
  index?: number;
  apiUrl?: string;
  query?: Record<string, any>;
  event?: EventCalendar;
  imageUrl?: string;
  createExpenditure?: CreateExpenditure;
  createExpenditureType?: CreateExpenditureType;
  createIncome?: CreateIncome;
  createIncomeType?: CreateIncomeType;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
