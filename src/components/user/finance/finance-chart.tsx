'use client'

import React, { useEffect } from 'react'
import { FinanceSummary } from '@/types/finance-summary';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { StatisticIncome } from '@/types/finance-income';
import { statisticIncomeData } from './const/data';
import IncomeChart from './finance-income/finance-income-chart';
interface FinanceChartProps {
    familyId: string;
    token: string;
}

const FinanceChartScreen = ({ familyId, token }: FinanceChartProps) => {
    const [incomeData, setIncomeData] = React.useState<StatisticIncome[]>(statisticIncomeData.data);

    return (
        <div className="h-full flex items-center justify-center p-6 w-full ">
            <div className="bg-transparent shadow-2xl rounded-2xl w-full p-8">
                <IncomeChart data={incomeData} />
            </div>
        </div>
    )
}

export default FinanceChartScreen