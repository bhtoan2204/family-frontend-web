import { Family } from "@/types/family";
import { Member } from "@/types/member";

export type FamilyWithMembers = Family & {
  members: Member[];
};
