"use client";

import UserAvatar from "@/components/user/user-avatar";
import { cn } from "@/lib/utils";
import { Family } from "@/types/family";
import { Member } from "@/types/member";
import { roleIconMapRight } from "@/util/rol-icon-map";
import { useParams, useRouter } from "next/navigation";

interface FamilyMemberProps {
  member: Member;
  family: Family;
}

const FamilyMember = ({ member, family }: FamilyMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMapRight[member.role as keyof typeof roleIconMapRight];

  const onClick = () => {
    router.push(`/family/${params?.familyId}/conversations/${member.id_user}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id_user && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <UserAvatar src={member.avatar} className="h-8 w-8 md:h-8 md:w-8" />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.memberId === member.id_user &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.lastname} {member.firstname}
      </p>
      {icon}
    </button>
  );
};

export default FamilyMember;
