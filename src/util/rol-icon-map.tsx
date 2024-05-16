import { ShieldAlert, ShieldCheck } from "lucide-react";

export const roleIconMapRight = {
  ["Member"]: null,
  ["Moderator"]: <ShieldAlert className="mr-2 h-4 w-4 text-indigo-500" />,
  ["Owner family"]: <ShieldCheck className="mr-2 h-4 w-4 text-rose-500" />,
};

export const roleIconMapLeft = {
  ["Member"]: null,
  ["Moderator"]: <ShieldAlert className="ml-2 h-4 w-4 text-indigo-500" />,
  ["Owner family"]: <ShieldCheck className="ml-2 h-4 w-4 text-rose-500" />,
};

export const roleIconMapNone = {
  ["Member"]: null,
  ["Moderator"]: <ShieldAlert className="mr-2 h-4 w-4 text-indigo-500" />,
  ["Owner family"]: <ShieldCheck className="mr-2 h-4 w-4 text-rose-500" />,
};