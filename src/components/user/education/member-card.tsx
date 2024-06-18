"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Member } from "@/types/member";

interface MemberCardProps {
  member: Member;
  handleMemberClick: (memberId: string) => void;
  selectedMember: string | null;
}

const MemberCard = ({
  member,
  handleMemberClick,
  selectedMember,
}: MemberCardProps) => {
  return (
    <button
      onClick={() => handleMemberClick(member.id_user)}
      className={`rounded-lg shadow-lg p-5 relative cursor-pointer hover:shadow-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-black ${
        selectedMember === member.id_user
          ? "bg-black/5 dark:bg-black"
          : "dark:bg-neutral-700"
      }`}
    >
      <div className="group flex items-center transition w-full">
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-row gap-4 items-center">
            <Avatar className="bg-gray-300 dark:bg-slate-200">
              <AvatarImage src={member.avatar} alt={member.firstname} />
            </Avatar>
            <div className="group flex flex-col gap-1 items-start overflow-clip">
              <p className="truncate whitespace-nowrap">
                {member.firstname} {member.lastname}
              </p>
              <h4 className="text-xs truncate whitespace-nowrap text-gray-500 dark:text-gray-300">
                {member.email}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default MemberCard;
