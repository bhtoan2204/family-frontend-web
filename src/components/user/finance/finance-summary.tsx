import { FinanceSummary } from '@/types/finance-summary';
import React, { useEffect } from 'react'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
interface FinanceSummaryProps {
    familyId: string;
    summaryData: FinanceSummary;
}

const FinanceSummaryScreen = ({ familyId, summaryData }: FinanceSummaryProps) => {
    const isIncomePositive = parseFloat(summaryData.total_income) > 0;
    const isExpenditurePositive = parseFloat(summaryData.total_expenditure) * -1 < 0;
    const isCurrentIncomePositive = parseFloat(summaryData.current_balance) > 0;
    return (
        <div className="h-full flex items-center justify-center p-6 w-full ">
            <div className="bg-transparent shadow-2xl rounded-2xl w-full p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow col-span-1 md:col-span-2">
                        <p className="text-gray-600 dark:text-gray-300">Summary Date:</p>
                        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">{new Date(summaryData.summary_date).toLocaleDateString()}</p>
                    </div>
                    <div className={`p-4 rounded-lg shadow flex items-center ${isIncomePositive ? 'bg-green-100 dark:bg-green-900' : 'bg-rose-100 dark:bg-rose-900'}`}>
                        {isIncomePositive ? (
                            <FaArrowUp className="text-green-500 dark:text-green-300 text-2xl mr-2" />
                        ) : (
                            <FaArrowDown className="text-rose-500 dark:text-rose-300 text-2xl mr-2" />
                        )}
                        <div>
                            <p className="text-gray-600 dark:text-gray-300">Total Income:</p>
                            <p className={`text-2xl font-semibold ${isIncomePositive ? 'text-green-600 dark:text-green-300' : 'text-rose-600 dark:text-rose-300'}`}>
                                ${summaryData.total_income}
                            </p>
                        </div>
                    </div>
                    <div className={`p-4 rounded-lg shadow flex items-center ${isExpenditurePositive ? 'bg-rose-100 dark:bg-rose-900' : 'bg-green-100 dark:bg-green-900'}`}>
                        {isExpenditurePositive ? (
                            <FaArrowDown className="text-rose-500 dark:text-rose-300 text-2xl mr-2" />
                        ) : (
                            <FaArrowUp className="text-green-500 dark:text-green-300 text-2xl mr-2" />
                        )}
                        <div>
                            <p className="text-gray-600 dark:text-gray-300">Total Expenditure:</p>
                            <p className={`text-2xl font-semibold ${isExpenditurePositive ? 'text-rose-600 dark:text-rose-300' : 'text-green-600 dark:text-green-300'}`}>
                                ${summaryData.total_expenditure}
                            </p>
                        </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                        <p className="text-gray-600 dark:text-gray-300">Daily Balance:</p>
                        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">${summaryData.daily_balance}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                        <p className="text-gray-600 dark:text-gray-300">Weekly Balance:</p>
                        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">${summaryData.weekly_balance}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                        <p className="text-gray-600 dark:text-gray-300">Monthly Balance:</p>
                        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">${summaryData.monthly_balance}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
                        <p className="text-gray-600 dark:text-gray-300">Yearly Balance:</p>
                        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">${summaryData.yearly_balance}</p>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow col-span-1 md:col-span-2 flex-col items-center">
                        <p className="text-gray-600 dark:text-gray-300">Current Balance:</p>
                        <p className={`text-2xl font-semibold ml-2 ${parseFloat(summaryData.current_balance) < 0 ? 'text-rose-600 dark:text-rose-300' : 'text-green-600 dark:text-green-300'

                            }`} >
                            ${summaryData.current_balance}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinanceSummaryScreen