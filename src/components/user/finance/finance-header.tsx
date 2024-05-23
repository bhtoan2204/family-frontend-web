"use client"
import MobileToggle from "@/components/mobile-toggle";
import AddGuidelineButton from "@/components/user/guideline/add-guideline-button";
import { BookCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface FinanceHeaderProps {
    familyId: string;
}

const FinanceHeader = ({ familyId }: FinanceHeaderProps) => {
    const params = useParams();
    const router = useRouter();

    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            <MobileToggle familyId={familyId} />
            <BookCheck className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mr-2" />
            <p className="font-semibold text-md text-black dark:text-white">
                {params?.financeCode === "1" ? "Summary" : params?.financeCode === "2" ? "Expenditure" : "Income"}
            </p>
        </div>
    );
};

export default FinanceHeader;
