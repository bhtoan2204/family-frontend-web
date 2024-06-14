import React from 'react'
import { expenditureByYearData, expenditureType, incomeByYearData, incomeType } from '../const/data'
import { colors } from '../color/color'
import { useTheme } from 'next-themes'
import { FinanceIncomeYear, IncomeType } from '@/types/finance-income'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useModal } from '@/hooks/use-modal-store'
import { GetIncomeByYear, GetIncomeSource } from '@/actions/finance-actions'
import { Mosaic } from 'react-loading-indicators'
import { Member } from '@/types/member'

const FinanceIncomeYearData = ({ year, familyId, token, familyMembers }: { year: number, familyId: string, token: string, familyMembers: Member[] }) => {
    const { theme } = useTheme();
    const [incomeTypes, setIncomeTypes] = React.useState<IncomeType[]>([])
    const [selectedIncome, setSelectedIncome] = React.useState<number | null>(null)
    const [incomeYearData, setIncomeYearData] = React.useState<FinanceIncomeYear[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<any>(null)
    const [reload, setReload] = React.useState<boolean>(false)
    const { onOpen } = useModal();

    React.useEffect(() => {

        const fetchYearData = async () => {
            setIsLoading(true)
            try {
                const response = await GetIncomeByYear(token, familyId, year.toString())
                const incomeSourceRespond = await GetIncomeSource(token, familyId)
                console.log("data nef", response)
                setIncomeYearData(response)
                setIncomeTypes(incomeSourceRespond)
                setIsLoading(false)
            } catch (error) {
                setIncomeYearData([])
                setError(error)
                setIsLoading(false)
            }
        }
        fetchYearData()

    }, [year, familyId, token, reload])

    function filterDataByIncomeSource(id: number) {
        // Find the category name by id_income_source
        const incomeTypeObj = incomeType.find(item => item.id_income_source === id);
        if (!incomeTypeObj) {
            throw new Error('Invalid id_income_source');
        }
        const categoryName = incomeTypeObj.category;

        return incomeYearData
            .map(entry => {
                const filteredCategories = entry.categories.filter(cat => cat.name === categoryName);
                if (filteredCategories.length > 0) {
                    return {
                        ...entry,
                        categories: filteredCategories,
                    };
                }
                return null;
            })
            .filter(entry => entry !== null);
    }

    const filteredIncomeData = selectedIncome ? filterDataByIncomeSource(selectedIncome) : incomeYearData;

    return (
        isLoading ? <>
            <div className='flex flex-1  mt-16'>
                <Mosaic color={theme == 'dark' ? '#fff' : '#000'} size="small" text="Loading" textColor="" />
            </div>
        </> : <>
            <div className="py-4 space-y-4">
                <ScrollArea className="overflow-x-auto py-2 mb-4">
                    <div className="flex space-x-4 ">
                        <button
                            onClick={() => {
                                onOpen("createIncome", {
                                    createIncome: {
                                        id_family: parseInt(familyId),
                                        setReload: setReload,
                                        token: token,
                                        familyMembers: familyMembers,
                                        incomeTypes: incomeTypes
                                    }
                                });
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition bg-gray-700 dark:bg-white text-gray-200 dark:text-gray-700 w-auto h-10 clear-both whitespace-nowrap hover:opacity-65`}
                        >
                            Add Income
                        </button>
                        <button
                            onClick={() => {
                                onOpen('createIncomeType', {
                                    createIncomeType: {
                                        id_family: parseInt(familyId),
                                        setIncomeTypes: setIncomeTypes,
                                    }
                                })

                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 w-auto h-10 clear-both whitespace-nowrap hover:opacity-65`}
                        >
                            Add income source
                        </button>

                        {incomeTypes.map((type, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (selectedIncome === index + 1) {
                                        setSelectedIncome(null)
                                    } else {
                                        setSelectedIncome(index + 1)
                                    }
                                }}
                                className={`px-4 py-2 rounded-lg w-auto clear-both  text-sm font-semibold transition whitespace-nowrap hover:opacity-65 ${selectedIncome === index + 1
                                    ? 'bg-black dark:bg-white text-white dark:text-black'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 '
                                    }`}
                            >
                                {type.category}
                            </button>
                        ))}
                    </div>
                    <div className='py-2'></div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                {
                    filteredIncomeData.length === 0 ? <>
                        <div className="flex flex-1 justify-center items-center h-64">
                            <p className="text-lg text-gray-500 dark:text-gray-400">No income data available</p>
                        </div>
                    </> : <>
                        {
                            filteredIncomeData.map((item, index) => {

                                return (
                                    <div key={index} className='mb-4'>
                                        <div className='mb-4 flex justify-between mr-4'>
                                            <p className='font-medium'>Tháng {item!.month} </p>
                                            <p className={`${theme == 'dark' ? 'text-green-200' : 'text-green-700'} font-medium`}>+ {item!.total}</p>
                                        </div>
                                        {
                                            item!.categories.map((category, index) => {
                                                // const type = expenditureType.find((type) => type.category === category.name)?.id_expense_type;
                                                // const color = colors[type!];

                                                return <>
                                                    <div className={`p-4 rounded-lg shadow-md mb-4  hover:bg-sky-700 hover:cursor-pointer dark:bg-[#397097] bg-[#4D7FA2] text-white flex justify-between`}
                                                    // style={{
                                                    //     backgroundColor: theme === 'dark' ? color.darkModeBackgroundColor : color.backgroundColor,
                                                    //     color: color.textColor
                                                    // }}
                                                    >
                                                        <p className='font-medium'>{category.name}</p>
                                                        <p className='font-medium'>{category.amount}</p>
                                                    </div>
                                                </>
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </>
                }
            </div>
        </>
    )
}

export default FinanceIncomeYearData