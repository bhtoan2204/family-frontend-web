import { EventCalendar } from "@/types/calendar";
import { Family } from "@/types/family";
import {
  CreateExpenditureType,
  CreateExpenditure,
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
  | "openImage"
  | "createExpenditure"
  | "createExpenditureType"
  | "createIncome"
  | "createIncomeType"
  ;

interface ModalData {
  family?: Family;
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
