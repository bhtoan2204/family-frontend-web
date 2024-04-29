"use client";

import { FamilyWithMember } from "@/types/family-with-member";

interface FamilyHeaderProps {
  family: FamilyWithMember;
  role: string;
}

const FamilyHeader = ({ family, role }: FamilyHeaderProps) => {
  return <div>Family Header</div>;
};

export default FamilyHeader;
