import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const FinanceExpenditureYearPicker = ({ year, setYear }: { year: number, setYear: React.Dispatch<React.SetStateAction<number>> }) => {
    const a: number[] = Array.from({ length: 10 }, (_, i) => year - 5 + i)
    return (
        <div className='flex space-x-4 items-center '>
            <Select defaultValue={year.toString()} onValueChange={(value) => {
                setYear(parseInt(value))
            }} >
                <SelectTrigger className="w-[180px] dark:bg-[#313338] dark:border-gray-600">
                    <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Year:</SelectLabel>
                        {
                            a.map((item, i) => {
                                return <SelectItem key={i} value={item.toString()}>{item}</SelectItem>
                            })
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default FinanceExpenditureYearPicker