import { Family } from "@/types/family";
import { Member } from "@/types/member";

export type FamilyWithMember = Family & {
  members: Member[];
};
