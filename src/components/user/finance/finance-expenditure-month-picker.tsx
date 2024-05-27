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

const FinanceExpenditureMonthPicker = ({ month, setMonth, yearOfMonth, setYearOfMonth }: { month: number, setMonth: React.Dispatch<React.SetStateAction<number>>, yearOfMonth: number, setYearOfMonth: React.Dispatch<React.SetStateAction<number>> }) => {
    return (
        <div className='flex space-x-4 items-center '>
            <Select defaultValue={month.toString()} onValueChange={(value) => {
                setMonth(parseInt(value))
            }}  >
                <SelectTrigger className="w-[180px] dark:bg-[#313338] dark:border-gray-600">
                    <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Month:</SelectLabel>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="9">9</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="11">11</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select defaultValue={yearOfMonth.toString()} onValueChange={(value) => {
                setYearOfMonth(parseInt(value))
            }} >
                <SelectTrigger className="w-[180px] dark:bg-[#313338] dark:border-gray-600">
                    <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Year:</SelectLabel>
                        {
                            Array.from({ length: 10 }, (_, i) => {
                                return <SelectItem key={i} value={(yearOfMonth + i).toString()}>{yearOfMonth - 5 + i}</SelectItem>
                            })
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default FinanceExpenditureMonthPicker