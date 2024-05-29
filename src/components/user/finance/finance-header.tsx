"use client"
import MobileToggle from "@/components/mobile-toggle";
import AddGuidelineButton from "@/components/user/guideline/add-guideline-button";
import { useModal } from "@/hooks/use-modal-store";
import { BookCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";




interface FinanceHeaderProps {
    familyId: string;
}

const FinanceHeader = ({ familyId }: FinanceHeaderProps) => {
    const params = useParams();
    const router = useRouter();
    const { onOpen } = useModal();
    return (
        <div className="text-md font-semibold px-3 flex items-center py-[0.7rem] border-neutral-200 dark:border-neutral-800 border-b-2">
            <MobileToggle familyId={familyId} />
            <BookCheck className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mr-2" />
            <p className="font-semibold text-md text-black dark:text-white">
                {params?.financeCode === "1" ? "Summary" : params?.financeCode === "2" ? "Expenditure" : "Income"}
            </p>
            {/* {params?.financeCode === "1"
                ?
                <p></p>
                : params?.financeCode === "2"
                    ?
                    <p className="ml-8 h-5 px-2 dark:bg-white bg-black rounded-lg text-white dark:text-black text-center justify-center items-center flex text-sm hover:cursor-pointer" onClick={() => {
                        onOpen("createExpenditure");
                    }}>Add expense</p>
                    : <p className="ml-8 h-5 w-5 dark:bg-white bg-black rounded-full text-white dark:text-black text-center justify-center items-center flex text-lg hover:cursor-pointer">+</p>} */}
            {/* {
                params?.financeCode === "2" && <div className="ml-2 w-auto">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                </div>
            } */}
        </div>
    );
};

export default FinanceHeader;
