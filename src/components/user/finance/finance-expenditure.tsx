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
import FinanceExpenditureCalenderPicker from './finance-expenditure/finance-expenditure-date';
import FinanceExpenditureMonthPicker from './finance-expenditure/finance-expenditure-month-picker';
import FinanceExpenditureYearPicker from './finance-expenditure/finance-expenditure-year-picker';
import FinanceExpenditureDateData from './finance-expenditure/finance-expenditure-date-data';
import FinanceExpenditureMonthData from './finance-expenditure/finance-expenditure-month-data';
import FinanceExpenditureYearData from './finance-expenditure/finance-expenditure-year-data';
import { motion } from 'framer-motion';
import theme from 'tailwindcss/defaultTheme';
import { useTheme } from 'next-themes';
import { Member } from '@/types/member';

interface FinanceExpenditureScreenProps {
    familyId: string;
    token: string;
    familyMembers: Member[];
}



const FinanceExpenditureScreen = ({ familyId, token, familyMembers }: FinanceExpenditureScreenProps) => {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { theme } = useTheme();
    const [choosenType, setChoosenType] = React.useState<string>("date")
    // console.log(searchParams)
    const [date, setDate] = React.useState<string>(new Date().toISOString().split("T")[0])

    const [month, setMonth] = React.useState<number>(new Date().getMonth() + 1)
    const [yearOfMonth, setYearOfMonth] = React.useState<number>(new Date().getFullYear())

    const [year, setYear] = React.useState<number>(new Date().getFullYear())

    const transitionVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };


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
            </div>
            <div className="mt-2">
                <motion.div
                    key={choosenType}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={transitionVariants}
                    transition={{ duration: 0.3 }}
                >
                    {
                        choosenType === "date" ? <FinanceExpenditureDateData date={date} familyId={familyId} token={token} familyMembers={familyMembers} />
                            : choosenType === "month" ? <FinanceExpenditureMonthData month={month} yearOfMonth={yearOfMonth} familyId={familyId} token={token} familyMembers={familyMembers} />
                                : <FinanceExpenditureYearData year={year} familyId={familyId} token={token} familyMembers={familyMembers} />
                    }
                </motion.div>
            </div>

        </>
    )
}

export default FinanceExpenditureScreen