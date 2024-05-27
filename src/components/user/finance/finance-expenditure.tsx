'use client'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import FinanceExpenditureCalenderPicker from './finance-expenditure-date';
import FinanceExpenditureMonthPicker from './finance-expenditure-month-picker';
import FinanceExpenditureYearPicker from './finance-expenditure-year-picker';
import FinanceExpenditureDateData from './finance-expenditure-date-data';
import FinanceExpenditureMonthData from './finance-expenditure-month';
import FinanceExpenditureYearData from './finance-expenditure-year-data';

interface FinanceExpenditureScreenProps {
    familyId: string;
    token: string;
}



const FinanceExpenditureScreen = ({ familyId, token }: FinanceExpenditureScreenProps) => {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [choosenType, setChoosenType] = React.useState<string>("date")
    // console.log(searchParams)
    const [date, setDate] = React.useState<string>(new Date().toISOString().split("T")[0])

    const [month, setMonth] = React.useState<number>(new Date().getMonth() + 1)
    const [yearOfMonth, setYearOfMonth] = React.useState<number>(new Date().getFullYear())

    const [year, setYear] = React.useState<number>(new Date().getFullYear())
    useEffect(() => {

    }, [])


    return (
        <>
            <div className='flex space-x-4 items-center'>
                <div className=''>
                    <Select defaultValue='date' onValueChange={(value) => {
                        setChoosenType(value)
                    }} >
                        <SelectTrigger className="w-[180px] dark:bg-[#313338] dark:border-gray-600">
                            <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>By:</SelectLabel>
                                <SelectItem value="date">Day</SelectItem>
                                <SelectItem value="month">Month</SelectItem>
                                <SelectItem value="year">Year</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {
                    choosenType === "date" ? <FinanceExpenditureCalenderPicker date={date} setDate={setDate} />
                        : choosenType === "month" ? <FinanceExpenditureMonthPicker
                            month={month}
                            setMonth={setMonth} yearOfMonth={yearOfMonth} setYearOfMonth={setYearOfMonth} /> : <FinanceExpenditureYearPicker year={year} setYear={setYear} />

                }
                {/* <FinanceExpenditureCalenderPicker date={date} setDate={setDate} /> */}
                {/* <FinanceExpenditureMonthPicker
                    month={month}
                    setMonth={setMonth} yearOfMonth={yearOfMonth} setYearOfMonth={setYearOfMonth} /> */}
            </div>
            <div className="mt-2">
                {
                    choosenType === "date" ? <FinanceExpenditureDateData date={date} familyId={familyId} token={token} />
                        : choosenType === "month" ? <FinanceExpenditureMonthData month={month} yearOfMonth={yearOfMonth} familyId={familyId} token={token} />
                            : <FinanceExpenditureYearData year={year} familyId={familyId} token={token} />
                }
            </div>
        </>
    )
}

export default FinanceExpenditureScreen